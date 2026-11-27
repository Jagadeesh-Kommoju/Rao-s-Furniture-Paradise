import { NextResponse } from "next/server";
import { businessConfig } from "@/config/business";
import { extendedCategoryTiles } from "@/data/categories";

export const dynamic = "force-static";

export function GET() {
  const base = businessConfig.seo.siteUrl;
  const staticRoutes = [
    "",
    "/furniture-in-visakhapatnam",
    "/collections",
    "/customize",
    "/shop-the-look",
    "/about",
    "/showroom",
    "/contact",
    "/faq",
    "/privacy-policy",
    "/terms-and-conditions",
  ];
  const categoryRoutes = extendedCategoryTiles.map((c) => `/collections/${c.slug}`);

  //   product detail pages (/products/[slug]) are intentionally excluded from sitemap indexing.
  const urls = [...staticRoutes, ...categoryRoutes]
    .map((route) => {
      const priority =
        route === "" || route === "/furniture-in-visakhapatnam" ? "1.0" : "0.7";
      const freq =
        route === "" || route === "/furniture-in-visakhapatnam"
          ? "weekly"
          : "monthly";
      return `  <url>
    <loc>${base}${route}</loc>
    <lastmod>2026-11-27</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
