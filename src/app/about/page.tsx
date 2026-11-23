import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Terminal,
  GitBranch,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { BrandLogo } from "@/components/layout/brand-logo";

export const metadata: Metadata = {
  title: "About CODE.COMMIT — Cybersecurity & Secure Software Engineering Studio",
  description:
    "Learn about CODE.COMMIT (SECURITY × SOFTWARE), our engineering philosophy, brand integrity standards, and lead engineer Anand Binu Arjun.",
};

export default function AboutPage() {
  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="border-b border-brand-border/70 bg-technical-grid py-16 lg:py-24">
        <div className="container mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-background-elevated px-3.5 py-1 font-mono text-xs text-brand-primary">
            <span>[ ABOUT CODE.COMMIT · {SITE_CONFIG.brandStatement} ]</span>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Offensive Security. Defensive Engineering. Secure Software.
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-text-secondary sm:text-xl">
            CODE.COMMIT is a cybersecurity and secure software engineering studio focused on
            helping organisations identify security weaknesses, improve their security posture, and
            build resilient digital systems.
          </p>
        </div>
      </section>

      {/* Studio Philosophy & Brand Identity */}
      <section className="border-b border-brand-border/60 bg-background-secondary py-16 lg:py-20">
        <div className="container mx-auto grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              [ 01 // ENGINEERING DOCTRINE ]
            </p>
            <h2 className="font-display text-3xl font-bold text-text-primary">
              Technical credibility over theatrical security clichés.
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              Many cybersecurity websites rely on meaningless threat maps, fabricated statistics,
              and fear-driven marketing. CODE.COMMIT was built on the opposite principle: security
              is an applied engineering discipline where claims must be backed by code, reproducible
              proof-of-concept validation, and verifiable architecture.
            </p>
            <p className="text-base leading-relaxed text-text-secondary">
              Whether we are conducting an authorised web/API penetration test, engineering
              approval-gated cloud posture rules in <strong>CloudSentinel</strong>, capturing IoT
              botnet telemetry in <strong>SENTINEL-IoT</strong>, or publishing educational lessons on{" "}
              <strong>{SITE_CONFIG.instagramHandle}</strong>, every deliverable is grounded in
              defensible technical standards (OWASP ASVS, OWASP WSTG, MITRE ATT&CK, and CIS
              Benchmarks).
            </p>

            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
              <div className="rounded-xl border border-brand-border bg-background-card p-5 space-y-2">
                <h3 className="font-display text-lg font-bold text-text-primary">
                  Zero Fabricated Claims
                </h3>
                <p className="text-xs leading-relaxed text-text-secondary">
                  We never claim any system is 100% attack-proof, and we transparently separate
                  implemented repository features from planned architecture roadmaps.
                </p>
              </div>
              <div className="rounded-xl border border-brand-border bg-background-card p-5 space-y-2">
                <h3 className="font-display text-lg font-bold text-text-primary">
                  Engineering-First Remediation
                </h3>
                <p className="text-xs leading-relaxed text-text-secondary">
                  Reports are written for developers and architects—complete with TypeScript,
                  Python, and Infrastructure-as-Code fix guidance.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-brand-border bg-background-card p-7 space-y-5">
              <BrandLogo variant="stacked" />
              <div className="space-y-2 border-t border-brand-border/60 pt-4">
                <p className="font-mono text-xs uppercase tracking-wider text-brand-primary">
                  Principal Engineering Leadership
                </p>
                <h3 className="font-display text-2xl font-bold text-text-primary">
                  {SITE_CONFIG.leadEngineer}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  Cybersecurity & Software Engineer based in {SITE_CONFIG.location}. Focusing on
                  vulnerability management, VAPT, incident response, threat intelligence pipelines,
                  IoT honeypot networks, and full-stack secure systems.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-text-primary">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                  <span>Author of SENTINEL-IoT & Threat Intelligence CTI Analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                  <span>Architect of CloudSentinel, TOTAL ENTITY & CODEX CYBERSTRIKE</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                  <span>Creator of the @c0de.commit Cybersecurity Education Series</span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={SITE_CONFIG.githubProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-brand-primary px-4 py-2.5 text-xs font-semibold text-background hover:bg-brand-secondary"
                >
                  <GitBranch className="h-3.5 w-3.5" />
                  <span>GitHub (@AnandBinuArjun)</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href={SITE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-brand-border bg-background-elevated px-4 py-2.5 text-xs font-semibold text-text-primary hover:border-brand-primary"
                >
                  <span>Instagram ({SITE_CONFIG.instagramHandle})</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto space-y-10">
          <div className="max-w-3xl space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              [ 02 // PLATFORM ARCHITECTURE ]
            </p>
            <h2 className="font-display text-3xl font-bold text-text-primary">
              Four integrated experiences under one roof.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-brand-border bg-background-card p-6 space-y-3">
              <Shield className="h-6 w-6 text-brand-primary" />
              <h3 className="font-display text-lg font-bold text-text-primary">
                1. Security Services
              </h3>
              <p className="text-xs leading-relaxed text-text-secondary">
                Authorised penetration testing, AppSec, cloud security audits, DFIR readiness, and
                secure full-stack development.
              </p>
              <Link href="/services" className="inline-block font-mono text-xs text-brand-primary">
                Explore Services →
              </Link>
            </div>

            <div className="rounded-2xl border border-brand-border bg-background-card p-6 space-y-3">
              <Cpu className="h-6 w-6 text-brand-primary" />
              <h3 className="font-display text-lg font-bold text-text-primary">
                2. Engineering Portfolio
              </h3>
              <p className="text-xs leading-relaxed text-text-secondary">
                Deep architectural walkthroughs of CloudSentinel, SENTINEL-IoT, TOTAL ENTITY, and
                CTI automation pipelines.
              </p>
              <Link href="/work" className="inline-block font-mono text-xs text-brand-primary">
                View Portfolio →
              </Link>
            </div>

            <div className="rounded-2xl border border-brand-border bg-background-card p-6 space-y-3">
              <Terminal className="h-6 w-6 text-brand-primary" />
              <h3 className="font-display text-lg font-bold text-text-primary">
                3. Research Laboratory
              </h3>
              <p className="text-xs leading-relaxed text-text-secondary">
                Technical working briefs across 8 security disciplines with verified MITRE ATT&CK
                mappings and code patterns.
              </p>
              <Link href="/research" className="inline-block font-mono text-xs text-brand-primary">
                Enter Research Lab →
              </Link>
            </div>

            <div className="rounded-2xl border border-brand-border bg-background-card p-6 space-y-3">
              <CheckCircle2 className="h-6 w-6 text-brand-primary" />
              <h3 className="font-display text-lg font-bold text-text-primary">
                4. Education & Insights
              </h3>
              <p className="text-xs leading-relaxed text-text-secondary">
                Structured 20-part curricula accompanying the @c0de.commit educational series on
                phishing, MFA, and malware defence.
              </p>
              <Link href="/insights" className="inline-block font-mono text-xs text-brand-primary">
                Browse Curriculum →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
