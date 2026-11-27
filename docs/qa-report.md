# Quality Assurance & Visual Verification Report

**Project:** Rao's Furniture Paradise — Visakhapatnam Storefront (Phase 1)  
**Prepared by:** LogiDev  
**Date:** 2026-11-27  
**Verification Scope:** Production Next.js build (`15.5.29`), TypeScript strict checking, ESLint, Playwright E2E + 7-viewport visual/responsive tests, and REA accessibility/scenario verification against local build (`http://127.0.0.1:3000`).

---

## 1. Automated Verification Results

| Check                         | Command / Tool                       | Result                          | Notes                                                                                                                                                                                                                                                                                                                                                     |
| :---------------------------- | :----------------------------------- | :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **TypeScript Check**          | `npm run typecheck` (`tsc --noEmit`) | **PASS (0 errors)**             | Strict mode enabled (`"strict": true`)                                                                                                                                                                                                                                                                                                                    |
| **ESLint**                    | `npm run lint` (`eslint .`)          | **PASS (0 errors, 0 warnings)** | Resolved combobox `aria-expanded` warning in `MainHeader.tsx`                                                                                                                                                                                                                                                                                             |
| **Production Build**          | `npm run build`                      | **PASS (78/78 routes)**         | Compiled in `2.7s`; Shared JS `103 kB`; Home first-load `174 kB`                                                                                                                                                                                                                                                                                          |
| **Route & Asset Audit**       | `tests/storefront.spec.ts` (Test 1)  | **PASS (19/19 routes)**         | Verified HTTP < 400, zero uncaught page/console errors, zero `naturalWidth === 0` images across `/`, `/furniture-in-visakhapatnam`, `/collections`, `/collections/[category]`, `/products/[slug]`, `/search`, `/wishlist`, `/cart`, `/customize`, `/shop-the-look`, `/about`, `/showroom`, `/contact`, `/faq`, `/privacy-policy`, `/terms-and-conditions` |
| **Factual Guardrails**        | `tests/storefront.spec.ts` (Test 2)  | **PASS**                        | Verified absence of `"20 Lakh+"`, `"UPTO 50% OFF"`, `"Sale Ends In"`, `"Established in 1990"`, and unverified `tel:` / `wa.me` links                                                                                                                                                                                                                      |
| **7-Viewport Layout**         | `tests/storefront.spec.ts` (Test 3)  | **PASS (7/7 viewports)**        | Zero horizontal overflow (`scrollWidth <= innerWidth`) verified at `1920×1080`, `1440×900`, `1280×800`, `1024×768`, `768×1024`, `390×844`, `360×800`                                                                                                                                                                                                      |
| **Interactive Flows**         | `tests/storefront.spec.ts` (Test 4)  | **PASS**                        | Verified `Read More`/`Read Less`, category tab filtering, mega-menu hover, live search suggestions & submission, PDP Wishlist & Enquiry Basket persistence across reload, quantity increment on `/cart`, customization enquiry modal, FAQ accordion, and mobile navigation drawer (`390×844`)                                                             |
| **REA Scenario Verification** | `rea` (`capture_browser_scenario`)   | **PASS**                        | Verified landmark hierarchy, `Bedroom` tab filter, and `Read More` expansion on `http://127.0.0.1:3000/furniture-in-visakhapatnam`                                                                                                                                                                                                                        |

---

## 2. Core Web Vitals & Timing Measurements (Observed on Local Production Server, `1440×900`)

Measured via Chromium `PerformanceObserver` against `http://127.0.0.1:3000/furniture-in-visakhapatnam`:

- **LCP (Largest Contentful Paint):** `816 ms` (`0.816s`, within `<= 2.5s` target)
- **CLS (Cumulative Layout Shift):** `0.0006` (within `<= 0.1` target)
- **DOMContentLoaded:** `46 ms`
- **Load Event End:** `212 ms`

_(Note: Formal Lighthouse CLI audit was not executed because `lighthouse` is not installed globally in this environment; lab scores and INP under throttled network conditions remain pending Lighthouse execution.)_

---

## 3. Defects Found & Fixed During Visual & Browser QA

1. **Next.js Metadata Route Loader Apostrophe Issue (`next-metadata-route-loader.js`):**
   - _Symptom:_ `src/app/robots.ts`, `src/app/sitemap.ts`, and `src/app/icon.svg` triggered a webpack syntax error because Next.js 15's internal loader embeds the directory path (`Rao's Furniture Paradise`) into a single-quoted string without escaping `'`.
   - _Fix:_ Implemented standard static/route handlers (`src/app/robots.txt/route.ts`, `src/app/sitemap.xml/route.ts`, `src/app/favicon.ico/route.ts`, and `public/icon.svg`), preserving full `/robots.txt`, `/sitemap.xml`, and favicon support cleanly.
2. **1024px Horizontal Nav Overflow (`1029px` vs `1024px`):**
   - _Symptom:_ At `1024×768`, the 10-item `CategoryNavBar` with chevrons overflowed by `5px`.
   - _Fix:_ Adjusted `CategoryNavBar.tsx` typography (`text-[12px] xl:text-[13.5px]`), spacing (`gap-1 xl:gap-2`), and hid dropdown chevrons below `1280px` (`hidden xl:inline-block`). Verified `scrollWidth <= 1024` cleanly.
3. **768px Tablet Search Bar Squeeze:**
   - _Symptom:_ Visual review of `local-768x1024-fold.png` showed the inline header search box squeezed between the logo and right action labels.
   - _Fix:_ Moved the inline search bar breakpoint to `lg:` (`>= 1024px`) and kept the spacious full-width search row below the top bar for `< lg` (`768px` tablet and mobile). Verified in refreshed `local-768x1024-fold.png`.
4. **390px / 360px Mobile Header Overflow (`475px` vs `390px`):**
   - _Symptom:_ Full logo tagline plus `"Wishlist (0)"` and `"Enquiry (0)"` text labels pushed the header row past `390px`.
   - _Fix:_ Made `BrandLogo` compact (`text-[15px]`, hidden tagline `< 640px`, `min-w-0 truncate`), allowed flexible shrinking on the left container, and displayed compact count badges over Heart/Bag icons on `< 640px`. Verified zero horizontal overflow on both `390×844` and `360×800`.
5. **Studio Cutout Product Framing:**
   - _Symptom:_ Visual review showed tall studio-isolated decor items (`Amber Linen Shade Table Lamp`, `Terra Stand Indoor Planter`) clipped slightly under `object-cover`.
   - _Fix:_ Applied `object-contain p-2 bg-white` for isolated studio product shots inside `ProductCard.tsx`.

---

## 4. Side-by-Side Comparison Summary vs WoodenStreet Reference

- **Preserved Structure:** Top utility bar, main header with prominent search & icon-label actions, sticky category nav bar with hover mega-menus, breadcrumb strip, `1240px` editorial hero, trust advantage bar, H1 + expandable intro, pill-filtered 6×2 category grid, highlights carousel, secondary promo banner, 5 asymmetric 1+4 room showcase bento blocks + product carousels, local SEO content, FAQ accordion, floating Back-to-Top button, and 5-column footer.
- **Intentional Brand & Policy Divergences:**
  - Replaced WoodenStreet branding/colors with Rao's Furniture Paradise wordmark, Walnut (`#4A3025`), Terracotta (`#B5683C`), Ivory (`#FAF7F2`), Warm Beige (`#E9DED0`), and Charcoal (`#242424`).
  - Removed synthetic countdown timers, `"UPTO 50% OFF"` banners, fake MRP strikethroughs, unverified customer counts, and review ratings.
  - Added interactive **Furniture Customization Consultation**, **Shop the Look Room Hotspots**, and **Daba Gardens Showroom Map** sections, plus `  Catalogue` labeling on illustrative Phase 1 items.

---

## 5. Remaining Limitations & Pending Client Sign-off

- **Lighthouse CLI Audit:** Not run (CLI unavailable globally).
- **Client Verification Pending (`src/config/business.ts`):** Phone number, WhatsApp Business number, showroom hours, establishment year (`1990` vs `2005`), official logo vector, authentic showroom/product photography, and final SKU pricing remain gated until confirmed by Rao's Furniture Paradise.
- **Client-side Only (Phase 1):** Enquiry Basket and Wishlist persist in `localStorage`; backend database, authentication, and order management belong to Phase 2.
