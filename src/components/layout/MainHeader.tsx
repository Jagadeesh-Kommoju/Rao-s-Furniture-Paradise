"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Clock,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useStore } from "@/stores/useStore";
import { allProducts } from "@/data/products";
import { visualCategoryTiles } from "@/data/categories";
import { businessConfig } from "@/config/business";
import { formatInrPrice } from "@/utils/enquiry";

const TRENDING_SEARCHES = [
  "3-Seater Sofa",
  "King Size Bed",
  "Dining Table",
  "Executive Chair",
  "Study Table",
  "Wardrobe",
];

interface MainHeaderProps {
  onOpenMobileMenu: () => void;
}

export function MainHeader({ onOpenMobileMenu }: MainHeaderProps) {
  const router = useRouter();
  const wishlistIds = useStore((s) => s.wishlistIds);
  const enquiryItems = useStore((s) => s.enquiryItems);
  const recentSearches = useStore((s) => s.recentSearches);
  const addRecentSearch = useStore((s) => s.addRecentSearch);
  const clearRecentSearches = useStore((s) => s.clearRecentSearches);

  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [profileOpen, setProfileOpen] = useState(false);

  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return { products: [], categories: [] };
    }
    const matchedCats = visualCategoryTiles
      .filter(
        (c) =>
          c.name.toLowerCase().includes(trimmed) ||
          c.description.toLowerCase().includes(trimmed)
      )
      .slice(0, 3);
    const matchedProds = allProducts
      .filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.subcategory.toLowerCase().includes(trimmed) ||
          (p.material && p.material.toLowerCase().includes(trimmed)) ||
          p.colors.some((c) => c.name.toLowerCase().includes(trimmed))
      )
      .slice(0, 5);
    return { products: matchedProds, categories: matchedCats };
  }, [query]);

  const navigableUrls = useMemo(() => {
    if (!query.trim()) {
      return TRENDING_SEARCHES.map(
        (term) => `/search?q=${encodeURIComponent(term)}`
      );
    }
    return [
      ...suggestions.categories.map((c) => c.href),
      ...suggestions.products.map((p) => `/products/${p.slug}`),
    ];
  }, [query, suggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeIndex >= 0 && navigableUrls[activeIndex]) {
      setDropdownOpen(false);
      router.push(navigableUrls[activeIndex]);
      return;
    }
    const trimmed = query.trim();
    if (!trimmed) {
      router.push("/search");
      setDropdownOpen(false);
      return;
    }
    addRecentSearch(trimmed);
    setDropdownOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!dropdownOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        navigableUrls.length === 0 ? -1 : (prev + 1) % navigableUrls.length
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        navigableUrls.length === 0
          ? -1
          : (prev - 1 + navigableUrls.length) % navigableUrls.length
      );
    } else if (e.key === "Escape") {
      setDropdownOpen(false);
      setActiveIndex(-1);
    }
  };

  const wishlistCount = mounted ? wishlistIds.length : 0;
  const basketCount = mounted
    ? enquiryItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  return (
    <div className="bg-white border-b border-border-soft/70">
      <div className="container-storefront py-2 md:py-3 lg:py-[13px]">
        <div className="flex items-center justify-between gap-2 md:gap-4 lg:gap-6">
          {/* Left: Mobile Drawer Trigger + Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1 md:flex-initial">
            <button
              type="button"
              onClick={onOpenMobileMenu}
              aria-label="Open navigation menu"
              className="md:hidden inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border-soft text-charcoal hover:bg-ivory transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <BrandLogo />
          </div>

          {/* Center: Prominent Search Bar (Tablet md+ & Desktop) */}
          <div
            ref={searchWrapperRef}
            className="hidden md:block relative flex-1 md:max-w-[300px] lg:max-w-[540px] xl:max-w-[693px]"
          >
            <form onSubmit={handleSubmit} role="search" className="relative">
              <input
                type="search"
                role="combobox"
                value={query}
                onFocus={() => setDropdownOpen(true)}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setDropdownOpen(true);
                  setActiveIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search Products, Sofas, Beds & More..."
                aria-label="Search furniture catalogue"
                aria-expanded={dropdownOpen}
                aria-controls="header-search-suggestions"
                aria-autocomplete="list"
                className="h-[46px] w-full rounded-[4px] border border-[#D4CCC1] bg-white pl-4 pr-11 text-sm text-charcoal placeholder:text-muted/80 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/15 transition-colors"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-0 top-0 flex h-[46px] w-11 items-center justify-center text-muted hover:text-terracotta transition-colors"
              >
                <Search className="h-[18px] w-[18px]" />
              </button>
            </form>

            {dropdownOpen && (
              <div
                id="header-search-suggestions"
                role="listbox"
                className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 rounded-xl border border-beige bg-white shadow-xl overflow-hidden"
              >
                {!query.trim() ? (
                  <div className="p-4 space-y-4">
                    {mounted && recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                            <Clock className="h-3.5 w-3.5" />
                            Recent Searches
                          </span>
                          <button
                            type="button"
                            onClick={clearRecentSearches}
                            className="text-[11px] text-terracotta hover:underline"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {recentSearches.map((term) => (
                            <button
                              key={term}
                              type="button"
                              onClick={() => {
                                setQuery(term);
                                setDropdownOpen(false);
                                router.push(
                                  `/search?q=${encodeURIComponent(term)}`
                                );
                              }}
                              className="rounded-full border border-border-soft bg-ivory px-3 py-1 text-xs text-charcoal hover:border-terracotta hover:text-terracotta transition-colors"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted mb-2.5">
                        <TrendingUp className="h-3.5 w-3.5 text-terracotta" />
                        Trending Searches
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {TRENDING_SEARCHES.map((term, idx) => (
                          <Link
                            key={term}
                            href={`/search?q=${encodeURIComponent(term)}`}
                            onClick={() => {
                              addRecentSearch(term);
                              setDropdownOpen(false);
                            }}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                              activeIndex === idx
                                ? "border-terracotta bg-ivory text-terracotta font-medium"
                                : "border-border-soft bg-[#FAF9F7] text-charcoal hover:border-terracotta hover:text-terracotta"
                            }`}
                          >
                            <span>{term}</span>
                            <ArrowUpRight className="h-3 w-3 text-muted" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-h-[380px] overflow-y-auto divide-y divide-border-soft">
                    {suggestions.categories.length > 0 && (
                      <div className="p-3">
                        <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                          Matching Categories
                        </p>
                        {suggestions.categories.map((cat, idx) => (
                          <Link
                            key={cat.id}
                            href={cat.href}
                            onClick={() => setDropdownOpen(false)}
                            className={`flex items-center justify-between rounded-md px-2.5 py-2 text-sm transition-colors ${
                              activeIndex === idx
                                ? "bg-ivory text-terracotta"
                                : "hover:bg-ivory text-charcoal"
                            }`}
                          >
                            <span className="font-medium">{cat.name}</span>
                            <span className="text-xs text-muted">
                              {cat.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {suggestions.products.length > 0 ? (
                      <div className="p-3">
                        <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                          Catalogue Suggestions
                        </p>
                        {suggestions.products.map((prod, idx) => {
                          const listIdx = suggestions.categories.length + idx;
                          return (
                            <Link
                              key={prod.id}
                              href={`/products/${prod.slug}`}
                              onClick={() => {
                                addRecentSearch(query);
                                setDropdownOpen(false);
                              }}
                              className={`flex items-center gap-3 rounded-lg p-2 transition-colors ${
                                activeIndex === listIdx
                                  ? "bg-ivory"
                                  : "hover:bg-ivory"
                              }`}
                            >
                              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded border border-border-soft bg-surface-subtle">
                                <Image
                                  src={prod.images[0]}
                                  alt={prod.name}
                                  fill
                                  sizes="44px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-charcoal">
                                  {prod.name}
                                </p>
                                <p className="text-xs text-muted">
                                  {prod.subcategory}
                                  {prod.material ? ` · ${prod.material}` : ""}
                                </p>
                              </div>
                              <span className="text-xs font-semibold text-walnut shrink-0">
                                {formatInrPrice(prod.price)}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      suggestions.categories.length === 0 && (
                        <div className="p-5 text-center text-sm text-muted">
                          No matches for &ldquo;{query}&rdquo;. Press Enter to
                          search full catalogue or{" "}
                          <Link
                            href="/customize"
                            onClick={() => setDropdownOpen(false)}
                            className="text-terracotta underline"
                          >
                            request custom furniture
                          </Link>
                          .
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Action Icons (Stores / Profile / Wishlist / Enquiry Basket) */}
          <div className="flex items-center gap-2.5 md:gap-4 lg:gap-5 shrink-0">
            <Link
              href="/showroom"
              className="hidden md:flex flex-col items-center gap-0.5 text-charcoal hover:text-terracotta transition-colors group"
            >
              <MapPin className="h-[20px] w-[20px] stroke-[1.7] text-terracotta" />
              <span className="text-[11px] font-normal leading-none">
                Showroom
              </span>
            </Link>

            <div className="relative hidden md:block" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((v) => !v)}
                aria-expanded={profileOpen}
                aria-haspopup="dialog"
                className="flex flex-col items-center gap-0.5 text-charcoal hover:text-terracotta transition-colors"
              >
                <User className="h-[20px] w-[20px] stroke-[1.7]" />
                <span className="text-[11px] font-normal leading-none">
                  Profile
                </span>
              </button>

              {profileOpen && (
                <div
                  role="dialog"
                  aria-label="Visitor Profile & Shortcuts"
                  className="absolute right-0 top-[calc(100%+10px)] z-50 w-72 rounded-xl border border-beige bg-white p-4 shadow-xl"
                >
                  <div className="flex items-center justify-between border-b border-border-soft pb-2.5 mb-3">
                    <div>
                      <p className="text-sm font-semibold text-walnut">
                        Showroom Guest
                      </p>
                      <p className="text-[11px] text-muted">
                        Saved locally on this browser
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setProfileOpen(false)}
                      aria-label="Close profile menu"
                      className="text-muted hover:text-charcoal p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <Link
                      href="/wishlist"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center justify-between rounded-md px-2.5 py-2 hover:bg-ivory text-charcoal"
                    >
                      <span>Saved Wishlist</span>
                      <span className="text-xs font-semibold text-terracotta">
                        {wishlistCount}
                      </span>
                    </Link>
                    <Link
                      href="/cart"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center justify-between rounded-md px-2.5 py-2 hover:bg-ivory text-charcoal"
                    >
                      <span>Enquiry Basket</span>
                      <span className="text-xs font-semibold text-terracotta">
                        {basketCount}
                      </span>
                    </Link>
                    <Link
                      href="/customize"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-md px-2.5 py-2 hover:bg-ivory text-charcoal"
                    >
                      Custom Consultation Request
                    </Link>
                    <Link
                      href="/showroom"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-md px-2.5 py-2 hover:bg-ivory text-charcoal"
                    >
                      Daba Gardens Showroom Map
                    </Link>
                  </div>
                  <p className="mt-3 border-t border-border-soft pt-2.5 text-[11px] text-muted leading-snug">
                    {businessConfig.brandName} · Phase 1 Guest Browsing Mode
                  </p>
                </div>
              )}
            </div>

            <Link
              href="/wishlist"
              className="relative flex flex-col items-center gap-0.5 text-charcoal hover:text-terracotta transition-colors p-1 md:p-0"
              aria-label={`Wishlist (${wishlistCount})`}
            >
              <span className="relative">
                <Heart className="h-[20px] w-[20px] stroke-[1.7]" />
                <span
                  className={`md:hidden absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white ${
                    wishlistCount > 0 ? "bg-terracotta" : "bg-walnut/75"
                  }`}
                >
                  {wishlistCount}
                </span>
                {wishlistCount > 0 && (
                  <span className="hidden md:flex absolute -right-2 -top-1.5 h-4 min-w-4 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </span>
              <span className="hidden md:inline text-[11px] font-normal leading-none">
                Wishlist ({wishlistCount})
              </span>
            </Link>

            <Link
              href="/cart"
              className="relative flex flex-col items-center gap-0.5 text-charcoal hover:text-terracotta transition-colors p-1 md:p-0"
              aria-label={`Enquiry Basket (${basketCount})`}
            >
              <span className="relative">
                <ShoppingBag className="h-[20px] w-[20px] stroke-[1.7]" />
                <span
                  className={`md:hidden absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white ${
                    basketCount > 0 ? "bg-walnut" : "bg-walnut/75"
                  }`}
                >
                  {basketCount}
                </span>
                {basketCount > 0 && (
                  <span className="hidden md:flex absolute -right-2 -top-1.5 h-4 min-w-4 items-center justify-center rounded-full bg-walnut px-1 text-[10px] font-bold text-white">
                    {basketCount}
                  </span>
                )}
              </span>
              <span className="hidden md:inline text-[11px] font-normal leading-none">
                Enquiry ({basketCount})
              </span>
            </Link>
          </div>
        </div>

        {/* Search-first mobile row (< md) */}
        <div className="mt-2 md:hidden">
          <form onSubmit={handleSubmit} role="search" className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sofas, beds, dining tables & more..."
              aria-label="Search furniture catalogue on mobile"
              className="h-9 w-full rounded-[4px] border border-[#D4CCC1] bg-[#FAF9F7] pl-3 pr-10 text-sm text-charcoal placeholder:text-muted/80 focus:border-terracotta focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Submit mobile search"
              className="absolute right-0 top-0 flex h-9 w-9 items-center justify-center text-muted"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
