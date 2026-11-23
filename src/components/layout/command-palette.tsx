"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Shield,
  GitBranch,
  BookOpen,
  GraduationCap,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { SERVICES_DATA } from "@/data/services";
import { PROJECTS_DATA } from "@/data/projects";
import { RESEARCH_ARTICLES } from "@/data/research";
import { INSIGHTS_SERIES } from "@/data/insights";

export interface PaletteItem {
  id: string;
  title: string;
  subtitle: string;
  category: "SERVICE" | "PROJECT" | "RESEARCH" | "INSIGHT" | "TOOL";
  href: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const allItems = useMemo<PaletteItem[]>(() => {
    const services: PaletteItem[] = SERVICES_DATA.map((s) => ({
      id: `svc-${s.slug}`,
      title: s.title,
      subtitle: `${s.capabilityGroup} · ${s.tagline}`,
      category: "SERVICE",
      href: `/services/${s.slug}`,
    }));

    const projects: PaletteItem[] = PROJECTS_DATA.map((p) => ({
      id: `proj-${p.slug}`,
      title: p.name,
      subtitle: `${p.category} · ${p.shortDescription}`,
      category: "PROJECT",
      href: p.isProduct ? `/products/${p.slug}` : `/work/${p.slug}`,
    }));

    const research: PaletteItem[] = RESEARCH_ARTICLES.map((r) => ({
      id: `res-${r.slug}`,
      title: r.title,
      subtitle: `${r.categoryName} · ${r.mitreAttackRefs.map((m) => m.id).join(", ")}`,
      category: "RESEARCH",
      href: `/research/${r.slug}`,
    }));

    const insights: PaletteItem[] = INSIGHTS_SERIES.flatMap((series) =>
      series.lessons
        .filter((l) => !l.isPlaceholder)
        .map((lesson) => ({
          id: `ins-${lesson.slug}`,
          title: `Lesson 0${lesson.lessonNumber}: ${lesson.title}`,
          subtitle: `${series.title} (${series.instagramHandle})`,
          category: "INSIGHT" as const,
          href: `/insights/${lesson.slug}`,
        }))
    );

    const tools: PaletteItem[] = [
      {
        id: "tool-headers",
        title: "HTTP Security Header & CSP Evaluator",
        subtitle: "Zero-Egress Security Lab Utility (/tools)",
        category: "TOOL",
        href: "/tools",
      },
      {
        id: "tool-entropy",
        title: "Password Entropy & Argon2id Parameter Calculator",
        subtitle: "Zero-Egress Security Lab Utility (/tools)",
        category: "TOOL",
        href: "/tools",
      },
      {
        id: "tool-ioc",
        title: "CTI IOC Defanger & Atomic Indicator Extractor",
        subtitle: "Zero-Egress Security Lab Utility (/tools)",
        category: "TOOL",
        href: "/tools",
      },
      {
        id: "tool-cvss",
        title: "CVSS 3.1 Score Calculator",
        subtitle: "Zero-Egress Security Lab Utility (/tools)",
        category: "TOOL",
        href: "/tools",
      },
      {
        id: "tool-jwt",
        title: "JWT Inspector",
        subtitle: "Zero-Egress Security Lab Utility (/tools)",
        category: "TOOL",
        href: "/tools",
      },
      {
        id: "tool-stride",
        title: "STRIDE Threat-Model Builder",
        subtitle: "Zero-Egress Security Lab Utility (/tools)",
        category: "TOOL",
        href: "/tools",
      },
      {
        id: "tool-iac",
        title: "IaC Misconfiguration Linter",
        subtitle: "Zero-Egress Security Lab Utility (/tools)",
        category: "TOOL",
        href: "/tools",
      },
      {
        id: "lab-hub",
        title: "The Lab",
        subtitle: "Tools, detections and practice (/lab)",
        category: "TOOL",
        href: "/lab",
      },
      {
        id: "lab-detections",
        title: "Detection Rule Library",
        subtitle: "Sigma, YARA and Suricata (/research/detections)",
        category: "TOOL",
        href: "/research/detections",
      },
      {
        id: "lab-glossary",
        title: "Security Glossary",
        subtitle: "Definitions (/research/glossary)",
        category: "TOOL",
        href: "/research/glossary",
      },
      {
        id: "lab-gallery",
        title: "Secure Code Gallery",
        subtitle: "Vulnerable vs fixed (/research/secure-code-gallery)",
        category: "TOOL",
        href: "/research/secure-code-gallery",
      },
      {
        id: "lab-disclosure",
        title: "Responsible Disclosure",
        subtitle: "Report an issue (/disclosure)",
        category: "TOOL",
        href: "/disclosure",
      },
    ];

    return [...tools, ...services, ...projects, ...research, ...insights];
  }, []);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems.slice(0, 14);
    return allItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      )
      .slice(0, 18);
  }, [allItems, query]);

  if (!isOpen) return null;

  const handleSelect = (href: string) => {
    onClose();
    setQuery("");
    router.push(href);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-4 pt-20 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Global Search Command Palette"
    >
      <div className="studio-card specular-top w-full max-w-2xl overflow-hidden rounded-2xl border border-brand-primary/50">
        {/* Search Input Header */}
        <div className="flex items-center gap-3 border-b border-brand-border bg-background-elevated px-4 py-3.5">
          <Search className="h-4 w-4 text-brand-primary shrink-0" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 21 GitHub systems, 6 services, 8 research briefs, tools & lessons..."
            className="w-full bg-transparent font-mono text-xs text-text-primary placeholder:text-text-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search palette"
            className="rounded border border-brand-border bg-background-card px-2 py-1 font-mono text-[10px] text-text-muted hover:border-brand-primary hover:text-text-primary"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-brand-border/40 p-2">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center font-mono text-xs text-text-muted">
              No matching systems, services, or research briefs found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.href)}
                className="group flex w-full items-center justify-between gap-4 rounded-xl px-3.5 py-3 text-left transition-colors hover:bg-background-elevated"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-primary/30 bg-brand-deep/70 text-brand-primary">
                    {item.category === "SERVICE" && <Shield className="h-4 w-4" />}
                    {item.category === "PROJECT" && <GitBranch className="h-4 w-4" />}
                    {item.category === "RESEARCH" && <BookOpen className="h-4 w-4" />}
                    {item.category === "INSIGHT" && <GraduationCap className="h-4 w-4" />}
                    {item.category === "TOOL" && <Wrench className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-background-card border border-brand-border px-1.5 py-0.5 font-mono text-[9px] text-brand-primary">
                        {item.category}
                      </span>
                      <p className="truncate font-display text-sm font-bold text-text-primary group-hover:text-brand-primary">
                        {item.title}
                      </p>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-text-secondary">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-text-muted group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all" />
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-brand-border bg-background-secondary px-4 py-2 font-mono text-[10px] text-text-muted">
          <span>CTRL+K / CMD+K QUICK NAVIGATION</span>
          <span className="text-brand-primary">{allItems.length} INDEXED RESOURCES</span>
        </div>
      </div>
    </div>
  );
}
