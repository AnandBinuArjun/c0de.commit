import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import {
  getAllInsightLessons,
  getInsightLessonBySlug,
} from "@/data/insights";

export async function generateStaticParams() {
  return getAllInsightLessons().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = getInsightLessonBySlug(slug);
  if (!found) return { title: "Lesson Not Found" };
  return {
    title: `Lesson ${found.lesson.lessonNumber}: ${found.lesson.title} — ${found.series.title}`,
    description: found.lesson.summary,
  };
}

export default async function InsightLessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = getInsightLessonBySlug(slug);
  if (!found) return notFound();

  const { lesson, series, prevLesson, nextLesson } = found;

  return (
    <div className="space-y-0">
      {/* Header */}
      <section className="border-b border-brand-border/70 bg-technical-grid py-16 lg:py-20">
        <div className="container mx-auto max-w-4xl space-y-6">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 font-mono text-xs text-brand-primary hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Educational Series</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-brand-primary/40 bg-brand-deep px-3.5 py-1 font-mono text-xs text-brand-primary">
              {series.title} · LESSON {String(lesson.lessonNumber).padStart(2, "0")} /{" "}
              {series.totalPlannedPosts}
            </span>
            {lesson.isPlaceholder ? (
              <span className="rounded-full border border-status-warning/40 bg-status-warning/10 px-3.5 py-1 font-mono text-xs text-status-warning">
                STRUCTURED CURRICULUM PLACEHOLDER
              </span>
            ) : (
              <span className="rounded-full border border-brand-primary/40 bg-background-elevated px-3.5 py-1 font-mono text-xs text-brand-primary">
                PUBLISHED LESSON
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl font-bold leading-tight text-text-primary sm:text-5xl">
            {lesson.title}
          </h1>

          <p className="text-lg leading-relaxed text-text-secondary">
            {lesson.summary}
          </p>
        </div>
      </section>

      {/* Lesson Structured Content */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container mx-auto max-w-4xl space-y-8">
          {lesson.isPlaceholder && (
            <div className="rounded-2xl border border-status-warning/40 bg-status-warning/10 p-6 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-status-warning">
                <ShieldAlert className="h-4 w-4" />
                <span>CONTENT INTEGRITY NOTICE — UNRELEASED SERIES MODULE</span>
              </div>
              <p className="text-sm leading-relaxed text-text-primary">
                Per Section 10 of the CODE.COMMIT specification, full article bodies are never
                fabricated when only series titles or outlines are available. This lesson slot is
                reserved for Lesson {String(lesson.lessonNumber).padStart(2, "0")} of{" "}
                <strong>{series.title}</strong> ({series.instagramHandle}).
              </p>
            </div>
          )}

          {/* 1. Series Overview Context */}
          <div className="rounded-2xl border border-brand-border bg-background-card p-6 sm:p-8 space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              [ 01 // SERIES CONTEXT ]
            </p>
            <h2 className="font-display text-xl font-bold text-text-primary">
              {series.title} ({series.subtitle})
            </h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              {series.description}
            </p>
          </div>

          {/* 2. Threat Explanation */}
          <div className="rounded-2xl border border-brand-border bg-background-card p-6 sm:p-8 space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              [ 02 // THREAT EXPLANATION ]
            </p>
            <h2 className="font-display text-2xl font-bold text-text-primary">
              How the attack or vulnerability works
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              {lesson.threatExplanation}
            </p>
          </div>

          {/* 3. Realistic Example */}
          <div className="rounded-2xl border border-brand-border bg-background-card p-6 sm:p-8 space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              [ 03 // REALISTIC SCENARIO ]
            </p>
            <h2 className="font-display text-2xl font-bold text-text-primary">
              Practical engineering scenario
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              {lesson.realisticExample}
            </p>
          </div>

          {/* 4. Defensive Recommendations */}
          <div className="rounded-2xl border border-brand-primary/40 bg-background-card p-6 sm:p-8 space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              [ 04 // DEFENSIVE RECOMMENDATIONS ]
            </p>
            <h2 className="font-display text-2xl font-bold text-text-primary">
              Actionable security controls
            </h2>
            <ul className="space-y-3">
              {lesson.defensiveRecommendations.map((rec) => (
                <li
                  key={rec}
                  className="flex items-start gap-3 rounded-xl border border-brand-border bg-background-elevated p-4 text-sm text-text-primary"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Further Reading */}
          <div className="rounded-2xl border border-brand-border bg-background-card p-6 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-primary">
              <BookOpen className="h-4 w-4" />
              <span>Further Reading & Standards</span>
            </div>
            <ul className="space-y-2 text-xs">
              {lesson.furtherReading.map((url) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-text-secondary hover:text-brand-primary"
                  >
                    <span>{url}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 6. Next / Prev Lesson Navigation */}
          <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
            {prevLesson ? (
              <Link
                href={`/insights/${prevLesson.slug}`}
                className="flex flex-col justify-between rounded-xl border border-brand-border bg-background-card p-5 hover:border-brand-primary"
              >
                <span className="font-mono text-xs text-text-muted">← Previous Lesson</span>
                <span className="mt-1 font-display text-base font-bold text-text-primary">
                  Lesson {String(prevLesson.lessonNumber).padStart(2, "0")}: {prevLesson.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextLesson && (
              <Link
                href={`/insights/${nextLesson.slug}`}
                className="flex flex-col justify-between rounded-xl border border-brand-primary/50 bg-background-card p-5 text-right hover:bg-brand-deep/30"
              >
                <span className="inline-flex items-center justify-end gap-1 font-mono text-xs text-brand-primary">
                  <span>Next Lesson</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="mt-1 font-display text-base font-bold text-text-primary">
                  Lesson {String(nextLesson.lessonNumber).padStart(2, "0")}: {nextLesson.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
