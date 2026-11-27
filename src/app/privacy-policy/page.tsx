import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { businessConfig } from "@/config/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy notice for ${businessConfig.brandName} digital showroom demonstration.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <article className="container-storefront max-w-4xl py-8 md:py-12 space-y-4 text-sm leading-relaxed text-charcoal/90">
        <h1 className="font-display text-3xl font-semibold text-walnut">
          Privacy Policy
        </h1>
        <p className="text-xs text-muted">
          Phase 1 Frontend Demonstration Notice · {businessConfig.brandName}
        </p>
        <p>
          This Phase 1 storefront operates purely on the client side as a
          digital showroom demonstration for {businessConfig.brandName},{" "}
          {businessConfig.location.fullAddress}.
        </p>
        <h2 className="font-display text-lg font-semibold text-walnut pt-2">
          Local Browser Storage
        </h2>
        <p>
          Wishlist bookmarks, Enquiry Basket selections, recent searches, and
          recently viewed product references are stored strictly in your own
          browser&apos;s LocalStorage so they remain available between page
          reloads. No backend database, user account system, or online payment
          processing is active in this phase.
        </p>
        <h2 className="font-display text-lg font-semibold text-walnut pt-2">
          Enquiry Summaries
        </h2>
        <p>
          When you generate a product or customization enquiry summary, the text
          is prepared locally on your device for you to copy or share through
          client-approved communication channels.
        </p>
      </article>
    </main>
  );
}
