"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  categoryFilterTabs,
  visualCategoryTiles,
  extendedCategoryTiles,
  type CategoryFilterTabId,
} from "@/data/categories";

export function CategoryExplorer() {
  const [activeTab, setActiveTab] = useState<CategoryFilterTabId>("all");

  const visibleTiles = useMemo(() => {
    if (activeTab === "all") {
      return visualCategoryTiles;
    }
    return extendedCategoryTiles.filter((tile) => tile.tabGroup === activeTab);
  }, [activeTab]);

  return (
    <section
      id="categories"
      data-section="category-explorer"
      aria-label="Furniture Categories"
      className="py-2 sm:py-4 md:py-5"
    >
      <div className="container-storefront">
        {/* Filter Tabs: Underlined tabs on mobile, pill tabs on sm+ matching ref */}
        <div
          role="tablist"
          aria-label="Filter furniture categories by room"
          className="flex items-center justify-start sm:justify-center gap-4 sm:gap-2 overflow-x-auto no-scrollbar border-b border-[#E5E5E5] sm:border-b-0 sm:h-10 sm:px-3"
        >
          {categoryFilterTabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 transition-all text-[13.5px] sm:text-[14px] tracking-[0.35px] pb-2 sm:py-[6px] sm:px-6 sm:h-[34px] sm:rounded-full sm:flex sm:items-center sm:font-medium ${
                  isSelected
                    ? "border-b-2 border-terracotta font-semibold text-charcoal sm:border sm:border-terracotta sm:bg-terracotta sm:text-white"
                    : "border-b-2 border-transparent font-normal text-[#666666] hover:text-charcoal sm:border sm:border-[#D8D0C6] sm:bg-white sm:text-[#4A4A4A] sm:hover:border-terracotta sm:hover:text-terracotta"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Category Grid: 2-row horizontal scroll on mobile, 6x2 grid on desktop */}
        <div
          role="tabpanel"
          data-testid="category-grid"
          aria-label={`Categories for ${activeTab}`}
          className="mt-3 sm:mt-4 grid grid-flow-col grid-rows-2 auto-cols-[24%] gap-2.5 overflow-x-auto no-scrollbar sm:grid-flow-row sm:grid-rows-none sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-4"
        >
          {visibleTiles.map((tile) => (
            <Link
              key={tile.id}
              href={tile.href}
              className="group flex flex-col items-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-[4px]"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-[4px] bg-surface-subtle">
                <Image
                  src={tile.image}
                  alt={tile.name}
                  fill
                  sizes="(max-width: 640px) 24vw, (max-width: 1024px) 24vw, 195px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="mt-1.5 sm:mt-2.5 text-[10.5px] sm:text-[13px] font-normal uppercase tracking-[0.04em] leading-tight text-[#333333] group-hover:text-terracotta transition-colors">
                {tile.name}
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-3 text-center text-[11px] text-muted">
          Representative category visuals for Phase 1 demonstration · Visit Daba Gardens showroom for full catalogue
        </p>
      </div>
    </section>
  );
}
