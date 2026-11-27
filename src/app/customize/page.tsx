import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CustomizationSection } from "@/components/customization/CustomizationSection";

export const metadata: Metadata = {
  title: "Customize Furniture Consultation",
  description:
    "Share your preferred dimensions, materials, and finishes for a personalized furniture consultation with Rao's Furniture Paradise in Visakhapatnam.",
  alternates: { canonical: "/customize" },
};

export default function CustomizePage() {
  return (
    <main>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Customize Furniture" }]}
      />
      <section className="container-storefront pt-8 pb-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center rounded-xl border border-beige bg-ivory p-6 sm:p-8">
          <div className="lg:col-span-7 space-y-3">
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-walnut">
              Furniture Consultation &amp; Space Planning
            </h1>
            <p className="text-sm leading-relaxed text-muted">
              Every apartment and office in Visakhapatnam has unique room
              dimensions and storage needs. Prepare your customization
              requirements below so our showroom team can guide you on feasible
              sizes, finishes, and catalog matches.
            </p>
          </div>
          <div className="lg:col-span-5 relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-beige">
            <Image
              src="/images/showroom/showroom-consultation.jpg"
              alt="Furniture showroom living space arrangement — illustrative display"
              fill
              sizes="(max-width: 1024px) 100vw, 450px"
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <CustomizationSection compact />
    </main>
  );
}
