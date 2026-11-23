import React from "react";
import type { Metadata } from "next";
import { INSIGHTS_SERIES } from "@/data/insights";
import { SITE_CONFIG } from "@/config/site";
import { InsightsFilterCatalog } from "@/components/insights/insights-filter-catalog";

export const metadata: Metadata = {
  title: "Cybersecurity Education & Technical Insights (@c0de.commit Series)",
  description:
    "Explore the CODE.COMMIT 20-part educational curricula on Phishing & Social Engineering, Password Security & MFA, and Malware & Ransomware Defense.",
};

export default function InsightsIndexPage() {
  return (
    <div className="space-y-0">
      <section className="border-b border-brand-border/70 bg-technical-grid py-16 lg:py-24">
        <div className="container mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-background-elevated px-3.5 py-1 font-mono text-xs text-brand-primary">
            <span>[ CYBERSECURITY EDUCATION & INSIGHTS · {SITE_CONFIG.instagramHandle} ]</span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Structured security curricula from the CODE.COMMIT knowledge platform.
          </h1>
          <p className="max-w-3xl text-lg text-text-secondary">
            Hosting the three flagship 20-part educational series from{" "}
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-brand-primary underline"
            >
              {SITE_CONFIG.instagramHandle}
            </a>
            . Completed lessons include full threat explanations, realistic examples, and defensive
            engineering recommendations; upcoming slots are transparently structured as curriculum
            placeholders.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto">
          <InsightsFilterCatalog seriesList={INSIGHTS_SERIES} />
        </div>
      </section>
    </div>
  );
}
