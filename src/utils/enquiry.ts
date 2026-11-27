import { businessConfig } from "@/config/business";
import type { CustomizationDraft, FurnitureProduct } from "@/types/furniture";

export function formatInrPrice(price: number | null): string {
  if (price === null || Number.isNaN(price)) {
    return "Request Price";
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function buildProductEnquiryMessage(
  product: FurnitureProduct,
  options?: { selectedColor?: string; quantity?: number }
): string {
  const qty = options?.quantity ?? 1;
  const color = options?.selectedColor || product.colors[0]?.name || "Standard Finish";
  return [
    `Hello ${businessConfig.brandName} Team (Daba Gardens, Visakhapatnam),`,
    `I would like to enquire about the following furniture piece:`,
    `- Product: ${product.name}`,
    `- Category: ${product.subcategory}`,
    `- Preferred Finish/Color: ${color}`,
    `- Quantity: ${qty}`,
    product.material ? `- Listed Material: ${product.material}` : null,
    product.isDemo 
      ? `- Note: Enquiring from the online demonstration catalogue; please share showroom availability and pricing.`
      : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildBasketEnquiryMessage(
  items: { product: FurnitureProduct; quantity: number; selectedColor: string }[]
): string {
  const lines = [
    `Hello ${businessConfig.brandName} Team (Daba Gardens, Visakhapatnam),`,
    `I would like pricing and showroom availability for the items in my enquiry basket:`,
    "",
  ];
  items.forEach((item, index) => {
    lines.push(
      `${index + 1}. ${item.product.name} (${item.selectedColor}) — Qty: ${item.quantity}`
    );
  });
  lines.push("", "Please share showroom pricing and consultation availability.");
  return lines.join("\n");
}

export function buildCustomizationEnquiryMessage(draft: CustomizationDraft): string {
  return [
    `Hello ${businessConfig.brandName} Team (Daba Gardens, Visakhapatnam),`,
    `I would like to request a customization consultation with the following preferences:`,
    `- Furniture Type: ${draft.furnitureType || "Not specified"}`,
    `- Preferred Material: ${draft.material || "Not specified"}`,
    `- Preferred Color / Finish: ${draft.preferredColor || "Not specified"}`,
    `- Desired Dimensions: ${draft.dimensions || "Standard / To be discussed"}`,
    `- Seating / Capacity: ${draft.seatingCapacity || "Standard"}`,
    `- Approximate Budget: ${draft.approximateBudget || "Flexible / Request quote"}`,
    draft.notes ? `- Additional Notes: ${draft.notes}` : null,
    "",
    `Note: Submitted as a consultation request to explore suitable options at the Daba Gardens showroom.`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function getVerifiedWhatsappUrl(message: string): string | null {
  if (
    !businessConfig.verification.isWhatsappVerified ||
    !businessConfig.contact.whatsappNumber
  ) {
    return null;
  }
  const cleanDigits = businessConfig.contact.whatsappNumber.replace(/\D/g, "");
  if (!cleanDigits) return null;
  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(message)}`;
}

export function getVerifiedTelUrl(): string | null {
  if (!businessConfig.verification.isPhoneVerified || !businessConfig.contact.phone) {
    return null;
  }
  return `tel:${businessConfig.contact.phone.replace(/\s+/g, "")}`;
}
