# System Architecture — CODE.COMMIT

## 1. High-Level Architecture
CODE.COMMIT is built on a modern, monolithic full-stack Next.js (App Router) architecture designed for Vercel deployment with PostgreSQL + Prisma ORM persistence and resilient structured-data fallback.

```text
[Client Browser]
   │  HTTPS + CSP + HSTS + Frame-Ancestors 'none'
   ▼
[Next.js App Router (Server Components & Client Islands)]
   ├── Marketing & Content Routes (/, /services/*, /products/*, /work/*, /research/*, /insights/*)
   ├── Interactive UI Islands (Allowlisted Terminal, Filterable Grids, Process Timeline)
   └── API Route Handlers (/api/contact, /api/health)
          │
          ├── Zod Schema Validation + Secret Pattern Rejector
          ├── Token-Bucket IP Rate Limiter + Honeypot Anti-Spam
          ├── Safe Notification Dispatcher (Server-side SMTP/Console Audit)
          └── Data Access Layer (Prisma ORM ──► PostgreSQL + Structured Data Seed)
```

## 2. Data Flows
1. **Portfolio & Research Rendering:** Server Components query the repository layer (`src/lib/db/repositories.ts`), which reads from Prisma PostgreSQL when connected and seamlessly falls back to verified structured seed datasets (`src/data/*`) during static builds or offline previews.
2. **Project Enquiry Submission (`POST /api/contact`):**
   - Extracts client IP hash (SHA-256 salted/truncated, never storing raw PII IPs unnecessarily).
   - Enforces rate limits (default 5 requests / 60 seconds per IP).
   - Checks anti-spam honeypot field (`website_url`).
   - Validates payload against `contactSubmissionSchema` (Zod) and rejects payloads containing accidental secret/private-key patterns (`-----BEGIN`, `AKIA`, etc.).
   - Persists submission with a unique reference code (`CC-YYYY-XXXX`) and returns confirmation state.

## 3. Database Schema Summary
Defined in `prisma/schema.prisma`:
- `Project` & `ProjectTechnology`
- `ResearchCategory` & `ResearchArticle`
- `ContentSeries` & `InsightArticle`
- `ContactSubmission`
- `SiteSetting`
