"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { showroomFaqs } from "@/data/categories";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: showroomFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="border-t border-[#EFEFEF] bg-white py-10 md:py-12"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container-storefront">
        <div className="text-center mb-7">
          <h2 className="font-display text-lg sm:text-[20px] font-normal uppercase tracking-[0.08em] text-[#333333]">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mt-2.5 h-[1px] w-16 bg-terracotta" />
        </div>

        {/* Open flat divider list matching PDF page 6 */}
        <dl className="divide-y divide-[#E5E5E5] border-t border-b border-[#E5E5E5] bg-white">
          {showroomFaqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id}>
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    className="flex w-full items-center justify-between gap-4 py-4 px-1 text-left text-[13.5px] sm:text-[14.5px] font-medium text-[#333333] hover:text-terracotta transition-colors"
                  >
                    <span>{item.question}</span>
                    {isOpen ? (
                      <Minus className="h-4 w-4 shrink-0 text-terracotta" />
                    ) : (
                      <Plus className="h-4 w-4 shrink-0 text-[#666666]" />
                    )}
                  </button>
                </dt>
                {isOpen && (
                  <dd
                    id={`faq-panel-${item.id}`}
                    className="pb-4 px-1 text-[13.5px] leading-relaxed text-[#666666]"
                  >
                    {item.answer}
                  </dd>
                )}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
