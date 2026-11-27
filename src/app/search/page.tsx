import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CatalogueBrowser } from "@/components/categories/CatalogueBrowser";
import { allProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Search Furniture Catalogue",
  description:
    "Search sofas, beds, dining sets, office chairs, and storage furniture at Rao's Furniture Paradise.",
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() || "";

  return (
    <main>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: q ? `Search: "${q}"` : "Search Catalogue" },
        ]}
      />
      <CatalogueBrowser
        products={allProducts}
        initialQuery={q}
        pageTitle={q ? `Search Results for "${q}"` : "Search Furniture Catalogue"}
        pageSubtitle="Filter demonstration furniture items by room, material, finish, and color."
      />
    </main>
  );
}
