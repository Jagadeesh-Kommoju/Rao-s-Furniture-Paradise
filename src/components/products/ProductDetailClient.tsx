"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  ShoppingBag,
  MessageSquarePlus,
  Scale,
  ZoomIn,
  X,
  Minus,
  Plus,
  Ruler,
  Info,
  MapPin,
} from "lucide-react";
import type { FurnitureProduct } from "@/types/furniture";
import { useStore } from "@/stores/useStore";
import {
  formatInrPrice,
  buildProductEnquiryMessage,
  getVerifiedWhatsappUrl,
} from "@/utils/enquiry";
import { ProductCard } from "./ProductCard";
import { allProducts } from "@/data/products";
import { businessConfig } from "@/config/business";

interface ProductDetailClientProps {
  product: FurnitureProduct;
  relatedProducts: FurnitureProduct[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const wishlistIds = useStore((s) => s.wishlistIds);
  const compareSlugs = useStore((s) => s.compareSlugs);
  const recentlyViewedSlugs = useStore((s) => s.recentlyViewedSlugs);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const toggleCompare = useStore((s) => s.toggleCompare);
  const addToEnquiry = useStore((s) => s.addToEnquiry);
  const recordProductView = useStore((s) => s.recordProductView);
  const openEnquiryModal = useStore((s) => s.openEnquiryModal);

  const [mounted, setMounted] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || "Standard Finish"
  );
  const [quantity, setQuantity] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    recordProductView(product.slug);
  }, [product.slug, recordProductView]);

  const wishlisted = mounted && wishlistIds.includes(product.id);
  const compared = mounted && compareSlugs.includes(product.slug);

  const recentlyViewedProducts = useMemo(() => {
    if (!mounted) return [];
    return recentlyViewedSlugs
      .filter((s) => s !== product.slug)
      .map((s) => allProducts.find((p) => p.slug === s))
      .filter((p): p is FurnitureProduct => Boolean(p))
      .slice(0, 4);
  }, [mounted, recentlyViewedSlugs, product.slug]);

  const enquiryMessage = buildProductEnquiryMessage(product, {
    selectedColor,
    quantity,
  });
  const whatsappUrl = getVerifiedWhatsappUrl(enquiryMessage);

  return (
    <div className="container-storefront py-6 md:py-9">
      {/* Clear Demonstration Catalogue Notice (Section 13) */}
      {product.isDemo  && (
        <div className="mb-6 flex items-start gap-2.5 rounded-lg border border-terracotta/35 bg-ivory px-4 py-3 text-xs sm:text-sm text-walnut">
          <Info className="h-4 w-4 shrink-0 text-terracotta mt-0.5" />
          <div>
            <strong>Demonstration Catalogue Item:</strong> This furniture entry
            and its illustrative visuals represent a Phase 1 showroom sample.
            Please enquire or visit our Daba Gardens showroom to confirm live
            stock, exact finishes, and current pricing.
          </div>
        </div>
      )}

      {/* Main 2-column Product Showcase */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Left: Image Gallery + Zoom */}
        <div className="lg:col-span-6 space-y-3">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-beige bg-surface-subtle group">
            <Image
              src={product.images[activeImageIdx] || product.images[0]}
              alt={`${product.name} view ${activeImageIdx + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover transition-transform duration-300 group-hover:scale-105 cursor-zoom-in"
              onClick={() => setZoomOpen(true)}
            />
            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              aria-label="Zoom product image"
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-white/90 px-3 py-1.5 text-xs font-medium text-charcoal shadow-sm hover:bg-white"
            >
              <ZoomIn className="h-4 w-4 text-terracotta" />
              <span>Zoom</span>
            </button>
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  aria-label={`Select image ${idx + 1}`}
                  className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                    activeImageIdx === idx
                      ? "border-terracotta"
                      : "border-beige opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info, Variant Selection, Enquiry Actions */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold uppercase tracking-wider text-terracotta">
                {product.subcategory}
              </span>
              <span className="text-beige">·</span>
              <span className="rounded bg-ivory border border-beige px-2 py-0.5 text-[11px] font-medium text-walnut">
                {product.availabilityStatus}
              </span>
            </div>

            <h1 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-walnut">
              {product.name}
            </h1>

            <div className="mt-3 flex items-baseline gap-3 border-b border-border-soft pb-4">
              <span className="text-2xl font-bold text-charcoal">
                {formatInrPrice(product.price)}
              </span>
              <span className="text-xs text-muted">
                {product.price !== null
                  ? "Indicative demonstration guide · Confirm quote at showroom"
                  : "Confirm current price directly with our showroom team"}
              </span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-charcoal/90">
            {product.description}
          </p>

          {/* Color / Finish Selector */}
          {product.colors.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-walnut mb-2">
                Available Finish / Color:{" "}
                <span className="text-terracotta">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => {
                  const active = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                        active
                          ? "border-terracotta bg-ivory font-semibold text-walnut"
                          : "border-beige bg-white text-charcoal hover:border-walnut/50"
                      }`}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity + Primary Enquiry Actions */}
          <div className="space-y-3 pt-1">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-md border border-beige bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="px-3 py-2 text-charcoal hover:bg-ivory"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 text-sm font-semibold text-walnut">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="px-3 py-2 text-charcoal hover:bg-ivory"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() =>
                  addToEnquiry(
                    {
                      productId: product.id,
                      slug: product.slug,
                      selectedColor,
                      quantity,
                    },
                    product.name
                  )
                }
                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 rounded-md bg-terracotta px-5 py-2.5 text-sm font-semibold text-white hover:bg-terracotta-hover transition-colors"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Add to Enquiry Basket</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-walnut px-4 py-2.5 text-sm font-semibold text-white hover:bg-walnut-dark transition-colors"
                >
                  <MessageSquarePlus className="h-4 w-4" />
                  <span>WhatsApp Enquiry</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    openEnquiryModal(
                      `Request Price & Details — ${product.name}`,
                      enquiryMessage
                    )
                  }
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-walnut px-4 py-2.5 text-sm font-semibold text-white hover:bg-walnut-dark transition-colors"
                >
                  <MessageSquarePlus className="h-4 w-4" />
                  <span>Request Price / Prepare Enquiry</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => toggleWishlist(product.id, product.name)}
                aria-pressed={wishlisted}
                className={`inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2.5 text-xs sm:text-sm font-medium transition-colors ${
                  wishlisted
                    ? "border-terracotta bg-ivory text-terracotta"
                    : "border-beige bg-white text-charcoal hover:border-terracotta"
                }`}
              >
                <Heart className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`} />
                <span>{wishlisted ? "Wishlisted" : "Wishlist"}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleCompare(product.slug, product.name)}
                aria-pressed={compared}
                className={`inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2.5 text-xs sm:text-sm font-medium transition-colors ${
                  compared
                    ? "border-walnut bg-walnut text-white"
                    : "border-beige bg-white text-charcoal hover:border-walnut"
                }`}
              >
                <Scale className="h-4 w-4" />
                <span>{compared ? "In Compare" : "Compare"}</span>
              </button>
            </div>
          </div>

          {/* Specifications & Dimensions Diagram */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
            <div className="rounded-xl border border-beige bg-ivory p-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-walnut mb-2.5">
                Specifications
              </h2>
              <dl className="space-y-1.5 text-xs">
                <div className="flex justify-between gap-2">
                  <dt className="text-muted">Material</dt>
                  <dd className="font-medium text-charcoal text-right">
                    {product.material || "Ask at Showroom"}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-muted">Finish</dt>
                  <dd className="font-medium text-charcoal text-right">
                    {product.finish || "Multiple Options"}
                  </dd>
                </div>
                {product.seatingOrCapacity && (
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted">Capacity / Size</dt>
                    <dd className="font-medium text-charcoal text-right">
                      {product.seatingOrCapacity}
                    </dd>
                  </div>
                )}
                <div className="flex justify-between gap-2">
                  <dt className="text-muted">Status</dt>
                  <dd className="font-medium text-terracotta text-right">
                    {product.isDemo  ? "Demo Reference" : "Verified"}
                  </dd>
                </div>
              </dl>
            </div>

            {product.dimensions && (
              <div className="rounded-xl border border-beige bg-white p-4">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-walnut mb-2.5">
                  <Ruler className="h-3.5 w-3.5 text-terracotta" />
                  <span>Dimensions ({product.dimensions.unit})</span>
                </div>
                <svg
                  viewBox="0 0 220 96"
                  className="w-full h-24 text-walnut"
                  aria-label={`Dimensions diagram: Width ${product.dimensions.width}, Depth ${product.dimensions.depth}, Height ${product.dimensions.height} ${product.dimensions.unit}`}
                >
                  <rect
                    x="46"
                    y="18"
                    width="124"
                    height="50"
                    rx="4"
                    fill="#FAF7F2"
                    stroke="#B5683C"
                    strokeWidth="1.5"
                  />
                  <line x1="46" y1="80" x2="170" y2="80" stroke="#4A3025" strokeWidth="1" strokeDasharray="3 2" />
                  <text x="108" y="92" textAnchor="middle" fontSize="10" fill="#242424" fontWeight="600">
                    W: {product.dimensions.width} {product.dimensions.unit}
                  </text>
                  <line x1="30" y1="18" x2="30" y2="68" stroke="#4A3025" strokeWidth="1" strokeDasharray="3 2" />
                  <text x="24" y="46" textAnchor="end" fontSize="9.5" fill="#242424" fontWeight="600">
                    H: {product.dimensions.height}
                  </text>
                  <text x="108" y="47" textAnchor="middle" fontSize="10" fill="#4A3025" fontWeight="600">
                    D: {product.dimensions.depth} {product.dimensions.unit}
                  </text>
                </svg>
              </div>
            )}
          </div>

          <div className="rounded-lg border border-border-soft bg-[#FAF9F7] px-4 py-3 text-xs text-muted flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-terracotta shrink-0" />
              <span>
                Visit our showroom at {businessConfig.location.shortAddress} to
                inspect materials &amp; comfort firsthand.
              </span>
            </span>
            <Link
              href="/showroom"
              className="shrink-0 font-semibold text-terracotta hover:underline"
            >
              Showroom Info
            </Link>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12 border-t border-border-soft pt-8">
          <h2 className="font-display text-xl sm:text-2xl font-medium text-walnut mb-5">
            Related Furniture Ideas
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Products */}
      {recentlyViewedProducts.length > 0 && (
        <section className="mt-10 border-t border-border-soft pt-8">
          <h2 className="font-display text-xl font-medium text-walnut mb-5">
            Recently Viewed
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {recentlyViewedProducts.map((p) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Image Zoom Modal */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed product image"
          onClick={() => setZoomOpen(false)}
        >
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            aria-label="Close zoomed image"
            className="absolute right-5 top-5 rounded-full bg-white p-2 text-charcoal shadow-lg"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative h-[80vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={product.images[activeImageIdx] || product.images[0]}
              alt={`${product.name} enlarged view`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
