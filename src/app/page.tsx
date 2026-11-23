import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Crosshair,
  ShieldCheck,
  FileSearch,
  CloudCog,
  Siren,
  TerminalSquare,
  CheckCircle2,
  GitBranch,
  Shield,
  Wrench,
  Layers,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SERVICES_DATA } from "@/data/services";
import { PROJECTS_DATA } from "@/data/projects";
import { HeroTriadVisualizer } from "@/components/home/hero-triad-visualizer";
import { EngineeringPillars } from "@/components/home/engineering-pillars";
import { PortfolioInteractiveShowcase } from "@/components/home/portfolio-interactive-showcase";
import { TriadEngineeringWorkbench } from "@/components/home/triad-engineering-workbench";
import { ResearchTopicNetwork } from "@/components/home/research-topic-network";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { TechStackIcon } from "@/components/home/tech-stack-icons";
import { FadeInSection } from "@/components/animations/fade-in-section";
import { ProductLogo } from "@/components/layout/brand-logo";

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Crosshair,
  ShieldCheck,
  FileSearch,
  CloudCog,
  Siren,
  TerminalSquare,
};

const TECHNOLOGY_CAPABILITY_GROUPS = [
  {
    code: "CAPABILITY // 01",
    title: "SECURITY ENGINEERING",
    description:
      "Linux, Python, cloud security tooling, detection engineering and secure testing workflows.",
    technologies: [
      { name: "Linux", role: "Hardened Host, Kernel & Sensor Runtime" },
      { name: "Python", role: "Offensive Automation, CTI & DFIR Tooling" },
      { name: "AWS", role: "STS Read-Only Discovery, IAM, VPC & CloudTrail" },
      { name: "Microsoft Azure", role: "Entra ID, Managed Identities & Defender Posture" },
    ],
  },
  {
    code: "CAPABILITY // 02",
    title: "SOFTWARE ENGINEERING",
    description:
      "TypeScript, React, Next.js, FastAPI, PostgreSQL and memory-safe API architecture.",
    technologies: [
      { name: "TypeScript", role: "Strict Type-Safe Full-Stack Architecture" },
      { name: "React", role: "Interactive Telemetry & Control-Plane UI" },
      { name: "Next.js", role: "App Router, Server Actions & Edge Headers" },
      { name: "FastAPI", role: "High-Assurance Async Python Microservices" },
      { name: "PostgreSQL", role: "Relational Data, Graph Storage & Row-Level Security" },
    ],
  },
  {
    code: "CAPABILITY // 03",
    title: "RESEARCH & INFRASTRUCTURE",
    description:
      "Docker, cloud platforms, data analysis, threat intelligence and experimental security systems.",
    technologies: [
      { name: "Docker", role: "Egress-Isolated Sandbox & Honeypot Containers" },
      { name: "GitHub Actions", role: "Automated SAST, SARIF & CI/CD Security Gates" },
    ],
  },
] as const;

export default function HomePage() {
  const cloudSentinel = PROJECTS_DATA.find((p) => p.slug === "cloudsentinel");
  const featuredPentestService =
    SERVICES_DATA.find((s) => s.slug === "penetration-testing") || SERVICES_DATA[0];
  const otherServices = SERVICES_DATA.filter((s) => s.slug !== "penetration-testing");

  return (
    <div className="space-y-0">
      {/* =====================================================================
          SECTION 01 — CINEMATIC EDITORIAL HERO (Surface A: Open Editorial)
         ===================================================================== */}
      <section className="surface-editorial section-divider relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32">
        <div className="pointer-events-none absolute inset-0 bg-technical-grid-masked" />

        <div className="container relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
            {/* Left Side (~52% / 6 Cols): Editorial Brand Statement */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-border/70 bg-background-elevated/80 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_#00F58A]" />
                  <span>INDEPENDENT SECURITY &amp; SOFTWARE ENGINEERING STUDIO</span>
                </div>

                <h1 className="font-display text-hero-display font-bold text-text-primary">
                  We break systems.
                  <br />
                  <span className="bg-gradient-to-r from-brand-primary via-[#69FFB8] to-brand-secondary bg-clip-text text-transparent">
                    We build better ones.
                  </span>
                </h1>

                <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.26em] text-brand-primary">
                  SECURITY × SOFTWARE × RESEARCH
                </p>

                <p className="max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg lg:text-xl">
                  From adversarial security testing and secure software engineering to cloud defence
                  and original research, CODE.COMMIT transforms complex technical challenges into
                  resilient digital systems.
                </p>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/services"
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-brand-primary px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-background transition-all hover:bg-brand-secondary"
                >
                  <span>Explore Our Expertise</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/work"
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl border border-brand-border/80 bg-background-card/75 px-7 py-4 text-xs sm:text-sm font-semibold text-text-primary transition-all hover:border-brand-primary/60 hover:text-brand-primary"
                >
                  <span>Discover Our Work</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              {/* Secondary Positioning Footnote */}
              <div className="border-t border-brand-border/40 pt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="font-mono text-xs tracking-wider text-text-secondary">
                  Research-driven. Engineering-led. Security-first.
                </p>
                <span className="font-mono text-xs text-text-muted">
                  [ SYSTEM ONLINE ] · {PROJECTS_DATA.length} VERIFIED REPOSITORIES
                </span>
              </div>
            </div>

            {/* Right Side (~48% / 6 Cols): Interactive 3-Layer Engineering Visualization */}
            <div className="lg:col-span-6">
              <HeroTriadVisualizer />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 02 — SECURITY × SOFTWARE × RESEARCH SHOWCASE
         ===================================================================== */}
      <section className="section-divider bg-background-secondary/60 py-20 sm:py-28">
        <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInSection className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl space-y-3">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
                01 // THE THREE STUDIO PILLARS
              </p>
              <h2 className="font-display text-section-display font-bold text-text-primary">
                Find vulnerabilities. Fix them. Build securely.
              </h2>
            </div>
            <p className="max-w-md text-sm sm:text-base leading-relaxed text-text-secondary">
              Select or focus any discipline panel below to explore how offensive verification,
              full-stack engineering, and original research operate together.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.06}>
            <EngineeringPillars />
          </FadeInSection>
        </div>
      </section>

      {/* =====================================================================
          SECTION 03 — SELECTED CAPABILITIES (BENTO SERVICES SHOWCASE)
         ===================================================================== */}
      <section className="section-divider bg-background py-20 sm:py-28">
        <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInSection className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl space-y-3">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
                02 // SELECTED CAPABILITIES &amp; SERVICES
              </p>
              <h2 className="font-display text-section-display font-bold text-text-primary">
                Authorised security assessments and custom software builds.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-brand-border/70 bg-background-card/80 px-5 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-text-primary hover:border-brand-primary hover:text-brand-primary transition-colors"
            >
              <span>View All 6 Service Specifications</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeInSection>

          {/* Varied Editorial Bento Grid: Featured 2x Card (Penetration Testing) + 5 Varied Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
            {/* Featured Service: Penetration Testing (Spans 8 Columns on Desktop) */}
            {featuredPentestService && (
              <FadeInSection className="lg:col-span-8">
                <article className="surface-immersive flex h-full flex-col justify-between rounded-3xl p-7 sm:p-10 space-y-8">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-brand-deep px-3.5 py-1 font-mono text-xs text-brand-primary">
                        <Crosshair className="h-3.5 w-3.5" />
                        <span>FEATURED CAPABILITY · OFFENSIVE SECURITY</span>
                      </div>

                      <h3 className="font-display text-2xl font-bold text-text-primary sm:text-4xl">
                        <Link
                          href={`/services/${featuredPentestService.slug}`}
                          className="hover:text-brand-primary transition-colors"
                        >
                          {featuredPentestService.title}
                        </Link>
                      </h3>

                      <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
                        {featuredPentestService.shortDescription}
                      </p>

                      <ul className="space-y-2 pt-1 text-xs sm:text-sm text-text-primary">
                        {featuredPentestService.deliverables.slice(0, 3).map((d) => (
                          <li key={d} className="flex items-center gap-2.5">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-primary" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Architectural Visual for Penetration Testing */}
                    <div className="lg:col-span-5">
                      <div className="rounded-2xl border border-brand-border/60 bg-[#040907]/90 p-4 space-y-3">
                        <div className="flex items-center justify-between font-mono text-[10px] text-brand-primary">
                          <span>AUTHORISED ROE METHODOLOGY</span>
                          <span>OWASP WSTG</span>
                        </div>
                        <svg
                          viewBox="0 0 260 135"
                          fill="none"
                          className="w-full h-32"
                          aria-hidden="true"
                        >
                          <rect x="12" y="18" width="70" height="28" rx="5" fill="#0B1710" stroke="#00F58A" strokeWidth="1.2" />
                          <text x="24" y="35" fill="#00F58A" fontSize="8.5" fontFamily="monospace">
                            01 RECON
                          </text>
                          <line x1="82" y1="32" x2="108" y2="32" stroke="#00F58A" strokeWidth="1.3" />
                          <rect x="108" y="18" width="138" height="28" rx="5" fill="#0B3824" stroke="#00F58A" strokeWidth="1.4" />
                          <text x="120" y="35" fill="#F3F8F5" fontSize="8.5" fontFamily="monospace">
                            02 MANUAL BOLA &amp; AUTH
                          </text>
                          <line x1="177" y1="46" x2="177" y2="78" stroke="#00F58A" strokeWidth="1.3" />
                          <rect x="108" y="78" width="138" height="32" rx="5" fill="#0B1710" stroke="#00F58A" strokeWidth="1.3" />
                          <text x="120" y="97" fill="#00F58A" fontSize="8.5" fontFamily="monospace">
                            03 POC &amp; RETEST SIGN
                          </text>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-brand-border/50 pt-5">
                    <Link
                      href={`/services/${featuredPentestService.slug}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-background hover:bg-brand-secondary transition-colors"
                    >
                      <span>Explore Penetration Testing</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/contact?service=${featuredPentestService.slug}`}
                      className="font-mono text-xs text-text-secondary hover:text-brand-primary"
                    >
                      Scope Authorised Engagement →
                    </Link>
                  </div>
                </article>
              </FadeInSection>
            )}

            {/* Supporting 5 Services in Varied Bento Spans (4 Cols / 4 Cols / 4 Cols / 4 Cols / 4 Cols) */}
            {otherServices.map((service, idx) => {
              const IconComponent = SERVICE_ICONS[service.iconName] || ShieldCheck;
              const colSpanClass = idx === 0 ? "lg:col-span-4" : "lg:col-span-3";

              return (
                <FadeInSection
                  key={service.slug}
                  delay={(idx + 1) * 0.04}
                  className={colSpanClass}
                >
                  <article className="surface-glass flex h-full flex-col justify-between rounded-3xl p-6 sm:p-7 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-primary/35 bg-brand-deep/70 text-brand-primary">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                          {service.capabilityGroup}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-display text-xl font-bold text-text-primary">
                          <Link
                            href={`/services/${service.slug}`}
                            className="hover:text-brand-primary transition-colors"
                          >
                            {service.shortTitle}
                          </Link>
                        </h3>
                        <p className="text-sm leading-relaxed text-text-secondary">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-brand-border/40 pt-4">
                      <Link
                        href={`/services/${service.slug}`}
                        className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-brand-primary"
                      >
                        <span>Explore Service</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 04 — FLAGSHIP PRODUCT SHOWCASE: CLOUDSENTINEL
         ===================================================================== */}
      {cloudSentinel && (
        <section className="section-divider bg-background-secondary/70 py-20 sm:py-28">
          <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-12">
            <FadeInSection className="space-y-3">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
                03 // FLAGSHIP PRODUCT SHOWCASE
              </p>
              <h2 className="font-display text-section-display font-bold text-text-primary">
                Security across clouds.{" "}
                <span className="text-brand-primary">Clarity across complexity.</span>
              </h2>
            </FadeInSection>

            <FadeInSection delay={0.06}>
              <div className="surface-immersive specular-top rounded-3xl p-7 sm:p-10 lg:p-12">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
                  {/* Left 6 Columns: Product Identity, Narrative & Actions */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                      <ProductLogo
                        productName="CloudSentinel"
                        assetPath="/products/cloudsentinel-logo.png"
                      />
                      <span className="rounded-full border border-brand-primary/40 bg-brand-deep px-3.5 py-1 font-mono text-xs text-brand-primary">
                        v1.0.0 VERIFIED · AWS &amp; MICROSOFT AZURE
                      </span>
                    </div>

                    <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
                      {cloudSentinel.solutionOverview}
                    </p>

                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {[
                        "AWS STS & Azure Managed Identity Discovery",
                        "18 Deterministic Cloud Posture Rules",
                        "9 MITRE ATT&CK Log Threat Detectors",
                        "Transparent 0–100 Contextual Risk Scoring",
                        "JSON / CSV / PDF Compliance Evidence Reports",
                        "Separation-of-Duties Approval-Gated Remediation",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2.5 rounded-xl border border-brand-border/50 bg-background/55 px-3.5 py-2.5 text-xs font-medium text-text-primary"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-primary" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
                      <Link
                        href="/products/cloudsentinel"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-background hover:bg-brand-secondary transition-colors"
                      >
                        <span>Explore CloudSentinel Platform</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <a
                        href={cloudSentinel.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-background-elevated px-5 py-3.5 font-mono text-xs text-text-primary hover:border-brand-primary"
                      >
                        <GitBranch className="h-4 w-4 text-brand-primary" />
                        <span>github.com/AnandBinuArjun/cloundsentinel</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Right 6 Columns: Layered Enterprise Console & Architecture Preview */}
                  <div className="lg:col-span-6">
                    <div className="rounded-2xl border border-brand-border/80 bg-[#040907]/95 p-5 shadow-2xl space-y-5">
                      {/* Console Window Header */}
                      <div className="flex items-center justify-between border-b border-brand-border/60 pb-3.5">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-brand-primary" />
                          <span className="font-mono text-xs font-bold text-text-primary">
                            CLOUDSENTINEL // PROOF-BEFORE-ACTION ENGINE
                          </span>
                        </div>
                        <span className="rounded bg-brand-deep px-2 py-0.5 font-mono text-[10px] text-brand-primary">
                          READ-ONLY DEFAULT
                        </span>
                      </div>

                      {/* 4-Stage Architecture Preview */}
                      <div className="space-y-3">
                        {cloudSentinel.architectureDiagram.nodes.map((node, idx) => (
                          <div
                            key={node.id}
                            className="flex items-start justify-between gap-4 rounded-xl border border-brand-border/60 bg-background-elevated/80 p-3.5"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] font-bold text-brand-primary">
                                  0{idx + 1} // {node.layer.toUpperCase()}
                                </span>
                              </div>
                              <h4 className="font-display text-sm font-bold text-text-primary">
                                {node.label}
                              </h4>
                              <p className="text-xs text-text-secondary">{node.detail}</p>
                            </div>
                            <span className="shrink-0 rounded border border-brand-border bg-background px-2 py-0.5 font-mono text-[10px] text-brand-primary">
                              VERIFIED
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 05 — SELECTED ENGINEERING WORK (INTERACTIVE PORTFOLIO RAIL)
         ===================================================================== */}
      <section className="section-divider bg-background py-20 sm:py-28">
        <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInSection className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl space-y-3">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
                04 // SELECTED ENGINEERING WORK
              </p>
              <h2 className="font-display text-section-display font-bold text-text-primary">
                Verified open-source platforms and security tooling.
              </h2>
              <p className="text-sm sm:text-base text-text-secondary">
                Select any system from the index below to inspect its architecture topology,
                verified repository capabilities, and technology stack.
              </p>
            </div>
            <Link
              href="/work"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-background hover:bg-brand-secondary transition-colors"
            >
              <span>Browse All {PROJECTS_DATA.length} GitHub Repositories</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeInSection>

          <FadeInSection delay={0.06}>
            <PortfolioInteractiveShowcase />
          </FadeInSection>
        </div>
      </section>

      {/* =====================================================================
          SECTION 06 — INSIDE THE ENGINEERING LAB (PROGRESSIVE WORKBENCH)
         ===================================================================== */}
      <section className="section-divider bg-background-secondary/70 py-20 sm:py-28">
        <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInSection className="max-w-3xl space-y-3">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
              05 // INSIDE THE ENGINEERING LAB
            </p>
            <h2 className="font-display text-section-display font-bold text-text-primary">
              Where threat analysis meets software execution.
            </h2>
            <p className="text-sm sm:text-base text-text-secondary">
              Explore how our three disciplines converge on real engineering challenges—from
              initial threat modeling to verified code implementation and published research.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.06}>
            <TriadEngineeringWorkbench />
          </FadeInSection>
        </div>
      </section>

      {/* =====================================================================
          SECTION 07 — RESEARCH & INTELLIGENCE (INTERACTIVE TOPIC NETWORK)
         ===================================================================== */}
      <section className="section-divider bg-background py-20 sm:py-28">
        <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInSection className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl space-y-3">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
                06 // RESEARCH &amp; INTELLIGENCE LABORATORY
              </p>
              <h2 className="font-display text-section-display font-bold text-text-primary">
                Independent technical research &amp; MITRE ATT&amp;CK analysis.
              </h2>
              <p className="text-sm sm:text-base text-text-secondary">
                Select a research node in the knowledge constellation or use the accessible
                discipline filters to inspect our working technical papers.
              </p>
            </div>
            <Link
              href="/research"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-brand-border bg-background-card px-5 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-text-primary hover:border-brand-primary hover:text-brand-primary"
            >
              <span>Enter Full Research Lab</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeInSection>

          <FadeInSection delay={0.06}>
            <ResearchTopicNetwork />
          </FadeInSection>
        </div>
      </section>

      {/* =====================================================================
          SECTION 08 — HOW WE WORK (CONNECTED 6-STAGE PROCESS)
         ===================================================================== */}
      <section className="section-divider bg-background-secondary/70 py-20 sm:py-28">
        <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInSection className="max-w-3xl space-y-3">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
              07 // HOW WE WORK
            </p>
            <h2 className="font-display text-section-display font-bold text-text-primary">
              Disciplined engineering from discovery to continuous evolution.
            </h2>
            <p className="text-sm sm:text-base text-text-secondary">
              Every engagement follows a transparent six-stage lifecycle with reproducible
              deliverables at every milestone.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.06}>
            <ProcessTimeline />
          </FadeInSection>
        </div>
      </section>

      {/* =====================================================================
          SECTION 09 — CURATED 3-PILLAR TECHNOLOGY & ENGINEERING STACK
         ===================================================================== */}
      <section className="section-divider bg-background py-20 sm:py-28">
        <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInSection className="max-w-3xl space-y-3">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
              08 // TECHNOLOGY &amp; ENGINEERING CAPABILITIES
            </p>
            <h2 className="font-display text-section-display font-bold text-text-primary">
              Curated instrumentation across security, software, and research.
            </h2>
            <p className="text-sm sm:text-base text-text-secondary">
              Organized by engineering discipline rather than a generic logo wall—reflecting the
              actual languages, runtimes, and cloud platforms used across our verified repositories.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {TECHNOLOGY_CAPABILITY_GROUPS.map((group, idx) => (
              <FadeInSection key={group.title} delay={idx * 0.06}>
                <div className="surface-glass flex h-full flex-col justify-between rounded-3xl p-7 sm:p-8 space-y-6">
                  <div className="space-y-3 border-b border-brand-border/50 pb-5">
                    <span className="font-mono text-xs font-bold tracking-wider text-brand-primary">
                      {group.code}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-text-primary">
                      {group.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {group.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {group.technologies.map((tech) => (
                      <div
                        key={tech.name}
                        className="group flex items-center gap-3.5 rounded-2xl border border-brand-border/45 bg-background/60 p-3.5 transition-colors hover:border-brand-primary/40"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-primary/30 bg-brand-deep/60 text-brand-primary">
                          <TechStackIcon name={tech.name} />
                        </div>
                        <div>
                          <h4 className="font-display text-sm font-bold text-text-primary">
                            {tech.name}
                          </h4>
                          <p className="text-xs text-text-secondary">{tech.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 10 — FINAL EDITORIAL CTA (Surface A + Surface D Accent)
         ===================================================================== */}
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-technical-grid-masked" />
        <div className="container relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="surface-immersive specular-top mx-auto max-w-5xl rounded-3xl p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-background-elevated px-3.5 py-1.5 font-mono text-xs text-brand-primary">
                  <Shield className="h-3.5 w-3.5" />
                  <span>INITIALIZE AN ENGAGEMENT</span>
                </div>

                <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-5xl">
                  Secure today. Build a safer tomorrow.
                </h2>

                <p className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
                  Have a security challenge or an engineering project? Let&apos;s define the scope
                  and build a practical solution.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-brand-primary px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-background transition-all hover:bg-brand-secondary"
                >
                  <span>Initialize Project</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-border bg-background-elevated px-6 py-4 text-xs sm:text-sm font-semibold text-text-primary hover:border-brand-primary"
                >
                  <span>Explore Service Scopes</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
