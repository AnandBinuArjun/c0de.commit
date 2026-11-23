"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CloudCog,
  Radio,
  ArrowUpRight,
  CheckCircle2,
  Activity,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { InteractiveTerminal } from "@/components/terminal/interactive-terminal";

const ARCHITECTURE_PLANES = [
  {
    id: "cloud-plane",
    code: "PLANE // 01",
    label: "Hybrid Cloud CSPM",
    system: "CloudSentinel v1.0.0",
    href: "/products/cloudsentinel",
    icon: CloudCog,
    metrics: [
      { label: "Deterministic Posture Rules", value: "18 Active" },
      { label: "MITRE ATT&CK Log Detectors", value: "09 Rules" },
      { label: "PostgreSQL RLS Entities", value: "21 Tables" },
    ],
    pipeline: [
      {
        stage: "INGEST",
        title: "AWS STS & Azure Managed Identity",
        state: "READ-ONLY FEDERATED",
        detail: "Zero static cloud keys; evaluates IAM, VPC, S3, KMS, Entra ID & NSGs.",
      },
      {
        stage: "EVALUATE",
        title: "Deterministic Posture & Drift Engine",
        state: "PROOF BEFORE ACTION",
        detail: "Resolves strictly to PASS, FAIL, NOT_ASSESSED, or ERROR with evidence JSON.",
      },
      {
        stage: "GOVERN",
        title: "Separation-of-Duties Remediation Gate",
        state: "APPROVER != PROPOSER",
        detail: "Requires dry-run diff, rollback plan, and independent operator sign-off.",
      },
    ],
  },
  {
    id: "appsec-plane",
    code: "PLANE // 02",
    label: "AI-Native AppSec",
    system: "AegisFlow Control Plane",
    href: "/products/aegisflow",
    icon: ShieldCheck,
    metrics: [
      { label: "Ingestion Parsers", value: "SARIF / Trivy" },
      { label: "Plan Integrity Lock", value: "SHA-256" },
      { label: "Automated CI Suite", value: "46 Passing" },
    ],
    pipeline: [
      {
        stage: "SCRUB",
        title: "Semgrep SARIF 2.1.0 & Webhook Intake",
        state: "HMAC-SHA256 VERIFIED",
        detail: "Sanitizes embedded secrets and normalizes multi-scanner vulnerability records.",
      },
      {
        stage: "PRIORITIZE",
        title: "Canonical Fingerprint & Risk Engine",
        state: "EXPLAINABLE SCORING",
        detail: "Correlates duplicate findings across branches and weights exploit reachability.",
      },
      {
        stage: "VERIFY",
        title: "Cryptographically Verified Closure",
        state: "INDEPENDENT RETEST",
        detail: "Locks patch plans with SHA-256 digest and blocks closure until re-scan passes.",
      },
    ],
  },
  {
    id: "iot-cti-plane",
    code: "PLANE // 03",
    label: "Deception & CTI",
    system: "SENTINEL-IoT & CTI Graph",
    href: "/products/sentinel-iot",
    icon: Radio,
    metrics: [
      { label: "Botnet Vector Coverage", value: "Mirai / Gafgyt" },
      { label: "CTI Extraction Engine", value: "NLP + MITRE" },
      { label: "GitHub Community Stars", value: "27★ Combined" },
    ],
    pipeline: [
      {
        stage: "DECEIVE",
        title: "Isolated Protocol Honeypot Sensors",
        state: "EGRESS CONTAINED",
        detail: "Emulates vulnerable embedded services inside non-pivoting container namespaces.",
      },
      {
        stage: "EXTRACT",
        title: "Automated IOC & Dropper Triage",
        state: "DEFANGED TELEMETRY",
        detail: "Captures BusyBox command streams, credential dictionaries, and ELF metadata.",
      },
      {
        stage: "CORRELATE",
        title: "MITRE ATT&CK Knowledge Graph",
        state: "ALLOWLIST VERIFIED",
        detail: "Maps unstructured threat behaviors to official ATT&CK technique identifiers.",
      },
    ],
  },
] as const;

export function SecurityTelemetryConsole() {
  const [activePlaneId, setActivePlaneId] = useState<string>(ARCHITECTURE_PLANES[0].id);
  const [mode, setMode] = useState<"TELEMETRY" | "CLI">("TELEMETRY");
  const activePlane =
    ARCHITECTURE_PLANES.find((p) => p.id === activePlaneId) || ARCHITECTURE_PLANES[0];

  return (
    <div className="studio-card specular-top flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-brand-border/90">
      {/* Top Window Chrome Bar with Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-border/70 bg-background-elevated/90 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-primary/80 shadow-[0_0_8px_#00F58A]" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-border" />
          </div>
          <span className="font-mono text-[11px] font-semibold tracking-wider text-text-primary">
            CODE.COMMIT // CONTROL PLANE
          </span>
        </div>

        {/* Mode Toggle: Architecture Telemetry vs Interactive CLI */}
        <div className="flex items-center gap-1 rounded-lg border border-brand-border bg-background p-0.5 font-mono text-[10px]">
          <button
            type="button"
            onClick={() => setMode("TELEMETRY")}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2.5 py-1 transition-colors",
              mode === "TELEMETRY"
                ? "bg-brand-deep text-brand-primary font-semibold border border-brand-primary/40"
                : "text-text-muted hover:text-text-primary"
            )}
          >
            <Activity className="h-3 w-3" />
            <span>TELEMETRY</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("CLI")}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2.5 py-1 transition-colors",
              mode === "CLI"
                ? "bg-brand-deep text-brand-primary font-semibold border border-brand-primary/40"
                : "text-text-muted hover:text-text-primary"
            )}
          >
            <Terminal className="h-3 w-3" />
            <span>CLI CONSOLE</span>
          </button>
        </div>
      </div>

      {mode === "CLI" ? (
        <div className="p-3">
          <InteractiveTerminal embedded={true} />
        </div>
      ) : (
        <>
          {/* Plane Selector Tabs */}
          <div
            role="tablist"
            aria-label="Security Architecture Planes"
            className="grid grid-cols-3 border-b border-brand-border/60 bg-background/60 p-1.5 gap-1.5"
          >
            {ARCHITECTURE_PLANES.map((plane) => {
              const Icon = plane.icon;
              const isSelected = plane.id === activePlane.id;
              return (
                <button
                  key={plane.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActivePlaneId(plane.id)}
                  className={cn(
                    "flex flex-col items-start rounded-xl border px-3 py-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                    isSelected
                      ? "border-brand-primary/60 bg-background-card text-text-primary shadow-neon-sm"
                      : "border-transparent bg-transparent text-text-secondary hover:bg-background-elevated/60 hover:text-text-primary"
                  )}
                >
                  <div className="flex w-full items-center justify-between font-mono text-[10px]">
                    <span className={isSelected ? "text-brand-primary" : "text-text-muted"}>
                      {plane.code}
                    </span>
                    <Icon
                      className={cn(
                        "h-3.5 w-3.5",
                        isSelected ? "text-brand-primary" : "text-text-muted"
                      )}
                    />
                  </div>
                  <span className="mt-0.5 font-display text-xs font-bold tracking-tight">
                    {plane.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Plane Telemetry Body */}
          <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
            {/* Metrics Ribbon */}
            <div className="grid grid-cols-3 gap-2.5">
              {activePlane.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-brand-border/60 bg-background-elevated/70 px-3 py-2.5"
                >
                  <p className="font-mono text-sm font-bold text-brand-primary">
                    {metric.value}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] text-text-muted leading-tight">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            {/* 3-Stage Verification Pipeline */}
            <div className="space-y-2.5">
              {activePlane.pipeline.map((node, index) => (
                <div
                  key={node.stage}
                  className="group relative rounded-xl border border-brand-border/70 bg-background-elevated/80 p-3.5 transition-colors hover:border-brand-primary/50"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-brand-deep font-mono text-[10px] font-bold text-brand-primary border border-brand-primary/30">
                        0{index + 1}
                      </span>
                      <span className="font-mono text-[10px] font-bold tracking-wider text-brand-primary">
                        [{node.stage}]
                      </span>
                      <h4 className="font-display text-xs font-bold text-text-primary">
                        {node.title}
                      </h4>
                    </div>
                    <span className="rounded border border-brand-border bg-background px-2 py-0.5 font-mono text-[9px] text-text-secondary">
                      {node.state}
                    </span>
                  </div>
                  <p className="mt-1.5 pl-7 text-xs leading-relaxed text-text-secondary">
                    {node.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Inspection Bar */}
            <div className="flex items-center justify-between border-t border-brand-border/60 pt-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-text-secondary">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary" />
                <span>Reference System:</span>
                <strong className="text-text-primary">{activePlane.system}</strong>
              </div>
              <Link
                href={activePlane.href}
                className="inline-flex items-center gap-1 font-semibold text-brand-primary hover:underline"
              >
                <span>Inspect System</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
