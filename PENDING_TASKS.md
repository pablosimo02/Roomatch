# Project State: RooMatch (Valencia)
**Date:** 2026-05-12
**Status:** Incomplete build. Routing is mostly fixed but syntax errors introduced in recent edits.

## 1. Current State
- **Build:** Currently failing due to syntax errors (`</div}`) and TypeScript issues.
- **Routing:** Pages created for `/`, `/explore`, `/swipe`, `/roommates`, `/dashboard`, `/chat`, `/listing/new`, `/listing/[id]`, `/barrios`, `/profile`.
- **Infrastructure:** Mapbox replaced with Leaflet (OpenStreetMap).
- **Core Issues:** Recent attempts to add "use client" and fix routes introduced JSX corruption.

## 2. Pending Features (NOT YET IMPLEMENTED)
- **Data**: Expanded mock data (20+ roommates, 24+ listings).
- **Matching**: Mutual right-swipe logic and weighted compatibility score.
- **State**: Global state for published listings.
- **Chat**: AI simulated responses, persistent threads.
- **UI/UX**: Overhaul of Swipe UI, Navbar sidebar, Profile redesign.
- **New Pages**: Social, Premium, Insights ODS, Roommate Assistant.
- **Booking**: Visit booking calendar.
- **IA Tools**: Price Predictor, Fraud Detector visible badges.
- **Misc**: Digital contracts, Erasmus toggle, Looker Studio embed, ODS badges, Reputation badges, Favorites system.
- **Branding**: SVG Logo, landing page animations.

## 3. Known Bugs
- **Syntax Errors**: Multiple occurrences of `</div}` instead of `</div>` in `src/app/explore/page.tsx` and potentially others.
- **TypeScript**: Index signature errors in `src/app/listing/[id]/page.tsx` (partially fixed).
- **Hydration**: Potential `window is not defined` errors in Leaflet components (partially fixed with dynamic import).

## 4. Instructions for Next Session
1. **Priority 1: Clean Build**. Fix all `</div}` syntax errors. Run `npm run build` and solve every TypeScript/JSX error.
2. **Priority 2: Runtime Verification**. Run `npm run dev` and verify that all routes return 200 OK and render without crashing.
3. **Priority 3: Feature Implementation**. Once stable, proceed with the "Pending Features" list starting with Mock Data and Global State.
4. **Constraint**: Maintain the `src/app` structure. Do not move pages back to `src/app/main`.
