import type { ResearchArticleItem, ResearchCategoryItem } from "@/types";

export const RESEARCH_CATEGORIES: ResearchCategoryItem[] = [
  {
    slug: "offensive-security",
    name: "Offensive Security",
    description:
      "Authorised adversarial methodologies, API exploitation vectors, and business-logic assessment techniques.",
  },
  {
    slug: "defensive-security",
    name: "Defensive Security",
    description:
      "Detection engineering, guardrail architectures, and system hardening blueprints.",
  },
  {
    slug: "threat-intelligence",
    name: "Threat Intelligence",
    description:
      "Automated IOC extraction, MITRE ATT&CK behavioral mapping, and threat knowledge graphs.",
  },
  {
    slug: "malware-analysis",
    name: "Malware Analysis",
    description:
      "Botnet payload telemetry, dropper behaviors, and sandbox containment patterns.",
  },
  {
    slug: "cloud-security",
    name: "Cloud Security",
    description:
      "Multi-cloud IAM privilege graphs, posture drift detection, and approval-gated remediation across AWS and Azure.",
  },
  {
    slug: "iot-security",
    name: "IoT Security",
    description:
      "Honeypot sensor telemetry, embedded protocol emulation, and smart-environment anomaly detection.",
  },
  {
    slug: "digital-forensics",
    name: "Digital Forensics",
    description:
      "Volatile memory analysis with Volatility 3, chain-of-custody automation, and DFIR timeline reconstruction.",
  },
  {
    slug: "secure-development",
    name: "Secure Development",
    description:
      "Zero-trust input validation, memory-safe API contracts, and OWASP ASVS architecture patterns.",
  },
];

export const RESEARCH_ARTICLES: ResearchArticleItem[] = [
  {
    id: "res-1",
    slug: "iot-botnet-telemetry-mirai-gafgyt-analysis",
    title: "IoT Honeypot Telemetry: Analyzing Automated Mirai & Gafgyt Propagation Vectors",
    summary:
      "Architectural breakdown of SENTINEL-IoT emulation sensors, analyzing how automated botnet scanners negotiate Telnet/SSH handshakes and stage multi-architecture ELF droppers.",
    categorySlug: "iot-security",
    categoryName: "IoT Security",
    authorName: "Anand Binu Arjun",
    authorRole: "Principal Security Engineer — CODE.COMMIT",
    readingTimeMin: 9,
    publicationStatus: "DRAFT",
    statusLabel: "WORKING RESEARCH BRIEF — BASED ON SENTINEL-IoT ARCHITECTURE",
    publishedAt: "2026-10-18",
    updatedAt: "2026-11-15",
    mitreAttackRefs: [
      { id: "T1110.001", name: "Brute Force: Password Guessing", tactic: "Credential Access" },
      { id: "T1059.004", name: "Command and Scripting Interpreter: Unix Shell", tactic: "Execution" },
      { id: "T1105", name: "Ingress Tool Transfer", tactic: "Command and Control" },
    ],
    tableOfContents: [
      { id: "abstract", title: "1. Abstract & Sensor Architecture" },
      { id: "handshake-anatomy", title: "2. Anatomy of Automated IoT Scanner Handshakes" },
      { id: "containment", title: "3. Sandboxed Emulation & Egress Containment" },
      { id: "defensive-controls", title: "4. Defensive Engineering Recommendations" },
    ],
    sections: [
      {
        id: "abstract",
        heading: "1. Abstract & Sensor Architecture",
        paragraphs: [
          "Internet-facing embedded devices remain a primary target for automated botnet induction. This working research brief documents the sensor design implemented in SENTINEL-IoT (`github.com/AnandBinuArjun/SENTINEL-IoT`), focusing on safe protocol emulation and real-time telemetry extraction.",
          "Note: All observations in this brief reflect architectural patterns and controlled emulation design rather than fabricated live customer breach statistics.",
        ],
        diagramNote:
          "[ Ingress Probe ] ──► [ Isolated Protocol Emulator ] ──► [ Command Stream Parser ] ──► [ Defanged IOC Store ]",
      },
      {
        id: "handshake-anatomy",
        heading: "2. Anatomy of Automated IoT Scanner Handshakes",
        paragraphs: [
          "Automated Mirai and Gafgyt variants follow a deterministic three-stage induction sequence: high-frequency TCP SYN scanning across common embedded management ports (23, 2323, 22, 8080), rapid credential dictionary rotation, and BusyBox shell verification prior to fetching architecture-specific ELF binaries via `wget` or `tftp`.",
        ],
        codeSnippet: {
          language: "python",
          filename: "sentinel_iot/telemetry_parser.py",
          code: `from dataclasses import dataclass
import re

DROPPER_URL_REGEX = re.compile(r"(?:wget|curl)\\s+.*?(https?://[^\\s;|]+)", re.IGNORECASE)

@dataclass(frozen=True)
class CapturedCommandSummary:
    raw_length: int
    uses_busybox: bool
    defanged_urls: list[str]

def parse_honeypot_command(command_line: str) -> CapturedCommandSummary:
    matches = DROPPER_URL_REGEX.findall(command_line)
    defanged = [url.replace("http://", "hxxp[://]").replace("https://", "hxxps[://]") for url in matches]
    return CapturedCommandSummary(
        raw_length=len(command_line),
        uses_busybox="busybox" in command_line.lower(),
        defanged_urls=defanged,
    )`,
        },
      },
      {
        id: "containment",
        heading: "3. Sandboxed Emulation & Egress Containment",
        paragraphs: [
          "A critical requirement of honeypot engineering is ensuring that an emulated service can never be abused by an adversary as an outbound relay. SENTINEL-IoT isolates listeners inside network namespaces with strict egress firewall policies, simulating shell responses without executing untrusted binaries.",
        ],
      },
      {
        id: "defensive-controls",
        heading: "4. Defensive Engineering Recommendations",
        paragraphs: [
          "Organisations deploying industrial or smart-environment IoT fleets should enforce dedicated VLAN segmentation, disable legacy clear-text management protocols (Telnet), replace factory credentials via automated provisioning, and monitor outbound DNS and flow anomalies.",
        ],
      },
    ],
    references: [
      {
        title: "SENTINEL-IoT Public Repository — AnandBinuArjun",
        url: "https://github.com/AnandBinuArjun/SENTINEL-IoT",
      },
      {
        title: "MITRE ATT&CK T1105 — Ingress Tool Transfer",
        url: "https://attack.mitre.org/techniques/T1105/",
      },
    ],
    relatedProjectSlugs: ["sentinel-iot", "smart-home-iot-anomaly-detection-engine"],
  },
  {
    id: "res-2",
    slug: "llm-assisted-cti-extraction-mitre-mapping",
    title: "Structured CTI Pipelines: Extracting IOCs and Mapping MITRE ATT&CK with NLP & Guarded LLMs",
    summary:
      "Designing deterministic-plus-LLM pipelines to transform unstructured threat reports into verified MITRE ATT&CK technique graphs without hallucinated identifiers.",
    categorySlug: "threat-intelligence",
    categoryName: "Threat Intelligence",
    authorName: "Anand Binu Arjun",
    authorRole: "Principal Security Engineer — CODE.COMMIT",
    readingTimeMin: 10,
    publicationStatus: "DRAFT",
    statusLabel: "WORKING RESEARCH BRIEF — BASED ON CTI ANALYSIS REPOSITORY",
    publishedAt: "2026-10-25",
    updatedAt: "2026-11-18",
    mitreAttackRefs: [
      { id: "T1566", name: "Phishing", tactic: "Initial Access" },
      { id: "T1071.001", name: "Application Layer Protocol: Web Protocols", tactic: "Command and Control" },
    ],
    tableOfContents: [
      { id: "challenge", title: "1. The Unstructured Threat Intelligence Bottleneck" },
      { id: "hybrid-pipeline", title: "2. Hybrid Regex + Guarded LLM Architecture" },
      { id: "allowlist-verification", title: "3. Eliminating Hallucinated MITRE Technique IDs" },
    ],
    sections: [
      {
        id: "challenge",
        heading: "1. The Unstructured Threat Intelligence Bottleneck",
        paragraphs: [
          "Threat research publications often distribute critical indicators and behavioral context in unstructured prose. Relying exclusively on generative models to extract IOCs risks hallucinated technique IDs or indirect prompt injection, while pure regex misses behavioral MITRE ATT&CK context.",
        ],
      },
      {
        id: "hybrid-pipeline",
        heading: "2. Hybrid Regex + Guarded LLM Architecture",
        paragraphs: [
          "In the `threat-intelligence-cti-analysis` project (`github.com/AnandBinuArjun/threat-intelligence-cti-analysis`), extraction is split into two stages: deterministic lexical parsers extract and defang atomic indicators (SHA-256, IPv4, CVE), while a schema-constrained NLP/LLM classifier maps behavioral paragraphs to candidate ATT&CK techniques.",
        ],
        codeSnippet: {
          language: "python",
          filename: "cti_pipeline/mitre_validator.py",
          code: `ALLOWED_MITRE_TECHNIQUES: dict[str, str] = {
    "T1566": "Phishing",
    "T1566.001": "Spearphishing Attachment",
    "T1059": "Command and Scripting Interpreter",
    "T1071.001": "Application Layer Protocol: Web Protocols",
    "T1110.001": "Brute Force: Password Guessing",
}

def verify_extracted_techniques(candidate_ids: list[str]) -> list[dict[str, str]]:
    """Rejects any LLM-suggested technique ID not present in the official MITRE catalogue."""
    verified = []
    for tech_id in candidate_ids:
        normalized = tech_id.strip().upper()
        if normalized in ALLOWED_MITRE_TECHNIQUES:
            verified.append({"id": normalized, "name": ALLOWED_MITRE_TECHNIQUES[normalized]})
    return verified`,
        },
      },
      {
        id: "allowlist-verification",
        heading: "3. Eliminating Hallucinated MITRE Technique IDs",
        paragraphs: [
          "Every technique identifier emitted by the classification stage is cross-checked against a local immutable snapshot of the official MITRE ATT&CK STIX bundle. Any unverified identifier is discarded before committing nodes to the threat knowledge graph.",
        ],
      },
    ],
    references: [
      {
        title: "Threat Intelligence CTI Analysis Repository — AnandBinuArjun",
        url: "https://github.com/AnandBinuArjun/threat-intelligence-cti-analysis",
      },
      {
        title: "MITRE ATT&CK Enterprise Matrix",
        url: "https://attack.mitre.org/",
      },
    ],
    relatedProjectSlugs: ["threat-intelligence-cti-analysis", "codex-cyberstrike"],
  },
  {
    id: "res-3",
    slug: "hybrid-cloud-posture-drift-aws-azure",
    title: "Hybrid Cloud Posture Engineering: Governing IAM Drift & Approval-Gated Remediation in AWS and Azure",
    summary:
      "How CloudSentinel models cross-cloud resource graphs and prevents production outages during posture remediation using human-in-the-loop approval gates.",
    categorySlug: "cloud-security",
    categoryName: "Cloud Security",
    authorName: "Anand Binu Arjun",
    authorRole: "Principal Security Engineer — CODE.COMMIT",
    readingTimeMin: 11,
    publicationStatus: "DRAFT",
    statusLabel: "WORKING RESEARCH BRIEF — CLOUDSENTINEL ARCHITECTURE",
    publishedAt: "2026-11-01",
    updatedAt: "2026-11-19",
    mitreAttackRefs: [
      { id: "T1078.004", name: "Valid Accounts: Cloud Accounts", tactic: "Privilege Escalation" },
      { id: "T1098", name: "Account Manipulation", tactic: "Persistence" },
    ],
    tableOfContents: [
      { id: "multi-cloud-challenge", title: "1. Multi-Cloud IAM Asymmetry" },
      { id: "approval-gated", title: "2. Why Blind Auto-Remediation Fails in Production" },
      { id: "state-machine", title: "3. Approval-Gated Remediation State Machine" },
    ],
    sections: [
      {
        id: "multi-cloud-challenge",
        heading: "1. Multi-Cloud IAM Asymmetry",
        paragraphs: [
          "AWS IAM policy evaluation (combining identity policies, resource policies, SCPs, and permission boundaries) differs fundamentally from Microsoft Azure RBAC and Entra ID directory roles. Evaluating security posture across both clouds requires normalizing principals, actions, and resource scopes into a common graph representation.",
        ],
      },
      {
        id: "approval-gated",
        heading: "2. Why Blind Auto-Remediation Fails in Production",
        paragraphs: [
          "Many CSPM tools offer automated remediation bots that immediately revoke security group rules or IAM bindings upon detecting a violation. In production environments, unreviewed automated mutations frequently sever legitimate microservice traffic. CloudSentinel replaces blind mutation with deterministic Infrastructure-as-Code diff generation and cryptographic operator approval gates.",
        ],
        codeSnippet: {
          language: "typescript",
          filename: "cloudsentinel/remediation-gate.ts",
          code: `export type RemediationState =
  | "DETECTED"
  | "DIFF_GENERATED"
  | "AWAITING_OPERATOR_APPROVAL"
  | "APPROVED_DISPATCHED"
  | "VERIFIED_CLOSED";

export interface RemediationProposal {
  findingId: string;
  cloudProvider: "AWS" | "AZURE";
  resourceArnOrId: string;
  proposedIacPatch: string;
  blastRadiusScore: number;
  state: RemediationState;
  approvedBy?: string;
}`,
        },
      },
      {
        id: "state-machine",
        heading: "3. Approval-Gated Remediation State Machine",
        paragraphs: [
          "Every posture finding transitions through five verifiable states: detection, dry-run diff synthesis, human blast-radius review, scoped execution, and post-remediation verification polling.",
        ],
      },
    ],
    references: [
      {
        title: "OWASP Cloud-Native Application Security Top 10",
        url: "https://owasp.org/",
      },
    ],
    relatedProjectSlugs: ["cloudsentinel", "total-entity-exposure-monitor"],
  },
  {
    id: "res-4",
    slug: "automated-memory-forensics-volatility3-triage",
    title: "Automated Memory Forensics: Scaling Volatility 3 Artifact Triage for Incident Response",
    summary:
      "Accelerating DFIR memory image inspection by combining cryptographic evidence verification with automated Volatility 3 process lineage and RWX page scoring.",
    categorySlug: "digital-forensics",
    categoryName: "Digital Forensics",
    authorName: "Anand Binu Arjun",
    authorRole: "Principal Security Engineer — CODE.COMMIT",
    readingTimeMin: 8,
    publicationStatus: "DRAFT",
    statusLabel: "WORKING RESEARCH BRIEF — DFIR AUTOMATION SERIES",
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-20",
    mitreAttackRefs: [
      { id: "T1055", name: "Process Injection", tactic: "Defense Evasion" },
      { id: "T1547", name: "Boot or Logon Autostart Execution", tactic: "Persistence" },
    ],
    tableOfContents: [
      { id: "volatile-evidence", title: "1. Preserving Volatile Memory Integrity" },
      { id: "plugin-orchestration", title: "2. Deterministic Volatility 3 Orchestration" },
      { id: "anomaly-scoring", title: "3. Scoring Parent-Child Process Anomalies" },
    ],
    sections: [
      {
        id: "volatile-evidence",
        heading: "1. Preserving Volatile Memory Integrity",
        paragraphs: [
          "Fileless malware and reflective memory loaders leave minimal footprints on disk while residing in volatile RAM. Before automated parsing begins, forensic pipelines must record and verify the SHA-256 digest of the raw memory image in an immutable intake manifest.",
        ],
      },
      {
        id: "plugin-orchestration",
        heading: "2. Deterministic Volatility 3 Orchestration",
        paragraphs: [
          "By running `pslist`, `pstree`, `netscan`, and `malfind` in parallel inside a network-isolated container worker, an IR engineering team can compress initial memory triage from hours to minutes.",
        ],
      },
      {
        id: "anomaly-scoring",
        heading: "3. Scoring Parent-Child Process Anomalies",
        paragraphs: [
          "Heuristic scoring prioritizes processes exhibiting private `PAGE_EXECUTE_READWRITE` (RWX) memory regions without backing disk mapped files, or unexpected parent-child spawning chains.",
        ],
      },
    ],
    references: [
      {
        title: "Volatility 3 Framework Documentation",
        url: "https://volatility3.readthedocs.io/",
      },
    ],
    relatedProjectSlugs: ["ml-data-driven-forensic-automation"],
  },
  {
    id: "res-5",
    slug: "api-broken-object-level-authorization-patterns",
    title: "Eliminating Broken Object-Level Authorization (BOLA) in Multi-Tenant APIs",
    summary:
      "Offensive testing methodologies and defensive data-access patterns for preventing tenant boundary bypasses in REST and GraphQL services.",
    categorySlug: "offensive-security",
    categoryName: "Offensive Security",
    authorName: "Anand Binu Arjun",
    authorRole: "Principal Security Engineer — CODE.COMMIT",
    readingTimeMin: 7,
    publicationStatus: "DRAFT",
    statusLabel: "WORKING RESEARCH BRIEF — APPSEC & PENTEST SERIES",
    publishedAt: "2026-11-08",
    updatedAt: "2026-11-21",
    mitreAttackRefs: [
      { id: "T1190", name: "Exploit Public-Facing Application", tactic: "Initial Access" },
    ],
    tableOfContents: [
      { id: "bola-mechanics", title: "1. Mechanics of Object-Level Authorization Failures" },
      { id: "repository-guard", title: "2. Enforcing Tenant Context at the Repository Boundary" },
    ],
    sections: [
      {
        id: "bola-mechanics",
        heading: "1. Mechanics of Object-Level Authorization Failures",
        paragraphs: [
          "Broken Object-Level Authorization (OWASP API1:2023) occurs when an endpoint authenticates the caller's session token but fails to verify that the authenticated principal owns or is authorized to act upon the specific resource identifier passed in the request path or payload.",
        ],
      },
      {
        id: "repository-guard",
        heading: "2. Enforcing Tenant Context at the Repository Boundary",
        paragraphs: [
          "Rather than relying on individual route controllers to remember authorization checks, secure data-access layers require the authenticated `tenantId` and `actorId` as mandatory parameters in every Prisma or SQL query helper.",
        ],
        codeSnippet: {
          language: "typescript",
          filename: "src/server/repositories/project-record.ts",
          code: `export async function getScopedRecordById(params: {
  recordId: string;
  authenticatedTenantId: string;
}) {
  // Composite lookup ensures cross-tenant IDs never resolve
  return prisma.projectRecord.findFirst({
    where: {
      id: params.recordId,
      tenantId: params.authenticatedTenantId,
    },
  });
}`,
        },
      },
    ],
    references: [
      {
        title: "OWASP API Security Top 10 (API1:2023 Broken Object Level Authorization)",
        url: "https://owasp.org/API-Security/",
      },
    ],
    relatedProjectSlugs: ["vulnerability-management-platform", "codex-cyberstrike"],
  },
  {
    id: "res-6",
    slug: "identity-graph-blast-radius-analysis",
    title: "Identity Graph Blast-Radius Analysis: Modeling Transitive Privilege Escalation",
    summary:
      "Using directed graphs to uncover non-obvious privilege escalation pathways across service principals, role assumptions, and group memberships.",
    categorySlug: "defensive-security",
    categoryName: "Defensive Security",
    authorName: "Anand Binu Arjun",
    authorRole: "Principal Security Engineer — CODE.COMMIT",
    readingTimeMin: 8,
    publicationStatus: "DRAFT",
    statusLabel: "WORKING RESEARCH BRIEF — BASED ON TOTAL ENTITY",
    publishedAt: "2026-11-10",
    updatedAt: "2026-11-22",
    mitreAttackRefs: [
      { id: "T1078", name: "Valid Accounts", tactic: "Defense Evasion" },
    ],
    tableOfContents: [
      { id: "transitive-risk", title: "1. Why Flat IAM Audits Miss Transitive Risk" },
      { id: "graph-reduction", title: "2. Pruning High-Centrality Privilege Edges" },
    ],
    sections: [
      {
        id: "transitive-risk",
        heading: "1. Why Flat IAM Audits Miss Transitive Risk",
        paragraphs: [
          "A developer account may hold no direct production administrative role, yet possess permission to modify a CI workflow or assume an intermediate staging role that holds secret-read privileges. Flat role listings hide these multi-hop escalation chains.",
        ],
      },
      {
        id: "graph-reduction",
        heading: "2. Pruning High-Centrality Privilege Edges",
        paragraphs: [
          "TOTAL ENTITY models principals and resources as vertices and permissions (`CanAssume`, `CanWritePolicy`, `HasSecretAccess`) as directed edges, computing shortest paths to Tier-0 assets so defenders can break high-centrality privilege bridges.",
        ],
      },
    ],
    references: [
      {
        title: "TOTAL ENTITY Repository — AnandBinuArjun",
        url: "https://github.com/AnandBinuArjun/TOTAL-ENTITY",
      },
    ],
    relatedProjectSlugs: ["total-entity-exposure-monitor", "cloudsentinel"],
  },
  {
    id: "res-7",
    slug: "zero-trust-validation-patterns-nextjs-fastapi",
    title: "Zero-Trust Input Validation & Secret Screening in Full-Stack Next.js and FastAPI Systems",
    summary:
      "Practical patterns for schema parsing, anti-automation rate limiting, and rejecting accidental credential disclosures in public web forms.",
    categorySlug: "secure-development",
    categoryName: "Secure Development",
    authorName: "Anand Binu Arjun",
    authorRole: "Principal Security Engineer — CODE.COMMIT",
    readingTimeMin: 6,
    publicationStatus: "DRAFT",
    statusLabel: "WORKING RESEARCH BRIEF — SECURE ENGINEERING SERIES",
    publishedAt: "2026-11-12",
    updatedAt: "2026-11-22",
    mitreAttackRefs: [
      { id: "T1552", name: "Unsecured Credentials", tactic: "Credential Access" },
    ],
    tableOfContents: [
      { id: "parse-dont-validate", title: "1. Parse, Don't Just Validate" },
      { id: "secret-rejection", title: "2. Proactive Secret Rejection on Public Intake Forms" },
    ],
    sections: [
      {
        id: "parse-dont-validate",
        heading: "1. Parse, Don't Just Validate",
        paragraphs: [
          "Every boundary crossing—from client form submission to API route handler—must parse untrusted payloads through strict Zod or Pydantic schemas with explicit maximum lengths, allowed character sets, and enum constraints.",
        ],
      },
      {
        id: "secret-rejection",
        heading: "2. Proactive Secret Rejection on Public Intake Forms",
        paragraphs: [
          "Prospective clients occasionally attempt to paste raw API keys, PEM private keys, or credentials into support or project enquiry forms. By screening input buffers against secret regular expressions server-side and immediately rejecting them before database persistence, platforms avoid inadvertently storing sensitive customer secrets.",
        ],
      },
    ],
    references: [
      {
        title: "OWASP Application Security Verification Standard (ASVS 4.0.3)",
        url: "https://owasp.org/www-project-application-security-verification-standard/",
      },
    ],
    relatedProjectSlugs: ["ai-powered-personal-digital-safety-assistant"],
  },
  {
    id: "res-8",
    slug: "contain-elf-droppers-sandbox-isolation",
    title: "Safe Handling & Static Triage of Captured Linux ELF Botnet Droppers",
    summary:
      "Static header analysis, string extraction, and non-executing isolation workflows for inspecting captured IoT malware artifacts safely.",
    categorySlug: "malware-analysis",
    categoryName: "Malware Analysis",
    authorName: "Anand Binu Arjun",
    authorRole: "Principal Security Engineer — CODE.COMMIT",
    readingTimeMin: 7,
    publicationStatus: "DRAFT",
    statusLabel: "WORKING RESEARCH BRIEF — MALWARE TRIAGE SERIES",
    publishedAt: "2026-11-14",
    updatedAt: "2026-11-23",
    mitreAttackRefs: [
      { id: "T1027", name: "Obfuscated Files or Information", tactic: "Defense Evasion" },
    ],
    tableOfContents: [
      { id: "inert-storage", title: "1. Inert Storage & Non-Executable Mounts" },
      { id: "elf-triage", title: "2. Static ELF Header & Section Inspection" },
    ],
    sections: [
      {
        id: "inert-storage",
        heading: "1. Inert Storage & Non-Executable Mounts",
        paragraphs: [
          "Captured binaries must be written with `0400` permissions onto `noexec` mounted volumes, indexed by their SHA-256 digest, and never inspected on a host with active network egress.",
        ],
      },
      {
        id: "elf-triage",
        heading: "2. Static ELF Header & Section Inspection",
        paragraphs: [
          "Inspecting ELF machine architecture headers (`e_machine` for ARM, MIPS, x86_64), UPX packing signatures, and imported symbol tables provides rapid family classification without detonating the sample.",
        ],
      },
    ],
    references: [
      {
        title: "SENTINEL-IoT Project — AnandBinuArjun",
        url: "https://github.com/AnandBinuArjun/SENTINEL-IoT",
      },
    ],
    relatedProjectSlugs: ["sentinel-iot"],
  },
];

export function getResearchArticleBySlug(slug: string): ResearchArticleItem | undefined {
  return RESEARCH_ARTICLES.find((article) => article.slug === slug);
}

export function getResearchCategoryBySlug(slug: string): ResearchCategoryItem | undefined {
  return RESEARCH_CATEGORIES.find((cat) => cat.slug === slug);
}

export function getResearchArticlesByCategory(categorySlug: string): ResearchArticleItem[] {
  return RESEARCH_ARTICLES.filter((article) => article.categorySlug === categorySlug);
}
