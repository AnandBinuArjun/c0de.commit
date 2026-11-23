import type { ServiceItem } from "@/types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    slug: "penetration-testing",
    title: "Penetration Testing",
    shortTitle: "Penetration Testing",
    tagline: "Authorised offensive security assessments across web applications, APIs, and infrastructure.",
    shortDescription:
      "Manual-first, goal-oriented offensive testing that uncovers chained business-logic flaws, authentication weaknesses, and network privilege escalation paths.",
    iconName: "Crosshair",
    capabilityGroup: "OFFENSIVE SECURITY",
    legalNotice:
      "All penetration testing engagements are strictly conducted under explicit written Rules of Engagement (RoE) and signed client authorisation. No testing is performed against unverified or third-party assets without documented permission.",
    problemStatement:
      "Automated vulnerability scanners identify surface-level misconfigurations, but real adversaries chain subtle business-logic flaws, broken object-level authorisation (BOLA), and credential exposure across multiple system layers. Organisations need realistic, manual testing to verify how their controls hold up under structured offensive scrutiny.",
    whatWeAssessOrDeliver: [
      {
        title: "Web Application & SaaS Control Planes",
        description:
          "Deep evaluation of authentication flows, multi-tenant isolation, RBAC enforcement, session lifecycle, and state-changing business workflows.",
      },
      {
        title: "REST, GraphQL & gRPC APIs",
        description:
          "Testing against OWASP API Security Top 10 vectors including object-level authorization bypass, mass assignment, and rate-limit exhaustion.",
      },
      {
        title: "External & Internal Network Perimeter",
        description:
          "Assessment of exposed services, segmentation boundaries, lateral movement pathways, and credential hygiene.",
      },
      {
        title: "Exploit Chain Verification",
        description:
          "Safe, controlled proof-of-concept validation showing real technical impact rather than unverified theoretical scanner output.",
      },
    ],
    methodology: [
      {
        phase: "01",
        title: "Scope Definition & Rules of Engagement",
        description:
          "Establish target boundaries, testing windows, emergency contacts, and explicit legal authorisation.",
      },
      {
        phase: "02",
        title: "Reconnaissance & Threat Modelling",
        description:
          "Map application entry points, trust boundaries, API schemas, and privilege levels.",
      },
      {
        phase: "03",
        title: "Manual Offensive Assessment",
        description:
          "Execute structured manual testing aligned with OWASP WSTG, OWASP API Top 10, and PTES guidelines.",
      },
      {
        phase: "04",
        title: "Remediation Guidance & Retesting",
        description:
          "Deliver actionable engineering fixes with code-level context and perform verification retesting after patches are deployed.",
      },
    ],
    engagementWorkflow: [
      "Pre-engagement scoping call & Rules of Engagement (RoE) sign-off",
      "Environment readiness check & communication channel setup",
      "Active manual assessment with immediate notification for critical findings",
      "Technical findings report delivery & engineering walkthrough",
      "Post-remediation verification retest & updated closure statement",
    ],
    deliverables: [
      "Executive Summary detailing business risk posture",
      "Technical Findings Report with CVSS / contextual severity ratings",
      "Step-by-step reproducible Proof of Concept (PoC) evidence",
      "Framework-specific remediation recommendations",
      "Post-fix verification retest memorandum",
    ],
    toolsAndTechnologies: [
      "Burp Suite Pro",
      "OWASP ZAP",
      "Nuclei",
      "Nmap",
      "Custom Python Validation Scripts",
      "Postman / GraphQL Voyagers",
      "Wireshark",
    ],
    relatedProjectSlugs: ["codex-cyberstrike", "sentinel-iot", "vulnerability-management-platform"],
    relatedResearchSlugs: [
      "api-broken-object-level-authorization-patterns",
      "iot-botnet-telemetry-mirai-gafgyt-analysis",
    ],
    faqs: [
      {
        question: "How do you distinguish authorised penetration testing from unauthorised activity?",
        answer:
          "Every engagement requires a signed Statement of Work and explicit Rules of Engagement (RoE) verifying asset ownership, allowed IP ranges, testing windows, and third-party hosting constraints before a single packet is sent.",
      },
      {
        question: "Can a penetration test guarantee our system is 100% secure or attack-proof?",
        answer:
          "No ethical security provider can guarantee a system is completely attack-proof. A penetration test provides a rigorous point-in-time evaluation of defined targets and significantly reduces risk when paired with continuous secure engineering.",
      },
      {
        question: "Do you include remediation verification?",
        answer:
          "Yes. After your engineering team implements fixes, we perform targeted verification testing to confirm that vulnerabilities are properly resolved without introducing regressions.",
      },
    ],
  },
  {
    slug: "application-security",
    title: "Application Security Engineering",
    shortTitle: "Application Security",
    tagline: "Embed security directly into web applications, APIs, and SDLC pipelines.",
    shortDescription:
      "Architecture threat modelling, secure code review, authentication hardening, and automated CI/CD security gates for modern software teams.",
    iconName: "ShieldCheck",
    capabilityGroup: "OFFENSIVE SECURITY",
    problemStatement:
      "Fast-moving engineering teams deploy code daily, while periodic annual reviews leave long windows of exposure. Without architecture-level threat modelling and automated security guardrails in CI/CD, vulnerabilities recurringly reach production.",
    whatWeAssessOrDeliver: [
      {
        title: "Secure Code & Dependency Review",
        description:
          "Manual and tool-assisted analysis of TypeScript, Python, React, Next.js, and FastAPI codebases for injection, deserialization, and cryptographic misuse.",
      },
      {
        title: "Authentication, Session & Identity Architecture",
        description:
          "Hardening OAuth2/OIDC flows, JWT handling, MFA implementation, session revocation, and zero-trust service-to-service auth.",
      },
      {
        title: "Threat Modelling (STRIDE / OWASP ASVS)",
        description:
          "Collaborative architecture reviews that identify trust boundary violations before code is written.",
      },
      {
        title: "DevSecOps CI/CD Security Gates",
        description:
          "Integrating high-signal SAST, secret scanning, and software supply-chain checks into GitHub Actions without slowing developer velocity.",
      },
    ],
    methodology: [
      {
        phase: "01",
        title: "Architecture & Data-Flow Mapping",
        description: "Deconstruct application components, data sensitivity tiers, and external integrations.",
      },
      {
        phase: "02",
        title: "ASVS Control Benchmarking",
        description: "Evaluate implementation against OWASP Application Security Verification Standard (ASVS) levels.",
      },
      {
        phase: "03",
        title: "Source Code & Pipeline Audit",
        description: "Inspect high-risk code paths, build pipelines, secret handling, and dependency lockfiles.",
      },
      {
        phase: "04",
        title: "Guardrail Implementation",
        description: "Provide pull-request ready security policies, headers, validation schemas, and CI workflows.",
      },
    ],
    engagementWorkflow: [
      "Repository & architecture onboarding",
      "Threat model workshop with lead developers",
      "Line-by-line review of critical security modules",
      "Delivery of prioritized code fixes and CI security workflows",
    ],
    deliverables: [
      "Application Threat Model & Data Flow Diagram (DFD)",
      "OWASP ASVS Gap Analysis Matrix",
      "Annotated Secure Code Review Findings",
      "GitHub Actions DevSecOps Pipeline Templates",
    ],
    toolsAndTechnologies: [
      "OWASP ASVS",
      "Semgrep",
      "Gitleaks / TruffleHog",
      "GitHub Actions",
      "TypeScript / Zod",
      "Python / FastAPI",
      "Trivy",
    ],
    relatedProjectSlugs: ["total-entity-exposure-monitor", "vulnerability-management-platform"],
    relatedResearchSlugs: [
      "api-broken-object-level-authorization-patterns",
      "zero-trust-validation-patterns-nextjs-fastapi",
    ],
    faqs: [
      {
        question: "Which tech stacks do you review most frequently?",
        answer:
          "We specialize in TypeScript/JavaScript (React, Next.js, Node.js) and Python (FastAPI, Django, data/AI pipelines), as well as containerized PostgreSQL and cloud-native architectures.",
      },
      {
        question: "Will CI security checks slow down our developers with false positives?",
        answer:
          "We tune rulesets specifically to your framework and suppress noisy low-confidence rules so that pipeline gates only block on actionable, high-confidence security defects.",
      },
    ],
  },
  {
    slug: "security-audits",
    title: "Security Audits & Posture Assessments",
    shortTitle: "Security Audits",
    tagline: "Comprehensive technical evaluations of infrastructure, identity, and operational controls.",
    shortDescription:
      "Evidence-driven technical audits that benchmark your systems against industry best practices and uncover configuration drift.",
    iconName: "FileSearch",
    capabilityGroup: "DEFENSIVE ENGINEERING",
    problemStatement:
      "As engineering environments scale across cloud providers, SaaS tools, and hybrid endpoints, visibility fragments. Organisations often accumulate orphaned identities, permissive firewall rules, and unmonitored attack surfaces.",
    whatWeAssessOrDeliver: [
      {
        title: "Identity & Access Governance Review",
        description:
          "Auditing IAM privilege boundaries, service accounts, MFA enforcement, and dormant administrative credentials.",
      },
      {
        title: "Infrastructure & Container Hardening",
        description:
          "Evaluating Linux host configurations, Docker container isolation, secrets management, and network segmentation.",
      },
      {
        title: "Logging, Telemetry & Detection Readiness",
        description:
          "Verifying whether audit logs capture sufficient forensic context to detect and reconstruct unauthorized actions.",
      },
      {
        title: "Technical Control Mapping",
        description:
          "Technical gap analysis aligned with CIS Benchmarks, NIST CSF, and OWASP security standards (note: technical engineering assessment, not formal accredited certification issuance).",
      },
    ],
    methodology: [
      {
        phase: "01",
        title: "Asset & Boundary Inventory",
        description: "Catalogue active systems, identity providers, data stores, and administrative interfaces.",
      },
      {
        phase: "02",
        title: "Configuration & Policy Inspection",
        description: "Evaluate live configurations against CIS Benchmarks and least-privilege principles.",
      },
      {
        phase: "03",
        title: "Risk Prioritization",
        description: "Rank findings by exploitability, blast radius, and remediation effort.",
      },
      {
        phase: "04",
        title: "Actionable Hardening Roadmap",
        description: "Deliver a phased engineering plan for immediate quick-wins and structural improvements.",
      },
    ],
    engagementWorkflow: [
      "Read-only audit access & architecture documentation review",
      "Automated posture collection + deep manual configuration review",
      "Risk scoring & technical validation",
      "Roadmapping session with engineering leadership",
    ],
    deliverables: [
      "Comprehensive Security Posture Assessment Report",
      "Identity & Privilege Exposure Matrix",
      "CIS / NIST Technical Alignment Checklist",
      "30-60-90 Day Engineering Remediation Roadmap",
    ],
    toolsAndTechnologies: [
      "CloudSentinel Architecture Patterns",
      "CIS Benchmarks",
      "Linux Auditd",
      "Docker Bench",
      "OpenSCAP",
      "PostgreSQL Security Baseline",
    ],
    relatedProjectSlugs: ["cloudsentinel", "total-entity-exposure-monitor", "vulnerability-management-platform"],
    relatedResearchSlugs: [
      "hybrid-cloud-posture-drift-aws-azure",
      "identity-graph-blast-radius-analysis",
    ],
    faqs: [
      {
        question: "Do you issue formal ISO 27001 or SOC 2 certifications?",
        answer:
          "No. We are a technical security engineering studio, not an accredited certification body or CPA auditing firm. We perform the hands-on technical gap assessments and remediation engineering that prepare your systems for technical readiness.",
      },
      {
        question: "Do you require write access to production systems during an audit?",
        answer:
          "No. Security audits are conducted using least-privilege read-only inspection roles, configuration exports, and architecture interviews.",
      },
    ],
  },
  {
    slug: "cloud-security",
    title: "Cloud Security Architecture (AWS & Azure)",
    shortTitle: "Cloud Security",
    tagline: "Multi-cloud defense, IAM least privilege, and posture engineering for AWS and Microsoft Azure.",
    shortDescription:
      "Securing hybrid cloud workloads through automated posture checks, IAM blast-radius reduction, network isolation, and guardrails.",
    iconName: "CloudCog",
    capabilityGroup: "DEFENSIVE ENGINEERING",
    problemStatement:
      "Multi-cloud adoption across AWS and Microsoft Azure introduces complex IAM permission chains, cross-account trust risks, exposed storage buckets, and inconsistent security monitoring across regions.",
    whatWeAssessOrDeliver: [
      {
        title: "AWS & Azure IAM Privilege Hardening",
        description:
          "Eliminating wildcard policies, hardening assume-role trust policies, and securing workload identities (IRSA / Managed Identities).",
      },
      {
        title: "Network & Data Perimeter Protection",
        description:
          "Reviewing VPC/VNet segmentation, security groups, private endpoints, KMS/Key Vault encryption, and S3/Blob public access blocks.",
      },
      {
        title: "Cloud Threat Detection & Guardrails",
        description:
          "Configuring CloudTrail, GuardDuty, Microsoft Defender for Cloud, and continuous drift alerting.",
      },
      {
        title: "Approval-Gated Remediation Workflows",
        description:
          "Designing safe, human-approved remediation runbooks to fix cloud misconfigurations without breaking production workloads.",
      },
    ],
    methodology: [
      {
        phase: "01",
        title: "Multi-Cloud Asset Discovery",
        description: "Enumerate accounts, subscriptions, compute workloads, storage, and IAM trust relationships.",
      },
      {
        phase: "02",
        title: "Posture & IAM Graph Evaluation",
        description: "Analyze permission escalation paths, public network exposures, and encryption posture.",
      },
      {
        phase: "03",
        title: "Detection & Policy Engineering",
        description: "Design preventative SCPs / Azure Policies and high-signal alert routing.",
      },
      {
        phase: "04",
        title: "Remediation & Evidence Verification",
        description: "Apply hardened Infrastructure-as-Code templates and capture compliance evidence.",
      },
    ],
    engagementWorkflow: [
      "Read-only cloud security reader role deployment",
      "Automated discovery + manual IAM and network architecture analysis",
      "Delivery of IaC fixes and policy guardrails",
      "Validation scan to verify posture improvement",
    ],
    deliverables: [
      "AWS / Azure Cloud Security Posture Report",
      "IAM Escalation Path & Least-Privilege Recommendations",
      "Hardened Terraform / Bicep / CloudFormation Snippets",
      "Cloud Detection & Logging Architecture Blueprint",
    ],
    toolsAndTechnologies: [
      "AWS (IAM, CloudTrail, GuardDuty, KMS, VPC)",
      "Microsoft Azure (Entra ID, Defender, Key Vault, NSGs)",
      "CloudSentinel",
      "Docker",
      "Python Boto3 / Azure SDK",
      "GitHub Actions OIDC",
    ],
    relatedProjectSlugs: ["cloudsentinel", "total-entity-exposure-monitor"],
    relatedResearchSlugs: [
      "hybrid-cloud-posture-drift-aws-azure",
      "identity-graph-blast-radius-analysis",
    ],
    faqs: [
      {
        question: "How does CloudSentinel relate to your Cloud Security service?",
        answer:
          "CloudSentinel is our engineering blueprint and platform architecture for hybrid AWS and Azure security posture assessment, risk scoring, and approval-gated remediation. Our service engagements apply these exact engineering principles to your cloud environment.",
      },
      {
        question: "Can you help migrate static CI/CD cloud keys to short-lived OIDC tokens?",
        answer:
          "Yes. Replacing long-lived AWS/Azure secrets in GitHub Actions with federated OIDC workload identities is one of our highest-impact immediate recommendations.",
      },
    ],
  },
  {
    slug: "incident-response",
    title: "Incident Response & Forensic Readiness",
    shortTitle: "Incident Response",
    tagline: "Triage engineering, forensic evidence preservation, and detection automation.",
    shortDescription:
      "Prepare for and investigate security incidents with structured DFIR workflows, volatile memory analysis, and threat intelligence correlation.",
    iconName: "Siren",
    capabilityGroup: "DEFENSIVE ENGINEERING",
    problemStatement:
      "When anomalous activity occurs, unprepared teams often overwrite crucial volatile evidence, struggle to determine the blast radius, or lack repeatable playbooks to contain compromised hosts and identities safely.",
    whatWeAssessOrDeliver: [
      {
        title: "Forensic Triage & Artifact Analysis",
        description:
          "Preserving and analyzing host memory dumps, process trees, authentication logs, and persistence mechanisms using structured DFIR tooling.",
      },
      {
        title: "Threat Intelligence & IOC Correlation",
        description:
          "Extracting Indicators of Compromise (IOCs) and mapping adversary behavior to MITRE ATT&CK tactics and techniques.",
      },
      {
        title: "Containment & Eradication Guidance",
        description:
          "Practical engineering support to isolate affected workloads, rotate compromised credentials, and close initial access vectors.",
      },
      {
        title: "IR Playbooks & Tabletop Engineering",
        description:
          "Building realistic, system-specific runbooks for ransomware, credential compromise, and cloud control-plane breaches.",
      },
    ],
    methodology: [
      {
        phase: "01",
        title: "Preparation & Telemetry Validation",
        description: "Ensure log retention, clock synchronization, and evidence capture pipelines are operational.",
      },
      {
        phase: "02",
        title: "Identification & Forensic Preservation",
        description: "Collect immutable snapshots, memory artifacts, and log timelines with chain-of-custody integrity.",
      },
      {
        phase: "03",
        title: "Blast-Radius & Root-Cause Analysis",
        description: "Reconstruct attacker dwell time, lateral movement, and affected data assets.",
      },
      {
        phase: "04",
        title: "Hardening & Post-Incident Review",
        description: "Implement structural detections and control upgrades to prevent recurrence.",
      },
    ],
    engagementWorkflow: [
      "Initial scoping or rapid triage intake",
      "Forensic evidence collection & timeline reconstruction",
      "MITRE ATT&CK technique mapping & containment plan",
      "Post-incident engineering review & detection rule deployment",
    ],
    deliverables: [
      "Forensic Timeline & Root-Cause Analysis Report",
      "MITRE ATT&CK Adversary Behavior Mapping",
      "Containment & Credential Rotation Checklist",
      "Custom Incident Response Playbooks",
    ],
    toolsAndTechnologies: [
      "Volatility 3",
      "Python DFIR Automation",
      "MITRE ATT&CK Framework",
      "YARA / Sigma Rules",
      "Linux Forensic Utilities",
      "CloudTrail / Entra Audit Logs",
    ],
    relatedProjectSlugs: [
      "ml-data-driven-forensic-automation",
      "threat-intelligence-cti-analysis",
      "sentinel-iot",
    ],
    relatedResearchSlugs: [
      "automated-memory-forensics-volatility3-triage",
      "llm-assisted-cti-extraction-mitre-mapping",
    ],
    faqs: [
      {
        question: "What should we do first if we suspect an active compromise?",
        answer:
          "Do not reboot or wipe suspected hosts, as this destroys volatile RAM artifacts. Isolate the affected host at the network/security-group layer, preserve cloud and authentication logs, and initiate structured triage.",
      },
      {
        question: "Do you build proactive forensic readiness before an incident happens?",
        answer:
          "Yes. Our highest-value engagements focus on forensic readiness: ensuring your cloud and Linux environments actually record and retain the telemetry required to investigate an incident swiftly.",
      },
    ],
  },
  {
    slug: "secure-development",
    title: "Secure Software & Platform Development",
    shortTitle: "Secure Development",
    tagline: "Design and build full-stack web applications, APIs, and security tools with defence-in-depth.",
    shortDescription:
      "End-to-end engineering of resilient web platforms, security dashboards, and backend APIs built on Next.js, TypeScript, FastAPI, and PostgreSQL.",
    iconName: "TerminalSquare",
    capabilityGroup: "SECURE DEVELOPMENT",
    problemStatement:
      "Many software agencies treat security as an afterthought bolt-on after launch, resulting in fragile validation, exposed endpoints, and technical debt. Critical digital products and internal security tools require security engineering from line one.",
    whatWeAssessOrDeliver: [
      {
        title: "Full-Stack Secure Web Applications",
        description:
          "Production-ready Next.js, React, and TypeScript platforms engineered with strict CSP, server-side validation, and accessible high-performance UI.",
      },
      {
        title: "Resilient APIs & Backend Systems",
        description:
          "FastAPI and Node.js backend services featuring schema validation, rate limiting, structured audit logging, and least-privilege database access.",
      },
      {
        title: "Custom Security & Telemetry Dashboards",
        description:
          "Purpose-built interfaces for threat intelligence visualization, vulnerability tracking, and SOC/posture workflows.",
      },
      {
        title: "Database Architecture & Data Integrity",
        description:
          "PostgreSQL and Prisma schemas designed with referential integrity, migration discipline, and minimal sensitive data retention.",
      },
    ],
    methodology: [
      {
        phase: "01",
        title: "Requirements & Threat-Aware Architecture",
        description: "Define functional goals alongside security requirements, trust boundaries, and data schemas.",
      },
      {
        phase: "02",
        title: "Iterative Full-Stack Implementation",
        description: "Build modular frontend and backend components with strict TypeScript/Python typing and Zod/Pydantic validation.",
      },
      {
        phase: "03",
        title: "Automated Verification & Security Testing",
        description: "Execute unit, integration, and end-to-end tests alongside dependency and header verification.",
      },
      {
        phase: "04",
        title: "Production Deployment & Documentation",
        description: "Configure CI/CD pipelines, environment validation, monitoring, and maintainable runbooks.",
      },
    ],
    engagementWorkflow: [
      "Product discovery & architecture blueprint",
      "Sprint-based full-stack engineering & code reviews",
      "Automated test suite & security hardening verification",
      "Production deployment & knowledge transfer",
    ],
    deliverables: [
      "Production-Ready Source Code Repository",
      "Database Schema & Migration Suite",
      "Automated Unit, Integration & E2E Test Suite",
      "System Architecture, Security & Deployment Documentation",
    ],
    toolsAndTechnologies: [
      "Next.js (App Router)",
      "TypeScript",
      "React",
      "FastAPI (Python)",
      "PostgreSQL & Prisma",
      "Tailwind CSS",
      "Docker & GitHub Actions",
    ],
    relatedProjectSlugs: [
      "cloudsentinel",
      "ai-powered-personal-digital-safety-assistant",
      "vulnerability-management-platform",
    ],
    relatedResearchSlugs: [
      "zero-trust-validation-patterns-nextjs-fastapi",
      "api-broken-object-level-authorization-patterns",
    ],
    faqs: [
      {
        question: "Do you build custom security tools and internal engineering portals?",
        answer:
          "Yes. We design and engineer custom security control planes, telemetry dashboards, CTI pipelines, and secure customer-facing SaaS applications.",
      },
      {
        question: "How is secure development different from standard web development?",
        answer:
          "Every architectural decision—from input parsing, session state, and HTTP headers to database queries and error handling—is designed against OWASP ASVS requirements from day one rather than patched later.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES_DATA.find((service) => service.slug === slug);
}
