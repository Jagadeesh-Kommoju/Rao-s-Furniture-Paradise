import { NextResponse } from "next/server";
import { businessConfig } from "@/config/business";

export const dynamic = "force-static";

export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Allow: /furniture-in-visakhapatnam",
    "Allow: /collections",
    "Allow: /customize",
    "Allow: /shop-the-look",
    "Allow: /about",
    "Allow: /showroom",
    "Allow: /contact",
    "Allow: /faq",
    "Disallow: /products/",
    "Disallow: /wishlist",
    "Disallow: /cart",
    "Disallow: /search",
    `Sitemap: ${businessConfig.seo.siteUrl}/sitemap.xml`,
    "",
  ].join("\n");

  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
