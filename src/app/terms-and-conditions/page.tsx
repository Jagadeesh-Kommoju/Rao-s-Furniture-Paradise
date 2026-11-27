import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { businessConfig } from "@/config/business";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `Demonstration usage terms for ${businessConfig.brandName}.`,
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <main>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Terms and Conditions" },
        ]}
      />
      <article className="container-storefront max-w-4xl py-8 md:py-12 space-y-4 text-sm leading-relaxed text-charcoal/90">
        <h1 className="font-display text-3xl font-semibold text-walnut">
          Terms and Conditions
        </h1>
        <p className="text-xs text-muted">
          Phase 1 Demonstration Storefront · {businessConfig.brandName}
        </p>
        <h2 className="font-display text-lg font-semibold text-walnut pt-2">
          Demonstration Catalogue Disclaimer
        </h2>
        <p>
          All furniture entries marked as Demonstration Catalogue or Demo
          Preview on this Phase 1 website are illustrative examples intended for
          showroom presentation and design review. Final product specifications,
          stock availability, wood finishes, customization feasibility, and
          pricing are confirmed directly by {businessConfig.brandName} at our
          Daba Gardens, Visakhapatnam showroom.
        </p>
        <h2 className="font-display text-lg font-semibold text-walnut pt-2">
          No Online Order Placement
        </h2>
        <p>
          The Enquiry Basket prepares a summary of shortlisted items for
          consultation and pricing requests. It does not constitute a binding
          online order or payment transaction.
        </p>
      </article>
    </main>
  );
}
