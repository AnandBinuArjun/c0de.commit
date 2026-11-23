"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sliders, CheckCircle2, ArrowUpRight, Shield, Wrench } from "lucide-react";
import type { ServiceItem } from "@/types";
import { cn } from "@/lib/utils";

const TARGET_ENVIRONMENTS = [
  {
    id: "web-saas-api",
    label: "Web App, SaaS & REST/GraphQL APIs",
    focus: "Authentication, multi-tenant BOLA/IDOR, session lifecycle, and business-logic chains.",
    recommendedDepth: "Standard Manual Assessment + Post-Fix Verification Retest (2–3 Weeks)",
  },
  {
    id: "cloud-aws-azure",
    label: "AWS & Microsoft Azure Hybrid Cloud",
    focus: "IAM/Entra privilege escalation graphs, VPC/NSG isolation, S3/KeyVault posture & drift.",
    recommendedDepth: "Read-Only Federated Posture Audit + IaC Hardening Diffs (2 Weeks)",
  },
  {
    id: "container-linux-iot",
    label: "Containers, Linux Hosts & IoT/Edge",
    focus: "Docker namespace isolation, kernel hardening, exposed management protocols & telemetry.",
    recommendedDepth: "Deep Infrastructure & Sensor Security Assessment (2–4 Weeks)",
  },
] as const;

export function ServiceScopeConfigurator({ service }: { service: ServiceItem }) {
  const [selectedEnvId, setSelectedEnvId] = useState<string>(TARGET_ENVIRONMENTS[0].id);
  const [includeRetest, setIncludeRetest] = useState(true);
  const [includeCicdGates, setIncludeCicdGates] = useState(true);

  const activeEnv =
    TARGET_ENVIRONMENTS.find((e) => e.id === selectedEnvId) || TARGET_ENVIRONMENTS[0];

  const scopeSummaryParam = encodeURIComponent(
    `[${service.title}] Target Environment: ${activeEnv.label}. Focus: ${activeEnv.focus} Options: ${
      includeRetest ? "Include Post-Remediation Retest" : "Initial Assessment"
    }${includeCicdGates ? " + CI/CD DevSecOps Guardrails" : ""}.`
  );

  return (
    <div className="rounded-3xl border border-brand-primary/40 bg-[#050C08]/95 p-6 sm:p-8 shadow-neon-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-border/70 pb-4">
        <div className="flex items-center gap-2.5">
          <Sliders className="h-4 w-4 text-brand-primary" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
            INTERACTIVE RULES-OF-ENGAGEMENT (RoE) & SCOPE BUILDER
          </span>
        </div>
        <span className="rounded bg-brand-deep px-2.5 py-0.5 font-mono text-[10px] text-brand-primary">
          PRE-ENGAGEMENT CONFIGURATOR
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left 7 Cols: Environment & Option Selectors */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-2.5">
            <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
              1. Select Primary Target Environment:
            </p>
            <div className="grid grid-cols-1 gap-2.5">
              {TARGET_ENVIRONMENTS.map((env) => {
                const isSelected = env.id === activeEnv.id;
                return (
                  <button
                    key={env.id}
                    type="button"
                    onClick={() => setSelectedEnvId(env.id)}
                    className={cn(
                      "rounded-xl border p-4 text-left transition-all",
                      isSelected
                        ? "border-brand-primary bg-brand-deep/70 text-text-primary shadow-neon-sm"
                        : "border-brand-border bg-background-card text-text-secondary hover:border-brand-primary/50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold text-text-primary">
                        {env.label}
                      </span>
                      <span className="font-mono text-[10px] text-brand-primary">
                        {isSelected ? "SELECTED" : "SELECT"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-text-secondary">{env.focus}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toggle Add-ons */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-1">
            <button
              type="button"
              onClick={() => setIncludeRetest((v) => !v)}
              className={cn(
                "flex items-center justify-between rounded-xl border p-3.5 text-left font-mono text-xs transition-colors",
                includeRetest
                  ? "border-brand-primary/60 bg-brand-deep/40 text-brand-primary"
                  : "border-brand-border bg-background-card text-text-muted"
              )}
            >
              <span>+ Verification Retesting</span>
              <span>{includeRetest ? "[INCLUDED]" : "[OFF]"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIncludeCicdGates((v) => !v)}
              className={cn(
                "flex items-center justify-between rounded-xl border p-3.5 text-left font-mono text-xs transition-colors",
                includeCicdGates
                  ? "border-brand-primary/60 bg-brand-deep/40 text-brand-primary"
                  : "border-brand-border bg-background-card text-text-muted"
              )}
            >
              <span>+ CI/CD Guardrail Templates</span>
              <span>{includeCicdGates ? "[INCLUDED]" : "[OFF]"}</span>
            </button>
          </div>
        </div>

        {/* Right 5 Cols: Configured Scope Blueprint Summary & 1-Click Handoff */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-brand-border bg-background-elevated/90 p-5 space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-brand-primary font-bold">CONFIGURED ROE SUMMARY</span>
              <Shield className="h-4 w-4 text-brand-primary" />
            </div>

            <div className="space-y-1">
              <p className="font-mono text-[10px] text-text-muted">RECOMMENDED CADENCE</p>
              <p className="font-display text-sm font-bold text-text-primary">
                {activeEnv.recommendedDepth}
              </p>
            </div>

            <div className="space-y-1.5">
              <p className="font-mono text-[10px] text-text-muted">ACTIVE TOOLING & STANDARDS</p>
              <div className="flex flex-wrap gap-1.5">
                {service.toolsAndTechnologies.slice(0, 5).map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center gap-1 rounded border border-brand-border bg-background-card px-2 py-0.5 font-mono text-[10px] text-text-primary"
                  >
                    <Wrench className="h-2.5 w-2.5 text-brand-primary" />
                    <span>{tool}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="font-mono text-[10px] text-text-muted">INCLUDED DELIVERABLES</p>
              <ul className="space-y-1.5 text-xs text-text-secondary">
                {service.deliverables.slice(0, 3).map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-primary" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            href={`/contact?service=${service.slug}&scope=${scopeSummaryParam}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-background shadow-neon-sm hover:bg-brand-secondary transition-all"
          >
            <span>Send Configured Scope to Intake</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
