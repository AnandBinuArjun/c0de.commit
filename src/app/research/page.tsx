import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert, Layers, Rss } from "lucide-react";
import { RESEARCH_ARTICLES, RESEARCH_CATEGORIES } from "@/data/research";
import { ResearchFilterFeed } from "@/components/research/research-filter-feed";
import { MitreAttackMatrixExplorer } from "@/components/research/mitre-attack-matrix-explorer";

export const metadata: Metadata = {
  title: "Security Research Laboratory — MITRE ATT&CK & Architecture Briefs",
  description:
    "CODE.COMMIT Technical Security Research Lab covering Threat Intelligence, IoT Security, Malware Analysis, Cloud Security, Digital Forensics, and Secure Development.",
};

export default function ResearchIndexPage() {
  return (
    <div className="space-y-0">
      {/* Header */}
      <section className="border-b border-brand-border/70 bg-technical-grid py-16 lg:py-24">
        <div className="container mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-background-elevated px-3.5 py-1 font-mono text-xs text-brand-primary">
              <span>[ SECURITY RESEARCH LABORATORY ]</span>
            </div>
            <a
              href="/feed.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-brand-border bg-background-elevated px-3.5 py-1.5 font-mono text-xs text-brand-primary hover:border-brand-primary"
            >
              <Rss className="h-3.5 w-3.5" />
              <span>RSS / Atom Feed (/feed.xml)</span>
            </a>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Applied security engineering, telemetry analysis & MITRE ATT&CK briefs.
          </h1>
          <p className="max-w-3xl text-lg text-text-secondary">
            Technical documentation and working research briefs derived from our open-source
            platforms (`CloudSentinel`, `AegisFlow`, `SENTINEL-IoT`, `RANSOMWATCH`, `Threat
            Intelligence CTI Analysis`, and `TOTAL ENTITY`).
          </p>
          <div className="max-w-3xl rounded-xl border border-status-warning/40 bg-status-warning/10 p-4 text-xs text-text-primary">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-status-warning" />
              <div>
                <span className="font-mono font-bold text-status-warning">
                  RESEARCH INTEGRITY POLICY:{" "}
                </span>
                <span>
                  Working research briefs are explicitly marked as{" "}
                  <code className="text-status-warning">DRAFT BRIEF</code>. We never fabricate
                  CVE identifiers or present unverified findings as completed advisories.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive MITRE ATT&CK Coverage Matrix */}
      <section className="border-b border-brand-border/60 bg-background py-14">
        <div className="container mx-auto">
          <MitreAttackMatrixExplorer />
        </div>
      </section>

      {/* Categories Directory */}
      <section className="border-b border-brand-border/60 bg-background-secondary py-14">
        <div className="container mx-auto space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-primary">
            <Layers className="h-4 w-4" />
            <span>Research Lab Categories (8 Disciplines)</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RESEARCH_CATEGORIES.map((cat) => {
              const count = RESEARCH_ARTICLES.filter((a) => a.categorySlug === cat.slug).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/research/categories/${cat.slug}`}
                  className="group rounded-xl border border-brand-border bg-background-card p-5 transition-all hover:border-brand-primary/60 hover:shadow-neon-sm space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-base font-bold text-text-primary group-hover:text-brand-primary">
                      {cat.name}
                    </h2>
                    <span className="rounded bg-brand-deep px-2 py-0.5 font-mono text-[10px] text-brand-primary">
                      {count} {count === 1 ? "brief" : "briefs"}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-text-secondary">
                    {cat.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Searchable Articles Feed */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto space-y-8">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              [ WORKING RESEARCH PUBLICATIONS ]
            </p>
            <h2 className="font-display text-3xl font-bold text-text-primary">
              Search & Filter Technical Briefs
            </h2>
          </div>

          <ResearchFilterFeed
            articles={RESEARCH_ARTICLES}
            categories={RESEARCH_CATEGORIES}
          />
        </div>
      </section>
    </div>
  );
}
