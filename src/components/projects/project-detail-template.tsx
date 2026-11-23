import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  GitBranch,
  Lock,
  Layers,
  BookOpen,
  Terminal,
} from "lucide-react";
import type { ProjectItem } from "@/types";
import { RESEARCH_ARTICLES } from "@/data/research";
import { ProductLogo } from "@/components/layout/brand-logo";
import { InteractiveArchitectureTopology } from "@/components/projects/interactive-architecture-topology";

interface ProjectDetailTemplateProps {
  project: ProjectItem;
  sectionLabel?: "PRODUCTS" | "ENGINEERING WORK";
}

export function ProjectDetailTemplate({
  project,
  sectionLabel = "ENGINEERING WORK",
}: ProjectDetailTemplateProps) {
  const relatedResearch = RESEARCH_ARTICLES.filter((r) =>
    project.relatedResearchSlugs.includes(r.slug)
  );

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    applicationCategory: project.category,
    operatingSystem: "Cross-Platform (Linux, Docker, Cloud)",
    description: project.shortDescription,
    author: {
      "@type": "Person",
      name: "Anand Binu Arjun",
      url: "https://github.com/AnandBinuArjun",
    },
    codeRepository: project.githubUrl,
  };

  return (
    <div className="space-y-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      {/* HERO */}
      <section className="border-b border-brand-border/70 bg-technical-grid py-16 lg:py-24">
        <div className="container mx-auto space-y-6">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-brand-primary">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href={sectionLabel === "PRODUCTS" ? "/products" : "/work"}
                  className="hover:text-brand-primary"
                >
                  {sectionLabel === "PRODUCTS" ? "Products" : "Work"}
                </Link>
              </li>
              <li>/</li>
              <li className="text-brand-primary">{project.name}</li>
            </ol>
          </nav>

          {/* Product Logo Slot if defined (e.g. CloudSentinel) */}
          {project.logoSlot && (
            <div className="pt-1">
              <ProductLogo
                productName={project.logoSlot.productName}
                assetPath={project.logoSlot.requiredAssetPath}
              />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-brand-primary/40 bg-brand-deep px-3.5 py-1 font-mono text-xs text-brand-primary">
              [ {project.category.toUpperCase()} ]
            </span>
            <span className="rounded-full border border-brand-border bg-background-elevated px-3.5 py-1 font-mono text-xs text-text-secondary">
              STATUS: {project.statusLabel.toUpperCase()}
            </span>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            {project.name}
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-text-secondary sm:text-xl">
            {project.shortDescription}
          </p>

          {/* GitHub Verification Banner */}
          <div className="max-w-3xl rounded-xl border border-brand-border bg-background-card/90 p-4 font-mono text-xs text-text-secondary">
            <span className="font-bold text-brand-primary">[PORTFOLIO VERIFICATION NOTE]: </span>
            <span>{project.githubVerificationNote}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-6 py-3.5 text-sm font-semibold text-background shadow-neon-sm hover:bg-brand-secondary transition-colors"
            >
              <GitBranch className="h-4 w-4" />
              <span>Inspect GitHub Repository</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              href={`/contact?project=${project.slug}`}
              className="inline-flex items-center gap-2 rounded-md border border-brand-border bg-background-card px-6 py-3.5 text-sm font-semibold text-text-primary hover:border-brand-primary"
            >
              <span>Request Architecture Briefing</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PROBLEM & SOLUTION */}
      <section className="border-b border-brand-border/60 bg-background-secondary py-16 lg:py-20">
        <div className="container mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-brand-border bg-background-card p-8 space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              [ 01 // PROBLEM BEING ADDRESSED ]
            </p>
            <h2 className="font-display text-2xl font-bold text-text-primary">
              Operational & security challenge
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              {project.problemStatement}
            </p>
          </div>

          <div className="rounded-2xl border border-brand-border bg-background-card p-8 space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              [ 02 // SOLUTION OVERVIEW ]
            </p>
            <h2 className="font-display text-2xl font-bold text-text-primary">
              Engineering design & architecture approach
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              {project.solutionOverview}
            </p>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE DIAGRAM & DATA FLOWS */}
      <section className="border-b border-brand-border/60 bg-background py-16 lg:py-20">
        <div className="container mx-auto space-y-10">
          <div className="max-w-3xl space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              [ 03 // SYSTEM ARCHITECTURE DIAGRAM ]
            </p>
            <h2 className="font-display text-3xl font-bold text-text-primary">
              Component topology and execution pipeline.
            </h2>
          </div>

          <InteractiveArchitectureTopology
            projectName={project.name}
            nodes={project.architectureDiagram.nodes}
            flows={project.architectureDiagram.flows}
            securityConsiderations={project.securityConsiderations}
          />
        </div>
      </section>

      {/* IMPLEMENTED FEATURES VS PLANNED ROADMAP + SECURITY CONSIDERATIONS */}
      <section className="border-b border-brand-border/60 bg-background-secondary py-16 lg:py-20">
        <div className="container mx-auto space-y-10">
          <div className="max-w-3xl space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              [ 04 // CAPABILITY VERIFICATION & SECURITY ]
            </p>
            <h2 className="font-display text-3xl font-bold text-text-primary">
              Implemented features vs. planned roadmap.
            </h2>
            <p className="text-sm text-text-secondary">
              In compliance with CODE.COMMIT engineering transparency standards, verified capabilities
              are explicitly separated from planned development work.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Implemented */}
            <div className="rounded-2xl border border-brand-primary/40 bg-background-card p-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
                <CheckCircle2 className="h-4 w-4" />
                <span>Implemented & Verified</span>
              </div>
              <ul className="space-y-3 text-sm text-text-primary">
                {project.implementedFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Planned */}
            <div className="rounded-2xl border border-brand-border bg-background-card p-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-status-warning">
                <Clock className="h-4 w-4" />
                <span>Planned Architecture Roadmap</span>
              </div>
              <ul className="space-y-3 text-sm text-text-secondary">
                {project.plannedFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-status-warning" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Security Considerations */}
            <div className="rounded-2xl border border-brand-border bg-background-card p-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-status-info">
                <Lock className="h-4 w-4" />
                <span>Security Controls & Isolation</span>
              </div>
              <ul className="space-y-3 text-sm text-text-secondary">
                {project.securityConsiderations.map((sec) => (
                  <li key={sec} className="flex items-start gap-2.5">
                    <Lock className="mt-0.5 h-4 w-4 shrink-0 text-status-info" />
                    <span>{sec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK, INTERFACE TELEMETRY PREVIEW & RELATED RESEARCH */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container mx-auto space-y-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Technology Stack */}
            <div className="lg:col-span-5 rounded-2xl border border-brand-border bg-background-card p-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-primary">
                <Terminal className="h-4 w-4" />
                <span>Technology Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-brand-border bg-background-elevated px-3.5 py-2 font-mono text-xs text-text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Research */}
            <div className="lg:col-span-7 rounded-2xl border border-brand-border bg-background-card p-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-primary">
                <BookOpen className="h-4 w-4" />
                <span>Related Research Briefs</span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {relatedResearch.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/research/${article.slug}`}
                    className="group rounded-xl border border-brand-border bg-background-elevated p-4 transition-colors hover:border-brand-primary"
                  >
                    <span className="font-mono text-[10px] text-brand-primary">
                      {article.categoryName}
                    </span>
                    <h3 className="mt-1 font-display text-sm font-bold text-text-primary group-hover:text-brand-primary">
                      {article.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
