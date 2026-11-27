# Client Research — Rao's Furniture Paradise

**Prepared by:** LogiDev  
**Date:** 2026-11-27  
**Project Scope:** Phase 1 — Frontend Storefront Reconstruction (Digital Showroom )  
**Verification Policy:** All public directory facts are treated as **provisional** until directly confirmed by the client. Unverified figures (counts, ratings, warranty periods, prices, hours, phone numbers) are gated behind configuration flags in `src/config/business.ts` and never fabricated or presented as verified guarantees on the storefront.

---

## 1. Business Overview & Known Core Details

| Field                              | Value                                                                                                               | Source(s)                                                                            | Verification Status                                                                                                           |
| :--------------------------------- | :------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| **Official Business Name**         | Rao's Furniture Paradise                                                                                            | Client Brief, TradeIndia, IndiaMART, Justdial, IDBF                                  | **Confirmed (Client Brief)**                                                                                                  |
| **Showroom Address**               | Dr. No. 30-15-171, Prasantharama Mansion, Near Saraswati Park, Daba Gardens, Visakhapatnam, Andhra Pradesh — 530020 | Client Brief, IDBF, TringCity, Vyaparify                                             | **Confirmed (Address & Pin)**                                                                                                 |
| **Map Coordinates**                | `17.7143612, 83.3009386` ([Google Maps](https://www.google.com/maps/search/?api=1&query=17.7143612,83.3009386))     | Client Brief                                                                         | **Confirmed (Client Brief)**                                                                                                  |
| **Industry / Business Type**       | Home and Office Furniture (Retail, Supply, Trading & Manufacturing)                                                 | Client Brief, TradeIndia, IndiaMART, Justdial                                        | **Provisional** (manufacturing scope pending client confirmation)                                                             |
| **Establishment Year**             | Listed as **1990** on TradeIndia; listed as **2005** on some Justdial directory snippets                            | [TradeIndia](https://www.tradeindia.com/rao-s-furniture-paradise-2444108/), Justdial | **Unverified / Conflicting** — must NOT display "Established in 1990" until client confirms                                   |
| **Key Contact / Partner**          | Listed as Rajesh Kumar (Partner) on TradeIndia                                                                      | TradeIndia                                                                           | **Provisional / Unverified**                                                                                                  |
| **Phone Number**                   | Listed as `+91 9030603032` / `+91 90306 03032` on third-party directories (IDBF, TringCity, Justdial)               | IDBF, TringCity, Justdial                                                            | **Provisional / Unverified** — direct `tel:` / `wa.me` actions must remain gated until client confirms active business number |
| **Operating Hours**                | Directory estimates: Mon–Sat ~10:15 AM – 8:45 PM (some list 9:30 AM open), Sun ~10:30 AM – 6:00 PM                  | Justdial, Nibz                                                                       | **Provisional / Unverified** — omit live hours until confirmed                                                                |
| **Email / Official Domain**        | Not found in public listings                                                                                        | Public Search                                                                        | **Pending Client Input**                                                                                                      |
| **Official Social Media Profiles** | None verified as official client-owned accounts                                                                     | Public Search                                                                        | **Pending Client Input**                                                                                                      |

---

## 2. Public Directory Sources Consulted

1. **Google Maps Location (Client Brief):**  
   `https://www.google.com/maps/search/?api=1&query=17.7143612,83.3009386`
2. **TradeIndia Profile:**  
   `https://www.tradeindia.com/rao-s-furniture-paradise-2444108/`  
   _Notes:_ Lists establishment year 1990, Daba Gardens Visakhapatnam (530020), business type Manufacturer & Supplier, Partner Rajesh Kumar. Also contains legacy/cross-category catalog tags (apparel/uniforms/bags alongside general listings), reinforcing why client confirmation is essential before surfacing directory facts.
3. **IndiaMART / ExportersIndia / IDBF / TringCity / Vyaparify / Wheree / Justdial Search Summaries:**  
   _Notes:_ Local business directories consistently place Rao's Furniture Paradise on Daba Garden Road near Saraswati Park / Saraswati Junction, Allipuram / Daba Gardens, Visakhapatnam — 530020, highlighting home & office furniture retail and supply.

---

## 3. Furniture Categories & Offerings Observed in Public Sources

| Category            | Publicly Listed Items                                       | Verification Status                                        |
| :------------------ | :---------------------------------------------------------- | :--------------------------------------------------------- |
| **Living Room**     | Wooden sofa sets, designer sofas, recliners, easy chairs    | Provisional ( nstration catalog required for Phase 1)      |
| **Bedroom**         | Beds, double beds, wooden beds, dressing tables, wardrobes  | Provisional (beds & dressing tables noted in brief; rest ) |
| **Dining Room**     | Dining table sets (wooden and marble variants)              | Provisional ( nstration catalog)                           |
| **Study & Office**  | Executive chairs, office chairs, study tables, office desks | Provisional (executive chairs noted in brief; rest )       |
| **Storage & Other** | Wardrobes, storage cabinets, utility seating                | Provisional ( nstration catalog)                           |

---

## 4. Product Photographs, Customization, Delivery & Reviews Status

- **Product Photographs:** No official client-owned product photo archive is currently available in the workspace. Phase 1 uses original local illustrative furniture assets stored under `public/images/` and explicitly marks nstration catalog items and imagery as illustrative.
- **Customization Capabilities:** Not yet formally verified by the client. The homepage customization module (`"Your Space. Your Style. Your Furniture."`) and `/customize` route are strictly framed as a **consultation request / enquiry summary**, never a guarantee that every finish or dimension is offered.
- **Delivery & Installation Services:** No verified city-wide delivery fee schedule, timeline, or installation promise is confirmed yet. Storefront avoids fabricated "free shipping in X days" or "10-year warranty" claims.
- **Customer Reviews & Ratings:** Third-party directories show user ratings (e.g., ~4.x/5 on Justdial), but no directly verified, client-approved attributable testimonials are available. Per Phase 1 rules, the customer reviews section is **hidden** when verified client-approved reviews are unavailable (`verifiedReviews: []`).

---

## 5. Local SEO Keywords (Visakhapatnam / Vizag)

- Furniture in Visakhapatnam
- Furniture stores in Vizag
- Furniture showroom in Vizag
- Furniture shop in Daba Gardens
- Sofa sets in Visakhapatnam
- Bedroom furniture in Vizag
- Dining tables in Vizag
- Office furniture in Visakhapatnam
- Furniture near Saraswati Park
- Rao's Furniture Paradise

---

## 6. Pending Client Information Checklist (Before Production Launch)

1. Official vector/high-res brand logo (temporary sophisticated wordmark used in Phase 1).
2. Confirmed active showroom phone number(s) & official WhatsApp Business number.
3. Confirmed showroom operating hours (Monday–Saturday and Sunday schedule).
4. Confirmation of establishment year (`1990` vs `2005`) and business history copy.
5. Authentic showroom interior/exterior photographs and real SKU photography.
6. Actual SKU catalog, pricing / "Request Price" policy, stock availability, and finish options.
7. Confirmed delivery zones, lead times, installation terms, and warranty terms (if any).
8. Client-approved customer testimonials (with permission and attribution) if reviews section is to be enabled.
9. Official Instagram / Facebook / social URLs and official contact email address.
10. Production domain name for canonical URLs, `sitemap.xml`, and `robots.txt`.
