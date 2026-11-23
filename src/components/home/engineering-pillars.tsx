"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Code2,
  FlaskConical,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EngineeringPillarSpec {
  id: "SECURITY" | "SOFTWARE" | "RESEARCH";
  number: string;
  label: string;
  headlineLines: [string, string];
  description: string;
  listLabel: string;
  items: string[];
  ctaLabel: string;
  ctaHref: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PILLARS: EngineeringPillarSpec[] = [
  {
    id: "SECURITY",
    number: "01",
    label: "SECURITY",
    headlineLines: ["Break assumptions.", "Strengthen defences."],
    description:
      "Authorised offensive testing, cloud defence and application security engineering.",
    listLabel: "Core Security Services",
    items: [
      "Penetration Testing",
      "Application Security",
      "Security Auditing",
      "Cloud Security",
      "Detection Engineering",
    ],
    ctaLabel: "Explore Security Services",
    ctaHref: "/services",
    icon: Shield,
  },
  {
    id: "SOFTWARE",
    number: "02",
    label: "SOFTWARE",
    headlineLines: ["Engineered for security.", "Built to scale."],
    description:
      "Secure applications, APIs, cloud-native platforms and custom engineering systems.",
    listLabel: "Engineering Focus",
    items: [
      "Full-stack Development",
      "API Engineering",
      "Security Product Development",
      "Cloud-Native Architecture",
      "DevSecOps",
    ],
    ctaLabel: "Explore Engineering Work",
    ctaHref: "/work",
    icon: Code2,
  },
  {
    id: "RESEARCH",
    number: "03",
    label: "RESEARCH",
    headlineLines: ["Question everything.", "Research what matters."],
    description:
      "Technical exploration across cyber threats, AI security, IoT, digital forensics and emerging attack surfaces.",
    listLabel: "Research Focus",
    items: [
      "Security Research",
      "Threat Intelligence",
      "Malware Analysis",
      "Digital Forensics",
      "IoT Security",
      "Applied AI Security",
    ],
    ctaLabel: "Enter the Research Lab",
    ctaHref: "/research",
    icon: FlaskConical,
  },
];

function PillarArchitecturalGraphic({ id }: { id: EngineeringPillarSpec["id"] }) {
  if (id === "SECURITY") {
    return (
      <svg
        viewBox="0 0 380 140"
        fill="none"
        className="w-full h-32 rounded-2xl border border-brand-border/50 bg-[#040907]/90 p-3"
        aria-hidden="true"
      >
        <circle cx="84" cy="70" r="42" stroke="#204D35" strokeWidth="1.2" strokeDasharray="4 4" />
        <circle cx="84" cy="70" r="26" stroke="#00F58A" strokeWidth="1.4" strokeOpacity="0.7" />
        <circle cx="84" cy="70" r="9" fill="#0B3824" stroke="#00F58A" strokeWidth="1.5" />
        <line x1="126" y1="70" x2="215" y2="42" stroke="#00F58A" strokeWidth="1.4" />
        <line x1="126" y1="70" x2="215" y2="70" stroke="#00F58A" strokeWidth="1.4" />
        <line x1="126" y1="70" x2="215" y2="98" stroke="#00C878" strokeWidth="1.2" />
        <rect x="215" y="28" width="135" height="24" rx="5" fill="#0B1710" stroke="#00F58A" strokeWidth="1.2" />
        <text x="227" y="43" fill="#00F58A" fontSize="9" fontFamily="monospace">
          ATTACK-SURFACE MAP
        </text>
        <rect x="215" y="58" width="135" height="24" rx="5" fill="#0B3824" stroke="#00F58A" strokeWidth="1.4" />
        <text x="227" y="73" fill="#F3F8F5" fontSize="9" fontFamily="monospace">
          CLOUD SHIELD GUARD
        </text>
        <rect x="215" y="88" width="135" height="24" rx="5" fill="#0B1710" stroke="#204D35" strokeWidth="1.2" />
        <text x="227" y="103" fill="#A5B7AA" fontSize="9" fontFamily="monospace">
          DETECTION PIPELINE
        </text>
      </svg>
    );
  }

  if (id === "SOFTWARE") {
    return (
      <svg
        viewBox="0 0 380 140"
        fill="none"
        className="w-full h-32 rounded-2xl border border-brand-border/50 bg-[#040907]/90 p-3"
        aria-hidden="true"
      >
        <rect x="20" y="30" width="95" height="80" rx="8" fill="#0B1710" stroke="#00F58A" strokeWidth="1.3" />
        <text x="32" y="54" fill="#00F58A" fontSize="9" fontFamily="monospace" fontWeight="bold">
          API / ZOD
        </text>
        <text x="32" y="72" fill="#A5B7AA" fontSize="8" fontFamily="monospace">
          Strict Schema
        </text>
        <text x="32" y="88" fill="#A5B7AA" fontSize="8" fontFamily="monospace">
          Zero-Trust Auth
        </text>

        <line x1="115" y1="70" x2="148" y2="70" stroke="#00F58A" strokeWidth="1.5" />

        <rect x="148" y="30" width="95" height="80" rx="8" fill="#0B3824" stroke="#00F58A" strokeWidth="1.5" />
        <text x="160" y="54" fill="#F3F8F5" fontSize="9" fontFamily="monospace" fontWeight="bold">
          CORE ENGINE
        </text>
        <text x="160" y="72" fill="#00F58A" fontSize="8" fontFamily="monospace">
          Next.js / FastAPI
        </text>
        <text x="160" y="88" fill="#A5B7AA" fontSize="8" fontFamily="monospace">
          Async Workers
        </text>

        <line x1="243" y1="70" x2="275" y2="70" stroke="#00F58A" strokeWidth="1.5" />

        <rect x="275" y="30" width="85" height="80" rx="8" fill="#0B1710" stroke="#00F58A" strokeWidth="1.3" />
        <text x="287" y="54" fill="#00F58A" fontSize="9" fontFamily="monospace" fontWeight="bold">
          PG16 + RLS
        </text>
        <text x="287" y="72" fill="#A5B7AA" fontSize="8" fontFamily="monospace">
          Tenant Graph
        </text>
        <text x="287" y="88" fill="#A5B7AA" fontSize="8" fontFamily="monospace">
          Audit Ledger
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 380 140"
      fill="none"
      className="w-full h-32 rounded-2xl border border-brand-border/50 bg-[#040907]/90 p-3"
      aria-hidden="true"
    >
      {/* Knowledge Graph Connections */}
      <line x1="65" y1="45" x2="155" y2="38" stroke="#00F58A" strokeWidth="1.3" />
      <line x1="65" y1="45" x2="125" y2="98" stroke="#00C878" strokeWidth="1.2" />
      <line x1="155" y1="38" x2="235" y2="70" stroke="#00F58A" strokeWidth="1.5" />
      <line x1="125" y1="98" x2="235" y2="70" stroke="#00F58A" strokeWidth="1.4" />
      <line x1="235" y1="70" x2="325" y2="45" stroke="#00F58A" strokeWidth="1.3" />
      <line x1="235" y1="70" x2="325" y2="98" stroke="#00C878" strokeWidth="1.3" />

      <circle cx="65" cy="45" r="14" fill="#0B1710" stroke="#00F58A" strokeWidth="1.4" />
      <text x="53" y="48" fill="#00F58A" fontSize="7.5" fontFamily="monospace">
        IOC
      </text>

      <circle cx="155" cy="38" r="16" fill="#0B1710" stroke="#00F58A" strokeWidth="1.4" />
      <text x="142" y="41" fill="#F3F8F5" fontSize="7.5" fontFamily="monospace">
        CTI
      </text>

      <circle cx="125" cy="98" r="15" fill="#0B1710" stroke="#00C878" strokeWidth="1.3" />
      <text x="112" y="101" fill="#A5B7AA" fontSize="7.5" fontFamily="monospace">
        DFIR
      </text>

      <circle cx="235" cy="70" r="22" fill="#0B3824" stroke="#00F58A" strokeWidth="1.8" />
      <text x="218" y="73" fill="#00F58A" fontSize="8" fontFamily="monospace" fontWeight="bold">
        ATT&amp;CK
      </text>

      <rect x="296" y="32" width="64" height="24" rx="5" fill="#0B1710" stroke="#00F58A" strokeWidth="1.2" />
      <text x="307" y="47" fill="#00F58A" fontSize="8" fontFamily="monospace">
        IOT-LAB
      </text>

      <rect x="296" y="84" width="64" height="24" rx="5" fill="#0B1710" stroke="#204D35" strokeWidth="1.2" />
      <text x="307" y="99" fill="#A5B7AA" fontSize="8" fontFamily="monospace">
        AI-SEC
      </text>
    </svg>
  );
}

export function EngineeringPillars() {
  const [activeId, setActiveId] = useState<EngineeringPillarSpec["id"]>("SECURITY");

  return (
    <div className="space-y-8">
      {/* Desktop Horizontal Expanding Cinematic Panels / Mobile Vertical Stack */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          const isExpanded = pillar.id === activeId;

          return (
            <div
              key={pillar.id}
              onClick={() => setActiveId(pillar.id)}
              onMouseEnter={() => setActiveId(pillar.id)}
              onFocus={() => setActiveId(pillar.id)}
              tabIndex={0}
              role="region"
              aria-label={`${pillar.label} Engineering Pillar`}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 sm:p-9 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                isExpanded
                  ? "surface-immersive lg:flex-[1.55] border-brand-primary/45"
                  : "surface-glass lg:flex-1 opacity-85 hover:opacity-100"
              )}
            >
              <div className="space-y-6">
                {/* Top Pillar Header */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2.5">
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl border font-mono text-xs font-bold transition-colors",
                        isExpanded
                          ? "border-brand-primary bg-brand-primary text-background"
                          : "border-brand-border bg-background-elevated text-brand-primary"
                      )}
                    >
                      {pillar.number}
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
                      {pillar.label}
                    </span>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border/60 bg-background-elevated/70 text-brand-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Expressive Two-Line Headline */}
                <div className="space-y-3">
                  <h3 className="font-display text-2xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-3xl">
                    {pillar.headlineLines[0]}
                    <br />
                    <span className="text-brand-primary">{pillar.headlineLines[1]}</span>
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-text-secondary max-w-xl">
                    {pillar.description}
                  </p>
                </div>

                {/* Architectural Vector Illustration */}
                <PillarArchitecturalGraphic id={pillar.id} />

                {/* Capabilities / Focus List */}
                <div className="space-y-3 pt-1">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                    {pillar.listLabel}
                  </p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {pillar.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2.5 rounded-xl border border-brand-border/45 bg-background/55 px-3 py-2 text-xs sm:text-sm font-medium text-text-primary"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-primary" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pillar CTA Footer */}
              <div className="mt-8 border-t border-brand-border/50 pt-5 flex items-center justify-between">
                <Link
                  href={pillar.ctaHref}
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all",
                    isExpanded
                      ? "bg-brand-primary text-background hover:bg-brand-secondary"
                      : "border border-brand-border bg-background-elevated text-brand-primary hover:border-brand-primary"
                  )}
                >
                  <span>{pillar.ctaLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <span className="font-mono text-[10px] text-text-muted hidden sm:inline">
                  {isExpanded ? "ACTIVE PILLAR" : "CLICK TO EXPAND"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
