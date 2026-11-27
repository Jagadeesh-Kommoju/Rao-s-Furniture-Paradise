"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function LocalSeoSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      aria-label="Visakhapatnam Furniture Buying Guide"
      className="py-10 md:py-12 bg-white"
    >
      <div className="container-storefront">
        <div className="space-y-6 text-[13.5px] sm:text-[14px] leading-relaxed text-[#555555]">
          <div>
            <h2 className="font-display text-lg sm:text-[22px] font-normal text-[#333333] mb-2.5">
              Explore Quality Furniture Options in Visakhapatnam
            </h2>
            <p>
              Visakhapatnam homes blend coastal warmth, family living, and
              modern apartment layouts. Whether you are furnishing a new
              residence in MVP Colony, upgrading a home in Seethammadhara, or
              setting up an office near Daba Gardens and Asilmetta, choosing
              furniture that balances everyday comfort, proportion, and
              dependable materials makes all the difference at Rao&apos;s
              Furniture Paradise.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-display text-[15px] font-semibold text-[#333333] mb-1.5">
                Living Room Furniture for Modern Visakhapatnam Homes
              </h3>
              <p>
                A welcoming living area starts with well-proportioned seating
                such as a{" "}
                <Link
                  href="/collections/sofas"
                  className="text-terracotta hover:underline font-medium"
                >
                  3-seater or L-shaped sofa
                </Link>{" "}
                paired with a lounge chair, coffee table, and organized TV
                unit. Breathable fabrics and elevated wooden legs help Vizag
                apartments feel airy and simple to maintain.
              </p>
            </div>

            <div>
              <h3 className="font-display text-[15px] font-semibold text-[#333333] mb-1.5">
                Solid Wood Beds and Wardrobes for Restful Bedrooms
              </h3>
              <p>
                Comfortable bedrooms pair sturdy{" "}
                <Link
                  href="/collections/beds"
                  className="text-terracotta hover:underline font-medium"
                >
                  king and queen beds
                </Link>{" "}
                with coordinated{" "}
                <Link
                  href="/collections/dressing-tables"
                  className="text-terracotta hover:underline font-medium"
                >
                  dressing tables
                </Link>{" "}
                and spacious wardrobes. Storage beds and tall cabinets keep
                linens and daily items neatly organized without crowding room
                circulation.
              </p>
            </div>
          </div>

          {expanded && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
              <div>
                <h3 className="font-display text-[15px] font-semibold text-[#333333] mb-1.5">
                  Dining Furniture Designed for Visakhapatnam Families
                </h3>
                <p>
                  From compact{" "}
                  <Link
                    href="/collections/dining-tables"
                    className="text-terracotta hover:underline font-medium"
                  >
                    4-seater dining tables
                  </Link>{" "}
                  to spacious 6-seater family sets and crockery sideboards,
                  choosing smooth edges and supportive dining chairs keeps
                  everyday meals comfortable and inviting.
                </p>
              </div>

              <div>
                <h3 className="font-display text-[15px] font-semibold text-[#333333] mb-1.5">
                  Study Tables and Home Office Furniture in Visakhapatnam
                </h3>
                <p>
                  Focused study corners and offices across Vizag rely on
                  supportive{" "}
                  <Link
                    href="/collections/office-chairs"
                    className="text-terracotta hover:underline font-medium"
                  >
                    executive chairs
                  </Link>
                  , ergonomic task seating, study tables, and structured
                  bookshelves built for productive daily work.
                </p>
              </div>

              <div>
                <h3 className="font-display text-[15px] font-semibold text-[#333333] mb-1.5">
                  Smart Space-Saving Furniture for Apartments
                </h3>
                <p>
                  In modern apartments, dual-purpose pieces like{" "}
                  <Link
                    href="/collections/sofa-cum-beds"
                    className="text-terracotta hover:underline font-medium"
                  >
                    sofa cum beds
                  </Link>
                  , nested coffee tables, and vertical storage racks maximize
                  utility while keeping guest and family zones uncluttered.
                </p>
              </div>

              <div>
                <h3 className="font-display text-[15px] font-semibold text-[#333333] mb-1.5">
                  Visit Rao&apos;s Furniture Paradise in Daba Gardens
                </h3>
                <p>
                  After browsing online and saving favorites to your Wishlist or
                  Enquiry Basket, visit{" "}
                  <Link
                    href="/showroom"
                    className="text-terracotta hover:underline font-medium"
                  >
                    Rao&apos;s Furniture Paradise near Saraswati Park
                  </Link>{" "}
                  in Daba Gardens to compare finish tones, cushioning comfort,
                  and custom dimensions firsthand with our showroom team.
                </p>
              </div>
            </div>
          )}

          <div className="pt-1">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta hover:text-terracotta-hover transition-colors"
            >
              <span>
                {expanded
                  ? "Show Less Local Guide"
                  : "Read Complete Visakhapatnam Furniture Guide"}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
