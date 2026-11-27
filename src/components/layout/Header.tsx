"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ChevronRight, MapPin, Heart, ShoppingBag } from "lucide-react";
import { TopUtilityBar } from "./TopUtilityBar";
import { MainHeader } from "./MainHeader";
import { CategoryNavBar } from "./CategoryNavBar";
import { mainNavCategories } from "@/data/navigation";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { businessConfig } from "@/config/business";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="relative z-50">
        <TopUtilityBar />
        <MainHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      </header>
      <CategoryNavBar />

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[70] md:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border-soft px-4 py-3.5 bg-ivory">
              <BrandLogo compact />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="rounded-lg p-1.5 text-charcoal hover:bg-beige/60"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-5 flex-1">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2.5">
                  Browse Categories
                </p>
                <nav className="divide-y divide-border-soft border border-border-soft rounded-lg overflow-hidden">
                  {mainNavCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={cat.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3.5 py-3 text-sm font-medium text-charcoal hover:bg-ivory"
                    >
                      <span className="flex items-center gap-2">
                        <span>{cat.label}</span>
                        {cat.isDemoCategory && (
                          <span className="rounded bg-ivory border border-beige px-1.5 py-0.5 text-[10px] text-walnut">
                            Demo
                          </span>
                        )}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted" />
                    </Link>
                  ))}
                </nav>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2.5">
                  Showroom &amp; Quick Links
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <Link
                    href="/showroom"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg border border-border-soft p-2.5 text-walnut hover:bg-ivory"
                  >
                    <MapPin className="h-4 w-4 text-terracotta shrink-0" />
                    <span>Visit Showroom</span>
                  </Link>
                  <Link
                    href="/customize"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg border border-border-soft p-2.5 text-walnut hover:bg-ivory"
                  >
                    <span>Customize</span>
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg border border-border-soft p-2.5 text-walnut hover:bg-ivory"
                  >
                    <Heart className="h-4 w-4 text-terracotta shrink-0" />
                    <span>Wishlist</span>
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg border border-border-soft p-2.5 text-walnut hover:bg-ivory"
                  >
                    <ShoppingBag className="h-4 w-4 text-terracotta shrink-0" />
                    <span>Enquiry Basket</span>
                  </Link>
                  <Link
                    href="/shop-the-look"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg border border-border-soft p-2.5 text-walnut hover:bg-ivory"
                  >
                    Shop the Look
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg border border-border-soft p-2.5 text-walnut hover:bg-ivory"
                  >
                    Contact &amp; Bulk
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-border-soft bg-ivory p-4 text-xs text-muted">
              <p className="font-semibold text-walnut">{businessConfig.brandName}</p>
              <p className="mt-1">{businessConfig.location.shortAddress}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
