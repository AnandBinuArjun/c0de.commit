"use client";

import React, { useState } from "react";
import { CvssTool, EncodingTool, JwtTool } from "@/components/tools/lab-tools-a";
import { CertTool, EmailAuthTool, IacTool, RegexTool } from "@/components/tools/lab-tools-b";
import { ThreatModelBuilder } from "@/components/tools/threat-model-builder";
import { AttackPathLab } from "@/components/tools/attack-path-lab";
import { CtfSandbox } from "@/components/tools/ctf-sandbox";
import { cn } from "@/lib/utils";

const TOOLS = [
  { id: "cvss", label: "CVSS 3.1", group: "Analyse", render: () => <CvssTool /> },
  { id: "jwt", label: "JWT inspector", group: "Analyse", render: () => <JwtTool /> },
  { id: "encoding", label: "Encoding & hashes", group: "Analyse", render: () => <EncodingTool /> },
  { id: "regex", label: "Regex / ReDoS", group: "Analyse", render: () => <RegexTool /> },
  { id: "cert", label: "TLS certificate", group: "Review", render: () => <CertTool /> },
  { id: "email", label: "SPF · DKIM · DMARC", group: "Review", render: () => <EmailAuthTool /> },
  { id: "iac", label: "IaC linter", group: "Review", render: () => <IacTool /> },
  { id: "threat", label: "STRIDE threat model", group: "Design", render: () => <ThreatModelBuilder /> },
  { id: "attack", label: "Attack path & defence", group: "Design", render: () => <AttackPathLab /> },
  { id: "ctf", label: "CTF sandbox", group: "Practise", render: () => <CtfSandbox /> },
] as const;

type ToolId = (typeof TOOLS)[number]["id"];

const GROUPS = ["Analyse", "Review", "Design", "Practise"] as const;

export function LabSuite() {
  const [active, setActive] = useState<ToolId>("cvss");
  const current = TOOLS.find((t) => t.id === active) ?? TOOLS[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
      <nav aria-label="Lab tools" className="space-y-5 lg:sticky lg:top-24 lg:self-start">
        {GROUPS.map((group) => (
          <div key={group}>
            <div className="mb-2 font-mono text-[11px] uppercase tracking-wider text-text-muted">{group}</div>
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {TOOLS.filter((t) => t.group === group).map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    aria-current={active === t.id ? "page" : undefined}
                    onClick={() => setActive(t.id)}
                    className={cn(
                      "min-h-[44px] w-full rounded-lg border px-3 text-left font-mono text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50",
                      active === t.id
                        ? "border-brand-primary bg-brand-deep text-brand-primary"
                        : "border-transparent text-text-secondary hover:border-brand-border hover:text-text-primary"
                    )}
                  >
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="min-w-0 rounded-2xl border border-brand-border/70 bg-background-elevated/50 p-5 sm:p-7" aria-live="polite">
        {current.render()}
      </div>
    </div>
  );
}
