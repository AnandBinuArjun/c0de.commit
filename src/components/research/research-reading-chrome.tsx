"use client";

import React, { useState, useEffect } from "react";
import { ListTree, Shield, Copy, Check, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  title: string;
}

interface MitreItem {
  id: string;
  name: string;
  tactic: string;
}

interface ResearchReadingChromeProps {
  articleTitle: string;
  articleSlug: string;
  authorName: string;
  publishedAt: string;
  toc: TocItem[];
  mitreRefs: MitreItem[];
}

export function ResearchReadingChrome({
  articleTitle,
  articleSlug,
  authorName,
  publishedAt,
  toc,
  mitreRefs,
}: ResearchReadingChromeProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string>(toc[0]?.id || "");
  const [copiedCite, setCopiedCite] = useState<"MD" | "BIB" | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setScrollProgress(pct);

      // Scroll-spy active section heading
      for (const item of toc) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            setActiveSectionId(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  const handleCopyCitation = async (format: "MD" | "BIB") => {
    const url = `https://codecommit.sec/research/${articleSlug}`;
    const year = publishedAt.slice(0, 4) || "2026";
    const text =
      format === "MD"
        ? `${authorName} (${year}). "${articleTitle}". CODE.COMMIT Security Research Lab. ${url}`
        : `@techreport{codecommit_${articleSlug.replace(/-/g, "_")},\n  author = {${authorName}},\n  title = {${articleTitle}},\n  institution = {CODE.COMMIT Security Research Lab},\n  year = {${year}},\n  url = {${url}}\n}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedCite(format);
      setTimeout(() => setCopiedCite(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* Top 2px Pinned Neon Reading Progress Hairline */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-0.5 bg-background-elevated/40"
      >
        <div
          className="h-full bg-brand-primary shadow-[0_0_10px_#00F58A] transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="lg:sticky lg:top-24 space-y-5">
        {/* Scroll-Spy Table of Contents */}
        <div className="rounded-2xl border border-brand-border bg-background-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
              <ListTree className="h-4 w-4" />
              <span>Table of Contents</span>
            </div>
            <span className="font-mono text-[10px] text-brand-primary">
              {Math.round(scrollProgress)}% READ
            </span>
          </div>
          <ul className="space-y-2 text-xs">
            {toc.map((item) => {
              const isActive = item.id === activeSectionId;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setActiveSectionId(item.id)}
                    className={cn(
                      "block rounded-lg border-l-2 py-1.5 pl-3 transition-all",
                      isActive
                        ? "border-brand-primary bg-brand-deep/50 font-semibold text-brand-primary"
                        : "border-brand-border/50 text-text-secondary hover:border-brand-primary/50 hover:text-text-primary"
                    )}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* MITRE ATT&CK Mappings */}
        <div className="rounded-2xl border border-brand-border bg-background-card p-5 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
            <Shield className="h-4 w-4" />
            <span>MITRE ATT&CK Mappings</span>
          </div>
          <div className="space-y-2.5">
            {mitreRefs.map((ref) => (
              <div
                key={ref.id}
                className="rounded-lg border border-brand-border bg-background-elevated p-3 space-y-1"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-brand-primary">{ref.id}</span>
                  <span className="text-[10px] text-text-muted">{ref.tactic}</span>
                </div>
                <p className="text-xs text-text-primary">{ref.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 1-Click Academic / Engineering Citation Copier */}
        <div className="rounded-2xl border border-brand-border bg-background-card p-5 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
            <Quote className="h-4 w-4" />
            <span>Cite This Research Brief</span>
          </div>
          <p className="text-xs text-text-secondary">
            Copy a formatted reference or BibTeX entry for threat reports and engineering docs.
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleCopyCitation("MD")}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-brand-border bg-background-elevated px-3 py-2 font-mono text-xs text-text-primary hover:border-brand-primary hover:text-brand-primary"
            >
              {copiedCite === "MD" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-brand-primary" />
                  <span className="text-brand-primary">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Citation</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => handleCopyCitation("BIB")}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-brand-border bg-background-elevated px-3 py-2 font-mono text-xs text-text-primary hover:border-brand-primary hover:text-brand-primary"
            >
              {copiedCite === "BIB" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-brand-primary" />
                  <span className="text-brand-primary">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy BibTeX</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
