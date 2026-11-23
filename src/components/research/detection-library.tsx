"use client";

import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { CopyButton, inputCls, labelCls } from "@/components/tools/lab-ui";
import type { DetectionRule, RuleFormat } from "@/data/detections";

const FORMATS: ("All" | RuleFormat)[] = ["All", "Sigma", "YARA", "Suricata"];

export function DetectionLibrary({ rules }: { rules: DetectionRule[] }) {
  const [format, setFormat] = useState<"All" | RuleFormat>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rules.filter((r) => {
      if (format !== "All" && r.format !== format) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.attack.some((a) => a.id.toLowerCase().includes(q) || a.name.toLowerCase().includes(q) || a.tactic.toLowerCase().includes(q))
      );
    });
  }, [rules, format, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div role="group" aria-label="Rule format" className="flex flex-wrap gap-2">
          {FORMATS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={format === f}
              onClick={() => setFormat(f)}
              className={cn(
                "min-h-[44px] rounded-lg border px-4 font-mono text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50",
                format === f ? "border-brand-primary bg-brand-deep text-brand-primary" : "border-brand-border text-text-secondary hover:border-brand-primary/60"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="sm:w-72">
          <label htmlFor="rule-search" className={labelCls}>Search rules or ATT&amp;CK IDs</label>
          <input id="rule-search" className={inputCls} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. T1059 or powershell" />
        </div>
      </div>
      <p className="font-mono text-xs text-text-muted" aria-live="polite">{filtered.length} of {rules.length} rules</p>
      <div className="space-y-5">
        {filtered.map((r) => (
          <article key={r.id} className="space-y-3 rounded-2xl border border-brand-border/70 bg-background-elevated/50 p-5" aria-labelledby={r.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded border border-brand-primary/40 bg-brand-deep px-2 py-0.5 font-mono text-[10px] text-brand-primary">{r.format}</span>
                  {r.attack.map((a) => (
                    <a key={a.id} href={`https://attack.mitre.org/techniques/${a.id.replace(".", "/")}/`} target="_blank" rel="noopener noreferrer" className="rounded border border-brand-border px-2 py-0.5 font-mono text-[10px] text-text-secondary hover:border-brand-primary hover:text-brand-primary" title={`${a.name} (${a.tactic})`}>
                      {a.id}
                    </a>
                  ))}
                </div>
                <h3 id={r.id} className="font-display text-lg font-semibold text-text-primary">{r.title}</h3>
              </div>
              <CopyButton text={r.code} label="Copy rule" />
            </div>
            <p className="text-sm text-text-secondary">{r.description}</p>
            <pre className="max-h-80 overflow-auto rounded-lg border border-brand-border bg-background p-4 font-mono text-xs leading-relaxed text-text-primary" tabIndex={0}><code>{r.code}</code></pre>
            <p className="text-xs text-text-muted"><span className="font-semibold text-text-secondary">Likely false positives:</span> {r.falsePositives}</p>
          </article>
        ))}
        {filtered.length === 0 ? <p className="font-mono text-sm text-text-muted">No rules match.</p> : null}
      </div>
    </div>
  );
}
