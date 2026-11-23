import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookText, Code2, FlaskConical, ScrollText, ShieldCheck, Swords, Wrench } from "lucide-react";
import { GithubActivity } from "@/components/lab/github-activity";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Lab — Tools, Detections & Practice",
  description:
    "The CODE.COMMIT lab: browser-based security tools, a detection rule library, a secure-coding gallery, a glossary, a CTF sandbox and live repository activity.",
};

const ENTRIES = [
  { href: "/tools", icon: Wrench, title: "Security tools", body: "CVSS 3.1, JWT, encoding and hashes, regex/ReDoS, TLS certificates, SPF/DKIM/DMARC and IaC checks. All run locally in your browser." },
  { href: "/tools", icon: ShieldCheck, title: "Threat modelling", body: "A STRIDE builder with a data-flow diagram, prioritised threats and Markdown export." },
  { href: "/tools", icon: Swords, title: "Attack paths & defences", body: "Build an ATT&CK chain and replay it, or toggle controls to see where a simulated intrusion stops." },
  { href: "/research/detections", icon: ScrollText, title: "Detection rule library", body: "Reference Sigma, YARA and Suricata rules mapped to ATT&CK, with false-positive notes." },
  { href: "/research/secure-code-gallery", icon: Code2, title: "Secure code gallery", body: "Vulnerable-versus-fixed examples across common CWE categories." },
  { href: "/research/glossary", icon: BookText, title: "Glossary", body: "Plain-language definitions of the terms used across our research and tools." },
  { href: "/tools", icon: FlaskConical, title: "CTF sandbox", body: "Five safe, client-side beginner challenges with hints and a local scoreboard." },
] as const;

export default function LabHubPage() {
  return (
    <div className="space-y-0">
      <section className="surface-technical border-b border-brand-border/70 py-16 lg:py-24">
        <div className="container mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-background-elevated px-3.5 py-1 font-mono text-xs text-brand-primary">
            [ THE LAB ]
          </div>
          <h1 className="text-hero-display max-w-4xl font-display font-bold text-text-primary">Hands-on security, in your browser.</h1>
          <p className="max-w-3xl text-lg text-text-secondary">
            Tools, reference detections and practice material built alongside our research. Everything interactive here runs locally: nothing you paste is sent to a server.
          </p>
          <p className="max-w-3xl rounded-lg border border-status-warning/40 bg-status-warning/10 p-3 font-mono text-xs text-status-warning">
            Reference content is illustrative. Detection rules and simulations are teaching aids that have not been validated against production telemetry.
          </p>
        </div>
      </section>

      <section className="bg-background py-14 lg:py-20">
        <div className="container mx-auto">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ENTRIES.map((e) => {
              const Icon = e.icon;
              return (
                <li key={e.title}>
                  <Link href={e.href} className="surface-glass group flex h-full min-h-[44px] flex-col gap-3 rounded-2xl p-6 transition-colors hover:border-brand-primary/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50">
                    <span className="flex items-center justify-between">
                      <Icon className="h-5 w-5 text-brand-primary" aria-hidden />
                      <ArrowUpRight className="h-4 w-4 text-text-muted transition-colors group-hover:text-brand-primary" aria-hidden />
                    </span>
                    <span className="font-display text-lg font-semibold text-text-primary">{e.title}</span>
                    <span className="text-sm text-text-secondary">{e.body}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="border-t border-brand-border/60 bg-background-secondary py-14 lg:py-20">
        <div className="container mx-auto space-y-6">
          <div className="space-y-2">
            <h2 className="text-section-display font-display font-bold text-text-primary">Live from GitHub</h2>
            <p className="max-w-2xl text-sm text-text-secondary">Recently updated public repositories, pulled directly from the GitHub API.</p>
          </div>
          <GithubActivity />
        </div>
      </section>
    </div>
  );
}
