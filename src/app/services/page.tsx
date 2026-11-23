import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Crosshair,
  ShieldCheck,
  FileSearch,
  CloudCog,
  Siren,
  TerminalSquare,
  CheckCircle2,
} from "lucide-react";
import { SERVICES_DATA } from "@/data/services";

export const metadata: Metadata = {
  title: "Cybersecurity & Secure Software Engineering Services",
  description:
    "Authorised penetration testing, application security, security audits, AWS & Azure cloud security, incident response, and secure full-stack development.",
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Crosshair,
  ShieldCheck,
  FileSearch,
  CloudCog,
  Siren,
  TerminalSquare,
};

export default function ServicesIndexPage() {
  return (
    <div className="space-y-0">
      {/* Header */}
      <section className="border-b border-brand-border/70 bg-technical-grid py-16 lg:py-24">
        <div className="container mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-background-elevated px-3.5 py-1 font-mono text-xs text-brand-primary">
            <span>[ SERVICES MATRIX ] — SECURITY × SOFTWARE</span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Offensive verification. Defensive architecture. Secure engineering.
          </h1>
          <p className="max-w-3xl text-lg text-text-secondary">
            Every engagement is built around practical engineering reality—manual testing under
            explicit authorisation, actionable code and cloud remediations, and zero fabricated
            promises.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto space-y-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES_DATA.map((service) => {
              const IconComp = ICON_MAP[service.iconName] || ShieldCheck;
              return (
                <article
                  key={service.slug}
                  className="flex flex-col justify-between rounded-2xl border border-brand-border bg-background-card p-7 transition-all hover:border-brand-primary/60 hover:shadow-neon-sm"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-primary/40 bg-brand-deep/60 text-brand-primary">
                        <IconComp className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-xs text-brand-primary">
                        {service.capabilityGroup}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h2 className="font-display text-2xl font-bold text-text-primary">
                        <Link
                          href={`/services/${service.slug}`}
                          className="hover:text-brand-primary transition-colors"
                        >
                          {service.shortTitle}
                        </Link>
                      </h2>
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="space-y-2 border-t border-brand-border/60 pt-4">
                      <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
                        Primary Deliverables
                      </p>
                      <ul className="space-y-2 text-xs text-text-primary">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-brand-border/60 pt-4">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline"
                    >
                      <span>View Service Specification</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
