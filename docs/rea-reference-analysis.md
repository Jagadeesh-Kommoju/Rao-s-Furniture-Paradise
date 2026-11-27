# REA Reference Website Analysis — WoodenStreet Visakhapatnam

**Target Reference URL:** `https://www.woodenstreet.com/furniture-in-visakhapatnam`  
**Analysis Tooling:** REA MCP (`rea-agents@6.10.1`, 263 registered tools) via Chromium Loopback CDP + Playwright 10-Viewport Inspection  
**Target Client Brand:** Rao's Furniture Paradise, Daba Gardens, Visakhapatnam — 530020 (KLYVA Technologies, Phase 1 Frontend)

---

## 1. REA Tooling & Evidence Ledger

All reference observations recorded below come from live public-facing inspection via REA MCP and Playwright against the published Visakhapatnam storefront page. No private endpoints, user accounts, or proprietary source repositories were accessed.

| Stage            | REA Tool / Method                                              | Evidence / View ID                                                                                                                                 | Key Observed Output                                                                                              |
| :--------------- | :------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| Session Init     | `binary_session({})`                                           | Active REA session                                                                                                                                 | Verified `rea-agents@6.10.1` (263 available tools)                                                               |
| Target Attach    | `list_browser_targets`                                         | `ev_bc6da1c0c4001fd7552368d930503a694c6dba519fb2e84629a01e782fc3567c`                                                                              | Attached Chromium CDP target `EE9B80CB06DE886B218C1EB295F5605A`                                                  |
| DOM Inspection   | `inspect_web_page`                                             | `ev_87d944607b7c2eacd3357f80fda7062e13ec335fd1b0978d3ecf04c858ee6ef5`                                                                              | Rendered public DOM graph mapped (`total_nodes: 3300`)                                                           |
| Bundle Analysis  | `analyze_web_bundle`                                           | `ev_2a5398cada5e4c721ceb4e705639315ac40ac97db200fbf3725c48b7bc6eb40f` (View `ev_25343e3bbc9b1b191b55a9be4efd021a5f169c67a6115553cf9674e49481d628`) | Client bundle inspected (`parsed_scripts: 57`, `visited_ast_nodes: 1168308`)                                     |
| Desktop Scenario | `capture_browser_scenario`                                     | `ev_2773f72bdf670fdd874229990c3f202404405fa2d634d8e058772f42a1658074`                                                                              | Captured header, search suggestion focus, category hover mega-menu, sticky scroll & interactive flow             |
| Mobile Scenario  | `capture_browser_scenario`                                     | `ev_2de75331f623047991935f75f6d1ac74276a8cf9797078d7a1687e19a3100e7b`                                                                              | Captured mobile compact landscape hero, 4-icon trust card, underlined tabs & 2-row horizontal categories         |
| Geometry Audit   | Playwright DOM Probe (`artifacts/reference/ref-geometry.json`) | `1440x900` + 10-viewport sweep                                                                                                                     | Extracted exact `x`, `y`, `width`, `height`, `padding`, `margin`, `gap`, fonts, radii, z-index, and scrollHeight |

---

## 2. Measured Desktop Layout Hierarchy (`1440 × 900`)

| Section / Element             | Bounding Rect (`x, y, w × h`)  | Key Computed CSS Properties                                                                                                  | Reconstruction Notes for Rao's                                                                                     |
| :---------------------------- | :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| **Utility Top Bar**           | `x: 100, y: 12, 1240 × 27`     | `display: flex`, compact single row (`Furniture \| Home Interiors \| Bulk Order` left; showroom/help links right)            | Show from `768px` (`md:`) upward; exclude fake discount/phone until verified                                       |
| **Header Wrapper**            | `x: 0, y: 51, 1440 × 139`      | `padding-top: 30px`, `background: #FFFFFF`, `z-index: 39`                                                                    | Contains brand mark, centered search bar (`693 × 46`), action icons, and 38px nav strip                            |
| **Search Input Wrap**         | `x: 356, y: 81, 693 × 46`      | `width: 693px`, `height: 46px`, thin border, magnifying-glass submit icon                                                    | Include recent searches + pill-style trending suggestions (`Sofa`, `Bed`, `Dining`, etc.)                          |
| **Category Nav List**         | `x: 100, y: 151, 1240 × 38`    | `display: flex`, `font-size: 14px`, `font-weight: 400`, `hasIcon: false` (no chevrons)                                       | 11 evenly spaced category items across `1240px`; hover/focus mega-menu; sticky on scroll                           |
| **Breadcrumb Strip**          | `x: 0, y: 190, 1440 × 32`      | `padding: 8px 0px`, `font-size: 14px` outer, subtle `Home / Furniture / Furniture In Visakhapatnam`                          | Keep single-row `32px` height aligned to `1240px` container                                                        |
| **Hero Banner**               | `x: 100, y: 222, 1240 × 399`   | `margin-bottom: 20px`, `border-radius: 4px`, 38%/62% editorial + interior visual split                                       | Adapt with walnut editorial panel & original living room photograph (`h-[399px]` on desktop)                       |
| **Trust & Advantage Strip**   | `x: 100, y: 641, 1240 × 120`   | `padding: 20px 28px`, `gap: 8px`, `border-radius: 6px`, `background: #F3F4F6`, `display: flex`                               | Dual white elevated cards inside neutral `#F3F4F6` frame; replace countdown/EMI with Daba Gardens showroom callout |
| **City Heading (`<h1>`)**     | `x: 100, y: 805, 1240 × 32`    | `Red Hat Display`, `28px`, `weight: 400`, `line-height: 32px`, `letter-spacing: 0.7px`, `#333333`                            | Centered heading + 1-line truncated intro with inline `More` / `Read Less` toggle                                  |
| **Category Tabs Container**   | `x: 100, y: 881, 1240 × 40`    | `padding: 0 12px`, `gap: 8px`, centered pills (`padding: 6px 24px`, `height: 34px`, `radius: 9999px`)                        | Desktop pills (`All, Living, Bedroom, Dining, Study & Office, Decor`); mobile underlined tabs                      |
| **Category Grid Panel**       | `x: 100, y: 929, 1240 × 541`   | 6 columns × 2 rows (`1240px` wide), square rounded (`4px`) images without corner badge overlays                              | Clean unbadged photos + centered uppercase titles; single discreet notice below grid                               |
| **Highlights Carousel Strip** | `x: 0, y: 1514, 1440 × 372`    | Full-bleed `#F5F5F5`, `padding: 40px 0`, `margin: 20px 0 40px 0`, centered heading, 6-up track                               | 6 cards across (`~195px` wide) with edge prev/next buttons                                                         |
| **Secondary Promo Banner**    | `x: 100, y: 1926, 1240 × 140`  | Sleek `1240 × 140` horizontal ribbon above room sections                                                                     | Replace `140px` ribbon cleanly without tall stacked padding                                                        |
| **Room Showcase Sections**    | `x: 100, y: 2086, 1240 × 1299` | Header (`Title + View All`) -> `1 + 4` Bento Grid -> Subheading (`20px / 25px, letter-spacing: 1px`) + 4-up Product Carousel | Keep clean bento tiles & clean product cards without floating corner pill badges over thumbnails                   |
| **FAQ Section**               | `x: 0, y: 10945, 1440 × 431`   | `padding: 48px 0px`, centered title + clean expandable accordion list                                                        | Maintain single-border clean FAQ items & `FAQPage` structured JSON-LD                                              |
| **Footer Block**              | `x: 88, y: 11562, 1264 × 325`  | Multi-column directory + city service neighborhoods strip + payment/app/legal/office bar                                     | Multi-column Rao's links, Vizag areas, Google Maps link, KLYVA credit, verified-only contact fields                |

---

## 3. Multi-Viewport Measurements & Responsive Breakpoints

Reference scroll dimensions recorded across all 10 viewports (`artifacts/reference/ref-geometry.json`):

| Viewport      | Category         | `scrollWidth` | `innerWidth` | `scrollHeight` | Measured Header Behavior                                                               |
| :------------ | :--------------- | :-----------: | :----------: | :------------: | :------------------------------------------------------------------------------------- |
| `1920 × 1080` | Desktop          |     1920      |     1920     |     12664      | 139px two-tier nav (`+ utility`), zero overflow                                        |
| `1440 × 900`  | Desktop          |     1440      |     1440     |     12456      | 139px two-tier nav (`+ utility`), zero overflow                                        |
| `1366 × 768`  | Desktop          |     1366      |     1366     |     12387      | 139px two-tier nav (`+ utility`), zero overflow                                        |
| `1280 × 800`  | Desktop          |     1280      |     1280     |     12781      | 139px two-tier nav (`+ utility`), zero overflow                                        |
| `1024 × 768`  | Tablet Landscape |     1024      |     1024     |     12933      | 138px horizontal nav retained down to 768px                                            |
| `768 × 1024`  | Tablet Portrait  |      768      |     768      |     13930      | 138px condensed horizontal header + 3-col / 4-col grids                                |
| `430 × 932`   | Mobile XL        |      430      |     430      |     14171      | Compact mobile header + landscape split hero (~160px) + 2-row horizontal categories    |
| `390 × 844`   | Mobile Std       |      390      |     390      |     14082      | Compact mobile header + landscape split hero + 4-col Why Choose card + underlined tabs |
| `375 × 812`   | Mobile iOS       |      375      |     375      |     14134      | Compact mobile fold fitting Hero + Trust + H1 + Category strip                         |
| `360 × 800`   | Mobile Min       |      360      |     360      |     14157      | Zero horizontal overflow; 2-up mobile product cards & stacked footer                   |

---

## 4. Key Qualitative & Anti-Hallucination Adaptations

1. **Removed Prohibited Reference Patterns:** WoodenStreet includes a live `"SALE Ends In 03:05:09:40"`, `"UPTO 50% OFF"`, bank EMI logos, `"20 Lakh+ Customers"`, star ratings, floating support chat widget, and a scroll-triggered `"WIN ₹10,000"` modal (`ref-faq-footer-1440.png`). All fabricated timers, claims, unverified numbers, and dark-pattern popups are strictly excluded in Rao's Furniture Paradise.
2. ** Transparency Without Visual Clutter:** Instead of stamping opaque `" "` badges on top of every square category and bento photograph (which degrades visual parity with WoodenStreet's clean grid tiles), category and room headers include a single unobtrusive _"Illustrative Phase 1 Preview Catalogue"_ note and each product card body + detail page clearly marks pricing/quote state.
3. **Tablet (`768px`) & Mobile (`< 640px`) Structural Parity:**
   - Desktop/tablet header stays active down to **`768px` (`md:`)** matching WoodenStreet `ref-768x1024-fold.png`.
   - Mobile hero shifts from vertical stacking (`~700px` tall before fix) to a crisp **horizontal split hero** (`~168px`), bringing Trust Strip, H1, Category Tabs, and two rows of category tiles into the initial mobile fold (`ref-390x844-fold.png`).
