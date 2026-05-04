"use client";

import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { formatCurrency, cn } from "@/lib/utils";
import { QuantitySelector } from "@/components/quantity-selector";
import { CtaButton } from "@/components/cta-button";

export function ShowcasePanel() {
  const [activeImage, setActiveImage] = useState(0);
  const [activeOptionId, setActiveOptionId] = useState(siteConfig.pricingOptions[1].id);
  const [quantity, setQuantity] = useState(1);

  const activeOption = siteConfig.pricingOptions.find((option) => option.id === activeOptionId) ?? siteConfig.pricingOptions[0];
  const totalPrice = activeOption.unitPrice * quantity;

  return (
    <section id="showcase" className="section-wrap py-8 sm:py-12">
      <div className="section-card grid gap-8 overflow-hidden p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-[2rem] bg-cream p-6">
            <div className="relative aspect-[4/3]">
              <Image
                src={siteConfig.images[activeImage].src}
                alt={siteConfig.images[activeImage].alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={activeImage === 0}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {siteConfig.images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveImage(index)}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-2xl border bg-cream p-2 transition",
                  activeImage === index ? "border-mango shadow-md" : "border-slate-200 hover:border-leaf/30"
                )}
              >
                <Image src={image.src} alt={image.alt} fill className="object-cover p-2" sizes="120px" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit rounded-full border border-mango/20 bg-mango/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-mango">
            Limited-time offer
          </div>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl text-leaf sm:text-4xl">{siteConfig.productName}</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">{siteConfig.description}</p>

          <div className="mt-6 grid gap-3">
            {siteConfig.pricingOptions.map((option) => {
              const selected = option.id === activeOptionId;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setActiveOptionId(option.id)}
                  className={cn(
                    "rounded-[1.5rem] border p-4 text-left transition",
                    selected
                      ? "border-leaf bg-leaf text-white shadow-glow"
                      : "border-slate-200 bg-white hover:border-leaf/25"
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{option.label}</div>
                      <div className={cn("mt-1 text-sm", selected ? "text-white/80" : "text-slate-500")}>
                        {option.shortLabel} • {option.description}
                      </div>
                    </div>
                    <div className="text-right">
                      {option.highlight ? (
                        <div className={cn("mb-2 text-[11px] font-semibold uppercase tracking-[0.18em]", selected ? "text-mangoSoft" : "text-mango")}>
                          {option.highlight}
                        </div>
                      ) : null}
                      <div className="text-lg font-bold">{formatCurrency(option.unitPrice)}</div>
                      {option.compareAtPrice ? (
                        <div className={cn("text-sm line-through", selected ? "text-white/65" : "text-slate-400")}>
                          {formatCurrency(option.compareAtPrice)}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Quantity</div>
              <QuantitySelector value={quantity} onChange={setQuantity} />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Total Price</div>
              <div className="mt-2 text-3xl font-bold text-leaf">{formatCurrency(totalPrice)}</div>
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-mango/15 bg-mango/10 p-5">
            <div className="text-sm font-semibold text-leaf">Quick order summary</div>
            <div className="mt-3 grid gap-2 text-sm text-slate-700">
              <div className="flex items-center justify-between gap-4">
                <span>Selected pack</span>
                <span className="font-semibold">{activeOption.shortLabel}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Price per piece</span>
                <span className="font-semibold">{formatCurrency(activeOption.unitPrice)}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Delivery fee in Kathmandu</span>
                <span className="font-semibold">Free</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <CtaButton pricingOptionId={activeOption.id} quantity={quantity}>Purchase Now</CtaButton>
            <CtaButton pricingOptionId={activeOption.id} quantity={quantity} variant="secondary">Order Now</CtaButton>
            <CtaButton pricingOptionId={activeOption.id} quantity={quantity} variant="secondary">Buy Now</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
