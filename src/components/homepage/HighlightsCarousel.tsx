"use client";

import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const highlightCards = [
  {
    title: "SOFA CUM BED",
    subtitle: "Furniture for your everyday comfort.",
    image: "/images/categories/sofa-cum-beds.jpg",
    href: "/collections/sofa-cum-beds",
  },
  {
    title: "COFFEE TABLE",
    subtitle: "Centerpieces crafted for everyday living.",
    image: "/images/categories/coffee-tables.jpg",
    href: "/collections/coffee-tables",
  },
  {
    title: "TV UNITS",
    subtitle: "Smart storage for your living room.",
    image: "/images/categories/tv-units.jpg",
    href: "/collections/tv-units",
  },
  {
    title: "EXECUTIVE CHAIRS",
    subtitle: "Supportive seating built for long workdays.",
    image: "/images/categories/office-chairs.jpg",
    href: "/collections/office-chairs",
  },
  {
    title: "DRESSING TABLES",
    subtitle: "Thoughtful everyday bedroom organization.",
    image: "/images/categories/dressing-tables.jpg",
    href: "/collections/dressing-tables",
  },
  {
    title: "STUDY TABLES",
    subtitle: "Focused work desks for homes & studios.",
    image: "/images/categories/study-tables.jpg",
    href: "/collections/study-tables",
  },
];

export function HighlightsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      data-section="highlights"
      aria-label="Showroom Curated Highlights"
      className="my-5 bg-[#F5F5F5] py-8 md:py-10"
    >
      <div className="container-storefront">
        <div className="text-center mb-6">
          <h2 className="font-display text-[20px] sm:text-[26px] font-normal tracking-[0.5px] text-[#333333]">
            Curated Furniture Highlights
          </h2>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous highlight"
            className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#333333] hover:border-terracotta hover:text-terracotta transition-colors shadow-md"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {highlightCards.map((card) => (
                <div
                  key={card.title}
                  className="pl-4 shrink-0 basis-[82%] sm:basis-1/2 lg:basis-1/3"
                >
                  <Link
                    href={card.href}
                    className="group block overflow-hidden rounded-[6px] bg-white shadow-xs transition-shadow hover:shadow-md"
                  >
                    <div className="relative h-[200px] sm:h-[225px] lg:h-[236px] w-full overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 405px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
                      <div className="absolute inset-y-0 left-0 flex flex-col justify-between p-5 sm:p-6 max-w-[68%] text-white">
                        <div>
                          <p className="font-display text-[17px] sm:text-[20px] font-medium uppercase tracking-[0.5px] leading-tight">
                            {card.title}
                          </p>
                          <p className="mt-1.5 text-xs sm:text-[13px] text-white/90 leading-snug line-clamp-2">
                            {card.subtitle}
                          </p>
                        </div>
                        <span className="inline-flex w-fit items-center rounded-full bg-white px-4 py-1.5 text-[11.5px] font-medium text-[#333333] group-hover:bg-terracotta group-hover:text-white transition-colors shadow-xs">
                          Explore Now
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next highlight"
            className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#333333] hover:border-terracotta hover:text-terracotta transition-colors shadow-md"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
