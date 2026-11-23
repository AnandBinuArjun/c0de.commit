import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import {
  getResearchArticlesByCategory,
  getResearchCategoryBySlug,
  RESEARCH_CATEGORIES,
} from "@/data/research";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return RESEARCH_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getResearchCategoryBySlug(category);
  if (!cat) return { title: "Category Not Found" };
  return {
    title: `${cat.name} Research Briefs — Security Research Lab`,
    description: cat.description,
  };
}

export default async function ResearchCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getResearchCategoryBySlug(category);
  if (!cat) return notFound();

  const articles = getResearchArticlesByCategory(cat.slug);

  return (
    <div className="space-y-0">
      <section className="border-b border-brand-border/70 bg-technical-grid py-16 lg:py-20">
        <div className="container mx-auto space-y-5">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 font-mono text-xs text-brand-primary hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Research Categories</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-background-elevated px-3.5 py-1 font-mono text-xs text-brand-primary">
            <span>[ RESEARCH DISCIPLINE: {cat.name.toUpperCase()} ]</span>
          </div>

          <h1 className="font-display text-4xl font-bold text-text-primary sm:text-5xl">
            {cat.name}
          </h1>
          <p className="max-w-3xl text-lg text-text-secondary">{cat.description}</p>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="flex flex-col justify-between rounded-2xl border border-brand-border bg-background-card p-6 space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-brand-primary">
                      {article.categoryName}
                    </span>
                    <span className="rounded border border-status-warning/40 bg-status-warning/10 px-2 py-0.5 font-mono text-[10px] text-status-warning">
                      {article.statusLabel}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-text-primary hover:text-brand-primary">
                    <Link href={`/research/${article.slug}`}>{article.title}</Link>
                  </h2>
                  <p className="text-sm text-text-secondary">{article.summary}</p>
                </div>

                <div className="flex items-center justify-between border-t border-brand-border/60 pt-4 font-mono text-xs text-text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readingTimeMin} min read · {formatDate(article.publishedAt)}
                  </span>
                  <Link
                    href={`/research/${article.slug}`}
                    className="inline-flex items-center gap-1 text-brand-primary hover:underline"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Read Brief</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
