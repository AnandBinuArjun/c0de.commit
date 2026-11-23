"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Severity } from "@/lib/security/lab-engine";
import { cn } from "@/lib/utils";

export const inputCls =
  "w-full rounded-lg border border-brand-border bg-background px-3 py-2 font-mono text-xs text-text-primary placeholder:text-text-muted focus:border-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40";

export const labelCls = "mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-text-muted";

export const buttonCls =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-brand-border bg-background-elevated px-4 py-2 font-mono text-xs text-text-primary transition-colors hover:border-brand-primary hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50";

const SEVERITY_STYLE: Record<Severity, string> = {
  CRITICAL: "border-status-error/60 bg-status-error/15 text-status-error",
  HIGH: "border-status-error/40 bg-status-error/10 text-status-error",
  MEDIUM: "border-status-warning/40 bg-status-warning/10 text-status-warning",
  LOW: "border-status-info/40 bg-status-info/10 text-status-info",
  INFO: "border-brand-border bg-background-elevated text-text-secondary",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span className={cn("inline-block shrink-0 rounded border px-2 py-0.5 font-mono text-[10px] font-semibold", SEVERITY_STYLE[severity])}>
      {severity}
    </span>
  );
}

export function FindingList({ findings }: { findings: { severity: Severity; message: string; fix?: string; meta?: string }[] }) {
  if (findings.length === 0) {
    return <p className="font-mono text-xs text-brand-primary">No findings for the rules in this checker.</p>;
  }
  return (
    <ul className="space-y-2" aria-label="Findings">
      {findings.map((f, i) => (
        <li key={`${f.message}-${i}`} className="flex items-start gap-3 rounded-lg border border-brand-border/70 bg-background/60 p-3">
          <SeverityBadge severity={f.severity} />
          <div className="min-w-0 space-y-1 text-xs">
            <p className="text-text-primary">
              {f.meta ? <span className="mr-2 font-mono text-text-muted">{f.meta}</span> : null}
              {f.message}
            </p>
            {f.fix ? <p className="text-text-secondary">Fix: {f.fix}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={cn(buttonCls, "min-h-[36px] px-3 py-1")}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {
          /* clipboard unavailable */
        }
      }}
      aria-live="polite"
    >
      {done ? <Check className="h-3.5 w-3.5 text-brand-primary" /> : <Copy className="h-3.5 w-3.5" />}
      <span>{done ? "Copied" : label}</span>
    </button>
  );
}

export function ToolFrame({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <h3 className="font-display text-xl font-semibold text-text-primary">{title}</h3>
        <p className="max-w-3xl text-sm text-text-secondary">{description}</p>
      </div>
      {children}
    </div>
  );
}
