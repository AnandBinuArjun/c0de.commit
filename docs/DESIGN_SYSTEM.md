# Design System — CODE.COMMIT 2.0 (Cybersecurity Engineering Atelier)

## 1. Brand Identity & Logo Usage
- **CODE.COMMIT Logo:** Neon-green dragon-head emblem integrated with a circular lock motif and `CODE.COMMIT` wordmark.
- **Asset Paths:**
  - `/public/brand/code-commit-logo-original.png` — High-resolution source brand emblem
  - `/public/brand/code-commit-logo.png` — Horizontal navbar & footer lockup
  - `/public/brand/code-commit-mark.png` — Compact dragon-lock emblem placement
  - `/public/brand/code-commit-wordmark.png` — Wordmark lockup
  - `/public/products/cloudsentinel-logo.png` — Official CloudSentinel product emblem
- **Strict Policy:** The `BrandLogo` and `ProductLogo` components always render the exact supplied asset files. Never replace or regenerate the original emblem with generic icons.

## 2. Colour Tokens
| Token | Hex | Purpose |
| :--- | :--- | :--- |
| `background.DEFAULT` | `#030806` | Primary deep black-green canvas |
| `background.secondary` | `#050B08` | Alternate section surface |
| `background.elevated` | `#0B1710` | Navigation, terminal, and interactive drawers |
| `background.card` | `#101D15` | Card surface background |
| `brand.primary` | `#00F58A` | Strategic neon green accent & active states |
| `brand.secondary` | `#00C878` | Secondary interactive green |
| `brand.deep` | `#0B3824` | Subtle badge and glow fills |
| `brand.border` | `#204D35` | Fine technical borders |
| `text.primary` | `#F3F8F5` | High-contrast headings and body text |
| `text.secondary` | `#A5B7AA` | Supporting technical copy |
| `text.muted` | `#72877A` | Metadata, timestamps, eyebrows |
| `status.error` | `#FF6474` | Validation errors and critical alerts |
| `status.warning` | `#F6B75C` | Draft labels and caution states |
| `status.info` | `#65B9FF` | Informational architecture tags |

## 3. Four-Tier Surface System (`src/app/globals.css`)
To create an editorial studio hierarchy rather than wrapping every section in identical bordered boxes, CODE.COMMIT 2.0 defines four distinct surface treatments:

1. **Surface A — Editorial Surface (`.surface-editorial`):**
   - Deep `#030806` to `#050B08` gradient canvas with restrained radial atmospheric lighting and open whitespace.
   - Used for the Hero statement, section headers, and process narrative.
2. **Surface B — Premium Glass Surface (`.surface-glass`):**
   - Translucent dark-green surface (`rgba(16, 29, 21, 0.72)`) with `backdrop-filter: blur(16px)`, ultra-thin borders (`rgba(32, 77, 53, 0.55)`), and top specular highlights.
   - Used for the floating navigation bar, interactive discipline panels, and primary feature cards.
3. **Surface C — Technical Interface Surface (`.surface-technical`):**
   - Structured dark surface (`#07100B`) with fine `28px × 28px` grid geometry and monospace metadata framing.
   - Used selectively for the Engineering Lab, Research Topic Constellation, and interactive terminal.
4. **Surface D — Immersive Highlight Surface (`.surface-immersive`):**
   - Deep radial-lit showcase container (`#0B1710` → `#050B08`) with top emerald accent illumination.
   - Used for the Flagship **CloudSentinel** Showcase and the Final Conversion section.

## 4. Typography & Fluid Hierarchy
- **Display Font:** `NOHEMI` (loaded via local `@font-face` if present in `/public/fonts/nohemi`, with `Syne` / `Space Grotesk` display fallback).
- **Body Font:** `Manrope` (`max-w-[65ch]` reading width, `1.65` line height).
- **Technical Monospace:** `JetBrains Mono` (reserved for badges, MITRE tags, commands, and schematic labels).
- **Fluid Display Classes:**
  - `.text-hero-display`: `clamp(2.5rem, 4.8vw + 0.75rem, 4.75rem)`, `line-height: 1.03`, `letter-spacing: -0.035em`
  - `.text-section-display`: `clamp(1.875rem, 3.2vw + 0.5rem, 3.25rem)`, `line-height: 1.08`, `letter-spacing: -0.028em`

## 5. Layout, Motion & Accessibility Principles
- Max container width: `1440px` with responsive padding (`1.25rem` mobile to `3rem` desktop).
- Restrained motion system (`180ms–240ms` microinteractions, `450ms–650ms` cubic-bezier section reveals).
- Full compliance with `prefers-reduced-motion: reduce`, semantic landmark roles, keyboard navigation (`Tab`, `Enter`, `Escape`), and minimum `44px × 44px` mobile touch targets.
