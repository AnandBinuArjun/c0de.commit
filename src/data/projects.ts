import type { ProjectItem } from "@/types";

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj-cloudsentinel",
    slug: "cloudsentinel",
    name: "CloudSentinel",
    shortDescription:
      "Enterprise Multi-Cloud Security Posture Management (CSPM) & Threat Detection Platform for AWS and Microsoft Azure with 18 deterministic posture rules, 9 MITRE ATT&CK detections, and approval-gated remediation.",
    category: "Cloud Security",
    isProduct: true,
    featured: true,
    developmentStatus: "PRODUCTION_READY",
    statusLabel: "v1.0.0 Verified Public Repository",
    problemStatement:
      "Organisations operating across AWS and Microsoft Azure face fragmented posture visibility, inconsistent IAM/RBAC permission models, and dangerous blind auto-remediation scripts that can disrupt production workloads without separation-of-duties approval.",
    solutionOverview:
      "Engineered under a strict 'Proof Before Action' contract, CloudSentinel combines read-only AWS STS & Azure Managed Identity asset discovery, 18 deterministic posture rules, 9 CloudTrail & Azure Activity Log threat detection rules mapped to MITRE ATT&CK, transparent 0–100 risk scoring, PostgreSQL 16 Row-Level Security (RLS) across 21 entities, approval-gated remediation with separation of duties (approver != proposer), and a 16-page dark enterprise web console.",
    architectureDiagram: {
      nodes: [
        {
          id: "cs-1",
          label: "AWS STS & Azure Managed Identity Connectors",
          layer: "Read-Only Discovery",
          detail: "Collects AWS IAM/S3/EC2/VPC/KMS/CloudTrail and Azure Entra/RBAC/NSG/Storage/KeyVault state.",
        },
        {
          id: "cs-2",
          label: "18 Posture & 9 MITRE Detection Rules",
          layer: "Deterministic Engine",
          detail: "Evaluates configurations to PASS, FAIL, NOT_ASSESSED, or ERROR with redacted evidence snapshots.",
        },
        {
          id: "cs-3",
          label: "PostgreSQL 16 + Row-Level Security",
          layer: "Multi-Tenant Store",
          detail: "21 relational entities enforcing tenant isolation, compliance mappings, and 0–100 risk scores.",
        },
        {
          id: "cs-4",
          label: "Separation-of-Duties Remediation Gate",
          layer: "16-Page Control Plane",
          detail: "Requires dry-run preview, rollback plan, and independent human approver (approver != proposer).",
        },
      ],
      flows: [
        "1. Read-only AWS STS & Azure Managed Identity collectors ingest asset metadata",
        "2. 18 deterministic posture rules & 9 MITRE ATT&CK log detectors evaluate state",
        "3. Risk engine computes transparent 0–100 score & maps CIS/NIST/ISO controls",
        "4. Operator previews remediation impact; independent approver signs off execution",
      ],
    },
    technologies: [
      "Python",
      "FastAPI",
      "TypeScript",
      "React",
      "PostgreSQL",
      "AWS",
      "Microsoft Azure",
      "Docker",
    ],
    implementedFeatures: [
      "Read-only AWS STS & Microsoft Azure Managed Identity connectors (Milestones 0–9 verified)",
      "18 deterministic cloud posture rules and 9 MITRE ATT&CK threat detection rules for CloudTrail & Azure Activity Logs",
      "21-entity PostgreSQL 16 schema with Row-Level Security (RLS) and evidence-backed JSON/CSV/PDF reporting",
      "Approval-gated remediation workflow enforcing separation of duties (approver != proposer) and 16-page React 19 enterprise console",
    ],
    plannedFeatures: [
      "Real-time EventBridge and Azure Event Grid streaming webhook push collectors",
      "Automated Terraform / Bicep pull-request generation for approved remediations",
    ],
    securityConsiderations: [
      "Read-only by default: CLOUDSENTINEL_LIVE_REMEDIATION_ENABLED=false prevents unintended cloud mutations.",
      "Failed or throttled cloud API calls resolve explicitly to NOT_ASSESSED or ERROR—never coerced into false PASS states.",
      "Official CloudSentinel logo pulled directly from docs/assets/cloudsentinel-logo.png in the repository.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/cloundsentinel",
    githubVerificationNote:
      "Verified public repository (github.com/AnandBinuArjun/cloundsentinel — v1.0.0, Milestones 0–9 Implemented & Verified, Apache 2.0 License).",
    logoSlot: {
      requiredAssetPath: "/products/cloudsentinel-logo.png",
      productName: "CloudSentinel",
      note: "Official CloudSentinel logo loaded from github.com/AnandBinuArjun/cloundsentinel/docs/assets/cloudsentinel-logo.png.",
    },
    relatedResearchSlugs: [
      "hybrid-cloud-posture-drift-aws-azure",
      "identity-graph-blast-radius-analysis",
    ],
  },
  {
    id: "proj-aegisflow",
    slug: "aegisflow",
    name: "AegisFlow",
    shortDescription:
      "AI-Native Application Security Platform providing evidence-driven vulnerability triage, Semgrep/Trivy SARIF ingestion, explainable risk scoring, and SHA-256 cryptographically verified remediation.",
    category: "Application Security",
    isProduct: true,
    featured: true,
    developmentStatus: "PRODUCTION_READY",
    statusLabel: "Verified Public Repository (46 Tests Passing)",
    problemStatement:
      "Engineering teams suffer from scanner alert fatigue across SAST/SCA tools, hallucinated AI code patches that introduce regressions, and vulnerabilities marked 'closed' without independent re-verification.",
    solutionOverview:
      "AegisFlow acts as the authoritative AppSec control plane from scanner ingestion to verified fix. It ingests Semgrep SARIF 2.1.0, Trivy Container/SCA JSON, and HMAC-verified Git webhooks, normalizes and fingerprints findings, calculates explainable multi-factor risk scores, locks remediation plans with immutable SHA-256 hashes, enforces separation-of-duties approval, and requires independent verification scans before closing any finding.",
    architectureDiagram: {
      nodes: [
        {
          id: "af-1",
          label: "SARIF & Webhook Ingestion",
          layer: "1. Intake & Scrubbing",
          detail: "Ingests Semgrep SARIF 2.1.0, Trivy JSON, and HMAC-SHA256 GitHub/GitLab webhooks with secret sanitization.",
        },
        {
          id: "af-2",
          label: "Canonical Fingerprinting & Risk Engine",
          layer: "2. Correlation",
          detail: "Deduplicates findings across branches and computes explainable multi-factor severity scores.",
        },
        {
          id: "af-3",
          label: "SHA-256 Locked Remediation Planner",
          layer: "3. Governance Gate",
          detail: "Generates evidence-linked patch plans protected by immutable cryptographic hashes and SoD approval.",
        },
        {
          id: "af-4",
          label: "Independent Verification Runner",
          layer: "4. Closure Proof",
          detail: "Confirms vulnerability elimination via re-scan before transitioning state to VERIFIED_CLOSED.",
        },
      ],
      flows: [
        "1. Ingest Semgrep SARIF / Trivy JSON & sanitize embedded secrets",
        "2. Fingerprint canonical vulnerability & compute explainable risk score",
        "3. Generate SHA-256 integrity-locked remediation plan & await SoD approval",
        "4. Execute independent verification check before closing finding",
      ],
    },
    technologies: ["Python", "FastAPI", "TypeScript", "React", "Tailwind CSS", "PostgreSQL", "Docker"],
    implementedFeatures: [
      "Semgrep SARIF 2.1.0, Trivy SCA/Container JSON, and HMAC-SHA256 Git webhook ingestion with payload secret scrubbing",
      "Canonical vulnerability fingerprinting and explainable multi-factor risk prioritization engine",
      "Cryptographically hashed (SHA-256) remediation plans with separation-of-duties human approval gates",
      "46 automated verification tests passing in CI pipeline under Apache 2.0 License",
    ],
    plannedFeatures: [
      "IDE language-server (LSP) inline remediation preview extension",
      "Automated GitHub Actions PR verification comment bot",
    ],
    securityConsiderations: [
      "Enforces 14 non-negotiable zero-trust security rules including payload size limits, secret scrubbing on ingestion, and immutable SHA-256 plan hashes.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/AegisFlow",
    githubVerificationNote:
      "Verified public repository on GitHub (github.com/AnandBinuArjun/AegisFlow — Python & TypeScript, 46 tests passing).",
    relatedResearchSlugs: [
      "api-broken-object-level-authorization-patterns",
      "zero-trust-validation-patterns-nextjs-fastapi",
    ],
  },
  {
    id: "proj-sentinel-iot",
    slug: "sentinel-iot",
    name: "SENTINEL-IoT",
    shortDescription:
      "Next-generation IoT intelligence platform and honeypot network (23★ on GitHub) that emulates vulnerable device services, captures Mirai and Gafgyt botnet vectors, and visualizes real-time threat telemetry.",
    category: "IoT & Honeypot Defense",
    isProduct: true,
    featured: true,
    developmentStatus: "PRODUCTION_READY",
    statusLabel: "Verified Public Repository (23★ Starred)",
    problemStatement:
      "Automated IoT botnets continuously scan and compromise exposed embedded devices within minutes of deployment. Defenders lack early-warning visibility into emerging command payloads and brute-force patterns targeting connected environments.",
    solutionOverview:
      "SENTINEL-IoT deploys isolated service emulators that mimic vulnerable IoT management protocols to safely attract and record hostile internet traffic. Captured sessions, payload hashes, and attacker command sequences are classified and surfaced through a security telemetry API and glassmorphism dashboard.",
    architectureDiagram: {
      nodes: [
        {
          id: "siot-1",
          label: "Protocol Honeypot Emulators",
          layer: "Deception Perimeter",
          detail: "Sandboxed Telnet, SSH, and HTTP IoT management surface emulators.",
        },
        {
          id: "siot-2",
          label: "Session & Payload Extractor",
          layer: "Telemetry Pipeline",
          detail: "Captures credential dictionaries, BusyBox shell commands, and dropper URLs.",
        },
        {
          id: "siot-3",
          label: "Botnet Signature Classifier",
          layer: "Analysis Engine",
          detail: "Classifies Mirai, Gafgyt, and automated scanner behavior patterns.",
        },
        {
          id: "siot-4",
          label: "Telemetry API & Dashboard",
          layer: "Presentation Layer",
          detail: "Exposes structured attack feeds and real-time threat visualizations.",
        },
      ],
      flows: [
        "1. Hostile scanner probes sandboxed IoT service emulator",
        "2. Emulator records authentication attempt & interactive command stream",
        "3. Telemetry parser extracts IOCs and classifies Mirai/Gafgyt family",
        "4. Dashboard & API publish sanitized early-warning indicators",
      ],
    },
    technologies: ["Python", "Docker", "Linux", "FastAPI", "React", "TypeScript"],
    implementedFeatures: [
      "Vulnerable IoT service emulation for capturing hostile probe and login activity (23 GitHub stars)",
      "Real-time attack session logging, BusyBox command capture, and dropper URL extraction",
      "Telemetry API and visual dashboard for reviewing captured Mirai and Gafgyt botnet vectors",
    ],
    plannedFeatures: [
      "Distributed multi-region sensor federation with automated STIX/TAXII feed export",
      "Automated dynamic sandbox header triage for captured ELF binary droppers",
    ],
    securityConsiderations: [
      "Honeypot listeners run in strictly isolated container namespaces with egress network blocks so sensors cannot be abused as pivot relays.",
      "Captured malware URLs and shell commands are defanged and stored inertly without execution permissions.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/SENTINEL-IOT",
    githubVerificationNote:
      "Verified flagship public repository on GitHub (github.com/AnandBinuArjun/SENTINEL-IOT — Python, 23 Stars).",
    relatedResearchSlugs: [
      "iot-botnet-telemetry-mirai-gafgyt-analysis",
      "contain-elf-droppers-sandbox-isolation",
    ],
  },
  {
    id: "proj-ransomwatch",
    slug: "ransomwatch",
    name: "RANSOMWATCH",
    shortDescription:
      "Real-time distributed cyber-threat observatory monitoring ransomware attacks on global critical infrastructure with Citizen Impact Scoring (CIS) and national risk heatmaps.",
    category: "Threat Intelligence",
    isProduct: true,
    featured: true,
    developmentStatus: "ACTIVE_DEVELOPMENT",
    statusLabel: "Verified Public Repository (Next.js 15 & Prisma)",
    problemStatement:
      "Ransomware targeting healthcare, energy, government, and education is a critical public safety threat, yet threat data remains scattered across raw leak feeds without structured societal impact metrics.",
    solutionOverview:
      "RANSOMWATCH implements a four-tier architecture (Collection → Normalization → Intelligence → Presentation) using Playwright collectors, enrichment workers, and a Citizen Impact Scoring (CIS) engine built on Next.js 15 and Prisma to provide national risk heatmaps and early-warning intelligence.",
    architectureDiagram: {
      nodes: [
        {
          id: "rw-1",
          label: "Playwright Telemetry Collectors",
          layer: "1. Ingestion Layer",
          detail: "Automated crawlers and normalization pipeline with deduplication checks.",
        },
        {
          id: "rw-2",
          label: "Sector & GeoIP Enrichment Worker",
          layer: "2. Context Engine",
          detail: "Maps affected critical infrastructure sectors (Healthcare, Energy, Gov, Edu).",
        },
        {
          id: "rw-3",
          label: "Citizen Impact Scoring (CIS)",
          layer: "3. Intelligence Core",
          detail: "Quantifies societal and infrastructure disruption severity in PostgreSQL.",
        },
        {
          id: "rw-4",
          label: "Next.js 15 Observatory & API",
          layer: "4. Presentation Layer",
          detail: "Real-time threat feed, national risk heatmaps, and webhook alert dispatcher.",
        },
      ],
      flows: [
        "1. Ingestion pipeline normalizes and deduplicates advisory feeds",
        "2. Enrichment worker classifies critical infrastructure sector & geography",
        "3. CIS engine calculates Citizen Impact Score and stores in Prisma DB",
        "4. Next.js 15 console renders national risk heatmaps & dispatches alerts",
      ],
    },
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Docker", "Linux"],
    implementedFeatures: [
      "Four-tier ransomware intelligence architecture (Collection, Normalization, Intelligence, Presentation)",
      "Citizen Impact Scoring (CIS) model prioritizing Healthcare, Energy, Government, and Education incidents",
      "Next.js 15 App Router observatory dashboard with Prisma persistence and national risk heatmaps",
    ],
    plannedFeatures: [
      "Automated CERT/CSIRT STIX 2.1 webhook broadcast integration",
      "Historical ransomware group TTP correlation matrix",
    ],
    securityConsiderations: [
      "Collectors run in isolated headless browser sandboxes with strict content sanitization before database persistence.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/RANSOMWATCH",
    githubVerificationNote:
      "Verified public repository on GitHub (github.com/AnandBinuArjun/RANSOMWATCH — Next.js 15, Prisma, Playwright).",
    relatedResearchSlugs: ["llm-assisted-cti-extraction-mitre-mapping"],
  },
  {
    id: "proj-codex-cyberstrike",
    slug: "codex-cyberstrike",
    name: "CODEX CYBERSTRIKE",
    shortDescription:
      "High-performance, AI-native security orchestration platform bridging deep-reasoning models and enterprise security tools (Nmap, Sqlmap, Nuclei) via Model Context Protocol (MCP).",
    category: "Security Orchestration",
    isProduct: true,
    featured: true,
    developmentStatus: "ACTIVE_DEVELOPMENT",
    statusLabel: "Verified Public Repository (TypeScript & MCP)",
    problemStatement:
      "Red teams and SOC analysts juggle disconnected security utilities (Nmap, Nuclei, Sqlmap). Connecting AI reasoning to security tools without strict Model Context Protocol (MCP) boundaries risks out-of-scope execution.",
    solutionOverview:
      "CODEX CYBERSTRIKE provides a high-performance TypeScript & MCP orchestration layer that wraps enterprise security tools inside policy-governed, auditable execution adapters for authorised Red Team and SOC workflows.",
    architectureDiagram: {
      nodes: [
        {
          id: "cc-1",
          label: "Operator & AI Reasoning Interface",
          layer: "Command Plane",
          detail: "Accepts scoped offensive/defensive verification objectives.",
        },
        {
          id: "cc-2",
          label: "Scope & RoE Policy Guardrail",
          layer: "Governance Layer",
          detail: "Enforces target allowlists and parameter sanitization prior to tool invocation.",
        },
        {
          id: "cc-3",
          label: "MCP Tool Adapters (Nmap / Nuclei)",
          layer: "Execution Layer",
          detail: "Model Context Protocol wrappers for Nmap, Nuclei, and validation utilities.",
        },
        {
          id: "cc-4",
          label: "Structured Evidence Ledger",
          layer: "Audit Layer",
          detail: "Normalizes multi-tool outputs into correlated technical findings.",
        },
      ],
      flows: [
        "1. Operator defines authorised target scope and assessment workflow",
        "2. Policy engine verifies target against signed Rules of Engagement allowlist",
        "3. MCP adapter invokes Nmap/Nuclei check inside isolated container",
        "4. Normalized findings are committed to the structured evidence ledger",
      ],
    },
    technologies: ["TypeScript", "React", "Python", "FastAPI", "Docker", "Linux"],
    implementedFeatures: [
      "Model Context Protocol (MCP) integration bridging AI reasoning with Nmap, Nuclei, and security tooling",
      "Strict scope-allowlist enforcement pattern prior to task dispatch",
      "Unified TypeScript orchestration console for Red Team and SOC operators",
    ],
    plannedFeatures: [
      "Visual purple-team attack-to-detection replay timeline",
      "Automated SARIF export for CI/CD pipeline ingestion",
    ],
    securityConsiderations: [
      "Hard-coded target allowlist validation prevents tool invocation against unauthorized domains or IP blocks.",
      "No raw shell string interpolation; all tool invocations use strict parameterized argument arrays.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/CODEX-CYEBRSTIKE",
    githubVerificationNote:
      "Verified public repository on GitHub (github.com/AnandBinuArjun/CODEX-CYEBRSTIKE — TypeScript MCP Orchestration).",
    relatedResearchSlugs: ["api-broken-object-level-authorization-patterns"],
  },
  {
    id: "proj-redrecon-x",
    slug: "redrecon-x",
    name: "REDRECON-X",
    shortDescription:
      "Modular automated web reconnaissance and attack-surface intelligence framework that unifies passive CT/Wayback enumeration and active DNS/HTTP/Nmap probing into a graph-based asset model.",
    category: "Offensive Reconnaissance",
    isProduct: false,
    featured: true,
    developmentStatus: "PRODUCTION_READY",
    statusLabel: "Verified Public Repository (CI + SAST + Docker)",
    problemStatement:
      "Offensive security engineers often chain disjointed recon scripts whose outputs are lost in flat text files, missing critical correlations between certificate transparency logs, historical Wayback endpoints, and live HTTP security headers.",
    solutionOverview:
      "REDRECON-X functions as a unified Python asset intelligence engine: it orchestrates passive enumeration (Certificate Transparency, Wayback, subdomain feeds) and active probing (DNS resolution, HTTP header auditing, port fingerprinting) into a correlated graph-based attack surface model.",
    architectureDiagram: {
      nodes: [
        {
          id: "rr-1",
          label: "Passive Recon Collectors",
          layer: "Passive Intelligence",
          detail: "Queries Certificate Transparency (CT), Wayback Machine archives, and passive DNS.",
        },
        {
          id: "rr-2",
          label: "Active DNS, HTTP & Nmap Probers",
          layer: "Active Verification",
          detail: "Performs scoped DNS resolution, HTTP defensive header audits, and port fingerprinting.",
        },
        {
          id: "rr-3",
          label: "Graph Asset Correlation Engine",
          layer: "Correlation Core",
          detail: "Merges subdomains, IPs, certificates, and endpoints into a unified surface graph.",
        },
        {
          id: "rr-4",
          label: "Attack-Surface Audit Report",
          layer: "Output Layer",
          detail: "Generates structured JSON and markdown exposure reports.",
        },
      ],
      flows: [
        "1. Passive collectors enumerate CT logs, Wayback URLs & subdomains",
        "2. Active probers resolve live DNS, fingerprint ports & audit HTTP headers",
        "3. Correlation engine links assets into a unified attack-surface graph",
        "4. Framework exports prioritized perimeter exposure findings",
      ],
    },
    technologies: ["Python", "Docker", "Linux", "GitHub Actions"],
    implementedFeatures: [
      "Modular passive reconnaissance (Certificate Transparency, Wayback Machine, subdomain enumeration)",
      "Active DNS resolution, HTTP defensive security header analysis, and port fingerprinting",
      "Graph-based asset correlation with automated GitHub Actions CI, SAST security workflow, and Docker image build",
    ],
    plannedFeatures: [
      "Continuous differential recon alerting on newly exposed subdomains or TLS certificates",
      "Direct export adapter for AegisFlow and CODEX CYBERSTRIKE",
    ],
    securityConsiderations: [
      "Designed strictly for authorised attack-surface management with configurable rate throttling and scope boundaries.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/REDRECON-X",
    githubVerificationNote:
      "Verified public repository on GitHub (github.com/AnandBinuArjun/REDRECON-X — Python 3.10+, Docker, CI/SAST pipelines).",
    relatedResearchSlugs: ["api-broken-object-level-authorization-patterns"],
  },
  {
    id: "proj-cti-analysis",
    slug: "threat-intelligence-cti-analysis",
    name: "Threat Intelligence CTI Analysis",
    shortDescription:
      "Automated Cyber Threat Intelligence pipeline (4★ on GitHub) that extracts IOCs, maps MITRE ATT&CK techniques, and builds knowledge graphs from unstructured CTI reports using NLP and LLMs.",
    category: "Threat Intelligence",
    isProduct: false,
    featured: true,
    developmentStatus: "PRODUCTION_READY",
    statusLabel: "Verified Public Repository (4★ Starred)",
    problemStatement:
      "Security analysts spend hours manually reading unstructured PDF advisories and threat blogs to extract IP addresses, file hashes, and adversary TTPs before they can update detection rules.",
    solutionOverview:
      "This pipeline ingests unstructured threat intelligence reports, applies deterministic regex/NLP extractors alongside structured LLM classification to identify Indicators of Compromise (IOCs) and MITRE ATT&CK techniques, and links entities into a queryable threat knowledge graph via a RESTful API.",
    architectureDiagram: {
      nodes: [
        {
          id: "cti-1",
          label: "Unstructured Report Ingestor",
          layer: "Ingestion",
          detail: "Parses raw threat advisories, markdown blogs, and security bulletins.",
        },
        {
          id: "cti-2",
          label: "Hybrid IOC & NLP Extractor",
          layer: "Extraction",
          detail: "Defangs and extracts hashes, domains, CVEs, and actor aliases.",
        },
        {
          id: "cti-3",
          label: "MITRE ATT&CK Classifier",
          layer: "Enrichment",
          detail: "Maps behavioral descriptions to verified ATT&CK tactics and technique IDs.",
        },
        {
          id: "cti-4",
          label: "Knowledge Graph & REST API",
          layer: "Storage & Query",
          detail: "Connects threat actors, campaigns, tools, and indicators.",
        },
      ],
      flows: [
        "1. Raw CTI text enters preprocessing and defanging stage",
        "2. Deterministic + NLP/LLM pipeline extracts IOCs and TTP context",
        "3. Techniques are validated against official MITRE ATT&CK IDs",
        "4. Entities and edges are exposed via the threat knowledge graph API",
      ],
    },
    technologies: ["Python", "FastAPI", "PostgreSQL", "Docker", "Linux"],
    implementedFeatures: [
      "Automated IOC extraction (IPv4/v6, SHA-256 hashes, domains, URLs, CVEs) from unstructured threat text",
      "NLP and LLM-assisted mapping of adversary behaviors to MITRE ATT&CK technique identifiers",
      "Knowledge-graph entity linking and cross-platform RESTful API for SIEM/SOAR integration",
    ],
    plannedFeatures: [
      "Automated Sigma and YARA rule draft generation from verified ATT&CK technique nodes",
      "Direct MISP and OpenCTI bi-directional connector sync",
    ],
    securityConsiderations: [
      "All extracted URLs and domains are automatically defanged before UI rendering to prevent accidental analyst click-through.",
      "MITRE technique IDs are verified against a strict local allowlist to eliminate LLM hallucinations.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/threat-intelligence-cti-analysis",
    githubVerificationNote:
      "Verified public repository on GitHub (github.com/AnandBinuArjun/threat-intelligence-cti-analysis — Python, 4 Stars).",
    relatedResearchSlugs: ["llm-assisted-cti-extraction-mitre-mapping"],
  },
  {
    id: "proj-total-entity",
    slug: "total-entity-exposure-monitor",
    name: "TOTAL ENTITY Exposure Monitor",
    shortDescription:
      "Identity Risk Intelligence System (IRIS) that builds a dynamic Identity Graph of digital footprints, uses k-Anonymity HIBP ingestion, and calculates credential blast radius and remediation ROI.",
    category: "Identity & Exposure",
    isProduct: false,
    featured: true,
    developmentStatus: "PRODUCTION_READY",
    statusLabel: "Verified Public Repository (Python & SCSS)",
    problemStatement:
      "Traditional breach checkers simply list leaked passwords without context. They fail to show the domino effect ('blast radius') of how one compromised recovery email or SSO chain compromises downstream banking or cloud accounts.",
    solutionOverview:
      "TOTAL ENTITY models identities, recovery authorities, and SSO chains as a directed Identity Graph. Using k-Anonymity privacy hashing, HIBP API integration, recency decay weighting (0.9^years), and deterministic risk math L × I × (1 - M), it pinpoints single points of failure and ranks remediation actions by Risk-Return ROI.",
    architectureDiagram: {
      nodes: [
        {
          id: "te-1",
          label: "k-Anonymity Privacy Layer & HIBP Ingestion",
          layer: "1. Privacy-First Intake",
          detail: "Hashes identity queries with k-Anonymity before querying breach intelligence feeds.",
        },
        {
          id: "te-2",
          label: "Identity Blast-Radius Graph",
          layer: "2. Graph Core",
          detail: "Maps recovery authority edges (Email -> Bank) and SSO dependency chains.",
        },
        {
          id: "te-3",
          label: "Deterministic Risk Math Core",
          layer: "3. Scoring Engine",
          detail: "Computes L × I × (1 - M) with recency decay (0.9^years) and data-class weights.",
        },
        {
          id: "te-4",
          label: "ROI Action Prioritizer & Cockpit",
          layer: "4. Omni-Channel UI",
          detail: "Ranks highest-impact credential and MFA fixes in the React Web Cockpit.",
        },
      ],
      flows: [
        "1. Query breach intelligence through k-Anonymity hashing layer",
        "2. Construct directed Identity Graph of recovery & SSO dependencies",
        "3. Compute blast radius and deterministic risk score L × I × (1 - M)",
        "4. Surface ROI-ranked remediation actions to break compromise chains",
      ],
    },
    technologies: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL"],
    implementedFeatures: [
      "k-Anonymity privacy layer and contextual breach analysis distinguishing data classes and recency decay",
      "Identity Blast-Radius graph mapping recovery authority chains and SSO dependencies",
      "Deterministic risk scoring engine (L × I × (1 - M)) and ROI-prioritized remediation cockpit",
    ],
    plannedFeatures: [
      "Automated enterprise directory sync for Microsoft Entra ID and Google Workspace",
      "One-click passkey migration readiness tracker",
    ],
    securityConsiderations: [
      "Enforces k-Anonymity hashing so raw credentials or full sensitive identifiers are never leaked during external breach lookups.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/TOTAL-ENTITY-Exposure-Monitor",
    githubVerificationNote:
      "Verified public repositories on GitHub (github.com/AnandBinuArjun/TOTAL-ENTITY-Exposure-Monitor & github.com/AnandBinuArjun/TOTAL-ENTITY).",
    relatedResearchSlugs: ["identity-graph-blast-radius-analysis"],
  },
  {
    id: "proj-ai-digital-safety",
    slug: "ai-powered-personal-digital-safety-assistant",
    name: "AI-Powered Personal Digital Safety Assistant",
    shortDescription:
      "Cross-platform cybersecurity solution (5★ on GitHub) protecting users across Android, web, and browser platforms via a unified Python AI backend for scam detection, phishing prevention, and breach monitoring.",
    category: "AI & Digital Safety",
    isProduct: true,
    featured: true,
    developmentStatus: "PRODUCTION_READY",
    statusLabel: "Verified Public Repository (5★ Starred)",
    problemStatement:
      "Everyday users and remote workers face sophisticated phishing lures, deceptive scam messages, and credential leaks across mobile, web, and browser surfaces where enterprise SOC tools are absent.",
    solutionOverview:
      "A comprehensive master's-level cybersecurity platform combining an Android client, web portal, and browser extension powered by a unified Python machine-learning backend for real-time scam detection, URL phishing inspection, and breach monitoring.",
    architectureDiagram: {
      nodes: [
        {
          id: "aids-1",
          label: "Android, Web & Browser Clients",
          layer: "Edge Surfaces",
          detail: "Cross-platform interfaces capturing suspicious URLs, SMS/messages, and safety checks.",
        },
        {
          id: "aids-2",
          label: "URL & Lexical Feature Extractor",
          layer: "Inspection Engine",
          detail: "Analyzes domain entropy, homoglyphs, TLS certificates, and redirect chains.",
        },
        {
          id: "aids-3",
          label: "ML Scam & Phishing Classifier",
          layer: "Unified AI Backend",
          detail: "Evaluates social-engineering urgency cues and credential-harvesting intent.",
        },
        {
          id: "aids-4",
          label: "Breach Monitor & Guidance Engine",
          layer: "Response Layer",
          detail: "Delivers plain-language risk verdicts and immediate protective checklists.",
        },
      ],
      flows: [
        "1. User or browser extension submits suspicious link or message",
        "2. Feature extractor checks lexical, domain & TLS indicators",
        "3. Unified Python ML backend classifies scam/phishing probability",
        "4. Client surfaces risk verdict and step-by-step defensive actions",
      ],
    },
    technologies: ["Python", "FastAPI", "React", "TypeScript", "Docker"],
    implementedFeatures: [
      "Unified Python AI backend serving Android, web, and browser protection surfaces (5 GitHub stars)",
      "Machine learning models for scam detection, phishing URL prevention, and credential breach checks",
      "Real-time defensive guidance tailored for non-technical and enterprise users",
    ],
    plannedFeatures: [
      "On-device quantized model execution for offline mobile scam detection",
      "Real-time DOM credential-form guard against lookalike login pages",
    ],
    securityConsiderations: [
      "URL inspection uses non-executing lexical and header analysis to prevent drive-by payload triggering.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/AI-Powered-Personal-Digital-Safety-Assistant",
    githubVerificationNote:
      "Verified public repository on GitHub (github.com/AnandBinuArjun/AI-Powered-Personal-Digital-Safety-Assistant — Python, 5 Stars).",
    relatedResearchSlugs: ["zero-trust-validation-patterns-nextjs-fastapi"],
  },
  {
    id: "proj-civicshield",
    slug: "civicshield",
    name: "CivicShield",
    shortDescription:
      "Privacy-first public cyber-safety and scam intelligence platform with on-device PII scrubbing, 7-language i18n (including RTL), localized emergency incident response protocols, and GDPR right-to-erasure controls.",
    category: "AI & Digital Safety",
    isProduct: true,
    featured: false,
    developmentStatus: "PRODUCTION_READY",
    statusLabel: "Verified Public Repository (TypeScript)",
    problemStatement:
      "Citizens targeted by financial fraud, SMS/WhatsApp scams, and identity theft often paste sensitive PII into untrusted online checkers and lack localized emergency bank-freeze and helpline runbooks during the critical golden hour.",
    solutionOverview:
      "CivicShield performs client-side PII scrubbing (redacting E.164 phones, credit cards, UK NIN, US SSN, Indian Aadhaar, Canadian SIN, and OTPs on-device before analysis), delivers transparent probability-based risk scoring without false 100% guarantees, provides localized incident response directories (US, UK, India, Canada, Australia, EU) across 7 languages, and includes a Senior 'Simple Mode' and full GDPR/CCPA data export/purge center.",
    architectureDiagram: {
      nodes: [
        {
          id: "cvs-1",
          label: "On-Device PII Scrubber",
          layer: "1. Client Privacy Guard",
          detail: "Redacts SSN, UK NIN, Aadhaar, credit cards, E.164 phones & OTPs before payload transmission.",
        },
        {
          id: "cvs-2",
          label: "Multi-Modal Scam Analyzer",
          layer: "2. Heuristic Engine",
          detail: "Evaluates SMS, WhatsApp, email, and URL indicators with transparent confidence tiers.",
        },
        {
          id: "cvs-3",
          label: "Localized IR & Bank Freeze Protocol",
          layer: "3. Golden-Hour Response",
          detail: "Country-aware emergency helplines (999, 911, 112, 1930) & bank freeze workflows.",
        },
        {
          id: "cvs-4",
          label: "GDPR Privacy Center & Senior Mode",
          layer: "4. Governance & Accessibility",
          detail: "Zero retention by default, 1-click JSON/CSV export, right-to-erasure, and 7-language i18n.",
        },
      ],
      flows: [
        "1. Client-side regex engine scrubs all national IDs, cards & OTPs on-device",
        "2. Analyzer computes explainable HIGH/MODERATE/LOW risk indicators",
        "3. Platform triggers localized country helpline & bank-freeze checklist",
        "4. Stateless volatile processing guarantees zero default PII retention",
      ],
    },
    technologies: ["TypeScript", "Next.js", "React", "Tailwind CSS", "PostgreSQL"],
    implementedFeatures: [
      "Client-side on-device PII redaction for UK NIN, US SSN, Indian Aadhaar, Canadian SIN, credit cards, and OTPs",
      "Localized Incident Response Protocol (/incident-response) with country-specific helplines and bank freeze directories",
      "7-language internationalization (English, Spanish, French, German, Portuguese, Hindi, Arabic RTL) and Senior Simple Mode",
      "GDPR/CCPA Privacy Center (/privacy-center) with stateless default processing, 1-click export, and right to erasure",
    ],
    plannedFeatures: [
      "Verified municipal CERT feed integration for regional scam spikes",
      "Voice-guided accessibility assistant for emergency bank-freeze steps",
    ],
    securityConsiderations: [
      "Zero retention by default: sensitive PII is scrubbed in the browser prior to API transmission.",
      "Community threat radar enforces defamation-safe verification labels.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/CivicShield",
    githubVerificationNote:
      "Verified public repository on GitHub (github.com/AnandBinuArjun/CivicShield — TypeScript).",
    relatedResearchSlugs: ["zero-trust-validation-patterns-nextjs-fastapi"],
  },
  {
    id: "proj-cortex-detector",
    slug: "cortex-fake-app-clone-detector",
    name: "CORTEX — Fake App & Malware Clone Detector",
    shortDescription:
      "Centralized, API-driven security platform that detects brand impersonation, trojanized fake apps, and malware clones across Android and Desktop using fuzzy logic and static analysis.",
    category: "Application Security",
    isProduct: false,
    featured: false,
    developmentStatus: "ACTIVE_DEVELOPMENT",
    statusLabel: "Verified Public Repository (Python, FastAPI & Kotlin)",
    problemStatement:
      "Threat actors routinely repackage legitimate banking, crypto, and enterprise Android/Desktop apps with trojan overlays or register typosquatted package identifiers to harvest user credentials.",
    solutionOverview:
      "CORTEX combines static APK/binary manifest inspection, certificate fingerprint verification, icon perceptual hashing, and fuzzy string matching across package names and permissions to detect fraudulent app clones through a centralized FastAPI and React console.",
    architectureDiagram: {
      nodes: [
        {
          id: "ctx-1",
          label: "Package & Manifest Ingestor",
          layer: "Intake",
          detail: "Extracts AndroidManifest.xml, signing certificates, permissions, and asset hashes.",
        },
        {
          id: "ctx-2",
          label: "Fuzzy Logic & Impersonation Engine",
          layer: "Static Analysis",
          detail: "Computes Levenshtein/Jaro-Winkler similarity against official brand package registries.",
        },
        {
          id: "ctx-3",
          label: "Permission & Signature Anomaly Scorer",
          layer: "Risk Scoring",
          detail: "Flags mismatched developer keys and high-risk permission requests (Accessibility/SMS).",
        },
        {
          id: "ctx-4",
          label: "FastAPI & React Triage Console",
          layer: "Presentation",
          detail: "Surfaces clone evidence for takedown and mobile defense teams.",
        },
      ],
      flows: [
        "1. Ingest candidate app metadata, certificate digest & permission list",
        "2. Run fuzzy similarity comparison against protected brand baselines",
        "3. Score certificate mismatch and dangerous permission escalations",
        "4. Output structured impersonation report via FastAPI & React UI",
      ],
    },
    technologies: ["Python", "FastAPI", "React", "TypeScript", "Docker"],
    implementedFeatures: [
      "Fuzzy logic brand-impersonation detection comparing package identifiers, app labels, and signing certificates",
      "Static analysis of suspicious permission combinations across Android (Kotlin) and Desktop targets",
      "Centralized FastAPI backend and React operator dashboard",
    ],
    plannedFeatures: [
      "Automated third-party APK mirror crawler and takedown notice generator",
      "DEX bytecode control-flow graph similarity clustering",
    ],
    securityConsiderations: [
      "Performs static manifest and binary header inspection inside non-executing worker containers.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/CORTEX-Fake-App-Clone-App-Detector-",
    githubVerificationNote:
      "Verified public repository on GitHub (github.com/AnandBinuArjun/CORTEX-Fake-App-Clone-App-Detector- — Python, FastAPI, Kotlin, React).",
    relatedResearchSlugs: ["contain-elf-droppers-sandbox-isolation"],
  },
  {
    id: "proj-jobguard-uk",
    slug: "jobguard-uk",
    name: "JOBGUARD-UK",
    shortDescription:
      "Automated cyber-intelligence system that hunts fake recruitment campaigns and crypto-mule fraud rings across job boards and Telegram using a fine-tuned BERT model and Neo4j network graph analysis.",
    category: "Threat Intelligence",
    isProduct: false,
    featured: false,
    developmentStatus: "ACTIVE_DEVELOPMENT",
    statusLabel: "Verified Public Repository (BERT + Neo4j)",
    problemStatement:
      "Organized financial-crime syndicates deploy coordinated fake job listings across recruitment portals and Telegram channels to recruit unwitting money mules and harvest applicant identity documents.",
    solutionOverview:
      "JOBGUARD-UK combines automated OSINT scraping, a fine-tuned BERT natural-language classifier, and Neo4j graph relationship mapping to cluster shared telephone numbers, Telegram handles, wallet addresses, and deceptive recruitment templates into actionable fraud-ring intelligence.",
    architectureDiagram: {
      nodes: [
        {
          id: "jg-1",
          label: "OSINT & Telegram Collectors",
          layer: "Collection",
          detail: "Ingests suspicious job listings and recruitment channel metadata.",
        },
        {
          id: "jg-2",
          label: "Fine-Tuned BERT Scam Classifier",
          layer: "NLP Intelligence",
          detail: "Detects advance-fee, task-scam, and crypto-mule linguistic patterns.",
        },
        {
          id: "jg-3",
          label: "Neo4j Fraud-Ring Graph DB",
          layer: "Graph Correlation",
          detail: "Links shared domains, contact handles, and payment rails across campaigns.",
        },
        {
          id: "jg-4",
          label: "Analyst Intelligence Dashboard",
          layer: "Visualization",
          detail: "Interactive investigation UI built with Python and Streamlit.",
        },
      ],
      flows: [
        "1. Collect candidate recruitment posts and contact indicators",
        "2. Score text via fine-tuned BERT financial-crime NLP model",
        "3. Correlate shared entities in Neo4j graph database to expose syndicates",
        "4. Export actionable disruption intelligence for fraud analysts",
      ],
    },
    technologies: ["Python", "Docker", "Linux"],
    implementedFeatures: [
      "Fine-tuned BERT NLP classification model for identifying fraudulent job listings and crypto-mule lures",
      "Neo4j graph database correlation linking organized fraud rings across recruitment sites and Telegram",
      "Interactive analyst visualization interface for OSINT investigation",
    ],
    plannedFeatures: [
      "Automated domain registrar abuse-contact reporting formatter",
      "Integration with CivicShield community threat radar",
    ],
    securityConsiderations: [
      "Scrapers operate over isolated proxy sessions and sanitize all ingested HTML/script content.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/jobguard-uk",
    githubVerificationNote:
      "Verified public repository on GitHub (github.com/AnandBinuArjun/jobguard-uk — Python, BERT, Neo4j).",
    relatedResearchSlugs: ["llm-assisted-cti-extraction-mitre-mapping"],
  },
  {
    id: "proj-local-llm-threat-hunting",
    slug: "llm-driven-threat-hunting-assistant",
    name: "Local LLM-Driven Threat-Hunting Assistant (thhunt)",
    shortDescription:
      "Privacy-first, cross-platform endpoint threat-hunting agent (Windows, Linux, macOS) that runs local LLM reasoning directly on-machine without sending sensitive telemetry to external cloud APIs.",
    category: "Forensics & DFIR",
    isProduct: false,
    featured: false,
    developmentStatus: "ACTIVE_DEVELOPMENT",
    statusLabel: "Verified Public Repository (2★ Starred)",
    problemStatement:
      "Sending raw endpoint process trees, command-line arguments, and system logs to third-party cloud LLM APIs violates strict data-sovereignty, privacy, and incident-response confidentiality requirements.",
    solutionOverview:
      "The Local LLM-Driven Threat-Hunting Assistant (`thhunt`) brings AI-assisted endpoint investigation directly to the host across Windows, Linux, and macOS. It inspects local process, network, and log artifacts and uses local model inference to assist threat hunters with zero cloud data egress.",
    architectureDiagram: {
      nodes: [
        {
          id: "th-1",
          label: "Cross-Platform Host Collectors",
          layer: "Endpoint Telemetry",
          detail: "Gathers process, socket, persistence, and event artifacts on Windows, Linux & macOS.",
        },
        {
          id: "th-2",
          label: "Heuristic Pre-Filter & Normalizer",
          layer: "Triage Layer",
          detail: "Reduces noise and structures suspicious host events into compact context frames.",
        },
        {
          id: "th-3",
          label: "On-Device Local LLM Engine",
          layer: "Zero-Egress AI",
          detail: "Performs local threat-hunting reasoning and hypothesis generation offline.",
        },
        {
          id: "th-4",
          label: "Interactive CLI & Hunt Report",
          layer: "Analyst Interface",
          detail: "Outputs MITRE-aligned investigation leads directly to the operator terminal.",
        },
      ],
      flows: [
        "1. Collect host process, network & persistence telemetry locally",
        "2. Normalize anomalies through deterministic heuristic pre-filters",
        "3. Query local on-machine LLM with zero external network transmission",
        "4. Present threat-hunting hypotheses and verification commands",
      ],
    },
    technologies: ["Python", "Linux", "Docker"],
    implementedFeatures: [
      "Cross-platform endpoint telemetry collection supporting Windows, Linux, and macOS",
      "100% local LLM inference architecture preserving endpoint privacy and air-gapped sovereignty",
      "Interactive threat-hunting CLI (`thhunt`) for rapid host anomaly triage",
    ],
    plannedFeatures: [
      "Direct integration with Local AI SIEM Sigma rule hits",
      "Signed offline threat-intel IOC bundle updates",
    ],
    securityConsiderations: [
      "Zero external telemetry egress: all logs and model prompts remain strictly on the local host.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/LLM-Driven-Threat-Hunting-Assistant-for-Machine",
    githubVerificationNote:
      "Verified public repository on GitHub (github.com/AnandBinuArjun/LLM-Driven-Threat-Hunting-Assistant-for-Machine — Python, 2 Stars).",
    relatedResearchSlugs: ["automated-memory-forensics-volatility3-triage"],
  },
  {
    id: "proj-local-ai-siem",
    slug: "local-ai-siem",
    name: "Local AI SIEM & Autonomous SOC Assistant",
    shortDescription:
      "Fully local, privacy-first Security Information and Event Management (SIEM) system combining OS/application/network log normalization, Sigma-style detection rules, and local LLM incident summarization.",
    category: "Security Orchestration",
    isProduct: false,
    featured: false,
    developmentStatus: "ACTIVE_DEVELOPMENT",
    statusLabel: "Verified Public Repository (Python)",
    problemStatement:
      "Small security teams, labs, and privacy-sensitive environments need Splunk-like log correlation, Sigma rule detection, and AI incident summarization without expensive cloud ingestion fees or third-party data exposure.",
    solutionOverview:
      "Local AI SIEM ingests OS, application, and network logs into a normalized relational store, evaluates events against Sigma-style detection rules, and uses a local Large Language Model to summarize incident timelines and answer analyst investigation queries completely offline.",
    architectureDiagram: {
      nodes: [
        {
          id: "siem-1",
          label: "OS, App & Network Collectors",
          layer: "Log Ingestion",
          detail: "Ingests structured and unstructured host/network telemetry streams.",
        },
        {
          id: "siem-2",
          label: "Event Normalizer & SQL Store",
          layer: "Storage Engine",
          detail: "Parses raw logs into canonical event objects in SQLite/PostgreSQL.",
        },
        {
          id: "siem-3",
          label: "Sigma-Style Rule Detector",
          layer: "Detection Layer",
          detail: "Matches event streams against deterministic detection signatures.",
        },
        {
          id: "siem-4",
          label: "Local LLM SOC Assistant",
          layer: "Investigation UI",
          detail: "Summarizes correlated alerts and answers natural-language hunt queries offline.",
        },
      ],
      flows: [
        "1. Collectors ingest and normalize OS, application & network logs",
        "2. Router persists structured events into local SQL storage",
        "3. Sigma-style detection engine evaluates events and raises alerts",
        "4. Local LLM summarizes incident root cause with zero cloud egress",
      ],
    },
    technologies: ["Python", "PostgreSQL", "Linux", "Docker"],
    implementedFeatures: [
      "Modular log ingestion and normalization pipeline for OS, application, and network logs",
      "Sigma-style rule detection engine for deterministic threat identification",
      "Offline local LLM incident summarization and Q&A investigation assistant",
    ],
    plannedFeatures: [
      "Syslog and Windows Event Forwarding (WEF) high-throughput listener",
      "Automated playbook handoff to CODEX CYBERSTRIKE",
    ],
    securityConsiderations: [
      "Runs entirely on local workstation/server infrastructure without transmitting logs to external AI vendors.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/local-ai-siem",
    githubVerificationNote:
      "Verified public repository on GitHub (github.com/AnandBinuArjun/local-ai-siem — Python).",
    relatedResearchSlugs: ["llm-assisted-cti-extraction-mitre-mapping"],
  },
  {
    id: "proj-geoguardian-ai",
    slug: "geoguardian-ai",
    name: "GeoGuardian AI",
    shortDescription:
      "Cybersecurity intelligence platform featuring live geolocation session monitoring, impossible-travel anomaly detection, and adaptive threat scoring using reinforcement learning.",
    category: "Threat Intelligence",
    isProduct: false,
    featured: false,
    developmentStatus: "ACTIVE_DEVELOPMENT",
    statusLabel: "Verified Public Repository (Python)",
    problemStatement:
      "Static geo-blocking rules fail to catch sophisticated credential replay and session hijacking while generating high false positives for legitimate traveling workforce users.",
    solutionOverview:
      "GeoGuardian AI transforms authentication and session logs into predictive threat intelligence by combining geolocation velocity analysis, ASN/proxy behavioral pattern recognition, and adaptive reinforcement learning.",
    architectureDiagram: {
      nodes: [
        {
          id: "gg-1",
          label: "Session & Auth Log Stream",
          layer: "Ingestion",
          detail: "Ingests login timestamps, IP addresses, ASN metadata, and device fingerprints.",
        },
        {
          id: "gg-2",
          label: "Geolocation Velocity Analyzer",
          layer: "Spatial Core",
          detail: "Calculates physical travel velocity and impossible-travel anomalies.",
        },
        {
          id: "gg-3",
          label: "Adaptive RL Threat Scorer",
          layer: "ML Engine",
          detail: "Refines anomaly thresholds based on analyst feedback and behavioral baselines.",
        },
        {
          id: "gg-4",
          label: "Live Geolocation Intelligence UI",
          layer: "Monitoring Console",
          detail: "Visualizes active session anomalies and ethical data-governance logs.",
        },
      ],
      flows: [
        "1. Ingest authentication events and resolve GeoIP / ASN telemetry",
        "2. Compute travel velocity & compare against user behavioral baseline",
        "3. Score session risk via adaptive reinforcement-learning model",
        "4. Alert SOC on high-confidence impossible-travel or token replay",
      ],
    },
    technologies: ["Python", "FastAPI", "React", "Docker"],
    implementedFeatures: [
      "Live geolocation monitoring and impossible-travel session anomaly detection",
      "Adaptive reinforcement-learning threat scoring reducing static rule false positives",
      "Ethical data-governance controls for privacy-conscious location telemetry handling",
    ],
    plannedFeatures: [
      "Webhook integration for Microsoft Entra ID and Okta continuous access evaluation",
      "Automated VPN/Tor exit-node reputation enrichment",
    ],
    securityConsiderations: [
      "Incorporates ethical data-governance boundaries so geolocation telemetry is used strictly for security anomaly detection.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/GeoGuardian-AI-",
    githubVerificationNote:
      "Verified public repository on GitHub (github.com/AnandBinuArjun/GeoGuardian-AI- — Python).",
    relatedResearchSlugs: ["identity-graph-blast-radius-analysis"],
  },
  {
    id: "proj-vmp",
    slug: "vulnerability-management-platform",
    name: "Vulnerability Management Platform",
    shortDescription:
      "Multi-tenant security intelligence platform designed to centralize asset tracking, CVE risk prioritization, deduplication, and remediation lifecycle workflows.",
    category: "Vulnerability Management",
    isProduct: false,
    featured: false,
    developmentStatus: "ACTIVE_DEVELOPMENT",
    statusLabel: "Verified Public Repository",
    problemStatement:
      "Engineering teams are overwhelmed by duplicate findings across SAST, DAST, container scanners, and manual penetration tests, leading to alert fatigue and missed critical exposures.",
    solutionOverview:
      "Consolidates disparate scanner outputs and manual findings into a unified multi-tenant schema, deduplicates by asset and CWE/CVE fingerprint, and prioritizes remediation based on asset criticality and exploit reachability.",
    architectureDiagram: {
      nodes: [
        {
          id: "vmp-1",
          label: "Multi-Scanner Parsers",
          layer: "Intake",
          detail: "Ingests SARIF, JSON, and manual pentest finding payloads.",
        },
        {
          id: "vmp-2",
          label: "Fingerprint & Deduplication Engine",
          layer: "Processing",
          detail: "Correlates duplicate findings across commits and endpoints.",
        },
        {
          id: "vmp-3",
          label: "Contextual Risk Scorer",
          layer: "Prioritization",
          detail: "Combines base severity with internet exposure and asset tier.",
        },
        {
          id: "vmp-4",
          label: "Remediation Lifecycle Tracker",
          layer: "Workflow",
          detail: "Tracks state from Triage to In-Progress, Retest, and Verified Closed.",
        },
      ],
      flows: [
        "1. Ingest SARIF/JSON reports from CI pipelines and manual reviews",
        "2. Compute deterministic finding fingerprint & merge duplicates",
        "3. Weight severity by asset exposure tier",
        "4. Track engineering remediation through verification retest",
      ],
    },
    technologies: ["TypeScript", "React", "PostgreSQL", "Python", "Docker"],
    implementedFeatures: [
      "Multi-tenant vulnerability data model supporting automated scanner and manual assessment findings",
      "Deduplication and status lifecycle workflow (Open, Triaged, Remediated, Verified)",
      "Contextual prioritization matrix combining technical severity and asset criticality",
    ],
    plannedFeatures: [
      "Bi-directional GitHub Issues and Jira ticket synchronization",
      "EPSS (Exploit Prediction Scoring System) daily feed enrichment",
    ],
    securityConsiderations: [
      "Role-based access controls separate finding submission from risk-acceptance approval.",
      "Proof-of-concept payloads stored in findings are strictly escaped and rendered inertly.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/Vulnerability-Management-Platform",
    githubVerificationNote:
      "Verified public repository on GitHub (github.com/AnandBinuArjun/Vulnerability-Management-Platform).",
    relatedResearchSlugs: ["api-broken-object-level-authorization-patterns"],
  },
  {
    id: "proj-forensic-automation",
    slug: "ml-data-driven-forensic-automation",
    name: "ML & Data-Driven Forensic Automation",
    shortDescription:
      "Digital Forensics and Incident Response (DFIR) toolkit combining Volatility 3 memory forensics, network traffic analysis, ML anomaly detection, and CASE-standard evidence handling.",
    category: "Forensics & DFIR",
    isProduct: false,
    featured: false,
    developmentStatus: "ACTIVE_DEVELOPMENT",
    statusLabel: "Verified Public Repository (Volatility 3 & CASE)",
    problemStatement:
      "Manual memory forensics and packet timeline reconstruction during an active incident is time-intensive, requiring analysts to sift through thousands of benign OS processes and flows to spot injected code.",
    solutionOverview:
      "Automates Volatility 3 memory artifact extraction and network traffic analysis while enforcing Cyber-investigation Analysis Standard Expression (CASE) ontology compliance for chain-of-custody evidence integrity.",
    architectureDiagram: {
      nodes: [
        {
          id: "dfa-1",
          label: "CASE-Compliant Evidence Intake",
          layer: "Evidence Preservation",
          detail: "Verifies SHA-256 chain-of-custody hashes and structures CASE forensic metadata.",
        },
        {
          id: "dfa-2",
          label: "Volatility 3 & Network Extractors",
          layer: "Extraction",
          detail: "Executes pslist, pstree, netscan, malfind, and PCAP flow feature extractors.",
        },
        {
          id: "dfa-3",
          label: "ML Behavioral Anomaly Scorer",
          layer: "ML / Heuristics",
          detail: "Flags unusual parent-child processes, RWX memory pages, and C2 flow patterns.",
        },
        {
          id: "dfa-4",
          label: "Analyst Triage Timeline",
          layer: "Triage Output",
          detail: "Presents ranked high-suspicion artifacts with MITRE ATT&CK links.",
        },
      ],
      flows: [
        "1. Verify cryptographic hash of acquired memory image & PCAP",
        "2. Run automated Volatility 3 and network feature extraction batch",
        "3. Score process lineage, RWX pages & network flows for anomalies",
        "4. Export CASE-compliant forensic triage timeline for IR analyst",
      ],
    },
    technologies: ["Python", "Linux", "Docker", "PostgreSQL"],
    implementedFeatures: [
      "Automated orchestration wrapper around Volatility 3 memory forensics plugins",
      "Network traffic analysis and ML-assisted anomaly triage",
      "Cyber-investigation Analysis Standard Expression (CASE) compliant evidence handling",
    ],
    plannedFeatures: [
      "Automated YARA rule synthesis from suspicious extracted memory segments",
      "Cloud instance EBS/disk snapshot automated mounting and triage worker",
    ],
    securityConsiderations: [
      "Forensic workers process untrusted memory images and PCAPs inside non-networked, read-only sandbox containers.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/ML---Data-Driven-Forensic-Automation",
    githubVerificationNote:
      "Verified public repository on GitHub (github.com/AnandBinuArjun/ML---Data-Driven-Forensic-Automation — Python).",
    relatedResearchSlugs: ["automated-memory-forensics-volatility3-triage"],
  },
  {
    id: "proj-smart-home-iot",
    slug: "smart-home-iot-anomaly-detection-engine",
    name: "Smart Home IoT Anomaly Detection Engine",
    shortDescription:
      "Open-source Intrusion Detection System (IDS) engineered to secure smart-home and connected IoT environments against botnet induction, lateral scanning, and anomalous C2 traffic.",
    category: "IoT & Honeypot Defense",
    isProduct: false,
    featured: false,
    developmentStatus: "ACTIVE_DEVELOPMENT",
    statusLabel: "Verified Public Repository (2★ Starred)",
    problemStatement:
      "Consumer and commercial smart-home IoT devices cannot run traditional endpoint protection agents, making network-level intrusion and behavioral anomaly detection essential for spotting compromised endpoints.",
    solutionOverview:
      "An open-source Python Intrusion Detection System (IDS) that profiles per-device network flow periodicity, DNS query distributions, and protocol behavior to flag anomalous outbound beacons, port scanning, or DDoS participation.",
    architectureDiagram: {
      nodes: [
        {
          id: "sh-1",
          label: "Flow & Packet Telemetry Tap",
          layer: "Network Tap",
          detail: "Captures flow duration, byte distribution, destination ports, and DNS queries.",
        },
        {
          id: "sh-2",
          label: "Device Behavioral Profiler",
          layer: "Baseline Engine",
          detail: "Learns expected communication cadence per smart-home IoT device class.",
        },
        {
          id: "sh-3",
          label: "IDS Anomaly & Drift Detector",
          layer: "Detection Layer",
          detail: "Detects sudden destination changes, DGA queries, or lateral Telnet/SSH scan bursts.",
        },
        {
          id: "sh-4",
          label: "Alert & Quarantine Webhook",
          layer: "Response",
          detail: "Emits VLAN isolation recommendations for high-confidence compromises.",
        },
      ],
      flows: [
        "1. Collect passive flow and DNS metadata from IoT network segment",
        "2. Compare flow features against device behavioral baseline",
        "3. Flag anomalous C2 beaconing or lateral telnet/SSH scanning",
        "4. Emit IDS alert with network isolation recommendation",
      ],
    },
    technologies: ["Python", "Linux", "Docker", "FastAPI"],
    implementedFeatures: [
      "Open-source Intrusion Detection System (IDS) tailored for smart-home IoT network traffic",
      "Behavioral baseline comparison for detecting anomalous outbound connections and scan bursts",
      "Complementary telemetry alignment with SENTINEL-IoT honeypot indicators",
    ],
    plannedFeatures: [
      "Automated home/enterprise router firewall rule webhook integration",
      "Encrypted TLS JA3/JA4 fingerprint drift profiling",
    ],
    securityConsiderations: [
      "Inspects packet headers and flow statistics only rather than decrypting private household payload streams.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/Smart-Home-IoT-Anomaly-Detection-Engine",
    githubVerificationNote:
      "Verified public repository on GitHub (github.com/AnandBinuArjun/Smart-Home-IoT-Anomaly-Detection-Engine — Python, 2 Stars).",
    relatedResearchSlugs: ["iot-botnet-telemetry-mirai-gafgyt-analysis"],
  },
  {
    id: "proj-sme-cyber-risk",
    slug: "sme-cyber-risk-dashboard",
    name: "SME Cyber Risk Dashboard",
    shortDescription:
      "Web-based security posture assessment, risk scoring, and prioritized remediation platform engineered specifically for Small and Medium-Sized Enterprises (SMEs).",
    category: "Vulnerability Management",
    isProduct: false,
    featured: false,
    developmentStatus: "ACTIVE_DEVELOPMENT",
    statusLabel: "Verified Public Repository (TypeScript)",
    problemStatement:
      "Small and medium-sized businesses face enterprise-grade ransomware and phishing threats but often lack full-time CISOs or budget for complex six-figure GRC suites.",
    solutionOverview:
      "Provides SMEs with a clear, TypeScript-powered security posture assessment console that evaluates identity hygiene, backup readiness, patching cadence, and perimeter exposure, producing an actionable, plain-language remediation roadmap.",
    architectureDiagram: {
      nodes: [
        {
          id: "sme-1",
          label: "Posture & Control Assessment Intake",
          layer: "Assessment Layer",
          detail: "Evaluates MFA, backup immutability, endpoint patching, and email auth (SPF/DMARC).",
        },
        {
          id: "sme-2",
          label: "SME Contextual Risk Calculator",
          layer: "Scoring Engine",
          detail: "Weights control gaps by exploit likelihood and business disruption impact.",
        },
        {
          id: "sme-3",
          label: "Prioritized Quick-Win Generator",
          layer: "Remediation Engine",
          detail: "Maps gaps to low-cost, high-impact technical hardening steps.",
        },
        {
          id: "sme-4",
          label: "Executive & IT Posture Dashboard",
          layer: "Interface",
          detail: "Tracks posture score progression over time.",
        },
      ],
      flows: [
        "1. Ingest technical control checklist and domain perimeter checks",
        "2. Compute domain-by-domain cyber risk score",
        "3. Rank remediation tasks by cost-to-risk-reduction ratio",
        "4. Track posture improvement across quarterly reviews",
      ],
    },
    technologies: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    implementedFeatures: [
      "Web-based SME security posture assessment and domain risk scoring dashboard",
      "Prioritized remediation workflow translating technical controls into actionable engineering steps",
      "Clean TypeScript and React executive reporting interface",
    ],
    plannedFeatures: [
      "Automated external DNS (SPF/DKIM/DMARC) and TLS grade live scanner integration",
      "Exportable UK Cyber Essentials readiness pre-check worksheet",
    ],
    securityConsiderations: [
      "Role-scoped assessment storage ensuring tenant posture answers remain isolated.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/SME-Cyber-Risk-Dashboard",
    githubVerificationNote:
      "Verified public repository on GitHub (github.com/AnandBinuArjun/SME-Cyber-Risk-Dashboard — TypeScript).",
    relatedResearchSlugs: ["zero-trust-validation-patterns-nextjs-fastapi"],
  },
  {
    id: "proj-ai-cyber-threat-advisor",
    slug: "ai-cyber-threat-advisor",
    name: "Codex AI Cyber Threat Advisor",
    shortDescription:
      "Hybrid intelligence Security Operations Center (SOC) platform merging machine-learning anomaly detection with Large Language Model (LLM) reasoning to deliver real-time, human-readable threat explanations.",
    category: "Security Orchestration",
    isProduct: false,
    featured: false,
    developmentStatus: "ACTIVE_DEVELOPMENT",
    statusLabel: "Verified Public Repository (Python)",
    problemStatement:
      "Traditional ML intrusion detection models output opaque anomaly scores without context, leaving Tier-1 SOC analysts unable to quickly determine why an alert fired or how to contain it.",
    solutionOverview:
      "Codex AI Cyber Threat Advisor pairs statistical and ML anomaly detection with structured LLM reasoning to translate high-dimensional security telemetry into clear root-cause explanations and analyst playbooks in real time.",
    architectureDiagram: {
      nodes: [
        {
          id: "cta-1",
          label: "Telemetry & Alert Stream",
          layer: "Ingestion",
          detail: "Collects network and host anomaly feature vectors.",
        },
        {
          id: "cta-2",
          label: "ML Anomaly Detection Core",
          layer: "Detection Layer",
          detail: "Classifies malicious traffic patterns and behavioral outliers.",
        },
        {
          id: "cta-3",
          label: "LLM Reasoning & Explanation Engine",
          layer: "Explainable AI",
          detail: "Synthesizes human-readable root cause and MITRE TTP context.",
        },
        {
          id: "cta-4",
          label: "Real-Time SOC Advisory UI",
          layer: "Operator Console",
          detail: "Displays actionable containment guidance and confidence metrics.",
        },
      ],
      flows: [
        "1. Ingest network and endpoint telemetry features",
        "2. Execute ML classifier to detect statistical threat anomalies",
        "3. Pass structured feature attribution to LLM reasoning engine",
        "4. Render human-readable SOC explanation and response steps",
      ],
    },
    technologies: ["Python", "FastAPI", "Docker", "Linux"],
    implementedFeatures: [
      "Hybrid ML detection pipeline paired with LLM natural-language threat explanation",
      "Real-time SOC advisory workflow translating anomaly vectors into analyst guidance",
      "Modular Python backend architecture for SOC integration",
    ],
    plannedFeatures: [
      "SHAP/LIME feature-attribution visual overlays inside the SOC console",
      "Automated containment ticket dispatch to SOAR System",
    ],
    securityConsiderations: [
      "Sanitizes raw payload strings prior to LLM reasoning to prevent prompt injection via crafted log entries.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/AI-Cyber-Threat-Advisor",
    githubVerificationNote:
      "Verified public repository on GitHub (github.com/AnandBinuArjun/AI-Cyber-Threat-Advisor — Python).",
    relatedResearchSlugs: ["llm-assisted-cti-extraction-mitre-mapping"],
  },
  {
    id: "proj-soar-system",
    slug: "soar-system",
    name: "AI-Assisted SOAR & Incident Management System",
    shortDescription:
      "Security Orchestration, Automation, and Response (SOAR) platform built with Node.js providing automated threat response, incident lifecycle management, web dashboard, and ChatOps integration.",
    category: "Security Orchestration",
    isProduct: false,
    featured: false,
    developmentStatus: "ACTIVE_DEVELOPMENT",
    statusLabel: "Verified Public Repository (2★ Starred)",
    problemStatement:
      "Distributed security teams often coordinate incident response across fragmented chat threads and manual spreadsheets, delaying containment and losing audit trail continuity.",
    solutionOverview:
      "Provides a centralized Node.js SOAR engine that ingests threat alerts, triggers automated response playbooks, synchronizes incident state across a web dashboard, and delivers real-time ChatOps notifications and command workflows via Discord bot integration.",
    architectureDiagram: {
      nodes: [
        {
          id: "soar-1",
          label: "Alert Webhook & Event Receiver",
          layer: "Intake",
          detail: "Receives security alerts from SIEM, IDS, and endpoint monitors.",
        },
        {
          id: "soar-2",
          label: "Playbook Automation Engine",
          layer: "Orchestration",
          detail: "Executes enrichment, IP quarantine, and notification runbooks.",
        },
        {
          id: "soar-3",
          label: "ChatOps & Discord IR Bot",
          layer: "Collaboration",
          detail: "Provides real-time alert triage and authorized command hooks.",
        },
        {
          id: "soar-4",
          label: "SOAR Web Incident Console",
          layer: "Management UI",
          detail: "Tracks incident severity, assignee, SLA, and closure audit logs.",
        },
      ],
      flows: [
        "1. Ingest incoming threat alert via authenticated webhook",
        "2. Trigger automated SOAR enrichment and triage playbook",
        "3. Notify on-call responders via ChatOps bot & web dashboard",
        "4. Record containment actions and incident closure timeline",
      ],
    },
    technologies: ["TypeScript", "React", "Docker", "Linux"],
    implementedFeatures: [
      "Automated threat detection intake and SOAR response playbook execution (2 GitHub stars)",
      "Bi-directional ChatOps Discord bot integration for real-time incident command and alerting",
      "Web-based incident management dashboard tracking lifecycle and response status",
    ],
    plannedFeatures: [
      "Role-gated multi-approver ChatOps slash commands for firewall blocks",
      "Direct webhook bridge with Local AI SIEM",
    ],
    securityConsiderations: [
      "ChatOps commands verify operator role permissions and guild membership before executing incident state transitions.",
    ],
    githubUrl: "https://github.com/AnandBinuArjun/soar-system",
    githubVerificationNote:
      "Verified public repository on GitHub (github.com/AnandBinuArjun/soar-system — JavaScript/Node.js, 2 Stars).",
    relatedResearchSlugs: ["zero-trust-validation-patterns-nextjs-fastapi"],
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return PROJECTS_DATA.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): ProjectItem[] {
  return PROJECTS_DATA.filter((project) => project.featured);
}

export function getProductProjects(): ProjectItem[] {
  return PROJECTS_DATA.filter((project) => project.isProduct);
}
