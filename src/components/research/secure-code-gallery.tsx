"use client";

import React, { useState } from "react";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/tools/lab-ui";
import type { CodeExample } from "@/data/secure-code-gallery";

export function SecureCodeGallery({ examples }: { examples: CodeExample[] }) {
  const [activeId, setActiveId] = useState(examples[0]?.id ?? "");
  const active = examples.find((e) => e.id === activeId) ?? examples[0];
  if (!active) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      <nav aria-label="Weakness examples">
        <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
          {examples.map((e) => (
            <li key={e.id}>
              <button
                type="button"
                aria-current={e.id === active.id ? "true" : undefined}
                onClick={() => setActiveId(e.id)}
                className={cn(
                  "min-h-[44px] w-full rounded-lg border px-3 text-left text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50",
                  e.id === active.id ? "border-brand-primary bg-brand-deep text-text-primary" : "border-transparent text-text-secondary hover:border-brand-border"
                )}
              >
                <span className="block font-mono text-[10px] text-brand-primary">{e.cwe}</span>
                {e.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <article className="min-w-0 space-y-5" aria-live="polite">
        <header className="space-y-1.5">
          <p className="font-mono text-xs text-brand-primary">{active.cwe} · {active.language}</p>
          <h2 className="font-display text-2xl font-semibold text-text-primary">{active.title}</h2>
          <p className="text-sm text-text-secondary"><span className="font-semibold text-text-primary">Risk:</span> {active.risk}</p>
        </header>
        <div className="grid gap-4 xl:grid-cols-2">
          <section aria-labelledby="vuln-h" className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 id="vuln-h" className="flex items-center gap-2 font-mono text-xs font-semibold text-status-error"><ShieldAlert className="h-4 w-4" />Vulnerable</h3>
              <CopyButton text={active.vulnerable} />
            </div>
            <pre className="overflow-auto rounded-lg border border-status-error/40 bg-background p-4 font-mono text-xs leading-relaxed text-text-primary" tabIndex={0}><code>{active.vulnerable}</code></pre>
          </section>
          <section aria-labelledby="fix-h" className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 id="fix-h" className="flex items-center gap-2 font-mono text-xs font-semibold text-brand-primary"><ShieldCheck className="h-4 w-4" />Fixed</h3>
              <CopyButton text={active.fixed} />
            </div>
            <pre className="overflow-auto rounded-lg border border-brand-primary/40 bg-background p-4 font-mono text-xs leading-relaxed text-text-primary" tabIndex={0}><code>{active.fixed}</code></pre>
          </section>
        </div>
        <p className="rounded-lg border border-brand-border bg-background/60 p-4 text-sm text-text-secondary"><span className="font-semibold text-text-primary">Why it works:</span> {active.why}</p>
        <p className="font-mono text-[11px] text-text-muted">Educational, minimal examples. They are not taken from client work.</p>
      </article>
    </div>
  );
}
