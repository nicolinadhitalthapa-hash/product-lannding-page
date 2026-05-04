import nodemailer from "nodemailer";
import type { OrderRecord } from "@/lib/order";
import { getBusinessOrderEmail, getCustomerOrderEmail } from "@/lib/email-templates";

export async function sendOrderEmails(args: {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  businessEmail: string;
  emailFrom: string;
  brandName: string;
  replyToEmail: string;
  order: OrderRecord;
}) {
  const transporter = nodemailer.createTransport({
    host: args.smtpHost,
    port: args.smtpPort,
    secure: args.smtpPort === 465,
    auth: {
      user: args.smtpUser,
      pass: args.smtpPass
    }
  });

  await transporter.verify();

  await transporter.sendMail({
    from: args.emailFrom,
    to: args.businessEmail,
    replyTo: args.replyToEmail,
    subject: `New Product Order Received - ${args.order.orderId}`,
    html: getBusinessOrderEmail(args.order, args.brandName)
  });

  await transporter.sendMail({
    from: args.emailFrom,
    to: args.order.emailAddress,
    replyTo: args.replyToEmail,
    subject: `Your Order Has Been Received - ${args.brandName}`,
    html: getCustomerOrderEmail(args.order, args.brandName, args.replyToEmail)
  });
}
