"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductCard } from "@/components/products/ProductCard";
import { allProducts } from "@/data/products";
import { useStore } from "@/stores/useStore";

export default function WishlistPage() {
  const wishlistIds = useStore((s) => s.wishlistIds);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const savedProducts = useMemo(() => {
    if (!mounted) return [];
    return allProducts.filter((p) => wishlistIds.includes(p.id));
  }, [mounted, wishlistIds]);

  return (
    <main>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
      <div className="container-storefront py-8 md:py-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border-soft pb-5">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-walnut">
              Saved Wishlist
            </h1>
            <p className="mt-1 text-sm text-muted">
              Furniture items saved locally in your browser for quick showroom comparison.
            </p>
          </div>
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:underline"
          >
            <span>Go to Enquiry Basket</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {!mounted ? (
          <div className="py-12 text-center text-sm text-muted">
            Loading your saved wishlist...
          </div>
        ) : savedProducts.length === 0 ? (
          <div className="my-10 rounded-xl border border-beige bg-ivory p-10 text-center max-w-xl mx-auto">
            <Heart className="h-10 w-10 text-terracotta mx-auto mb-3 stroke-[1.5]" />
            <h2 className="font-display text-xl font-semibold text-walnut">
              Your wishlist is currently empty
            </h2>
            <p className="mt-2 text-sm text-muted">
              Tap the heart icon on any sofa, bed, dining table, or office chair
              to bookmark pieces before visiting our Daba Gardens showroom.
            </p>
            <Link
              href="/collections"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-terracotta px-5 py-2.5 text-sm font-semibold text-white hover:bg-terracotta-hover transition-colors"
            >
              <span>Explore Collections</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
