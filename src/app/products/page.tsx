import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitBranch } from "lucide-react";
import { getProductProjects, PROJECTS_DATA } from "@/data/projects";
import { ProductLogo } from "@/components/layout/brand-logo";
import { ProjectFilterGrid } from "@/components/projects/project-filter-grid";

export const metadata: Metadata = {
  title: "Security Engineering Products & Platforms — CloudSentinel & SENTINEL-IoT",
  description:
    "Explore CODE.COMMIT flagship security platforms including CloudSentinel (hybrid AWS & Azure security posture) and SENTINEL-IoT.",
};

export default function ProductsIndexPage() {
  const products = getProductProjects();
  const cloudSentinel = PROJECTS_DATA.find((p) => p.slug === "cloudsentinel");

  return (
    <div className="space-y-0">
      <section className="border-b border-brand-border/70 bg-technical-grid py-16 lg:py-24">
        <div className="container mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-background-elevated px-3.5 py-1 font-mono text-xs text-brand-primary">
            <span>[ SECURITY PLATFORMS & PRODUCTS ]</span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Purpose-built platforms for cloud defence, IoT telemetry, and digital safety.
          </h1>
          <p className="max-w-3xl text-lg text-text-secondary">
            Engineered around deterministic posture verification, isolated sensor networks, and
            human-governed remediation workflows.
          </p>
        </div>
      </section>

      {/* Flagship Spotlight: CloudSentinel */}
      {cloudSentinel && (
        <section className="border-b border-brand-border/60 bg-background-secondary py-16 lg:py-20">
          <div className="container mx-auto">
            <div className="rounded-3xl border border-brand-primary/40 bg-background-card p-8 shadow-neon-sm sm:p-12 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <ProductLogo
                  productName="CloudSentinel"
                  assetPath="/products/cloudsentinel-logo.png"
                />
                <span className="rounded-full border border-brand-primary/40 bg-brand-deep px-3.5 py-1 font-mono text-xs text-brand-primary">
                  FLAGSHIP HYBRID CLOUD PLATFORM · AWS & MICROSOFT AZURE
                </span>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-4">
                  <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
                    {cloudSentinel.name}
                  </h2>
                  <p className="text-base leading-relaxed text-text-secondary">
                    {cloudSentinel.solutionOverview}
                  </p>
                  <div className="rounded-xl border border-brand-border bg-background-elevated p-4 font-mono text-xs text-text-secondary">
                    <span className="text-brand-primary font-bold">Repository Status: </span>
                    <span>{cloudSentinel.githubVerificationNote}</span>
                  </div>
                  <div className="pt-2 flex flex-wrap gap-4">
                    <Link
                      href="/products/cloudsentinel"
                      className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-6 py-3 text-sm font-semibold text-background hover:bg-brand-secondary"
                    >
                      <span>Inspect CloudSentinel Architecture</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href={cloudSentinel.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-brand-border bg-background-elevated px-5 py-3 text-sm font-semibold text-text-primary hover:border-brand-primary"
                    >
                      <GitBranch className="h-4 w-4 text-brand-primary" />
                      <span>github.com/AnandBinuArjun/cloundsentinel</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-2xl border border-brand-border bg-background-elevated p-6 space-y-3">
                  <p className="font-mono text-xs uppercase tracking-wider text-brand-primary">
                    Core Platform Modules
                  </p>
                  <ul className="space-y-2.5 text-xs text-text-primary font-mono">
                    <li className="rounded border border-brand-border bg-background-card px-3 py-2">
                      01 · Multi-Cloud Asset Discovery (AWS & Azure)
                    </li>
                    <li className="rounded border border-brand-border bg-background-card px-3 py-2">
                      02 · Security Posture & Drift Evaluation
                    </li>
                    <li className="rounded border border-brand-border bg-background-card px-3 py-2">
                      03 · Contextual Risk & Blast-Radius Scoring
                    </li>
                    <li className="rounded border border-brand-border bg-background-card px-3 py-2">
                      04 · Approval-Gated Remediation Engine
                    </li>
                    <li className="rounded border border-brand-border bg-background-card px-3 py-2">
                      05 · Compliance Control & Evidence Reporting
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filterable Product Catalog */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto space-y-8">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              [ PRODUCT DIRECTORY ]
            </p>
            <h2 className="font-display text-3xl font-bold text-text-primary">
              All Flagship Security Platforms
            </h2>
          </div>

          <ProjectFilterGrid projects={products} baseRoute="/products" />
        </div>
      </section>
    </div>
  );
}
