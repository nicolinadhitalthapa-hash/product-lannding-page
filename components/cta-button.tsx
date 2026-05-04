"use client";

import Link from "next/link";
import { getPricingOptionById } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Props = {
  pricingOptionId?: string;
  quantity?: number;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function CtaButton({
  pricingOptionId = "regular",
  quantity = 1,
  children,
  variant = "primary",
  className
}: Props) {
  const option = getPricingOptionById(pricingOptionId);

  const href = `/checkout?option=${option.id}&quantity=${quantity}&product=${encodeURIComponent(option.shortLabel)}`;

  return (
    <Link href={href} className={cn(variant === "primary" ? "cta-button" : "cta-secondary", className)}>
      {children}
    </Link>
  );
}
