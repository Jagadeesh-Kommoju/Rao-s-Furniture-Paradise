"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Plus, ShoppingBag } from "lucide-react";
import { shopTheLookScenes } from "@/data/shopTheLook";
import { getProductBySlug } from "@/data/products";
import { formatInrPrice } from "@/utils/enquiry";
import { useStore } from "@/stores/useStore";

export function ShopTheLookSection() {
  const addToEnquiry = useStore((s) => s.addToEnquiry);
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const activeScene = shopTheLookScenes[activeSceneIdx];
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>(
    activeScene.hotspots[0]?.id || ""
  );

  const activeHotspot = useMemo(() => {
    return (
      activeScene.hotspots.find((h) => h.id === selectedHotspotId) ||
      activeScene.hotspots[0]
    );
  }, [activeScene, selectedHotspotId]);

  const activeProduct = activeHotspot
    ? getProductBySlug(activeHotspot.productSlug)
    : undefined;

  const handleSceneChange = (index: number) => {
    setActiveSceneIdx(index);
    const nextScene = shopTheLookScenes[index];
    setSelectedHotspotId(nextScene.hotspots[0]?.id || "");
  };

  return (
    <section aria-label="Shop the Look" className="py-10 md:py-12 bg-white">
      <div className="container-storefront">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-terracotta">
              Interactive Room Inspiration
            </p>
            <h2 className="mt-1 font-display text-2xl sm:text-[26px] font-medium text-charcoal">
              Shop the Look
            </h2>
            <p className="mt-1 text-sm text-muted">
              Select a hotspot dot in any curated room scene to inspect furniture details.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Room scenes">
            {shopTheLookScenes.map((scene, idx) => {
              const active = idx === activeSceneIdx;
              return (
                <button
                  key={scene.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => handleSceneChange(idx)}
                  className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                    active
                      ? "bg-walnut text-white"
                      : "border border-beige bg-ivory text-charcoal hover:border-terracotta"
                  }`}
                >
                  {scene.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
          {/* Interactive Room Photo with Hotspots */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[430px] lg:col-span-8 overflow-hidden rounded-xl border border-beige bg-surface-subtle">
            <Image
              src={activeScene.image}
              alt={`${activeScene.title} interior styling — illustrative scene`}
              fill
              sizes="(max-width: 1024px) 100vw, 820px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

            {activeScene.hotspots.map((spot) => {
              const isSelected = activeHotspot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setSelectedHotspotId(spot.id)}
                  aria-label={`Inspect ${spot.label}`}
                  aria-pressed={isSelected}
                  style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-lg transition-transform ${
                    isSelected
                      ? "scale-115 border-white bg-terracotta text-white ring-4 ring-terracotta/35"
                      : "border-white bg-walnut/90 text-white hover:scale-110"
                  }`}
                >
                  <Plus
                    className={`h-4 w-4 transition-transform ${
                      isSelected ? "rotate-45" : ""
                    }`}
                  />
                </button>
              );
            })}

            <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-3 text-white pointer-events-none">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-beige">
                  {activeScene.roomLabel}
                </span>
                <p className="font-display text-lg font-semibold">
                  {activeScene.title}
                </p>
              </div>
              <span className="rounded bg-black/55 px-2.5 py-1 text-[10.5px]">
                Tap hotspots to inspect pieces
              </span>
            </div>
          </div>

          {/* Selected Hotspot Product Card + List */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-xl border border-beige bg-ivory p-5">
            {activeProduct ? (
              <div>
                <div className="flex items-center justify-between text-xs text-muted mb-3">
                  <span className="font-semibold uppercase tracking-wider text-terracotta">
                    Selected Piece
                  </span>
                  {activeProduct.isDemo  && (
                    <span className="rounded bg-white border border-beige px-2 py-0.5 text-[10px] font-semibold text-walnut">
                        Demo Catalogue
                    </span>
                  )}
                </div>

                <Link
                  href={`/products/${activeProduct.slug}`}
                  className="block relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-beige bg-white"
                >
                  <Image
                    src={activeProduct.images[0]}
                    alt={activeProduct.name}
                    fill
                    sizes="360px"
                    className="object-cover"
                  />
                </Link>

                <h3 className="mt-3.5 font-display text-lg font-semibold text-walnut">
                  <Link
                    href={`/products/${activeProduct.slug}`}
                    className="hover:text-terracotta transition-colors"
                  >
                    {activeProduct.name}
                  </Link>
                </h3>
                <p className="mt-1 text-xs text-muted">
                  {activeProduct.subcategory}
                  {activeProduct.material ? ` · ${activeProduct.material}` : ""}
                </p>
                <p className="mt-2 text-sm text-charcoal line-clamp-2">
                  {activeProduct.description}
                </p>
                <p className="mt-3 text-base font-bold text-walnut">
                  {formatInrPrice(activeProduct.price)}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      addToEnquiry(
                        {
                          productId: activeProduct.id,
                          slug: activeProduct.slug,
                          selectedColor:
                            activeProduct.colors[0]?.name || "Standard Finish",
                          quantity: 1,
                        },
                        activeProduct.name
                      )
                    }
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-terracotta px-3.5 py-2.5 text-xs font-semibold text-white hover:bg-terracotta-hover transition-colors"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Add to Enquiry</span>
                  </button>
                  <Link
                    href={`/products/${activeProduct.slug}`}
                    className="inline-flex items-center justify-center gap-1 rounded-md border border-walnut bg-white px-3.5 py-2.5 text-xs font-semibold text-walnut hover:bg-walnut hover:text-white transition-colors"
                  >
                    <span>Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ) : null}

            <div className="mt-5 border-t border-beige pt-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2">
                Pieces in {activeScene.title}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {activeScene.hotspots.map((spot) => (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setSelectedHotspotId(spot.id)}
                    className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                      activeHotspot?.id === spot.id
                        ? "bg-walnut text-white font-medium"
                        : "bg-white border border-beige text-charcoal hover:border-terracotta"
                    }`}
                  >
                    {spot.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
