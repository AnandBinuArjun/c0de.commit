"use client";

import React, { useState } from "react";
import { CheckCircle2, Layers, Shield, Cpu, FileCheck, Search, Wrench } from "lucide-react";
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
    icon: Search,
  },
  {
    number: "02",
    name: "Assess",
    title: "Offensive & Defensive Evaluation",
    purpose:
      "Execute deep manual testing, source code inspection, and multi-cloud posture analysis across the defined scope.",
    deliverables: [
      "Manual Offensive Test Log",
      "ASVS / CIS Control Evaluation Matrix",
      "IAM & Attack Surface Exposure Graph",
    ],
    icon: Shield,
  },
  {
    number: "03",
    name: "Validate",
    title: "Proof-of-Concept & Exploit Chain Verification",
    purpose:
      "Eliminate scanner false positives by safely validating actual exploitability, chained business-logic impact, and blast radius.",
    deliverables: [
      "Reproducible Proof-of-Concept (PoC) Evidence",
      "Chained Risk & Blast-Radius Scoring",
      "MITRE ATT&CK Technique Mapping",
    ],
    icon: Cpu,
  },
  {
    number: "04",
    name: "Remediate",
    title: "Engineering Fixes & Guardrail Design",
    purpose:
      "Provide framework-specific code patches, Infrastructure-as-Code hardening diffs, and approval-gated remediation guidance.",
    deliverables: [
      "Code-Level Patch Recommendations (TypeScript / Python / IaC)",
      "Hardened Security Headers & Validation Schemas",
      "CI/CD Pipeline Guardrail Configurations",
    ],
    icon: Wrench,
  },
  {
    number: "05",
    name: "Verify",
    title: "Post-Remediation Retesting",
    purpose:
      "Re-execute targeted test cases against patched systems to confirm vulnerabilities are resolved without introducing regressions.",
    deliverables: [
      "Retest Verification Matrix",
      "Regression & Control Validation Sign-Off",
      "Updated Posture Snapshot",
    ],
    icon: CheckCircle2,
  },
  {
    number: "06",
    name: "Report",
    title: "Executive & Engineering Evidence Package",
    purpose:
      "Deliver clear documentation tailored for both executive risk governance and hands-on software engineering teams.",
    deliverables: [
      "Executive Risk Summary",
      "Comprehensive Technical Findings & Evidence Report",
      "Long-Term Defensive Engineering Roadmap",
    ],
    icon: FileCheck,
  },
] as const;

export function ProcessTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStage = PROCESS_STAGES[activeIndex];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Stage Selector List */}
      <div
        className="lg:col-span-5 flex flex-col gap-2.5"
        role="tablist"
        aria-label="How We Work Process Stages"
      >
        {PROCESS_STAGES.map((stage, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={stage.number}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`process-panel-${stage.number}`}
              id={`process-tab-${stage.number}`}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "group flex items-center justify-between rounded-xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                isSelected
                  ? "border-brand-primary bg-background-card shadow-neon-sm"
                  : "border-brand-border/60 bg-background-elevated/60 hover:border-brand-primary/40 hover:bg-background-card/50"
              )}
            >
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg border font-mono text-xs font-bold",
                    isSelected
                      ? "border-brand-primary bg-brand-primary text-background"
                      : "border-brand-border bg-background text-brand-primary"
                  )}
                >
                  {stage.number}
                </span>
                <div>
                  <p className="font-display text-base font-bold text-text-primary">
                    {stage.number} — {stage.name}
                  </p>
                  <p className="text-xs text-text-secondary">{stage.title}</p>
                </div>
              </div>
              <span
                className={cn(
                  "font-mono text-xs transition-transform",
                  isSelected ? "text-brand-primary translate-x-0.5" : "text-text-muted"
                )}
              >
                →
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail Card */}
      <div
        id={`process-panel-${activeStage.number}`}
        role="tabpanel"
        aria-labelledby={`process-tab-${activeStage.number}`}
        className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-brand-border bg-background-card p-8 shadow-card-elevated"
      >
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-border/70 pb-5">
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-primary">
                STAGE {activeStage.number} / 06 · METHODOLOGY
              </span>
              <h3 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
                {activeStage.number} — {activeStage.name}: {activeStage.title}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-primary/40 bg-brand-deep/60 text-brand-primary">
              <Layers className="h-6 w-6" />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted">
              Stage Objective
            </h4>
            <p className="text-base leading-relaxed text-text-secondary">
              {activeStage.purpose}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted">
              Verified Stage Deliverables
            </h4>
            <ul className="space-y-2.5">
              {activeStage.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-brand-border/60 bg-background-elevated/80 px-4 py-3 text-sm text-text-primary"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stage Progress Bar */}
        <div className="mt-8 border-t border-brand-border/60 pt-5">
          <div className="flex items-center justify-between font-mono text-xs text-text-muted mb-2">
            <span>ENGAGEMENT LIFECYCLE PROGRESSION</span>
            <span className="text-brand-primary">
              {Math.round(((activeIndex + 1) / PROCESS_STAGES.length) * 100)}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-background-elevated">
            <div
              className="h-full bg-brand-primary transition-all duration-300"
              style={{ width: `${((activeIndex + 1) / PROCESS_STAGES.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
