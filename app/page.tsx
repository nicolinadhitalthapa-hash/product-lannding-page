import Image from "next/image";
import { BrandHeader } from "@/components/brand-header";
import { CtaButton } from "@/components/cta-button";
import { ShowcasePanel } from "@/components/showcase-panel";
import { FaqList } from "@/components/faq-list";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  return (
    <main className="page-shell">
      <BrandHeader />
      <section className="section-wrap py-6 sm:py-10">
        <div className="section-card overflow-hidden">
          <div className="grid gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-12">
            <div>
              <div className="inline-flex rounded-full border border-mango/20 bg-mango/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-mango">
                Fresh drop by {siteConfig.brandName}
              </div>
              <h1 className="mt-5 max-w-2xl font-[var(--font-display)] text-4xl leading-tight text-leaf sm:text-5xl lg:text-6xl">
                {siteConfig.heroHeadline}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">{siteConfig.heroSubheadline}</p>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">{siteConfig.description}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <CtaButton pricingOptionId="double-pack">Purchase Now</CtaButton>
                <CtaButton pricingOptionId="regular" variant="secondary">Order Now</CtaButton>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {siteConfig.trustPoints.map((point) => (
                  <div key={point} className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 text-sm font-medium text-slate-700">
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2.5rem] bg-cream p-8">
                <div className="relative aspect-square">
                  <Image
                    src={siteConfig.images[0].src}
                    alt={siteConfig.images[0].alt}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ShowcasePanel />

      <section className="section-wrap py-8 sm:py-12">
        <div className="section-card p-6 sm:p-8">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-mango">Why buyers choose it</div>
            <h2 className="mt-3 font-[var(--font-display)] text-3xl text-leaf sm:text-4xl">Healthy snacking that still feels like a treat</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {siteConfig.benefits.map((benefit, index) => (
              <div key={benefit.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf text-lg font-bold text-white">
                  0{index + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-leaf">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <CtaButton pricingOptionId="bundle">Order Now</CtaButton>
          </div>
        </div>
      </section>

      <section className="section-wrap py-8 sm:py-12">
        <div className="section-card p-6 sm:p-8">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-mango">Testimonials</div>
            <h2 className="mt-3 font-[var(--font-display)] text-3xl text-leaf sm:text-4xl">Real customers, repeat orders, genuine love</h2>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {siteConfig.testimonials.map((testimonial) => (
              <div key={testimonial.author} className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
                <div className="text-mango">★★★★★</div>
                <p className="mt-4 text-sm leading-7 text-slate-600">“{testimonial.quote}”</p>
                <div className="mt-5 text-sm font-semibold text-leaf">{testimonial.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap py-8 sm:py-12">
        <div className="section-card p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-mango">FAQ</div>
              <h2 className="mt-3 font-[var(--font-display)] text-3xl text-leaf sm:text-4xl">Everything buyers usually ask before ordering</h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600">
                Clear answers help customers feel confident about placing a Cash on Delivery order. If you need anything else, contact {siteConfig.replyToEmail}.
              </p>
            </div>
            <FaqList />
          </div>
        </div>
      </section>

      <section className="section-wrap py-8 pb-16 sm:py-12 sm:pb-20">
        <div className="overflow-hidden rounded-[2rem] bg-leaf px-6 py-10 text-white shadow-glow sm:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-mangoSoft">Ready to order?</div>
              <h2 className="mt-3 font-[var(--font-display)] text-3xl sm:text-4xl">Get your Dryora dried mango delivered with Cash on Delivery</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
                Stock is limited due to high demand. Choose your favorite pack now and our team will call you soon to confirm your order.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <CtaButton pricingOptionId="double-pack" className="bg-white text-leaf hover:bg-cream">Purchase Now</CtaButton>
              <CtaButton pricingOptionId="bundle" className="border-white/20 bg-transparent text-white hover:bg-white/10" variant="secondary">Buy Now</CtaButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
