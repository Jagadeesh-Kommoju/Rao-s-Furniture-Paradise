"use client";

import { useState } from "react";
import { MapPin, Navigation, Send } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { businessConfig } from "@/config/business";
import { useStore } from "@/stores/useStore";

export default function ContactPage() {
  const openEnquiryModal = useStore((s) => s.openEnquiryModal);
  const pushToast = useStore((s) => s.pushToast);

  const [name, setName] = useState("");
  const [locality, setLocality] = useState("Visakhapatnam");
  const [enquiryType, setEnquiryType] = useState("Home Furniture Enquiry");
  const [details, setDetails] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      `Hello ${businessConfig.brandName} Team (Daba Gardens, Visakhapatnam),`,
      `Name: ${name || "Visitor"}`,
      `Area / City: ${locality}`,
      `Enquiry Type: ${enquiryType}`,
      `Message: ${details || "Requesting showroom consultation and product information."}`,
    ].join("\n");

    pushToast({
      title: "Enquiry summary generated",
      description: "Ready to copy or share with our showroom team.",
      variant: "success",
    });
    openEnquiryModal(enquiryType, message);
  };

  return (
    <main>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />
      <div className="container-storefront py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-5">
            <h1 className="font-display text-3xl font-semibold text-walnut">
              Contact {businessConfig.brandName}
            </h1>
            <p className="text-sm text-muted leading-relaxed">
              Have a question about sofa sets, bedroom furniture, dining
              tables, or bulk office chairs in Visakhapatnam? Prepare an
              enquiry below or visit our Daba Gardens showroom.
            </p>

            <div className="rounded-xl border border-beige bg-ivory p-5 space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-5 w-5 text-terracotta shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-walnut">Showroom Location</p>
                  <p className="text-muted mt-0.5 leading-relaxed">
                    {businessConfig.location.fullAddress}
                  </p>
                </div>
              </div>
              {!businessConfig.verification.isPhoneVerified && (
                <p className="text-xs text-muted border-t border-beige pt-3">
                  {businessConfig.contact.pendingConfirmationNote}
                </p>
              )}
              <a
                href={businessConfig.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-walnut px-4 py-2 text-xs font-semibold text-white hover:bg-walnut-dark transition-colors"
              >
                <Navigation className="h-3.5 w-3.5" />
                <span>Open Google Maps Directions</span>
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 rounded-xl border border-beige bg-white p-6 space-y-4 shadow-2xs"
          >
            <h2 className="font-display text-xl font-semibold text-walnut">
              Prepare Showroom or Bulk Enquiry
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold uppercase tracking-wide text-walnut mb-1.5"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="h-10 w-full rounded-md border border-beige px-3 text-sm focus:border-terracotta focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-area"
                  className="block text-xs font-semibold uppercase tracking-wide text-walnut mb-1.5"
                >
                  Locality / Area
                </label>
                <input
                  id="contact-area"
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="e.g. Daba Gardens, MVP Colony"
                  className="h-10 w-full rounded-md border border-beige px-3 text-sm focus:border-terracotta focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-type"
                className="block text-xs font-semibold uppercase tracking-wide text-walnut mb-1.5"
              >
                Enquiry Purpose
              </label>
              <select
                id="contact-type"
                value={enquiryType}
                onChange={(e) => setEnquiryType(e.target.value)}
                className="h-10 w-full rounded-md border border-beige bg-white px-3 text-sm focus:border-terracotta focus:outline-none"
              >
                <option value="Home Furniture Enquiry">Home Furniture Enquiry</option>
                <option value="Office & Bulk Furniture Enquiry">
                  Office &amp; Bulk Furniture Enquiry
                </option>
                <option value="Showroom Visit Appointment">
                  Showroom Visit Appointment
                </option>
                <option value="Custom Size / Finish Consultation">
                  Custom Size / Finish Consultation
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-details"
                className="block text-xs font-semibold uppercase tracking-wide text-walnut mb-1.5"
              >
                Requirement Details
              </label>
              <textarea
                id="contact-details"
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Share furniture items, quantities, room dimensions, or preferred visit time..."
                className="w-full rounded-md border border-beige p-3 text-sm focus:border-terracotta focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-terracotta px-5 py-2.5 text-sm font-semibold text-white hover:bg-terracotta-hover transition-colors"
            >
              <Send className="h-4 w-4" />
              <span>Generate Enquiry Summary</span>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
