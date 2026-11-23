# System Architecture — CODE.COMMIT 2.0

## 1. High-Level Architecture
CODE.COMMIT is built on a modern, monolithic full-stack Next.js (App Router) architecture designed for Vercel deployment with PostgreSQL + Prisma ORM persistence, Resend notification delivery, and resilient structured-data fallback.

```text
[Client Browser]
   │  HTTPS + CSP + HSTS + Frame-Ancestors 'none'
   ▼
[Next.js App Router (Server Components & Client Islands)]
   ├── Marketing & Content Routes (/, /services/*, /products/*, /work/*, /research/*, /insights/*, /tools)
   ├── CODE.COMMIT 2.0 Studio Interactive Islands:
   │      ├── HeroTriadVisualizer (3D-inspired isometric SVG + Motion 3-layer stack)
   │      ├── EngineeringPillars (Expandable Security × Software × Research showcase)
   │      ├── PortfolioInteractiveShowcase (Flagship CloudSentinel + split-screen project rail)
   │      ├── TriadEngineeringWorkbench (Progressive-disclosure lab + live telemetry drawer)
   │      ├── ResearchTopicNetwork (Interactive 8-node SVG topic constellation + paper filter)
   │      ├── ProcessTimeline (Connected 6-stage interactive engineering methodology)
   │      └── CommandPalette, FloatingHudDock, and Allowlisted SecurityTerminal
   └── API Route Handlers (/api/contact, /api/health)
          │
          ├── Zod Schema Validation + Secret Pattern Rejector
          ├── Token-Bucket IP Rate Limiter + Honeypot Anti-Spam
          ├── Resend API / SMTP Safe Notification Dispatcher
          └── Data Access Layer (Prisma ORM ──► PostgreSQL + Structured Data Seed)
```

## 2. Data Flows
1. **Portfolio & Research Rendering:** Server Components query the repository layer (`src/lib/db/repositories.ts`), which reads from Prisma PostgreSQL when connected and seamlessly falls back to verified structured seed datasets (`src/data/*`) during static builds or offline previews.
2. **Project Enquiry Submission (`POST /api/contact`):**
   - Extracts client IP hash (SHA-256 salted/truncated, never storing raw PII IPs unnecessarily).
   - Enforces rate limits (default 5 requests / 60 seconds per IP).
   - Checks anti-spam honeypot field (`website_url`).
   - Validates payload against `contactSubmissionSchema` (Zod) and rejects payloads containing accidental secret/private-key patterns (`-----BEGIN`, `AKIA`, etc.).
   - Persists submission with a unique reference code (`CC-YYYY-XXXX`), dispatches real-time email notification via Resend (`RESEND_API_KEY`), and returns confirmation state.

## 3. Database Schema Summary
Defined in `prisma/schema.prisma`:
- `Project` & `ProjectTechnology`
- `ResearchCategory` & `ResearchArticle`
- `ContentSeries` & `InsightArticle`
- `ContactSubmission`
- `SiteSetting`
