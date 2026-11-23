import React from "react";
import Link from "next/link";
import { ArrowUpRight, Shield, Terminal, Rss, FileCode2 } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SERVICES_DATA } from "@/data/services";
import { BrandLogo } from "@/components/layout/brand-logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-border/80 bg-[#040907] text-text-secondary">
      {/* Top Blueprint Telemetry Strip */}
      <div className="border-b border-brand-border/50 bg-background-elevated/40">
        <div className="container mx-auto max-w-[1440px] flex flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8 font-mono text-xs">
          <div className="flex items-center gap-2.5 text-brand-primary">
            <span className="h-2 w-2 rounded-full bg-brand-primary shadow-[0_0_8px_#00F58A]" />
            <span>[ SYSTEM STATUS: OPERATIONAL ]</span>
            <span className="hidden sm:inline text-text-muted">·</span>
            <span className="hidden sm:inline text-text-secondary">
              {SITE_CONFIG.alternativePositioning}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-text-muted">
            <a
              href="/.well-known/security.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-brand-primary transition-colors"
            >
              <FileCode2 className="h-3.5 w-3.5 text-brand-primary" />
              <span>RFC 9116 security.txt</span>
            </a>
            <span>·</span>
            <a
              href="/feed.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-brand-primary transition-colors"
            >
              <Rss className="h-3.5 w-3.5 text-brand-primary" />
              <span>RSS 2.0 Feed</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Architectural Grid */}
      <div className="container mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand Identity & Social Links */}
          <div className="lg:col-span-4 space-y-5">
            <BrandLogo variant="stacked" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
              {SITE_CONFIG.brandStatement}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
              {SITE_CONFIG.description}
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-2.5 font-mono text-xs">
              <a
                href={SITE_CONFIG.githubProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-brand-border bg-background-elevated px-3.5 py-2 text-text-primary hover:border-brand-primary hover:text-brand-primary transition-colors"
              >
                <span>GitHub (@AnandBinuArjun)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-brand-border bg-background-elevated px-3.5 py-2 text-text-primary hover:border-brand-primary hover:text-brand-primary transition-colors"
              >
                <span>Instagram ({SITE_CONFIG.instagramHandle})</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Platform Routes */}
          <div className="lg:col-span-2 space-y-3.5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
              01 // Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SITE_CONFIG.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-text-secondary hover:text-brand-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="font-semibold text-brand-primary hover:underline"
                >
                  Initialize Project →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Matrix */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
              02 // Security Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_DATA.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-text-secondary hover:text-brand-primary transition-colors"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Flagship Systems & Governance */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
              03 // Flagship & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/products/cloudsentinel"
                  className="text-text-secondary hover:text-brand-primary transition-colors"
                >
                  CloudSentinel v1.0 (AWS & Azure)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/aegisflow"
                  className="text-text-secondary hover:text-brand-primary transition-colors"
                >
                  AegisFlow AI-Native AppSec
                </Link>
              </li>
              <li>
                <Link
                  href="/products/sentinel-iot"
                  className="text-text-secondary hover:text-brand-primary transition-colors"
                >
                  SENTINEL-IoT (23★ Honeypot)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/ransomwatch"
                  className="text-text-secondary hover:text-brand-primary transition-colors"
                >
                  RANSOMWATCH Observatory
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-text-secondary hover:text-brand-primary transition-colors"
                >
                  Zero-Egress Security Lab Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-text-secondary hover:text-brand-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-text-secondary hover:text-brand-primary transition-colors"
                >
                  Terms of Engagement
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Security Standard Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-brand-border/60 pt-8 text-xs text-text-muted sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 font-mono">
            <Shield className="h-3.5 w-3.5 text-brand-primary shrink-0" />
            <span>
              © {currentYear} {SITE_CONFIG.name}. All rights reserved. Authorised Security
              Engineering Only.
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 font-mono">
            <span className="inline-flex items-center gap-1.5 text-brand-primary">
              <Terminal className="h-3.5 w-3.5" />
              <span>OWASP ASVS ALIGNED</span>
            </span>
            <Link href="/privacy" className="hover:text-text-primary">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-text-primary">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
