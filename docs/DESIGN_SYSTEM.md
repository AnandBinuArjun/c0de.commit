# Design System — CODE.COMMIT

## 1. Brand Identity & Logo Usage
- **CODE.COMMIT Logo:** Neon-green dragon-head emblem integrated with a circular lock motif and `CODE.COMMIT` wordmark.
- **Asset Paths:**
  - `/public/brand/code-commit-logo.svg` (or `.png`) — Horizontal placement
  - `/public/brand/code-commit-mark.svg` — Compact emblem placement
  - `/public/products/cloudsentinel-logo.svg` — CloudSentinel product emblem
- **Strict Policy:** The `BrandLogo` and `ProductLogo` components render the exact supplied asset files and display an explicit `[ORIGINAL ASSET SLOT]` frame until the owner places the original graphics in `/public/brand/` and `/public/products/`.

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

## 3. Typography
- **Display Font:** `NOHEMI` (loaded via local `@font-face` if present in `/public/fonts/nohemi`, with `Syne` / `Space Grotesk` open-source display fallback).
- **Body Font:** `Manrope`
- **Technical Monospace:** `JetBrains Mono`

## 4. Layout & Motion Principles
- Max container width: `1440px` with responsive padding (`1.25rem` mobile to `3rem` desktop).
- Subtle glassmorphism (`backdrop-blur-md`, `bg-[#0B1710]/85`), fine `1px` borders (`#204D35`), and restrained ambient lighting.
- Full support for `prefers-reduced-motion: reduce`.
