"use client";

import React, { useState } from "react";
import { ShieldAlert, ShieldCheck, SplitSquareVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiffCase {
  id: string;
  label: string;
  cwe: string;
  vulnerableTitle: string;
  vulnerableCode: string[];
  remediatedTitle: string;
  remediatedCode: string[];
  explanation: string;
}

const SECURITY_DIFF_CASES: DiffCase[] = [
  {
    id: "bola-tenant-isolation",
    label: "01 // Multi-Tenant BOLA Fix",
    cwe: "OWASP API1:2023 / CWE-639",
    vulnerableTitle: "VULNERABLE: Unscoped primary-key lookup allows cross-tenant IDOR/BOLA",
    vulnerableCode: [
      "// ❌ DANGER: Only checks record ID without verifying authenticated tenant ownership",
      "export async function getInvoiceById(invoiceId: string) {",
      "  return await prisma.invoice.findUnique({",
      "    where: { id: invoiceId },",
      "  });",
      "}",
    ],
    remediatedTitle: "HARDENED: Mandatory composite tenant boundary enforced at repository level",
    remediatedCode: [
      "// ✅ VERIFIED: Composite (id + tenantId) query makes cross-tenant access impossible",
      "export async function getInvoiceById(invoiceId: string, authTenantId: string) {",
      "  return await prisma.invoice.findFirst({",
      "    where: { id: invoiceId, tenantId: authTenantId },",
      "  });",
      "}",
    ],
    explanation:
      "Enforcing authenticated tenant context inside the data-access helper guarantees that no controller can accidentally leak another customer's object.",
  },
  {
    id: "command-injection-exec",
    label: "02 // Command Injection Fix",
    cwe: "OWASP A03:2021 / CWE-78",
    vulnerableTitle: "VULNERABLE: Shell string interpolation permits arbitrary command chaining",
    vulnerableCode: [
      "// ❌ DANGER: Unsanitized domain interpolated into /bin/sh via exec()",
      "import { exec } from 'child_process';",
      "export function probeHost(targetDomain: string) {",
      "  exec(`nmap -sV ${targetDomain}`, (err, stdout) => console.log(stdout));",
      "}",
    ],
    remediatedTitle: "HARDENED: Allowlisted target validation + non-shell argument array (execFile)",
    remediatedCode: [
      "// ✅ VERIFIED: Strict hostname regex + execFile() with zero shell invocation",
      "import { execFile } from 'child_process';",
      "export function probeHost(targetDomain: string) {",
      "  if (!/^[a-zA-Z0-9.-]+$/.test(targetDomain)) throw new Error('INVALID_SCOPE');",
      "  execFile('nmap', ['-sV', '--', targetDomain], { shell: false }, () => {});",
      "}",
    ],
    explanation:
      "Passing arguments as an array to execFile with shell: false prevents metacharacters (; | && $()) from being interpreted by a system shell.",
  },
  {
    id: "cloud-iam-sod",
    label: "03 // Cloud IAM Separation of Duties",
    cwe: "CIS AWS / NIST PR.AC-4",
    vulnerableTitle: "VULNERABLE: Single principal can both propose and execute production IAM mutation",
    vulnerableCode: [
      "# ❌ DANGER: Unattended auto-remediation mutates live production IAM policy",
      "def apply_iam_remediation(proposal_id: str, actor_id: str):",
      "    proposal = db.get_proposal(proposal_id)",
      "    aws_iam_client.put_role_policy(**proposal.patch_payload)",
    ],
    remediatedTitle: "HARDENED: Cryptographic hash verification + Approver != Proposer gate",
    remediatedCode: [
      "# ✅ VERIFIED: Enforces human Separation of Duties and SHA-256 diff lock",
      "def apply_iam_remediation(proposal_id: str, approver_id: str):",
      "    proposal = db.get_proposal(proposal_id)",
      "    if proposal.proposer_id == approver_id:",
      "        raise PermissionError('SEPARATION_OF_DUTIES_VIOLATION')",
      "    verify_sha256_digest(proposal.patch_payload, proposal.expected_sha256)",
    ],
    explanation:
      "Used in CloudSentinel and AegisFlow to ensure no automated worker or single compromised operator can push unreviewed changes.",
  },
];

export function SecurityCodeDiffViewer() {
  const [selectedId, setSelectedId] = useState<string>(SECURITY_DIFF_CASES[0].id);
  const [viewMode, setViewMode] = useState<"SPLIT" | "HARDENED_ONLY">("SPLIT");

  const activeCase =
    SECURITY_DIFF_CASES.find((c) => c.id === selectedId) || SECURITY_DIFF_CASES[0];

  return (
    <div className="rounded-3xl border border-brand-border/90 bg-[#050C08]/95 shadow-card-elevated overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-border/80 bg-background-elevated/90 px-5 py-3.5">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
          <SplitSquareVertical className="h-4 w-4" />
          <span>VULNERABLE VS. HARDENED CODE REMEDIATION DIFF VIEWER</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border border-brand-border bg-background p-0.5 font-mono text-[10px]">
            <button
              type="button"
              onClick={() => setViewMode("SPLIT")}
              className={cn(
                "rounded-md px-2.5 py-1 transition-colors",
                viewMode === "SPLIT"
                  ? "bg-brand-deep text-brand-primary font-bold"
                  : "text-text-muted hover:text-text-primary"
              )}
            >
              SIDE-BY-SIDE DIFF
            </button>
            <button
              type="button"
              onClick={() => setViewMode("HARDENED_ONLY")}
              className={cn(
                "rounded-md px-2.5 py-1 transition-colors",
                viewMode === "HARDENED_ONLY"
                  ? "bg-brand-deep text-brand-primary font-bold"
                  : "text-text-muted hover:text-text-primary"
              )}
            >
              HARDENED PATCH
            </button>
          </div>
        </div>
      </div>

      {/* Case Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-border/60 bg-background/70 px-5 py-2.5">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {SECURITY_DIFF_CASES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={cn(
                "shrink-0 rounded-xl border px-3 py-1.5 font-mono text-xs transition-all",
                item.id === activeCase.id
                  ? "border-brand-primary bg-brand-deep text-brand-primary font-bold"
                  : "border-brand-border bg-background-card text-text-secondary hover:border-brand-primary/50"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className="rounded border border-brand-border bg-background-elevated px-2.5 py-1 font-mono text-[11px] text-brand-primary">
          {activeCase.cwe}
        </span>
      </div>

      {/* Diff Panels */}
      <div
        className={cn(
          "grid grid-cols-1 divide-y lg:divide-y-0 lg:divide-x divide-brand-border/70",
          viewMode === "SPLIT" ? "lg:grid-cols-2" : "lg:grid-cols-1"
        )}
      >
        {viewMode === "SPLIT" && (
          <div className="p-5 space-y-3 bg-[#120709]/60">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-status-error">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{activeCase.vulnerableTitle}</span>
            </div>
            <pre className="overflow-x-auto rounded-xl border border-status-error/35 bg-[#080304] p-4 font-mono text-xs leading-relaxed text-[#FFD2D7]">
              <code>
                {activeCase.vulnerableCode.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-7 select-none text-status-error/60">-0{i + 1}</span>
                    <span>{line}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        )}

        <div className="p-5 space-y-3 bg-[#05120B]/70">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-brand-primary">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>{activeCase.remediatedTitle}</span>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-brand-primary/40 bg-[#030806] p-4 font-mono text-xs leading-relaxed text-text-primary">
            <code>
              {activeCase.remediatedCode.map((line, i) => (
                <div key={i} className="flex">
                  <span className="w-7 select-none text-brand-primary">+0{i + 1}</span>
                  <span>{line}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>

      {/* Engineering Explanation Footer */}
      <div className="border-t border-brand-border/60 bg-background-elevated/80 px-5 py-3.5 text-xs text-text-secondary">
        <strong className="font-mono text-brand-primary">[REMEDIATION RATIONALE]: </strong>
        <span>{activeCase.explanation}</span>
      </div>
    </div>
  );
}
