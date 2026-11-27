import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { businessConfig } from "@/config/business";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Rao's Furniture Paradise in Daba Gardens, Visakhapatnam — home and office furniture showroom.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
      <div className="container-storefront py-8 md:py-12 space-y-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-terracotta">
              {businessConfig.tagline}
            </p>
            <h1 className="font-display text-3xl font-semibold text-walnut">
              About {businessConfig.brandName}
            </h1>
            <p className="text-sm leading-relaxed text-charcoal/90">
              At Rao&apos;s Furniture Paradise, we believe that furniture plays
              an important role in making a space feel like home. Located in
              Daba Gardens, Visakhapatnam, our showroom provides a place to
              explore furniture ideas for living rooms, bedrooms, dining areas
              and workplaces.
            </p>
            <p className="text-sm leading-relaxed text-charcoal/90">
              Whether you are furnishing a new home, upgrading your existing
              space or choosing furniture for your workplace, connect with our
              team and discover options that complement your style and
              requirements.
            </p>
            {businessConfig.verification.isEstablishedYearVerified &&
              businessConfig.contact.establishedYear && (
                <p className="text-sm font-semibold text-walnut">
                  Established in {businessConfig.contact.establishedYear}.
                </p>
              )}
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/showroom"
                className="inline-flex items-center gap-2 rounded-md bg-terracotta px-5 py-2.5 text-sm font-semibold text-white hover:bg-terracotta-hover transition-colors"
              >
                <MapPin className="h-4 w-4" />
                <span>Visit Our Showroom</span>
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 rounded-md border border-walnut px-5 py-2.5 text-sm font-semibold text-walnut hover:bg-walnut hover:text-white transition-colors"
              >
                <span>Browse Collections</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-beige">
            <Image
              src="/images/showroom/showroom-interior.jpg"
              alt="Illustrative warm furniture showroom display"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="rounded-xl border border-beige bg-ivory p-6 space-y-2 text-sm text-charcoal">
          <h2 className="font-display text-lg font-semibold text-walnut">
            Showroom Location
          </h2>
          <p className="text-muted">{businessConfig.location.fullAddress}</p>
          <p className="text-xs text-muted pt-1">
            Phase 1 Note: Establishment year and verified directory details are
            pending direct client confirmation and will be updated alongside the
            live product catalogue.
          </p>
        </div>
      </div>
    </main>
  );
}
