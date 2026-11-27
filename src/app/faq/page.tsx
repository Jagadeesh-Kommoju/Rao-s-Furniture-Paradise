import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FaqSection } from "@/components/homepage/FaqSection";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about visiting Rao's Furniture Paradise in Daba Gardens, Visakhapatnam, product pricing enquiries, and office furniture requests.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <main>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <div className="container-storefront pt-8 text-center">
        <h1 className="font-display text-3xl font-semibold text-walnut">
          Help &amp; Frequently Asked Questions
        </h1>
        <p className="mt-2 text-sm text-muted max-w-xl mx-auto">
          Everything you need to know about browsing collections online and
          visiting our Daba Gardens showroom.
        </p>
      </div>
      <FaqSection />
    </main>
  );
}
