"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Clock,
  CheckSquare,
  Square,
} from "lucide-react";
import type { ContentSeriesItem } from "@/types";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "codecommit_completed_lessons_v1";

interface InsightsFilterCatalogProps {
  seriesList: ContentSeriesItem[];
}

export function InsightsFilterCatalog({ seriesList }: InsightsFilterCatalogProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PUBLISHED">("ALL");
  const [completedSlugs, setCompletedSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCompletedSlugs(parsed);
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleLessonComplete = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCompletedSlugs((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((item) => item !== slug)
        : [...prev, slug];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const filteredSeries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return seriesList.map((series) => {
      const matchingLessons = series.lessons.filter((lesson) => {
        const matchesStatus =
          statusFilter === "ALL" || (statusFilter === "PUBLISHED" && !lesson.isPlaceholder);
        const matchesQuery =
          !q ||
          lesson.title.toLowerCase().includes(q) ||
          lesson.summary.toLowerCase().includes(q) ||
          series.title.toLowerCase().includes(q);
        return matchesStatus && matchesQuery;
      });
      return {
        ...series,
        matchingLessons,
      };
    });
  }, [seriesList, query, statusFilter]);

  return (
    <div className="space-y-10">
      {/* Search & Status Toggle Bar */}
      <div className="rounded-2xl border border-brand-border bg-background-card p-6 space-y-4">
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-12">
          <div className="md:col-span-8 relative">
            <label htmlFor="insights-search-input" className="sr-only">
              Search educational lessons
            </label>
            <Search className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-text-muted" />
            <input
              id="insights-search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 60 lessons across Phishing, Passwords/MFA & Ransomware Defense..."
              className="w-full rounded-lg border border-brand-border bg-background-elevated pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-primary focus:outline-none"
            />
          </div>

          <div className="md:col-span-4 flex items-center justify-end gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setStatusFilter("ALL")}
              className={cn(
                "rounded-lg border px-3.5 py-2.5 transition-colors",
                statusFilter === "ALL"
                  ? "border-brand-primary bg-brand-deep text-brand-primary font-bold"
                  : "border-brand-border bg-background-elevated text-text-secondary"
              )}
            >
              All 20-Post Curricula
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("PUBLISHED")}
              className={cn(
                "rounded-lg border px-3.5 py-2.5 transition-colors",
                statusFilter === "PUBLISHED"
                  ? "border-brand-primary bg-brand-deep text-brand-primary font-bold"
                  : "border-brand-border bg-background-elevated text-text-secondary"
              )}
            >
              Published Lessons Only
            </button>
          </div>
        </div>

        {/* Overall Personal Progress Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-brand-border/50 pt-3 font-mono text-xs text-text-secondary">
          <span>
            PERSONAL STUDY TRACKER: <strong className="text-brand-primary">{completedSlugs.length}</strong>{" "}
            LESSONS MARKED COMPLETED
          </span>
          <span className="text-[11px] text-text-muted">
            Click the checkbox on any lesson card to track your progress locally
          </span>
        </div>
      </div>

      {/* Series Blocks */}
      {filteredSeries.map((series, sIdx) => {
        const publishedCount = series.lessons.filter((l) => !l.isPlaceholder).length;
        const userCompletedInSeries = series.lessons.filter((l) =>
          completedSlugs.includes(l.slug)
        ).length;
        const progressPct = Math.round(
          (userCompletedInSeries / series.totalPlannedPosts) * 100
        );

        return (
          <div
            key={series.slug}
            className="rounded-3xl border border-brand-border bg-background-card p-6 sm:p-10 space-y-7"
          >
            <div className="flex flex-col justify-between gap-4 border-b border-brand-border/60 pb-6 lg:flex-row lg:items-center">
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded bg-brand-deep px-2.5 py-0.5 font-mono text-xs text-brand-primary">
                    SERIES 0{sIdx + 1} · {series.categoryTag}
                  </span>
                  <span className="font-mono text-xs text-text-muted">
                    {publishedCount} Full Lessons Published / {series.totalPlannedPosts} Total
                    Modules
                  </span>
                  <span className="rounded border border-brand-primary/30 bg-background-elevated px-2.5 py-0.5 font-mono text-[11px] text-brand-primary">
                    {userCompletedInSeries}/{series.totalPlannedPosts} Completed ({progressPct}%)
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
                  {series.title}
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-text-secondary">
                  {series.description}
                </p>

                {/* Series Progress Bar */}
                <div className="h-1.5 w-full max-w-md overflow-hidden rounded-full bg-background-elevated">
                  <div
                    className="h-full bg-brand-primary transition-all duration-300"
                    style={{ width: `${Math.max(progressPct, 4)}%` }}
                  />
                </div>
              </div>

              <Link
                href={`/insights/${series.lessons[0].slug}`}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-background hover:bg-brand-secondary"
              >
                <span>Start Series (Lesson 01)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {series.matchingLessons.length === 0 ? (
              <p className="font-mono text-xs text-text-muted">
                No lessons in this series match your current filter.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {series.matchingLessons.map((lesson) => {
                  const isCompleted = completedSlugs.includes(lesson.slug);
                  return (
                    <Link
                      key={lesson.slug}
                      href={`/insights/${lesson.slug}`}
                      className={cn(
                        "group flex flex-col justify-between rounded-xl border p-4 transition-all",
                        isCompleted
                          ? "border-brand-primary/60 bg-brand-deep/25"
                          : "border-brand-border/80 bg-background-elevated hover:border-brand-primary/60"
                      )}
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between font-mono text-[11px]">
                          <span className="text-brand-primary font-bold">
                            LESSON {String(lesson.lessonNumber).padStart(2, "0")} / 20
                          </span>
                          {lesson.isPlaceholder ? (
                            <span className="inline-flex items-center gap-1 text-text-muted">
                              <Clock className="h-3 w-3" />
                              <span>OUTLINE</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-brand-primary">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>PUBLISHED</span>
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-sm font-bold leading-snug text-text-primary group-hover:text-brand-primary transition-colors">
                          {lesson.title}
                        </h3>
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-brand-border/40 flex items-center justify-between font-mono text-[11px]">
                        <button
                          type="button"
                          onClick={(e) => toggleLessonComplete(lesson.slug, e)}
                          aria-label={`Mark lesson ${lesson.lessonNumber} completed`}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 transition-colors",
                            isCompleted
                              ? "text-brand-primary font-bold"
                              : "text-text-muted hover:text-text-primary"
                          )}
                        >
                          {isCompleted ? (
                            <>
                              <CheckSquare className="h-3.5 w-3.5 text-brand-primary" />
                              <span>Done</span>
                            </>
                          ) : (
                            <>
                              <Square className="h-3.5 w-3.5" />
                              <span>Mark Read</span>
                            </>
                          )}
                        </button>
                        <BookOpen className="h-3.5 w-3.5 text-brand-primary" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
