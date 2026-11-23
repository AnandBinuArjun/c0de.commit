"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, BookOpen, ArrowRight, Clock, Filter } from "lucide-react";
import type { ResearchArticleItem, ResearchCategoryItem } from "@/types";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { formatDate, cn } from "@/lib/utils";

interface ResearchFilterFeedProps {
  articles: ResearchArticleItem[];
  categories: ResearchCategoryItem[];
}

export function ResearchFilterFeed({ articles, categories }: ResearchFilterFeedProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesCategory =
        selectedCategory === "ALL" || a.categorySlug === selectedCategory;
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.categoryName.toLowerCase().includes(q) ||
        a.mitreAttackRefs.some(
          (m) => m.id.toLowerCase().includes(q) || m.name.toLowerCase().includes(q)
        );
      return matchesCategory && matchesQuery;
    });
  }, [articles, query, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Bar */}
      <div className="rounded-2xl border border-brand-border bg-background-card p-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-8 relative">
            <label htmlFor="research-search-input" className="sr-only">
              Search technical research briefs
            </label>
            <Search className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-text-muted" />
            <input
              id="research-search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search research by title, MITRE ATT&CK technique (e.g. T1105, T1566), or topic..."
              className="w-full rounded-lg border border-brand-border bg-background-elevated pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-primary focus:outline-none"
            />
          </div>

          <div className="md:col-span-4">
            <label htmlFor="research-category-select" className="sr-only">
              Filter by research discipline
            </label>
            <select
              id="research-category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border border-brand-border bg-background-elevated px-3.5 py-2.5 text-sm text-text-primary focus:border-brand-primary focus:outline-none"
            >
              <option value="ALL">All 8 Research Disciplines</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 font-mono text-xs text-text-muted mr-1">
            <Filter className="h-3.5 w-3.5 text-brand-primary" />
            <span>Discipline:</span>
          </span>
          <button
            type="button"
            onClick={() => setSelectedCategory("ALL")}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-xs transition-colors",
              selectedCategory === "ALL"
                ? "border-brand-primary bg-brand-deep text-brand-primary"
                : "border-brand-border bg-background-elevated text-text-secondary hover:border-brand-primary/50"
            )}
          >
            ALL ({articles.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={cn(
                "rounded-full border px-3 py-1 font-mono text-xs transition-colors",
                selectedCategory === cat.slug
                  ? "border-brand-primary bg-brand-deep text-brand-primary"
                  : "border-brand-border bg-background-elevated text-text-secondary hover:border-brand-primary/50"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Feed */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filtered.map((article) => (
          <SpotlightCard
            key={article.slug}
            as="article"
            className="flex flex-col justify-between p-7"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Link
                  href={`/research/categories/${article.categorySlug}`}
                  className="rounded bg-brand-deep px-2.5 py-0.5 font-mono text-xs text-brand-primary hover:underline"
                >
                  {article.categoryName}
                </Link>
                <span className="rounded border border-status-warning/40 bg-status-warning/10 px-2.5 py-0.5 font-mono text-[10px] text-status-warning">
                  {article.statusLabel}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-text-primary hover:text-brand-primary transition-colors">
                <Link href={`/research/${article.slug}`}>{article.title}</Link>
              </h3>

              <p className="text-sm leading-relaxed text-text-secondary">
                {article.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {article.mitreAttackRefs.map((ref) => (
                  <span
                    key={ref.id}
                    className="rounded border border-brand-border bg-background-elevated px-2.5 py-0.5 font-mono text-[11px] text-text-muted"
                  >
                    MITRE ATT&CK {ref.id}: {ref.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-brand-border/60 pt-4 font-mono text-xs text-text-muted">
              <div className="flex items-center gap-3">
                <span>{formatDate(article.publishedAt)}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readingTimeMin} min
                </span>
              </div>
              <Link
                href={`/research/${article.slug}`}
                className="inline-flex items-center gap-1.5 font-semibold text-brand-primary hover:underline"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Read Brief</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}
