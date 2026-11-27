import type { ShopTheLookScene } from "@/types/furniture";

export const shopTheLookScenes: ShopTheLookScene[] = [
  {
    id: "modern-living-room",
    title: "Modern Living Room",
    roomLabel: "Living Collection",
    description:
      "Warm timber tones paired with upholstered seating, sculptural coffee table, and curated media storage for Vizag apartments.",
    image: "/images/lifestyle/shop-modern-living.jpg",
    hotspots: [
      {
        id: "living-sofa",
        xPercent: 45,
        yPercent: 64,
        productSlug: "aurora-3-seater-sofa",
        label: "Aurora 3-Seater Sofa",
      },
      {
        id: "living-coffee-table",
        xPercent: 52,
        yPercent: 78,
        productSlug: "oakline-coffee-table",
        label: "Oakline Coffee Table",
      },
      {
        id: "living-lounge-chair",
        xPercent: 79,
        yPercent: 66,
        productSlug: "marina-wingback-lounge-chair",
        label: "Marina Wingback Lounge Chair",
      },
      {
        id: "living-tv-unit",
        xPercent: 20,
        yPercent: 58,
        productSlug: "bayview-cane-tv-unit",
        label: "Bayview Cane TV Unit",
      },
    ],
  },
  {
    id: "elegant-bedroom",
    title: "Elegant Bedroom",
    roomLabel: "Bedroom Collection",
    description:
      "Restful bedroom framing anchored by a solid walnut bed, practical bedside storage, and dedicated vanity dressing space.",
    image: "/images/lifestyle/shop-elegant-bedroom.jpg",
    hotspots: [
      {
        id: "bedroom-bed",
        xPercent: 48,
        yPercent: 58,
        productSlug: "classic-walnut-bed",
        label: "Classic Walnut Bed",
      },
      {
        id: "bedroom-bedside",
        xPercent: 21,
        yPercent: 68,
        productSlug: "solace-cherry-bedside-table",
        label: "Solace Cherry Bedside Table",
      },
      {
        id: "bedroom-dressing",
        xPercent: 80,
        yPercent: 52,
        productSlug: "harmony-dressing-table",
        label: "Harmony Dressing Table",
      },
      {
        id: "bedroom-wardrobe",
        xPercent: 89,
        yPercent: 38,
        productSlug: "urban-storage-wardrobe",
        label: "Urban Storage Wardrobe",
      },
    ],
  },
  {
    id: "contemporary-dining-room",
    title: "Contemporary Dining Room",
    roomLabel: "Dining Collection",
    description:
      "Welcoming dining table proportions with cushioned chairs, display mirror, and glass-front crockery sideboard.",
    image: "/images/lifestyle/shop-contemporary-dining.jpg",
    hotspots: [
      {
        id: "dining-set",
        xPercent: 51,
        yPercent: 67,
        productSlug: "heritage-dining-set",
        label: "Heritage 6-Seater Dining Set",
      },
      {
        id: "dining-sideboard",
        xPercent: 26,
        yPercent: 56,
        productSlug: "prasantha-teak-sideboard",
        label: "Prasantha Teak Sideboard",
      },
      {
        id: "dining-mirror",
        xPercent: 51,
        yPercent: 32,
        productSlug: "aurelia-brass-wall-mirror",
        label: "Aurelia Brass Wall Mirror",
      },
      {
        id: "dining-planter",
        xPercent: 78,
        yPercent: 63,
        productSlug: "terra-stand-indoor-planter",
        label: "Terra Stand Indoor Planter",
      },
    ],
  },
];
