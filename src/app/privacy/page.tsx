import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Handling",
  description:
    "CODE.COMMIT minimal data retention, project enquiry data protection, and privacy policy.",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-0">
      <section className="border-b border-brand-border/70 bg-technical-grid py-16">
        <div className="container mx-auto max-w-4xl space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-primary">
            [ GOVERNANCE // PRIVACY POLICY ]
          </span>
          <h1 className="font-display text-4xl font-bold text-text-primary">
            Privacy Policy & Minimal Data Retention
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
              1. Principle of Minimal Data Collection
            </h2>
            <p>
              CODE.COMMIT collects only the information explicitly submitted through our{" "}
              <code>Initialize Project</code> workflow (`/contact`): your full name, work email,
              optional organisation name, selected service category, project scope description, and
              preferred timeline.
            </p>
          </div>

          <div className="rounded-2xl border border-brand-border bg-background-card p-7 space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              2. Prohibition of Secrets & Sensitive Credential Intake
            </h2>
            <p>
              Our public contact endpoints strictly prohibit the submission of passwords, private
              cryptographic keys, API tokens, or confidential production logs. Server-side validation
              automatically scans and rejects payloads matching common credential patterns prior to
              database persistence.
            </p>
          </div>

          <div className="rounded-2xl border border-brand-border bg-background-card p-7 space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              3. Anti-Abuse Telemetry & Rate Limiting
            </h2>
            <p>
              To protect availability against automated spam and denial-of-service abuse, our API
              computes a salted, truncated SHA-256 hash of the connecting IP address for short-window
              rate limiting and abuse correlation. Raw client IP addresses are not sold or shared with
              advertising networks.
            </p>
          </div>

          <div className="rounded-2xl border border-brand-border bg-background-card p-7 space-y-3">
            <h2 className="font-display text-xl font-bold text-text-primary">
              4. Data Retention & Deletion Requests
            </h2>
            <p>
              Enquiry records are retained solely for scoping and communicating regarding your
              requested security or software engineering engagement. You may request deletion of your
              enquiry record at any time by referencing your enquiry identifier (`CC-YYYY-XXXX`).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
