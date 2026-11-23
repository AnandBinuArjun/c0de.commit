"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  GitBranch,
  CheckCircle2,
  Layers,
  Shield,
} from "lucide-react";
import { PROJECTS_DATA } from "@/data/projects";
import { cn } from "@/lib/utils";

const SUPPORTING_PROJECT_SLUGS = [
  "sentinel-iot",
  "aegisflow",
  "total-entity-exposure-monitor",
  "vulnerability-management-platform",
  "threat-intelligence-cti-analysis",
  "ml-data-driven-forensic-automation",
] as const;

export function PortfolioInteractiveShowcase() {
  const supportingProjects = SUPPORTING_PROJECT_SLUGS.map((slug) =>
    PROJECTS_DATA.find((p) => p.slug === slug)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const [selectedSlug, setSelectedSlug] = useState<string>(
    supportingProjects[0]?.slug || "sentinel-iot"
  );

  const activeProject =
    supportingProjects.find((p) => p.slug === selectedSlug) || supportingProjects[0];

  if (!activeProject) return null;

  const detailHref = activeProject.isProduct
    ? `/products/${activeProject.slug}`
    : `/work/${activeProject.slug}`;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
      {/* Left 5 Columns: Interactive Project Index / Selection Rail */}
      <div
        role="tablist"
        aria-label="Selected Engineering Portfolio Index"
        className="lg:col-span-5 flex flex-col justify-between gap-2.5"
      >
        {supportingProjects.map((proj, idx) => {
          const isSelected = proj.slug === activeProject.slug;
          return (
            <button
              key={proj.slug}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedSlug(proj.slug)}
              className={cn(
                "group flex items-center justify-between rounded-2xl border p-4 sm:p-5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                isSelected
                  ? "surface-immersive border-brand-primary/50"
                  : "surface-glass opacity-80 hover:opacity-100"
              )}
            >
              <div className="flex items-start gap-4 min-w-0">
                <span
                  className={cn(
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-mono text-xs font-bold transition-colors",
                    isSelected
                      ? "border-brand-primary bg-brand-primary text-background"
                      : "border-brand-border bg-background-elevated text-brand-primary"
                  )}
                >
                  0{idx + 1}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-brand-primary">
                      {proj.category}
                    </span>
                  </div>
                  <h3 className="mt-0.5 truncate font-display text-base sm:text-lg font-bold text-text-primary group-hover:text-brand-primary transition-colors">
                    {proj.name}
                  </h3>
                </div>
              </div>
              <ArrowRight
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform",
                  isSelected
                    ? "text-brand-primary translate-x-1"
                    : "text-text-muted group-hover:text-text-primary"
                )}
              />
            </button>
          );
        })}
      </div>

      {/* Right 7 Columns: Active Project Visual & Architectural Preview Stage */}
      <div className="lg:col-span-7">
        <div className="surface-immersive flex h-full flex-col justify-between rounded-3xl p-7 sm:p-10 space-y-8">
          <div className="space-y-6">
            {/* Top Status & Category Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-border/50 pb-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full border border-brand-primary/40 bg-brand-deep px-3.5 py-1 font-mono text-xs text-brand-primary">
                  {activeProject.category}
                </span>
                <span className="rounded-full border border-brand-border bg-background-elevated px-3 py-1 font-mono text-[11px] text-text-secondary">
                  {activeProject.statusLabel}
                </span>
              </div>
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-brand-border bg-background-elevated px-3.5 py-2 font-mono text-xs text-text-primary hover:border-brand-primary hover:text-brand-primary transition-colors"
              >
                <GitBranch className="h-3.5 w-3.5 text-brand-primary" />
                <span>GitHub Repository</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Title & Solution Summary */}
            <div className="space-y-3">
              <h3 className="font-display text-2xl font-bold text-text-primary sm:text-4xl">
                {activeProject.name}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
                {activeProject.solutionOverview}
              </p>
            </div>

            {/* Interactive 4-Node Architecture Pipeline Visual */}
            <div className="rounded-2xl border border-brand-border/60 bg-[#040907]/90 p-5 space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="inline-flex items-center gap-2 text-brand-primary font-bold">
                  <Layers className="h-4 w-4" />
                  <span>SYSTEM ARCHITECTURE TOPOLOGY</span>
                </span>
                <span className="text-[11px] text-text-muted">4-STAGE PIPELINE</span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {activeProject.architectureDiagram.nodes.map((node, nIdx) => (
                  <div
                    key={node.id}
                    className="rounded-xl border border-brand-border/60 bg-background-elevated/80 p-3.5 space-y-1"
                  >
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-brand-primary font-bold">
                        0{nIdx + 1} // {node.layer.toUpperCase()}
                      </span>
                    </div>
                    <p className="font-display text-xs sm:text-sm font-bold text-text-primary">
                      {node.label}
                    </p>
                    <p className="text-[11px] leading-relaxed text-text-secondary">
                      {node.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Implemented Features */}
            <div className="space-y-2.5">
              <p className="font-mono text-xs uppercase tracking-wider text-brand-primary">
                Verified Repository Capabilities
              </p>
              <ul className="space-y-2">
                {activeProject.implementedFeatures.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-text-primary"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Stack & Action Bar */}
          <div className="space-y-5 border-t border-brand-border/50 pt-6">
            <div className="flex flex-wrap items-center gap-2">
              {activeProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-brand-border/70 bg-background-elevated px-3 py-1 font-mono text-xs text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                href={detailHref}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-background hover:bg-brand-secondary transition-colors"
              >
                <span>Inspect Full Project Blueprint</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
                <Shield className="h-3.5 w-3.5 text-brand-primary" />
                <span>Verified on github.com/AnandBinuArjun</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
