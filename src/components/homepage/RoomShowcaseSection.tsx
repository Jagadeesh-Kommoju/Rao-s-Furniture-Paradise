import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { FurnitureProduct, RoomShowcaseConfig } from "@/types/furniture";
import { ProductCarousel } from "./ProductCarousel";

interface RoomShowcaseSectionProps {
  config: RoomShowcaseConfig;
  products: FurnitureProduct[];
}

export function RoomShowcaseSection({
  config,
  products,
}: RoomShowcaseSectionProps) {
  return (
    <section
      id={config.id}
      aria-label={config.title}
      className="py-6 md:py-8 border-b border-[#EFEFEF]"
    >
      <div className="container-storefront">
        {/* Section Title + View All */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="font-display text-[19px] sm:text-[24px] font-normal tracking-[0.4px] text-[#333333]">
            {config.title}
          </h2>
          <Link
            href={config.viewAllHref}
            className="inline-flex items-center gap-1 rounded-full border border-[#D4D4D4] bg-white px-4 py-1.5 text-xs sm:text-sm font-normal text-[#333333] hover:border-terracotta hover:text-terracotta transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* WoodenStreet 1+4 Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-12">
          {/* Left Featured Vertical Hero Card — Top-left editorial overlay matching PDF pages 2-4 */}
          <Link
            href={config.heroTile.href}
            className="group relative overflow-hidden rounded-[6px] bg-surface-subtle h-[230px] sm:h-[360px] lg:col-span-6 lg:h-[500px]"
          >
            <Image
              src={config.heroTile.image}
              alt={config.heroTile.title}
              fill
              sizes="(max-width: 1024px) 100vw, 608px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/25" />
            <div className="absolute left-5 top-5 right-5 sm:left-7 sm:top-7 sm:right-7 text-white">
              <p className="text-xs sm:text-sm text-white/95 line-clamp-1">
                {config.heroTile.subtitle}
              </p>
              <p className="mt-1 font-display text-2xl sm:text-[32px] font-medium leading-tight tracking-tight">
                {config.heroTile.title}
              </p>
              <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-[4px] bg-terracotta/95 px-3 py-1 text-[11px] sm:text-xs font-medium uppercase tracking-wide text-white shadow-xs">
                <span>Explore Range</span>
                <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>

          {/* Right 2x2 Subcategory Tiles (taller square-ish proportions) */}
          <div className="grid grid-cols-2 gap-3.5 lg:col-span-6">
            {config.subTiles.map((tile) => (
              <Link
                key={tile.title}
                href={tile.href}
                className="group relative overflow-hidden rounded-[6px] bg-surface-subtle h-[148px] sm:h-[210px] lg:h-[243px]"
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  sizes="(max-width: 640px) 48vw, (max-width: 1024px) 45vw, 300px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-2.5 sm:p-4 text-white">
                  <p className="text-xs sm:text-[15px] font-medium leading-tight">
                    {tile.title}
                  </p>
                  <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#333333] transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Room Featured Products Carousel */}
        <ProductCarousel heading={config.productsHeading} products={products} />
      </div>
    </section>
  );
}
