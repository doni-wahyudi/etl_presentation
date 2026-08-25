# Project Technical Details — ETL Presentation Deck

Interactive modern web-based presentation deck for understanding ETL (Extract, Transform, Load) concepts, targeted at young aspiring professionals and beginners in data/software engineering.

---

## 1. System Overview & Tech Stack
* **Language & Core**: HTML5, Vanilla CSS3 (Custom Design System with CSS variables), Vanilla JavaScript (ES6+).
* **Repository**: [github.com/doni-wahyudi/etl_presentation](https://github.com/doni-wahyudi/etl_presentation) (`main` branch).
* **Aspect Ratio & Layout**: 16:9 Standard PowerPoint viewport (`.slide-frame` with `aspect-ratio: 16 / 9`) with auto-scaling to screen dimensions.
* **Target Audience**: Students, junior engineers, career switchers, and fresh graduates looking for clear, structured, non-overwhelming explanations.
* **Design Philosophy**: "Modern Data Studio" — sleek dark slate background (`#0B0F19`), high contrast typography (`Plus Jakarta Sans` and `JetBrains Mono`), curated pipeline color coding (Extract: Sky Blue `#38BDF8`, Transform: Amber `#F59E0B`, Load: Emerald `#10B981`), responsive glassmorphism cards, and CSS-native micro-animations (`cubic-bezier(0.4, 0, 0.2, 1)`).
* **Main Data Source**: `materi.md` (28 slides covering fundamentals, tools, ETL vs ELT, Extract, Initial vs Delta Load, Transformation steps, and End-to-End Architecture).

---

## 2. Active Routing & Navigation
* **Current View**: Single-page slide deck engine with slide pagination (`1` to `28`).
* **URL Hash Sync**: `#slide-1` through `#slide-28` with full browser history (Back/Forward) support.
* **Navigation Controls**: 
  * Keyboard: Arrow Left/Right (`←`/`→`), `Space`, `Backspace`, `PageUp`, `PageDown`, `Home`, `End`.
  * Overview Grid: Key `O` or HUD button (modal displaying miniature cards of all 28 slides).
  * Fullscreen: Key `F` or HUD button.
  * PDF Export: Key `P`, `Ctrl + P`, or HUD button ("Export PDF").
  * Help Dialog: Key `?` or HUD button.
  * Mobile/Tablet: Touch swipe left/right.

---

## 3. Print & PDF Export Engine
* **Stylesheet Engine**: Dedicated `@media print` rules formatted for 16:9 Landscape (`@page { size: 16in 9in landscape; margin: 0; }`).
* **Page-Break Pagination**: Uses `page-break-after: always; break-after: page;` per slide with `-webkit-print-color-adjust: exact` and hides all HUD chrome, footers, and modals during print/export.

---

## 4. Permanently Cleaned Up & Removed Features
* Retired static ASCII text diagrams in favor of dynamic CSS/SVG pipeline flow nodes and interactive data transformation tables.

---

## 5. Guidelines for Future Chats & Agents
* Keep CSS strictly organized with CSS tokens in `:root` in [style.css](file:///c:/Users/whydo/D9043DB2025/code/explore/web_project/web_presentation/ETL/style.css).
* Adhere to Global UI Preferences in `preferences.md`: high text contrast, no overwhelming neon graphics, smooth micro-transitions, and visual pipeline cards rather than raw ASCII art.
* Maintain clean slide modularity for easy updates.

---

## 6. Verification Pipeline & Smoke Tests
* Direct local HTTP server testing (`python -m http.server 3000` or opening `index.html` in browser).
* Verified responsive rendering across Desktop and Mobile viewports via browser subagent.
