import Image from "next/image";
import Link from "next/link";
import { BrandHeader } from "@/components/brand-header";
import { CheckoutForm } from "@/components/checkout-form";
import { getPricingOptionById, siteConfig } from "@/lib/site-config";
import { formatCurrency } from "@/lib/utils";

export default async function CheckoutPage({
  searchParams
}: {
  searchParams: Promise<{ option?: string; quantity?: string }>;
}) {
  const params = await searchParams;
  const selectedOption = getPricingOptionById(params.option);
  const initialQuantity = Math.max(1, Number(params.quantity ?? "1") || 1);

  return (
    <main className="page-shell">
      <BrandHeader />
      <section className="section-wrap py-6 sm:py-10">
        <div className="mb-4">
          <Link href="/" className="text-sm font-medium text-leaf hover:text-leafDark">
            ← Back to Home
          </Link>
        </div>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="section-card p-6 sm:p-8">
            <div className="inline-flex rounded-full border border-mango/20 bg-mango/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-mango">
              Secure COD checkout
            </div>
            <h1 className="mt-4 font-[var(--font-display)] text-3xl text-leaf sm:text-4xl">Complete your order</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Your order will be saved to Google Sheets, emailed to your business inbox, and confirmed with the customer automatically.
            </p>

            <div className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-sand to-white">
                <Image src={siteConfig.images[0].src} alt={siteConfig.images[0].alt} fill className="object-contain p-6" />
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-500">Selected Pack</span>
                  <span className="text-sm font-semibold text-leaf">{selectedOption.shortLabel}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-500">Price Per Piece</span>
                  <span className="text-sm font-semibold text-leaf">{formatCurrency(selectedOption.unitPrice)}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-500">Delivery in Kathmandu</span>
                  <span className="text-sm font-semibold text-leaf">Free</span>
                </div>
                <div className="rounded-2xl border border-mango/15 bg-mango/10 p-4 text-sm leading-7 text-slate-700">
                  Our sales representative will call you soon after your order is placed to confirm the details.
                </div>
              </div>
            </div>
          </div>

          <div className="section-card p-6 sm:p-8">
            <CheckoutForm optionId={selectedOption.id} initialQuantity={initialQuantity} />
          </div>
        </div>
      </section>
    </main>
  );
}
