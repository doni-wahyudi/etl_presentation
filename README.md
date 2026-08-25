# ETL Interactive Presentation Deck (Extract, Transform, Load)

An interactive, modern, 28-slide web presentation deck designed for learning and presenting ETL concepts. Built with a sleek Dark Slate theme, 16:9 PowerPoint aspect ratio preservation, interactive data transformation visualizers, and direct 16:9 PDF export support.

![ETL Presentation Hero](assets/pipeline_hero.jpg)

---

## 🌟 Key Features

* **PowerPoint 16:9 Standard Aspect Ratio**: Responsive `.slide-frame` container automatically scales to match any screen size while preserving standard slide proportions.
* **Multi-Page PDF Export**: Dedicated `@media print` engine formatted for 16:9 Landscape (`16in × 9in`) with clean page breaks per slide. Press **Export PDF** (or `Ctrl + P` / `P`) to generate a clean multi-page presentation PDF.
* **Multi-Theme Engine & Warm Khaki Suite**: Switch themes on-the-fly via the top HUD dropdown or by pressing `T`:
  * 🌌 **Dark Slate** *(Default Data Studio)*: Dark Slate background (`#0B0F19`) with Sky Blue, Amber, Emerald, and Indigo accents.
  * 🏜️ **Warm Khaki (Dark)**: Earthy Espresso & Sand background (`#171513`) with Desert Gold Extract (`#E5B869`), Terracotta Transform (`#E27D60`), Olive Sage Load (`#8CB369`), and Warm Bronze (`#D4A373`).
  * 📜 **Warm Khaki (Light)**: Warm Linen Parchment background (`#F4EFEA`) with Golden Ochre, Deep Terracotta, Forest Olive, and Espresso typography.
* **Complete 28-Slide Syllabus**:
  * **Module 1**: ETL Fundamentals & The Problem with Siloed Data (Slides 1–3)
  * **Module 2**: Tooling Ecosystem (Cloud ETL, Airflow, Spark, dbt, n8n) & Tool Selection Criteria (Slides 4–5)
  * **Module 3**: ETL vs ELT Architecture & Deep Comparison Matrix (Slides 6–7)
  * **Module 4**: The Extract Phase (Sources, 3 Extraction Types, Engineering Challenges) (Slides 8–10)
  * **Module 5**: Loading Strategies (Initial Load vs Delta Load, Batch Chunks, Timestamps, Edge Cases) (Slides 11–17)
  * **Module 6**: Transformation Deep Dive (Cleaning, Handling NULLs, Standardization, Validation Rules, Business Rules, Multi-source Joins, End-to-End Pipeline & The Big Picture) (Slides 18–28)
* **Full Keyboard & Touch Navigation**:
  * `→` / `Space` / `PageDown`: Next slide
  * `←` / `Backspace` / `PageUp`: Previous slide
  * `Home` / `End`: First / Last slide
  * `T`: Cycle color themes (Dark Slate, Warm Khaki Dark, Warm Khaki Light)
  * `O`: Open 28-slide thumbnail Overview Grid modal
  * `F`: Fullscreen mode
  * `P` / `Ctrl + P`: Export to PDF / Print
  * `?`: Shortcut cheat sheet
  * Mobile: Touch swipe left/right

---

## 🚀 Quick Start (Local Run)

No `npm install` or complex build setup required. You can simply open `index.html` directly in any modern browser, or run a lightweight local server:

### Using Python:
```bash
python -m http.server 3000
```
Then navigate to `http://localhost:3000` in your browser.

### Using Node / npx:
```bash
npx serve .
```

---

## 📄 Exporting to PDF

1. Open the presentation in Chrome / Edge / Brave / Safari.
2. Click the **Export PDF** button in the top HUD or press `P` / `Ctrl + P`.
3. In the print dialog:
   * **Destination**: *Save as PDF*
   * **Layout**: *Landscape*
   * **Paper Size**: *Default* or *Tabloid / 16:9*
   * **Options**: Enable *Background graphics*
4. Click **Save**.

---

## 🛠️ Tech Stack

* **HTML5**: Semantic, accessible slide structure.
* **CSS3**: Vanilla CSS Variables, Glassmorphism, CSS-native micro-animations (`cubic-bezier(0.4, 0, 0.2, 1)`), and Print Pagination Engine.
* **JavaScript**: Vanilla ES6+ presentation controller and deep-linking hash synchronization.
