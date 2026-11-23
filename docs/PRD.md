# Product Requirements Document (PRD) — CODE.COMMIT

## 1. Product Vision
CODE.COMMIT (`@c0de.commit`) is a cybersecurity and secure software engineering platform dedicated to helping organisations identify security weaknesses, improve their security posture, and build resilient digital systems.

The platform unifies four core pillars:
1. **Professional Cybersecurity Services** — Authorised offensive assessments, defensive architecture, and secure software engineering.
2. **Engineering Product & Project Portfolio** — Transparent documentation of flagship systems and open-source/research builds from the owner's GitHub ecosystem (`github.com/AnandBinuArjun`).
3. **Cybersecurity Research Laboratory** — Structured technical articles, MITRE ATT&CK references, and draft research publications.
4. **Technical Education & Knowledge Platform (Insights)** — Multi-part educational lessons supporting the CODE.COMMIT Instagram technical curriculum.

## 2. Brand Positioning
- **Primary Brand Statement:** `SECURITY × SOFTWARE`
- **Primary Headline:** `Find vulnerabilities. Fix them. Build securely.`
- **Alternative Positioning:** `Offensive Security. Defensive Engineering. Secure Software.`
- **Primary CTA:** `Explore Services`
- **Secondary CTA:** `View Our Work`
- **Conversion CTA:** `Initialize Project`

## 3. Target Personas
1. **CTOs, VPs of Engineering & CISOs:** Seeking practical application security, cloud posture assessment, or secure system development without theatrical "hacker" fluff.
2. **Security Engineers & Researchers:** Evaluating technical credibility through architecture diagrams, repository structures, and research methodology.
3. **Developers & Learners:** Consuming the CODE.COMMIT Insights educational series on phishing defence, identity/MFA security, and malware detection.

## 4. Functional Requirements
- **Navigation & Terminal:** Sticky responsive header, keyboard-accessible mobile drawer, and an allowlisted interactive terminal navigation assistant (`help`, `about`, `services`, `projects`, `research`, `contact`, `clear`).
- **Services Matrix:** Index page + 6 dedicated service pages (`/services/penetration-testing`, `/services/application-security`, `/services/security-audits`, `/services/cloud-security`, `/services/incident-response`, `/services/secure-development`).
- **Products & Portfolio:** Differentiates implemented features from planned roadmap items; supports category/technology filtering and search.
- **Research Lab:** Supports 8 technical categories, reading time, TOC, code copy, MITRE ATT&CK mapping, and clear `[DRAFT RESEARCH]` badges where applicable.
- **Educational Insights:** Hosts the 3 flagship 20-part Instagram series with complete initial lessons and structured curriculum placeholders.
- **Initialize Project Enquiry Workflow:** End-to-end Zod-validated form with rate limiting, honeypot spam controls, secret-pattern screening, safe database/fallback persistence, and reference code confirmation.

## 5. Non-Functional & Honesty Constraints
- **Brand Integrity:** Original CODE.COMMIT and CloudSentinel logo slots are preserved with drop-in asset loading and explicit placeholder badges if files are not yet supplied.
- **Zero Fabrication:** No fake customer testimonials, no fabricated CVEs, no exaggerated threat counters, and no unverified certifications.
- **Security by Design:** Strict CSP and HTTP security headers, server-side input validation, rate limiting, and zero secret exposure.
