import Link from "next/link";
import { Sofa, UserCheck, Store, ClipboardList, ArrowRight } from "lucide-react";

const trustItems = [
  {
    icon: Sofa,
    title: "Home & Office",
    shortLine: "Furniture",
    description: "Every space covered",
  },
  {
    icon: UserCheck,
    title: "Personal",
    shortLine: "Assistance",
    description: "Guided showroom selection",
  },
  {
    icon: Store,
    title: "Daba Gardens",
    shortLine: "Showroom",
    description: "Near Saraswati Park",
  },
  {
    icon: ClipboardList,
    title: "Direct",
    shortLine: "Enquiries",
    description: "Easy shortlist quotes",
  },
];

export function TrustStrip() {
  return (
    <section aria-label="Why Choose Rao's Furniture Paradise" className="pb-3 md:pb-5">
      <div className="container-storefront">
        {/* Desktop & Tablet Dual-Card Neutral Strip (1240 x 120 matching reference geometry) */}
        <div
          data-section="trust-strip"
          className="hidden md:flex md:h-[120px] items-stretch gap-2 rounded-[6px] bg-[#F3F4F6] px-4 lg:px-[28px] py-4 lg:py-[20px]"
        >
          {/* Left Elevated Card: Showroom Consultation & Custom Guidance */}
          <div className="flex md:w-[34%] lg:w-[43%] items-center justify-between gap-2 lg:gap-3 rounded-[6px] bg-white px-3.5 lg:px-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2.5 lg:gap-3 min-w-0">
              <span className="flex h-9 w-9 lg:h-11 lg:w-11 shrink-0 items-center justify-center rounded-full bg-ivory text-terracotta">
                <Store className="h-4 w-4 lg:h-5 lg:w-5 stroke-[1.75]" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] lg:text-[11px] font-bold uppercase tracking-wider text-terracotta truncate">
                  Visakhapatnam
                </p>
                <p className="font-display text-[13px] lg:text-[15px] font-medium text-charcoal truncate">
                  Daba Gardens Showroom
                </p>
                <p className="hidden lg:block text-[11.5px] text-muted truncate">
                  Walk-in guidance &amp; custom sizing options
                </p>
              </div>
            </div>
            <Link
              href="/showroom"
              className="hidden lg:inline-flex shrink-0 items-center gap-1 rounded-[4px] border border-terracotta/40 bg-ivory/70 px-3 py-1.5 text-[11.5px] font-medium text-terracotta hover:bg-terracotta hover:text-white transition-colors"
            >
              <span>Visit Us</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Right Elevated Card: 4 Value Proposition Icons (grid on md 768px, flex justify-between on lg+) */}
          <div className="grid flex-1 grid-cols-4 lg:flex lg:items-center lg:justify-between gap-1.5 lg:gap-3 rounded-[6px] bg-white px-3 lg:px-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col lg:flex-row items-center text-center lg:text-left gap-1 lg:gap-2 min-w-0"
                >
                  <span className="flex h-9 w-9 lg:h-10 lg:w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF5EE] text-terracotta">
                    <Icon className="h-4 w-4 lg:h-[18px] lg:w-[18px] stroke-[1.7]" />
                  </span>
                  <div className="min-w-0 leading-tight">
                    <p className="text-[11px] lg:text-[12.5px] font-medium text-charcoal whitespace-nowrap">
                      {item.title}
                    </p>
                    <p className="text-[10.5px] lg:text-[11.5px] text-muted whitespace-nowrap">
                      {item.shortLine}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Compact Stack matching reference 390x844 layout */}
        <div className="md:hidden space-y-2.5">
          <Link
            href="/showroom"
            className="flex items-center justify-between rounded-[6px] border border-[#E5E5E5] bg-white px-3.5 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Store className="h-4 w-4 text-terracotta shrink-0" />
              <span className="text-[12px] font-medium text-charcoal truncate">
                Daba Gardens Showroom · Personal Guidance
              </span>
            </div>
            <span className="text-[11px] font-semibold text-terracotta shrink-0">
              Directions &rarr;
            </span>
          </Link>

          <div className="rounded-[6px] border border-[#E5E5E5] bg-white px-2.5 py-3 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <h2 className="font-display text-[15px] font-normal text-charcoal">
              Why Choose Rao&apos;s Furniture?
            </h2>
            <div className="mx-auto my-2 h-px w-20 bg-[#E5E5E5]" />
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex flex-col items-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF5EE] text-terracotta">
                      <Icon className="h-4.5 w-4.5 stroke-[1.7]" />
                    </span>
                    <p className="mt-1.5 text-[10.5px] leading-[1.2] text-charcoal">
                      <span className="block font-medium">{item.title}</span>
                      <span className="block text-muted">{item.shortLine}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
