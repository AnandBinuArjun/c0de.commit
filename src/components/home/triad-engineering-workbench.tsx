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
  ChevronDown,
  ChevronUp,
  Activity,
} from "lucide-react";
import { SecurityTelemetryConsole } from "@/components/home/security-telemetry-console";
import { cn } from "@/lib/utils";

interface PillarScenario {
  id: string;
  shortTab: string;
  domainCode: string;
  domainTitle: string;
  summary: string;
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
    shortTab: "01 // Hybrid Cloud & SoD",
    domainCode: "SCENARIO 01 // CLOUD DEFENCE",
    domainTitle: "Multi-Cloud IAM Drift & Separation-of-Duties Remediation",
    summary:
      "How CloudSentinel detects cross-account AWS/Azure privilege drift and prevents unsafe automated mutations using cryptographic human approval gates.",
    securityLayer: {
      vectorId: "CS-AWS-IAM-004 / AZ-RBAC-002",
      threatName: "Cross-Account AssumeRole Drift & Blind Auto-Remediation Risk",
      standardRef: "CIS AWS v3.0 · NIST CSF PR.AC-4 · OWASP Cloud-Native Top 10",
      telemetryIndicator:
        "CloudTrail: UpdateAssumeRolePolicy / Azure Activity: RoleAssignments/write with wildcard principal",
      postureState: "READ-ONLY DEFAULT · AWAITING SEPARATION-OF-DUTIES APPROVAL",
    },
    softwareLayer: {
      filename: "cloudsentinel/core/remediation_sod_gate.py (Illustrative Control Pattern)",
      language: "PYTHON 3.12 · FASTAPI · POSTGRESQL RLS",
      projectSlug: "cloudsentinel",
      projectName: "CloudSentinel v1.0.0",
      githubRepo: "https://github.com/AnandBinuArjun/cloundsentinel",
      engineeringNote:
        "Live cloud mutation is blocked unless an independent operator (approver != proposer) signs off on the dry-run Infrastructure-as-Code diff.",
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
    shortTab: "02 // AppSec & BOLA Guard",
    domainCode: "SCENARIO 02 // APPLICATION SECURITY",
    domainTitle: "Multi-Tenant BOLA Prevention & Cryptographically Locked Triage",
    summary:
      "How AegisFlow eliminates Broken Object-Level Authorization (BOLA) at the repository boundary and locks vulnerability remediation plans with SHA-256 digests.",
    securityLayer: {
      vectorId: "OWASP-API1:2023 / ASVS-V4.2.1",
      threatName: "Broken Object-Level Authorization (BOLA / IDOR) & Unverified Patch Closure",
      standardRef: "OWASP API Security Top 10 · OWASP ASVS Level 2 · SARIF 2.1.0",
      telemetryIndicator:
        "Authenticated session principal attempting cross-tenant UUID resolution on REST/GraphQL resource endpoint",
      postureState: "BLOCKED AT REPOSITORY BOUNDARY · SHA-256 PLAN VERIFIED",
    },
    softwareLayer: {
      filename: "aegisflow/server/tenant_scoped_repository.ts (Illustrative Control Pattern)",
      language: "TYPESCRIPT 5.7 · PRISMA · SHA-256 PLAN LOCK",
      projectSlug: "aegisflow",
      projectName: "AegisFlow (46 CI Tests Passing)",
      githubRepo: "https://github.com/AnandBinuArjun/AegisFlow",
      engineeringNote:
        "Requires composite (id + tenantId) keys at the data-access layer and verifies the immutable SHA-256 remediation plan hash before closure.",
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
    shortTab: "03 // IoT Deception & CTI",
    domainCode: "SCENARIO 03 // DECEPTION & CTI",
    domainTitle: "Sandboxed IoT Botnet Emulation & Guarded MITRE ATT&CK Extraction",
    summary:
      "How SENTINEL-IoT safely captures Mirai/Gafgyt botnet vectors inside egress-blocked namespaces and feeds defanged indicators into threat knowledge graphs.",
    securityLayer: {
      vectorId: "SENTINEL-MIRAI-ELF / CTI-STIX-2.1",
      threatName: "Automated Embedded Telnet/SSH Induction & Multi-Arch ELF Dropper Staging",
      standardRef: "MITRE ATT&CK Enterprise & ICS · STIX/TAXII · OWASP IoT Top 10",
      telemetryIndicator:
        "Ingress probe on sandboxed port 23/2323 -> BusyBox shell verification -> wget/tftp ELF binary fetch",
      postureState: "EGRESS CONTAINED IN NAMESPACE · IOC DEFANGED & MAPPED",
    },
    softwareLayer: {
      filename: "sentinel_iot/deception/dropper_interceptor.py (Illustrative Control Pattern)",
      language: "PYTHON 3.12 · DOCKER NAMESPACE · FASTAPI",
      projectSlug: "sentinel-iot",
      projectName: "SENTINEL-IoT (23★ Flagship Repo)",
      githubRepo: "https://github.com/AnandBinuArjun/SENTINEL-IOT",
      engineeringNote:
        "Intercepts botnet command streams inside an egress-blocked container, defangs dropper URLs, and validates MITRE technique IDs against an immutable allowlist.",
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
  const [showCodeDrawer, setShowCodeDrawer] = useState(false);
  const [showTelemetryDrawer, setShowTelemetryDrawer] = useState(false);
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
    <div className="space-y-6">
      <div className="surface-glass rounded-3xl overflow-hidden">
        {/* Top Scenario Selector Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-brand-border/50 bg-background-elevated/60 p-5 sm:p-7 lg:flex-row lg:items-center">
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-primary">
              {active.domainCode}
            </span>
            <h3 className="font-display text-xl font-bold text-text-primary sm:text-2xl">
              {active.domainTitle}
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary max-w-2xl">
              {active.summary}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Engineering Lab Scenarios"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 lg:pb-0"
          >
            {PILLAR_SCENARIOS.map((scenario) => {
              const isSelected = scenario.id === active.id;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedId(scenario.id)}
                  className={cn(
                    "shrink-0 rounded-xl border px-4 py-2.5 font-mono text-xs transition-all",
                    isSelected
                      ? "border-brand-primary bg-brand-deep text-brand-primary font-bold"
                      : "border-brand-border/60 bg-background-card text-text-secondary hover:text-text-primary"
                  )}
                >
                  {scenario.shortTab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean 3-Column Progressive Summary (Simplified by Default) */}
        <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-3">
          {/* 1. Security Analysis */}
          <div className="rounded-2xl border border-brand-border/50 bg-background/50 p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-brand-primary">
                <Shield className="h-4 w-4" />
                <span>01 // SECURITY ANALYSIS</span>
              </div>
              <p className="font-mono text-xs text-text-muted">
                {active.securityLayer.vectorId}
              </p>
              <h4 className="font-display text-base font-bold text-text-primary">
                {active.securityLayer.threatName}
              </h4>
              <p className="text-xs leading-relaxed text-text-secondary">
                {active.securityLayer.telemetryIndicator}
              </p>
            </div>
            <div className="border-t border-brand-border/40 pt-3 font-mono text-[11px] text-brand-primary flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              <span>{active.securityLayer.postureState}</span>
            </div>
          </div>

          {/* 2. Software Implementation */}
          <div className="rounded-2xl border border-brand-border/50 bg-background/50 p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-brand-primary">
                <Code2 className="h-4 w-4" />
                <span>02 // SOFTWARE IMPLEMENTATION</span>
              </div>
              <p className="font-mono text-xs text-text-muted">
                {active.softwareLayer.language}
              </p>
              <h4 className="font-display text-base font-bold text-text-primary">
                {active.softwareLayer.projectName}
              </h4>
              <p className="text-xs leading-relaxed text-text-secondary">
                {active.softwareLayer.engineeringNote}
              </p>
            </div>
            <div className="border-t border-brand-border/40 pt-3 flex items-center justify-between font-mono text-xs">
              <Link
                href={`/products/${active.softwareLayer.projectSlug}`}
                className="text-brand-primary font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>System Blueprint</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href={active.softwareLayer.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-primary inline-flex items-center gap-1"
              >
                <GitBranch className="h-3.5 w-3.5 text-brand-primary" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* 3. Research Context */}
          <div className="rounded-2xl border border-brand-border/50 bg-background/50 p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-brand-primary">
                <FlaskConical className="h-4 w-4" />
                <span>03 // RESEARCH CONTEXT</span>
              </div>
              <p className="font-mono text-xs text-brand-primary">
                MITRE {active.researchLayer.mitreTechnique}
              </p>
              <h4 className="font-display text-base font-bold text-text-primary">
                <Link
                  href={`/research/${active.researchLayer.briefSlug}`}
                  className="hover:text-brand-primary"
                >
                  {active.researchLayer.briefTitle}
                </Link>
              </h4>
              <p className="text-xs leading-relaxed text-text-secondary">
                {active.researchLayer.abstract}
              </p>
            </div>
            <div className="border-t border-brand-border/40 pt-3 flex items-center justify-between font-mono text-xs">
              <Link
                href={`/research/${active.researchLayer.briefSlug}`}
                className="text-brand-primary font-semibold hover:underline inline-flex items-center gap-1"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Read Research Paper</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Progressive Disclosure Action Bar: Expand Code Sample & Architecture Console */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-brand-border/50 bg-background-elevated/50 px-6 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowCodeDrawer((prev) => !prev)}
              aria-expanded={showCodeDrawer}
              className="inline-flex items-center gap-2 rounded-xl border border-brand-primary/40 bg-brand-deep/60 px-4 py-2 font-mono text-xs font-semibold text-brand-primary hover:bg-brand-deep transition-colors"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>
                {showCodeDrawer
                  ? "Hide Illustrative Code Pattern"
                  : "Inspect Illustrative Code Pattern"}
              </span>
              {showCodeDrawer ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowTelemetryDrawer((prev) => !prev)}
              aria-expanded={showTelemetryDrawer}
              className="inline-flex items-center gap-2 rounded-xl border border-brand-border bg-background-card px-4 py-2 font-mono text-xs text-text-secondary hover:border-brand-primary hover:text-text-primary transition-colors"
            >
              <Activity className="h-3.5 w-3.5 text-brand-primary" />
              <span>
                {showTelemetryDrawer
                  ? "Hide Interactive Control Plane & CLI"
                  : "Open Interactive Control Plane & CLI"}
              </span>
              {showTelemetryDrawer ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          <Link
            href="/tools"
            className="font-mono text-xs text-brand-primary hover:underline"
          >
            Launch Zero-Egress Security Utilities Lab (/tools) →
          </Link>
        </div>

        {/* On-Demand Expandable Code Evidence Drawer (Surface C: Technical Interface) */}
        {showCodeDrawer && (
          <div className="surface-technical border-t border-brand-border/60 p-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-mono text-xs text-text-primary">
                <Terminal className="h-3.5 w-3.5 text-brand-primary" />
                <span>{active.softwareLayer.filename}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border bg-background-card px-3 py-1 font-mono text-xs text-text-secondary hover:border-brand-primary hover:text-brand-primary"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-brand-primary" />
                    <span className="text-brand-primary">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto rounded-xl border border-brand-border/60 bg-[#030806] p-4 font-mono text-xs leading-relaxed text-text-primary">
              <code>{active.softwareLayer.code}</code>
            </pre>
          </div>
        )}
      </div>

      {/* On-Demand Repositioned Security Telemetry & CLI Console */}
      {showTelemetryDrawer && (
        <div className="pt-2">
          <SecurityTelemetryConsole />
        </div>
      )}
    </div>
  );
}
