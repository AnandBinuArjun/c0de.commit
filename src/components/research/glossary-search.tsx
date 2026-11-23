"use client";

import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { inputCls, labelCls } from "@/components/tools/lab-ui";
import type { GlossaryTerm } from "@/data/glossary";

export function GlossarySearch({ terms }: { terms: GlossaryTerm[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(terms.map((t) => t.category)))], [terms]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return terms
      .filter((t) => (category === "All" || t.category === category) && (!q || t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)))
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [terms, query, category]);

  const slugify = (s: string) => `term-${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="sm:w-80">
          <label htmlFor="glossary-search" className={labelCls}>Search the glossary</label>
          <input id="glossary-search" type="search" className={inputCls} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. SSRF, zero trust" />
        </div>
        <div role="group" aria-label="Category" className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "min-h-[44px] rounded-lg border px-3 font-mono text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50",
                category === c ? "border-brand-primary bg-brand-deep text-brand-primary" : "border-brand-border text-text-secondary hover:border-brand-primary/60"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <p className="font-mono text-xs text-text-muted" aria-live="polite">{filtered.length} term(s)</p>
      <dl className="grid gap-4 md:grid-cols-2">
        {filtered.map((t) => (
          <div key={t.term} id={slugify(t.term)} className="space-y-2 rounded-xl border border-brand-border/70 bg-background-elevated/50 p-5">
            <dt className="flex items-center justify-between gap-2">
              <span className="font-display text-lg font-semibold text-text-primary">{t.term}</span>
              <span className="font-mono text-[10px] text-text-muted">{t.category}</span>
            </dt>
            <dd className="space-y-2 text-sm text-text-secondary">
              <p>{t.definition}</p>
              {t.see && t.see.length > 0 ? (
                <p className="font-mono text-[11px] text-text-muted">
                  See also:{" "}
                  {t.see.map((s, i) => {
                    const exists = terms.some((x) => x.term === s);
                    return (
                      <React.Fragment key={s}>
                        {i > 0 ? ", " : null}
                        {exists ? <a href={`#${slugify(s)}`} className="text-brand-primary hover:underline">{s}</a> : s}
                      </React.Fragment>
                    );
                  })}
                </p>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
