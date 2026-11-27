import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CatalogueBrowser } from "@/components/categories/CatalogueBrowser";
import { allProducts, getProductsByCategory } from "@/data/products";
import { extendedCategoryTiles } from "@/data/categories";
import type { CategorySlug } from "@/types/furniture";

export async function generateStaticParams() {
  return extendedCategoryTiles.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = extendedCategoryTiles.find((c) => c.slug === category);
  if (!cat) return { title: "Collection Not Found" };

  return {
    title: `${cat.name} in Visakhapatnam`,
    description: `Explore ${cat.name.toLowerCase()} (${cat.description}) at Rao's Furniture Paradise, Daba Gardens, Visakhapatnam.`,
    alternates: { canonical: `/collections/${cat.slug}` },
  };
}

export default async function CategoryCollectionPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = extendedCategoryTiles.find((c) => c.slug === category);
  if (!cat) notFound();

  const matchingProducts = getProductsByCategory(category as CategorySlug);

  return (
    <main>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections" },
          { label: cat.name },
        ]}
      />
      <CatalogueBrowser
        products={matchingProducts.length > 0 ? matchingProducts : allProducts}
        initialCategory={cat.slug}
        lockCategory
        pageTitle={`${cat.name} Collection`}
        pageSubtitle={`${cat.description}. Explore sizes, materials, and prepare an enquiry for our Daba Gardens showroom.`}
      />
    </main>
  );
}
