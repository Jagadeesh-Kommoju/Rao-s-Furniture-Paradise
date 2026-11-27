import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function PromoBanner() {
  return (
    <section aria-label="Timeless Furniture Banner" className="my-4 md:my-5">
      <div className="container-storefront">
        <div
          data-section="promo-strip"
          className="relative overflow-hidden rounded-[4px] bg-walnut text-white h-[92px] sm:h-[118px] md:h-[140px]"
        >
          <div className="grid grid-cols-12 h-full items-center">
            <div className="relative z-10 col-span-8 md:col-span-7 flex items-center justify-between gap-4 px-4 sm:px-8">
              <div className="min-w-0">
                <p className="hidden sm:block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-beige">
                  Rao&apos;s Furniture Paradise · Daba Gardens
                </p>
                <h2 className="font-display text-[15px] sm:text-xl md:text-[24px] font-medium leading-tight text-white">
                  Transform Your Home with Timeless Furniture
                </h2>
                <p className="hidden md:block mt-1 text-xs text-ivory/85">
                  Thoughtfully crafted collections for Visakhapatnam homes &amp; offices.
                </p>
              </div>
              <Link
                href="/collections"
                className="shrink-0 inline-flex items-center gap-1.5 rounded-[4px] bg-terracotta px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold text-white hover:bg-terracotta-hover transition-colors"
              >
                <span>Explore</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="relative col-span-4 md:col-span-5 h-full">
              <Image
                src="/images/banners/promo-timeless.jpg"
                alt="Warm living and dining interior collection — illustrative display"
                fill
                sizes="(max-width: 768px) 35vw, 520px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-walnut via-walnut/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
