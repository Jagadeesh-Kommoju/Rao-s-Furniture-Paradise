import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { GsapReveal } from "@/components/ui/GsapReveal";
import { HeroBanner } from "./HeroBanner";
import { TrustStrip } from "./TrustStrip";
import { VisakhapatnamIntro } from "./VisakhapatnamIntro";
import { CategoryExplorer } from "./CategoryExplorer";
import { HighlightsCarousel } from "./HighlightsCarousel";
import { PromoBanner } from "./PromoBanner";
import { RoomShowcaseSection } from "./RoomShowcaseSection";
import { CustomizationSection } from "@/components/customization/CustomizationSection";
import { ShopTheLookSection } from "./ShopTheLookSection";
import { AboutShowroomSection } from "./AboutShowroomSection";
import { CustomerReviewsSection } from "./CustomerReviewsSection";
import { LocalSeoSection } from "./LocalSeoSection";
import { FaqSection } from "./FaqSection";
import { roomShowcases } from "@/data/categories";
import { getProductsByRoom } from "@/data/products";

export function CityStorefrontView() {
  return (
    <main>
      {/* D. Breadcrumb navigation */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Furniture", href: "/collections" },
          { label: "Furniture in Visakhapatnam" },
        ]}
      />

      {/* Hero Editorial Banner */}
      <GsapReveal>
        <HeroBanner />
      </GsapReveal>

      {/* E. Trust and value proposition strip */}
      <TrustStrip />

      {/* F. City-specific introduction (H1) */}
      <VisakhapatnamIntro />

      {/* G + H. Category filter tabs & 12-tile visual category grid */}
      <CategoryExplorer />

      {/* Curated Furniture Highlights Strip */}
      <HighlightsCarousel />

      {/* I. Promotional banner */}
      <PromoBanner />

      {/* J, K, L, M, N. Five Room-wise Showcases + Featured Product Carousels */}
      {roomShowcases.map((showcase) => (
        <RoomShowcaseSection
          key={showcase.id}
          config={showcase}
          products={getProductsByRoom(showcase.id)}
        />
      ))}

      {/* O. Furniture customization consultation section */}
      <CustomizationSection />

      {/* P. Shop the Look interactive room hotspots */}
      <ShopTheLookSection />

      {/* Q & R. About Rao's Furniture Paradise + Daba Gardens Showroom & Map */}
      <AboutShowroomSection />

      {/* S. Customer reviews (hidden when verified reviews unavailable) */}
      <CustomerReviewsSection />

      {/* T. Local SEO editorial content */}
      <LocalSeoSection />

      {/* U. FAQ accordion */}
      <FaqSection />
    </main>
  );
}
