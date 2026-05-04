import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function BrandHeader() {
  return (
    <header className="section-wrap pt-6 sm:pt-8">
      <div className="section-card flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/logo.png"
            alt={`${siteConfig.brandName} logo`}
            width={160}
            height={63}
            className="h-11 w-auto sm:h-12"
            priority
          />
        </Link>
        <div className="hidden rounded-full border border-leaf/10 bg-cream px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-leaf sm:block">
          Cash on Delivery
        </div>
      </div>
    </header>
  );
}
