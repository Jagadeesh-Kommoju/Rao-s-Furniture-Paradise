"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FooterAccordionItem {
  id: string;
  title: string;
  body: string;
}

export function FooterAccordions({ items }: { items: FooterAccordionItem[] }) {
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);

  return (
    <div className="border-t border-[#E5E5E5] bg-white">
      <div className="container-storefront divide-y divide-[#EFEFEF]">
        {items.map((acc) => {
          const isOpen = openDrawer === acc.id;
          return (
            <div key={acc.id}>
              <button
                type="button"
                onClick={() => setOpenDrawer(isOpen ? null : acc.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between py-3 text-left text-[12.5px] font-medium text-[#444444] hover:text-terracotta transition-colors"
              >
                <span>{acc.title}</span>
                <ChevronDown
                  className={`h-4 w-4 text-[#777777] transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <p className="pb-3.5 text-xs leading-relaxed text-[#666666]">
                  {acc.body}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
