import type { Metadata } from "next";
import { businessConfig } from "@/config/business";
import { CityStorefrontView } from "@/components/homepage/CityStorefrontView";

export const metadata: Metadata = {
  title: businessConfig.seo.primaryTitle,
  description: businessConfig.seo.metaDescription,
  alternates: {
    canonical: "/furniture-in-visakhapatnam",
  },
};

export default function FurnitureInVisakhapatnamPage() {
  return <CityStorefrontView />;
}
