import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Red_Hat_Display } from "next/font/google";
import "./globals.css";
import { businessConfig } from "@/config/business";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { EnquiryModal } from "@/components/ui/EnquiryModal";
import { ScrollToTopButton } from "@/components/homepage/ScrollToTopButton";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const redHat = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-red-hat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(businessConfig.seo.siteUrl),
  title: {
    default: businessConfig.seo.primaryTitle,
    template: `%s | ${businessConfig.brandName}`,
  },
  description: businessConfig.seo.metaDescription,
  keywords: [...businessConfig.seo.keywords],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: businessConfig.brandName,
    title: businessConfig.seo.primaryTitle,
    description: businessConfig.seo.metaDescription,
    images: [
      {
        url: "/images/banners/hero-living.jpg",
        width: 1200,
        height: 630,
        alt: `${businessConfig.brandName} — Daba Gardens, Visakhapatnam`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: businessConfig.seo.primaryTitle,
    description: businessConfig.seo.metaDescription,
    images: ["/images/banners/hero-living.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: businessConfig.brandName,
    description: businessConfig.positioning,
    url: businessConfig.seo.siteUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${businessConfig.location.doorNo}, ${businessConfig.location.building}, ${businessConfig.location.landmark}, ${businessConfig.location.locality}`,
      addressLocality: businessConfig.location.city,
      addressRegion: businessConfig.location.state,
      postalCode: businessConfig.location.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessConfig.location.coordinates.lat,
      longitude: businessConfig.location.coordinates.lng,
    },
    hasMap: businessConfig.location.googleMapsUrl,
    ...(businessConfig.verification.isPhoneVerified && businessConfig.contact.phone
      ? { telephone: businessConfig.contact.phone }
      : {}),
  };

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${redHat.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-white text-charcoal antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <ScrollToTopButton />
        <ToastContainer />
        <EnquiryModal />
      </body>
    </html>
  );
}
