import React from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, GitBranch } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Props {
  publishedAt: string;
  updatedAt: string;
  statusLabel: string;
  repos: { name: string; githubUrl: string; note: string }[];
}

/** Reproducibility links and revision history derived from real article metadata. */
export function ArticleProvenance({ publishedAt, updatedAt, statusLabel, repos }: Props) {
  const revised = publishedAt !== updatedAt;
  return (
    <section aria-labelledby="provenance-heading" className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="space-y-3 rounded-2xl border border-brand-border bg-background-card p-6">
        <h3 id="provenance-heading" className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-brand-primary">
          <GitBranch className="h-4 w-4" /> Reproduce &amp; verify
        </h3>
        <p className="text-xs text-text-secondary">
          Source code and verification notes for the systems this brief draws on. Repository links are the primary artefacts; check each repository for current state.
        </p>
        {repos.length > 0 ? (
          <ul className="space-y-2">
            {repos.map((r) => (
              <li key={r.githubUrl}>
                <a href={r.githubUrl} target="_blank" rel="noopener noreferrer" className="group flex min-h-[44px] items-start justify-between gap-2 rounded-lg border border-brand-border/60 p-3 text-xs hover:border-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50">
                  <span>
                    <span className="block font-mono text-text-primary">{r.name}</span>
                    <span className="block text-text-muted">{r.note}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-text-muted group-hover:text-brand-primary" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-mono text-xs text-text-muted">No linked repository for this brief.</p>
        )}
      </div>
      <div className="space-y-3 rounded-2xl border border-brand-border bg-background-card p-6">
        <h3 className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-brand-primary">
          <Clock className="h-4 w-4" /> Revision history
        </h3>
        <ol className="space-y-3 border-l border-brand-border pl-4 text-xs">
          <li className="relative">
            <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-brand-primary" aria-hidden />
            <div className="font-mono text-text-primary">{formatDate(publishedAt)}</div>
            <div className="text-text-secondary">First published</div>
          </li>
          {revised ? (
            <li className="relative">
              <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-brand-primary" aria-hidden />
              <div className="font-mono text-text-primary">{formatDate(updatedAt)}</div>
              <div className="text-text-secondary">Last updated</div>
            </li>
          ) : null}
        </ol>
        <p className="text-xs text-text-secondary">Status: <span className="font-mono text-status-warning">{statusLabel}</span></p>
        <p className="text-xs text-text-muted">
          Found an error? <Link href="/disclosure" className="text-brand-primary hover:underline">Tell us</Link> and we will correct it.
        </p>
      </div>
    </section>
  );
}
