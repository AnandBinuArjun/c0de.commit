"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Code2,
  FlaskConical,
  ArrowUpRight,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  GitBranch,
  BookOpen,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

interface PillarScenario {
  id: string;
  domainCode: string;
  domainTitle: string;
  tagline: string;
  securityLayer: {
    vectorId: string;
    threatName: string;
    standardRef: string;
    telemetryIndicator: string;
    postureState: string;
  };
  softwareLayer: {
    filename: string;
    language: string;
    projectSlug: string;
    projectName: string;
    githubRepo: string;
    code: string;
    engineeringNote: string;
  };
  researchLayer: {
    briefSlug: string;
    briefTitle: string;
    mitreTechnique: string;
    mitreTactic: string;
    abstract: string;
    lessonSlug: string;
    lessonTitle: string;
  };
}

const PILLAR_SCENARIOS: PillarScenario[] = [
  {
    id: "cloud-cspm-sod",
    domainCode: "DOMAIN 01 // HYBRID CLOUD DEFENCE",
    domainTitle: "Multi-Cloud IAM Drift & Approval-Gated Remediation",
    tagline: "Bridging AWS/Azure Threat Detection, Separation-of-Duties Software, and Cloud Research",
    securityLayer: {
      vectorId: "CS-AWS-IAM-004 / AZ-RBAC-002",
      threatName: "Cross-Account AssumeRole Drift & Blind Auto-Remediation Risk",
      standardRef: "CIS AWS v3.0 · NIST CSF PR.AC-4 · OWASP Cloud-Native Top 10",
      telemetryIndicator:
        "CloudTrail: UpdateAssumeRolePolicy / Azure Activity: RoleAssignments/write with wildcard principal",
      postureState: "FAIL → AWAITING SEPARATION-OF-DUTIES APPROVAL (APPROVER != PROPOSER)",
    },
    softwareLayer: {
      filename: "cloudsentinel/core/remediation_sod_gate.py",
      language: "PYTHON 3.12 · FASTAPI · POSTGRESQL RLS",
      projectSlug: "cloudsentinel",
      projectName: "CloudSentinel v1.0.0",
      githubRepo: "https://github.com/AnandBinuArjun/cloundsentinel",
      engineeringNote:
        "Enforces Proof-Before-Action: live cloud mutation is blocked unless an independent operator cryptographically approves the dry-run IaC diff.",
      code: `def authorize_remediation_dispatch(
    proposal: RemediationProposal,
    approver_principal_id: str,
    live_remediation_enabled: bool = False,
) -> DispatchVerdict:
    if not live_remediation_enabled:
        return DispatchVerdict(allowed=False, reason="READ_ONLY_DEFAULT_ENFORCED")
    if proposal.proposer_principal_id == approver_principal_id:
        raise SeparationOfDutiesViolation("Approver must be distinct from proposer")
    return DispatchVerdict(
        allowed=True,
        signed_diff_sha256=proposal.compute_iac_digest(),
        audit_state="APPROVED_FOR_SCOPED_EXECUTION",
    )`,
    },
    researchLayer: {
      briefSlug: "hybrid-cloud-posture-drift-aws-azure",
      briefTitle:
        "Hybrid Cloud Posture Engineering: Governing IAM Drift & Approval-Gated Remediation in AWS and Azure",
      mitreTechnique: "T1078.004 — Valid Accounts: Cloud Accounts",
      mitreTactic: "Privilege Escalation / Persistence",
      abstract:
        "Models AWS IAM policies and Azure Entra ID RBAC bindings into a normalized graph while proving why human-in-the-loop separation-of-duties prevents production outages.",
      lessonSlug: "oauth-consent-phishing-and-illicit-app-grants",
      lessonTitle: "Series 01 · Lesson 03: OAuth Consent Phishing & Cloud API Grants",
    },
  },
  {
    id: "appsec-bola-sarif",
    domainCode: "DOMAIN 02 // AI-NATIVE APPSEC & API ENGINEERING",
    domainTitle: "Multi-Tenant BOLA Prevention & Cryptographically Locked Triage",
    tagline: "Bridging Offensive API Testing, Memory-Safe Repository Guards, and AppSec Research",
    securityLayer: {
      vectorId: "OWASP-API1:2023 / ASVS-V4.2.1",
      threatName: "Broken Object-Level Authorization (BOLA / IDOR) & Unverified Patch Closure",
      standardRef: "OWASP API Security Top 10 · OWASP ASVS Level 2 · SARIF 2.1.0",
      telemetryIndicator:
        "Authenticated session principal attempting cross-tenant UUID resolution on REST/GraphQL resource endpoint",
      postureState: "BLOCKED AT REPOSITORY BOUNDARY · SHA-256 REMEDIATION PLAN VERIFIED",
    },
    softwareLayer: {
      filename: "aegisflow/server/tenant_scoped_repository.ts",
      language: "TYPESCRIPT 5.7 · PRISMA · SHA-256 PLAN LOCK",
      projectSlug: "aegisflow",
      projectName: "AegisFlow (46 CI Tests Passing)",
      githubRepo: "https://github.com/AnandBinuArjun/AegisFlow",
      engineeringNote:
        "Eliminates BOLA by requiring composite (id + tenantId) keys at the data-access layer and locking remediation plans with immutable SHA-256 digests.",
      code: `export async function resolveVerifiedFindingForTenant(params: {
  findingId: string;
  authenticatedTenantId: string;
  expectedPlanSha256: string;
}) {
  const record = await prisma.vulnerabilityFinding.findFirst({
    where: {
      id: params.findingId,
      tenantId: params.authenticatedTenantId, // Mandatory composite tenant boundary
    },
  });
  if (!record || record.planSha256 !== params.expectedPlanSha256) {
    throw new SecurityBoundaryError("TENANT_OR_INTEGRITY_MISMATCH");
  }
  return record;
}`,
    },
    researchLayer: {
      briefSlug: "api-broken-object-level-authorization-patterns",
      briefTitle: "Eliminating Broken Object-Level Authorization (BOLA) in Multi-Tenant APIs",
      mitreTechnique: "T1190 — Exploit Public-Facing Application",
      mitreTactic: "Initial Access / Collection",
      abstract:
        "Deconstructs object-level authorization bypass chains during manual penetration tests and establishes compile-time repository patterns that make cross-tenant reads unrepresentable.",
      lessonSlug: "password-storage-engineering-argon2id-salting-and-peppers",
      lessonTitle: "Series 02 · Lesson 03: Memory-Hard Cryptography & Backend Guards",
    },
  },
  {
    id: "iot-honeypot-cti",
    domainCode: "DOMAIN 03 // DECEPTION TELEMETRY & THREAT INTELLIGENCE",
    domainTitle: "Sandboxed IoT Botnet Emulation & Guarded MITRE ATT&CK Extraction",
    tagline: "Bridging Honeypot Network Defense, Defanged Python Parsers, and CTI Knowledge Graphs",
    securityLayer: {
      vectorId: "SENTINEL-MIRAI-ELF / CTI-STIX-2.1",
      threatName: "Automated Embedded Telnet/SSH Induction & Multi-Arch ELF Dropper Staging",
      standardRef: "MITRE ATT&CK Enterprise & ICS · STIX/TAXII · OWASP IoT Top 10",
      telemetryIndicator:
        "Ingress probe on sandboxed port 23/2323 -> BusyBox shell verification -> wget/tftp ELF binary fetch",
      postureState: "EGRESS CONTAINED IN NAMESPACE · IOC DEFANGED & MAPPED TO ATT&CK",
    },
    softwareLayer: {
      filename: "sentinel_iot/deception/dropper_interceptor.py",
      language: "PYTHON 3.12 · DOCKER NAMESPACE · FASTAPI",
      projectSlug: "sentinel-iot",
      projectName: "SENTINEL-IoT (23★ Flagship Repo)",
      githubRepo: "https://github.com/AnandBinuArjun/SENTINEL-IOT",
      engineeringNote:
        "Intercepts botnet command streams inside an egress-blocked container, defangs dropper URLs, and cross-checks MITRE technique IDs against an immutable allowlist.",
      code: `def intercept_and_classify_botnet_session(
    raw_command: str,
    allowed_mitre_catalogue: dict[str, str],
) -> TelemetryEvent:
    defanged_cmd = raw_command.replace("http://", "hxxp[://]").replace("https://", "hxxps[://]")
    family = "MIRAI_VARIANT" if "busybox" in raw_command.lower() else "GENERIC_SCANNER"
    technique_id = "T1105" if ("wget" in raw_command or "curl" in raw_command) else "T1059.004"
    return TelemetryEvent(
        family=family,
        defanged_payload=defanged_cmd,
        mitre_id=technique_id if technique_id in allowed_mitre_catalogue else "VERIFICATION_PENDING",
        egress_blocked=True,
    )`,
    },
    researchLayer: {
      briefSlug: "iot-botnet-telemetry-mirai-gafgyt-analysis",
      briefTitle:
        "IoT Honeypot Telemetry: Analyzing Automated Mirai & Gafgyt Propagation Vectors",
      mitreTechnique: "T1105 — Ingress Tool Transfer · T1059.004 — Unix Shell",
      mitreTactic: "Execution / Command and Control",
      abstract:
        "Documents the deception perimeter architecture of SENTINEL-IoT and the hybrid regex + allowlist-guarded LLM pipeline used in Threat Intelligence CTI Analysis.",
      lessonSlug: "ransomware-kill-chain-initial-access-to-double-extortion",
      lessonTitle: "Series 03 · Lesson 01: Kill-Chain Telemetry & Early Detection",
    },
  },
];

export function TriadEngineeringWorkbench() {
  const [selectedId, setSelectedId] = useState<string>(PILLAR_SCENARIOS[0].id);
  const [copied, setCopied] = useState(false);

  const active =
    PILLAR_SCENARIOS.find((item) => item.id === selectedId) || PILLAR_SCENARIOS[0];

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(active.softwareLayer.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="rounded-3xl border border-brand-border/90 bg-[#050C08]/90 shadow-[0_30px_80px_-25px_rgba(0,0,0,0.95)] overflow-hidden">
      {/* Top Workbench Header & Domain Switcher */}
      <div className="border-b border-brand-border/80 bg-background-elevated/90 p-4 sm:p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-brand-primary">
              <span>[ INTERACTIVE CONVERGENCE WORKBENCH // SECURITY × SOFTWARE × RESEARCH ]</span>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary">
              Inspect how every threat vector we analyze is backed by verified source code and a
              published MITRE ATT&CK research brief.
            </p>
          </div>

          {/* Domain Scenario Selector Pills */}
          <div
            role="tablist"
            aria-label="Triad Engineering Domains"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 lg:pb-0"
          >
            {PILLAR_SCENARIOS.map((scenario, idx) => {
              const isSelected = scenario.id === active.id;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedId(scenario.id)}
                  className={cn(
                    "shrink-0 rounded-xl border px-3.5 py-2.5 text-left font-mono text-xs transition-all",
                    isSelected
                      ? "border-brand-primary bg-brand-deep text-brand-primary font-bold shadow-neon-sm"
                      : "border-brand-border bg-background-card text-text-secondary hover:border-brand-primary/50 hover:text-text-primary"
                  )}
                >
                  <span className="block text-[10px] opacity-80">0{idx + 1} // SCENARIO</span>
                  <span>
                    {idx === 0
                      ? "Hybrid Cloud & SoD"
                      : idx === 1
                      ? "AI-Native AppSec & BOLA"
                      : "IoT Deception & CTI"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Scenario Title Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-border/60 bg-background/70 px-4 py-3 sm:px-6 font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <span className="rounded bg-brand-deep px-2 py-0.5 text-[10px] font-bold text-brand-primary border border-brand-primary/30">
            {active.domainCode}
          </span>
          <span className="font-display text-sm font-bold text-text-primary">
            {active.domainTitle}
          </span>
        </div>
        <span className="text-[11px] text-text-muted hidden md:inline">{active.tagline}</span>
      </div>

      {/* 3-Column Connected Workbench: [01 SECURITY] ──► [02 SOFTWARE] ──► [03 RESEARCH] */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-brand-border/70">
        {/* PILLAR 1: SECURITY (Offensive / Defensive Telemetry & Threat Model) */}
        <div className="lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between space-y-5 bg-background/40">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/40 bg-brand-deep/70 px-2.5 py-1 font-mono text-xs font-bold text-brand-primary">
                <Shield className="h-3.5 w-3.5" />
                <span>01 // SECURITY TELEMETRY</span>
              </div>
              <span className="font-mono text-[10px] text-text-muted">THREAT MODEL</span>
            </div>

            <div className="space-y-1.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Rule / Vector Identifier
              </p>
              <p className="rounded-lg border border-brand-border bg-background-elevated px-3 py-2 font-mono text-xs font-bold text-brand-primary">
                {active.securityLayer.vectorId}
              </p>
            </div>

            <div className="space-y-1.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Adversarial Failure Mode
              </p>
              <h3 className="font-display text-base font-bold text-text-primary leading-snug">
                {active.securityLayer.threatName}
              </h3>
            </div>

            <div className="space-y-1.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Observed Telemetry Signal
              </p>
              <p className="rounded-lg border border-brand-border/70 bg-background-card p-3 font-mono text-[11px] leading-relaxed text-text-secondary">
                {active.securityLayer.telemetryIndicator}
              </p>
            </div>

            <div className="space-y-1.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Control Standards Alignment
              </p>
              <p className="font-mono text-xs text-text-primary">
                {active.securityLayer.standardRef}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-brand-primary/35 bg-brand-deep/30 p-3 font-mono text-[11px] text-brand-primary">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              <span className="font-bold">{active.securityLayer.postureState}</span>
            </div>
          </div>
        </div>

        {/* PILLAR 2: SOFTWARE (Actual Production Code & GitHub Repository Implementation) */}
        <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between space-y-4 bg-[#07110C]/80">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/40 bg-brand-deep/70 px-2.5 py-1 font-mono text-xs font-bold text-brand-primary">
                <Code2 className="h-3.5 w-3.5" />
                <span>02 // SOFTWARE IMPLEMENTATION</span>
              </div>
              <span className="font-mono text-[10px] text-text-muted">
                {active.softwareLayer.language}
              </span>
            </div>

            {/* Code Editor Window */}
            <div className="overflow-hidden rounded-xl border border-brand-border bg-[#030806]">
              <div className="flex items-center justify-between border-b border-brand-border bg-background-elevated px-3.5 py-2">
                <div className="flex items-center gap-2 font-mono text-[11px] text-text-primary truncate">
                  <Terminal className="h-3.5 w-3.5 text-brand-primary shrink-0" />
                  <span className="truncate">{active.softwareLayer.filename}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex shrink-0 items-center gap-1 rounded border border-brand-border bg-background-card px-2 py-0.5 font-mono text-[10px] text-text-secondary hover:border-brand-primary hover:text-brand-primary"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-brand-primary" />
                      <span className="text-brand-primary">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed text-text-primary">
                <code>{active.softwareLayer.code}</code>
              </pre>
            </div>

            <p className="text-xs leading-relaxed text-text-secondary">
              <strong className="text-text-primary">Engineering Control: </strong>
              {active.softwareLayer.engineeringNote}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-brand-border/60 pt-3.5 font-mono text-xs">
            <Link
              href={`/products/${active.softwareLayer.projectSlug}`}
              className="inline-flex items-center gap-1.5 font-bold text-brand-primary hover:underline"
            >
              <span>System: {active.softwareLayer.projectName}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href={active.softwareLayer.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-text-muted hover:text-text-primary"
            >
              <GitBranch className="h-3.5 w-3.5 text-brand-primary" />
              <span>Verify on GitHub</span>
            </a>
          </div>
        </div>

        {/* PILLAR 3: RESEARCH (MITRE ATT&CK Brief & Educational Curriculum Lesson) */}
        <div className="lg:col-span-3 p-5 sm:p-6 flex flex-col justify-between space-y-5 bg-background/40">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/40 bg-brand-deep/70 px-2.5 py-1 font-mono text-xs font-bold text-brand-primary">
                <FlaskConical className="h-3.5 w-3.5" />
                <span>03 // RESEARCH LAB</span>
              </div>
              <span className="font-mono text-[10px] text-status-warning">DRAFT BRIEF</span>
            </div>

            <div className="rounded-xl border border-brand-border bg-background-elevated p-3 space-y-1">
              <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                MITRE ATT&CK Mapping
              </p>
              <p className="font-mono text-xs font-bold text-brand-primary">
                {active.researchLayer.mitreTechnique}
              </p>
              <p className="font-mono text-[10px] text-text-secondary">
                Tactic: {active.researchLayer.mitreTactic}
              </p>
            </div>

            <div className="space-y-1.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Published Research Publication
              </p>
              <h4 className="font-display text-sm font-bold text-text-primary leading-snug">
                <Link
                  href={`/research/${active.researchLayer.briefSlug}`}
                  className="hover:text-brand-primary transition-colors"
                >
                  {active.researchLayer.briefTitle}
                </Link>
              </h4>
              <p className="text-xs leading-relaxed text-text-secondary">
                {active.researchLayer.abstract}
              </p>
            </div>

            <div className="rounded-xl border border-brand-border/70 bg-background-card p-3 space-y-1">
              <p className="font-mono text-[10px] uppercase tracking-wider text-brand-primary">
                @c0de.commit Education Link
              </p>
              <Link
                href={`/insights/${active.researchLayer.lessonSlug}`}
                className="block font-display text-xs font-bold text-text-primary hover:text-brand-primary"
              >
                {active.researchLayer.lessonTitle} →
              </Link>
            </div>
          </div>

          <div className="border-t border-brand-border/60 pt-3.5">
            <Link
              href={`/research/${active.researchLayer.briefSlug}`}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-brand-primary/50 bg-brand-deep/60 px-4 py-2.5 font-mono text-xs font-bold text-brand-primary hover:bg-brand-primary hover:text-background transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Open Research Brief</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
