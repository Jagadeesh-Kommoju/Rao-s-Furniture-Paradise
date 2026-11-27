import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Navigation, PhoneCall, Clock } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { businessConfig } from "@/config/business";
import { getVerifiedTelUrl } from "@/utils/enquiry";

export const metadata: Metadata = {
  title: "Visit Showroom in Daba Gardens, Visakhapatnam",
  description:
    "Visit Rao's Furniture Paradise at Prasantharama Mansion, Near Saraswati Park, Daba Gardens, Visakhapatnam — 530020.",
  alternates: { canonical: "/showroom" },
};

export default function ShowroomPage() {
  const telUrl = getVerifiedTelUrl();

  return (
    <main>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Visit Showroom" }]}
      />
      <div className="container-storefront py-8 md:py-12 space-y-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-wider text-terracotta">
            Daba Gardens · Visakhapatnam
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-walnut">
            Experience Furniture in Person
          </h1>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            Visit {businessConfig.brandName} near Saraswati Park to compare
            wood tones, upholstery textures, seating comfort, and room
            proportions firsthand with our showroom team.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 rounded-xl border border-beige bg-ivory p-6 space-y-5">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-terracotta shrink-0 mt-0.5" />
              <div>
                <h2 className="font-display text-base font-semibold text-walnut">
                  Showroom Address
                </h2>
                <p className="mt-1 text-sm text-charcoal leading-relaxed">
                  {businessConfig.location.fullAddress}
                </p>
              </div>
            </div>

            {businessConfig.verification.isHoursVerified &&
              businessConfig.contact.hours && (
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-terracotta shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-walnut">Opening Hours</p>
                    <p className="text-muted">
                      Mon–Sat: {businessConfig.contact.hours.weekdays}
                    </p>
                    <p className="text-muted">
                      Sunday: {businessConfig.contact.hours.sunday}
                    </p>
                  </div>
                </div>
              )}

            {!businessConfig.verification.isPhoneVerified && (
              <div className="rounded-lg border border-beige bg-white p-3.5 text-xs text-muted">
                {businessConfig.contact.pendingConfirmationNote}
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={businessConfig.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-terracotta px-5 py-2.5 text-sm font-semibold text-white hover:bg-terracotta-hover transition-colors"
              >
                <Navigation className="h-4 w-4" />
                <span>Get Directions</span>
              </a>

              {telUrl && businessConfig.contact.phone && (
                <a
                  href={telUrl}
                  className="inline-flex items-center gap-2 rounded-md border border-walnut bg-white px-5 py-2.5 text-sm font-semibold text-walnut hover:bg-walnut hover:text-white transition-colors"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>Call Showroom</span>
                </a>
              )}

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-beige bg-white px-4 py-2.5 text-sm font-medium text-charcoal hover:border-terracotta transition-colors"
              >
                <span>Enquiry Form</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 overflow-hidden rounded-xl border border-beige min-h-[340px]">
            <iframe
              title="Showroom Location Map"
              src={businessConfig.location.googleMapsEmbedUrl}
              loading="lazy"
              className="h-full min-h-[340px] w-full border-0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-beige">
            <Image
              src="/images/showroom/showroom-interior.jpg"
              alt="Illustrative furniture showroom floor"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-beige">
            <Image
              src="/images/showroom/showroom-consultation.jpg"
              alt="Illustrative living room setup inside showroom"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
