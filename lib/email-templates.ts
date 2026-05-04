import { formatCurrency } from "@/lib/utils";
import type { OrderRecord } from "@/lib/order";

function shell(inner: string, brandName: string) {
  return `
  <div style="margin:0;padding:24px;background:#fff7ea;font-family:Arial,sans-serif;color:#1f2937;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #f1e5cb;">
      <tr>
        <td style="padding:28px 32px;background:linear-gradient(135deg,#0f4d38,#1b6b4e);color:#ffffff;">
          <div style="font-size:13px;letter-spacing:1.6px;text-transform:uppercase;opacity:0.8;">${brandName}</div>
          <div style="font-size:28px;font-weight:700;line-height:1.2;margin-top:8px;">Premium Order Update</div>
        </td>
      </tr>
      <tr>
        <td style="padding:32px;">
          ${inner}
        </td>
      </tr>
    </table>
  </div>`;
}

function infoRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;color:#6b7280;font-size:14px;width:180px;">${label}</td>
      <td style="padding:10px 0;color:#111827;font-size:14px;font-weight:600;">${value}</td>
    </tr>`;
}

export function getBusinessOrderEmail(order: OrderRecord, brandName: string) {
  return shell(
    `
      <h1 style="margin:0 0 12px;font-size:28px;color:#111827;">Order received successfully</h1>
      <p style="margin:0 0 24px;color:#4b5563;font-size:15px;line-height:1.7;">A new Cash on Delivery order has been placed on your Dryora funnel. Please call the customer soon to confirm this order.</p>
      <div style="display:inline-block;background:#effcf5;color:#0f7a45;border:1px solid #b5ebcb;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:700;margin-bottom:24px;">
        ${order.orderStatus}
      </div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;margin-bottom:24px;">
        ${infoRow("Order ID", order.orderId)}
        ${infoRow("Date & Time", order.dateTime)}
        ${infoRow("Customer Name", order.customerName)}
        ${infoRow("Phone Number", order.phoneNumber)}
        ${infoRow("Email Address", order.emailAddress)}
        ${infoRow("Exact Location", order.exactLocation)}
        ${infoRow("Product Name", order.productName)}
        ${infoRow("Quantity", String(order.quantity))}
        ${infoRow("Price Per Piece", formatCurrency(order.pricePerPiece))}
        ${infoRow("Total Price", formatCurrency(order.totalPrice))}
        ${infoRow("Payment Method", order.paymentMethod)}
      </table>
      <div style="background:#fff4e5;border:1px solid #ffd59d;border-radius:18px;padding:18px 20px;color:#8a4b07;font-size:14px;line-height:1.6;">
        Please call the customer soon to confirm this order.
      </div>
    `,
    brandName
  );
}

export function getCustomerOrderEmail(order: OrderRecord, brandName: string, replyToEmail: string) {
  return shell(
    `
      <h1 style="margin:0 0 12px;font-size:28px;color:#111827;">Thank you for your order</h1>
      <p style="margin:0 0 24px;color:#4b5563;font-size:15px;line-height:1.7;">Hi ${order.customerName}, we have received your order successfully and our sales representative will call you soon to confirm it.</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;margin-bottom:24px;">
        ${infoRow("Order ID", order.orderId)}
        ${infoRow("Product", order.productName)}
        ${infoRow("Quantity", String(order.quantity))}
        ${infoRow("Total Price", formatCurrency(order.totalPrice))}
        ${infoRow("Payment Method", order.paymentMethod)}
      </table>
      <div style="background:#effcf5;border:1px solid #b5ebcb;border-radius:18px;padding:18px 20px;color:#0f7a45;font-size:14px;line-height:1.6;margin-bottom:24px;">
        Our sales representative will call you soon to confirm your order.
      </div>
      <p style="margin:0;color:#4b5563;font-size:14px;line-height:1.7;">
        If you have any questions, simply reply to this email or contact us at
        <a href="mailto:${replyToEmail}" style="color:#0f4d38;font-weight:700;text-decoration:none;"> ${replyToEmail}</a>.
      </p>
      <p style="margin:20px 0 0;color:#111827;font-size:14px;line-height:1.7;">
        Thank you,<br />
        <strong>${brandName}</strong>
      </p>
    `,
    brandName
  );
}
