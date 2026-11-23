"use client";

import React, { useState } from "react";
import {
  Search,
  Activity,
  Code2,
  ShieldCheck,
  Rocket,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PROCESS_STAGES = [
  {
    number: "01",
    name: "Discover",
    title: "Scope Architecture & Trust Boundaries",
    purpose:
      "Establish asset inventory, data sensitivity tiers, technology stack boundaries, and explicit written Rules of Engagement (RoE).",
    deliverables: [
      "Signed Rules of Engagement & Scope Manifest",
      "Architecture & Trust-Boundary Inventory",
      "Threat Model Baseline",
    ],
    schematicLabel: "[ ASSET INVENTORY ] ──► [ TRUST BOUNDARIES ] ──► [ ROE SIGN-OFF ]",
    icon: Search,
  },
  {
    number: "02",
    name: "Analyse",
    title: "Adversarial & Posture Evaluation",
    purpose:
      "Execute deep manual testing, source-code inspection, and multi-cloud posture analysis across the defined target scope.",
    deliverables: [
      "Manual Offensive Assessment Log",
      "OWASP ASVS & CIS Control Gap Matrix",
      "IAM & Attack-Surface Exposure Graph",
    ],
    schematicLabel: "[ MANUAL RECON ] ──► [ BOLA / AUTH ANALYSIS ] ──► [ IAM DRIFT GRAPH ]",
    icon: Activity,
  },
  {
    number: "03",
    name: "Engineer",
    title: "Secure Architecture & Remediation Design",
    purpose:
      "Architect defence-in-depth software controls, framework-specific code patches, and Infrastructure-as-Code hardening diffs.",
    deliverables: [
      "TypeScript / Python / IaC Patch Specifications",
      "Zero-Trust Input Validation & Schema Guards",
      "PostgreSQL Row-Level Security & Auth Policies",
    ],
    schematicLabel: "[ ZOD / PYDANTIC ] ──► [ TENANT ISOLATION ] ──► [ IAC DIFF SYNTHESIS ]",
    icon: Code2,
  },
  {
    number: "04",
    name: "Validate",
    title: "Proof-of-Concept & Cryptographic Verification",
    purpose:
      "Eliminate scanner false positives by safely verifying real exploit chains and testing remediation patches against regression suites.",
    deliverables: [
      "Reproducible Proof-of-Concept (PoC) Evidence",
      "SHA-256 Locked Remediation Plan Verification",
      "Automated Unit, Integration & E2E Security Suite",
    ],
    schematicLabel: "[ POC REPRODUCTION ] ──► [ SHA-256 PLAN LOCK ] ──► [ CI/CD GATE PASS ]",
    icon: ShieldCheck,
  },
  {
    number: "05",
    name: "Deploy",
    title: "Controlled Rollout & Retest Sign-Off",
    purpose:
      "Support approval-gated production rollout and execute post-remediation verification retesting to confirm closure.",
    deliverables: [
      "Separation-of-Duties Deployment Checklist",
      "Post-Remediation Retest Verification Memorandum",
      "Executive & Engineering Evidence Package",
    ],
    schematicLabel: "[ SOD APPROVAL ] ──► [ PRODUCTION ROLLOUT ] ──► [ VERIFIED CLOSURE ]",
    icon: Rocket,
  },
  {
    number: "06",
    name: "Evolve",
    title: "Continuous Telemetry & Research Feedback",
    purpose:
      "Transition point-in-time fixes into continuous detection rules, automated CI security gates, and ongoing threat intelligence monitoring.",
    deliverables: [
      "Custom Sigma / CloudTrail Detection Rules",
      "GitHub Actions DevSecOps Pipeline Templates",
      "Quarterly Posture & Threat Model Evolution Brief",
    ],
    schematicLabel: "[ CONTINUOUS CI GATES ] ──► [ MITRE TELEMETRY ] ──► [ POSTURE EVOLUTION ]",
    icon: RefreshCw,
  },
] as const;

export function ProcessTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStage = PROCESS_STAGES[activeIndex];
  const progressPct = Math.round(((activeIndex + 1) / PROCESS_STAGES.length) * 100);

  return (
    <div className="space-y-8">
      {/* Desktop Connected Horizontal Visual Timeline Track */}
      <div className="hidden lg:block relative">
        {/* Background Track Hairline */}
        <div className="absolute left-8 right-8 top-6 h-0.5 bg-brand-border/60" />
        {/* Advancing Green Progress Path */}
        <div
          className="absolute left-8 top-6 h-0.5 bg-brand-primary shadow-[0_0_12px_#00F58A] transition-all duration-500"
          style={{
            width: `calc(${(activeIndex / (PROCESS_STAGES.length - 1)) * 100}% - 3rem)`,
          }}
        />

        <div
          role="tablist"
          aria-label="Engineering Process Flow"
          className="relative z-10 grid grid-cols-6 gap-4"
        >
          {PROCESS_STAGES.map((stage, idx) => {
            const isSelected = idx === activeIndex;
            const isPassed = idx <= activeIndex;
            return (
              <button
                key={stage.number}
                type="button"
                role="tab"
                aria-selected={isSelected}
                id={`process-tab-${stage.number}`}
                aria-controls={`process-panel-${stage.number}`}
                onClick={() => setActiveIndex(idx)}
                className="group flex flex-col items-start text-left focus-visible:outline-none"
              >
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl border font-mono text-xs font-bold transition-all duration-300",
                    isSelected
                      ? "border-brand-primary bg-brand-primary text-background shadow-[0_0_20px_-4px_rgba(0,245,138,0.6)] scale-105"
                      : isPassed
                      ? "border-brand-primary/50 bg-brand-deep text-brand-primary"
                      : "border-brand-border bg-background-card text-text-muted group-hover:border-brand-primary/40 group-hover:text-text-primary"
                  )}
                >
                  {stage.number}
                </span>
                <div className="mt-4 space-y-1">
                  <p
                    className={cn(
                      "font-display text-base font-bold transition-colors",
                      isSelected ? "text-brand-primary" : "text-text-primary"
                    )}
                  >
                    {stage.number} — {stage.name}
                  </p>
                  <p className="text-xs text-text-secondary line-clamp-2">{stage.title}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile & Tablet Vertical / Touch Stepper */}
      <div
        role="tablist"
        aria-label="Engineering Process Flow Mobile"
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:hidden"
      >
        {PROCESS_STAGES.map((stage, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={stage.number}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-3 text-left transition-all",
                isSelected
                  ? "border-brand-primary bg-brand-deep/80 text-text-primary"
                  : "border-brand-border/50 bg-background-card/70 text-text-secondary"
              )}
            >
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold",
                  isSelected
                    ? "bg-brand-primary text-background"
                    : "bg-background-elevated text-brand-primary"
                )}
              >
                {stage.number}
              </span>
              <span className="font-display text-sm font-bold truncate">{stage.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail Showcase */}
      <div
        id={`process-panel-${activeStage.number}`}
        role="tabpanel"
        aria-labelledby={`process-tab-${activeStage.number}`}
        className="surface-glass rounded-3xl p-6 sm:p-10"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-brand-primary/40 bg-brand-deep px-3.5 py-1 font-mono text-xs text-brand-primary">
                PHASE {activeStage.number} / 06 · {activeStage.name.toUpperCase()}
              </span>
              <span className="font-mono text-xs text-text-muted">
                {progressPct}% LIFECYCLE PROGRESSION
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold text-text-primary sm:text-4xl">
              {activeStage.number} — {activeStage.name}: {activeStage.title}
            </h3>

            <p className="text-base leading-relaxed text-text-secondary">
              {activeStage.purpose}
            </p>

            {/* Technical Flow Schematic Bar */}
            <div className="rounded-xl border border-brand-border/60 bg-[#040907]/90 px-4 py-3 font-mono text-xs text-brand-primary">
              {activeStage.schematicLabel}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 rounded-2xl border border-brand-border/50 bg-background/60 p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-brand-primary">
              Verified Stage Deliverables
            </p>
            <ul className="space-y-3">
              {activeStage.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-xs sm:text-sm text-text-primary"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-brand-border/50 pt-4 font-mono text-xs">
              <button
                type="button"
                disabled={activeIndex === 0}
                onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                className="text-text-secondary hover:text-brand-primary disabled:opacity-40"
              >
                ← Previous Phase
              </button>
              <button
                type="button"
                disabled={activeIndex === PROCESS_STAGES.length - 1}
                onClick={() =>
                  setActiveIndex((prev) => Math.min(PROCESS_STAGES.length - 1, prev + 1))
                }
                className="text-brand-primary font-semibold hover:underline disabled:opacity-40"
              >
                Next Phase →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
