"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FurnitureProduct } from "@/types/furniture";
import { ProductCard } from "@/components/products/ProductCard";

interface ProductCarouselProps {
  heading: string;
  products: FurnitureProduct[];
}

export function ProductCarousel({ heading, products }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (products.length === 0) return null;

  return (
    <div className="mt-7 relative">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap items-baseline gap-2.5">
          <h3 className="font-display text-[17px] sm:text-[20px] font-normal leading-[25px] tracking-[1px] text-[#333333]">
            {heading}
          </h3>
          <span className="text-[11px] text-muted">
            (Illustrative Phase 1 Preview Catalogue)
          </span>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label={`Scroll ${heading} left`}
          className="hidden sm:flex absolute left-2 top-[34%] -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#333333] hover:text-terracotta transition-colors shadow-md border border-[#E5E5E5]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-3 sm:-ml-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="pl-3 sm:pl-4 shrink-0 basis-[49%] sm:basis-1/3 md:basis-1/4 lg:basis-[22.5%]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollNext}
          aria-label={`Scroll ${heading} right`}
          className="hidden sm:flex absolute right-2 top-[34%] -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#333333] hover:text-terracotta transition-colors shadow-md border border-[#E5E5E5]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
