import type { NavCategoryItem } from "@/types/furniture";

export const topUtilityLinks = {
  left: [
    { label: "Furniture", href: "/furniture-in-visakhapatnam", active: true },
    { label: "Home Furniture", href: "/collections" },
    { label: "Office Furniture", href: "/collections/office-chairs" },
    { label: "Bulk Enquiry", href: "/contact?intent=bulk" },
  ],
  right: [
    { label: "Contact Us", href: "/contact" },
    { label: "Visit Showroom", href: "/showroom" },
    { label: "Help Center", href: "/faq" },
  ],
};

export const mainNavCategories: NavCategoryItem[] = [
  {
    id: "sofas",
    label: "Sofas",
    href: "/collections/sofas",
    isDemoCategory: true,
    columns: [
      {
        heading: "Sofa Styles",
        items: [
          { label: "3-Seater Sofas", href: "/collections/sofas", isDemo: true },
          { label: "L-Shaped Sofas", href: "/collections/sofas?sub=l-shaped", isDemo: true },
          { label: "Wooden Frame Sofas", href: "/collections/sofas?material=walnut", isDemo: true },
          { label: "Sofa Cum Beds", href: "/collections/sofa-cum-beds", isDemo: true },
        ],
      },
      {
        heading: "Seating Pairings",
        items: [
          { label: "Lounge Chairs", href: "/collections/lounge-chairs", isDemo: true },
          { label: "Coffee Tables", href: "/collections/coffee-tables", isDemo: true },
          { label: "Shop Living Looks", href: "/shop-the-look" },
        ],
      },
    ],
    featuredCard: {
      title: "Aurora 3-Seater Sofa",
      subtitle: "Demonstration Sofa Collection",
      image: "/images/categories/sofas.jpg",
      href: "/products/aurora-3-seater-sofa",
    },
  },
  {
    id: "living",
    label: "Living",
    href: "/collections/sofas",
    isDemoCategory: true,
    columns: [
      {
        heading: "Seating",
        items: [
          { label: "Sofa Sets", href: "/collections/sofas", isDemo: true },
          { label: "Lounge Chairs", href: "/collections/lounge-chairs", isDemo: true },
          { label: "Sofa Cum Beds", href: "/collections/sofa-cum-beds", isDemo: true },
        ],
      },
      {
        heading: "Tables & Media",
        items: [
          { label: "TV Units", href: "/collections/tv-units", isDemo: true },
          { label: "Coffee Tables", href: "/collections/coffee-tables", isDemo: true },
          { label: "Bookshelves", href: "/collections/bookshelves", isDemo: true },
        ],
      },
    ],
    featuredCard: {
      title: "Modern Living Room",
      subtitle: "Explore interactive room hotspots",
      image: "/images/categories/tv-units.jpg",
      href: "/shop-the-look",
    },
  },
  {
    id: "bedroom",
    label: "Bedroom",
    href: "/collections/beds",
    isDemoCategory: false,
    columns: [
      {
        heading: "Beds",
        items: [
          { label: "All Beds", href: "/collections/beds" },
          { label: "King Size Beds", href: "/collections/beds?sub=king", isDemo: true },
          { label: "Queen Size Beds", href: "/collections/beds?sub=queen", isDemo: true },
          { label: "Storage Beds", href: "/collections/beds?sub=storage", isDemo: true },
        ],
      },
      {
        heading: "Bedroom Storage & Vanity",
        items: [
          { label: "Dressing Tables", href: "/collections/dressing-tables" },
          { label: "Wardrobes", href: "/collections/wardrobes", isDemo: true },
          { label: "Mattresses", href: "/collections/mattresses", isDemo: true },
        ],
      },
    ],
    featuredCard: {
      title: "Classic Walnut Bed",
      subtitle: "Warm bedroom centerpiece",
      image: "/images/categories/beds.jpg",
      href: "/products/classic-walnut-bed",
    },
  },
  {
    id: "mattresses",
    label: "Mattresses",
    href: "/collections/mattresses",
    isDemoCategory: true,
    columns: [
      {
        heading: "Mattress Types",
        items: [
          { label: "Orthopedic Support", href: "/collections/mattresses", isDemo: true },
          { label: "Memory Foam", href: "/collections/mattresses", isDemo: true },
          { label: "King & Queen Sizes", href: "/collections/mattresses", isDemo: true },
        ],
      },
    ],
    featuredCard: {
      title: "Mattress Collection",
      subtitle: "Demonstration Sleep Range",
      image: "/images/categories/mattresses.jpg",
      href: "/collections/mattresses",
    },
  },
  {
    id: "dining",
    label: "Dining",
    href: "/collections/dining-tables",
    isDemoCategory: true,
    columns: [
      {
        heading: "Dining Sets & Tables",
        items: [
          { label: "4-Seater Dining Sets", href: "/collections/dining-tables", isDemo: true },
          { label: "6-Seater Dining Sets", href: "/collections/dining-tables", isDemo: true },
          { label: "Dining Tables & Chairs", href: "/collections/dining-tables", isDemo: true },
        ],
      },
      {
        heading: "Dining Storage",
        items: [
          { label: "Sideboards & Cabinets", href: "/collections/cabinets", isDemo: true },
          { label: "Kitchen Cabinets", href: "/collections/kitchen-cabinets", isDemo: true },
        ],
      },
    ],
    featuredCard: {
      title: "Heritage Dining Set",
      subtitle: "Family dining showcase",
      image: "/images/categories/dining.jpg",
      href: "/products/heritage-dining-set",
    },
  },
  {
    id: "storage",
    label: "Storage",
    href: "/collections/wardrobes",
    isDemoCategory: true,
    columns: [
      {
        heading: "Home Storage",
        items: [
          { label: "Wardrobes", href: "/collections/wardrobes", isDemo: true },
          { label: "Cabinets & Sideboards", href: "/collections/cabinets", isDemo: true },
          { label: "Kitchen Cabinets", href: "/collections/kitchen-cabinets", isDemo: true },
          { label: "Bookshelves", href: "/collections/bookshelves", isDemo: true },
        ],
      },
    ],
    featuredCard: {
      title: "Urban Storage Wardrobe",
      subtitle: "Functional bedroom storage",
      image: "/images/categories/wardrobes.jpg",
      href: "/products/urban-storage-wardrobe",
    },
  },
  {
    id: "study-office",
    label: "Study & Office",
    href: "/collections/study-tables",
    isDemoCategory: false,
    columns: [
      {
        heading: "Desks & Tables",
        items: [
          { label: "Study Tables", href: "/collections/study-tables", isDemo: true },
          { label: "Computer Desks", href: "/collections/study-tables", isDemo: true },
          { label: "Office Tables", href: "/collections/study-tables", isDemo: true },
        ],
      },
      {
        heading: "Seating & Filing",
        items: [
          { label: "Executive Chairs", href: "/collections/office-chairs" },
          { label: "Bookshelves & File Units", href: "/collections/bookshelves", isDemo: true },
          { label: "Office Bulk Enquiry", href: "/contact?intent=office" },
        ],
      },
    ],
    featuredCard: {
      title: "Studio Executive Chair",
      subtitle: "Ergonomic office seating",
      image: "/images/categories/office-chairs.jpg",
      href: "/products/studio-executive-chair",
    },
  },
  {
    id: "outdoor",
    label: "Outdoor",
    href: "/collections?room=outdoor",
    isDemoCategory: true,
    columns: [
      {
        heading: "Balcony & Patio",
        items: [
          { label: "Outdoor Loungers", href: "/collections?room=outdoor", isDemo: true },
          { label: "Balcony Seating Sets", href: "/collections?room=outdoor", isDemo: true },
        ],
      },
    ],
    featuredCard: {
      title: "Balcony & Patio Seating",
      subtitle: "Demonstration Outdoor Concepts",
      image: "/images/categories/lounge-chairs.jpg",
      href: "/collections?room=outdoor",
    },
  },
  {
    id: "decor",
    label: "Decor & Furnishing",
    href: "/collections/decor",
    isDemoCategory: true,
    columns: [
      {
        heading: "Proposed Decor Categories",
        items: [
          { label: "Wall Mirrors", href: "/collections/decor", isDemo: true },
          { label: "Lighting & Lamps", href: "/collections/decor", isDemo: true },
          { label: "Planters & Accents", href: "/collections/decor", isDemo: true },
        ],
      },
    ],
    featuredCard: {
      title: "Complete Your Space",
      subtitle: "Mirrors, lighting & accents",
      image: "/images/categories/decor.jpg",
      href: "/collections/decor",
    },
  },
  {
    id: "interiors",
    label: "Interiors",
    href: "/customize",
    isDemoCategory: false,
    columns: [
      {
        heading: "Room & Custom Styling",
        items: [
          { label: "Custom Furniture Consultation", href: "/customize" },
          { label: "Shop the Look Rooms", href: "/shop-the-look" },
          { label: "Daba Gardens Showroom", href: "/showroom" },
        ],
      },
    ],
    featuredCard: {
      title: "Custom Furniture & Space Planning",
      subtitle: "Book an in-person Daba Gardens consultation",
      image: "/images/showroom/showroom-interior.jpg",
      href: "/customize",
    },
  },
  {
    id: "new-arrivals",
    label: "New Arrivals",
    href: "/collections?featured=true",
    highlight: true,
    isDemoCategory: true,
    columns: [
      {
        heading: "Curated Showcase",
        items: [
          { label: "Featured Demo Collection", href: "/collections?featured=true", isDemo: true },
          { label: "Shop the Look Rooms", href: "/shop-the-look" },
          { label: "Custom Consultation", href: "/customize" },
        ],
      },
    ],
    featuredCard: {
      title: "Explore Showroom Highlights",
      subtitle: "Visit Daba Gardens, Visakhapatnam",
      image: "/images/showroom/showroom-interior.jpg",
      href: "/showroom",
    },
  },
];
