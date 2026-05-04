import { NextResponse } from "next/server";
import { appendOrderToGoogleSheet } from "@/lib/google-sheets";
import { validateServerEnv } from "@/lib/env";
import { sendOrderEmails } from "@/lib/mailer";
import { createOrderRecord } from "@/lib/order";
import { siteConfig } from "@/lib/site-config";
import { orderSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const allowedOrigin = process.env.FRONTEND_URL;
    const requestOrigin = request.headers.get("origin");

    if (allowedOrigin && requestOrigin && allowedOrigin !== requestOrigin) {
      return NextResponse.json(
        {
          error: "This origin is not allowed to submit orders."
        },
        { status: 403 }
      );
    }

    const json = await request.json();
    const parsed = orderSchema.safeParse({
      ...json,
      quantity: Number(json.quantity),
      pricePerPiece: Number(json.pricePerPiece),
      totalPrice: Number(json.totalPrice)
    });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          error: "Please correct the highlighted fields and try again.",
          fieldErrors: {
            customerName: fieldErrors.customerName?.[0],
            phoneNumber: fieldErrors.phoneNumber?.[0],
            emailAddress: fieldErrors.emailAddress?.[0],
            exactLocation: fieldErrors.exactLocation?.[0]
          }
        },
        { status: 400 }
      );
    }

    const order = createOrderRecord({
      customerName: parsed.data.customerName,
      phoneNumber: parsed.data.phoneNumber,
      emailAddress: parsed.data.emailAddress,
      exactLocation: parsed.data.exactLocation,
      pricingOptionId: parsed.data.pricingOptionId,
      quantity: parsed.data.quantity
    });

    if (
      parsed.data.productName !== order.productName ||
      parsed.data.pricePerPiece !== order.pricePerPiece ||
      parsed.data.totalPrice !== order.totalPrice
    ) {
      return NextResponse.json(
        {
          error: "Product pricing did not match the current offer. Please review your order and try again."
        },
        { status: 400 }
      );
    }

    const env = validateServerEnv();

    await appendOrderToGoogleSheet({
      sheetId: env.GOOGLE_SHEET_ID,
      tabName: env.GOOGLE_SHEET_TAB_NAME,
      clientEmail: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      privateKey: env.GOOGLE_PRIVATE_KEY,
      order
    });

    try {
      await sendOrderEmails({
        smtpHost: env.SMTP_HOST,
        smtpPort: env.SMTP_PORT,
        smtpUser: env.SMTP_USER,
        smtpPass: env.SMTP_PASS,
        businessEmail: env.BUSINESS_EMAIL,
        emailFrom: env.EMAIL_FROM,
        brandName: env.BRAND_NAME,
        replyToEmail: siteConfig.replyToEmail,
        order
      });
    } catch (error) {
      console.error("Order saved to sheet but email sending failed", error);
      return NextResponse.json(
        {
          success: true,
          warning:
            "Order saved to Google Sheets, but email sending failed. Please verify SMTP username and password for the sender mailbox.",
          order,
          savedToSheet: true,
          emailSent: false
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      order
    });
  } catch (error) {
    console.error("Order submission failed", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Order submission failed. Please try again."
      },
      { status: 500 }
    );
  }
}
