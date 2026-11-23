# CODE.COMMIT 2.0 (`code-commit-web`)

**Brand Pillars:** `SECURITY × SOFTWARE × RESEARCH`  
**Hero Statement:** *We break systems. We build better ones.*  
**Services Statement:** *Find vulnerabilities. Fix them. Build securely.*  
**Instagram:** [@c0de.commit](https://instagram.com/c0de.commit)  
**GitHub Ecosystem:** [github.com/AnandBinuArjun](https://github.com/AnandBinuArjun)

---

## 1. Overview

CODE.COMMIT 2.0 is a full-stack cybersecurity, software engineering, and research studio platform built with the **"Cybersecurity Engineering Atelier"** design system:

1. **Cinematic Editorial Homepage** (`/`) — Featuring the interactive 3-layer `SECURITY × SOFTWARE × RESEARCH` triad visualizer, expandable engineering pillar panels, asymmetric Bento service architecture, flagship **CloudSentinel** showcase, interactive portfolio selector rail, progressive-disclosure engineering lab, connected SVG research constellation, and 6-stage connected methodology timeline.
2. **Professional Cybersecurity Services** (`/services` + 6 dedicated service specifications with interactive scope configurators and vulnerable-vs-remediated code diff viewers)
3. **Engineering Product & Project Portfolio** (`/products` & `/work`, featuring all 21 verified GitHub repositories including **CloudSentinel**, **SENTINEL-IoT**, **AegisFlow**, **TOTAL ENTITY**, **CODEX CYBERSTRIKE**, **Vulnerability Management Platform**, and interactive architecture topologies)
4. **Cybersecurity Research Laboratory** (`/research` + 8 discipline categories, MITRE ATT&CK technique mappings, BibTeX citations, and reading mode)
5. **Technical Education & Knowledge Platform** (`/insights`, hosting the three 20-part `@c0de.commit` Instagram technical curricula)
6. **Interactive Security Engineering Lab** (`/tools`, zero-egress client-side CVSS v3.1 calculator, Security Headers & CSP synthesizer, JWT inspector, and MITRE navigator)

---

## 2. Brand Assets & Logo Preservation

All official supplied brand and product files are wired through `<BrandLogo />` and `<ProductLogo />`:
- `public/brand/code-commit-logo-original.png` (Original high-res dragon-head + circular lock emblem)
- `public/brand/code-commit-logo.png` (Horizontal emblem + wordmark lockup)
- `public/brand/code-commit-mark.png` (Compact dragon-lock emblem)
- `public/brand/code-commit-wordmark.png` (`CODE.COMMIT` wordmark)
- `public/products/cloudsentinel-logo.png` (Official CloudSentinel logo)

---

## 3. Technology Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, React 19, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend & Validation:** Next.js Route Handlers (`/api/contact`, `/api/health`), Zod Schema Validation, Secret-Pattern Screening, Token-Bucket Rate Limiting, Resend Email Delivery
- **Database:** PostgreSQL + Prisma ORM (`prisma/schema.prisma`, SQL migration, and deterministic `prisma/seed.ts`)
- **Testing:** Vitest, React Testing Library, Playwright E2E

---

## 4. Setup & Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env

# 3. Generate Prisma Client (and optionally run migrations / seed against PostgreSQL)
npm run db:generate
# npm run db:migrate
# npm run db:seed

# 4. Run development server
npm run dev
```

---

## 5. Testing & Verification

```bash
# TypeScript strict verification
npm run typecheck

# Unit & Integration test suite (Vitest)
npm run test

# Production build verification
npm run build

# End-to-End browser tests (Playwright)
npm run test:e2e
```

---

## 6. Documentation Index

- [UI/UX 2.0 Redesign Plan (`docs/UI_UX_REDESIGN_PLAN.md`)](./docs/UI_UX_REDESIGN_PLAN.md)
- [Product Requirements Document (`docs/PRD.md`)](./docs/PRD.md)
- [System Architecture (`docs/ARCHITECTURE.md`)](./docs/ARCHITECTURE.md)
- [Design System (`docs/DESIGN_SYSTEM.md`)](./docs/DESIGN_SYSTEM.md)
- [Security & Threat Model (`docs/SECURITY.md`)](./docs/SECURITY.md)
- [API Specification (`docs/API.md`)](./docs/API.md)
- [Deployment Guide (`docs/DEPLOYMENT.md`)](./docs/DEPLOYMENT.md)
- [Roadmap (`docs/ROADMAP.md`)](./docs/ROADMAP.md)
- [Agent & Engineering Rules (`AGENTS.md`)](./AGENTS.md)

---

## 7. Lab & Research Extensions

All interactive lab tools run locally in the browser (zero egress). Pure logic lives in `src/lib/security/` and is unit tested.

| Route | Contents |
| :--- | :--- |
| `/lab` | Hub page plus live public-repository activity (GitHub API, validated with Zod, revalidated hourly) |
| `/tools` | Header/CSP, entropy and IOC tools, plus CVSS 3.1, JWT inspector, encoding and hashes, regex/ReDoS, TLS certificate decoder, SPF/DKIM/DMARC checker, IaC linter, STRIDE threat-model builder, attack-path and defence playground, CTF sandbox |
| `/research/detections` | Reference Sigma, YARA and Suricata rules mapped to ATT&CK |
| `/research/secure-code-gallery` | Vulnerable versus fixed code by CWE |
| `/research/glossary` | Searchable security glossary |
| `/disclosure` | Responsible disclosure policy |

Integrity notes: detection rules and the defence simulation are **illustrative teaching aids**, labelled as such in the UI. They are not validated against production telemetry and are not measurements of real control effectiveness. No PGP key is published yet.
