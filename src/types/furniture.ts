export type RoomGroup =
  | "living"
  | "bedroom"
  | "dining"
  | "study-office"
  | "decor"
  | "outdoor";

export type CategorySlug =
  | "sofas"
  | "beds"
  | "mattresses"
  | "dining-tables"
  | "tv-units"
  | "sofa-cum-beds"
  | "coffee-tables"
  | "study-tables"
  | "wardrobes"
  | "cabinets"
  | "kitchen-cabinets"
  | "bookshelves"
  | "office-chairs"
  | "lounge-chairs"
  | "dressing-tables"
  | "decor";

export type AvailabilityStatus =
  | "Showroom Enquiry"
  | "Made to Order Consultation"
  | "Demonstration Sample";

export type VerificationStatus = "verified" | "provisional" | "demo";

export interface ProductColorVariant {
  name: string;
  hex: string;
}

export interface ProductDimensions {
  width: string;
  depth: string;
  height: string;
  unit: "cm" | "inches";
  note?: string | null;
}

export interface FurnitureProduct {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  subcategory: string;
  room: RoomGroup;
  description: string;
  images: string[];
  material: string | null;
  finish: string | null;
  dimensions: ProductDimensions | null;
  colors: ProductColorVariant[];
  price: number | null;
  featured: boolean;
  availabilityStatus: AvailabilityStatus;
  verificationStatus: VerificationStatus;
  isDemo: boolean;
  seatingOrCapacity?: string | null;
  highlights?: string[];
}

export interface CategoryTile {
  id: string;
  slug: CategorySlug;
  name: string;
  tabGroup: "living" | "bedroom" | "dining" | "study-office" | "decor";
  image: string;
  href: string;
  isDemoCategory: boolean;
  description: string;
}

export interface MegaMenuColumn {
  heading: string;
  items: { label: string; href: string; isDemo?: boolean }[];
}

export interface NavCategoryItem {
  id: string;
  label: string;
  href: string;
  highlight?: boolean;
  isDemoCategory?: boolean;
  columns: MegaMenuColumn[];
  featuredCard: {
    title: string;
    subtitle: string;
    image: string;
    href: string;
  };
}

export interface RoomShowcaseConfig {
  id: RoomGroup;
  title: string;
  viewAllHref: string;
  productsHeading: string;
  heroTile: {
    title: string;
    subtitle: string;
    image: string;
    href: string;
  };
  subTiles: {
    title: string;
    image: string;
    href: string;
    isDemo?: boolean;
  }[];
}

export interface LookHotspot {
  id: string;
  xPercent: number;
  yPercent: number;
  productSlug: string;
  label: string;
}

export interface ShopTheLookScene {
  id: string;
  title: string;
  roomLabel: string;
  description: string;
  image: string;
  hotspots: LookHotspot[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CustomizationDraft {
  furnitureType: string;
  preferredColor: string;
  material: string;
  dimensions: string;
  seatingCapacity: string;
  approximateBudget: string;
  notes: string;
}
