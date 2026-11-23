# CODE.COMMIT 2.0 — UI/UX Modernisation & Redesign Plan

**Design Concept:** *Cybersecurity Engineering Atelier*  
**Core Pillars:** `SECURITY × SOFTWARE × RESEARCH`  
**Design Philosophy:** *Clarity first. Engineering credibility second. Motion third.*

---

## 1. Comprehensive Codebase UI Audit

### 1.1 Current State & Identified Problems
1. **Hero Imbalance (`src/app/page.tsx` & `src/components/home/security-telemetry-console.tsx`):**
   - The current Hero places a dense bordered dashboard panel (`SecurityTelemetryConsole`) on the right half of the viewport, visually prioritizing a single product (`CloudSentinel`) over the overarching **CODE.COMMIT** studio identity (`SECURITY × SOFTWARE × RESEARCH`).
   - Enclosed inside a heavy outer border box with 4 bottom KPI cells, making the Hero feel like an operations dashboard rather than a high-end engineering studio.
2. **Surface Monotony (`src/components/ui/spotlight-card.tsx` & `src/app/globals.css`):**
   - Almost every section uses identical `.studio-card` containers with `1px solid #204D35` borders and glowing hover reticles, creating visual fatigue ("box-inside-box" syndrome).
3. **Dense Technical Text on Initial Load (`src/components/home/triad-engineering-workbench.tsx`):**
   - Displays three columns of raw code and dense telemetry simultaneously without progressive disclosure, overwhelming first-time visitors before they grasp the studio's core value proposition.
4. **Static Portfolio & Research Presentation:**
   - The homepage portfolio displays a static multi-card grid instead of an interactive split-screen project selector rail (`CloudSentinel` flagship + interactive index for `SENTINEL-IoT`, `AegisFlow`, `TOTAL ENTITY`, `Vulnerability Management Platform`, `CTI Analysis`, `Digital Forensics Automation`).
   - The homepage research section lacks an interactive **Research Topic Network** connecting the 8 research disciplines (`Threat Intelligence`, `Malware Analysis`, `Cloud Security`, `Digital Forensics`, `IoT Security`, `Application Security`, `Offensive Security`, `AI Security`).
5. **Technology Stack Wall:**
   - Currently renders a 12-card flat logo grid rather than a curated 3-discipline capability matrix (`SECURITY ENGINEERING`, `SOFTWARE ENGINEERING`, `RESEARCH & INFRASTRUCTURE`).

---

## 2. Reusable Component Inventory & Refactor Matrix

| Component Path | Action | Redesign Specification |
| :--- | :--- | :--- |
| `src/components/layout/brand-logo.tsx` | **Preserve** | Keep untouched; uses official `/brand/code-commit-*.png` & `/products/cloudsentinel-logo.png`. |
| `src/components/layout/navbar.tsx` | **Refactor** | Refined floating navigation bar with clear visual separation between destinations (`Services, Work, Products, Research, Insights, About`) and utility controls (`Search`, `CLI`), hover underline micro-interaction, and restrained non-glowing border. |
| `src/components/home/hero-triad-visualizer.tsx` | **Create New** | Replaces telemetry console in Hero. 3D-inspired isometric/layered interactive SVG + Motion visualization of **SECURITY**, **SOFTWARE**, and **RESEARCH** with hover/focus/click layer elevation, related project links, and accessible mobile segmented switcher. |
| `src/components/home/engineering-pillars.tsx` | **Create New** | Signature `SECURITY × SOFTWARE × RESEARCH` 3-panel cinematic horizontal expanding accordion on desktop (vertical stack on mobile) with custom vector architectural visuals and tailored CTAs. |
| `src/components/home/portfolio-interactive-showcase.tsx` | **Create New** | Flagship **CloudSentinel** immersive showcase ("Security across clouds. Clarity across complexity.") + interactive split-screen selector rail for supporting GitHub systems. |
| `src/components/home/triad-engineering-workbench.tsx` | **Refactor** | Repositioned to **"Inside the Engineering Lab"** section with clean progressive disclosure (simplified summaries by default; expandable technical evidence & illustrative code drawer on demand) + optional toggle to inspect the **Security Telemetry Console**. |
| `src/components/home/research-topic-network.tsx` | **Create New** | Interactive connected node graph of the 8 research disciplines + editorial lead paper showcase with accessible category filter controls. |
| `src/components/home/process-timeline.tsx` | **Refactor** | Modern 6-stage connected engineering flow (`01 Discover`, `02 Analyse`, `03 Engineer`, `04 Validate`, `05 Deploy`, `06 Evolve`) with advancing green progress path and subtle technical schematics. |
| `src/app/globals.css` | **Refactor** | Introduce the 4-tier Surface Hierarchy (`Surface A: Editorial`, `Surface B: Premium Glass`, `Surface C: Technical Interface`, `Surface D: Immersive`) and fluid `clamp()` typography. |

---

## 3. Four-Tier Surface System

- **Surface A — Editorial (`.surface-editorial`):** Open dark canvas (`#030806` / `#050B08`), zero enclosing box borders, generous whitespace, high-contrast display typography. Used for Hero left column, section headers, and Final CTA.
- **Surface B — Premium Glass (`.surface-glass`):** Subtle translucent backdrop (`rgba(16, 29, 21, 0.55)`), `backdrop-filter: blur(16px)`, ultra-fine `1px` border (`rgba(32, 77, 53, 0.45)`), soft top specular highlight. Used for Flagship Product Showcase, Featured Service, and Research Lead Paper.
- **Surface C — Technical Interface (`.surface-technical`):** Structured `#0B1710` / `#050B08` monospace instrumentation panels. Used strictly for CLI Terminal, Code Inspection drawers, and Telemetry Lab.
- **Surface D — Immersive (`.surface-immersive`):** Cinematic deep-forest radial lighting (`#0B3824` -> `#030806`) with layered vector schematics. Used for the 3-Pillar Expanding Showcase and CloudSentinel Feature Panel.

---

## 4. Rebuilt Homepage Section Architecture

1. `NAVIGATION` — Floating translucent studio bar (`Services, Work, Products, Research, Insights, About` | `Search, CLI` | `Initialize Project`)
2. `CINEMATIC EDITORIAL HERO` — 52% Left Editorial Statement ("We break systems. We build better ones.") + 48% Right Interactive 3-Layer Engineering Visualization (`SECURITY × SOFTWARE × RESEARCH`)
3. `SECURITY × SOFTWARE × RESEARCH` — 3-Panel Expanding Cinematic Showcase (`EngineeringPillars`)
4. `SELECTED CAPABILITIES (SERVICES)` — Editorial Bento Grid (2x-wide featured **Penetration Testing** card + 5 varied Bento cards; retains *"Find vulnerabilities. Fix them. Build securely."*)
5. `FLAGSHIP PRODUCT SHOWCASE` — **CloudSentinel** ("Security across clouds. Clarity across complexity.") with official logo, layered console preview, and verified repository capabilities
6. `SELECTED ENGINEERING WORK` — Interactive Split-Screen Portfolio Selector Rail (`SENTINEL-IoT`, `AegisFlow`, `TOTAL ENTITY`, `Vulnerability Management Platform`, `CTI Analysis`, `Digital Forensics Automation`)
7. `INSIDE THE ENGINEERING LAB` — Progressive-disclosure Triad Engineering Workbench + expandable Security Telemetry Console & Zero-Egress Lab link
8. `RESEARCH & INTELLIGENCE` — Interactive 8-Node Research Topic Network + Editorial Paper Showcase
9. `HOW WE WORK` — 6-Stage Connected Engineering Process (`01 Discover` → `06 Evolve`)
10. `TECHNOLOGY & ENGINEERING STACK` — Curated 3-Pillar Capability Matrix (`Security Engineering`, `Software Engineering`, `Research & Infrastructure`)
11. `FINAL CTA` — Open editorial conversion section
12. `FOOTER` — Studio colophon & governance links
