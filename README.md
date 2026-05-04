# Dryora COD Funnel

This project is a production-ready Cash on Delivery sales funnel for Dryora, built with Next.js App Router and Tailwind CSS.

## Recommended Tech Stack

- Next.js App Router for the landing page, checkout, thank-you page, and server API routes
- Tailwind CSS for the premium, mobile-friendly UI
- TypeScript for safer frontend and backend logic
- Zod for server-side order validation
- Google Sheets API via `googleapis` for order storage
- Nodemailer with SMTP for business and customer email notifications

## How the Order Flow Works

1. A customer lands on `/` and chooses a pack plus quantity.
2. CTA buttons send the selected pack and quantity to `/checkout`.
3. The checkout form collects customer details and submits them to `POST /api/order`.
4. The API validates the request, generates an order ID, calculates pricing again on the server, saves the order to Google Sheets, sends both emails, and returns success.
5. The customer is redirected to `/thank-you` with the order summary in the URL.

## How the Checkout Form Sends Data

- The checkout page auto-fills the selected product pack and quantity from query params.
- When the customer clicks `Order Now`, the frontend sends JSON to `/api/order`.
- The API ignores any tampered pricing by recalculating product name, price per piece, and total price from the selected pricing option.

## How the Google Spreadsheet Connection Works

- Server code uses the Google Sheets API with a service account.
- The sheet tab named in `GOOGLE_SHEET_TAB_NAME` is used for order storage.
- If the header row is empty, the API writes the expected column titles automatically.
- Each successful order is appended as a new row.

## How Gmail and Order Notifications Work

- The server uses SMTP credentials from environment variables.
- Email 1 goes to `BUSINESS_EMAIL` with the full order details.
- Email 2 goes to the customer with a polished order-received confirmation.
- Both are HTML emails with inline CSS for Gmail compatibility.

## Environment Variables You Need Later

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SITE_URL=
BUSINESS_EMAIL=
EMAIL_FROM=
BRAND_NAME=Dryora

GOOGLE_SHEET_ID=
GOOGLE_SHEET_TAB_NAME=Dried Mango Order
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

EMAIL_SERVICE_API_KEY=

FRONTEND_URL=
```

Notes:

- `BUSINESS_EMAIL` should be `mail@merodigitalhub.com` unless you want to change the recipient.
- `EMAIL_FROM` should be the sender/reply-to address customers see.
- `GOOGLE_PRIVATE_KEY` must preserve line breaks. If you paste it into `.env.local`, use escaped `\n` sequences if needed.

## Google Spreadsheet Setup Instructions

### 1. Create or Open Your Google Spreadsheet

- Open your existing spreadsheet.
- Create or confirm the tab name is `Dried Mango Order`.

### 2. Add the Correct Column Names

Use these exact columns in row 1:

1. `Order ID`
2. `Date & Time`
3. `Customer Name`
4. `Phone Number`
5. `Email Address`
6. `Exact Location`
7. `Product Name`
8. `Quantity`
9. `Price Per Piece`
10. `Total Price`
11. `Payment Method`
12. `Order Status`
13. `Notes`

The API can also create this header row automatically if the sheet tab is blank.

### 3. Add Filters in Google Sheets

- Select row 1.
- Open `Data` → `Create a filter`.
- This makes it easier to sort by date, status, location, or customer.

### 4. Add Dropdown Options for Order Status

- Select the `Order Status` column.
- Open `Data` → `Data validation`.
- Choose `Dropdown`.
- Add these options:
  - `New Order`
  - `Order Confirmed`
  - `Order Ongoing`
  - `Delivered`
  - `Cancelled`

### 5. Get the Google Sheet ID

- Open the spreadsheet in your browser.
- Copy the long ID from the URL:
  - `https://docs.google.com/spreadsheets/d/THIS_PART_IS_THE_ID/edit`
- Paste that into `GOOGLE_SHEET_ID`.

### 6. Add Google Credentials in `.env.local`

- Create a Google Cloud project.
- Enable the Google Sheets API.
- Create a Service Account.
- Create a JSON key for that service account.
- Use the service account email for `GOOGLE_SERVICE_ACCOUNT_EMAIL`.
- Use the private key for `GOOGLE_PRIVATE_KEY`.

### 7. Share the Google Sheet with the Service Account

- Open your Google Sheet.
- Click `Share`.
- Add the service account email as an editor.
- Without this step, the order submission will fail.

## How to Test Order Submission

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.example` and fill all required values.

3. Run the app:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

5. Place a test order and verify:

- The customer is redirected to `/thank-you`
- A new row appears in your Google Sheet
- `BUSINESS_EMAIL` receives the order notification
- The customer email address receives the order confirmation

If sheet saving works but email fails, the API returns a clear error so you can investigate SMTP credentials.

## How to Deploy on Vercel

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Add all values from `.env.example` into the Vercel project environment variables.
4. Redeploy the project.
5. Make sure `NEXT_PUBLIC_SITE_URL` and `FRONTEND_URL` are set to your live domain.

Because the project uses Next.js API routes, the same deployment handles both frontend and backend logic on Vercel.

## Routes

- `/` Product landing page
- `/checkout` Checkout page
- `/thank-you` Thank-you page
- `/api/order` Order submission endpoint

## Editing Product Content Later

- Main editable content lives in [lib/site-config.ts](./lib/site-config.ts)
- Change product copy, testimonials, FAQs, benefits, price options, brand details, or images there
- Reels are currently disabled because no reel links were provided
