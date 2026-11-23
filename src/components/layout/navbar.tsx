"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Terminal,
  ArrowUpRight,
  Search,
  Wrench,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { BrandLogo } from "@/components/layout/brand-logo";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenTerminal?: () => void;
  onOpenSearch?: () => void;
}

const PRIMARY_NAV_ITEMS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Products", href: "/products" },
  { label: "Research", href: "/research" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
] as const;

export function Navbar({ onOpenTerminal, onOpenSearch }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-6 sm:pt-4 transition-all duration-300">
      <div
        className={cn(
          "mx-auto max-w-[1440px] rounded-2xl border transition-all duration-300",
          scrolled
            ? "border-brand-border/65 bg-[#050B08]/88 backdrop-blur-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.95)]"
            : "border-brand-border/35 bg-[#050B08]/70 backdrop-blur-xl"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:h-[4.25rem] sm:px-6">
          {/* Left: Official CODE.COMMIT Brand Logo */}
          <BrandLogo variant="horizontal" />

          {/* Center: Editorial Navigation Destinations with Refined Hover Underline */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {PRIMARY_NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href || pathname?.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative px-3.5 py-2 text-sm font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg",
                    isActive
                      ? "text-text-primary font-semibold"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  <span>{item.label}</span>
                  {/* Active & Hover Underline Indicator */}
                  <span
                    className={cn(
                      "absolute inset-x-3.5 bottom-1 h-[1.5px] rounded-full bg-brand-primary transition-all duration-200",
                      isActive
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 group-hover:opacity-70 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right: Secondary Utilities (Visually Separated) + Primary Conversion CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Utility Cluster */}
            <div className="flex items-center gap-1.5 pr-3 border-r border-brand-border/50">
              <Link
                href="/lab"
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                  (pathname === "/lab" || pathname === "/tools")
                    ? "bg-brand-deep/70 text-brand-primary"
                    : "text-text-muted hover:text-text-primary hover:bg-background-elevated/60"
                )}
                title="Lab: security tools, detections and practice"
              >
                <Wrench className="h-3.5 w-3.5 text-brand-primary" />
                <span className="hidden xl:inline">Lab</span>
              </Link>

              {onOpenSearch && (
                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-brand-border/50 bg-background-elevated/60 px-2.5 font-mono text-xs text-text-secondary hover:border-brand-border hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                  aria-label="Open global quick search (Ctrl+K)"
                >
                  <Search className="h-3.5 w-3.5 text-brand-primary" />
                  <kbd className="text-[10px] text-text-muted">⌘K</kbd>
                </button>
              )}

              {onOpenTerminal && (
                <button
                  type="button"
                  onClick={onOpenTerminal}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-brand-border/50 bg-background-elevated/60 px-2.5 font-mono text-xs text-text-secondary hover:border-brand-border hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                  aria-label="Toggle interactive navigation terminal"
                >
                  <Terminal className="h-3.5 w-3.5 text-brand-primary" />
                  <span>CLI</span>
                </button>
              )}
            </div>

            {/* Primary Conversion CTA */}
            <Link
              href={SITE_CONFIG.conversionCta.href}
              className="group inline-flex h-10 items-center gap-2 rounded-xl bg-brand-primary px-4.5 px-5 text-xs font-bold uppercase tracking-wider text-background transition-all hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <span>{SITE_CONFIG.conversionCta.label}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile & Tablet Action Controls (< 1024px) */}
          <div className="flex items-center gap-2 lg:hidden">
            {onOpenSearch && (
              <button
                type="button"
                onClick={onOpenSearch}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border/60 bg-background-elevated/80 text-text-primary hover:border-brand-primary"
                aria-label="Open global search"
              >
                <Search className="h-4 w-4 text-brand-primary" />
              </button>
            )}
            {onOpenTerminal && (
              <button
                type="button"
                onClick={onOpenTerminal}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border/60 bg-background-elevated/80 text-brand-primary"
                aria-label="Open interactive terminal"
              >
                <Terminal className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border/60 bg-background-elevated/80 text-text-primary hover:border-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 text-brand-primary" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-x-3 top-20 bottom-3 z-50 flex flex-col justify-between rounded-2xl border border-brand-border/80 bg-[#050B08]/98 p-5 sm:p-7 backdrop-blur-2xl shadow-2xl lg:hidden overflow-y-auto"
        >
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-2.5">
              {onOpenSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-brand-border/70 bg-background-elevated py-3 font-mono text-xs text-text-primary"
                >
                  <Search className="h-4 w-4 text-brand-primary" />
                  <span>Quick Search (⌘K)</span>
                </button>
              )}
              {onOpenTerminal && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-brand-border/70 bg-background-elevated py-3 font-mono text-xs text-text-primary"
                >
                  <Terminal className="h-4 w-4 text-brand-primary" />
                  <span>CLI Console</span>
                </button>
              )}
            </div>

            <nav
              className="grid grid-cols-1 gap-2 sm:grid-cols-2"
              aria-label="Mobile navigation links"
            >
              {SITE_CONFIG.navigation.map((item, idx) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname?.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl border px-4 py-3.5 transition-colors",
                      isActive
                        ? "border-brand-primary/50 bg-brand-deep/60 text-brand-primary"
                        : "border-brand-border/45 bg-background-card/70 text-text-primary"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-brand-primary">
                        0{idx + 1}
                      </span>
                      <span className="font-display text-base font-bold">{item.label}</span>
                    </div>
                    <span className="font-mono text-xs text-text-muted">{item.href}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-6 space-y-3 border-t border-brand-border/60 pt-5">
            <Link
              href={SITE_CONFIG.conversionCta.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-background"
            >
              <span>{SITE_CONFIG.conversionCta.label}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <div className="flex items-center justify-between font-mono text-[11px] text-text-muted">
              <span>SECURITY × SOFTWARE × RESEARCH</span>
              <a
                href={SITE_CONFIG.githubProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline"
              >
                @AnandBinuArjun
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
