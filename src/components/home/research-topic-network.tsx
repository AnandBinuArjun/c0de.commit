"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowUpRight,
  ArrowRight,
  Clock,
  GitBranch,
  Network,
} from "lucide-react";
import { RESEARCH_ARTICLES } from "@/data/research";
import { cn, formatDate } from "@/lib/utils";

interface TopicNode {
  id: string;
  label: string;
  categorySlug: string;
  x: number;
  y: number;
  connections: string[];
}

const RESEARCH_TOPIC_NODES: TopicNode[] = [
  {
    id: "threat-intelligence",
    label: "Threat Intelligence",
    categorySlug: "threat-intelligence",
    x: 110,
    y: 65,
    connections: ["malware-analysis", "iot-security", "ai-security"],
  },
  {
    id: "malware-analysis",
    label: "Malware Analysis",
    categorySlug: "malware-analysis",
    x: 280,
    y: 50,
    connections: ["iot-security", "digital-forensics"],
  },
  {
    id: "iot-security",
    label: "IoT Security",
    categorySlug: "iot-security",
    x: 440,
    y: 72,
    connections: ["digital-forensics", "cloud-security"],
  },
  {
    id: "digital-forensics",
    label: "Digital Forensics",
    categorySlug: "digital-forensics",
    x: 380,
    y: 165,
    connections: ["cloud-security", "ai-security"],
  },
  {
    id: "cloud-security",
    label: "Cloud Security",
    categorySlug: "cloud-security",
    x: 240,
    y: 195,
    connections: ["application-security", "offensive-security"],
  },
  {
    id: "application-security",
    label: "Application Security",
    categorySlug: "secure-development",
    x: 95,
    y: 175,
    connections: ["offensive-security", "threat-intelligence"],
  },
  {
    id: "offensive-security",
    label: "Offensive Security",
    categorySlug: "offensive-security",
    x: 185,
    y: 120,
    connections: ["cloud-security", "application-security", "ai-security"],
  },
  {
    id: "ai-security",
    label: "AI Security",
    categorySlug: "defensive-security",
    x: 310,
    y: 118,
    connections: ["threat-intelligence", "digital-forensics"],
  },
];

export function ResearchTopicNetwork() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("ALL");

  const activeNode = RESEARCH_TOPIC_NODES.find((n) => n.id === selectedNodeId);

  const filteredArticles = useMemo(() => {
    if (selectedNodeId === "ALL" || !activeNode) {
      return RESEARCH_ARTICLES;
    }
    const matching = RESEARCH_ARTICLES.filter(
      (a) => a.categorySlug === activeNode.categorySlug
    );
    return matching.length > 0 ? matching : RESEARCH_ARTICLES;
  }, [selectedNodeId, activeNode]);

  const leadArticle = filteredArticles[0] || RESEARCH_ARTICLES[0];
  const supportingArticles = filteredArticles.slice(1, 5);

  return (
    <div className="space-y-8">
      {/* Accessible Category Filter Pills + Interactive Node Graph */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left 6 Columns: Interactive Connected Topic Constellation Graph */}
        <div className="lg:col-span-6 surface-glass rounded-3xl p-6 flex flex-col justify-between space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
              <Network className="h-4 w-4" />
              <span>RESEARCH KNOWLEDGE CONSTELLATION</span>
            </div>
            <span className="font-mono text-[10px] text-text-muted">
              CONCEPTUAL TOPIC GRAPH · CLICK NODE TO FILTER
            </span>
          </div>

          {/* Connected SVG Topic Graph */}
          <div className="relative rounded-2xl border border-brand-border/50 bg-[#040907]/90 p-3">
            <svg
              viewBox="0 0 540 245"
              fill="none"
              className="w-full h-56 select-none"
              role="img"
              aria-label="Interactive Research Topic Network mapping 8 cybersecurity research domains"
            >
              {/* Edges */}
              {RESEARCH_TOPIC_NODES.flatMap((node) =>
                node.connections.map((targetId) => {
                  const target = RESEARCH_TOPIC_NODES.find((n) => n.id === targetId);
                  if (!target) return null;
                  const isHighlighted =
                    selectedNodeId === "ALL" ||
                    selectedNodeId === node.id ||
                    selectedNodeId === target.id;
                  return (
                    <line
                      key={`${node.id}-${target.id}`}
                      x1={node.x}
                      y1={node.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={isHighlighted ? "#00F58A" : "#204D35"}
                      strokeOpacity={isHighlighted ? "0.48" : "0.25"}
                      strokeWidth={isHighlighted ? "1.5" : "1"}
                    />
                  );
                })
              )}

              {/* Nodes */}
              {RESEARCH_TOPIC_NODES.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const isAll = selectedNodeId === "ALL";
                return (
                  <g
                    key={node.id}
                    onClick={() =>
                      setSelectedNodeId((prev) => (prev === node.id ? "ALL" : node.id))
                    }
                    className="cursor-pointer"
                  >
                    {isSelected && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="22"
                        stroke="#00F58A"
                        strokeWidth="1.2"
                        strokeOpacity="0.45"
                      />
                    )}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isSelected ? "11" : "8"}
                      fill={isSelected ? "#00F58A" : "#0B3824"}
                      stroke="#00F58A"
                      strokeWidth="1.6"
                    />
                    <rect
                      x={node.x - 56}
                      y={node.y + 13}
                      width="112"
                      height="18"
                      rx="4"
                      fill="#050B08"
                      fillOpacity="0.88"
                      stroke={isSelected ? "#00F58A" : "#204D35"}
                      strokeWidth="0.9"
                    />
                    <text
                      x={node.x}
                      y={node.y + 25}
                      textAnchor="middle"
                      fill={isSelected || isAll ? "#F3F8F5" : "#A5B7AA"}
                      fontSize="8.5"
                      fontFamily="monospace"
                      fontWeight={isSelected ? "bold" : "normal"}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Accessible Text-Based Category Filter Alternative */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-[11px] text-text-muted">
              <span>ACCESSIBLE DISCIPLINE FILTER:</span>
              {selectedNodeId !== "ALL" && (
                <button
                  type="button"
                  onClick={() => setSelectedNodeId("ALL")}
                  className="text-brand-primary hover:underline"
                >
                  Show All Disciplines
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedNodeId("ALL")}
                className={cn(
                  "rounded-lg border px-2.5 py-1 font-mono text-[11px] transition-colors",
                  selectedNodeId === "ALL"
                    ? "border-brand-primary bg-brand-deep text-brand-primary font-bold"
                    : "border-brand-border/60 bg-background-elevated text-text-secondary hover:text-text-primary"
                )}
              >
                All Topics ({RESEARCH_ARTICLES.length})
              </button>
              {RESEARCH_TOPIC_NODES.map((node) => (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNodeId(node.id)}
                  className={cn(
                    "rounded-lg border px-2.5 py-1 font-mono text-[11px] transition-colors",
                    selectedNodeId === node.id
                      ? "border-brand-primary bg-brand-deep text-brand-primary font-bold"
                      : "border-brand-border/60 bg-background-elevated text-text-secondary hover:text-text-primary"
                  )}
                >
                  {node.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 6 Columns: Featured Paper-Style Lead Research Article */}
        {leadArticle && (
          <article className="lg:col-span-6 surface-immersive rounded-3xl p-7 sm:p-9 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-border/50 pb-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-brand-primary/40 bg-brand-deep px-3 py-1 font-mono text-xs text-brand-primary">
                    FEATURED PAPER · {leadArticle.categoryName}
                  </span>
                </div>
                <span className="rounded border border-status-warning/40 bg-status-warning/10 px-2.5 py-0.5 font-mono text-[10px] text-status-warning">
                  {leadArticle.statusLabel}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-2xl font-bold leading-snug text-text-primary sm:text-3xl">
                  <Link
                    href={`/research/${leadArticle.slug}`}
                    className="hover:text-brand-primary transition-colors"
                  >
                    {leadArticle.title}
                  </Link>
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
                  {leadArticle.summary}
                </p>
              </div>

              {/* Paper Metadata & Visual Abstract Box */}
              <div className="rounded-2xl border border-brand-border/60 bg-[#040907]/85 p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-text-muted">
                  <span>AUTHOR: {leadArticle.authorName.toUpperCase()}</span>
                  <span className="inline-flex items-center gap-1 text-brand-primary">
                    <Clock className="h-3 w-3" />
                    <span>{leadArticle.readingTimeMin} MIN TECHNICAL PAPER</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {leadArticle.mitreAttackRefs.map((ref) => (
                    <span
                      key={ref.id}
                      className="rounded-lg border border-brand-border bg-background-elevated px-2.5 py-1 font-mono text-xs text-text-primary"
                    >
                      <strong className="text-brand-primary">{ref.id}</strong> · {ref.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-brand-border/50 pt-5">
              <Link
                href={`/research/${leadArticle.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-background hover:bg-brand-secondary transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                <span>Read Technical Paper</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="font-mono text-xs text-text-muted">
                Updated {formatDate(leadArticle.updatedAt)}
              </span>
            </div>
          </article>
        )}
      </div>

      {/* Supporting Editorial Research Papers Row */}
      {supportingArticles.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {supportingArticles.map((article, idx) => (
            <article
              key={article.slug}
              className="surface-glass flex flex-col justify-between rounded-2xl p-5 space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-brand-primary font-bold">
                    PAPER // 0{idx + 2} · {article.categoryName}
                  </span>
                  <span className="text-text-muted">{article.readingTimeMin}m</span>
                </div>
                <h4 className="font-display text-base font-bold leading-snug text-text-primary">
                  <Link
                    href={`/research/${article.slug}`}
                    className="hover:text-brand-primary transition-colors"
                  >
                    {article.title}
                  </Link>
                </h4>
                <p className="text-xs leading-relaxed text-text-secondary line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-brand-border/40 pt-3 font-mono text-xs">
                <span className="text-[10px] text-text-muted">
                  {article.mitreAttackRefs[0]?.id || "MITRE"}
                </span>
                <Link
                  href={`/research/${article.slug}`}
                  className="inline-flex items-center gap-1 text-brand-primary font-semibold hover:underline"
                >
                  <span>Read</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
