"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, MessageSquarePlus, Scale } from "lucide-react";
import type { FurnitureProduct } from "@/types/furniture";
import { useStore } from "@/stores/useStore";
import { formatInrPrice, buildProductEnquiryMessage } from "@/utils/enquiry";

interface ProductCardProps {
  product: FurnitureProduct;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const wishlistIds = useStore((s) => s.wishlistIds);
  const compareSlugs = useStore((s) => s.compareSlugs);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const addToEnquiry = useStore((s) => s.addToEnquiry);
  const toggleCompare = useStore((s) => s.toggleCompare);
  const openEnquiryModal = useStore((s) => s.openEnquiryModal);

  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const wishlisted = mounted && wishlistIds.includes(product.id);
  const compared = mounted && compareSlugs.includes(product.slug);
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];
  const defaultColor = product.colors[0]?.name || "Standard Finish";

  const isStudioCutout = (src: string) =>
    /\/(lighting\.jpg|planters\.jpg|decor-pot-1\.webp|chair-studio-exec-|bed-royal-|bedside-|sofa-haven-2|sofa-solis-)/.test(
      src
    );

  const handleQuickEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToEnquiry(
      { productId: product.id, slug: product.slug, selectedColor: defaultColor, quantity: 1 },
      product.name
    );
    openEnquiryModal(
      `Quick Enquiry — ${product.name}`,
      buildProductEnquiryMessage(product, { selectedColor: defaultColor, quantity: 1 })
    );
  };

  return (
    <article
      className="group flex h-full flex-col bg-transparent overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Borderless rounded photograph block matching WoodenStreet pages 2-5 */}
      <div className="relative aspect-[4/3.6] w-full overflow-hidden rounded-[4px] bg-[#F7F7F7]">
        <Link
          href={`/products/${product.slug}`}
          className="block h-full w-full"
          aria-label={`View ${product.name}`}
        >
          <Image
            src={primaryImage}
            alt={`${product.name} — ${product.subcategory}`}
            fill
            sizes="(max-width: 640px) 48vw, (max-width: 1024px) 33vw, 270px"
            className={`${
              isStudioCutout(primaryImage) ? "object-contain p-2 bg-white" : "object-cover"
            } transition-all duration-300 ${
              hovered && secondaryImage !== primaryImage
                ? "opacity-0 scale-[1.02]"
                : "opacity-100 group-hover:scale-[1.03]"
            }`}
          />
          {secondaryImage !== primaryImage && (
            <Image
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 640px) 48vw, (max-width: 1024px) 33vw, 270px"
              className={`${
                isStudioCutout(secondaryImage)
                  ? "object-contain p-2 bg-white"
                  : "object-cover"
              } transition-all duration-300 ${
                hovered ? "opacity-100 scale-[1.03]" : "opacity-0"
              }`}
            />
          )}
        </Link>

        {/* Top-right Wishlist + Compare icons */}
        <div className="absolute right-2 top-2 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id, product.name);
            }}
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            aria-pressed={wishlisted}
            className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full shadow-xs transition-colors ${
              wishlisted
                ? "bg-terracotta text-white"
                : "bg-white/90 text-[#333333] hover:bg-white hover:text-terracotta"
            }`}
          >
            <Heart className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${wishlisted ? "fill-current" : ""}`} />
          </button>

          {!compact && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleCompare(product.slug, product.name);
              }}
              aria-label={compared ? `Remove ${product.name} from compare` : `Compare ${product.name}`}
              aria-pressed={compared}
              className={`hidden sm:flex h-8 w-8 items-center justify-center rounded-full shadow-xs transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 ${
                compared
                  ? "opacity-100 bg-walnut text-white"
                  : "bg-white/90 text-[#333333] hover:bg-white hover:text-walnut"
              }`}
              title="Compare product"
            >
              <Scale className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Clean Minimal Typography Below Photo */}
      <div className="flex flex-1 flex-col pt-2.5 pb-1">
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-2 text-[13px] sm:text-[13.5px] font-normal leading-[1.35] text-[#333333] hover:text-terracotta transition-colors min-h-[36px]"
        >
          {product.name}
        </Link>

        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="truncate text-[11px] text-[#777777]">
            {product.material || product.subcategory}
          </span>
          {product.colors.length > 0 && (
            <div className="flex items-center gap-1 shrink-0" aria-label="Available finishes">
              {product.colors.slice(0, 3).map((color) => (
                <span
                  key={color.name}
                  title={color.name}
                  className="h-2.5 w-2.5 rounded-full border border-black/15"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[14px] sm:text-[15.5px] font-semibold text-[#222222] leading-tight truncate">
              {formatInrPrice(product.price)}
            </p>
            <p className="text-[10px] sm:text-[11px] text-[#777777] truncate">
              {product.price !== null ? "Indicative demo" : "Showroom quote"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleQuickEnquiry}
            className="shrink-0 inline-flex items-center gap-1 rounded-[4px] border border-[#E2D9CE] bg-[#FAF7F2] px-2 py-1 text-[11px] font-medium text-terracotta hover:bg-terracotta hover:border-terracotta hover:text-white transition-colors"
            title="Quick Enquiry"
          >
            <MessageSquarePlus className="h-3 w-3" />
            <span className="hidden sm:inline">Enquire</span>
          </button>
        </div>
      </div>
    </article>
  );
}
