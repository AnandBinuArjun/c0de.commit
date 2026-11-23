import React from "react";
import type { Metadata } from "next";
import { PROJECTS_DATA } from "@/data/projects";
import { ProjectFilterGrid } from "@/components/projects/project-filter-grid";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Engineering Portfolio & GitHub Systems",
  description:
    "Explore verified cybersecurity and software engineering builds by Anand Binu Arjun including SENTINEL-IoT, CloudSentinel, Threat Intelligence CTI Analysis, and TOTAL ENTITY.",
};

export default function WorkIndexPage() {
  return (
    <div className="space-y-0">
      <section className="border-b border-brand-border/70 bg-technical-grid py-16 lg:py-24">
        <div className="container mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-background-elevated px-3.5 py-1 font-mono text-xs text-brand-primary">
            <span>[ ENGINEERING WORK & GITHUB PORTFOLIO ]</span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Verified security systems, research tools, and architecture builds.
          </h1>
          <p className="max-w-3xl text-lg text-text-secondary">
            Direct engineering portfolio backed by{" "}
            <a
              href={SITE_CONFIG.githubProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-brand-primary underline"
            >
              github.com/AnandBinuArjun
            </a>
            . Filter by security domain or technology stack below, and inspect each system&apos;s
            implemented features alongside its roadmap.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto">
          <ProjectFilterGrid projects={PROJECTS_DATA} baseRoute="/work" />
        </div>
      </section>
    </div>
  );
}
