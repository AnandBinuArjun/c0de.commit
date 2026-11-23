export interface GlossaryTerm {
  term: string;
  category: "Offensive" | "Defensive" | "Cloud" | "Application" | "Intelligence" | "Cryptography";
  definition: string;
  see?: string[];
}

export const GLOSSARY: GlossaryTerm[] = [
  { term: "ATT&CK", category: "Intelligence", definition: "MITRE's knowledge base of adversary tactics and techniques observed in real-world intrusions, used to describe behaviour and measure detection coverage.", see: ["TTP", "Detection engineering"] },
  { term: "BOLA", category: "Application", definition: "Broken Object Level Authorization: an API flaw where a caller can access another user's object by changing an identifier because the server checks authentication but not ownership.", see: ["IDOR"] },
  { term: "CSP", category: "Application", definition: "Content Security Policy: an HTTP header that restricts which sources a page may load scripts, styles and frames from, reducing the impact of XSS.", see: ["XSS"] },
  { term: "CSRF", category: "Application", definition: "Cross-Site Request Forgery: tricking a signed-in user's browser into sending an unwanted state-changing request. Mitigated with SameSite cookies and anti-forgery tokens." },
  { term: "CTI", category: "Intelligence", definition: "Cyber Threat Intelligence: analysed information about adversaries, their infrastructure and methods that supports defensive decisions.", see: ["IOC", "TTP"] },
  { term: "CVE", category: "Intelligence", definition: "Common Vulnerabilities and Exposures: a public identifier assigned to a specific disclosed vulnerability.", see: ["CVSS"] },
  { term: "CVSS", category: "Intelligence", definition: "Common Vulnerability Scoring System: an open framework that scores the technical severity of a vulnerability from 0.0 to 10.0 using base metrics such as attack vector and impact.", see: ["CVE"] },
  { term: "CWE", category: "Application", definition: "Common Weakness Enumeration: a community catalogue of software and hardware weakness types, such as CWE-89 for SQL injection." },
  { term: "Defence in depth", category: "Defensive", definition: "Layering independent controls so that the failure of one does not lead to compromise." },
  { term: "Detection engineering", category: "Defensive", definition: "The practice of designing, testing and maintaining detections as code, mapped to adversary behaviour and measured for coverage and false positives.", see: ["ATT&CK", "Sigma"] },
  { term: "DFIR", category: "Defensive", definition: "Digital Forensics and Incident Response: collecting and analysing evidence to understand and contain an incident while preserving chain of custody." },
  { term: "DMARC", category: "Defensive", definition: "A DNS-published email policy that builds on SPF and DKIM to tell receivers how to handle messages failing authentication and to report abuse.", see: ["SPF", "DKIM"] },
  { term: "DKIM", category: "Defensive", definition: "DomainKeys Identified Mail: a cryptographic signature on outgoing email, verified using a public key published in DNS.", see: ["DMARC", "SPF"] },
  { term: "IAM", category: "Cloud", definition: "Identity and Access Management: the policies and systems controlling who or what can perform which actions on which resources.", see: ["Least privilege"] },
  { term: "IDOR", category: "Application", definition: "Insecure Direct Object Reference: exposing an internal identifier that can be altered to reach other users' data without an authorisation check.", see: ["BOLA"] },
  { term: "IOC", category: "Intelligence", definition: "Indicator of Compromise: an observable artefact, such as a file hash, domain or IP address, associated with malicious activity. Indicators are usually defanged when shared.", see: ["CTI"] },
  { term: "Least privilege", category: "Defensive", definition: "Granting only the minimum access needed to perform a task, for the minimum time needed.", see: ["IAM"] },
  { term: "Lateral movement", category: "Offensive", definition: "Techniques an adversary uses to move from an initial foothold to other systems in a network." },
  { term: "Living off the land", category: "Offensive", definition: "Abusing legitimate, already-present tools such as PowerShell or certutil to avoid dropping obvious malware." },
  { term: "mTLS", category: "Cryptography", definition: "Mutual TLS: both client and server present certificates, so each side authenticates the other." },
  { term: "Penetration test", category: "Offensive", definition: "An authorised, scoped simulation of an attack to find and demonstrate exploitable weaknesses under agreed Rules of Engagement." },
  { term: "Rules of Engagement", category: "Offensive", definition: "The written agreement defining the scope, methods, timing and constraints of an authorised security test." },
  { term: "SBOM", category: "Application", definition: "Software Bill of Materials: a machine-readable inventory of the components and dependencies in a piece of software." },
  { term: "Sigma", category: "Defensive", definition: "An open, vendor-neutral rule format for describing log-based detections that can be converted to many SIEM query languages.", see: ["Detection engineering"] },
  { term: "SPF", category: "Defensive", definition: "Sender Policy Framework: a DNS record listing the hosts allowed to send email for a domain.", see: ["DMARC", "DKIM"] },
  { term: "SSRF", category: "Application", definition: "Server-Side Request Forgery: making a server issue requests to unintended destinations, often internal services or cloud metadata endpoints." },
  { term: "STRIDE", category: "Application", definition: "A threat-modelling mnemonic: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege.", see: ["Threat model"] },
  { term: "Threat model", category: "Application", definition: "A structured analysis of a system's assets, trust boundaries and data flows to identify and prioritise threats before they are exploited.", see: ["STRIDE"] },
  { term: "TTP", category: "Intelligence", definition: "Tactics, Techniques and Procedures: the behavioural fingerprint of how an adversary operates.", see: ["ATT&CK"] },
  { term: "XSS", category: "Application", definition: "Cross-Site Scripting: injecting script that runs in another user's browser in the context of a trusted site. Mitigated by contextual output encoding and CSP.", see: ["CSP"] },
  { term: "Zero trust", category: "Defensive", definition: "A security model that grants no implicit trust based on network location; every request is authenticated, authorised and continuously evaluated." },
  { term: "Argon2id", category: "Cryptography", definition: "A memory-hard password hashing function recommended for storing passwords, resisting GPU and ASIC cracking better than fast hashes." },
];
