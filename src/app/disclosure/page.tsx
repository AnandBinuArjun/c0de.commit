import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Responsible Disclosure Policy",
  description: "How to report a security issue or a research correction to CODE.COMMIT, what we ask of reporters, and what you can expect from us.",
};

const SECTIONS = [
  {
    title: "Scope",
    body: [
      "This policy covers the CODE.COMMIT website and the public repositories published at " + SITE_CONFIG.githubProfileUrl + ".",
      "Third-party services we use are governed by their own disclosure programmes.",
    ],
  },
  {
    title: "What we ask of you",
    body: [
      "Test only against accounts and data you own, and stop as soon as you have demonstrated the issue.",
      "Do not access, modify or retain other people's data, and do not degrade the service (no denial-of-service or volumetric testing).",
      "Do not send live exploit payloads, credentials or personal data through our public forms.",
      "Give us a reasonable period to fix the issue before sharing details publicly.",
    ],
  },
  {
    title: "What to include",
    body: [
      "A description of the issue and its impact, the affected URL or repository, and clear steps to reproduce.",
      "Any proof-of-concept that is safe to share, and how you would like to be credited, if at all.",
    ],
  },
  {
    title: "What you can expect",
    body: [
      "We will acknowledge your report and keep you informed as we investigate.",
      "We will not pursue action against good-faith research that follows this policy.",
      "We do not run a paid bounty programme. With your permission, we will credit you.",
    ],
  },
  {
    title: "Research corrections",
    body: [
      "If you believe a research brief is inaccurate, tell us. Briefs are marked with their status, and we correct errors openly.",
    ],
  },
];

export default function DisclosurePage() {
  return (
    <div className="space-y-0">
      <section className="surface-technical border-b border-brand-border/70 py-16 lg:py-20">
        <div className="container mx-auto max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-background-elevated px-3.5 py-1 font-mono text-xs text-brand-primary">
            <ShieldCheck className="h-3.5 w-3.5" /> [ RESPONSIBLE DISCLOSURE ]
          </div>
          <h1 className="text-hero-display font-display font-bold text-text-primary">Report a security issue</h1>
          <p className="max-w-3xl text-lg text-text-secondary">
            We welcome good-faith reports. Our machine-readable policy is available at{" "}
            <a href="/.well-known/security.txt" className="text-brand-primary hover:underline">/.well-known/security.txt</a>.
          </p>
        </div>
      </section>
      <section className="bg-background py-14 lg:py-20">
        <div className="container mx-auto max-w-4xl space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title} className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-text-primary">{s.title}</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                {s.body.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
          ))}
          <div className="surface-glass space-y-3 rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold text-text-primary">How to reach us</h2>
            <p className="text-sm text-text-secondary">
              Use the <Link href="/contact" className="text-brand-primary hover:underline">contact form</Link> or email{" "}
              <a href="mailto:security@codecommit.sec" className="text-brand-primary hover:underline">security@codecommit.sec</a>.
            </p>
            <p className="font-mono text-xs text-text-muted">
              No PGP key is published yet. If you need to share sensitive details, say so in your first message and we will arrange an encrypted channel.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
