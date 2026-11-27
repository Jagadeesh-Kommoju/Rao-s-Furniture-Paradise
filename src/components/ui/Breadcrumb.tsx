import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };

  return (
    <div className="border-b border-border-soft/60 bg-white">
      <div className="container-storefront flex h-8 items-center text-[12px] text-muted overflow-x-auto no-scrollbar whitespace-nowrap">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <span key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5">
                {idx > 0 && (
                  <ChevronRight className="h-3 w-3 text-muted/70 shrink-0" aria-hidden="true" />
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-terracotta transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "font-medium text-charcoal" : ""}>
                    {item.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
