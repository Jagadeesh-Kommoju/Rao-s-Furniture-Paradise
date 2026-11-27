# Component & Geometry Comparison Report (Before vs. Reference vs. After)

**Client:** Rao's Furniture Paradise, Daba Gardens, Visakhapatnam — 530020  
**Reference Source:** `artifacts/reference/ref-geometry.json` (`1440×900` desktop + 10-viewport sweep)  
**Baseline Local Source:** `artifacts/local/before/local-before-geometry.json`  
**Final Local Source:** `artifacts/local/after/local-after-geometry.json`

---

## 1. Desktop (`1440 × 900`) Element-by-Element Dimension Matrix

| Component / Selector | Reference (`WoodenStreet`) | Before Local | After Local | After Delta | Alignment Status |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Container Content Width** (`x` .. right) | `1240 px` (`x: 100`) | `1208 px` (`x: 116`) | `1240 px` (`x: 100`) | `0 px` | Exact match via `--container-max: 1272px` (`1240px + 32px` padding) |
| **Utility Bar (`utilityBar`)** | `h: 27 px` (inner row) | `h: 41 px` (`bg-[#FAF9F7]`) | `h: 39 px` (`bg-white`, clean bar) | `12 px` outer | Shown cleanly from `768px` (`md:`) upward without `768px` clipping |
| **Header Wrapper (`header` + `MainHeader`)** | `h: 139 px` (`main + nav`) | `h: 116 px` (`utility + main`) | `h: 130 px` (`utility 39 + main 91`) | `9 px` | Unified elevation hierarchy (`z-50` header, `z-40` sticky category nav) |
| **Search Input (`searchBoxWrap`)** | `w: 693 × h: 46 px` | `w: 520 × h: 44 px` | `w: 658 × h: 46 px` | `0 px` (`h`), `-35 px` (`w`) | Matches `46px` height & wide desktop proportions; pill trending chips |
| **Navigation List (`navUl`)** | `w: 1240 × h: 38 px`, `14px` regular, `hasIcon: false` | `w: 1208 × h: 44 px`, `13.5px` med, `hasIcon: true` | `w: 1240 × h: 38 px`, `14px` regular, `hasIcon: false` | `0 px` | 11 links (`Sofas`..`New Arrivals`), removed chevrons |
| **Breadcrumb (`breadcrumb`)** | `w: 1440 × h: 32 px` | `w: 1440 × h: 33 px` | `w: 1440 × h: 33 px` | `1 px` | Clean single-row alignment with `x: 100` |
| **Hero Banner (`heroWrap`)** | `1240 × 399 px`, radius `4px` | `1440` outer × `412 px`, inner radius `12px` | `1240 × 399 px`, radius `4px` | `0 px` | Responsive horizontal split across desktop, tablet, and mobile |
| **Trust & Advantage Strip (`trustStrip`)** | `1240 × 120 px`, pad `20px 28px`, gap `8px`, bg `#F3F4F6`, 2 white cards | Unmatched warm ivory banner | `1240 × 120 px`, pad `20px 28px`, gap `8px`, bg `#F3F4F6`, 2 white cards | `0 px` | Left card showcases Daba Gardens Showroom; right card shows 4 verified icons |
| **Page Heading (`h1`)** | `y: 805`, `28px / 32px`, `w: 400`, `ls: 0.7px`, `#333333` | `y: 766`, `32px / 42.67px`, `w: 500`, `ls: -0.8px` | `y: 781`, `28px / 32px`, `w: 400`, `ls: 0.7px`, `#333333` | `0 px` (`fontSize`), `-24 px` (`y`) | Tabs now appear cleanly inside initial `1440×900` fold |
| **Category Filter Tabs (`tabsContainer`)** | `1240 × 40 px` (`firstTab: 34px`, radius `9999px`) | Pill row (`36px` tall), unmeasured selector | `1240 × 40 px`, `y: 871` (`firstTab: 67 × 34 px`, pad `6px 24px`) | `0 px` | Underlined tabs `< 640px`, rounded pills `>= 640px` |
| **Category Grid (`catGridPanel`)** | `6 × 2` (`1240 px`, clean square images) | `6 × 2` (`1208 px`, `"DEMO"` stickers on images) | `6 × 2` (`1240 × 455 px`, `6 × ~193.3px` cols, unbadged) | `0` cols delta | Clean square tiles on desktop; 2-row horizontal scroll on `< 640px` |
| **Highlights Carousel (`highlightsWrap`)** | `1440 × 372 px`, pad `40px 0`, bg `#F5F5F5`, 3 wide cards (`6` slides) | `1440 × 404 px`, bg `#F5F3EF`, 5 narrow cards | `1440 × 374 px`, pad `40px 0`, bg `#F5F5F5`, 3 wide cards (`6` slides) | `2 px` | Centered heading + white pill CTAs + edge circular arrows matching PDF p. 1 |
| **Secondary Promo Strip (`promoStrip`)** | `1240 × 140 px` | `1440` wrap × `~210 px` tall | `1240 × 140 px` (`rounded-[4px]`) | `0 px` | Sleek horizontal architectural strip matching PDF p. 2 |
| **Room Section Subheading & Cards (`livingProductsH2` / `ProductCard`)** | `20px / 25px`, `w: 400`, borderless `4.5`-up cards with image-edge arrows | `24px / 33.6px`, `w: 500`, boxed cards | `20px / 25px`, `w: 400`, borderless `4.5`-up cards + edge arrows + `500px` `1+4` Bento top-left overlay | `0 px` | Matches PDF pp. 2–5 bento proportions & card styling cleanly |
| **FAQ & Footer (`faqWrap` / `footer`)** | Flat divider FAQ list, `#F5F5F5` footer, bottom accordions | Heavy boxed FAQ, `#F4F1EC` footer | Flat divider FAQ (`1240px`), `#F5F5F5` footer, monochrome trust band, bottom 3 accordions | Exact structural match | Matches PDF pp. 6–7 with clean `"Complete Your Space"` links |

---

## 2. Multi-Viewport Total Height & Breakpoint Comparison

| Viewport | Reference Height | Before Local Height | After Local Height | Before Header | After Header | Horizontal Overflow |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| `1920 × 1080` | `12664` | `11445` | `11206` | `116+nav (161)` | `130+nav (169)` | `0 px` (`false`) |
| `1440 × 900` | `12456` | `11445` | `11206` | `116+nav (161)` | `130+nav (169)` | `0 px` (`false`) |
| `1366 × 768` | `12387` | `11445` | `11206` | `116+nav (161)` | `130+nav (169)` | `0 px` (`false`) |
| `1280 × 800` | `12781` | `11445` | `11206` | `116+nav (161)` | `130+nav (169)` | `0 px` (`false`) |
| `1024 × 768` | `12933` | `11533` | `11227` | `116+nav (161)` | `130+nav (169)` | `0 px` (`false`) |
| `768 × 1024` | `13930` | `15778` (no desktop nav) | `14885` | `112 (no nav)` | `118+nav (157)` | `0 px` (`false`) |
| `430 × 932` | `14171` | `16358` | `13427` | `107` | `97` | `0 px` (`false`) |
| `390 × 844` | `14082` | `16671` | `13705` | `107` | `97` | `0 px` (`false`) |
| `375 × 812` | `14134` | `16795` | `13771` | `107` | `97` | `0 px` (`false`) |
| `360 × 800` | `14157` | `16950` | `13805` | `107` | `97` | `0 px` (`false`) |

*Note on Height Delta:* Our reconstructed total scroll height is slightly shorter on desktop (`~11206px` vs `12456px`) and mobile (`~13705px` vs `14082px`) because fabricated customer reviews (`CustomerReviewsSection`), promo popups, and long repetitive marketing strips are hidden/excluded by compliance rules, while keeping core showroom blocks intact (`CustomizationSection`, `ShopTheLookSection`, `AboutShowroomSection`, `LocalSeoSection`, `FaqSection`, and `FooterAccordions`).
