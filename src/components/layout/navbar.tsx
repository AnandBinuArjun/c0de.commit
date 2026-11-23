"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Terminal,
  ArrowUpRight,
  Shield,
  Search,
  GitBranch,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { BrandLogo } from "@/components/layout/brand-logo";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenTerminal?: () => void;
  onOpenSearch?: () => void;
}

export function Navbar({ onOpenTerminal, onOpenSearch }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
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
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-brand-border/90 bg-background/90 backdrop-blur-2xl shadow-[0_14px_44px_-16px_rgba(0,0,0,0.92)]"
          : "border-b border-brand-border/45 bg-background/75 backdrop-blur-xl"
      )}
    >
      {/* Top Studio Telemetry Ribbon (Desktop & Tablet) */}
      <div className="hidden border-b border-brand-border/35 bg-background-secondary/95 py-1.5 text-[11px] font-mono text-text-muted md:block">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-brand-primary font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_#00F58A]" />
              <span>SYSTEM ONLINE</span>
            </span>
            <span className="text-brand-border">/</span>
            <span className="tracking-widest text-text-primary">{SITE_CONFIG.brandStatement}</span>
            <span className="hidden text-brand-border xl:inline">/</span>
            <span className="hidden text-text-secondary xl:inline">
              {SITE_CONFIG.alternativePositioning}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-text-secondary">
              <Shield className="h-3 w-3 text-brand-primary" />
              <span>OWASP ASVS · MITRE ATT&CK</span>
            </span>
            <span className="text-brand-border">/</span>
            <a
              href={SITE_CONFIG.githubProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-brand-primary hover:underline"
            >
              <GitBranch className="h-3 w-3" />
              <span>AnandBinuArjun (21 Repos)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* Left: Official CODE.COMMIT Logo */}
        <BrandLogo variant="horizontal" />

        {/* Center: Floating Glass Pill Navigation (Desktop) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center gap-0.5 rounded-full border border-brand-border/80 bg-background-elevated/90 p-1 shadow-[inset_0_1px_0_0_rgba(243,248,245,0.06)]"
        >
          {SITE_CONFIG.navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                  isActive
                    ? "bg-brand-deep text-brand-primary border border-brand-primary/50 shadow-[0_0_16px_-4px_rgba(0,245,138,0.4)]"
                    : "text-text-secondary hover:text-text-primary hover:bg-background-card/70"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Quick Search + CLI Trigger + Conversion CTA (Desktop) */}
        <div className="hidden lg:flex items-center gap-2.5">
          {onOpenSearch && (
            <button
              type="button"
              onClick={onOpenSearch}
              className="group inline-flex h-10 items-center gap-2 rounded-xl border border-brand-border/90 bg-background-elevated/90 px-3.5 font-mono text-xs text-text-secondary shadow-[inset_0_1px_0_0_rgba(243,248,245,0.05)] hover:border-brand-primary/60 hover:text-brand-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label="Open global quick search (Ctrl+K)"
            >
              <Search className="h-3.5 w-3.5 text-brand-primary" />
              <span>Search</span>
              <kbd className="rounded border border-brand-border bg-background px-1.5 py-0.5 text-[10px] text-text-muted">
                ⌘K
              </kbd>
            </button>
          )}
          {onOpenTerminal && (
            <button
              type="button"
              onClick={onOpenTerminal}
              className="group inline-flex h-10 items-center gap-2 rounded-xl border border-brand-border/90 bg-background-elevated/90 px-3.5 font-mono text-xs text-text-secondary shadow-[inset_0_1px_0_0_rgba(243,248,245,0.05)] hover:border-brand-primary/60 hover:text-brand-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label="Toggle interactive navigation terminal"
            >
              <Terminal className="h-3.5 w-3.5 text-brand-primary" />
              <span>CLI</span>
            </button>
          )}

          <Link
            href={SITE_CONFIG.conversionCta.href}
            className="group inline-flex h-10 items-center gap-2 rounded-xl bg-brand-primary px-5 text-xs font-bold uppercase tracking-wider text-background shadow-neon-sm transition-all hover:bg-brand-secondary hover:shadow-neon-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <span>{SITE_CONFIG.conversionCta.label}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile & Tablet Action Bar (< 1280px) */}
        <div className="flex items-center gap-2 xl:hidden">
          {onOpenSearch && (
            <button
              type="button"
              onClick={onOpenSearch}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border bg-background-elevated text-text-primary hover:border-brand-primary lg:hidden"
              aria-label="Open global search"
            >
              <Search className="h-4 w-4 text-brand-primary" />
            </button>
          )}
          {onOpenTerminal && (
            <button
              type="button"
              onClick={onOpenTerminal}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border bg-background-elevated text-brand-primary lg:hidden"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border bg-background-elevated text-text-primary hover:border-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-brand-primary" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-x-0 top-16 sm:top-20 md:top-[6.25rem] bottom-0 z-50 flex flex-col justify-between border-t border-brand-border bg-background/98 p-5 sm:p-8 backdrop-blur-2xl xl:hidden overflow-y-auto"
        >
          <div className="space-y-6">
            {/* Quick Mobile Search & CLI Bar */}
            <div className="grid grid-cols-2 gap-3">
              {onOpenSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-background-elevated py-3 font-mono text-xs text-text-primary hover:border-brand-primary"
                >
                  <Search className="h-4 w-4 text-brand-primary" />
                  <span>Quick Search</span>
                </button>
              )}
              {onOpenTerminal && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-background-elevated py-3 font-mono text-xs text-text-primary hover:border-brand-primary"
                >
                  <Terminal className="h-4 w-4 text-brand-primary" />
                  <span>CLI Console</span>
                </button>
              )}
            </div>

            {/* 2-Column Responsive Route Grid on Tablet / Single Stack on Phone */}
            <nav
              className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
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
                        ? "border-brand-primary/60 bg-brand-deep/80 text-brand-primary shadow-neon-sm"
                        : "border-brand-border/60 bg-background-card/80 text-text-primary hover:border-brand-primary/40"
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

          <div className="mt-8 space-y-4 border-t border-brand-border pt-6">
            <Link
              href={SITE_CONFIG.conversionCta.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-background shadow-neon-sm"
            >
              <span>{SITE_CONFIG.conversionCta.label}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <div className="flex items-center justify-between font-mono text-[11px] text-text-muted">
              <span>[ SYSTEM ONLINE ] · {SITE_CONFIG.brandStatement}</span>
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
