import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldAlert,
  Wrench,
  FileText,
  HelpCircle,
  Layers,
  GitBranch,
  BookOpen,
} from "lucide-react";
import type { ServiceItem } from "@/types";
import { PROJECTS_DATA } from "@/data/projects";
import { RESEARCH_ARTICLES } from "@/data/research";

interface ServiceDetailTemplateProps {
  service: ServiceItem;
}

export function ServiceDetailTemplate({ service }: ServiceDetailTemplateProps) {
  const relatedProjects = PROJECTS_DATA.filter((p) =>
    service.relatedProjectSlugs.includes(p.slug)
  );
  const relatedResearch = RESEARCH_ARTICLES.filter((r) =>
    service.relatedResearchSlugs.includes(r.slug)
  );

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    provider: {
      "@type": "Organization",
      name: "CODE.COMMIT",
    },
    serviceType: service.capabilityGroup,
  };

  return (
    <div className="space-y-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {/* 1. SERVICE HERO */}
      <section className="border-b border-brand-border/70 bg-technical-grid py-16 lg:py-24">
        <div className="container mx-auto space-y-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-brand-primary">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/services" className="hover:text-brand-primary">
                  Services
                </Link>
              </li>
              <li>/</li>
              <li className="text-brand-primary">{service.shortTitle}</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-background-elevated px-3.5 py-1 font-mono text-xs text-brand-primary">
            <span>[ {service.capabilityGroup} ]</span>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            {service.title}
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-text-secondary sm:text-xl">
            {service.tagline}
          </p>

          {service.legalNotice && (
            <div className="max-w-3xl rounded-xl border border-brand-primary/40 bg-brand-deep/40 p-4 text-xs leading-relaxed text-text-primary">
              <div className="flex items-start gap-2.5">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                <div>
                  <span className="font-mono font-bold text-brand-primary">
                    AUTHORISED ENGAGEMENT NOTICE:{" "}
                  </span>
                  <span>{service.legalNotice}</span>
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href={`/contact?service=${service.slug}`}
              className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-6 py-3.5 text-sm font-semibold text-background shadow-neon-sm hover:bg-brand-secondary transition-colors"
            >
              <span>Initialize {service.shortTitle} Scope</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-md border border-brand-border bg-background-card px-5 py-3.5 text-sm font-semibold text-text-primary hover:border-brand-primary"
            >
              <span>All Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM STATEMENT & 3. WHAT WE ASSESS OR DELIVER */}
      <section className="border-b border-brand-border/60 bg-background-secondary py-16 lg:py-20">
        <div className="container mx-auto space-y-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-4">
              <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
                [ 01 // PROBLEM STATEMENT ]
              </p>
              <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
                Why standard surface checks fall short.
              </h2>
              <p className="text-base leading-relaxed text-text-secondary">
                {service.problemStatement}
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
                [ 02 // WHAT WE ASSESS & DELIVER ]
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {service.whatWeAssessOrDeliver.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-brand-border bg-background-card p-5 space-y-2"
                  >
                    <h3 className="font-display text-lg font-bold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. METHODOLOGY & 5. ENGAGEMENT WORKFLOW */}
      <section className="border-b border-brand-border/60 bg-background py-16 lg:py-20">
        <div className="container mx-auto space-y-12">
          <div className="max-w-3xl space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              [ 03 // TECHNICAL METHODOLOGY ]
            </p>
            <h2 className="font-display text-3xl font-bold text-text-primary">
              Structured four-phase execution.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.methodology.map((step) => (
              <div
                key={step.phase}
                className="flex flex-col justify-between rounded-xl border border-brand-border bg-background-card p-6 space-y-4"
              >
                <div className="space-y-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded border border-brand-primary/50 bg-brand-deep font-mono text-xs font-bold text-brand-primary">
                    {step.phase}
                  </span>
                  <h3 className="font-display text-lg font-bold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 5. Engagement Workflow & 6. Deliverables & 7. Relevant Tools */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 pt-4">
            {/* Engagement Workflow */}
            <div className="rounded-2xl border border-brand-border bg-background-card p-6 space-y-4">
              <div className="flex items-center gap-2 text-brand-primary font-mono text-xs uppercase tracking-wider">
                <Layers className="h-4 w-4" />
                <span>Engagement Workflow</span>
              </div>
              <ol className="space-y-3 text-sm text-text-secondary">
                {service.engagementWorkflow.map((flow, index) => (
                  <li key={flow} className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-brand-primary">
                      0{index + 1}.
                    </span>
                    <span>{flow}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Deliverables */}
            <div className="rounded-2xl border border-brand-border bg-background-card p-6 space-y-4">
              <div className="flex items-center gap-2 text-brand-primary font-mono text-xs uppercase tracking-wider">
                <FileText className="h-4 w-4" />
                <span>Engineering Deliverables</span>
              </div>
              <ul className="space-y-3 text-sm text-text-primary">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools & Technologies */}
            <div className="rounded-2xl border border-brand-border bg-background-card p-6 space-y-4">
              <div className="flex items-center gap-2 text-brand-primary font-mono text-xs uppercase tracking-wider">
                <Wrench className="h-4 w-4" />
                <span>Relevant Tools & Standards</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {service.toolsAndTechnologies.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-brand-border bg-background-elevated px-3 py-1.5 font-mono text-xs text-text-primary"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RELATED PROJECTS OR RESEARCH */}
      <section className="border-b border-brand-border/60 bg-background-secondary py-16 lg:py-20">
        <div className="container mx-auto space-y-8">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              [ 04 // RELATED ENGINEERING SYSTEMS & RESEARCH ]
            </p>
            <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
              Supporting platforms and technical research briefs.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Related Projects */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted">
                Related Engineering Projects
              </h3>
              {relatedProjects.map((project) => (
                <div
                  key={project.slug}
                  className="rounded-xl border border-brand-border bg-background-card p-5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-brand-primary">
                      {project.category}
                    </span>
                    <span className="font-mono text-[11px] text-text-muted">
                      {project.statusLabel}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-text-primary">
                    <Link
                      href={project.isProduct ? `/products/${project.slug}` : `/work/${project.slug}`}
                      className="hover:text-brand-primary"
                    >
                      {project.name}
                    </Link>
                  </h4>
                  <p className="text-xs leading-relaxed text-text-secondary">
                    {project.shortDescription}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={project.isProduct ? `/products/${project.slug}` : `/work/${project.slug}`}
                      className="inline-flex items-center gap-1 font-mono text-xs text-brand-primary hover:underline"
                    >
                      <GitBranch className="h-3.5 w-3.5" />
                      <span>View Project Architecture</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Related Research */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted">
                Related Security Research
              </h3>
              {relatedResearch.map((article) => (
                <div
                  key={article.slug}
                  className="rounded-xl border border-brand-border bg-background-card p-5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-brand-primary">
                      {article.categoryName}
                    </span>
                    <span className="font-mono text-[11px] text-status-warning">
                      {article.statusLabel}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-text-primary">
                    <Link href={`/research/${article.slug}`} className="hover:text-brand-primary">
                      {article.title}
                    </Link>
                  </h4>
                  <p className="text-xs leading-relaxed text-text-secondary">
                    {article.summary}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/research/${article.slug}`}
                      className="inline-flex items-center gap-1 font-mono text-xs text-brand-primary hover:underline"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Read Research Brief</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="border-b border-brand-border/60 bg-background py-16 lg:py-20">
        <div className="container mx-auto max-w-4xl space-y-8">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              [ 05 // FREQUENTLY ASKED QUESTIONS ]
            </p>
            <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
              Scope, expectations & governance.
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-brand-border bg-background-card p-6 space-y-2"
              >
                <h3 className="flex items-start gap-2.5 font-display text-lg font-bold text-text-primary">
                  <HelpCircle className="mt-1 h-5 w-5 shrink-0 text-brand-primary" />
                  <span>{faq.question}</span>
                </h3>
                <p className="pl-7 text-sm leading-relaxed text-text-secondary">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. PROJECT ENQUIRY CTA */}
      <section className="bg-technical-grid py-20">
        <div className="container mx-auto max-w-4xl">
          <div className="rounded-2xl border border-brand-primary/40 bg-background-card p-8 text-center shadow-neon-sm sm:p-12 space-y-5">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              [ 06 // INITIALIZE ENGAGEMENT ]
            </span>
            <h2 className="font-display text-3xl font-bold text-text-primary">
              Ready to scope {service.shortTitle}?
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-text-secondary sm:text-base">
              Define your target systems, timeline, and engineering objectives. We respond with a
              structured scoping proposal and Rules of Engagement outline.
            </p>
            <div className="pt-2">
              <Link
                href={`/contact?service=${service.slug}`}
                className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-7 py-3.5 text-sm font-semibold text-background hover:bg-brand-secondary transition-colors"
              >
                <span>Initialize Project</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
