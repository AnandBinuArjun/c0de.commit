"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Code2,
  FlaskConical,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

type DisciplineKey = "SECURITY" | "SOFTWARE" | "RESEARCH";

interface DisciplineLayerSpec {
  key: DisciplineKey;
  order: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  relatedProjects: { name: string; href: string }[];
  exploreHref: string;
  exploreLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DISCIPLINE_LAYERS: DisciplineLayerSpec[] = [
  {
    key: "SECURITY",
    order: "LAYER 01",
    title: "SECURITY",
    subtitle: "Protection Rings, Offensive Verification & Cloud Defence",
    description:
      "Authorised vulnerability assessments, multi-cloud posture enforcement, and deterministic threat detection engineered to expose and close real attack pathways.",
    capabilities: [
      "Shield / Protection Ring",
      "Vulnerability Assessment",
      "Cloud Security (AWS & Azure)",
      "Threat Detection",
    ],
    relatedProjects: [
      { name: "CloudSentinel v1.0", href: "/products/cloudsentinel" },
      { name: "REDRECON-X", href: "/work/redrecon-x" },
    ],
    exploreHref: "/services",
    exploreLabel: "Explore Security Services",
    icon: Shield,
  },
  {
    key: "SOFTWARE",
    order: "LAYER 02",
    title: "SOFTWARE",
    subtitle: "Resilient Code Architecture, APIs & DevSecOps Pipelines",
    description:
      "Production-grade web platforms, memory-safe API contracts, and security control planes built with zero-trust validation and cryptographic integrity.",
    capabilities: [
      "Code Architecture",
      "API Engineering",
      "Secure Application Development",
      "DevSecOps Pipelines",
    ],
    relatedProjects: [
      { name: "AegisFlow AppSec", href: "/products/aegisflow" },
      { name: "CODEX CYBERSTRIKE", href: "/products/codex-cyberstrike" },
    ],
    exploreHref: "/work",
    exploreLabel: "Discover Engineering Builds",
    icon: Code2,
  },
  {
    key: "RESEARCH",
    order: "LAYER 03",
    title: "RESEARCH",
    subtitle: "Threat Intelligence, Forensics & Experimental Labs",
    description:
      "Independent technical investigation into botnet propagation vectors, volatile memory forensics, MITRE ATT&CK knowledge graphs, and AI-assisted defense.",
    capabilities: [
      "Threat Intelligence",
      "Experimental Laboratories",
      "Digital Forensics",
      "IoT Security",
    ],
    relatedProjects: [
      { name: "SENTINEL-IoT (23★)", href: "/products/sentinel-iot" },
      { name: "CTI Knowledge Graph", href: "/work/threat-intelligence-cti-analysis" },
    ],
    exploreHref: "/research",
    exploreLabel: "Enter the Research Lab",
    icon: FlaskConical,
  },
];

export function HeroTriadVisualizer() {
  const [activeKey, setActiveKey] = useState<DisciplineKey>("SECURITY");
  const activeLayer =
    DISCIPLINE_LAYERS.find((l) => l.key === activeKey) || DISCIPLINE_LAYERS[0];

  return (
    <div className="relative flex flex-col justify-between space-y-5">
      {/* Ambient Radial Studio Glow Behind Isometric Stack */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(0,245,138,0.12),rgba(11,56,36,0.06)_48%,transparent_75%)] blur-2xl"
      />

      {/* Discipline Selector Tabs (Keyboard, Click & Touch Accessible) */}
      <div
        role="tablist"
        aria-label="CODE.COMMIT Core Disciplines"
        className="relative z-10 grid grid-cols-3 gap-2 rounded-2xl border border-brand-border/50 bg-[#07110C]/85 p-1.5 backdrop-blur-xl"
      >
        {DISCIPLINE_LAYERS.map((layer) => {
          const Icon = layer.icon;
          const isSelected = layer.key === activeKey;
          return (
            <button
              key={layer.key}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveKey(layer.key)}
              onMouseEnter={() => setActiveKey(layer.key)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 font-mono text-xs font-semibold tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                isSelected
                  ? "bg-brand-deep/90 text-brand-primary border border-brand-primary/45 shadow-[0_0_20px_-6px_rgba(0,245,138,0.35)]"
                  : "border border-transparent text-text-secondary hover:text-text-primary hover:bg-background-elevated/60"
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span>{layer.title}</span>
            </button>
          );
        })}
      </div>

      {/* 3D-Inspired Isometric Interconnected Architecture Canvas (Desktop & Tablet) */}
      <div className="surface-immersive relative z-10 overflow-hidden rounded-3xl p-5 sm:p-7">
        {/* Top Metadata Strip */}
        <div className="flex items-center justify-between font-mono text-[11px] text-text-muted mb-2">
          <span className="inline-flex items-center gap-1.5 text-brand-primary">
            <Layers className="h-3.5 w-3.5" />
            <span>INTERCONNECTED ARCHITECTURE STACK</span>
          </span>
          <span>{activeLayer.order} ACTIVE</span>
        </div>

        {/* Interactive Isometric 3-Plane SVG Stage */}
        <div className="relative mx-auto my-1 flex items-center justify-center">
          <svg
            viewBox="0 0 460 300"
            fill="none"
            className="w-full max-w-[440px] h-auto select-none"
            role="img"
            aria-label={`Interactive 3-layer architecture diagram highlighting ${activeLayer.title}`}
          >
            <defs>
              <linearGradient id="planeActiveFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B3824" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#101D15" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="planeMutedFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B1710" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#050B08" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            {/* Vertical Inter-Layer Quantum Data Conduits */}
            <line
              x1="230"
              y1="44"
              x2="230"
              y2="256"
              stroke="#00F58A"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              strokeOpacity="0.55"
            />
            <line
              x1="125"
              y1="82"
              x2="125"
              y2="218"
              stroke="#204D35"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
            <line
              x1="335"
              y1="82"
              x2="335"
              y2="218"
              stroke="#204D35"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />

            {/* ============================================================
                BOTTOM PLANE (LAYER 03): RESEARCH — Knowledge Graph & Telemetry
               ============================================================ */}
            <g
              onClick={() => setActiveKey("RESEARCH")}
              onMouseEnter={() => setActiveKey("RESEARCH")}
              className="cursor-pointer transition-all duration-300"
              style={{
                opacity: activeKey === "RESEARCH" ? 1 : 0.46,
                transform: activeKey === "RESEARCH" ? "translateY(-4px)" : "translateY(0px)",
              }}
            >
              <polygon
                points="230,172 385,222 230,272 75,222"
                fill={activeKey === "RESEARCH" ? "url(#planeActiveFill)" : "url(#planeMutedFill)"}
                stroke={activeKey === "RESEARCH" ? "#00F58A" : "#204D35"}
                strokeWidth={activeKey === "RESEARCH" ? "2" : "1.2"}
              />
              {/* Research Knowledge Graph Constellation Nodes */}
              <line x1="175" y1="220" x2="230" y2="202" stroke="#00F58A" strokeWidth="1.2" />
              <line x1="230" y1="202" x2="285" y2="220" stroke="#00F58A" strokeWidth="1.2" />
              <line x1="175" y1="220" x2="230" y2="242" stroke="#00F58A" strokeWidth="1.2" />
              <line x1="285" y1="220" x2="230" y2="242" stroke="#00F58A" strokeWidth="1.2" />
              <circle cx="230" cy="202" r="4.5" fill="#00F58A" />
              <circle cx="175" cy="220" r="4" fill="#00C878" />
              <circle cx="285" cy="220" r="4" fill="#00C878" />
              <circle cx="230" cy="242" r="4.5" fill="#00F58A" />
              <text
                x="108"
                y="225"
                fill={activeKey === "RESEARCH" ? "#00F58A" : "#A5B7AA"}
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
              >
                03 // RESEARCH
              </text>
            </g>

            {/* ============================================================
                MIDDLE PLANE (LAYER 02): SOFTWARE — Modular Architecture & APIs
               ============================================================ */}
            <g
              onClick={() => setActiveKey("SOFTWARE")}
              onMouseEnter={() => setActiveKey("SOFTWARE")}
              className="cursor-pointer transition-all duration-300"
              style={{
                opacity: activeKey === "SOFTWARE" ? 1 : 0.48,
                transform: activeKey === "SOFTWARE" ? "translateY(-5px)" : "translateY(0px)",
              }}
            >
              <polygon
                points="230,100 385,150 230,200 75,150"
                fill={activeKey === "SOFTWARE" ? "url(#planeActiveFill)" : "url(#planeMutedFill)"}
                stroke={activeKey === "SOFTWARE" ? "#00F58A" : "#204D35"}
                strokeWidth={activeKey === "SOFTWARE" ? "2" : "1.2"}
              />
              {/* Modular Software Pipeline Blocks */}
              <polygon
                points="230,122 276,137 230,152 184,137"
                fill="#050B08"
                stroke="#00F58A"
                strokeWidth="1.2"
              />
              <polygon
                points="185,147 222,160 185,172 148,160"
                fill="#050B08"
                stroke="#00C878"
                strokeWidth="1"
              />
              <polygon
                points="275,147 312,160 275,172 238,160"
                fill="#050B08"
                stroke="#00C878"
                strokeWidth="1"
              />
              <text
                x="106"
                y="153"
                fill={activeKey === "SOFTWARE" ? "#00F58A" : "#A5B7AA"}
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
              >
                02 // SOFTWARE
              </text>
            </g>

            {/* ============================================================
                TOP PLANE (LAYER 01): SECURITY — Protection Ring & Perimeter Shield
               ============================================================ */}
            <g
              onClick={() => setActiveKey("SECURITY")}
              onMouseEnter={() => setActiveKey("SECURITY")}
              className="cursor-pointer transition-all duration-300"
              style={{
                opacity: activeKey === "SECURITY" ? 1 : 0.5,
                transform: activeKey === "SECURITY" ? "translateY(-6px)" : "translateY(0px)",
              }}
            >
              <polygon
                points="230,28 385,78 230,128 75,78"
                fill={activeKey === "SECURITY" ? "url(#planeActiveFill)" : "url(#planeMutedFill)"}
                stroke={activeKey === "SECURITY" ? "#00F58A" : "#204D35"}
                strokeWidth={activeKey === "SECURITY" ? "2" : "1.2"}
              />
              {/* Isometric Protection Shield Ring */}
              <ellipse
                cx="230"
                cy="78"
                rx="62"
                ry="22"
                stroke="#00F58A"
                strokeWidth="1.4"
                strokeDasharray="5 3"
              />
              <ellipse
                cx="230"
                cy="78"
                rx="34"
                ry="12"
                fill="#050B08"
                stroke="#00F58A"
                strokeWidth="1.6"
              />
              <circle cx="230" cy="78" r="5" fill="#00F58A" />
              <text
                x="108"
                y="81"
                fill={activeKey === "SECURITY" ? "#00F58A" : "#A5B7AA"}
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
              >
                01 // SECURITY
              </text>
            </g>
          </svg>
        </div>

        {/* Active Layer Details & Related Verified Projects */}
        <div className="mt-2 space-y-4 border-t border-brand-border/50 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-brand-primary">
                {activeLayer.order} · {activeLayer.title}
              </span>
              <h3 className="font-display text-lg font-bold text-text-primary">
                {activeLayer.subtitle}
              </h3>
            </div>
            <Link
              href={activeLayer.exploreHref}
              className="inline-flex items-center gap-1 rounded-lg border border-brand-primary/40 bg-brand-deep/70 px-3 py-1.5 font-mono text-xs font-semibold text-brand-primary hover:bg-brand-primary hover:text-background transition-colors"
            >
              <span>{activeLayer.exploreLabel}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
            {activeLayer.description}
          </p>

          {/* 4 Layer Capabilities Pills */}
          <div className="grid grid-cols-2 gap-2">
            {activeLayer.capabilities.map((cap) => (
              <div
                key={cap}
                className="flex items-center gap-2 rounded-xl border border-brand-border/50 bg-background/60 px-3 py-2 font-mono text-[11px] text-text-primary"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-primary shrink-0" />
                <span className="truncate">{cap}</span>
              </div>
            ))}
          </div>

          {/* Related Verified Systems Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-mono text-xs">
            <span className="text-[11px] text-text-muted">VERIFIED SYSTEMS:</span>
            <div className="flex flex-wrap items-center gap-2">
              {activeLayer.relatedProjects.map((proj) => (
                <Link
                  key={proj.href}
                  href={proj.href}
                  className="inline-flex items-center gap-1 rounded-lg border border-brand-border/70 bg-background-elevated px-2.5 py-1 text-[11px] text-text-primary hover:border-brand-primary hover:text-brand-primary transition-colors"
                >
                  <span>{proj.name}</span>
                  <ArrowUpRight className="h-3 w-3 text-brand-primary" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
