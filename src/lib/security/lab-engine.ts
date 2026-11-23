/**
 * CODE.COMMIT Lab Engine — pure, zero-egress security utilities.
 * Every function here is deterministic and runs entirely in the caller's runtime.
 */

export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";

export interface Finding {
  severity: Severity;
  message: string;
}

/* -------------------------------------------------------------------------- */
/* CVSS v3.1 base score calculator                                            */
/* -------------------------------------------------------------------------- */

export interface CvssMetrics {
  AV: "N" | "A" | "L" | "P";
  AC: "L" | "H";
  PR: "N" | "L" | "H";
  UI: "N" | "R";
  S: "U" | "C";
  C: "H" | "L" | "N";
  I: "H" | "L" | "N";
  A: "H" | "L" | "N";
}

export const DEFAULT_CVSS: CvssMetrics = {
  AV: "N",
  AC: "L",
  PR: "N",
  UI: "N",
  S: "U",
  C: "H",
  I: "H",
  A: "H",
};

export const CVSS_OPTIONS: Record<keyof CvssMetrics, { value: string; label: string }[]> = {
  AV: [
    { value: "N", label: "Network" },
    { value: "A", label: "Adjacent" },
    { value: "L", label: "Local" },
    { value: "P", label: "Physical" },
  ],
  AC: [
    { value: "L", label: "Low" },
    { value: "H", label: "High" },
  ],
  PR: [
    { value: "N", label: "None" },
    { value: "L", label: "Low" },
    { value: "H", label: "High" },
  ],
  UI: [
    { value: "N", label: "None" },
    { value: "R", label: "Required" },
  ],
  S: [
    { value: "U", label: "Unchanged" },
    { value: "C", label: "Changed" },
  ],
  C: [
    { value: "H", label: "High" },
    { value: "L", label: "Low" },
    { value: "N", label: "None" },
  ],
  I: [
    { value: "H", label: "High" },
    { value: "L", label: "Low" },
    { value: "N", label: "None" },
  ],
  A: [
    { value: "H", label: "High" },
    { value: "L", label: "Low" },
    { value: "N", label: "None" },
  ],
};

export type CvssSeverity = "None" | "Low" | "Medium" | "High" | "Critical";

export interface CvssResult {
  base: number;
  impact: number;
  exploitability: number;
  severity: CvssSeverity;
  vector: string;
}

/** CVSS v3.1 specification Roundup (Appendix A). */
function roundUp1(value: number): number {
  const intInput = Math.round(value * 100000);
  if (intInput % 10000 === 0) return intInput / 100000;
  return (Math.floor(intInput / 10000) + 1) / 10;
}

export function cvssSeverity(score: number): CvssSeverity {
  if (score === 0) return "None";
  if (score < 4) return "Low";
  if (score < 7) return "Medium";
  if (score < 9) return "High";
  return "Critical";
}

export function calculateCvss31(m: CvssMetrics): CvssResult {
  const av = { N: 0.85, A: 0.62, L: 0.55, P: 0.2 }[m.AV];
  const ac = { L: 0.77, H: 0.44 }[m.AC];
  const changed = m.S === "C";
  const pr = {
    N: 0.85,
    L: changed ? 0.68 : 0.62,
    H: changed ? 0.5 : 0.27,
  }[m.PR];
  const ui = { N: 0.85, R: 0.62 }[m.UI];
  const cia = { H: 0.56, L: 0.22, N: 0 };

  const iss = 1 - (1 - cia[m.C]) * (1 - cia[m.I]) * (1 - cia[m.A]);
  const impact = changed
    ? 7.52 * (iss - 0.029) - 3.25 * Math.pow(iss - 0.02, 15)
    : 6.42 * iss;
  const exploitability = 8.22 * av * ac * pr * ui;

  let base = 0;
  if (impact > 0) {
    base = changed
      ? roundUp1(Math.min(1.08 * (impact + exploitability), 10))
      : roundUp1(Math.min(impact + exploitability, 10));
  }

  return {
    base,
    impact: Math.round(impact * 10) / 10,
    exploitability: Math.round(exploitability * 10) / 10,
    severity: cvssSeverity(base),
    vector: `CVSS:3.1/AV:${m.AV}/AC:${m.AC}/PR:${m.PR}/UI:${m.UI}/S:${m.S}/C:${m.C}/I:${m.I}/A:${m.A}`,
  };
}

export function parseCvssVector(vector: string): CvssMetrics | null {
  const parts = vector.trim().replace(/^CVSS:3\.[01]\//, "").split("/");
  const found: Record<string, string> = {};
  for (const part of parts) {
    const [k, v] = part.split(":");
    if (k && v) found[k] = v;
  }
  const keys = Object.keys(CVSS_OPTIONS) as (keyof CvssMetrics)[];
  const result: Partial<Record<keyof CvssMetrics, string>> = {};
  for (const key of keys) {
    const value = found[key];
    if (!value || !CVSS_OPTIONS[key].some((o) => o.value === value)) return null;
    result[key] = value;
  }
  return result as unknown as CvssMetrics;
}

/* -------------------------------------------------------------------------- */
/* JWT inspector (decode only — never verifies or transmits)                  */
/* -------------------------------------------------------------------------- */

export interface JwtReport {
  valid: boolean;
  error?: string;
  header?: Record<string, unknown>;
  payload?: Record<string, unknown>;
  signaturePresent: boolean;
  issuedAt?: string;
  expiresAt?: string;
  findings: Finding[];
}

function base64UrlToText(segment: string): string {
  const normalised = segment.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalised + "=".repeat((4 - (normalised.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export function inspectJwt(token: string, now: Date = new Date()): JwtReport {
  const findings: Finding[] = [];
  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    return {
      valid: false,
      error: "A JWT must have three dot-separated segments (header.payload.signature).",
      signaturePresent: false,
      findings,
    };
  }
  let header: Record<string, unknown> | null;
  let payload: Record<string, unknown> | null;
  try {
    header = asRecord(JSON.parse(base64UrlToText(parts[0])));
    payload = asRecord(JSON.parse(base64UrlToText(parts[1])));
  } catch {
    return {
      valid: false,
      error: "Header or payload is not valid base64url-encoded JSON.",
      signaturePresent: parts[2].length > 0,
      findings,
    };
  }
  if (!header || !payload) {
    return {
      valid: false,
      error: "Header and payload must be JSON objects.",
      signaturePresent: parts[2].length > 0,
      findings,
    };
  }

  const signaturePresent = parts[2].length > 0;
  const alg = typeof header.alg === "string" ? header.alg : "";

  if (!alg) findings.push({ severity: "HIGH", message: "No 'alg' header present." });
  if (alg.toLowerCase() === "none" || !signaturePresent) {
    findings.push({
      severity: "CRITICAL",
      message:
        "Unsigned token (alg 'none' or empty signature). Servers must reject these; accepting them allows trivial forgery.",
    });
  }
  if (alg.startsWith("HS")) {
    findings.push({
      severity: "INFO",
      message:
        "Symmetric HMAC algorithm: the signing secret must be long and random, and must never be shared with clients.",
    });
  }
  if (typeof header.jku === "string" || typeof header.jwk === "object" || typeof header.x5u === "string") {
    findings.push({
      severity: "HIGH",
      message:
        "Header embeds a key source (jku / jwk / x5u). Verifiers must never trust key material supplied by the token itself.",
    });
  }

  let issuedAt: string | undefined;
  let expiresAt: string | undefined;
  if (typeof payload.iat === "number") issuedAt = new Date(payload.iat * 1000).toISOString();
  if (typeof payload.exp === "number") {
    expiresAt = new Date(payload.exp * 1000).toISOString();
    if (payload.exp * 1000 < now.getTime()) {
      findings.push({ severity: "MEDIUM", message: "Token is expired (exp is in the past)." });
    }
  } else {
    findings.push({
      severity: "MEDIUM",
      message: "No 'exp' claim: the token never expires, so a leaked token stays valid indefinitely.",
    });
  }
  if (typeof payload.aud === "undefined") {
    findings.push({ severity: "LOW", message: "No 'aud' claim: audience restriction cannot be enforced." });
  }
  if (typeof payload.iss === "undefined") {
    findings.push({ severity: "LOW", message: "No 'iss' claim: issuer cannot be validated." });
  }

  findings.push({
    severity: "INFO",
    message: "Decode only. The signature is NOT verified here, and the token never leaves your browser.",
  });

  return { valid: true, header, payload, signaturePresent, issuedAt, expiresAt, findings };
}

/* -------------------------------------------------------------------------- */
/* Encoding / hashing workbench                                               */
/* -------------------------------------------------------------------------- */

export type EncodingOp =
  | "base64-encode"
  | "base64-decode"
  | "hex-encode"
  | "hex-decode"
  | "url-encode"
  | "url-decode";

export interface EncodingResult {
  ok: boolean;
  output: string;
  error?: string;
}

export function transformEncoding(op: EncodingOp, input: string): EncodingResult {
  try {
    switch (op) {
      case "base64-encode": {
        const bytes = new TextEncoder().encode(input);
        let binary = "";
        for (const b of bytes) binary += String.fromCharCode(b);
        return { ok: true, output: btoa(binary) };
      }
      case "base64-decode": {
        const clean = input.trim().replace(/-/g, "+").replace(/_/g, "/");
        const padded = clean + "=".repeat((4 - (clean.length % 4)) % 4);
        const binary = atob(padded);
        const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
        return { ok: true, output: new TextDecoder("utf-8").decode(bytes) };
      }
      case "hex-encode": {
        const bytes = new TextEncoder().encode(input);
        return {
          ok: true,
          output: Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join(""),
        };
      }
      case "hex-decode": {
        const clean = input.replace(/\s+/g, "").replace(/^0x/i, "");
        if (!/^[0-9a-fA-F]*$/.test(clean) || clean.length % 2 !== 0) {
          return { ok: false, output: "", error: "Input must be an even-length hexadecimal string." };
        }
        const bytes = new Uint8Array(clean.length / 2);
        for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
        return { ok: true, output: new TextDecoder("utf-8").decode(bytes) };
      }
      case "url-encode":
        return { ok: true, output: encodeURIComponent(input) };
      case "url-decode":
        return { ok: true, output: decodeURIComponent(input) };
    }
  } catch {
    return { ok: false, output: "", error: "Input is not valid for this operation." };
  }
}

/** Identifies likely hash formats from length and prefix. Heuristic only. */
export function identifyHash(value: string): string[] {
  const v = value.trim();
  if (!v) return [];
  if (/^\$2[abxy]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(v)) return ["bcrypt"];
  if (/^\$argon2(id|i|d)\$/.test(v)) return ["Argon2 (PHC string)"];
  if (/^\$6\$/.test(v)) return ["SHA-512 crypt"];
  if (/^\$5\$/.test(v)) return ["SHA-256 crypt"];
  if (/^\$1\$/.test(v)) return ["MD5 crypt (obsolete)"];
  if (/^[0-9a-fA-F]+$/.test(v)) {
    switch (v.length) {
      case 32:
        return ["MD5 (broken)", "NTLM"];
      case 40:
        return ["SHA-1 (broken for collision resistance)"];
      case 56:
        return ["SHA-224", "SHA3-224"];
      case 64:
        return ["SHA-256", "SHA3-256"];
      case 96:
        return ["SHA-384", "SHA3-384"];
      case 128:
        return ["SHA-512", "SHA3-512"];
    }
  }
  return ["Unrecognised format"];
}

export type DigestAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export async function digestHex(algorithm: DigestAlgorithm, input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await globalThis.crypto.subtle.digest(algorithm, data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/* -------------------------------------------------------------------------- */
/* Regex / ReDoS analyser                                                     */
/* -------------------------------------------------------------------------- */

export interface RegexReport {
  valid: boolean;
  error?: string;
  risk: "LOW" | "MEDIUM" | "HIGH";
  reasons: string[];
  executed: boolean;
  matches: string[];
  note?: string;
}

const NESTED_QUANTIFIER = /\((?:[^()\\]|\\.)*(?:[+*]|\{\d+,\d*\})(?:[^()\\]|\\.)*\)(?:[+*]|\{\d+,\d*\})/;
const DUPLICATE_ALTERNATION = /\(([^()|]+)\|\1\)[+*]/;
const ADJACENT_WILDCARDS = /\.[*+][^)]{0,3}\.[*+]/;

export function analyzeRegex(pattern: string, flags: string, sample: string): RegexReport {
  const reasons: string[] = [];
  if (!/^[dgimsuvy]*$/.test(flags)) {
    return { valid: false, error: "Unsupported flags.", risk: "LOW", reasons, executed: false, matches: [] };
  }
  let compiled: RegExp;
  try {
    compiled = new RegExp(pattern, flags.includes("g") ? flags : `${flags}g`);
  } catch (e) {
    return {
      valid: false,
      error: e instanceof Error ? e.message : "Invalid pattern.",
      risk: "LOW",
      reasons,
      executed: false,
      matches: [],
    };
  }

  let risk: RegexReport["risk"] = "LOW";
  if (NESTED_QUANTIFIER.test(pattern)) {
    risk = "HIGH";
    reasons.push("Nested quantifiers such as (a+)+ cause exponential backtracking on crafted input.");
  }
  if (DUPLICATE_ALTERNATION.test(pattern)) {
    risk = "HIGH";
    reasons.push("Quantified alternation with identical branches, such as (a|a)*, is ambiguous and can backtrack exponentially.");
  }
  if (ADJACENT_WILDCARDS.test(pattern)) {
    if (risk === "LOW") risk = "MEDIUM";
    reasons.push("Adjacent greedy wildcards can backtrack in quadratic time.");
  }
  if (reasons.length === 0) reasons.push("No known catastrophic-backtracking shapes detected (heuristic, not a proof).");

  if (risk === "HIGH") {
    return {
      valid: true,
      risk,
      reasons,
      executed: false,
      matches: [],
      note: "Execution was skipped so this page cannot hang. Rewrite the pattern with atomic or possessive-style structure, bounded quantifiers, or a linear-time engine such as RE2.",
    };
  }

  const cap = risk === "MEDIUM" ? 2000 : 20000;
  const text = sample.length > cap ? sample.slice(0, cap) : sample;
  const matches: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = compiled.exec(text)) !== null && matches.length < 50) {
    matches.push(m[0]);
    if (m[0].length === 0) compiled.lastIndex++;
  }
  return {
    valid: true,
    risk,
    reasons,
    executed: true,
    matches,
    note: sample.length > cap ? `Sample truncated to ${cap} characters for safety.` : undefined,
  };
}

/* -------------------------------------------------------------------------- */
/* IaC misconfiguration linter                                                */
/* -------------------------------------------------------------------------- */

export type IacKind = "dockerfile" | "kubernetes" | "terraform" | "unknown";

export interface IacFinding {
  id: string;
  severity: Severity;
  line: number;
  message: string;
  fix: string;
}

interface LineRule {
  id: string;
  severity: Severity;
  test: RegExp;
  message: string;
  fix: string;
}

export function detectIacKind(source: string): IacKind {
  if (/^\s*FROM\s+\S+/im.test(source)) return "dockerfile";
  if (/^\s*apiVersion:/m.test(source) && /^\s*kind:/m.test(source)) return "kubernetes";
  if (/\bresource\s+"[\w-]+"\s+"[\w-]+"/.test(source)) return "terraform";
  return "unknown";
}

const DOCKER_RULES: LineRule[] = [
  { id: "DF001", severity: "MEDIUM", test: /^\s*FROM\s+[^\s:@]+(\s|$)/i, message: "Base image has no tag or digest, so builds are not reproducible.", fix: "Pin a specific version or an immutable digest (image@sha256:...)." },
  { id: "DF002", severity: "MEDIUM", test: /^\s*FROM\s+\S+:latest\b/i, message: "Base image uses the mutable ':latest' tag.", fix: "Pin a specific version or digest." },
  { id: "DF003", severity: "MEDIUM", test: /^\s*ADD\s+https?:\/\//i, message: "ADD fetches a remote URL without integrity verification.", fix: "Use curl/wget with checksum verification, or COPY a verified artifact." },
  { id: "DF004", severity: "HIGH", test: /(curl|wget)[^|\n]*\|\s*(sudo\s+)?(sh|bash)\b/i, message: "Piping a download straight into a shell executes unverified code.", fix: "Download, verify a checksum or signature, then execute." },
  { id: "DF005", severity: "HIGH", test: /^\s*(ENV|ARG)\s+\w*(PASSWORD|SECRET|TOKEN|API_?KEY)\w*[=\s]\S+/i, message: "Secret-looking value baked into an image layer.", fix: "Use BuildKit secrets or inject at runtime from a secret manager." },
  { id: "DF006", severity: "MEDIUM", test: /chmod\s+(-R\s+)?0?777/i, message: "World-writable permissions (chmod 777).", fix: "Grant the minimum required permissions." },
];

const K8S_RULES: LineRule[] = [
  { id: "K8S001", severity: "CRITICAL", test: /^\s*privileged:\s*true\b/, message: "Privileged container has near-host-level access.", fix: "Set privileged: false and grant only the specific capabilities needed." },
  { id: "K8S002", severity: "HIGH", test: /^\s*host(Network|PID|IPC):\s*true\b/, message: "Pod shares a host namespace, weakening isolation.", fix: "Remove hostNetwork / hostPID / hostIPC." },
  { id: "K8S003", severity: "HIGH", test: /^\s*allowPrivilegeEscalation:\s*true\b/, message: "Processes may gain more privileges than their parent.", fix: "Set allowPrivilegeEscalation: false." },
  { id: "K8S004", severity: "HIGH", test: /^\s*runAsUser:\s*0\b/, message: "Container runs as root (UID 0).", fix: "Run as a non-root UID and set runAsNonRoot: true." },
  { id: "K8S005", severity: "MEDIUM", test: /^\s*image:\s*\S+:latest\b/, message: "Image uses the mutable ':latest' tag.", fix: "Pin a version tag or digest." },
  { id: "K8S006", severity: "HIGH", test: /^\s*-\s*(SYS_ADMIN|ALL|NET_ADMIN)\b/, message: "Dangerous Linux capability added.", fix: "Drop ALL capabilities and add back only what is required." },
  { id: "K8S007", severity: "MEDIUM", test: /^\s*hostPath:/, message: "hostPath volume exposes the node filesystem.", fix: "Prefer emptyDir, PersistentVolumes, or ConfigMaps/Secrets." },
];

const TF_RULES: LineRule[] = [
  { id: "TF001", severity: "CRITICAL", test: /\bacl\s*=\s*"public-read(-write)?"/, message: "Storage bucket ACL grants public access.", fix: "Use a private ACL and an explicit bucket policy; enable Block Public Access." },
  { id: "TF002", severity: "HIGH", test: /cidr_blocks\s*=\s*\[[^\]]*"0\.0\.0\.0\/0"/, message: "Rule is open to the entire internet (0.0.0.0/0).", fix: "Restrict to known CIDR ranges or security-group references." },
  { id: "TF003", severity: "HIGH", test: /\b(storage_)?encrypted\s*=\s*false\b/, message: "Encryption at rest is disabled.", fix: "Set encrypted = true with a customer-managed KMS key where appropriate." },
  { id: "TF004", severity: "HIGH", test: /publicly_accessible\s*=\s*true\b/, message: "Database instance is publicly accessible.", fix: "Set publicly_accessible = false and use private subnets." },
  { id: "TF005", severity: "HIGH", test: /"?(Action|Principal)"?\s*[:=]\s*"\*"/, message: "Wildcard IAM Action or Principal.", fix: "Scope to the specific actions and principals required (least privilege)." },
  { id: "TF006", severity: "CRITICAL", test: /\b(access_key|secret_key|password|token)\s*=\s*"[^"$]{4,}"/i, message: "Hard-coded credential in configuration.", fix: "Use variables sourced from a secret manager; never commit credentials." },
  { id: "TF007", severity: "MEDIUM", test: /block_public_(acls|policy)\s*=\s*false\b/, message: "Public access block is disabled.", fix: "Enable all four Block Public Access settings." },
];

export function lintIac(source: string, kind: IacKind = detectIacKind(source)): { kind: IacKind; findings: IacFinding[] } {
  const rules = kind === "dockerfile" ? DOCKER_RULES : kind === "kubernetes" ? K8S_RULES : kind === "terraform" ? TF_RULES : [];
  const findings: IacFinding[] = [];
  const lines = source.split(/\r?\n/);
  lines.forEach((text, index) => {
    if (/^\s*#/.test(text)) return;
    for (const rule of rules) {
      if (rule.test.test(text)) {
        findings.push({ id: rule.id, severity: rule.severity, line: index + 1, message: rule.message, fix: rule.fix });
      }
    }
  });

  if (kind === "dockerfile" && !/^\s*USER\s+(?!root\b)\S+/im.test(source)) {
    findings.push({ id: "DF007", severity: "MEDIUM", line: 0, message: "No non-root USER instruction: the container runs as root by default.", fix: "Add a USER instruction with an unprivileged account." });
  }
  if (kind === "kubernetes" && /^\s*kind:\s*(Deployment|Pod|StatefulSet|DaemonSet|Job|CronJob)\b/m.test(source)) {
    if (!/runAsNonRoot:\s*true/.test(source)) {
      findings.push({ id: "K8S008", severity: "MEDIUM", line: 0, message: "runAsNonRoot is not enforced.", fix: "Set securityContext.runAsNonRoot: true." });
    }
    if (!/\blimits:/.test(source)) {
      findings.push({ id: "K8S009", severity: "LOW", line: 0, message: "No resource limits: a noisy or compromised pod can starve the node.", fix: "Define CPU and memory limits." });
    }
  }
  const order: Record<Severity, number> = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3, INFO: 4 };
  findings.sort((a, b) => order[a.severity] - order[b.severity] || a.line - b.line);
  return { kind, findings };
}

/* -------------------------------------------------------------------------- */
/* SPF / DKIM / DMARC record checker                                          */
/* -------------------------------------------------------------------------- */

export interface EmailAuthReport {
  type: "SPF" | "DMARC" | "DKIM" | "UNKNOWN";
  tags: Record<string, string>;
  findings: Finding[];
}

export function analyzeEmailAuthRecord(raw: string): EmailAuthReport {
  const record = raw.trim().replace(/^"|"$/g, "").replace(/"\s*"/g, "");
  const findings: Finding[] = [];
  const tags: Record<string, string> = {};

  if (/^v=spf1\b/i.test(record)) {
    const terms = record.split(/\s+/).slice(1);
    let lookups = 0;
    for (const term of terms) {
      const t = term.toLowerCase();
      if (/^[+~?-]?(include:|a\b|mx\b|ptr\b|exists:)/.test(t) || t.startsWith("redirect=")) lookups++;
      if (t.startsWith("ptr") || t.includes("ptr:")) {
        findings.push({ severity: "MEDIUM", message: "The 'ptr' mechanism is deprecated, slow, and discouraged by RFC 7208." });
      }
    }
    const all = terms.find((t) => /^[+~?-]?all$/i.test(t));
    tags.all = all ?? "(none)";
    tags.dnsLookups = String(lookups);
    if (!all && !terms.some((t) => t.toLowerCase().startsWith("redirect="))) {
      findings.push({ severity: "MEDIUM", message: "No terminating 'all' mechanism or redirect." });
    } else if (all) {
      const q = all.startsWith("+") || all.toLowerCase() === "all" ? "+" : all[0];
      if (q === "+") findings.push({ severity: "CRITICAL", message: "'+all' authorises every host on the internet to send as this domain." });
      else if (q === "?") findings.push({ severity: "HIGH", message: "'?all' is neutral and provides no protection." });
      else if (q === "~") findings.push({ severity: "LOW", message: "'~all' is a soft-fail. Consider '-all' once all legitimate senders are covered." });
      else findings.push({ severity: "INFO", message: "'-all' hard-fail policy is in place." });
    }
    if (lookups > 10) {
      findings.push({ severity: "HIGH", message: `Approximately ${lookups} DNS-lookup mechanisms: SPF allows at most 10, beyond which evaluation fails with PermError (includes may add more).` });
    }
    return { type: "SPF", tags, findings };
  }

  if (/^v=DMARC1\b/i.test(record)) {
    for (const part of record.split(";")) {
      const [k, ...rest] = part.trim().split("=");
      if (k && rest.length) tags[k.trim().toLowerCase()] = rest.join("=").trim();
    }
    const p = (tags.p ?? "").toLowerCase();
    if (!p) findings.push({ severity: "HIGH", message: "Missing required 'p' policy tag." });
    else if (p === "none") findings.push({ severity: "MEDIUM", message: "p=none only monitors. Move to quarantine, then reject, once reports look clean." });
    else if (p === "quarantine") findings.push({ severity: "LOW", message: "p=quarantine is good progress; p=reject gives the strongest protection." });
    else if (p === "reject") findings.push({ severity: "INFO", message: "p=reject is the strongest policy." });
    if (tags.pct && Number(tags.pct) < 100) findings.push({ severity: "MEDIUM", message: `pct=${tags.pct}: the policy is applied to only part of the mail stream.` });
    if (!tags.rua) findings.push({ severity: "LOW", message: "No 'rua' aggregate report address: you will not see who is sending as your domain." });
    if (tags.sp && tags.sp.toLowerCase() === "none" && p !== "none") findings.push({ severity: "MEDIUM", message: "Subdomain policy sp=none weakens enforcement for subdomains." });
    return { type: "DMARC", tags, findings };
  }

  if (/v=DKIM1|\bp=[A-Za-z0-9+/=]*/.test(record) && /\bp=/.test(record)) {
    for (const part of record.split(";")) {
      const [k, ...rest] = part.trim().split("=");
      if (k && rest.length) tags[k.trim().toLowerCase()] = rest.join("=").trim();
    }
    const key = (tags.p ?? "").replace(/\s+/g, "");
    if (!key) {
      findings.push({ severity: "INFO", message: "Empty p= tag: this key has been revoked." });
    } else {
      try {
        const bytes = atob(key).length;
        const approx = bytes < 180 ? "about 1024-bit or smaller" : bytes < 400 ? "about 2048-bit" : "3072-bit or larger";
        tags.keyEstimate = approx;
        if (bytes < 180) findings.push({ severity: "HIGH", message: "RSA key appears to be 1024-bit or smaller. Use 2048-bit or larger." });
        else findings.push({ severity: "INFO", message: `Key size estimate: ${approx}.` });
      } catch {
        findings.push({ severity: "HIGH", message: "Public key (p=) is not valid base64." });
      }
    }
    if ((tags.k ?? "rsa").toLowerCase() !== "rsa" && (tags.k ?? "").toLowerCase() !== "ed25519") {
      findings.push({ severity: "LOW", message: `Unusual key type k=${tags.k}.` });
    }
    if (tags.t && tags.t.includes("y")) findings.push({ severity: "MEDIUM", message: "t=y marks DKIM as being in test mode; verifiers may ignore failures." });
    return { type: "DKIM", tags, findings };
  }

  return {
    type: "UNKNOWN",
    tags,
    findings: [{ severity: "INFO", message: "Record not recognised. Paste an SPF (v=spf1), DMARC (v=DMARC1), or DKIM (v=DKIM1) TXT record." }],
  };
}

/* -------------------------------------------------------------------------- */
/* STRIDE threat-model generator                                              */
/* -------------------------------------------------------------------------- */

export type ElementKind = "process" | "datastore" | "external";
export type StrideCategory =
  | "Spoofing"
  | "Tampering"
  | "Repudiation"
  | "Information Disclosure"
  | "Denial of Service"
  | "Elevation of Privilege";

export interface TmElement {
  id: string;
  name: string;
  kind: ElementKind;
  zone: string;
}

export interface TmFlow {
  id: string;
  from: string;
  to: string;
  label: string;
}

export interface Threat {
  category: StrideCategory;
  target: string;
  title: string;
  mitigation: string;
  priority: "High" | "Medium" | "Low";
}

const TEMPLATES: Record<StrideCategory, { title: (t: string) => string; mitigation: string }> = {
  Spoofing: {
    title: (t) => `An attacker impersonates ${t}`,
    mitigation: "Strong mutual authentication (mTLS, OIDC, MFA); never trust caller-supplied identity.",
  },
  Tampering: {
    title: (t) => `Data handled by ${t} is modified without detection`,
    mitigation: "Integrity protection (TLS, signatures, checksums), strict input validation, parameterised queries.",
  },
  Repudiation: {
    title: (t) => `Actions involving ${t} cannot be attributed`,
    mitigation: "Tamper-evident audit logging with identity, timestamp, and request correlation.",
  },
  "Information Disclosure": {
    title: (t) => `Sensitive data is exposed through ${t}`,
    mitigation: "Encrypt in transit and at rest, minimise data collected, enforce least-privilege access and safe error handling.",
  },
  "Denial of Service": {
    title: (t) => `${t} is exhausted or made unavailable`,
    mitigation: "Rate limiting, quotas, timeouts, back-pressure, and capacity monitoring.",
  },
  "Elevation of Privilege": {
    title: (t) => `An attacker gains unauthorised privileges via ${t}`,
    mitigation: "Server-side authorisation on every request, least privilege, sandboxing, and dependency patching.",
  },
};

const APPLICABLE: Record<ElementKind | "flow", StrideCategory[]> = {
  process: ["Spoofing", "Tampering", "Repudiation", "Information Disclosure", "Denial of Service", "Elevation of Privilege"],
  datastore: ["Tampering", "Repudiation", "Information Disclosure", "Denial of Service"],
  external: ["Spoofing", "Repudiation"],
  flow: ["Tampering", "Information Disclosure", "Denial of Service"],
};

const UNTRUSTED_ZONE = /internet|public|untrusted|external|client/i;

export function generateThreats(elements: TmElement[], flows: TmFlow[]): Threat[] {
  const byId = new Map(elements.map((e) => [e.id, e]));
  const threats: Threat[] = [];

  for (const el of elements) {
    for (const category of APPLICABLE[el.kind]) {
      const priority: Threat["priority"] = UNTRUSTED_ZONE.test(el.zone)
        ? "High"
        : el.kind === "external"
          ? "Low"
          : "Medium";
      threats.push({
        category,
        target: el.name,
        title: TEMPLATES[category].title(el.name),
        mitigation: TEMPLATES[category].mitigation,
        priority,
      });
    }
  }

  for (const flow of flows) {
    const from = byId.get(flow.from);
    const to = byId.get(flow.to);
    if (!from || !to) continue;
    const crossesBoundary = from.zone.trim().toLowerCase() !== to.zone.trim().toLowerCase();
    const target = `${from.name} → ${to.name}${flow.label ? ` (${flow.label})` : ""}`;
    for (const category of APPLICABLE.flow) {
      threats.push({
        category,
        target,
        title: TEMPLATES[category].title(`the flow ${target}`),
        mitigation: TEMPLATES[category].mitigation,
        priority: crossesBoundary ? "High" : "Low",
      });
    }
  }

  const order = { High: 0, Medium: 1, Low: 2 } as const;
  return threats.sort((a, b) => order[a.priority] - order[b.priority]);
}

export function threatModelMarkdown(name: string, elements: TmElement[], flows: TmFlow[], threats: Threat[]): string {
  const lines: string[] = [`# Threat Model: ${name || "Untitled system"}`, "", "_Generated with the CODE.COMMIT STRIDE builder. Candidate threats require human review._", "", "## Elements", ""];
  for (const e of elements) lines.push(`- **${e.name}** — ${e.kind}, zone: ${e.zone}`);
  lines.push("", "## Data flows", "");
  const byId = new Map(elements.map((e) => [e.id, e]));
  for (const f of flows) lines.push(`- ${byId.get(f.from)?.name ?? "?"} → ${byId.get(f.to)?.name ?? "?"}${f.label ? ` (${f.label})` : ""}`);
  lines.push("", "## Candidate threats", "", "| Priority | Category | Target | Mitigation |", "| --- | --- | --- | --- |");
  for (const t of threats) lines.push(`| ${t.priority} | ${t.category} | ${t.target} | ${t.mitigation} |`);
  return lines.join("\n");
}
