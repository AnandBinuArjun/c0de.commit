import React from "react";
import Link from "next/link";
import { ArrowUpRight, Shield, Terminal } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SERVICES_DATA } from "@/data/services";
import { BrandLogo } from "@/components/layout/brand-logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-border bg-background-secondary text-text-secondary">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand & Description */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="stacked" />
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              {SITE_CONFIG.brandStatement}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
              {SITE_CONFIG.description}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
              <a
                href={SITE_CONFIG.githubProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded border border-brand-border bg-background-elevated px-3 py-1.5 text-text-primary hover:border-brand-primary hover:text-brand-primary transition-colors"
              >
                <span>GitHub (@AnandBinuArjun)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded border border-brand-border bg-background-elevated px-3 py-1.5 text-text-primary hover:border-brand-primary hover:text-brand-primary transition-colors"
              >
                <span>Instagram ({SITE_CONFIG.instagramHandle})</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-text-primary">
              Navigation
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
                  className="text-brand-primary font-medium hover:underline"
                >
                  Initialize Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-text-primary">
              Security Services
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

          {/* Column 4: Engineering & Legal */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-text-primary">
              Flagship & Governance
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/products/cloudsentinel"
                  className="text-text-secondary hover:text-brand-primary transition-colors"
                >
                  CloudSentinel (AWS & Azure)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/sentinel-iot"
                  className="text-text-secondary hover:text-brand-primary transition-colors"
                >
                  SENTINEL-IoT Honeypot Platform
                </Link>
              </li>
              <li>
                <Link
                  href="/research"
                  className="text-text-secondary hover:text-brand-primary transition-colors"
                >
                  Security Research Lab
                </Link>
              </li>
              <li>
                <Link
                  href="/insights"
                  className="text-text-secondary hover:text-brand-primary transition-colors"
                >
                  Cybersecurity Education Series
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

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-brand-border/60 pt-8 text-xs text-text-muted sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 font-mono">
            <Shield className="h-3.5 w-3.5 text-brand-primary" />
            <span>
              © {currentYear} {SITE_CONFIG.name}. All rights reserved. Authorised Security Engineering Only.
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono">
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
