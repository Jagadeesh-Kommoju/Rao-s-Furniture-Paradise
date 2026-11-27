import Link from "next/link";
import { MapPin, PhoneCall, HelpCircle, Building2 } from "lucide-react";
import { topUtilityLinks } from "@/data/navigation";
import { businessConfig } from "@/config/business";
import { getVerifiedTelUrl } from "@/utils/enquiry";

export function TopUtilityBar() {
  const telUrl = getVerifiedTelUrl();

  return (
    <div className="hidden md:block border-b border-[#EFECE7] bg-white text-[12px] text-muted">
      <div className="container-storefront flex h-[38px] items-center justify-between gap-3">
        <nav aria-label="Primary business scopes" className="flex items-center whitespace-nowrap">
          {topUtilityLinks.left.map((item, idx) => (
            <span
              key={item.label}
              className={`items-center ${idx === 2 ? "hidden lg:inline-flex" : "inline-flex"}`}
            >
              {idx > 0 && (
                <span className="mx-2 lg:mx-3 text-beige select-none" aria-hidden="true">
                  |
                </span>
              )}
              <Link
                href={item.href}
                className={
                  item.active
                    ? "font-medium text-terracotta hover:text-terracotta-hover transition-colors"
                    : "hover:text-walnut transition-colors"
                }
              >
                {item.label}
              </Link>
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:gap-4 whitespace-nowrap">
          {telUrl && businessConfig.contact.phone ? (
            <a
              href={telUrl}
              className="hidden lg:inline-flex items-center gap-1.5 font-medium text-charcoal hover:text-terracotta transition-colors"
            >
              <PhoneCall className="h-3.5 w-3.5 text-terracotta" />
              <span>{businessConfig.contact.phone}</span>
            </a>
          ) : (
            <Link
              href="/showroom"
              className="hidden lg:inline-flex items-center gap-1.5 text-walnut hover:text-terracotta transition-colors"
            >
              <Building2 className="h-3.5 w-3.5 text-terracotta" />
              <span>Daba Gardens, Vizag</span>
            </Link>
          )}
          <span className="hidden lg:inline text-beige select-none" aria-hidden="true">
            |
          </span>
          <Link
            href="/contact"
            className="hover:text-walnut transition-colors"
          >
            Contact Us
          </Link>
          <span className="text-beige select-none" aria-hidden="true">
            |
          </span>
          <Link
            href="/showroom"
            className="inline-flex items-center gap-1 hover:text-walnut transition-colors"
          >
            <MapPin className="h-3.5 w-3.5 text-terracotta" />
            <span>Visit Showroom</span>
          </Link>
          <span className="text-beige select-none" aria-hidden="true">
            |
          </span>
          <Link
            href="/faq"
            className="inline-flex items-center gap-1 hover:text-walnut transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Help Center</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
