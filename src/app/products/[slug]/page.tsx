import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import {
  allProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/data/products";

export async function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description,
    // Exclude demo product detail pages from search indexing per Phase 1 SEO rules.
    robots: product.isDemo 
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  return (
    <main>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections" },
          { label: product.subcategory, href: `/collections/${product.category}` },
          { label: product.name },
        ]}
      />
      <ProductDetailClient product={product} relatedProducts={related} />
    </main>
  );
}
