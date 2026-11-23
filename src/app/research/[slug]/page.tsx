import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Shield,
  ExternalLink,
  GitBranch,
  ListTree,
} from "lucide-react";
import {
  getResearchArticleBySlug,
  RESEARCH_ARTICLES,
} from "@/data/research";
import { PROJECTS_DATA } from "@/data/projects";
import { CodeBlock } from "@/components/research/code-block";
import { ResearchReadingChrome } from "@/components/research/research-reading-chrome";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return RESEARCH_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getResearchArticleBySlug(slug);
  if (!article) return { title: "Research Article Not Found" };
  return {
    title: `${article.title} — Research Lab`,
    description: article.summary,
  };
}

export default async function ResearchArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getResearchArticleBySlug(slug);
  if (!article) return notFound();

  const relatedProjects = PROJECTS_DATA.filter((p) =>
    article.relatedProjectSlugs.includes(p.slug)
  );
  const relatedArticles = RESEARCH_ARTICLES.filter(
    (a) => a.slug !== article.slug
  ).slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.summary,
    author: {
      "@type": "Person",
      name: article.authorName,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    articleSection: article.categoryName,
  };

  return (
    <div className="space-y-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Article Header */}
      <section className="border-b border-brand-border/70 bg-technical-grid py-16 lg:py-20">
        <div className="container mx-auto max-w-5xl space-y-6">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 font-mono text-xs text-brand-primary hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Security Research Lab</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/research/categories/${article.categorySlug}`}
              className="rounded-full border border-brand-primary/40 bg-brand-deep px-3.5 py-1 font-mono text-xs text-brand-primary"
            >
              {article.categoryName}
            </Link>
            <span className="rounded-full border border-status-warning/40 bg-status-warning/10 px-3.5 py-1 font-mono text-xs text-status-warning">
              {article.statusLabel}
            </span>
          </div>

          <h1 className="font-display text-3xl font-bold leading-tight text-text-primary sm:text-5xl">
            {article.title}
          </h1>

          <p className="text-lg leading-relaxed text-text-secondary">
            {article.summary}
          </p>

          {/* Author & Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-brand-border/60 pt-5 font-mono text-xs text-text-muted">
            <div>
              <span className="text-text-primary font-semibold">{article.authorName}</span>
              <span> · {article.authorRole}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Published: {formatDate(article.publishedAt)}</span>
              <span>Updated: {formatDate(article.updatedAt)}</span>
              <span className="inline-flex items-center gap-1 text-brand-primary">
                <Clock className="h-3.5 w-3.5" />
                {article.readingTimeMin} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content + Sidebar TOC & MITRE */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Sidebar: Scroll-Spy TOC + MITRE ATT&CK Mappings + Citation Copier */}
            <aside className="lg:col-span-4">
              <ResearchReadingChrome
                articleTitle={article.title}
                articleSlug={article.slug}
                authorName={article.authorName}
                publishedAt={article.publishedAt}
                toc={article.tableOfContents}
                mitreRefs={article.mitreAttackRefs}
              />
            </aside>

            {/* Article Sections */}
            <article className="lg:col-span-8 space-y-10">
              {article.sections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 space-y-4 rounded-2xl border border-brand-border/70 bg-background-card p-6 sm:p-8"
                >
                  <h2 className="font-display text-2xl font-bold text-text-primary">
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-base leading-relaxed text-text-secondary"
                    >
                      {p}
                    </p>
                  ))}

                  {section.diagramNote && (
                    <div className="rounded-xl border border-brand-primary/30 bg-background-elevated p-4 font-mono text-xs text-brand-primary">
                      {section.diagramNote}
                    </div>
                  )}

                  {section.codeSnippet && (
                    <div className="pt-2">
                      <CodeBlock
                        language={section.codeSnippet.language}
                        filename={section.codeSnippet.filename}
                        code={section.codeSnippet.code}
                      />
                    </div>
                  )}
                </div>
              ))}

              {/* References & Related Systems */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-brand-border bg-background-card p-6 space-y-3">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
                    Verified References
                  </h3>
                  <ul className="space-y-2.5 text-xs">
                    {article.references.map((ref) => (
                      <li key={ref.url}>
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-text-secondary hover:text-brand-primary"
                        >
                          <span>{ref.title}</span>
                          <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-brand-border bg-background-card p-6 space-y-3">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
                    Related Portfolio Systems
                  </h3>
                  <ul className="space-y-2.5 text-xs">
                    {relatedProjects.map((proj) => (
                      <li key={proj.slug}>
                        <Link
                          href={proj.isProduct ? `/products/${proj.slug}` : `/work/${proj.slug}`}
                          className="inline-flex items-center gap-1.5 text-text-primary hover:text-brand-primary font-semibold"
                        >
                          <GitBranch className="h-3.5 w-3.5 text-brand-primary" />
                          <span>{proj.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Related Articles */}
              <div className="rounded-2xl border border-brand-border bg-background-card p-6 space-y-4">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
                  Further Research Briefs
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/research/${rel.slug}`}
                      className="rounded-xl border border-brand-border bg-background-elevated p-4 hover:border-brand-primary"
                    >
                      <span className="font-mono text-[10px] text-brand-primary">
                        {rel.categoryName}
                      </span>
                      <p className="mt-1 font-display text-sm font-bold text-text-primary">
                        {rel.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
