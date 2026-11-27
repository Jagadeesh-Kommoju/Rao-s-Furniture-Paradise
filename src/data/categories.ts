import type { CategoryTile, RoomShowcaseConfig, FaqItem } from "@/types/furniture";

export const categoryFilterTabs = [
  { id: "all", label: "All" },
  { id: "living", label: "Living" },
  { id: "bedroom", label: "Bedroom" },
  { id: "dining", label: "Dining" },
  { id: "study-office", label: "Study & Office" },
  { id: "decor", label: "Decor" },
] as const;

export type CategoryFilterTabId = (typeof categoryFilterTabs)[number]["id"];

export const visualCategoryTiles: CategoryTile[] = [
  {
    id: "cat-sofas",
    slug: "sofas",
    name: "Sofas",
    tabGroup: "living",
    image: "/images/categories/sofas.jpg",
    href: "/collections/sofas",
    isDemoCategory: true,
    description: "3-seater, L-shaped & solid wood sofas",
  },
  {
    id: "cat-beds",
    slug: "beds",
    name: "Beds",
    tabGroup: "bedroom",
    image: "/images/categories/beds.jpg",
    href: "/collections/beds",
    isDemoCategory: false,
    description: "King, queen & storage bed designs",
  },
  {
    id: "cat-mattresses",
    slug: "mattresses",
    name: "Mattresses",
    tabGroup: "bedroom",
    image: "/images/categories/mattresses.jpg",
    href: "/collections/mattresses",
    isDemoCategory: true,
    description: "Orthopedic & dual-comfort sleep support",
  },
  {
    id: "cat-dining-tables",
    slug: "dining-tables",
    name: "Dining Tables",
    tabGroup: "dining",
    image: "/images/categories/dining.jpg",
    href: "/collections/dining-tables",
    isDemoCategory: true,
    description: "4-seater & 6-seater family dining sets",
  },
  {
    id: "cat-tv-units",
    slug: "tv-units",
    name: "TV Units",
    tabGroup: "living",
    image: "/images/categories/tv-units.jpg",
    href: "/collections/tv-units",
    isDemoCategory: true,
    description: "Media consoles & entertainment cabinets",
  },
  {
    id: "cat-sofa-cum-beds",
    slug: "sofa-cum-beds",
    name: "Sofa Cum Beds",
    tabGroup: "living",
    image: "/images/categories/sofa-cum-beds.jpg",
    href: "/collections/sofa-cum-beds",
    isDemoCategory: true,
    description: "Dual-purpose daybeds for urban homes",
  },
  {
    id: "cat-coffee-tables",
    slug: "coffee-tables",
    name: "Coffee Tables",
    tabGroup: "living",
    image: "/images/categories/coffee-tables.jpg",
    href: "/collections/coffee-tables",
    isDemoCategory: true,
    description: "Center tables & nesting sets",
  },
  {
    id: "cat-study-tables",
    slug: "study-tables",
    name: "Study Tables",
    tabGroup: "study-office",
    image: "/images/categories/study-tables.jpg",
    href: "/collections/study-tables",
    isDemoCategory: true,
    description: "Writing desks & work-from-home tables",
  },
  {
    id: "cat-wardrobes",
    slug: "wardrobes",
    name: "Wardrobes",
    tabGroup: "bedroom",
    image: "/images/categories/wardrobes.jpg",
    href: "/collections/wardrobes",
    isDemoCategory: true,
    description: "Multi-door & sliding storage wardrobes",
  },
  {
    id: "cat-cabinets",
    slug: "cabinets",
    name: "Cabinets",
    tabGroup: "dining",
    image: "/images/categories/cabinets.jpg",
    href: "/collections/cabinets",
    isDemoCategory: true,
    description: "Sideboards, crockery & display cabinets",
  },
  {
    id: "cat-bookshelves",
    slug: "bookshelves",
    name: "Bookshelves",
    tabGroup: "study-office",
    image: "/images/categories/bookshelves.jpg",
    href: "/collections/bookshelves",
    isDemoCategory: true,
    description: "Open shelving & library bookcases",
  },
  {
    id: "cat-office-chairs",
    slug: "office-chairs",
    name: "Office Chairs",
    tabGroup: "study-office",
    image: "/images/categories/office-chairs.jpg",
    href: "/collections/office-chairs",
    isDemoCategory: false,
    description: "Executive & ergonomic task seating",
  },
];

export const extendedCategoryTiles: CategoryTile[] = [
  ...visualCategoryTiles,
  {
    id: "cat-lounge-chairs",
    slug: "lounge-chairs",
    name: "Lounge Chairs",
    tabGroup: "living",
    image: "/images/categories/lounge-chairs.jpg",
    href: "/collections/lounge-chairs",
    isDemoCategory: true,
    description: "Accent armchairs & reading chairs",
  },
  {
    id: "cat-dressing-tables",
    slug: "dressing-tables",
    name: "Dressing Tables",
    tabGroup: "bedroom",
    image: "/images/categories/dressing-tables.jpg",
    href: "/collections/dressing-tables",
    isDemoCategory: false,
    description: "Vanity tables with mirrors & drawers",
  },
  {
    id: "cat-kitchen-cabinets",
    slug: "kitchen-cabinets",
    name: "Kitchen Cabinets",
    tabGroup: "dining",
    image: "/images/categories/kitchen-cabinets.jpg",
    href: "/collections/kitchen-cabinets",
    isDemoCategory: true,
    description: "Tall pantry & crockery storage units",
  },
  {
    id: "cat-decor",
    slug: "decor",
    name: "Mirrors & Lighting",
    tabGroup: "decor",
    image: "/images/categories/decor.jpg",
    href: "/collections/decor",
    isDemoCategory: true,
    description: "Mirrors, table lamps, planters & accents",
  },
];

export const roomShowcases: RoomShowcaseConfig[] = [
  {
    id: "living",
    title: "Living Room Furniture",
    viewAllHref: "/collections/sofas",
    productsHeading: "Featured Living Room Products",
    heroTile: {
      title: "Sofa Sets",
      subtitle: "Explore 3-seater, L-shaped & solid wood sofas",
      image: "/images/categories/sofas.jpg",
      href: "/collections/sofas",
    },
    subTiles: [
      {
        title: "Lounge Chairs",
        image: "/images/categories/lounge-chairs.jpg",
        href: "/collections/lounge-chairs",
        isDemo: true,
      },
      {
        title: "TV Units",
        image: "/images/categories/tv-units.jpg",
        href: "/collections/tv-units",
        isDemo: true,
      },
      {
        title: "Coffee Tables",
        image: "/images/categories/coffee-tables.jpg",
        href: "/collections/coffee-tables",
        isDemo: true,
      },
      {
        title: "Bookshelves",
        image: "/images/categories/bookshelves.jpg",
        href: "/collections/bookshelves",
        isDemo: true,
      },
    ],
  },
  {
    id: "bedroom",
    title: "Bedroom Furniture",
    viewAllHref: "/collections/beds",
    productsHeading: "Featured Bedroom Products",
    heroTile: {
      title: "King & Queen Size Beds",
      subtitle: "Thoughtfully designed solid wood & upholstered beds",
      image: "/images/categories/beds.jpg",
      href: "/collections/beds",
    },
    subTiles: [
      {
        title: "Bedside Tables",
        image: "/images/categories/bedside-tables.jpg",
        href: "/collections/beds",
        isDemo: true,
      },
      {
        title: "Wardrobes",
        image: "/images/categories/wardrobes.jpg",
        href: "/collections/wardrobes",
        isDemo: true,
      },
      {
        title: "Dressing Tables",
        image: "/images/categories/dressing-tables.jpg",
        href: "/collections/dressing-tables",
        isDemo: false,
      },
      {
        title: "Storage Beds",
        image: "/images/categories/mattresses.jpg",
        href: "/collections/beds",
        isDemo: true,
      },
    ],
  },
  {
    id: "dining",
    title: "Dining Room Furniture",
    viewAllHref: "/collections/dining-tables",
    productsHeading: "Featured Dining Room Products",
    heroTile: {
      title: "4-Seater & 6-Seater Dining Sets",
      subtitle: "Gather around welcoming family dining tables",
      image: "/images/categories/dining.jpg",
      href: "/collections/dining-tables",
    },
    subTiles: [
      {
        title: "Dining Chairs",
        image: "/images/categories/dining-chairs.jpg",
        href: "/collections/dining-tables",
        isDemo: true,
      },
      {
        title: "Dining Tables",
        image: "/images/categories/dining.jpg",
        href: "/collections/dining-tables",
        isDemo: true,
      },
      {
        title: "Sideboards",
        image: "/images/categories/cabinets.jpg",
        href: "/collections/cabinets",
        isDemo: true,
      },
      {
        title: "Kitchen Cabinets",
        image: "/images/categories/kitchen-cabinets.jpg",
        href: "/collections/kitchen-cabinets",
        isDemo: true,
      },
    ],
  },
  {
    id: "study-office",
    title: "Study & Office Furniture",
    viewAllHref: "/collections/study-tables",
    productsHeading: "Featured Study & Office Products",
    heroTile: {
      title: "Study Tables & Desks",
      subtitle: "Organized workspaces for homes & offices",
      image: "/images/categories/study-tables.jpg",
      href: "/collections/study-tables",
    },
    subTiles: [
      {
        title: "Executive Chairs",
        image: "/images/categories/office-chairs.jpg",
        href: "/collections/office-chairs",
        isDemo: false,
      },
      {
        title: "Computer Desks",
        image: "/images/categories/study-tables.jpg",
        href: "/collections/study-tables",
        isDemo: true,
      },
      {
        title: "Office Tables",
        image: "/images/categories/office-tables.jpg",
        href: "/collections/study-tables",
        isDemo: true,
      },
      {
        title: "File Cabinets",
        image: "/images/categories/bookshelves.jpg",
        href: "/collections/bookshelves",
        isDemo: true,
      },
    ],
  },
  {
    id: "decor",
    title: "Complete Your Space",
    viewAllHref: "/collections/decor",
    productsHeading: "Featured Home Decor & Accessories",
    heroTile: {
      title: "Mirrors, Lighting & Accents",
      subtitle: "Proposed demonstration categories for styling your home",
      image: "/images/categories/decor.jpg",
      href: "/collections/decor",
    },
    subTiles: [
      {
        title: "Wall Mirrors",
        image: "/images/categories/mirrors.jpg",
        href: "/collections/decor",
        isDemo: true,
      },
      {
        title: "Table & Floor Lamps",
        image: "/images/categories/lighting.jpg",
        href: "/collections/decor",
        isDemo: true,
      },
      {
        title: "Indoor Planters",
        image: "/images/categories/planters.jpg",
        href: "/collections/decor",
        isDemo: true,
      },
      {
        title: "Home Accessories",
        image: "/images/categories/cabinets.jpg",
        href: "/collections/decor",
        isDemo: true,
      },
    ],
  },
];

export const showroomFaqs: FaqItem[] = [
  {
    id: "faq-location",
    question: "Where is Rao's Furniture Paradise located?",
    answer:
      "Rao's Furniture Paradise is located at Dr. No. 30-15-171, Prasantharama Mansion, Near Saraswati Park, Daba Gardens, Visakhapatnam, Andhra Pradesh — 530020.",
  },
  {
    id: "faq-visit",
    question: "Can I visit the showroom before purchasing?",
    answer:
      "Yes. Visitors are welcome to experience finishes, seating comfort, dimensions, and available furniture displays in person at our Daba Gardens showroom before making a decision.",
  },
  {
    id: "faq-types",
    question: "What types of furniture can I explore?",
    answer:
      "You can explore home and office furniture collections including sofas, beds, dressing tables, wardrobes, dining tables, study desks, executive chairs, and storage units. Please note that items marked as demonstration catalogue entries on this website represent sample designs for preview and consultation.",
  },
  {
    id: "faq-pricing",
    question: "How can I request product pricing?",
    answer:
      "Each product card and detail page lets you add pieces to your Enquiry Basket or click Request Price to prepare an enquiry summary. Our showroom team provides current pricing and availability directly.",
  },
  {
    id: "faq-customize",
    question: "Can I enquire about furniture customization?",
    answer:
      "Yes. You can use the 'Your Space. Your Style. Your Furniture.' customization consultation form to share preferred dimensions, finishes, materials, or seating requirements. Our showroom team will review feasibility and discuss options during consultation.",
  },
  {
    id: "faq-availability",
    question: "How can I check product availability?",
    answer:
      "Add your shortlisted items to the Enquiry Basket or visit our Daba Gardens showroom so our staff can confirm current showroom stock or lead times.",
  },
  {
    id: "faq-directions",
    question: "How can I get directions to the showroom?",
    answer:
      "Use the 'Get Directions' link in the Showroom or Contact section, which opens Google Maps directly pinned near Saraswati Park in Daba Gardens, Visakhapatnam (530020).",
  },
  {
    id: "faq-office",
    question: "How can I enquire about furniture for my office?",
    answer:
      "Browse our Study & Office collection (including executive chairs, desks, and cabinets), or select 'Bulk Enquiry' in the top utility bar to reach our Contact / Consultation page with your workspace requirements.",
  },
];
