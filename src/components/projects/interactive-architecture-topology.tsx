"use client";

import React, { useState } from "react";
import { Layers, Shield, Cpu, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArchitectureNode {
  id: string;
  label: string;
  layer: string;
  detail: string;
}

interface InteractiveArchitectureTopologyProps {
  projectName: string;
  nodes: ArchitectureNode[];
  flows: string[];
  securityConsiderations: string[];
}

export function InteractiveArchitectureTopology({
  projectName,
  nodes,
  flows,
  securityConsiderations,
}: InteractiveArchitectureTopologyProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeNode = nodes[activeIndex] || nodes[0];

  return (
    <div className="rounded-3xl border border-brand-border/90 bg-[#050C08]/95 shadow-card-elevated overflow-hidden">
      {/* Top Blueprint Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-border/70 bg-background-elevated/90 px-5 py-3.5 font-mono text-xs">
        <div className="flex items-center gap-2 text-brand-primary">
          <Layers className="h-4 w-4" />
          <span className="font-bold uppercase tracking-wider">
            INTERACTIVE TOPOLOGY EXPLORER // {projectName.toUpperCase()}
          </span>
        </div>
        <span className="text-[11px] text-text-muted">
          Click any pipeline node below to inspect data flow & isolation boundary
        </span>
      </div>

      {/* Interactive SVG Pipeline Connector Schematic (Desktop & Tablet) */}
      <div className="border-b border-brand-border/60 bg-background/70 px-4 py-6 sm:px-8">
        <div className="hidden md:block mb-4">
          <svg
            viewBox="0 0 800 54"
            fill="none"
            className="w-full h-12"
            aria-hidden="true"
          >
            {/* Base Track Line */}
            <line
              x1="100"
              y1="27"
              x2="700"
              y2="27"
              stroke="#204D35"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            {/* Active Progress Line */}
            <line
              x1="100"
              y1="27"
              x2={100 + activeIndex * 200}
              y2="27"
              stroke="#00F58A"
              strokeWidth="2.5"
            />
            {nodes.slice(0, 4).map((node, idx) => {
              const cx = 100 + idx * 200;
              const isCurrent = idx === activeIndex;
              const isPassed = idx <= activeIndex;
              return (
                <g
                  key={node.id}
                  onClick={() => setActiveIndex(idx)}
                  className="cursor-pointer"
                >
                  {isCurrent && (
                    <circle
                      cx={cx}
                      cy="27"
                      r="20"
                      stroke="#00F58A"
                      strokeWidth="1.2"
                      strokeOpacity="0.45"
                    />
                  )}
                  <circle
                    cx={cx}
                    cy="27"
                    r="13"
                    fill={isCurrent ? "#00F58A" : isPassed ? "#0B3824" : "#101D15"}
                    stroke="#00F58A"
                    strokeWidth="1.6"
                  />
                  <text
                    x={cx}
                    y="31"
                    textAnchor="middle"
                    fill={isCurrent ? "#030806" : "#00F58A"}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    0{idx + 1}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Clickable Node Cards */}
        <div
          role="tablist"
          aria-label={`${projectName} Architecture Nodes`}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {nodes.map((node, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={node.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "group relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                  isSelected
                    ? "border-brand-primary bg-background-card shadow-neon-sm"
                    : "border-brand-border/70 bg-background-elevated/60 hover:border-brand-primary/50"
                )}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span
                      className={cn(
                        "rounded px-2 py-0.5 font-bold",
                        isSelected
                          ? "bg-brand-primary text-background"
                          : "bg-brand-deep text-brand-primary"
                      )}
                    >
                      NODE 0{idx + 1}
                    </span>
                    <span className="text-text-muted uppercase truncate ml-2">
                      {node.layer}
                    </span>
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-bold text-text-primary group-hover:text-brand-primary transition-colors">
                    {node.label}
                  </h3>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-brand-border/40 pt-2 font-mono text-[10px] text-text-muted">
                  <span>{isSelected ? "ACTIVE INSPECTION" : "Click to inspect"}</span>
                  <ArrowRight
                    className={cn(
                      "h-3 w-3 transition-transform",
                      isSelected ? "text-brand-primary translate-x-0.5" : ""
                    )}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Node Deep-Dive Inspection Drawer */}
      {activeNode && (
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-brand-border/70 bg-background-card/60">
          {/* Left 7 Cols: Active Node Specification & Execution Flow */}
          <div className="lg:col-span-7 p-5 sm:p-7 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-brand-deep px-3 py-1 font-mono text-xs text-brand-primary">
                <Cpu className="h-3.5 w-3.5" />
                <span>
                  STAGE 0{activeIndex + 1} // {activeNode.layer.toUpperCase()}
                </span>
              </div>
              <span className="font-mono text-xs text-text-muted">
                NODE ID: {activeNode.id.toUpperCase()}
              </span>
            </div>

            <h4 className="font-display text-xl sm:text-2xl font-bold text-text-primary">
              {activeNode.label}
            </h4>

            <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
              {activeNode.detail}
            </p>

            {flows[activeIndex] && (
              <div className="rounded-xl border border-brand-primary/35 bg-background-elevated p-4 font-mono text-xs space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-brand-primary block font-bold">
                  ACTIVE DATA-FLOW TRANSITION:
                </span>
                <p className="text-text-primary">{flows[activeIndex]}</p>
              </div>
            )}
          </div>

          {/* Right 5 Cols: Trust Boundary & Security Isolation Controls */}
          <div className="lg:col-span-5 p-5 sm:p-7 space-y-4 bg-background-secondary/50">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
              <Shield className="h-4 w-4" />
              <span>Trust Boundary & Security Isolation</span>
            </div>

            <ul className="space-y-2.5 text-xs text-text-secondary">
              {securityConsiderations.map((sec) => (
                <li
                  key={sec}
                  className="flex items-start gap-2.5 rounded-xl border border-brand-border/70 bg-background-elevated/80 p-3 text-text-primary"
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-primary" />
                  <span>{sec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
