# Frontend Performance & Web Vitals Telemetry Report

**Measured Environment:** Playwright Chromium Headless against Local Next.js 15 Production Server (`next start`)  
**Telemetry Script:** `measure_performance.mjs` using Chromium `PerformanceObserver` (`largest-contentful-paint`, `layout-shift`, `paint`, `navigation`)  
**Raw Metric Artifact:** `artifacts/performance-metrics.json` (`measuredAt: 2026-11-27T06:44:52.370Z`)  
**Note on Lighthouse CLI:** Standalone `lighthouse` CLI is not installed in the host PATH (`lighthouseCliInstalled: false`); all timings below reflect real local Chromium production renders without artificial CPU/network throttling profiles.

---

## 1. Core Web Vitals & Transfer Metrics (Post-Reconstruction)

| Viewport | Route | TTFB | DCL | Load | FCP | LCP | CLS | INP Proxy | DOM Nodes | Requests | Total KB | JS KB | Image KB |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Desktop (`1440×900`) | `/` | `6 ms` | `37 ms` | `139 ms` | `728 ms` | `0 ms`* | `0.0000` | `107 ms` | `2718` | `78` | `1939.0 KB` | `625.6 KB` | `333.8 KB` |
| Desktop (`1440×900`) | `/collections/sofas` | `3 ms` | `69 ms` | `111 ms` | `76 ms` | `116 ms` | `0.0006` | — | `586` | `56` | `1655.9 KB` | `698.2 KB` | `32.2 KB` |
| Desktop (`1440×900`) | `/products/aurora-3-seater-sofa` | `3 ms` | `59 ms` | `106 ms` | `68 ms` | `68 ms` | `0.0012` | — | `611` | `57` | `1597.9 KB` | `698.2 KB` | `52.4 KB` |
| Desktop (`1440×900`) | `/search?q=sofa` | `55 ms` | `120 ms` | `162 ms` | `124 ms` | `164 ms` | `0.0006` | — | `745` | `64` | `1814.1 KB` | `698.3 KB` | `50.9 KB` |
| Mobile (`390×844`) | `/` | `7 ms` | `36 ms` | `148 ms` | `120 ms` | `120 ms` | `0.0006` | `42 ms` | `2713` | `69` | `1877.2 KB` | `647.2 KB` | `172.5 KB` |
| Mobile (`390×844`) | `/collections/sofas` | `3 ms` | `51 ms` | `91 ms` | `52 ms` | `88 ms` | `0.0007` | — | `586` | `39` | `1203.7 KB` | `667.7 KB` | `17.9 KB` |
| Mobile (`390×844`) | `/products/aurora-3-seater-sofa` | `3 ms` | `60 ms` | `102 ms` | `60 ms` | `60 ms` | `0.0020` | — | `612` | `40` | `1148.7 KB` | `667.7 KB` | `41.1 KB` |
| Mobile (`390×844`) | `/search?q=sofa` | `18 ms` | `76 ms` | `120 ms` | `76 ms` | `120 ms` | `0.0006` | — | `746` | `44` | `1325.4 KB` | `667.7 KB` | `28.5 KB` |

*\*Note: Desktop `/` LCP reported `0 ms` on `"load"` wait state prior to observer flush (prior `"networkidle"` desktop run measured `FCP 764 ms`, `LCP 764 ms`). `INP Proxy` measures script-to-frame time (`ms`) on clicking the `Bedroom` category filter tab (`107 ms` desktop / `42 ms` mobile).*

---

## 2. Production Bundle Analysis (`next build`)

- **Shared First Load JS Baseline:** `103 kB` across all routes (`chunks/255-73938ce8a8eac1ad.js`: `46.6 kB`, `chunks/4bd1b696-c023c6e3521b1417.js`: `54.2 kB`).
- **Storefront Entry (`/` & `/furniture-in-visakhapatnam`):** `143 B` page bundle, `174 kB` total First Load JS (pre-rendered static HTML).
- **Catalogue / PDP / Search:** `125 kB`–`131 kB` total First Load JS (`6.21 kB` PDP route chunk).
- **Zero Layout Shift Architecture:** Explicit fixed height wrappers (`h-[168px] sm:h-[260px] md:h-[310px] lg:h-[399px]` on Hero, `aspect-square` on Category tiles, `aspect-[4/3]` on Product cards) yield `CLS = 0.0000`–`0.0020` across all measured pages.

---

## 3. Image & Script Optimization Notes

- All 61 local furniture photographs are served exclusively through `next/image` with route-appropriate `sizes` hints and eager `priority` solely on the above-the-fold `HeroBanner` image.
- Google Fonts (`Plus Jakarta Sans` + `Red Hat Display`) load through `next/font/google` with `display: "swap"` and automatic self-hosting at build time — zero external Google Fonts stylesheet round-trip overhead in production.
- No heavy third-party chat embeds, tracking scripts, or countdown timers run on the client thread.
