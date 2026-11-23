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
  BookOpen,
  Shield,
  Wrench,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SERVICES_DATA } from "@/data/services";
import { PROJECTS_DATA, getFeaturedProjects } from "@/data/projects";
import { RESEARCH_ARTICLES } from "@/data/research";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { SecurityTelemetryConsole } from "@/components/home/security-telemetry-console";
import { TechStackIcon } from "@/components/home/tech-stack-icons";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FadeInSection } from "@/components/animations/fade-in-section";
import { BrandLogo, ProductLogo } from "@/components/layout/brand-logo";

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Crosshair,
  ShieldCheck,
  FileSearch,
  CloudCog,
  Siren,
  TerminalSquare,
};

const CORE_CAPABILITIES = [
  {
    code: "DISCIPLINE // 01",
    category: "OFFENSIVE SECURITY",
    subtitle: "Authorised Adversarial Verification",
    description:
      "Manual-first offensive evaluations designed to uncover chained business-logic flaws, authentication bypasses, and privilege escalation paths before adversaries do.",
    items: [
      "Penetration testing",
      "Vulnerability assessments",
      "Application security testing",
    ],
    badge: "OWASP WSTG · PTES",
    href: "/services/penetration-testing",
  },
  {
    code: "DISCIPLINE // 02",
    category: "DEFENSIVE ENGINEERING",
    subtitle: "Resilient Posture & Detection",
    description:
      "Multi-cloud security architecture, IAM blast-radius reduction, and deterministic telemetry pipelines across AWS, Microsoft Azure, and Linux infrastructure.",
    items: [
      "Cloud security",
      "Security posture assessments",
      "Detection engineering",
    ],
    badge: "CIS · NIST · MITRE ATT&CK",
    href: "/services/cloud-security",
  },
  {
    code: "DISCIPLINE // 03",
    category: "SECURE DEVELOPMENT",
    subtitle: "Defence-in-Depth Software Systems",
    description:
      "Full-stack engineering of high-assurance web platforms, APIs, and custom security control planes built with strict schema validation and least privilege.",
    items: [
      "Secure web applications",
      "API engineering",
      "Security-focused systems",
    ],
    badge: "OWASP ASVS LEVEL 2+",
    href: "/services/secure-development",
  },
] as const;

const CURATED_TECH_STACK = [
  { name: "Python", code: "PY-3.12", role: "Security Automation, CTI & DFIR" },
  { name: "TypeScript", code: "TS-5.7", role: "Strict Type-Safe Engineering" },
  { name: "React", code: "UI-19", role: "Interactive Telemetry Interfaces" },
  { name: "Next.js", code: "NXT-16", role: "App Router & Server Architecture" },
  { name: "FastAPI", code: "API-ASYNC", role: "High-Assurance Python APIs" },
  { name: "PostgreSQL", code: "PG-16+RLS", role: "Relational Data & Graph Storage" },
  { name: "Docker", code: "OCI-SANDBOX", role: "Isolated Workload Containment" },
  { name: "Linux", code: "KERNEL-SEC", role: "Hardened Host & Sensor Runtime" },
  { name: "AWS", code: "STS-OIDC", role: "IAM, CloudTrail, VPC & KMS Security" },
  { name: "Microsoft Azure", code: "ENTRA-RBAC", role: "Entra ID, Defender & NSG Posture" },
  { name: "GitHub Actions", code: "CI-SAST", role: "DevSecOps CI/CD Security Gates" },
] as const;

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const featuredResearch = RESEARCH_ARTICLES.slice(0, 6);
  const cloudSentinel = PROJECTS_DATA.find((p) => p.slug === "cloudsentinel");

  return (
    <div className="space-y-0">
      {/* SECTION 2 — FLAGSHIP STUDIO HERO */}
      <section className="section-divider relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24">
        {/* Masked Architectural Grid + Ambient Studio Glow */}
        <div className="pointer-events-none absolute inset-0 bg-technical-grid-masked" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-radial-glow" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Left Column: Editorial Authority, Clear Hierarchy & Metrics */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-7 sm:space-y-8">
              <div className="space-y-6">
                {/* System Eyebrow Pill */}
                <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-primary/40 bg-background-elevated/90 px-3.5 py-1.5 font-mono text-[11px] sm:text-xs tracking-wider text-brand-primary shadow-neon-sm">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
                  </span>
                  <span>[ SYSTEM ONLINE ] — SECURITY ENGINEERING</span>
                </div>

                {/* Primary Headline with Fluid Clamp Typography */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                    <span className="text-brand-primary">{SITE_CONFIG.brandStatement}</span>
                    <span>//</span>
                    <span>{SITE_CONFIG.alternativePositioning}</span>
                  </div>

                  <h1 className="font-display text-[2.35rem] font-bold leading-[1.05] tracking-tight text-text-primary sm:text-5xl md:text-6xl xl:text-[4.25rem]">
                    Find vulnerabilities.
                    <br />
                    <span className="bg-gradient-to-r from-brand-primary via-[#5BFFB5] to-brand-secondary bg-clip-text text-transparent">
                      Fix them.
                    </span>
                    <br />
                    Build securely.
                  </h1>
                </div>

                {/* Supporting Description */}
                <p className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg lg:text-xl">
                  Offensive security, application security, cloud defence and secure software
                  engineering — built around practical technical expertise.
                </p>

                {/* Responsive Primary & Secondary CTAs (Full width on mobile, inline on tablet/desktop) */}
                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                  <Link
                    href="/services"
                    className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-brand-primary px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-background shadow-neon-sm transition-all hover:bg-brand-secondary hover:shadow-neon-md"
                  >
                    <span>Explore Services</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/work"
                    className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl border border-brand-border/90 bg-background-card/90 px-6 py-4 text-xs sm:text-sm font-semibold text-text-primary shadow-[inset_0_1px_0_0_rgba(243,248,245,0.06)] transition-all hover:border-brand-primary/60 hover:text-brand-primary"
                  >
                    <span>View Our Work ({PROJECTS_DATA.length} Systems)</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <Link
                    href="/tools"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-brand-border/70 bg-background-elevated/70 px-5 py-4 font-mono text-xs text-brand-primary hover:border-brand-primary"
                  >
                    <Wrench className="h-3.5 w-3.5" />
                    <span>Zero-Egress Lab Tools</span>
                  </Link>
                </div>
              </div>

              {/* Verified Studio Engineering Ledger Strip — Flush with Right Column Bottom */}
              <div className="grid grid-cols-2 gap-3 border-t border-brand-border/70 pt-6 sm:grid-cols-4">
                <Link
                  href="/work"
                  className="group rounded-xl border border-brand-border/60 bg-background-elevated/60 p-3.5 transition-colors hover:border-brand-primary/50"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-xl sm:text-2xl font-bold text-brand-primary">
                      {PROJECTS_DATA.length}
                    </p>
                    <ArrowUpRight className="h-3.5 w-3.5 text-text-muted group-hover:text-brand-primary" />
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-text-secondary">
                    Verified GitHub Systems
                  </p>
                </Link>

                <Link
                  href="/services"
                  className="group rounded-xl border border-brand-border/60 bg-background-elevated/60 p-3.5 transition-colors hover:border-brand-primary/50"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-xl sm:text-2xl font-bold text-brand-primary">
                      06
                    </p>
                    <ArrowUpRight className="h-3.5 w-3.5 text-text-muted group-hover:text-brand-primary" />
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-text-secondary">
                    Core Security Practices
                  </p>
                </Link>

                <Link
                  href="/research"
                  className="group rounded-xl border border-brand-border/60 bg-background-elevated/60 p-3.5 transition-colors hover:border-brand-primary/50"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-xl sm:text-2xl font-bold text-brand-primary">
                      08
                    </p>
                    <ArrowUpRight className="h-3.5 w-3.5 text-text-muted group-hover:text-brand-primary" />
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-text-secondary">
                    Research Lab Disciplines
                  </p>
                </Link>

                <Link
                  href="/insights"
                  className="group rounded-xl border border-brand-border/60 bg-background-elevated/60 p-3.5 transition-colors hover:border-brand-primary/50"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-xl sm:text-2xl font-bold text-brand-primary">
                      60
                    </p>
                    <ArrowUpRight className="h-3.5 w-3.5 text-text-muted group-hover:text-brand-primary" />
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-text-secondary">
                    Curriculum Lesson Slots
                  </p>
                </Link>
              </div>
            </div>

            {/* Right Column: Unified Multi-Plane Telemetry & CLI Control Console */}
            <div className="lg:col-span-5 flex flex-col">
              <SecurityTelemetryConsole />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — CORE CAPABILITIES (BENTO STUDIO CARDS) */}
      <section className="section-divider bg-background-secondary py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInSection className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="max-w-3xl space-y-2.5">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-primary">
                <span>[ 01 // CORE CAPABILITIES ]</span>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                Three engineering disciplines. One unified security posture.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-text-secondary">
              Security vulnerabilities rarely stay confined to a single layer. We bridge offensive
              discovery, defensive cloud architecture, and secure software engineering.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CORE_CAPABILITIES.map((cap, idx) => (
              <FadeInSection key={cap.category} delay={idx * 0.06}>
                <SpotlightCard className="flex h-full flex-col justify-between p-6 sm:p-8">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-brand-border/60 pb-4">
                      <span className="font-mono text-xs font-bold tracking-wider text-brand-primary">
                        {cap.code}
                      </span>
                      <span className="rounded-full border border-brand-border bg-background-elevated px-3 py-1 font-mono text-[10px] text-text-secondary">
                        {cap.badge}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-primary">
                        {cap.category}
                      </p>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-text-primary">
                        {cap.subtitle}
                      </h3>
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {cap.description}
                      </p>
                    </div>

                    <ul className="space-y-2.5 border-t border-brand-border/60 pt-5">
                      {cap.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 rounded-xl border border-brand-border/50 bg-background-elevated/60 px-3.5 py-2.5 text-sm font-medium text-text-primary"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 border-t border-brand-border/50 pt-4">
                    <Link
                      href={cap.href}
                      className="group inline-flex items-center gap-2 font-mono text-xs font-semibold text-brand-primary"
                    >
                      <span>Inspect discipline specification</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </SpotlightCard>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — PROFESSIONAL SECURITY SERVICES */}
      <section className="section-divider bg-background py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInSection className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl space-y-2.5">
              <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
                [ 02 // PROFESSIONAL SERVICES MATRIX ]
              </p>
              <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                Practical security assessments and engineering engagements.
              </h2>
              <p className="text-sm sm:text-base text-text-secondary">
                Every engagement produces reproducible technical evidence, code-level remediation
                guidance, and post-fix verification retesting.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-brand-border bg-background-card px-5 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-text-primary hover:border-brand-primary hover:text-brand-primary transition-colors"
            >
              <span>Full Services Specification</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeInSection>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES_DATA.map((service, idx) => {
              const IconComponent = SERVICE_ICONS[service.iconName] || ShieldCheck;
              return (
                <FadeInSection key={service.slug} delay={idx * 0.04}>
                  <SpotlightCard as="article" className="flex h-full flex-col justify-between p-6 sm:p-7">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-primary/40 bg-brand-deep/70 text-brand-primary shadow-neon-sm">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="text-right font-mono">
                          <span className="block text-[10px] text-brand-primary">
                            SERVICE // 0{idx + 1}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider text-text-muted">
                            {service.capabilityGroup}
                          </span>
                        </div>
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

                      <div className="space-y-2 border-t border-brand-border/60 pt-4">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-brand-primary">
                          Verified Deliverables
                        </p>
                        <ul className="space-y-1.5 text-xs text-text-secondary">
                          {service.deliverables.slice(0, 3).map((deliv) => (
                            <li key={deliv} className="flex items-start gap-2.5">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-primary shrink-0" />
                              <span>{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-brand-border/50 pt-4">
                      <Link
                        href={`/services/${service.slug}`}
                        className="group inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-brand-primary"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link
                        href={`/contact?service=${service.slug}`}
                        className="font-mono text-[11px] text-text-muted hover:text-text-primary"
                      >
                        Scope →
                      </Link>
                    </div>
                  </SpotlightCard>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5 — FEATURED ENGINEERING WORK & FLAGSHIP CLOUDSENTINEL SPOTLIGHT */}
      <section className="section-divider bg-background-secondary py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInSection className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl space-y-2.5">
              <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
                [ 03 // FEATURED ENGINEERING WORK & PLATFORMS ]
              </p>
              <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                Verified security systems from our GitHub portfolio.
              </h2>
              <p className="text-sm sm:text-base text-text-secondary">
                Transparent engineering documentation across {PROJECTS_DATA.length} public
                repositories on{" "}
                <a
                  href={SITE_CONFIG.githubProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-brand-primary underline"
                >
                  github.com/AnandBinuArjun
                </a>
                . Every system distinguishes implemented features from planned roadmap items.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-background-card px-5 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-text-primary hover:border-brand-primary"
              >
                <span>Flagship Products</span>
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-background hover:bg-brand-secondary shadow-neon-sm"
              >
                <span>All {PROJECTS_DATA.length} Portfolio Systems</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeInSection>

          {/* Flagship Studio Showcase Banner: CloudSentinel */}
          {cloudSentinel && (
            <FadeInSection>
              <SpotlightCard className="specular-top border-brand-primary/40 p-6 sm:p-9 lg:p-10">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <ProductLogo
                        productName="CloudSentinel"
                        assetPath="/products/cloudsentinel-logo.png"
                      />
                      <span className="rounded-full border border-brand-primary/40 bg-brand-deep px-3.5 py-1 font-mono text-[11px] text-brand-primary">
                        FLAGSHIP MULTI-CLOUD CSPM · v1.0.0 VERIFIED
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-text-primary sm:text-3xl">
                      CloudSentinel — Hybrid Cloud Security Platform for AWS & Microsoft Azure
                    </h3>

                    <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                      {cloudSentinel.solutionOverview}
                    </p>

                    <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-1">
                      <Link
                        href="/products/cloudsentinel"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-background hover:bg-brand-secondary"
                      >
                        <span>Inspect CloudSentinel Architecture</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <a
                        href={cloudSentinel.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-background-elevated px-4 py-3.5 font-mono text-xs text-text-primary hover:border-brand-primary"
                      >
                        <GitBranch className="h-3.5 w-3.5 text-brand-primary" />
                        <span>AnandBinuArjun/cloundsentinel</span>
                      </a>
                    </div>
                  </div>

                  <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-brand-border bg-background-elevated/85 p-4 space-y-1">
                      <span className="font-mono text-xl sm:text-2xl font-bold text-brand-primary">
                        18
                      </span>
                      <p className="font-display text-xs font-bold text-text-primary">
                        Deterministic Posture Rules
                      </p>
                      <p className="text-[11px] text-text-muted">
                        AWS STS & Azure Managed Identity read-only evaluators
                      </p>
                    </div>
                    <div className="rounded-xl border border-brand-border bg-background-elevated/85 p-4 space-y-1">
                      <span className="font-mono text-xl sm:text-2xl font-bold text-brand-primary">
                        09
                      </span>
                      <p className="font-display text-xs font-bold text-text-primary">
                        MITRE ATT&CK Log Rules
                      </p>
                      <p className="text-[11px] text-text-muted">
                        CloudTrail & Azure Activity Log threat detection
                      </p>
                    </div>
                    <div className="rounded-xl border border-brand-border bg-background-elevated/85 p-4 space-y-1">
                      <span className="font-mono text-xl sm:text-2xl font-bold text-brand-primary">
                        21
                      </span>
                      <p className="font-display text-xs font-bold text-text-primary">
                        PostgreSQL 16 RLS Entities
                      </p>
                      <p className="text-[11px] text-text-muted">
                        Strict multi-tenant row-level security isolation
                      </p>
                    </div>
                    <div className="rounded-xl border border-brand-border bg-background-elevated/85 p-4 space-y-1">
                      <span className="font-mono text-xl sm:text-2xl font-bold text-brand-primary">
                        SoD
                      </span>
                      <p className="font-display text-xs font-bold text-text-primary">
                        Approval-Gated Fixes
                      </p>
                      <p className="text-[11px] text-text-muted">
                        Enforces approver != proposer separation of duties
                      </p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </FadeInSection>
          )}

          {/* Featured Portfolio Bento Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects
              .filter((p) => p.slug !== "cloudsentinel")
              .map((project, idx) => {
                const detailHref = project.isProduct
                  ? `/products/${project.slug}`
                  : `/work/${project.slug}`;

                return (
                  <FadeInSection key={project.slug} delay={idx * 0.04}>
                    <SpotlightCard
                      as="article"
                      className="flex h-full flex-col justify-between p-6"
                    >
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="rounded-full border border-brand-primary/30 bg-brand-deep/80 px-3 py-0.5 font-mono text-[11px] text-brand-primary">
                            {project.category}
                          </span>
                          <span className="font-mono text-[10px] text-text-muted">
                            {project.statusLabel}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-display text-xl font-bold text-text-primary">
                            <Link
                              href={detailHref}
                              className="hover:text-brand-primary transition-colors"
                            >
                              {project.name}
                            </Link>
                          </h3>
                          <p className="text-sm leading-relaxed text-text-secondary">
                            {project.shortDescription}
                          </p>
                        </div>

                        <div className="space-y-2 border-t border-brand-border/50 pt-3">
                          <p className="font-mono text-[10px] uppercase tracking-wider text-brand-primary">
                            Verified Capabilities
                          </p>
                          <ul className="space-y-1.5 text-xs text-text-secondary">
                            {project.implementedFeatures.slice(0, 2).map((feat) => (
                              <li key={feat} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-primary shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {project.technologies.slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-brand-border/70 bg-background-elevated px-2.5 py-0.5 font-mono text-[11px] text-text-secondary"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-brand-border/50 pt-4">
                        <Link
                          href={detailHref}
                          className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-brand-primary"
                        >
                          <span>Inspect System</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-xs text-text-muted hover:text-text-primary"
                        >
                          <GitBranch className="h-3.5 w-3.5" />
                          <span>Repository</span>
                        </a>
                      </div>
                    </SpotlightCard>
                  </FadeInSection>
                );
              })}
          </div>
        </div>
      </section>

      {/* SECTION 6 — SECURITY RESEARCH LAB */}
      <section className="section-divider bg-background py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInSection className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl space-y-2.5">
              <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
                [ 04 // SECURITY RESEARCH LABORATORY ]
              </p>
              <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                Technical research briefs & MITRE ATT&CK analysis.
              </h2>
              <p className="text-sm sm:text-base text-text-secondary">
                Covering Threat Intelligence, IoT Security, Malware Analysis, Cloud Security,
                Digital Forensics, and Secure Software Engineering. Working drafts are transparently
                labelled.
              </p>
            </div>
            <Link
              href="/research"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-brand-border bg-background-card px-5 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-text-primary hover:border-brand-primary hover:text-brand-primary"
            >
              <span>Enter Research Lab</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeInSection>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredResearch.map((article, idx) => (
              <FadeInSection key={article.slug} delay={idx * 0.04}>
                <SpotlightCard
                  as="article"
                  className="flex h-full flex-col justify-between p-6"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Link
                        href={`/research/categories/${article.categorySlug}`}
                        className="rounded-full border border-brand-primary/30 bg-brand-deep px-3 py-0.5 font-mono text-[11px] text-brand-primary hover:underline"
                      >
                        {article.categoryName}
                      </Link>
                      <span className="rounded border border-status-warning/40 bg-status-warning/10 px-2 py-0.5 font-mono text-[10px] text-status-warning">
                        DRAFT BRIEF
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold leading-snug text-text-primary">
                      <Link
                        href={`/research/${article.slug}`}
                        className="hover:text-brand-primary transition-colors"
                      >
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-sm leading-relaxed text-text-secondary">
                      {article.summary}
                    </p>
                  </div>

                  <div className="mt-6 space-y-3 border-t border-brand-border/50 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {article.mitreAttackRefs.map((ref) => (
                        <span
                          key={ref.id}
                          className="rounded border border-brand-border bg-background-elevated px-2 py-0.5 font-mono text-[10px] text-text-muted"
                        >
                          ATT&CK {ref.id}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between font-mono text-xs text-text-muted">
                      <span>{article.readingTimeMin} min read</span>
                      <Link
                        href={`/research/${article.slug}`}
                        className="inline-flex items-center gap-1 font-semibold text-brand-primary hover:underline"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>Read Brief</span>
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — HOW WE WORK */}
      <section className="section-divider bg-background-secondary py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInSection className="max-w-3xl space-y-2.5">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              [ 05 // HOW WE WORK ]
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Structured engineering methodology from discovery to verified closure.
            </h2>
            <p className="text-sm sm:text-base text-text-secondary">
              Select each phase below to inspect its technical objective and verified engineering
              deliverables.
            </p>
          </FadeInSection>

          <ProcessTimeline />
        </div>
      </section>

      {/* SECTION 8 — TECHNOLOGY */}
      <section className="section-divider bg-background py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInSection className="max-w-3xl space-y-2.5">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              [ 06 // TECHNOLOGY & INSTRUMENTATION STACK ]
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Production engineering and security instrumentation stack.
            </h2>
            <p className="text-sm sm:text-base text-text-secondary">
              We build and audit systems using battle-tested languages, cloud infrastructure, and
              automated verification pipelines.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {CURATED_TECH_STACK.map((tech) => (
              <SpotlightCard key={tech.name} className="group p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-primary/40 bg-brand-deep/70 text-brand-primary shadow-neon-sm">
                    <TechStackIcon name={tech.name} />
                  </div>
                  <span className="rounded border border-brand-border bg-background-elevated px-2.5 py-0.5 font-mono text-[10px] text-brand-primary">
                    {tech.code}
                  </span>
                </div>
                <div className="mt-4 space-y-1">
                  <h3 className="font-display text-base font-bold text-text-primary group-hover:text-brand-primary transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-text-secondary">{tech.role}</p>
                </div>
              </SpotlightCard>
            ))}

            {/* 12th Card: Official CODE.COMMIT Brand Emblem Anchor Card */}
            <SpotlightCard className="group specular-top flex flex-col justify-between border-brand-primary/50 bg-brand-deep/20 p-5">
              <div className="flex items-center justify-between gap-3">
                <BrandLogo variant="compact" />
                <span className="rounded border border-brand-primary/40 bg-brand-deep px-2.5 py-0.5 font-mono text-[10px] font-bold text-brand-primary">
                  CORE STUDIO
                </span>
              </div>
              <div className="mt-4 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-brand-primary">
                    CODE.COMMIT
                  </h3>
                  <Link
                    href="/work"
                    className="font-mono text-[11px] text-text-primary hover:text-brand-primary underline"
                  >
                    21 Systems →
                  </Link>
                </div>
                <p className="text-xs leading-relaxed text-text-secondary">
                  SECURITY × SOFTWARE — Verified Open-Source & Enterprise Architecture
                </p>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-technical-grid-masked" />
        <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <SpotlightCard className="specular-top mx-auto max-w-4xl border-brand-primary/50 p-7 text-center shadow-neon-md sm:p-12 lg:p-16">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-background-elevated px-4 py-1.5 font-mono text-xs text-brand-primary">
                <Shield className="h-3.5 w-3.5" />
                <span>READY TO SCOPE YOUR ENGAGEMENT</span>
              </div>

              <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                Secure today. Build a safer tomorrow.
              </h2>

              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base lg:text-lg">
                Have a security challenge or an engineering project? Let&apos;s define the scope and
                build a practical solution.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3.5 pt-2">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-primary px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-background shadow-neon-sm transition-all hover:bg-brand-secondary hover:shadow-neon-md"
                >
                  <span>Initialize Project</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-background-elevated px-7 py-4 text-xs sm:text-sm font-semibold text-text-primary hover:border-brand-primary"
                >
                  <span>Review Service Scopes</span>
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>
    </div>
  );
}
