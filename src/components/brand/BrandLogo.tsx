import Link from "next/link";
import Image from "next/image";
import { businessConfig } from "@/config/business";

interface BrandLogoProps {
  compact?: boolean;
  href?: string;
}

export function BrandLogo({ compact = false, href = "/" }: BrandLogoProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded"
      aria-label={`${businessConfig.brandName} — Home`}
    >
      <Image
        src="/images/brand/raos-logo.png"
        alt={businessConfig.brandName}
        width={951}
        height={449}
        priority={!compact}
        className={`w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] ${
          compact
            ? "h-[42px] sm:h-[52px]"
            : "h-[40px] sm:h-[46px] md:h-[52px] lg:h-[64px]"
        }`}
      />
    </Link>
  );
}
