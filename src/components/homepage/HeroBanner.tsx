import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

export function HeroBanner() {
  return (
    <section
      aria-label="Featured Visakhapatnam Showroom Hero"
      className="pt-2 pb-3 md:pt-0 md:pb-5"
    >
      <div className="container-storefront">
        <div
          data-section="hero"
          className="relative overflow-hidden rounded-[4px] bg-walnut text-ivory shadow-xs"
        >
          <div className="grid grid-cols-12 h-[168px] sm:h-[260px] md:h-[310px] lg:h-[399px]">
            {/* Left Editorial Brand Panel */}
            <div className="relative z-10 col-span-5 flex flex-col justify-center bg-gradient-to-br from-walnut via-walnut to-walnut-dark px-3.5 py-3 sm:px-7 sm:py-5 lg:px-10 lg:py-8">
              <span className="hidden lg:inline-flex w-fit items-center gap-1.5 rounded-full border border-beige/30 bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wide text-beige">
                <MapPin className="h-3 w-3 text-terracotta" />
                Daba Gardens, Visakhapatnam
              </span>
              <h2 className="lg:mt-3.5 font-display text-[17px] leading-[1.15] sm:text-2xl md:text-[28px] lg:text-[36px] font-normal sm:font-medium tracking-tight text-white">
                Beautiful Spaces.
                <span className="block text-beige font-light sm:font-normal">
                  Better Living.
                </span>
              </h2>
              <p className="hidden lg:block mt-3 max-w-md text-[13.5px] leading-relaxed text-ivory/85">
                Thoughtfully curated home &amp; office furniture near Saraswati
                Park. Explore living room, bedroom, dining, and workspace pieces.
              </p>
              <div className="mt-2.5 sm:mt-4 lg:mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-1.5 rounded-[4px] bg-terracotta px-2.5 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 text-[10.5px] sm:text-xs lg:text-sm font-semibold text-white hover:bg-terracotta-hover transition-colors shadow-xs"
                >
                  <span>Explore Collections</span>
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
                <Link
                  href="/showroom"
                  className="hidden lg:inline-flex items-center gap-2 rounded-[4px] border border-beige/40 bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
                >
                  <span>Visit Showroom</span>
                </Link>
              </div>
            </div>

            {/* Right Architectural Interior Visual */}
            <div className="relative col-span-7 h-full">
              <Image
                src="/images/banners/hero-living.jpg"
                alt="Sunlit living room interior showcasing wooden sofa and coffee table — illustrative showroom display"
                fill
                priority
                sizes="(max-width: 768px) 60vw, 760px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-walnut/30 via-transparent to-transparent" />
              <div className="hidden sm:block absolute bottom-2.5 right-3 rounded bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white/90">
                Illustrative Display · Phase 1 Demo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
