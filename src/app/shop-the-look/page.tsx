import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ShopTheLookSection } from "@/components/homepage/ShopTheLookSection";

export const metadata: Metadata = {
  title: "Shop the Look — Room Inspiration",
  description:
    "Explore curated living room, bedroom, and dining room setups with interactive hotspots at Rao's Furniture Paradise, Visakhapatnam.",
  alternates: { canonical: "/shop-the-look" },
};

export default function ShopTheLookPage() {
  return (
    <main>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Shop the Look" }]}
      />
      <div className="container-storefront pt-8">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-walnut">
          Shop the Look — Curated Room Setups
        </h1>
        <p className="mt-1.5 text-sm text-muted max-w-2xl">
          Inspect how individual furniture pieces pair together inside Modern
          Living Room, Elegant Bedroom, and Contemporary Dining Room layouts.
        </p>
      </div>
      <ShopTheLookSection />
    </main>
  );
}
