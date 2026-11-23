"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal, ArrowUpRight, Shield, Search } from "lucide-react";
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
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-brand-border/90 bg-background/85 backdrop-blur-xl shadow-[0_12px_40px_-15px_rgba(0,0,0,0.9)]"
          : "border-b border-brand-border/40 bg-background/65 backdrop-blur-md"
      )}
    >
      {/* Top Micro Status Hairline */}
      <div className="hidden border-b border-brand-border/40 bg-background-secondary/90 py-1.5 text-[11px] font-mono text-text-muted md:block">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-brand-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-primary shadow-[0_0_6px_#00F58A]" />
              <span>SYSTEM ONLINE</span>
            </span>
            <span>·</span>
            <span>{SITE_CONFIG.brandStatement}</span>
            <span>·</span>
            <span className="text-text-secondary">{SITE_CONFIG.alternativePositioning}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-text-secondary">
              <Shield className="h-3 w-3 text-brand-primary" />
              <span>OWASP ASVS & MITRE ATT&CK ALIGNED</span>
            </span>
            <span>·</span>
            <a
              href={SITE_CONFIG.githubProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline"
            >
              github.com/AnandBinuArjun
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex h-20 items-center justify-between">
        {/* Left: Official CODE.COMMIT Logo */}
        <BrandLogo variant="horizontal" />

        {/* Center: Floating Glass Pill Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1 rounded-full border border-brand-border/80 bg-background-elevated/90 px-2.5 py-1.5 shadow-[inset_0_1px_0_0_rgba(243,248,245,0.06)]"
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
                  "relative rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                  isActive
                    ? "bg-brand-deep/90 text-brand-primary border border-brand-primary/50 shadow-[0_0_14px_-3px_rgba(0,245,138,0.35)]"
                    : "text-text-secondary hover:text-text-primary hover:bg-background-card/70"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Global Search (Ctrl+K) + CLI Console Trigger + Primary Conversion CTA */}
        <div className="hidden lg:flex items-center gap-2.5">
          {onOpenSearch && (
            <button
              type="button"
              onClick={onOpenSearch}
              className="group inline-flex items-center gap-2 rounded-lg border border-brand-border/90 bg-background-elevated/90 px-3 py-2 font-mono text-xs text-text-secondary hover:border-brand-primary/60 hover:text-brand-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label="Open global quick search (Ctrl+K)"
            >
              <Search className="h-3.5 w-3.5 text-brand-primary" />
              <span>Search</span>
              <kbd className="rounded border border-brand-border bg-background px-1.5 py-0.5 text-[10px] text-text-muted">
                Ctrl+K
              </kbd>
            </button>
          )}
          {onOpenTerminal && (
            <button
              type="button"
              onClick={onOpenTerminal}
              className="group inline-flex items-center gap-2 rounded-lg border border-brand-border/90 bg-background-elevated/90 px-3 py-2 font-mono text-xs text-text-secondary shadow-[inset_0_1px_0_0_rgba(243,248,245,0.05)] hover:border-brand-primary/60 hover:text-brand-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label="Toggle interactive navigation terminal"
            >
              <Terminal className="h-3.5 w-3.5 text-brand-primary transition-transform group-hover:translate-x-0.5" />
              <span>CLI</span>
              <kbd className="rounded border border-brand-border bg-background px-1.5 py-0.5 text-[10px] text-text-muted">
                /_
              </kbd>
            </button>
          )}

          <Link
            href={SITE_CONFIG.conversionCta.href}
            className="group inline-flex items-center gap-2 rounded-lg bg-brand-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-background shadow-neon-sm transition-all hover:bg-brand-secondary hover:shadow-neon-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <span>{SITE_CONFIG.conversionCta.label}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          {onOpenTerminal && (
            <button
              type="button"
              onClick={onOpenTerminal}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-background-elevated text-brand-primary"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-background-elevated text-text-primary hover:border-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-x-0 top-20 bottom-0 z-50 flex flex-col justify-between border-t border-brand-border bg-background/95 p-6 backdrop-blur-2xl lg:hidden overflow-y-auto"
        >
          <nav className="flex flex-col space-y-2" aria-label="Mobile navigation links">
            {SITE_CONFIG.navigation.map((item) => {
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
                    "flex items-center justify-between rounded-xl border px-4 py-3.5 text-base font-medium transition-colors",
                    isActive
                      ? "border-brand-primary/60 bg-brand-deep/70 text-brand-primary"
                      : "border-brand-border/60 bg-background-card/70 text-text-primary hover:border-brand-primary/40"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-text-muted">{item.href}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 space-y-4 border-t border-brand-border pt-6">
            <Link
              href={SITE_CONFIG.conversionCta.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3.5 text-center text-sm font-bold uppercase tracking-wider text-background shadow-neon-sm"
            >
              <span>{SITE_CONFIG.conversionCta.label}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <p className="text-center font-mono text-xs text-text-muted">
              [ SYSTEM ONLINE ] · {SITE_CONFIG.brandStatement}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
