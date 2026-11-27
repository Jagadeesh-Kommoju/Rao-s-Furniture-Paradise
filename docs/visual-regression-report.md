# Visual Regression & Fidelity Verification Report

**Tooling:** `pixelmatch` + `pngjs` (Automated Pixel Comparison) & DOM Bounding Geometry Verification  
**Artifacts Location:**
- Reference Captures: `artifacts/reference/{desktop,tablet,mobile,components}/`
- Before Baseline Captures: `artifacts/local/before/{desktop,tablet,mobile,components}/`
- Final After Captures: `artifacts/local/after/{desktop,tablet,mobile,components}/`
- Diff Composites & Heatmaps: `artifacts/visual-diff/{before,after}/` (`*-diff-raw.png`, `*-edge-diff.png`, `*-sbs.png`)

---

## 1. Transparent Reporting Methodology

Comparing a live third-party storefront (`WoodenStreet`, orange/blue winter promo creatives, live sale timers, floating chat widget, delayed discount popup) against an independently branded Indian client storefront (`Rao's Furniture Paradise`, walnut & terracotta `#4A3025` / `#B5683C` palette, original local photography, original copy) produces high raw RGBA delta even when structural alignment is near-exact. Therefore, every verification run reports **four distinct metrics side-by-side**:

1. **Raw Pixel Mismatch % (`pixelmatch` threshold `0.15`, `includeAA: false`)**: Unmasked pixel-by-pixel comparison across the full captured frame (`0%` exclusions).
2. **Normalized Masked Pixel Mismatch %**: Masks **strictly two non-reconstructible third-party elements** (left-side countdown timer + EMI strip prohibited under truthfulness rules, and floating chat bubble FAB):
   - Desktop `1440×900`: `ref-chat-fab` (`x: 1350, y: 810, 85×85`), `ref-prohibited-countdown-emi` (`x: 115, y: 650, 565×100`).
   - Mobile `390×844`: `ref-mobile-chat-fab` (`x: 310, y: 660, 75×85`), `ref-mobile-prohibited-countdown` (`x: 12, y: 165, 366×72`).
   - No photography regions, hero banners, logos, or grids are masked out to artificially suppress diff scores.
3. **8×8 Structural Block Similarity % (`*-edge-diff.png`)**: Evaluates spatial whitespace, container bounds, and structural density luminance buckets independently of color-hue swaps (`#B5683C` walnut/terracotta vs reference `#E37A34`/navy) and photograph subjects.
4. **Computed DOM Geometry Alignment %**: Compares 13 exact bounding-box and typographic rules (`header`, `utilityBar`, `searchBoxWrap`, `navUl`, `breadcrumb`, `heroWrap` width/height, `trustStrip`, `h1` Y & font-size, `tabsContainer`, `promoStrip`, `highlightsWrap`) against measured reference geometry tolerances.

---

## 2. Before vs. After Aggregate Metrics

| Aggregate Metric | Before Baseline (`before-summary.json`) | Final After (`after-summary.json`) | Net Improvement |
| :--- | :---: | :---: | :---: |
| **Computed DOM Geometry Alignment** | `79.31%` | **`99.12%`** | **`+19.81 pp`** |
| **Desktop Fold Structural Similarity (`1440×900`)** | `70.37%` | **`71.67%`** | `+1.30 pp` |
| **Tablet Fold (`768×1024`) Structural Similarity** | `34.67%` | **`59.45%`** | **`+24.78 pp`** |
| **Mobile Fold (`390×844`) Structural Similarity** | `30.56%` | **`45.00%`** | **`+14.44 pp`** |
| **Average Structural Block Similarity (all 15 pairs)** | `46.14%` | **`53.32%`** | **`+7.18 pp`** |
| **Average Raw RGBA Pixel Mismatch (all 15 pairs)** | `51.85%` | **`44.64%`** | **`-7.21 pp`** |
| **Average Mobile Raw Mismatch (`430`..`360px`)** | `68.98%` | **`49.09%`** | **`-19.89 pp`** |

---

## 3. Per-Viewport & Component Pixel Comparison (`After`)

| Pair Name | Dimensions | Raw Mismatch | Normalized Masked Mismatch | Structural Similarity (`8×8`) | Masks Applied |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `desktop-1920x1080-fold` | `1920×1080` | `31.98%` | `31.98%` | `66.90%` | None |
| `desktop-1440x900-fold` | `1440×900` | `30.38%` | `31.51%` | `71.67%` | `ref-chat-fab`, `ref-prohibited-countdown-emi` |
| `desktop-1366x768-fold` | `1366×768` | `36.45%` | `36.45%` | `68.20%` | None |
| `desktop-1280x800-fold` | `1280×800` | `36.07%` | `36.07%` | `69.53%` | None |
| `tablet-1024x768-fold` | `1024×768` | `38.82%` | `38.82%` | `58.78%` | None |
| `tablet-768x1024-fold` | `768×1024` | `37.43%` | `37.43%` | `59.45%` | None |
| `mobile-430x932-fold` | `430×932` | `47.14%` | `47.14%` | `39.36%` | None |
| `mobile-390x844-fold` | `390×844` | `50.89%` | `47.55%` | `45.00%` | `ref-mobile-chat-fab`, `ref-mobile-prohibited-countdown` |
| `mobile-375x812-fold` | `375×812` | `49.71%` | `49.71%` | `37.56%` | None |
| `mobile-360x800-fold` | `360×800` | `48.63%` | `48.63%` | `39.44%` | None |
| `comp-header-hero-1440` | `1440×900` | `30.37%` | `30.37%` | `70.13%` | None |
| `comp-sticky-nav-1440` | `1440×900` | `33.19%` | `33.19%` | `62.15%` | None |
| `comp-categories-1440` | `1440×900` | `41.08%` | `41.08%` | `60.00%` | None |
| `comp-living-bento-1440` | `1440×900` | `78.65%` | `78.65%` | `26.64%` | *Ref capture contains delayed `"Win ₹10,000"` darkened backdrop + modal* |
| `comp-product-carousel-1440` | `1440×900` | `78.83%` | `78.83%` | `25.00%` | *Ref capture scroll offset shifted below darkened popup modal* |

### Note on `comp-living-bento-1440` & `comp-product-carousel-1440`
Visual inspection of `artifacts/visual-diff/before/comp-living-bento-1440-sbs.png` confirms WoodenStreet triggered a full-screen darkened overlay modal (`"Signup & Get a Chance to WIN ₹10,000"`) during mid-scroll capture. Per ethical reconstruction rules, popup dark patterns were **not** replicated. Independent visual verification of `artifacts/local/after/components/local-living-bento-1440.png` and `local-categories-1440.png` confirms clean 1+4 bento grid geometry, `1240×140` promo banner framing, 4-up product carousel proportions, and `0` broken images.

---

## 4. Iterative Correction Log

1. **Iteration 1 (Architectural Reconstruction):**
   - Fixed `.container-storefront` `--container-max` from `1240px` outer (giving `1208px` inner) to `1272px` (`1240px` exact inner box at `x: 100`).
   - Aligned `HeroBanner` (`1240×399` desktop, `168px` horizontal landscape split mobile instead of stacked `~610px` mobile column), `TrustStrip` (`1240×120` `#F3F4F6` with dual white elevated cards), `VisakhapatnamIntro` (`28px/32px` weight `400`, 1-line truncated + `More`), `CategoryExplorer` (clean square grid on desktop without `"DEMO"` image stamps + underlined tabs & 2-row horizontal scroll on mobile), `HighlightsCarousel` (6-up desktop), `PromoBanner` (`1240×140`), `RoomShowcaseSection` (`1+4` clean bento), and `ProductCard` (`20px/25px` subheading, unbadged thumbnails, 2-up mobile cards).
   - Fixed 17 TypeScript/TSX source files where an earlier pre-session string replacement had stripped `"Demo"` / `"demo"` tokens.
   - Outcome: `geoAlignment` jumped from `79.31%` to `98.21%`, mobile fold raw mismatch fell by ~20 percentage points, tablet `768×1024` similarity jumped from `34.67%` to `55.41%`.
2. **Iteration 2 (Visual Inspection Audit):**
   - Visual inspection of `local-after-768x1024-fold.png`, `local-search-suggest.png`, `local-megamenu-sofas.png`, and `local-faq-footer-1440.png` revealed:
     - `TopUtilityBar` and `TrustStrip` clipping on `768×1024` tablet portrait.
     - Header `z-40` allowing sticky category nav to overlap search dropdown border (`header` elevated to `z-50`).
     - Residual `" ( )"` strings in Footer/Nav/CatalogueBrowser and empty badge `<span>` in `CategoryNavBar` mega-menu.
     - Vertical spacing slightly compact (`h1.y` at `767` vs `805`), adjusted `MainHeader` padding to raise `geoAlignment` to `99.12%` (`h1.y: 781`).
3. **Iteration 3 (Typography Truncation Polish):**
   - Visual check caught ellipsis truncation inside `TrustStrip` right card (`"Home & Offi..."`, `"Daba Garde..."` at `1440px`). Switched desktop `lg:` layout from equal-width `grid-cols-4` to `lg:flex lg:justify-between` -> verified zero ellipsis in `local-after-1440x900-fold.png`.
