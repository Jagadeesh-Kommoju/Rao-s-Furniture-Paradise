"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { mainNavCategories } from "@/data/navigation";
import type { NavCategoryItem } from "@/types/furniture";

export function CategoryNavBar() {
  const [activeCategory, setActiveCategory] = useState<NavCategoryItem | null>(
    null
  );
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpen = (cat: NavCategoryItem) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setActiveCategory(cat);
  };

  const handleScheduleClose = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => setActiveCategory(null), 160);
  };

  return (
    <div
      className="hidden md:block sticky top-0 z-40 border-b border-border-soft bg-white shadow-[0_2px_10px_rgba(36,36,36,0.04)]"
      onMouseLeave={handleScheduleClose}
    >
      <div className="container-storefront relative">
        <nav aria-label="Main furniture categories">
          <ul className="flex h-[38px] items-center justify-between gap-1 lg:gap-1.5 text-[11px] lg:text-[13px] xl:text-[14px] font-normal">
            {mainNavCategories.map((cat) => {
              const isOpen = activeCategory?.id === cat.id;
              return (
                <li
                  key={cat.id}
                  onMouseEnter={() => handleOpen(cat)}
                  className="h-full flex items-center"
                >
                  <Link
                    href={cat.href}
                    onFocus={() => handleOpen(cat)}
                    className={`inline-flex h-full items-center whitespace-nowrap border-b-2 px-0.5 lg:px-1 transition-colors ${
                      isOpen
                        ? "border-terracotta text-terracotta"
                        : cat.highlight
                        ? "border-transparent text-terracotta font-medium hover:text-terracotta-hover"
                        : "border-transparent text-[#333333] hover:text-terracotta"
                    }`}
                  >
                    <span>{cat.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mega-menu Dropdown */}
        {activeCategory && (
          <div
            onMouseEnter={() => {
              if (closeTimeout.current) clearTimeout(closeTimeout.current);
            }}
            onMouseLeave={handleScheduleClose}
            className="absolute left-4 right-4 top-full z-50 rounded-b-xl border border-t-0 border-beige bg-white p-6 shadow-2xl"
            role="region"
            aria-label={`${activeCategory.label} category menu`}
          >
            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
                {activeCategory.columns.map((col) => (
                  <div key={col.heading}>
                    <p className="text-xs font-bold uppercase tracking-wider text-walnut border-b border-border-soft pb-2 mb-3">
                      {col.heading}
                    </p>
                    <ul className="space-y-2">
                      {col.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={() => setActiveCategory(null)}
                            className="group flex items-center justify-between text-[13px] text-muted hover:text-terracotta transition-colors"
                          >
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="col-span-4">
                <Link
                  href={activeCategory.featuredCard.href}
                  onClick={() => setActiveCategory(null)}
                  className="group block overflow-hidden rounded-lg border border-beige bg-ivory"
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={activeCategory.featuredCard.image}
                      alt={activeCategory.featuredCard.title}
                      fill
                      sizes="320px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3.5 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-walnut group-hover:text-terracotta transition-colors">
                        {activeCategory.featuredCard.title}
                      </p>
                      <p className="text-xs text-muted mt-0.5">
                        {activeCategory.featuredCard.subtitle}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-terracotta shrink-0" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
