# AGENTS.md — Engineering Standards & Agent Workflow for CODE.COMMIT

## 1. Brand & Factual Integrity Rules
- **Never replace original brand logos** with generic icons. Keep `/public/brand/code-commit-logo.png`, `/public/brand/code-commit-mark.png`, `/public/brand/code-commit-wordmark.png`, and `/public/products/cloudsentinel-logo.png` wired through `<BrandLogo />` and `<ProductLogo />`.
- **Never fabricate** client names, CVE identifiers, SOC certifications (ISO 27001 / CREST / SOC2), or engagement metrics.
- Distinguish **Implemented Features** (verified in `github.com/AnandBinuArjun`) from **Planned Architecture Features**.

## 2. Coding Conventions
- **TypeScript Strict Mode:** Zero `any` types; validate all external inputs with Zod.
- **Styling:** Use Tailwind CSS design tokens mapped in `tailwind.config.ts`. Maintain high contrast and dark ambient sophistication (`#030806` background, `#101D15` cards, `#204D35` borders, strategic `#00F58A` neon green accents).
- **Accessibility:** Always support keyboard navigation, focus rings, semantic headings, and `prefers-reduced-motion`.

## 3. Security Rules
- Terminal component (`src/components/terminal/*`) must strictly use an explicit allowlist of commands (`help`, `about`, `services`, `projects`, `research`, `contact`, `clear`). Never execute shell commands.
- Contact API (`src/app/api/contact/route.ts`) must enforce Zod schema validation, distributed rate limiting, honeypot checking, and secret-pattern rejection.

## 4. Testing & Definition of Done
A change is complete only when:
1. `npm run typecheck` passes with zero errors.
2. `npm run test` (Vitest unit & integration suite) passes.
3. `npm run build` succeeds cleanly.
