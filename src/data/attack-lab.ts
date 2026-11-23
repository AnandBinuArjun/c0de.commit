export interface AttackTechnique {
  id: string;
  name: string;
  tactic: string;
}

export const ATTACK_CATALOG: AttackTechnique[] = [
  { id: "T1566", name: "Phishing", tactic: "Initial Access" },
  { id: "T1190", name: "Exploit Public-Facing Application", tactic: "Initial Access" },
  { id: "T1078", name: "Valid Accounts", tactic: "Initial Access" },
  { id: "T1110", name: "Brute Force", tactic: "Credential Access" },
  { id: "T1059", name: "Command and Scripting Interpreter", tactic: "Execution" },
  { id: "T1053", name: "Scheduled Task/Job", tactic: "Persistence" },
  { id: "T1068", name: "Exploitation for Privilege Escalation", tactic: "Privilege Escalation" },
  { id: "T1070", name: "Indicator Removal", tactic: "Defense Evasion" },
  { id: "T1003", name: "OS Credential Dumping", tactic: "Credential Access" },
  { id: "T1087", name: "Account Discovery", tactic: "Discovery" },
  { id: "T1021", name: "Remote Services", tactic: "Lateral Movement" },
  { id: "T1005", name: "Data from Local System", tactic: "Collection" },
  { id: "T1071", name: "Application Layer Protocol", tactic: "Command and Control" },
  { id: "T1041", name: "Exfiltration Over C2 Channel", tactic: "Exfiltration" },
  { id: "T1486", name: "Data Encrypted for Impact", tactic: "Impact" },
];

export const TACTIC_ORDER = [
  "Initial Access",
  "Execution",
  "Persistence",
  "Privilege Escalation",
  "Defense Evasion",
  "Credential Access",
  "Discovery",
  "Lateral Movement",
  "Collection",
  "Command and Control",
  "Exfiltration",
  "Impact",
] as const;

export interface DefenceControl {
  id: string;
  name: string;
  /** Techniques this control is modelled as preventing. */
  prevents: string[];
  /** Techniques this control is modelled as detecting (does not stop). */
  detects: string[];
}

/**
 * Illustrative control model for education. It is a simplified qualitative model,
 * not a measurement of real-world control effectiveness.
 */
export const DEFENCE_CONTROLS: DefenceControl[] = [
  { id: "email", name: "Email filtering & user training", prevents: ["T1566"], detects: [] },
  { id: "waf", name: "WAF + patch management", prevents: ["T1190"], detects: [] },
  { id: "mfa", name: "Phishing-resistant MFA", prevents: ["T1078", "T1110"], detects: [] },
  { id: "edr", name: "EDR on endpoints", prevents: ["T1003", "T1059", "T1068"], detects: ["T1053"] },
  { id: "seg", name: "Network segmentation", prevents: ["T1021"], detects: ["T1087"] },
  { id: "egress", name: "Egress filtering & DNS monitoring", prevents: ["T1041", "T1071"], detects: [] },
  { id: "backup", name: "Immutable offline backups", prevents: ["T1486"], detects: [] },
  { id: "siem", name: "Centralised logging & alerting", prevents: [], detects: ["T1070", "T1005", "T1087", "T1110", "T1021"] },
];

export interface ScenarioStep {
  techniqueId: string;
  narrative: string;
}

export const SIMULATED_SCENARIO: ScenarioStep[] = [
  { techniqueId: "T1566", narrative: "A convincing email lures an employee into running an attachment." },
  { techniqueId: "T1059", narrative: "A script interpreter launches the attacker's first-stage payload." },
  { techniqueId: "T1003", narrative: "Credentials are harvested from memory on the compromised host." },
  { techniqueId: "T1021", narrative: "Stolen credentials are used to reach another system over remote services." },
  { techniqueId: "T1005", narrative: "Sensitive local data is staged for collection." },
  { techniqueId: "T1041", narrative: "Data is sent out over the attacker's command-and-control channel." },
  { techniqueId: "T1486", narrative: "Systems are encrypted to disrupt operations." },
];
