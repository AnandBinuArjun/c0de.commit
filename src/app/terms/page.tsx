import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Engagement & Authorised Security Testing Policy",
  description:
    "CODE.COMMIT terms of use, rules of engagement requirements for security assessments, and educational content disclaimer.",
};

export default function TermsPage() {
  return (
    <div className="space-y-0">
      <section className="border-b border-brand-border/70 bg-technical-grid py-16">
        <div className="container mx-auto max-w-4xl space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-primary">
            [ GOVERNANCE // TERMS OF ENGAGEMENT ]
          </span>
          <h1 className="font-display text-4xl font-bold text-text-primary">
            Terms of Use & Authorised Engagement Policy
          </h1>
          <p className="font-mono text-xs text-text-muted">
            Last Updated: November 2026 · CODE.COMMIT Security Engineering
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container mx-auto max-w-4xl space-y-8 text-sm leading-relaxed text-text-secondary">
          <div className="rounded-2xl border border-brand-border bg-background-card p-7 space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              1. Authorised Security Assessments Only
            </h2>
            <p>
              Submitting an enquiry through the CODE.COMMIT website does not constitute authorization
              to commence security testing. All offensive security assessments, penetration tests, and
              cloud posture audits require a formally executed Statement of Work (SoW), written asset
              ownership verification, and signed Rules of Engagement (RoE).
            </p>
          </div>

          <div className="rounded-2xl border border-brand-border bg-background-card p-7 space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              2. No Guarantee of Absolute Invulnerability
            </h2>
            <p>
              Security assessments and secure software engineering reduce technical risk and evaluate
              systems against defined standards (such as OWASP ASVS, OWASP WSTG, and CIS Benchmarks)
              at a specific point in time. No security evaluation can guarantee that any system is
              completely attack-proof or immune to future vulnerabilities.
            </p>
          </div>

          <div className="rounded-2xl border border-brand-border bg-background-card p-7 space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              3. Research Lab & Educational Insights Disclaimer
            </h2>
            <p>
              All articles, code snippets, and MITRE ATT&CK analyses published in the CODE.COMMIT
              Research Lab (`/research`) and Insights section (`/insights`) are provided strictly for
              defensive engineering, authorized verification, and educational purposes. Misuse of
              security concepts against unauthorized systems is strictly prohibited.
            </p>
          </div>

          <div className="rounded-2xl border border-brand-border bg-background-card p-7 space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              4. Brand Identity & Intellectual Property
            </h2>
            <p>
              The CODE.COMMIT brand identity, dragon-head and circular lock emblem, CloudSentinel
              product branding, and original research publications remain the intellectual property
              of CODE.COMMIT and Anand Binu Arjun. Open-source repositories linked on GitHub are
              governed by their respective repository licenses.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
