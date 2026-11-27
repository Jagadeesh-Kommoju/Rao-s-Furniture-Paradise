"use client";

import { useState } from "react";

export function VisakhapatnamIntro() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="pt-3 pb-2 md:pt-5 md:pb-3">
      <div className="container-storefront text-center">
        <h1 className="font-display text-[21px] sm:text-[28px] font-normal leading-[32px] tracking-[0.7px] text-[#333333]">
          Furniture in Visakhapatnam
        </h1>

        <div className="mx-auto mt-1.5 max-w-5xl text-[13px] sm:text-[13.5px] leading-[1.45] text-[#666666]">
          <div className={expanded ? "space-y-1.5" : "flex items-center justify-center gap-1.5"}>
            <p className={expanded ? "" : "truncate max-w-[78vw] sm:max-w-[920px]"}>
              Discover furniture that brings comfort, style and functionality to
              your everyday life. Explore sofas, beds, dining furniture and
              workspace essentials at Rao&apos;s Furniture Paradise, Daba Gardens,
              Visakhapatnam.
            </p>
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              aria-label={expanded ? "Read Less" : "Read More"}
              className="shrink-0 text-[13px] font-normal text-terracotta hover:text-terracotta-hover transition-colors"
            >
              {expanded ? "Read Less" : "More"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
