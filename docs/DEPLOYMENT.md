# Deployment Guide — CODE.COMMIT

## 1. Prerequisites
- Node.js 20+
- PostgreSQL 15+ (Managed instance such as Neon, Supabase, AWS RDS, or Vercel Postgres)
- Vercel account (or container host)

## 2. Environment Configuration
Copy `.env.example` to `.env` and configure:
- `DATABASE_URL`: PostgreSQL connection string (`?sslmode=require` in production)
- `NEXT_PUBLIC_SITE_URL`: Canonical production domain
- `CONTACT_NOTIFICATION_EMAIL`: Destination address for project enquiry alerts
- `RATE_LIMIT_WINDOW_MS` and `RATE_LIMIT_MAX_REQUESTS`

## 3. Database Provisioning
```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

## 4. Vercel Deployment
1. Import `code-commit-web` into Vercel.
2. Add environment variables from `.env.example`.
3. Set build command to `prisma generate && next build`.
4. Verify `/api/health` and security headers after deployment.

## 5. Rollback Procedure
- Use Vercel Instant Rollback to restore the previous immutable deployment.
- For schema changes, apply forward-compatible migrations or restore from managed PostgreSQL point-in-time recovery (PITR).
