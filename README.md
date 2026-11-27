# Rao's Furniture Paradise — Storefront (Phase 1)

**Client:** Rao's Furniture Paradise, Dr. No. 30-15-171, Prasantharama Mansion, Near Saraswati Park, Daba Gardens, Visakhapatnam, Andhra Pradesh — 530020  
**Developed by:** LogiDev  
**Scope:** Phase 1 — Frontend Storefront & Digital Showroom nstration

## Architecture & Tech Stack

- **Framework:** Next.js 15 App Router (Server Components default, Client Components where interactivity is required)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 with centralized brand tokens (`src/app/globals.css`)
- **State & Persistence:** Zustand + `localStorage` (`src/stores/useStore.ts`)
- **Carousels & Animation:** Embla Carousel, Lucide React, GSAP (respecting `prefers-reduced-motion`)
- **Testing & Verification:** Playwright + REA MCP (`rea-agents`)

## Key Configuration Files

- `src/config/business.ts` — Centralized client identity, Daba Gardens address/coordinates, and verification flags gating provisional directory data (phone, WhatsApp, hours, establishment year, social links, customer reviews).
- `src/data/categories.ts` — Visual category tiles, room showcase bento mappings, and FAQ entries.
- `src/data/products.ts` — 42 typed nstration furniture entries clearly flagged `is : true`.
- `src/data/navigation.ts` — Multi-level header utility links and desktop mega-menu hierarchy.

## Local Commands

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```
