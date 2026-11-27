# Client Readiness & Phase 2 Handover Checklist

**Project:** Rao's Furniture Paradise Website — Phase 1 (Frontend)  
**Showroom Address (Verified Location):** Dr. No. 30-15-171, Prasantharama Mansion, Near Saraswati Park, Daba Gardens, Visakhapatnam, Andhra Pradesh — 530020 (`17.7143612, 83.3009386`)  
**Phase Status:** Production-ready static/client-rendered Next.js 15 storefront ready for client data review & demonstration.

---

## 1. What Is Production-Ready Now

- **Complete WoodenStreet-Aligned Layout Structure & Navigation:** 11-category hover mega-menu, sticky desktop/tablet category navigation bar, live instant search with recent/trending suggestions and keyboard navigation, breadcrumb trail, responsive split hero banner, dual-card trust strip, tabbed category explorer, highlights strip, 1+4 room bento showcases (`Living`, `Bedroom`, `Dining`, `Study & Office`, `Decor`), 4-up product carousels with color swatches and wishlist/compare/enquiry controls, interactive room hotspot viewer (`/shop-the-look`), customization enquiry form (`/customize`), Local Visakhapatnam SEO guide, FAQ accordion with JSON-LD, and complete multi-column footer.
- **Full Functional Phase 1 Experience:**
  - Persistent browser state (`localStorage` via Zustand) for Saved Wishlist, Enquiry Basket (`+`/`-` quantity, finish selector), Compare drawer/bar (up to 3 items), and Recent Searches.
  - Pre-formatted structured Enquiry Summaries copyable to clipboard / shareable at the showroom without requiring a backend database or payment gateway.
- **Strict Verification & Compliance Guardrails (`src/config/business.ts`):**
  - No fabricated customer reviews (`CustomerReviewsSection` cleanly remains hidden until verified testimonials are provided).
  - No unverified phone (`tel:`), WhatsApp (`wa.me`), operating hours, email addresses, or conflicting establishment dates (`1990` vs `2005`) rendered anywhere on the live DOM.
  - All Phase 1 sample catalogue items carry clear indicative demo labeling and `noindex` robot metadata until real SKUs replace preview entries.

---

## 2. Client Sign-Off Needed Before Going Live (Single Config Edit in `src/config/business.ts`)

| # | Verification Item | Current Code State | Action Required Before Production Go-Live |
| :---: | :--- | :--- | :--- |
| **1** | **Showroom Phone Number** | `isPhoneVerified: false`, `phone: null` | Confirm exact active showroom number; populate `contact.phone` & set `isPhoneVerified: true` |
| **2** | **WhatsApp Business Number** | `isWhatsappVerified: false`, `whatsappNumber: null` | Confirm official WhatsApp enquiry number so direct `wa.me` enquiry dispatch activates automatically |
| **3** | **Opening Hours** | `isHoursVerified: false`, `hours: null` | Confirm weekday & Sunday showroom timings with management |
| **4** | **Established Year** | `isEstablishedYearVerified: false`, `establishedYear: null` | Reconcile TradeIndia (`1990`) vs Justdial (`2005`) public directory conflict with client owner |
| **5** | **Official Email & Social Links** | `email: null`, `socialLinks.*: null` | Add official business email, Instagram, and Facebook URLs and toggle verified flags |
| **6** | **Real Product Catalogue & Photography** | 42 illustrative local Phase 1 entries (`isDemo: true`) | Replace placeholder SKUs, dimensions, finishes, INR prices, and photos (`public/images/products/`) with authentic showroom stock & photography; toggle `isCatalogueClientApproved: true` |
| **7** | **Verified Google / Showroom Reviews** | `verifiedReviews: []`, `isReviewsVerified: false` | Import real customer testimonials with consent and set `isReviewsVerified: true` |
| **8** | **Domain & Agency Attribution** | `NEXT_PUBLIC_SITE_URL` (`https://raosfurnitureparadise.in`); footer credit currently `LogiDev` in `business.ts` | Confirm production domain DNS (`robots.txt` / `sitemap.xml` use this URL) and confirm final footer credit wording (`LogiDev` vs `KLYVA Technologies`) |

---

## 3. Recommended Phase 2 Expansion Roadmap

- **Backend CMS / Catalogue Admin:** Connect Prisma/PostgreSQL or headless CMS (Sanity / Strapi / Supabase) to manage live product inventory, custom timber finishes, and INR prices.
- **Lead & CRM Integration:** Route Customization Consultation and Enquiry Basket submissions via verified email/WhatsApp Cloud API webhook directly to the Daba Gardens sales desk.
- **Authenticated Accounts & Order Tracking:** Activate the Profile portal for saved room quotes, architectural invoices, and delivery scheduling across Visakhapatnam and coastal Andhra Pradesh.
