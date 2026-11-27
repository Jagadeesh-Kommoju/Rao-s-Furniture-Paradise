"use client";

import { useState } from "react";
import Link from "next/link";
import { Sliders, CheckCircle2, ArrowRight, MessageSquarePlus } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { buildCustomizationEnquiryMessage } from "@/utils/enquiry";
import type { CustomizationDraft } from "@/types/furniture";

const FURNITURE_TYPES = [
  "Sofa Set / Sectional",
  "Bed (King / Queen / Storage)",
  "Dining Table Set",
  "Wardrobe / Storage Unit",
  "Study Desk / Home Office Setup",
  "TV Unit / Media Console",
  "Dressing Table",
  "Executive / Office Seating",
];

const MATERIALS = [
  "Solid Walnut / Sheesham Finish",
  "Engineered Wood & Veneer",
  "Solid Teak Tone",
  "Upholstered Fabric & Wood",
  "Metal & Wood Industrial",
  "Open to Showroom Recommendation",
];

const COLORS = [
  { name: "Warm Walnut", hex: "#4A3025" },
  { name: "Natural Honey Oak", hex: "#C28B56" },
  { name: "Terracotta Linen", hex: "#B5683C" },
  { name: "Ivory Cream", hex: "#EAE3D5" },
  { name: "Sage Olive", hex: "#6F7B63" },
  { name: "Charcoal Espresso", hex: "#2E2C2A" },
];

const SEATING_CAPACITIES = [
  "Not Applicable (Beds / Storage)",
  "Single / 1-Seater",
  "2–3 Seater",
  "4-Seater",
  "5–6 Seater",
  "7+ / L-Shape / Office Multi-Unit",
];

const BUDGET_RANGES = [
  "₹15,000 – ₹30,000",
  "₹30,000 – ₹60,000",
  "₹60,000 – ₹1,00,000",
  "₹1,00,000+",
  "Prefer Showroom Quote",
];

interface CustomizationSectionProps {
  compact?: boolean;
}

export function CustomizationSection({ compact = false }: CustomizationSectionProps) {
  const openEnquiryModal = useStore((s) => s.openEnquiryModal);
  const pushToast = useStore((s) => s.pushToast);

  const [draft, setDraft] = useState<CustomizationDraft>({
    furnitureType: FURNITURE_TYPES[0],
    preferredColor: COLORS[0].name,
    material: MATERIALS[0],
    dimensions: "",
    seatingCapacity: SEATING_CAPACITIES[2],
    approximateBudget: BUDGET_RANGES[1],
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const summary = buildCustomizationEnquiryMessage(draft);
    pushToast({
      title: "Consultation summary prepared",
      description: "Review and share your custom preferences with our showroom.",
      variant: "success",
    });
    openEnquiryModal("Customization Consultation Request", summary);
  };

  return (
    <section
      id="customize"
      aria-label="Furniture Customization Consultation"
      className={compact ? "py-6" : "py-10 md:py-12 bg-ivory border-y border-beige/70"}
    >
      <div className="container-storefront">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Editorial Pitch */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-beige bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-terracotta">
              <Sliders className="h-3.5 w-3.5" />
              Consultation Request
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-[28px] font-semibold text-walnut leading-tight">
              Your Space. Your Style. Your Furniture.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Share your room dimensions, preferred wood finish, seating needs,
              and target budget to start a conversation with our Daba Gardens
              showroom team.
            </p>

            <ul className="mt-5 space-y-2.5 text-[13.5px] text-charcoal">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-terracotta shrink-0 mt-0.5" />
                <span>Discuss apartment-friendly dimensions before ordering</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-terracotta shrink-0 mt-0.5" />
                <span>Compare wood tones and upholstery fabrics in person</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-terracotta shrink-0 mt-0.5" />
                <span>Submitted as a consultation enquiry — feasibility confirmed at showroom</span>
              </li>
            </ul>

            {!compact && (
              <Link
                href="/customize"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:text-terracotta-hover"
              >
                <span>Open Full Customization Planner</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          {/* Right Interactive Builder Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 rounded-xl border border-beige bg-white p-5 sm:p-6 shadow-xs space-y-4"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="custom-type"
                  className="block text-xs font-semibold uppercase tracking-wide text-walnut mb-1.5"
                >
                  Furniture Type
                </label>
                <select
                  id="custom-type"
                  value={draft.furnitureType}
                  onChange={(e) =>
                    setDraft({ ...draft, furnitureType: e.target.value })
                  }
                  className="h-10 w-full rounded-md border border-beige bg-white px-3 text-sm text-charcoal focus:border-terracotta focus:outline-none"
                >
                  {FURNITURE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="custom-material"
                  className="block text-xs font-semibold uppercase tracking-wide text-walnut mb-1.5"
                >
                  Preferred Material / Finish
                </label>
                <select
                  id="custom-material"
                  value={draft.material}
                  onChange={(e) =>
                    setDraft({ ...draft, material: e.target.value })
                  }
                  className="h-10 w-full rounded-md border border-beige bg-white px-3 text-sm text-charcoal focus:border-terracotta focus:outline-none"
                >
                  {MATERIALS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold uppercase tracking-wide text-walnut mb-2">
                Preferred Color Tone:{" "}
                <strong className="text-terracotta">{draft.preferredColor}</strong>
              </span>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => {
                  const active = draft.preferredColor === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() =>
                        setDraft({ ...draft, preferredColor: c.name })
                      }
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                        active
                          ? "border-terracotta bg-ivory font-semibold text-walnut"
                          : "border-beige bg-white text-charcoal hover:border-walnut/50"
                      }`}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-black/15"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="custom-dimensions"
                  className="block text-xs font-semibold uppercase tracking-wide text-walnut mb-1.5"
                >
                  Approx. Dimensions
                </label>
                <input
                  id="custom-dimensions"
                  type="text"
                  value={draft.dimensions}
                  onChange={(e) =>
                    setDraft({ ...draft, dimensions: e.target.value })
                  }
                  placeholder="e.g. 7ft x 3ft"
                  className="h-10 w-full rounded-md border border-beige bg-white px-3 text-sm text-charcoal placeholder:text-muted/70 focus:border-terracotta focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="custom-capacity"
                  className="block text-xs font-semibold uppercase tracking-wide text-walnut mb-1.5"
                >
                  Seating / Capacity
                </label>
                <select
                  id="custom-capacity"
                  value={draft.seatingCapacity}
                  onChange={(e) =>
                    setDraft({ ...draft, seatingCapacity: e.target.value })
                  }
                  className="h-10 w-full rounded-md border border-beige bg-white px-3 text-sm text-charcoal focus:border-terracotta focus:outline-none"
                >
                  {SEATING_CAPACITIES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="custom-budget"
                  className="block text-xs font-semibold uppercase tracking-wide text-walnut mb-1.5"
                >
                  Approximate Budget
                </label>
                <select
                  id="custom-budget"
                  value={draft.approximateBudget}
                  onChange={(e) =>
                    setDraft({ ...draft, approximateBudget: e.target.value })
                  }
                  className="h-10 w-full rounded-md border border-beige bg-white px-3 text-sm text-charcoal focus:border-terracotta focus:outline-none"
                >
                  {BUDGET_RANGES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="custom-notes"
                className="block text-xs font-semibold uppercase tracking-wide text-walnut mb-1.5"
              >
                Room Notes (Optional)
              </label>
              <input
                id="custom-notes"
                type="text"
                value={draft.notes}
                onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
                placeholder="e.g. Lift width constraint, matching existing wardrobe finish..."
                className="h-10 w-full rounded-md border border-beige bg-white px-3 text-sm text-charcoal placeholder:text-muted/70 focus:border-terracotta focus:outline-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border-soft">
              <p className="text-[11.5px] text-muted">
                Consultation request only — our team confirms availability &amp; custom feasibility.
              </p>
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-terracotta px-5 py-2.5 text-sm font-semibold text-white hover:bg-terracotta-hover transition-colors"
              >
                <MessageSquarePlus className="h-4 w-4" />
                <span>Generate Enquiry Summary</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
