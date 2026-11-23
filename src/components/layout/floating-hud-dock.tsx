"use client";

import React from "react";
import Link from "next/link";
import { Search, Terminal, Wrench, ArrowUp } from "lucide-react";

interface FloatingHudDockProps {
  onOpenSearch: () => void;
  onOpenTerminal: () => void;
}

export function FloatingHudDock({
  onOpenSearch,
  onOpenTerminal,
}: FloatingHudDockProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      role="region"
      aria-label="Quick Security Console HUD"
      className="fixed bottom-4 right-4 z-40 flex items-center gap-1 rounded-2xl border border-brand-primary/45 bg-[#06100B]/95 p-1.5 shadow-[0_14px_34px_-10px_rgba(0,0,0,0.95),0_0_20px_-8px_rgba(0,245,138,0.3)] backdrop-blur-xl"
    >
      <button
        type="button"
        onClick={onOpenSearch}
        className="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 font-mono text-[11px] text-text-primary hover:bg-brand-deep hover:text-brand-primary transition-colors"
        title="Quick Search (Ctrl+K)"
      >
        <Search className="h-3.5 w-3.5 text-brand-primary" />
        <span className="hidden sm:inline">Search</span>
      </button>

      <span className="h-4 w-px bg-brand-border/70" />

      <button
        type="button"
        onClick={onOpenTerminal}
        className="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 font-mono text-[11px] text-text-primary hover:bg-brand-deep hover:text-brand-primary transition-colors"
        title="Open Allowlisted CLI Console"
      >
        <Terminal className="h-3.5 w-3.5 text-brand-primary" />
        <span>CLI</span>
      </button>

      <span className="h-4 w-px bg-brand-border/70" />

      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 font-mono text-[11px] text-text-primary hover:bg-brand-deep hover:text-brand-primary transition-colors"
        title="Zero-Egress Security Utilities Lab"
      >
        <Wrench className="h-3.5 w-3.5 text-brand-primary" />
        <span className="hidden sm:inline">Lab</span>
      </Link>

      <span className="h-4 w-px bg-brand-border/70" />

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="inline-flex h-7 w-7 items-center justify-center rounded-xl text-text-muted hover:bg-brand-deep hover:text-brand-primary transition-colors"
        title="Return to top"
      >
        <ArrowUp className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
