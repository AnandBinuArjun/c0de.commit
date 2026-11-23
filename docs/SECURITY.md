# Security Architecture & Threat Model — CODE.COMMIT

## 1. Threat Model Summary
| Asset / Surface | Potential Threat | Mitigating Control |
| :--- | :--- | :--- |
| Public Enquiry Form (`/api/contact`) | Spam, DoS, XSS, SQLi, accidental secret submission | Zod strict validation, token-bucket rate limiter, honeypot field, secret-pattern blocklist, Prisma parameterized queries |
| Interactive Terminal UI | Command injection or arbitrary shell execution | Purely client-side allowlisted registry (`help`, `about`, `services`, `projects`, `research`, `contact`, `clear`); zero `eval` or server execution |
| HTTP Transport & Rendering | Clickjacking, XSS, MIME sniffing | Strict CSP, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, HSTS |
| Secrets & Environment | Accidental exposure to client bundle | Server-only environment validator (`src/lib/security/env.ts`); no secrets prefixed with `NEXT_PUBLIC_` |

## 2. OWASP ASVS Alignment
- **V1 Architecture:** Separation of public marketing content, allowlisted UI widgets, and server-side API route handlers.
- **V5 Validation & Sanitization:** All user inputs validated with strict length, format, and enum constraints via Zod (`src/lib/validation/contact.ts`). Secret detector prevents users from pasting private keys or cloud credentials into enquiry descriptions.
- **V14 Configuration:** Security headers enforced via `next.config.ts`.

## 3. Vulnerability Disclosure Policy
To report a security issue affecting CODE.COMMIT properties, use the contact channel at `/contact` without submitting live exploit payloads or sensitive production credentials.
