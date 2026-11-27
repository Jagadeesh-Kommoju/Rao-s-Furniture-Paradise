# Reference Website Analysis — WoodenStreet Visakhapatnam

**Primary Reference URL:** `https://www.woodenstreet.com/furniture-in-visakhapatnam`  
**Analysis Tooling:** REA MCP (`rea-agents@6.10.1` via `capture_browser_scenario` + `inspect_analysis_view`) and Chromium/Playwright multi-viewport DOM & screenshot inspection (`1920x1080`, `1440x900`, `1280x800`, `1024x768`, `768x1024`, `390x844`, `360x800`).  
**Date Observed:** 2026-11-27

---

## 1. Observed Technical Architecture & Performance Notes

- **Framework Signals (Observed via REA DOM inspection):** Next.js application (`meta[name="next-head-count"]`, preloaded `.woff2` fonts).
- **Fonts Observed:**
  - Headings (`H1`, `H2`): `red_hat_displayregular` (paired with `pangram-regular` / `pangram-medium` preloads).
  - Body / UI text: `robotoregular, Arial, Helvetica, sans-serif` (`14px` base).
- **Observed Accessibility & Structure Highlights:**
  - Clean `<banner>` header + `<main>` + multi-column `<footer>` landmark hierarchy.
  - JSON-LD structured data for `BreadcrumbList`, `FAQPage`, and `Organization`.
  - Lazy-loaded/viewport-triggered room product carousels lower down the page.

---

## 2. Visual Measurements & Design Tokens (Observed at 1440×900)

| Element / Property | Observed Value (WoodenStreet) | Rao's Adaptation Decision |
| :--- | :--- | :--- |
| **Page Canvas Background** | `#FFFFFF` (`rgb(255, 255, 255)`) | `#FFFFFF` with Ivory (`#FAF7F2`) alternate sections |
| **Secondary Neutral Strip** | `#F5F5F5` / `#F3F4F6` | `#FAF7F2` (Ivory) & `#E9DED0` (Warm Beige) borders |
| **Primary Brand Accent** | Warm orange-terracotta (`#E27A3F` / `#E57200`) | Accent Terracotta (`#B5683C`) + Primary Walnut (`#4A3025`) |
| **Primary Ink** | `#333333` / `#0A0A0A` | Charcoal (`#242424`) |
| **Main Content Container** | `max-width: 1240px` centered | `max-width: 1240px` (`container-storefront`) |
| **Top Utility Bar Height** | `51px` | `~36px–44px` clean single-line utility bar on desktop |
| **Main Header + Nav Height** | `139px` (Logo/Search/Actions + Category Nav Bar) | `~128px` total (clean Logo + Search + Actions + Category Bar) |
| **Search Input Width & Style** | `~456px` input + icon button, white fill, crisp subtle border | Prominent centered search bar (`460px–520px`), keyboard-navigable dropdown |
| **Breadcrumb Height** | `32px`, `12px` muted gray links | Matches compact `32px` row above hero |
| **Hero Banner Dimensions** | `1240px × 399px` (~`3.1:1` aspect ratio) | `1240px` max-width landscape split/editorial banner (`~400px` desktop height) |
| **H1 Typography** | Desktop `28px` / `32px` lh, weight `400`; Mobile `18px` | Clean editorial H1 (`28px–32px` desktop, `22px` mobile) |
| **H2 Typography** | `20px` / `25px` lh, weight `400` | `22px–24px` semibold/medium Charcoal |
| **Category Grid Tiles** | `6 columns × 2 rows` (desktop), `1:1` square cards (`~193×193px`), `6px` radius, centered uppercase/title text below | Match 6×2 desktop grid, 4-col tablet, and 2-row horizontal-scroll / 2-col mobile grid |
| **Room Showcase Bento** | Asymmetric 2-col layout: 1 large vertical hero tile (left ~48%) + 2×2 grid of 4 square subcategory tiles (right ~52%) with dark bottom scrim & circular arrow | Reconstruct exact asymmetric 1+4 room bento pattern for all 5 room groups |
| **Product Card Proportions** | Horizontal carousel (~4.2 cards visible on `1240px`), `~280px` width, `1:1`–`4:3` image, top-right heart wishlist icon, 2-line title, price | Preserve card density & aspect ratio; replace fake ratings/strike-through discounts with Material, Color dots, Price / "Request Price", and Enquiry CTA |
| **FAQ Section** | Centered tracked uppercase heading + short accent underline + bordered card container (`rounded-lg`) with `+` toggle rows | Match exact centered tracked header + bordered accordion container |
| **Footer** | Light `#F5F5F5` multi-column (`5` link columns + trust/payment/location bars + SEO About/Why Choose Us + city links) | Warm `#FAF7F2` / `#F3F1ED` multi-column footer with KLYVA configurable developer credit |

---

## 3. Section-by-Section Ordering (Top to Bottom)

1. **Top Utility Bar:** Left (`Furniture | Home Interiors | Bulk Order`) — Right (Phone | Franchise | Track | Help). *Adapted to Rao's verified links only.*
2. **Main Header:** Brand logo left, wide search bar center, right icon+label actions (`Stores`/`Showroom`, `Profile`, `Wishlist (0)`, `Cart`/`Enquiry (0)`).
3. **Sticky Category Navigation Bar:** 11 horizontal category links (`Sofas`, `Living`, `Bedroom`, `Mattress`, `Dining`, `Storage`, `Study & Office`, `Outdoor`, `Decor & Furnishing`, `New Arrivals`) with hover mega-menus on desktop; sticks to top on scroll.
4. **Breadcrumb Strip:** `Home / Furniture / Furniture in Visakhapatnam`.
5. **Hero Banner:** Contained `1240px` landscape banner with left editorial message + CTA and right warm interior room visual. *(WoodenStreet's fake "UPTO 50% OFF" & countdown timer intentionally excluded.)*
6. **Trust / Value Proposition Strip:** Contained neutral box (`120px` desktop height) with icon-badge items. *(WoodenStreet's "Sale Ends In" + "20 Lakh+" replaced with Rao's verified showroom value points.)*
7. **H1 City Intro (`Furniture in Visakhapatnam`):** Centered heading + concise intro paragraph + `More` / `Less` toggle.
8. **Category Filter Tabs + Visual Category Grid:** Rounded pill tabs (`All`, `Living`, `Bedroom`, `Dining`, `Study & Office`, `Decor`) dynamically filtering a 12-tile visual category grid.
9. **Promotional / Highlight Carousel ("Curated Highlights"):** Full-bleed soft gray (`#F5F5F5`) band with horizontal showcase cards + secondary promotional banner (`Transform Your Home with Timeless Furniture`).
10. **Room-Wise Furniture Sections (5 Blocks):**
    - `Living Room Furniture` (1+4 bento showcase + `Featured Living Room Products` carousel)
    - `Bedroom Furniture` (1+4 bento showcase + `Featured Bedroom Products` carousel)
    - `Dining Room Furniture` (1+4 bento showcase + `Featured Dining Room Products` carousel)
    - `Study & Office Furniture` (1+4 bento showcase + `Featured Study & Office Products` carousel)
    - `Complete Your Space` / Home Decor (showcase + `Featured Home Decor Products` carousel)
11. **Rao's Proposed Client Enhancements (Integrated Cleanly Below Room Showcases):**
    - **Furniture Customization Builder** (`"Your Space. Your Style. Your Furniture."`)
    - **Shop the Look Interactive Room Hotspots** (`Modern Living Room`, `Elegant Bedroom`, `Contemporary Dining Room`)
    - **About Rao's Furniture Paradise** & **Experience Furniture in Person (Daba Gardens Showroom & Map)**
    - **Customer Reviews** *(Hidden until verified client testimonials exist)*
12. **Local SEO Editorial Section:** Structured H2 + H3 guide covering Visakhapatnam homes, room choices, compact apartments, and visiting a physical showroom.
13. **FAQ Accordion:** 8 factual questions about Rao's Daba Gardens showroom, pricing enquiries, customization consultations, and office enquiries.
14. **Floating Back-to-Top Button + Multi-Column Footer:** 5 columns, verified address, KLYVA developer credit.

---

## 4. Responsive Breakpoint & Defect Observations (From 7 Viewports)

| Viewport | Observed Scroll Width | Reference Behavior | Defects Found in Reference (To Fix in Reconstruction) |
| :--- | :--- | :--- | :--- |
| `1920×1080` | `1920` (no overflow) | `1240px` centered container with generous margins; 6-col category grid | Promo modal interrupts browsing after ~30s |
| `1440×900` | `1440` (no overflow) | Full utility bar, search, 11 nav links, hero + value strip above fold | Same promo modal overlay |
| `1280×800` | `1280` (no overflow) | Identical `1240px` layout tightened slightly | Clean fit |
| `1024×768` | `1024` (no overflow) | Header fits; value strip cards crowd slightly | **Observed Defect:** EMI logos overlap trust strip icon on WoodenStreet at `1024px` |
| `768×1024` | `768` (no overflow) | WoodenStreet keeps squeezed desktop header & nav links | **Observed Defect:** Search box shrinks narrow (`~160px`) & EMI text collides with icon strip |
| `390×844` | `390` (no overflow) | Single-col mobile layout, 4-across horizontal 2-row category strip, stacked trust strip, 2-col product grids | **Observed Defect:** Sticky mobile header disappears on scroll-up; promo modal dims background |
| `360×800` | `360` (no overflow) | Compact 2-row scrolling category strip (`156px` cards) | Same header visibility & modal overlay issues |

**Reconstruction Rule:** Keep WoodenStreet's exact section cadence, 1240px container width, bento showcase geometry, and card density on desktop while eliminating WoodenStreet's `768px–1024px` overlap, annoying promo popups, fake discounts/timers, and sticky mobile header issues.
