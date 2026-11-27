# Functional, Responsive & End-to-End QA Test Report

**Client:** Rao's Furniture Paradise, Daba Gardens, Visakhapatnam — 530020  
**Test Runner:** Playwright (`tests/storefront.spec.ts`, Chromium desktop binary) against live Next.js 15 production server (`http://127.0.0.1:3000`)  
**TypeScript / Linter:** `tsc --noEmit` & `eslint .` (`0` errors, `0` warnings)

---

## 1. Automated Verification Summary

| Check Suite | Command | Final Outcome | Notes |
| :--- | :--- | :---: | :--- |
| TypeScript Check | `npm run typecheck` (`tsc --noEmit`) | **PASS** | Zero diagnostics across `src/` & `tests/` |
| ESLint Check | `npm run lint` (`eslint .`) | **PASS** | Zero errors, zero warnings |
| Production Build | `npm run build` (`next build`) | **PASS** | Compiled in `5.9s`; `78/78` static & dynamic pages generated |
| Full E2E Suite | `npx playwright test` | **4 / 4 PASS** (`51.5s`) | Executed cleanly against fresh build (`PORT 3010`) |
| 10-Viewport Image & Overflow Sweep | `capture_local_state.mjs after` | **10 / 10 PASS** | `overflow=false` & `brokenImages=[]` on every viewport |

---

## 2. Playwright Test Breakdown (`4 / 4 Passing`)

1. **`all required routes render with zero errors and all images load` (`27.4s`)**:
   - Verified HTTP `< 400`, zero console errors, zero uncaught page exceptions, zero asset HTTP errors (`>= 400`), and zero broken images (`naturalWidth === 0`) after scroll settle across **all 19 storefront routes**:
     `/`, `/furniture-in-visakhapatnam`, `/collections`, `/collections/sofas`, `/collections/beds`, `/collections/dining-tables`, `/collections/office-chairs`, `/products/aurora-3-seater-sofa`, `/search?q=sofa`, `/wishlist`, `/cart`, `/customize`, `/shop-the-look`, `/about`, `/showroom`, `/contact`, `/faq`, `/privacy-policy`, `/terms-and-conditions`.
2. **`no fabricated claims or unverified tel/whatsapp links exist` (`1.0s`)**:
   - Asserts `document.body.innerText` contains none of `"20 Lakh+"`, `"UPTO 50% OFF"`, `"Sale Ends In"`, or `"Established in 1990"`.
   - Verifies `0` active `tel:` or `wa.me` anchors while `isPhoneVerified` and `isWhatsappVerified` remain `false` in `src/config/business.ts`.
3. **`10-viewport responsive check has zero horizontal overflow and captures screenshots` (`15.4s`)**:
   - Verifies `documentElement.scrollWidth <= window.innerWidth` across all 10 mandatory viewports:
     `1920×1080`, `1440×900`, `1366×768`, `1280×800`, `1024×768`, `768×1024`, `430×932`, `390×844`, `375×812`, `360×800`.
   - Captures fold and full-page verification screenshots under `artifacts/local/playwright-verify/`.
4. **`interactive flows: tabs, mega-menu, sticky header, carousels, search Escape, wishlist, enquiry basket, customization, FAQ, showroom directions, mobile drawer` (`7.3s`)**:
   - Intro text expand/collapse (`More` / `Read More` -> `Read Less`).
   - Category Explorer tab filtering (`Bedroom` -> verifies `Dressing Tables`, returns to `All`).
   - Sticky Category Navigation bar remains anchored near viewport top (`y <= 20px`) after scrolling down to `y = 700`.
   - Product Carousel next scroll button triggers slide update cleanly.
   - Showroom Google Maps directions anchor verified (`href*="17.7143612,83.3009386"`).
   - Desktop `"Sofas"` nav hover displays accessible `Sofas category menu` mega-menu region.
   - Search combobox opens `#header-search-suggestions`, dismisses on `Escape`, filters live suggestions on `"sofa"`, and navigates to `/search?q=sofa` on `Enter`.
   - PDP Wishlist toggle & `Add to Enquiry Basket` persist across full page reload (`localStorage` Zustand hydration) and render accurately on `/wishlist` & `/cart` (including quantity increment `1 -> 2`).
   - Customization form on `/customize` opens summary dialog and closes cleanly on `Escape`.
   - `/faq` accordion item toggles `aria-expanded="true"`.
   - Mobile `390×844` drawer opens and closes via aria-labeled controls.

---

## 3. Manual / Visual Spot Checks Verified in Chromium Captures

- Verified `local-after-1440x900-fold.png`, `local-after-768x1024-fold.png`, `local-after-390x844-fold.png`, `local-search-suggest.png`, `local-megamenu-sofas.png`, `local-living-bento-1440.png`, `local-product-carousel-1440.png`, and `local-faq-footer-1440.png`.
- Confirmed search suggestion panel renders cleanly over category bar (`z-50`), all `768px` tablet utility and trust items fit cleanly without right-edge overflow, and zero blank placeholders or broken image slots appear.
