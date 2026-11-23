export interface TerminalCommandOutput {
  command: string;
  lines: string[];
  actionHref?: string;
  actionLabel?: string;
  shouldClear?: boolean;
}

export const ALLOWED_TERMINAL_COMMANDS = [
  "help",
  "about",
  "services",
  "projects",
  "research",
  "contact",
  "clear",
] as const;

export type AllowedTerminalCommand = (typeof ALLOWED_TERMINAL_COMMANDS)[number];

/**
 * Pure, deterministic, allowlisted command registry.
 * Does NOT execute shell commands or access filesystem/server internals.
 */
export function executeAllowlistedTerminalCommand(rawInput: string): TerminalCommandOutput {
  const normalized = rawInput.trim().toLowerCase();

  if (!normalized) {
    return {
      command: "",
      lines: ["Type 'help' to list available navigation commands."],
    };
  }

  switch (normalized) {
    case "help":
      return {
        command: "help",
        lines: [
          "CODE.COMMIT Interactive Navigation Console (Allowlisted UI Mode)",
          "Available commands:",
          "  help      — Display available console navigation commands",
          "  about     — View CODE.COMMIT studio mission & engineering profile",
          "  services  — List offensive, defensive & secure development services",
          "  projects  — Inspect verified GitHub systems & CloudSentinel",
          "  research  — Browse technical security research briefs & MITRE mappings",
          "  contact   — Initialize a security assessment or engineering project",
          "  clear     — Clear terminal output history",
        ],
      };

    case "about":
      return {
        command: "about",
        lines: [
          "[ STUDIO ] CODE.COMMIT — SECURITY × SOFTWARE",
          "Positioning: Offensive Security. Defensive Engineering. Secure Software.",
          "Lead Engineer: Anand Binu Arjun (github.com/AnandBinuArjun)",
          "Focus: Helping organisations find vulnerabilities, fix them, and build secure systems.",
        ],
        actionHref: "/about",
        actionLabel: "Open /about page",
      };

    case "services":
      return {
        command: "services",
        lines: [
          "[ SERVICES MATRIX ]",
          "  01. Penetration Testing       (/services/penetration-testing)",
          "  02. Application Security      (/services/application-security)",
          "  03. Security Audits           (/services/security-audits)",
          "  04. Cloud Security            (/services/cloud-security)",
          "  05. Incident Response         (/services/incident-response)",
          "  06. Secure Development        (/services/secure-development)",
        ],
        actionHref: "/services",
        actionLabel: "Explore all services (/services)",
      };

    case "projects":
      return {
        command: "projects",
        lines: [
          "[ ENGINEERING PORTFOLIO — 21 VERIFIED SYSTEMS ON github.com/AnandBinuArjun ]",
          "  • CloudSentinel (v1.0.0 Enterprise AWS & Azure CSPM & Threat Detection)",
          "  • AegisFlow (AI-Native AppSec Triage & SHA-256 Verified Remediation)",
          "  • SENTINEL-IoT (23★ IoT Botnet Early-Warning & Honeypot Network)",
          "  • RANSOMWATCH (Critical Infrastructure Ransomware Observatory)",
          "  • CODEX CYBERSTRIKE (AI-Native Red Team / SOC MCP Orchestration)",
          "  • REDRECON-X (Modular Attack-Surface & Reconnaissance Engine)",
          "  • Threat Intelligence CTI Analysis, TOTAL ENTITY, CivicShield, CORTEX, JOBGUARD-UK & more",
        ],
        actionHref: "/work",
        actionLabel: "Open Full 21-Project Engineering Portfolio (/work)",
      };

    case "research":
      return {
        command: "research",
        lines: [
          "[ SECURITY RESEARCH LAB ]",
          "Categories: Offensive Security, Defensive Security, Threat Intelligence,",
          "Malware Analysis, Cloud Security, IoT Security, Digital Forensics, Secure Development.",
          "All working drafts are transparently labelled with verified MITRE ATT&CK references.",
        ],
        actionHref: "/research",
        actionLabel: "Enter Research Lab (/research)",
      };

    case "contact":
      return {
        command: "contact",
        lines: [
          "[ INITIALIZE PROJECT ]",
          "Ready to scope an authorised penetration test, cloud security review, or secure build?",
          "Note: Do not transmit passwords, private keys, or live secrets via public forms.",
        ],
        actionHref: "/contact",
        actionLabel: "Launch Project Enquiry (/contact)",
      };

    case "clear":
      return {
        command: "clear",
        lines: [],
        shouldClear: true,
      };

    default:
      return {
        command: normalized,
        lines: [
          `Command not recognized in allowlist: '${rawInput.trim().slice(0, 40)}'`,
          "Security Notice: Arbitrary shell execution is disabled by design.",
          "Type 'help' for allowlisted navigation commands: help, about, services, projects, research, contact, clear.",
        ],
      };
  }
}
