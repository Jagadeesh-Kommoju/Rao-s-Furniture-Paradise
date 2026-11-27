import Link from "next/link";
import {
  MapPin,
  ExternalLink,
  Compass,
  ShieldCheck,
  MessageSquareQuote,
  Truck,
} from "lucide-react";
import { businessConfig } from "@/config/business";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { FooterAccordions } from "./FooterAccordions";

const FOOTER_ACCORDIONS = [
  {
    id: "about",
    title: "About Us",
    body: `Located at ${businessConfig.location.fullAddress}, ${businessConfig.brandName} brings curated sofas, solid wood beds, family dining tables, storage units, and workspace furniture together under one Visakhapatnam showroom.`,
  },
  {
    id: "why-choose",
    title: "Why Choose Us?",
    body: "Inspect ergonomics, upholstery fabrics, finish grains, and proportions firsthand near Saraswati Park, with custom dimension consultations and transparent item-wise showroom quotes.",
  },
  {
    id: "related-searches",
    title: "Most Related Searches",
    body: "Sofa Sets in Visakhapatnam · Beds in Daba Gardens · Dining Tables in Vizag · Executive Office Chairs · Wardrobes & Storage Cabinets · Custom Furniture Consultation",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F5F5F5] text-[#333333]">
      {/* Monochrome Showroom Credentials Strip matching PDF page 6 divider band */}
      <div className="border-t border-b border-[#E5E5E5] bg-white py-5">
        <div className="container-storefront flex flex-wrap items-center justify-center sm:justify-between gap-5 text-[11.5px] font-semibold uppercase tracking-[0.11em] text-[#555555]">
          <span className="inline-flex items-center gap-2">
            <Compass className="h-4 w-4 text-[#444444]" />
            Home &amp; Office Collections
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#444444]" />
            Daba Gardens Flagship Showroom
          </span>
          <span className="inline-flex items-center gap-2">
            <MessageSquareQuote className="h-4 w-4 text-[#444444]" />
            Personalized Consultation
          </span>
          <span className="inline-flex items-center gap-2">
            <Truck className="h-4 w-4 text-[#444444]" />
            Visakhapatnam Delivery
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#444444]" />
            Transparent Enquiries
          </span>
        </div>
      </div>

      {/* Main 5-column Directory matching PDF page 6 */}
      <div className="container-storefront py-10 md:py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#222222] mb-3.5">
              Our Company
            </h3>
            <ul className="space-y-2 text-[13px] text-[#555555]">
              <li>
                <Link href="/about" className="hover:text-terracotta transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/showroom" className="hover:text-terracotta transition-colors">
                  Our Visakhapatnam Showroom
                </Link>
              </li>
              <li>
                <Link href="/furniture-in-visakhapatnam" className="hover:text-terracotta transition-colors">
                  Furniture in Visakhapatnam
                </Link>
              </li>
              <li>
                <Link href="/shop-the-look" className="hover:text-terracotta transition-colors">
                  Shop the Look
                </Link>
              </li>
              <li>
                <Link href="/customize" className="hover:text-terracotta transition-colors">
                  Custom Consultation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#222222] mb-3.5">
              Useful Links
            </h3>
            <ul className="space-y-2 text-[13px] text-[#555555]">
              <li>
                <Link href="/collections/sofas" className="hover:text-terracotta transition-colors">
                  Living Room &amp; Sofas
                </Link>
              </li>
              <li>
                <Link href="/collections/beds" className="hover:text-terracotta transition-colors">
                  Bedroom &amp; Beds
                </Link>
              </li>
              <li>
                <Link href="/collections/dining-tables" className="hover:text-terracotta transition-colors">
                  Dining Room Sets
                </Link>
              </li>
              <li>
                <Link href="/collections/office-chairs" className="hover:text-terracotta transition-colors">
                  Office Furniture
                </Link>
              </li>
              <li>
                <Link href="/collections/wardrobes" className="hover:text-terracotta transition-colors">
                  Wardrobes &amp; Storage
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#222222] mb-3.5">
              Shop By Room
            </h3>
            <ul className="space-y-2 text-[13px] text-[#555555]">
              <li>
                <Link href="/collections?room=living" className="hover:text-terracotta transition-colors">
                  Living Room
                </Link>
              </li>
              <li>
                <Link href="/collections?room=bedroom" className="hover:text-terracotta transition-colors">
                  Bedroom
                </Link>
              </li>
              <li>
                <Link href="/collections?room=dining" className="hover:text-terracotta transition-colors">
                  Dining Room
                </Link>
              </li>
              <li>
                <Link href="/collections?room=study-office" className="hover:text-terracotta transition-colors">
                  Study &amp; Office
                </Link>
              </li>
              <li>
                <Link href="/collections/decor" className="hover:text-terracotta transition-colors">
                  Complete Your Space
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#222222] mb-3.5">
              Need Help
            </h3>
            <ul className="space-y-2 text-[13px] text-[#555555]">
              <li>
                <Link href="/contact" className="hover:text-terracotta transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-terracotta transition-colors">
                  Help Center &amp; FAQs
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-terracotta transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-terracotta transition-colors">
                  Enquiry Basket
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-terracotta transition-colors">
                  Search Catalogue
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#222222] mb-3.5">
              Showroom Location
            </h3>
            <div className="space-y-2.5 text-[13px] text-[#555555]">
              <p className="flex items-start gap-2 leading-relaxed">
                <MapPin className="h-4 w-4 shrink-0 text-terracotta mt-0.5" />
                <span>{businessConfig.location.fullAddress}</span>
              </p>
              <a
                href={businessConfig.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-terracotta hover:text-terracotta-hover transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              {businessConfig.verification.isSocialVerified && (
                <div className="flex items-center gap-3 pt-1">
                  {businessConfig.socialLinks.instagram && (
                    <a
                      href={businessConfig.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-walnut hover:text-terracotta"
                    >
                      Instagram
                    </a>
                  )}
                  {businessConfig.socialLinks.facebook && (
                    <a
                      href={businessConfig.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-walnut hover:text-terracotta"
                    >
                      Facebook
                    </a>
                  )}
                </div>
              )}
              {!businessConfig.verification.isPhoneVerified && (
                <p className="text-[11px] text-[#777777]">
                  Phone, hours &amp; social links will appear here upon final client confirmation.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Across Visakhapatnam Strip matching PDF page 6 */}
        <div className="mt-8 flex flex-col gap-3 border-t border-[#E0E0E0] pt-6 md:flex-row md:items-center md:justify-between text-[12.5px] text-[#555555]">
          <p>
            <span className="font-semibold text-[#222222]">Delivery Across Visakhapatnam:</span>{" "}
            Daba Gardens, Allipuram, Asilmetta, MVP Colony, Seethammadhara, Siripuram,
            Gajuwaka &amp; surrounding neighborhoods.
          </p>
          <p className="text-[11.5px] text-[#666666]">
            Phase 1 entries marked <span className="font-semibold text-[#333333]">Demo Preview</span> are illustrative placeholders.
          </p>
        </div>

        {/* Bottom Brand + Legal + Registered/Showroom Office Row matching PDF page 7 top */}
        <div className="mt-6 grid grid-cols-1 gap-5 border-t border-[#E0E0E0] pt-6 md:grid-cols-12 items-center">
          <div className="md:col-span-3">
            <BrandLogo compact />
          </div>

          <div className="md:col-span-5 space-y-1.5 text-[12px] text-[#555555]">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Link href="/terms-and-conditions" className="hover:text-terracotta transition-colors">
                Terms of Use
              </Link>
              <span className="text-[#CCCCCC]">|</span>
              <Link href="/privacy-policy" className="hover:text-terracotta transition-colors">
                Security &amp; Privacy Policy
              </Link>
              <span className="text-[#CCCCCC]">|</span>
              <Link href="/showroom" className="hover:text-terracotta transition-colors">
                Showroom Guide
              </Link>
              <span className="text-[#CCCCCC]">|</span>
              <Link href="/contact" className="hover:text-terracotta transition-colors">
                Enquiries
              </Link>
            </div>
            <p className="text-[11.5px] text-[#666666]">
              &copy; {currentYear} {businessConfig.brandName}. All rights reserved.
              {businessConfig.developerCredit.enabled && (
                <> · {businessConfig.developerCredit.text}</>
              )}
            </p>
          </div>

          <div className="md:col-span-4 text-[11.5px] leading-relaxed text-[#555555]">
            <p className="font-semibold text-[#222222]">Showroom Office</p>
            <p>{businessConfig.location.fullAddress}</p>
          </div>
        </div>
      </div>

      {/* Bottom Expandable Accordions matching PDF page 7 bottom */}
      <FooterAccordions items={FOOTER_ACCORDIONS} />
    </footer>
  );
}
