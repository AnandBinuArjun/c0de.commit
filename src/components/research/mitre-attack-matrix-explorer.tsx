"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Shield, GitBranch, BookOpen, ArrowUpRight, Filter } from "lucide-react";
import { RESEARCH_ARTICLES } from "@/data/research";
import { PROJECTS_DATA } from "@/data/projects";
import { cn } from "@/lib/utils";

interface MitreNode {
  id: string;
  name: string;
  tactic: string;
  articleSlug: string;
  articleTitle: string;
  categoryName: string;
  relatedProjectSlugs: string[];
}

export function MitreAttackMatrixExplorer() {
  const mitreNodes = useMemo<MitreNode[]>(() => {
    const nodes: MitreNode[] = [];
    for (const article of RESEARCH_ARTICLES) {
      for (const ref of article.mitreAttackRefs) {
        nodes.push({
          id: ref.id,
          name: ref.name,
          tactic: ref.tactic,
          articleSlug: article.slug,
          articleTitle: article.title,
          categoryName: article.categoryName,
          relatedProjectSlugs: article.relatedProjectSlugs,
        });
      }
    }
    return nodes;
  }, []);

  const tactics = useMemo(() => {
    const unique = Array.from(new Set(mitreNodes.map((n) => n.tactic)));
    return ["ALL TACTICS", ...unique];
  }, [mitreNodes]);

  const [selectedTactic, setSelectedTactic] = useState("ALL TACTICS");
  const [selectedNodeId, setSelectedNodeId] = useState<string>(mitreNodes[0]?.id || "T1110.001");

  const filteredNodes = useMemo(() => {
    if (selectedTactic === "ALL TACTICS") return mitreNodes;
    return mitreNodes.filter((n) => n.tactic === selectedTactic);
  }, [mitreNodes, selectedTactic]);

  const activeNode =
    mitreNodes.find((n) => n.id === selectedNodeId) || filteredNodes[0] || mitreNodes[0];

  const linkedProjects = useMemo(() => {
    if (!activeNode) return [];
    return PROJECTS_DATA.filter((p) => activeNode.relatedProjectSlugs.includes(p.slug));
  }, [activeNode]);

  if (!activeNode) return null;

  return (
    <div className="rounded-3xl border border-brand-border/90 bg-[#050C08]/90 shadow-card-elevated overflow-hidden">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-border/80 bg-background-elevated/90 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <Shield className="h-4 w-4 text-brand-primary" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-text-primary">
            MITRE ATT&CK® ENTERPRISE COVERAGE & DEFENSIVE SOFTWARE MAP
          </span>
        </div>

        {/* Tactic Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <Filter className="h-3.5 w-3.5 text-brand-primary mr-1 shrink-0" />
          {tactics.map((tactic) => (
            <button
              key={tactic}
              type="button"
              onClick={() => setSelectedTactic(tactic)}
              className={cn(
                "shrink-0 rounded-lg border px-2.5 py-1 font-mono text-[10px] transition-colors",
                selectedTactic === tactic
                  ? "border-brand-primary bg-brand-deep text-brand-primary font-bold"
                  : "border-brand-border bg-background-card text-text-secondary hover:border-brand-primary/50"
              )}
            >
              {tactic}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-brand-border/70">
        {/* Left 7 Columns: Technique Matrix Cells */}
        <div className="lg:col-span-7 p-5">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-text-muted">
            Select an ATT&CK Technique ID to inspect its Research Brief & Countermeasure Software:
          </p>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {filteredNodes.map((node) => {
              const isSelected =
                node.id === activeNode.id && node.articleSlug === activeNode.articleSlug;
              return (
                <button
                  key={`${node.id}-${node.articleSlug}`}
                  type="button"
                  onClick={() => setSelectedNodeId(node.id)}
                  className={cn(
                    "flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all",
                    isSelected
                      ? "border-brand-primary bg-brand-deep/70 shadow-neon-sm"
                      : "border-brand-border/70 bg-background-card/80 hover:border-brand-primary/50"
                  )}
                >
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="font-bold text-brand-primary">{node.id}</span>
                    <span className="rounded bg-background-elevated px-2 py-0.5 text-[9px] text-text-muted">
                      {node.tactic}
                    </span>
                  </div>
                  <p className="mt-1.5 font-display text-xs font-bold text-text-primary">
                    {node.name}
                  </p>
                  <p className="mt-1 truncate font-mono text-[10px] text-text-secondary">
                    Discipline: {node.categoryName}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 5 Columns: Selected Technique Research & Software Countermeasure Inspector */}
        <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between space-y-5 bg-background-secondary/60">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-brand-primary/40 bg-brand-deep px-3 py-1 font-mono text-xs font-bold text-brand-primary">
                ATT&CK {activeNode.id}
              </span>
              <span className="font-mono text-xs text-text-muted">
                TACTIC: {activeNode.tactic.toUpperCase()}
              </span>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-text-primary">
                {activeNode.name}
              </h3>
              <p className="mt-1 font-mono text-xs text-brand-primary">
                Research Discipline: {activeNode.categoryName}
              </p>
            </div>

            {/* Linked Research Publication */}
            <div className="rounded-xl border border-brand-border bg-background-card p-4 space-y-2">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-brand-primary">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Primary Research Publication</span>
              </div>
              <Link
                href={`/research/${activeNode.articleSlug}`}
                className="block font-display text-sm font-bold text-text-primary hover:text-brand-primary"
              >
                {activeNode.articleTitle} →
              </Link>
            </div>

            {/* Linked Defensive Software Repositories */}
            <div className="rounded-xl border border-brand-border bg-background-card p-4 space-y-2.5">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-brand-primary">
                <GitBranch className="h-3.5 w-3.5" />
                <span>Verified Software Countermeasures</span>
              </div>
              <div className="space-y-2">
                {linkedProjects.map((proj) => (
                  <div
                    key={proj.slug}
                    className="flex items-center justify-between rounded-lg border border-brand-border/60 bg-background-elevated px-3 py-2 text-xs"
                  >
                    <Link
                      href={proj.isProduct ? `/products/${proj.slug}` : `/work/${proj.slug}`}
                      className="font-display font-bold text-text-primary hover:text-brand-primary"
                    >
                      {proj.name}
                    </Link>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-brand-primary hover:underline"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link
            href={`/research/${activeNode.articleSlug}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider text-background hover:bg-brand-secondary transition-colors"
          >
            <span>Inspect Full Technical Brief</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
