"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  MessageSquarePlus,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useStore } from "@/stores/useStore";
import { allProducts } from "@/data/products";
import type { FurnitureProduct } from "@/types/furniture";
import {
  formatInrPrice,
  buildBasketEnquiryMessage,
  getVerifiedWhatsappUrl,
} from "@/utils/enquiry";
import { businessConfig } from "@/config/business";

export default function EnquiryBasketPage() {
  const enquiryItems = useStore((s) => s.enquiryItems);
  const updateEnquiryQuantity = useStore((s) => s.updateEnquiryQuantity);
  const removeFromEnquiry = useStore((s) => s.removeFromEnquiry);
  const clearEnquiryBasket = useStore((s) => s.clearEnquiryBasket);
  const openEnquiryModal = useStore((s) => s.openEnquiryModal);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedItems = useMemo(() => {
    if (!mounted) return [];
    return enquiryItems
      .map((entry) => {
        const product = allProducts.find((p) => p.id === entry.productId);
        if (!product) return null;
        return { ...entry, product };
      })
      .filter(
        (
          x
        ): x is {
          productId: string;
          slug: string;
          selectedColor: string;
          quantity: number;
          product: FurnitureProduct;
        } => Boolean(x)
      );
  }, [mounted, enquiryItems]);

  const indicativeSubtotal = useMemo(() => {
    let total = 0;
    let hasUnpriced = false;
    resolvedItems.forEach((item) => {
      if (item.product.price === null) {
        hasUnpriced = true;
      } else {
        total += item.product.price * item.quantity;
      }
    });
    return { total, hasUnpriced };
  }, [resolvedItems]);

  const enquiryMessage = buildBasketEnquiryMessage(resolvedItems);
  const whatsappUrl = getVerifiedWhatsappUrl(enquiryMessage);

  return (
    <main>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Enquiry Basket" }]}
      />
      <div className="container-storefront py-8 md:py-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border-soft pb-5">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-walnut">
              Enquiry Basket
            </h1>
            <p className="mt-1 text-sm text-muted">
              Review your shortlisted furniture pieces to request showroom
              pricing, finish options, and availability.
            </p>
          </div>
          {mounted && resolvedItems.length > 0 && (
            <button
              type="button"
              onClick={clearEnquiryBasket}
              className="text-xs font-medium text-muted hover:text-terracotta underline self-start sm:self-auto"
            >
              Clear Basket
            </button>
          )}
        </div>

        {!mounted ? (
          <div className="py-12 text-center text-sm text-muted">
            Loading enquiry basket...
          </div>
        ) : resolvedItems.length === 0 ? (
          <div className="my-10 rounded-xl border border-beige bg-ivory p-10 text-center max-w-xl mx-auto">
            <ShoppingBag className="h-10 w-10 text-terracotta mx-auto mb-3 stroke-[1.5]" />
            <h2 className="font-display text-xl font-semibold text-walnut">
              Your enquiry basket is empty
            </h2>
            <p className="mt-2 text-sm text-muted">
              Add furniture items to prepare an itemized pricing and showroom
              availability enquiry for our Daba Gardens team.
            </p>
            <Link
              href="/collections"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-terracotta px-5 py-2.5 text-sm font-semibold text-white hover:bg-terracotta-hover transition-colors"
            >
              <span>Browse Furniture Collections</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            {/* Items List */}
            <div className="lg:col-span-8 space-y-4">
              {resolvedItems.map((item) => (
                <div
                  key={`${item.productId}-${item.selectedColor}`}
                  className="flex flex-col sm:flex-row gap-4 rounded-xl border border-beige bg-white p-4 shadow-2xs"
                >
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="relative h-28 w-full sm:w-36 shrink-0 overflow-hidden rounded-lg border border-border-soft bg-surface-subtle"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col justify-between gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-terracotta">
                          {item.product.subcategory}
                        </p>
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="font-display text-base font-semibold text-walnut hover:text-terracotta"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-0.5 text-xs text-muted">
                          Finish: <strong className="text-charcoal">{item.selectedColor}</strong>
                          {item.product.material ? ` · ${item.product.material}` : ""}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromEnquiry(item.productId, item.selectedColor)
                        }
                        aria-label={`Remove ${item.product.name} from basket`}
                        className="rounded p-1.5 text-muted hover:bg-ivory hover:text-terracotta"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-border-soft pt-2.5">
                      <div className="inline-flex items-center rounded border border-beige bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            updateEnquiryQuantity(
                              item.productId,
                              item.selectedColor,
                              item.quantity - 1
                            )
                          }
                          aria-label={`Decrease quantity for ${item.product.name}`}
                          className="px-2.5 py-1.5 hover:bg-ivory"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-walnut">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateEnquiryQuantity(
                              item.productId,
                              item.selectedColor,
                              item.quantity + 1
                            )
                          }
                          aria-label={`Increase quantity for ${item.product.name}`}
                          className="px-2.5 py-1.5 hover:bg-ivory"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-bold text-walnut">
                          {item.product.price !== null
                            ? formatInrPrice(item.product.price * item.quantity)
                            : "Request Price"}
                        </p>
                        {item.product.isDemo  && (
                          <p className="text-[10.5px] text-muted">
                            Phase 1 Demo Entry
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Enquiry Summary Card */}
            <aside className="lg:col-span-4 rounded-xl border border-beige bg-ivory p-5 space-y-4">
              <h2 className="font-display text-lg font-semibold text-walnut border-b border-beige pb-3">
                Enquiry Summary
              </h2>

              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Total Pieces</dt>
                  <dd className="font-semibold text-charcoal">
                    {resolvedItems.reduce((sum, i) => sum + i.quantity, 0)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Indicative Demo Total</dt>
                  <dd className="font-bold text-walnut">
                    {indicativeSubtotal.total > 0
                      ? `${formatInrPrice(indicativeSubtotal.total)}${
                          indicativeSubtotal.hasUnpriced ? " + Quote" : ""
                        }`
                      : "Quote on Enquiry"}
                  </dd>
                </div>
              </dl>

              <p className="rounded-lg border border-beige bg-white p-3 text-xs text-muted leading-relaxed">
                Online checkout and payment are disabled during Phase 1. Submit
                your shortlisted items as a showroom enquiry to confirm live
                pricing and availability.
              </p>

              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-terracotta px-4 py-3 text-sm font-semibold text-white hover:bg-terracotta-hover transition-colors"
                >
                  <MessageSquarePlus className="h-4 w-4" />
                  <span>Send Basket via WhatsApp</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    openEnquiryModal("Enquiry Basket Summary", enquiryMessage)
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-terracotta px-4 py-3 text-sm font-semibold text-white hover:bg-terracotta-hover transition-colors"
                >
                  <MessageSquarePlus className="h-4 w-4" />
                  <span>Prepare Showroom Enquiry</span>
                </button>
              )}

              <a
                href={businessConfig.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-walnut bg-white px-4 py-2.5 text-xs font-semibold text-walnut hover:bg-walnut hover:text-white transition-colors"
              >
                <MapPin className="h-3.5 w-3.5" />
                <span>Visit Daba Gardens Showroom</span>
              </a>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
