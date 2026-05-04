import Link from "next/link";
import { BrandHeader } from "@/components/brand-header";
import { formatCurrency } from "@/lib/utils";

export default async function ThankYouPage({
  searchParams
}: {
  searchParams: Promise<{ orderId?: string; product?: string; quantity?: string; total?: string; emailStatus?: string }>;
}) {
  const params = await searchParams;
  const quantity = Number(params.quantity ?? "1") || 1;
  const total = Number(params.total ?? "0") || 0;
  const emailPending = params.emailStatus === "pending";

  return (
    <main className="page-shell">
      <BrandHeader />
      <section className="section-wrap flex min-h-screen items-center py-10">
        <div className="section-card mx-auto w-full max-w-3xl p-8 text-center sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-leaf text-2xl text-white">✓</div>
          <h1 className="mt-6 font-[var(--font-display)] text-4xl text-leaf sm:text-5xl">Thank you for your order!</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Our sales representative will call you soon to confirm your order.
          </p>

          {emailPending ? (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Your order was received successfully. Email confirmation is temporarily pending, but our team has your order details.
            </div>
          ) : null}

          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-cream/70 p-6 text-left">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow label="Order ID" value={params.orderId ?? "Generated successfully"} />
              <InfoRow label="Payment Method" value="Cash On Delivery" />
              <InfoRow label="Product Ordered" value={params.product ?? "Dry Mango"} />
              <InfoRow label="Quantity" value={String(quantity)} />
              <InfoRow label="Total Price" value={formatCurrency(total)} />
            </div>
          </div>

          <Link href="/" className="cta-button mt-8">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm font-semibold text-leaf">{value}</div>
    </div>
  );
}
