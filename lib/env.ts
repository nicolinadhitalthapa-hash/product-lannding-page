const requiredServerEnv = [
  "GOOGLE_SHEET_ID",
  "GOOGLE_SHEET_TAB_NAME",
  "GOOGLE_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_PRIVATE_KEY",
  "BUSINESS_EMAIL",
  "EMAIL_FROM",
  "BRAND_NAME",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS"
] as const;

export function validateServerEnv() {
  const missing = requiredServerEnv.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}. Add them to your .env.local file before placing live orders.`
    );
  }

  return {
    GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID!,
    GOOGLE_SHEET_TAB_NAME: process.env.GOOGLE_SHEET_TAB_NAME!,
    GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    BUSINESS_EMAIL: process.env.BUSINESS_EMAIL!,
    EMAIL_FROM: process.env.EMAIL_FROM!,
    BRAND_NAME: process.env.BRAND_NAME!,
    SMTP_HOST: process.env.SMTP_HOST!,
    SMTP_PORT: Number(process.env.SMTP_PORT!),
    SMTP_USER: process.env.SMTP_USER!,
    SMTP_PASS: process.env.SMTP_PASS!
  };
}
