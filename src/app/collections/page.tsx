import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CatalogueBrowser } from "@/components/categories/CatalogueBrowser";
import { allProducts } from "@/data/products";
import type { RoomGroup } from "@/types/furniture";

export const metadata: Metadata = {
  title: "Furniture Collections",
  description:
    "Browse home and office furniture collections at Rao's Furniture Paradise in Daba Gardens, Visakhapatnam.",
  alternates: { canonical: "/collections" },
};

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ room?: string; featured?: string }>;
}) {
  const params = await searchParams;
  const validRooms: RoomGroup[] = [
    "living",
    "bedroom",
    "dining",
    "study-office",
    "decor",
    "outdoor",
  ];
  const initialRoom = validRooms.includes(params.room as RoomGroup)
    ? (params.room as RoomGroup)
    : "all";
  const initialFeaturedOnly = params.featured === "true";

  return (
    <main>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Collections" },
        ]}
      />
      <CatalogueBrowser
        products={allProducts}
        initialRoom={initialRoom}
        initialFeaturedOnly={initialFeaturedOnly}
        pageTitle="Furniture Collections"
        pageSubtitle="Explore living room, bedroom, dining, study & office furniture curated for homes and workplaces in Visakhapatnam."
      />
    </main>
  );
}
