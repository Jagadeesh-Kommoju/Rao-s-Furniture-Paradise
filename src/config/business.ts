export interface ClientReview {
  id: string;
  authorName: string;
  area: string;
  quote: string;
  dateLabel: string;
  verifiedSource: string;
}

export const businessConfig = {
  brandName: "Rao's Furniture Paradise",
  shortName: "Rao's",
  tagline: "Beautiful Spaces. Better Living.",
  positioning:
    "A welcoming furniture showroom offering thoughtfully selected furniture for homes and workplaces in Visakhapatnam.",
  industry: "Home and Office Furniture",
  location: {
    doorNo: "Dr. No. 30-15-171",
    building: "Prasantharama Mansion",
    landmark: "Near Saraswati Park",
    locality: "Daba Gardens",
    city: "Visakhapatnam",
    cityAlias: "Vizag",
    state: "Andhra Pradesh",
    country: "India",
    postalCode: "530020",
    shortAddress:
      "Daba Gardens, near Saraswati Park, Visakhapatnam, Andhra Pradesh — 530020",
    fullAddress:
      "Dr. No. 30-15-171, Prasantharama Mansion, Near Saraswati Park, Daba Gardens, Visakhapatnam, Andhra Pradesh — 530020",
    coordinates: {
      lat: 17.7143612,
      lng: 83.3009386,
    },
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=17.7143612,83.3009386",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=17.7143612,83.3009386&z=16&output=embed",
  },
  verification: {
    // Public directory records (e.g. TradeIndia 1990 vs Justdial 2005, phone, hours)
    // must remain gated until directly confirmed by the client.
    isPhoneVerified: false,
    isWhatsappVerified: false,
    isHoursVerified: false,
    isEstablishedYearVerified: false,
    isEmailVerified: false,
    isSocialVerified: false,
    isReviewsVerified: false,
    isCatalogueClientApproved: false,
  },
  contact: {
    phone: null as string | null,
    whatsappNumber: null as string | null,
    email: null as string | null,
    hours: null as { weekdays: string; sunday: string } | null,
    establishedYear: null as number | null,
    pendingConfirmationNote:
      "Showroom phone, WhatsApp number, and operating hours are pending final client confirmation.",
  },
  socialLinks: {
    instagram: null as string | null,
    facebook: null as string | null,
    youtube: null as string | null,
  },
  verifiedReviews: [] as ClientReview[],
  developerCredit: {
    enabled: true,
    text: "Designed & Developed by LogiDev",
    companyName: "LogiDev",
  },
  seo: {
    siteUrl:
      process.env.NEXT_PUBLIC_SITE_URL || "https://raosfurnitureparadise.in",
    primaryTitle: "Furniture in Visakhapatnam | Rao's Furniture Paradise",
    metaDescription:
      "Explore sofas, beds, dining furniture and office furniture at Rao's Furniture Paradise in Daba Gardens, Visakhapatnam. Discover collections and enquire about your furniture requirements.",
    keywords: [
      "Furniture in Visakhapatnam",
      "Furniture stores in Vizag",
      "Furniture showroom in Vizag",
      "Furniture shop in Daba Gardens",
      "Sofa sets in Visakhapatnam",
      "Bedroom furniture in Vizag",
      "Dining tables in Vizag",
      "Office furniture in Visakhapatnam",
      "Furniture near Saraswati Park",
      "Rao's Furniture Paradise",
    ],
  },
} as const;
