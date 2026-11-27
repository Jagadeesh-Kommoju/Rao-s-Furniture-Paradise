"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Copy, Check, MapPin, MessageCircle, AlertCircle } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { businessConfig } from "@/config/business";
import { getVerifiedWhatsappUrl } from "@/utils/enquiry";

export function EnquiryModal() {
  const title = useStore((s) => s.activeEnquiryModalTitle);
  const message = useStore((s) => s.activeEnquiryModalMessage);
  const closeModal = useStore((s) => s.closeEnquiryModal);
  const pushToast = useStore((s) => s.pushToast);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (message) {
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [message, closeModal]);

  if (!message) return null;

  const whatsappUrl = getVerifiedWhatsappUrl(message);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      pushToast({
        title: "Enquiry summary copied",
        description: "Ready to share with the Daba Gardens showroom team.",
        variant: "success",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      pushToast({
        title: "Copy failed",
        description: "Please select and copy the summary text manually.",
        variant: "info",
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-[75] flex items-center justify-center bg-black/55 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="w-full max-w-lg rounded-xl border border-beige bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-border-soft bg-ivory px-5 py-4">
          <div>
            <h2
              id="enquiry-modal-title"
              className="font-display text-lg font-semibold text-walnut"
            >
              {title || "Showroom Product Enquiry"}
            </h2>
            <p className="text-xs text-muted mt-0.5">
              {businessConfig.brandName} — {businessConfig.location.locality},{" "}
              {businessConfig.location.city}
            </p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close enquiry modal"
            className="rounded-lg p-1.5 text-muted hover:bg-beige/50 hover:text-charcoal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="rounded-lg border border-border-soft bg-[#FAF9F7] p-3.5">
            <label
              htmlFor="enquiry-summary-textarea"
              className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2"
            >
              Prepared Enquiry Summary
            </label>
            <textarea
              id="enquiry-summary-textarea"
              readOnly
              rows={7}
              value={message}
              className="w-full resize-none rounded border border-border-soft bg-white p-2.5 text-xs leading-relaxed text-charcoal focus:outline-none"
            />
          </div>

          {!whatsappUrl && (
            <div className="flex items-start gap-2.5 rounded-lg border border-terracotta/30 bg-ivory p-3 text-xs text-walnut">
              <AlertCircle className="h-4 w-4 shrink-0 text-terracotta mt-0.5" />
              <p>
                <strong>Demonstration Mode Notice:</strong> Direct WhatsApp
                dispatch is activated once the client confirms their official
                business number in{" "}
                <code className="text-[11px] bg-white px-1 py-0.5 rounded border border-beige">
                  src/config/business.ts
                </code>
                . You can copy this formatted summary or visit our Daba Gardens
                showroom directly.
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-md bg-walnut px-4 py-2.5 text-sm font-medium text-white hover:bg-walnut-dark transition-colors"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span>{copied ? "Copied Summary" : "Copy Enquiry Summary"}</span>
            </button>

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-terracotta px-4 py-2.5 text-sm font-medium text-white hover:bg-terracotta-hover transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Send via WhatsApp</span>
              </a>
            ) : (
              <a
                href={businessConfig.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-terracotta bg-white px-4 py-2.5 text-sm font-medium text-terracotta hover:bg-ivory transition-colors"
              >
                <MapPin className="h-4 w-4" />
                <span>Get Showroom Directions</span>
              </a>
            )}

            <Link
              href="/cart"
              onClick={closeModal}
              className="ml-auto text-xs font-medium text-walnut underline underline-offset-2 hover:text-terracotta"
            >
              View Enquiry Basket
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
