# CODE.COMMIT (`code-commit-web`)

**Brand Statement:** `SECURITY × SOFTWARE`  
**Primary Headline:** *Find vulnerabilities. Fix them. Build securely.*  
**Instagram:** [@c0de.commit](https://instagram.com/c0de.commit)  
**GitHub Ecosystem:** [github.com/AnandBinuArjun](https://github.com/AnandBinuArjun)

---

## 1. Overview

CODE.COMMIT is a full-stack cybersecurity and secure software engineering platform combining four integrated experiences:

1. **Professional Cybersecurity Services** (`/services` + 6 dedicated service specifications)
2. **Engineering Product & Project Portfolio** (`/products` & `/work`, featuring **CloudSentinel**, **SENTINEL-IoT**, **Threat Intelligence CTI Analysis**, **TOTAL ENTITY**, **CODEX CYBERSTRIKE**, and more)
3. **Cybersecurity Research Laboratory** (`/research` + 8 discipline categories, MITRE ATT&CK technique mappings, and code-copy support)
4. **Technical Education & Knowledge Platform** (`/insights`, hosting the three 20-part `@c0de.commit` Instagram technical curricula)

---

## 2. Brand Assets & Logo Preservation Notice

In strict compliance with Section 3 and Section 8 of the Master Build Prompt:
- No generic shield, letter C, or synthetic cloud shield replacement logo has been invented.
- Drop the original supplied brand and product files into the following locations to automatically populate the `<BrandLogo />` and `<ProductLogo />` slots:
  - `public/brand/code-commit-logo.svg` (Original dragon-head + circular lock emblem with `CODE.COMMIT` wordmark)
  - `public/brand/code-commit-mark.svg` (Compact mark)
  - `public/products/cloudsentinel-logo.svg` (Official CloudSentinel logo)

---

## 3. Technology Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, React 19, Tailwind CSS, Lucide Icons
- **Backend & Validation:** Next.js Route Handlers (`/api/contact`, `/api/health`), Zod Schema Validation, Secret-Pattern Screening, Token-Bucket Rate Limiting
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

- [Product Requirements Document (`docs/PRD.md`)](./docs/PRD.md)
- [System Architecture (`docs/ARCHITECTURE.md`)](./docs/ARCHITECTURE.md)
- [Design System (`docs/DESIGN_SYSTEM.md`)](./docs/DESIGN_SYSTEM.md)
- [Security & Threat Model (`docs/SECURITY.md`)](./docs/SECURITY.md)
- [API Specification (`docs/API.md`)](./docs/API.md)
- [Deployment Guide (`docs/DEPLOYMENT.md`)](./docs/DEPLOYMENT.md)
- [Roadmap (`docs/ROADMAP.md`)](./docs/ROADMAP.md)
- [Agent & Engineering Rules (`AGENTS.md`)](./AGENTS.md)
