import Link from "next/link";
import Image from "next/image";
import { MapPin, Navigation, PhoneCall, Clock, ArrowRight } from "lucide-react";
import { businessConfig } from "@/config/business";
import { getVerifiedTelUrl } from "@/utils/enquiry";

export function AboutShowroomSection() {
  const telUrl = getVerifiedTelUrl();

  return (
    <section
      aria-label="About and Visit Rao's Furniture Paradise Showroom"
      className="py-10 md:py-12 bg-surface-subtle border-y border-border-soft"
    >
      <div className="container-storefront space-y-10">
        {/* About Block (10Q) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center rounded-xl border border-beige bg-white p-6 sm:p-8 shadow-2xs">
          <div className="lg:col-span-6 space-y-3.5">
            <p className="text-xs font-bold uppercase tracking-wider text-terracotta">
              Our Visakhapatnam Showroom
            </p>
            <h2 className="font-display text-2xl sm:text-[28px] font-semibold text-walnut leading-tight">
              About Rao&apos;s Furniture Paradise
            </h2>
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
                <p className="inline-block rounded-md bg-ivory border border-beige px-3 py-1 text-xs font-semibold text-walnut">
                  Established in {businessConfig.contact.establishedYear}
                </p>
              )}
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 rounded-md border border-walnut px-4 py-2 text-xs sm:text-sm font-semibold text-walnut hover:bg-walnut hover:text-white transition-colors"
              >
                <span>More About Us</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-md bg-terracotta px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-terracotta-hover transition-colors"
              >
                <span>Enquire with Showroom</span>
              </Link>
            </div>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-beige lg:col-span-6">
            <Image
              src="/images/showroom/showroom-interior.jpg"
              alt="Illustrative warm furniture showroom display interior"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
            <div className="absolute bottom-2.5 right-2.5 rounded bg-black/60 px-2.5 py-1 text-[10.5px] text-white">
              Illustrative Showroom Visual
            </div>
          </div>
        </div>

        {/* Experience Furniture in Person (10R) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-beige bg-white p-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-terracotta">
                Visit Us in Daba Gardens
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-walnut">
                Experience Furniture in Person
              </h2>
              <div className="mt-4 space-y-3 text-sm text-charcoal">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-5 w-5 shrink-0 text-terracotta mt-0.5" />
                  <div>
                    <p className="font-semibold text-walnut">Showroom Address</p>
                    <p className="text-muted mt-0.5 leading-relaxed">
                      {businessConfig.brandName}, {businessConfig.location.fullAddress}
                    </p>
                  </div>
                </div>

                {businessConfig.verification.isHoursVerified &&
                  businessConfig.contact.hours && (
                    <div className="flex items-start gap-2.5">
                      <Clock className="h-5 w-5 shrink-0 text-terracotta mt-0.5" />
                      <div>
                        <p className="font-semibold text-walnut">Showroom Hours</p>
                        <p className="text-muted text-xs mt-0.5">
                          Mon–Sat: {businessConfig.contact.hours.weekdays}
                        </p>
                        <p className="text-muted text-xs">
                          Sunday: {businessConfig.contact.hours.sunday}
                        </p>
                      </div>
                    </div>
                  )}

                {!businessConfig.verification.isPhoneVerified && (
                  <p className="rounded-lg border border-border-soft bg-ivory p-3 text-xs text-muted">
                    {businessConfig.contact.pendingConfirmationNote}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={businessConfig.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-terracotta px-4 py-2.5 text-sm font-semibold text-white hover:bg-terracotta-hover transition-colors"
              >
                <Navigation className="h-4 w-4" />
                <span>Get Directions</span>
              </a>

              {telUrl && businessConfig.contact.phone && (
                <a
                  href={telUrl}
                  className="inline-flex items-center gap-2 rounded-md border border-walnut bg-white px-4 py-2.5 text-sm font-semibold text-walnut hover:bg-walnut hover:text-white transition-colors"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>Call Showroom</span>
                </a>
              )}

              <Link
                href="/showroom"
                className="inline-flex items-center gap-1.5 rounded-md border border-beige bg-ivory px-4 py-2.5 text-sm font-medium text-charcoal hover:border-terracotta transition-colors"
              >
                <span>Showroom Guide</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 overflow-hidden rounded-xl border border-beige bg-white min-h-[300px]">
            <iframe
              title="Rao's Furniture Paradise Location Map — Daba Gardens, Visakhapatnam"
              src={businessConfig.location.googleMapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[300px] w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
