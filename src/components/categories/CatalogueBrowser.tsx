"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Scale,
  ArrowRight,
  Search,
} from "lucide-react";
import type { CategorySlug, FurnitureProduct, RoomGroup } from "@/types/furniture";
import { ProductCard } from "@/components/products/ProductCard";
import { extendedCategoryTiles } from "@/data/categories";
import { useStore } from "@/stores/useStore";
import { formatInrPrice } from "@/utils/enquiry";

interface CatalogueBrowserProps {
  products: FurnitureProduct[];
  initialCategory?: CategorySlug | "all";
  initialRoom?: RoomGroup | "all";
  initialQuery?: string;
  initialFeaturedOnly?: boolean;
  pageTitle: string;
  pageSubtitle: string;
  lockCategory?: boolean;
}

const ROOM_LABELS: { id: RoomGroup | "all"; label: string }[] = [
  { id: "all", label: "All Rooms" },
  { id: "living", label: "Living Room" },
  { id: "bedroom", label: "Bedroom" },
  { id: "dining", label: "Dining Room" },
  { id: "study-office", label: "Study & Office" },
  { id: "decor", label: "Decor" },
  { id: "outdoor", label: "Outdoor" },
];

const MATERIAL_GROUPS = [
  { id: "all", label: "All Materials" },
  { id: "walnut", label: "Walnut" },
  { id: "teak", label: "Teak" },
  { id: "oak", label: "Oak / Ash" },
  { id: "fabric", label: "Fabric & Linen" },
  { id: "wood", label: "Solid / Engineered Wood" },
];

export function CatalogueBrowser({
  products,
  initialCategory = "all",
  initialRoom = "all",
  initialQuery = "",
  initialFeaturedOnly = false,
  pageTitle,
  pageSubtitle,
  lockCategory = false,
}: CatalogueBrowserProps) {
  const compareSlugs = useStore((s) => s.compareSlugs);
  const clearCompare = useStore((s) => s.clearCompare);
  const toggleCompare = useStore((s) => s.toggleCompare);

  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | "all">(
    initialCategory
  );
  const [selectedRoom, setSelectedRoom] = useState<RoomGroup | "all">(initialRoom);
  const [selectedMaterial, setSelectedMaterial] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [featuredOnly, setFeaturedOnly] = useState(initialFeaturedOnly);
  const [sortBy, setSortBy] = useState<"featured" | "name-asc" | "price-asc" | "price-desc">(
    "featured"
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [initialQuery]);

  const colorOptions = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => {
      p.colors.forEach((c) => {
        if (!map.has(c.name)) map.set(c.name, c.hex);
      });
    });
    return Array.from(map.entries()).slice(0, 14);
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const list = products.filter((p) => {
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
      if (selectedRoom !== "all" && p.room !== selectedRoom) return false;
      if (featuredOnly && !p.featured) return false;
      if (selectedMaterial !== "all") {
        const mat = `${p.material || ""} ${p.finish || ""}`.toLowerCase();
        if (selectedMaterial === "oak") {
          if (!mat.includes("oak") && !mat.includes("ash") && !mat.includes("beech"))
            return false;
        } else if (!mat.includes(selectedMaterial)) {
          return false;
        }
      }
      if (
        selectedColor !== "all" &&
        !p.colors.some((c) => c.name === selectedColor)
      ) {
        return false;
      }
      if (q) {
        const hay = `${p.name} ${p.subcategory} ${p.description} ${p.material || ""} ${p.colors
          .map((c) => c.name)
          .join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const sorted = [...list];
    if (sortBy === "featured") {
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    } else if (sortBy === "name-asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "price-asc") {
      sorted.sort((a, b) => (a.price ?? 9999999) - (b.price ?? 9999999));
    } else if (sortBy === "price-desc") {
      sorted.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    }
    return sorted;
  }, [
    products,
    searchTerm,
    selectedCategory,
    selectedRoom,
    selectedMaterial,
    selectedColor,
    featuredOnly,
    sortBy,
  ]);

  const comparedProducts = useMemo(() => {
    if (!mounted) return [];
    return products.filter((p) => compareSlugs.includes(p.slug));
  }, [mounted, products, compareSlugs]);

  const resetFilters = () => {
    setSearchTerm("");
    if (!lockCategory) setSelectedCategory("all");
    setSelectedRoom("all");
    setSelectedMaterial("all");
    setSelectedColor("all");
    setFeaturedOnly(false);
    setSortBy("featured");
  };

  const filterSidebar = (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="catalogue-inline-search"
          className="block text-xs font-bold uppercase tracking-wider text-walnut mb-2"
        >
          Keyword Filter
        </label>
        <div className="relative">
          <input
            id="catalogue-inline-search"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter by name, finish..."
            className="h-9 w-full rounded-md border border-beige bg-white pl-3 pr-8 text-xs text-charcoal focus:border-terracotta focus:outline-none"
          />
          <Search className="h-3.5 w-3.5 text-muted absolute right-2.5 top-2.5" />
        </div>
      </div>

      {!lockCategory && (
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-walnut mb-2">
            Category
          </p>
          <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`w-full text-left rounded px-2.5 py-1.5 text-xs transition-colors ${
                selectedCategory === "all"
                  ? "bg-terracotta text-white font-semibold"
                  : "text-charcoal hover:bg-ivory"
              }`}
            >
              All Categories
            </button>
            {extendedCategoryTiles.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`w-full flex items-center justify-between rounded px-2.5 py-1.5 text-xs transition-colors ${
                  selectedCategory === cat.slug
                    ? "bg-terracotta text-white font-semibold"
                    : "text-charcoal hover:bg-ivory"
                }`}
              >
                <span>{cat.name}</span>
                {cat.isDemoCategory && selectedCategory !== cat.slug && (
                  <span className="text-[10px] text-muted">Demo</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-walnut mb-2">
          Room
        </p>
        <div className="flex flex-wrap gap-1.5">
          {ROOM_LABELS.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setSelectedRoom(r.id)}
              className={`rounded-full px-2.5 py-1 text-xs transition-colors ${
                selectedRoom === r.id
                  ? "bg-walnut text-white font-medium"
                  : "border border-beige bg-white text-charcoal hover:border-terracotta"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-walnut mb-2">
          Material &amp; Finish
        </p>
        <div className="space-y-1">
          {MATERIAL_GROUPS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedMaterial(m.id)}
              className={`w-full text-left rounded px-2.5 py-1.5 text-xs transition-colors ${
                selectedMaterial === m.id
                  ? "bg-ivory border border-terracotta font-semibold text-terracotta"
                  : "text-charcoal hover:bg-ivory"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-walnut mb-2">
          Color Variation
        </p>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedColor("all")}
            className={`rounded-full px-2.5 py-1 text-[11px] ${
              selectedColor === "all"
                ? "bg-walnut text-white"
                : "border border-beige bg-white text-charcoal"
            }`}
          >
            Any
          </button>
          {colorOptions.map(([name, hex]) => (
            <button
              key={name}
              type="button"
              onClick={() =>
                setSelectedColor(selectedColor === name ? "all" : name)
              }
              title={name}
              className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] ${
                selectedColor === name
                  ? "border-terracotta bg-ivory font-semibold text-walnut"
                  : "border-beige bg-white text-charcoal"
              }`}
            >
              <span
                className="h-3 w-3 rounded-full border border-black/15"
                style={{ backgroundColor: hex }}
              />
              <span className="truncate max-w-[90px]">{name}</span>
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-xs text-charcoal cursor-pointer">
        <input
          type="checkbox"
          checked={featuredOnly}
          onChange={(e) => setFeaturedOnly(e.target.checked)}
          className="rounded border-beige accent-terracotta"
        />
        <span>Show Featured Demo Highlights Only</span>
      </label>

      <button
        type="button"
        onClick={resetFilters}
        className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-beige bg-ivory px-3 py-2 text-xs font-semibold text-walnut hover:border-terracotta hover:text-terracotta transition-colors"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        <span>Reset Filters</span>
      </button>
    </div>
  );

  return (
    <div className="container-storefront py-6 md:py-8">
      {/* Header + Demo Notice */}
      <div className="flex flex-col gap-3 border-b border-border-soft pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-walnut">
            {pageTitle}
          </h1>
          <p className="mt-1 text-sm text-muted max-w-2xl">{pageSubtitle}</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden inline-flex items-center gap-1.5 rounded-md border border-beige bg-white px-3.5 py-2 text-xs font-semibold text-charcoal"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-terracotta" />
            <span>Filters</span>
          </button>

          <select
            aria-label="Sort furniture products"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="h-9 rounded-md border border-beige bg-white px-3 text-xs font-medium text-charcoal focus:border-terracotta focus:outline-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="name-asc">Sort: Name (A–Z)</option>
            <option value="price-asc">Sort: Price (Low to High)</option>
            <option value="price-desc">Sort: Price (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Demo Catalogue Banner */}
      <div className="mt-4 rounded-lg border border-beige bg-ivory px-4 py-2.5 text-xs text-walnut flex flex-wrap items-center justify-between gap-2">
        <span>
          <strong>Demonstration Catalogue Notice:</strong> Furniture items shown
          below are Phase 1 illustrative entries for previewing layout, sizing,
          and enquiry flows prior to final client SKU approval.
        </span>
        <span className="font-semibold">
          Showing {filteredProducts.length} of {products.length} items
        </span>
      </div>

      {/* Compare Bar */}
      {mounted && comparedProducts.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-terracotta/40 bg-white px-4 py-2.5 shadow-2xs">
          <div className="flex items-center gap-2 text-xs text-walnut">
            <Scale className="h-4 w-4 text-terracotta" />
            <span className="font-semibold">
              Compare ({comparedProducts.length}/3):
            </span>
            <span className="text-muted">
              {comparedProducts.map((p) => p.name).join(" · ")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCompareModalOpen(true)}
              className="rounded bg-terracotta px-3 py-1 text-xs font-semibold text-white hover:bg-terracotta-hover"
            >
              Compare Side-by-Side
            </button>
            <button
              type="button"
              onClick={clearCompare}
              className="rounded border border-beige px-2.5 py-1 text-xs text-muted hover:text-charcoal"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Main Split: Sidebar + Grid */}
      <div className="mt-6 grid grid-cols-1 gap-7 lg:grid-cols-12">
        <aside className="hidden lg:block lg:col-span-3 rounded-xl border border-beige bg-white p-5 h-fit">
          {filterSidebar}
        </aside>

        <div className="lg:col-span-9">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-beige bg-ivory p-10 text-center">
              <p className="font-display text-lg font-semibold text-walnut">
                No matching demonstration products found
              </p>
              <p className="mt-1.5 text-sm text-muted">
                Try clearing some filters or request a custom furniture
                consultation with our Daba Gardens showroom team.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded-md bg-walnut px-4 py-2 text-xs font-semibold text-white hover:bg-walnut-dark"
                >
                  Reset All Filters
                </button>
                <Link
                  href="/customize"
                  className="rounded-md border border-terracotta bg-white px-4 py-2 text-xs font-semibold text-terracotta hover:bg-terracotta hover:text-white transition-colors"
                >
                  Request Custom Consultation
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-[70] lg:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label="Filter Products"
        >
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative z-10 h-full w-[86%] max-w-xs bg-white p-5 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-border-soft pb-3 mb-4">
              <span className="font-display text-base font-semibold text-walnut">
                Filter Catalogue
              </span>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {filterSidebar}
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Modal */}
      {compareModalOpen && (
        <div
          className="fixed inset-0 z-[75] flex items-center justify-center bg-black/55 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Side-by-side product comparison"
          onClick={(e) => {
            if (e.target === e.currentTarget) setCompareModalOpen(false);
          }}
        >
          <div className="w-full max-w-4xl rounded-xl border border-beige bg-white shadow-2xl overflow-hidden max-h-[88vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-border-soft bg-ivory px-5 py-3.5">
              <h2 className="font-display text-lg font-semibold text-walnut">
                Compare Selected Furniture
              </h2>
              <button
                type="button"
                onClick={() => setCompareModalOpen(false)}
                aria-label="Close comparison"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-auto p-5">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border-soft">
                    <th className="py-2 pr-4 font-semibold text-muted w-32">Feature</th>
                    {comparedProducts.map((p) => (
                      <th key={p.id} className="py-2 px-3 min-w-[180px] align-top">
                        <div className="relative h-28 w-full rounded overflow-hidden border border-border-soft mb-2">
                          <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                        </div>
                        <Link
                          href={`/products/${p.slug}`}
                          onClick={() => setCompareModalOpen(false)}
                          className="font-semibold text-walnut hover:text-terracotta inline-flex items-center gap-1"
                        >
                          <span>{p.name}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleCompare(p.slug, p.name)}
                          className="block mt-1 text-[11px] text-muted underline"
                        >
                          Remove
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft">
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-muted">Category</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="py-2.5 px-3">{p.subcategory}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-muted">Price Guide</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="py-2.5 px-3 font-semibold text-walnut">
                        {formatInrPrice(p.price)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-muted">Material</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="py-2.5 px-3">{p.material || "—"}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-muted">Dimensions</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="py-2.5 px-3">
                        {p.dimensions
                          ? `${p.dimensions.width} × ${p.dimensions.depth} × ${p.dimensions.height} ${p.dimensions.unit}`
                          : "—"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-muted">Finishes</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="py-2.5 px-3">
                        {p.colors.map((c) => c.name).join(", ") || "Standard"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
