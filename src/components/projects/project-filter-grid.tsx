"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  GitBranch,
  ArrowRight,
  Filter,
  Copy,
  Check,
  Terminal,
} from "lucide-react";
import type { ProjectItem } from "@/types";
import { filterProjects } from "@/components/projects/project-filter-utils";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

interface ProjectFilterGridProps {
  projects: ProjectItem[];
  baseRoute?: "/work" | "/products";
}

const TECH_COLOR_MAP: Record<string, string> = {
  Python: "#00F58A",
  TypeScript: "#38BDF8",
  React: "#00C878",
  "Next.js": "#F3F8F5",
  FastAPI: "#10B981",
  PostgreSQL: "#65B9FF",
  Docker: "#2563EB",
  Linux: "#F6B75C",
  AWS: "#F59E0B",
  "Microsoft Azure": "#60A5FA",
};

export function ProjectFilterGrid({
  projects,
  baseRoute = "/work",
}: ProjectFilterGridProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedTechnology, setSelectedTechnology] = useState("ALL");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return ["ALL", ...unique];
  }, [projects]);

  const technologies = useMemo(() => {
    const unique = Array.from(new Set(projects.flatMap((p) => p.technologies)));
    return ["ALL", ...unique];
  }, [projects]);

  const filtered = useMemo(
    () =>
      filterProjects(projects, {
        query,
        category: selectedCategory,
        technology: selectedTechnology,
      }),
    [projects, query, selectedCategory, selectedTechnology]
  );

  const handleCopyClone = async (project: ProjectItem) => {
    const cloneCmd = `git clone ${project.githubUrl}.git`;
    try {
      await navigator.clipboard.writeText(cloneCmd);
      setCopiedSlug(project.slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-8">
      {/* Filter Controls Bar */}
      <div className="rounded-2xl border border-brand-border bg-background-card p-6 space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-6 relative">
            <label htmlFor="project-search-input" className="sr-only">
              Search engineering projects
            </label>
            <Search className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-text-muted" />
            <input
              id="project-search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by project name, technology, or domain (e.g. CloudSentinel, IoT, MITRE)..."
              className="w-full rounded-lg border border-brand-border bg-background-elevated pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-primary focus:outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <label htmlFor="category-select" className="sr-only">
              Filter by category
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border border-brand-border bg-background-elevated px-3.5 py-2.5 text-sm text-text-primary focus:border-brand-primary focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "ALL" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <label htmlFor="technology-select" className="sr-only">
              Filter by technology
            </label>
            <select
              id="technology-select"
              value={selectedTechnology}
              onChange={(e) => setSelectedTechnology(e.target.value)}
              className="w-full rounded-lg border border-brand-border bg-background-elevated px-3.5 py-2.5 text-sm text-text-primary focus:border-brand-primary focus:outline-none"
            >
              {technologies.map((tech) => (
                <option key={tech} value={tech}>
                  {tech === "ALL" ? "All Technologies" : tech}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 pb-1">
          <span className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-text-muted mr-1">
            <Filter className="h-3.5 w-3.5 text-brand-primary" />
            <span>Domain:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 font-mono text-xs transition-colors",
                selectedCategory === cat
                  ? "border-brand-primary bg-brand-deep text-brand-primary"
                  : "border-brand-border bg-background-elevated text-text-secondary hover:border-brand-primary/50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between font-mono text-xs text-text-muted">
        <span>
          SHOWING {filtered.length} OF {projects.length} VERIFIED SYSTEMS
        </span>
        {(query || selectedCategory !== "ALL" || selectedTechnology !== "ALL") && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSelectedCategory("ALL");
              setSelectedTechnology("ALL");
            }}
            className="text-brand-primary hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Cards Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-brand-border bg-background-card p-12 text-center space-y-3">
          <p className="font-display text-xl font-bold text-text-primary">
            No matching engineering projects found.
          </p>
          <p className="text-sm text-text-secondary">
            Try clearing your search query or switching technology filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => {
            const detailUrl =
              baseRoute === "/products" || project.isProduct
                ? `/products/${project.slug}`
                : `/work/${project.slug}`;
            const topLangs = project.technologies.slice(0, 3);
            const shareWidth = Math.floor(100 / Math.max(topLangs.length, 1));

            return (
              <SpotlightCard
                key={project.slug}
                as="article"
                className="group flex flex-col justify-between p-6"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded bg-brand-deep px-2.5 py-0.5 font-mono text-[11px] text-brand-primary">
                      {project.category}
                    </span>
                    <span className="font-mono text-[11px] text-text-muted">
                      {project.statusLabel}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-display text-xl font-bold text-text-primary group-hover:text-brand-primary transition-colors">
                      <Link href={detailUrl}>{project.name}</Link>
                    </h2>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* GitHub-Style Language Proportion Telemetry Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-background-elevated">
                      {topLangs.map((lang, lIdx) => (
                        <div
                          key={lang}
                          style={{
                            width: `${lIdx === topLangs.length - 1 ? 100 - shareWidth * (topLangs.length - 1) : shareWidth}%`,
                            backgroundColor: TECH_COLOR_MAP[lang] || "#00F58A",
                          }}
                          title={lang}
                        />
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-text-muted">
                      <div className="flex items-center gap-2.5">
                        {topLangs.map((lang) => (
                          <span key={lang} className="inline-flex items-center gap-1">
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ backgroundColor: TECH_COLOR_MAP[lang] || "#00F58A" }}
                            />
                            <span>{lang}</span>
                          </span>
                        ))}
                      </div>
                      <span>OSS VERIFIED</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 border-t border-brand-border/60 pt-3">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-brand-primary">
                      Implemented Capabilities
                    </p>
                    <ul className="space-y-1 text-xs text-text-secondary">
                      {project.implementedFeatures.slice(0, 2).map((feat) => (
                        <li key={feat} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-primary shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-brand-border/70 bg-background-elevated px-2 py-0.5 font-mono text-[11px] text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action & 1-Click Git Clone Bar */}
                <div className="mt-6 space-y-3 border-t border-brand-border/60 pt-4">
                  <div className="flex items-center justify-between gap-2 rounded-lg border border-brand-border/70 bg-background-elevated/80 px-3 py-1.5 font-mono text-[11px]">
                    <div className="flex items-center gap-1.5 truncate text-text-secondary">
                      <Terminal className="h-3 w-3 text-brand-primary shrink-0" />
                      <span className="truncate">
                        git clone {project.githubUrl.replace("https://", "")}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyClone(project)}
                      aria-label={`Copy git clone command for ${project.name}`}
                      className="inline-flex shrink-0 items-center gap-1 rounded border border-brand-border bg-background-card px-2 py-0.5 text-[10px] text-text-primary hover:border-brand-primary hover:text-brand-primary"
                    >
                      {copiedSlug === project.slug ? (
                        <>
                          <Check className="h-3 w-3 text-brand-primary" />
                          <span className="text-brand-primary">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Clone</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <Link
                      href={detailUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary hover:underline"
                    >
                      <span>Architecture & Details</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs text-text-muted hover:text-text-primary"
                    >
                      <GitBranch className="h-3.5 w-3.5" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
