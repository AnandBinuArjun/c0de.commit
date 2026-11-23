export interface HeaderEvaluationFinding {
  header: string;
  status: "PASS" | "WARN" | "MISSING";
  detail: string;
}

export interface HeaderEvaluationReport {
  score: number;
  grade: "A+" | "A" | "B" | "C" | "D";
  findings: HeaderEvaluationFinding[];
}

/**
 * Pure client-side HTTP security header & CSP evaluator.
 * Zero network egress.
 */
export function evaluateSecurityHeaders(rawHeadersInput: string): HeaderEvaluationReport {
  const lines = rawHeadersInput
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const headerMap = new Map<string, string>();
  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim().toLowerCase();
      const val = line.slice(colonIdx + 1).trim();
      headerMap.set(key, val);
    }
  }

  const findings: HeaderEvaluationFinding[] = [];
  let score = 0;

  // 1. Content-Security-Policy (30 pts)
  const csp = headerMap.get("content-security-policy");
  if (!csp) {
    findings.push({
      header: "Content-Security-Policy",
      status: "MISSING",
      detail: "Missing CSP header. Define default-src 'self' and frame-ancestors 'none'.",
    });
  } else if (csp.includes("unsafe-eval") || csp.includes("*")) {
    score += 15;
    findings.push({
      header: "Content-Security-Policy",
      status: "WARN",
      detail: "CSP is present but contains permissive directives ('unsafe-eval' or wildcard '*').",
    });
  } else {
    score += 30;
    findings.push({
      header: "Content-Security-Policy",
      status: "PASS",
      detail: "Strict Content-Security-Policy detected without wildcards.",
    });
  }

  // 2. Strict-Transport-Security (20 pts)
  const hsts = headerMap.get("strict-transport-security");
  if (!hsts) {
    findings.push({
      header: "Strict-Transport-Security",
      status: "MISSING",
      detail: "Missing HSTS header. Enforce max-age=63072000; includeSubDomains; preload.",
    });
  } else if (hsts.toLowerCase().includes("max-age=")) {
    score += 20;
    findings.push({
      header: "Strict-Transport-Security",
      status: "PASS",
      detail: "HSTS max-age enforcement verified.",
    });
  } else {
    score += 10;
    findings.push({
      header: "Strict-Transport-Security",
      status: "WARN",
      detail: "HSTS header present but missing explicit max-age directive.",
    });
  }

  // 3. X-Content-Type-Options (15 pts)
  const xcto = headerMap.get("x-content-type-options");
  if (xcto?.toLowerCase() === "nosniff") {
    score += 15;
    findings.push({
      header: "X-Content-Type-Options",
      status: "PASS",
      detail: "MIME-sniffing protection ('nosniff') active.",
    });
  } else {
    findings.push({
      header: "X-Content-Type-Options",
      status: "MISSING",
      detail: "Set X-Content-Type-Options: nosniff to prevent MIME confusion attacks.",
    });
  }

  // 4. X-Frame-Options (15 pts)
  const xfo = headerMap.get("x-frame-options");
  if (xfo && ["deny", "sameorigin"].includes(xfo.toLowerCase())) {
    score += 15;
    findings.push({
      header: "X-Frame-Options",
      status: "PASS",
      detail: `Clickjacking frame protection (${xfo.toUpperCase()}) verified.`,
    });
  } else {
    findings.push({
      header: "X-Frame-Options",
      status: "MISSING",
      detail: "Set X-Frame-Options: DENY (or frame-ancestors 'none' in CSP).",
    });
  }

  // 5. Referrer-Policy (10 pts)
  const refPol = headerMap.get("referrer-policy");
  if (refPol) {
    score += 10;
    findings.push({
      header: "Referrer-Policy",
      status: "PASS",
      detail: `Referrer leakage governed via '${refPol}'.`,
    });
  } else {
    findings.push({
      header: "Referrer-Policy",
      status: "MISSING",
      detail: "Add Referrer-Policy: strict-origin-when-cross-origin.",
    });
  }

  // 6. Permissions-Policy (10 pts)
  const permPol = headerMap.get("permissions-policy");
  if (permPol) {
    score += 10;
    findings.push({
      header: "Permissions-Policy",
      status: "PASS",
      detail: "Browser feature permissions restricted via Permissions-Policy.",
    });
  } else {
    findings.push({
      header: "Permissions-Policy",
      status: "MISSING",
      detail: "Restrict sensitive browser APIs (camera=(), microphone=(), geolocation=()).",
    });
  }

  const grade: HeaderEvaluationReport["grade"] =
    score >= 95 ? "A+" : score >= 85 ? "A" : score >= 70 ? "B" : score >= 50 ? "C" : "D";

  return { score, grade, findings };
}

export interface EntropyReport {
  length: number;
  charsetSize: number;
  entropyBits: number;
  strengthLabel: "CRITICAL WEAKNESS" | "MODERATE" | "STRONG" | "CRYPTOGRAPHIC GRADE";
  argon2idRecommendation: string;
}

/**
 * Pure client-side Shannon/pool password entropy & OWASP Argon2id parameter calculator.
 * Never transmits input over the network.
 */
export function calculatePasswordEntropy(sample: string): EntropyReport {
  const length = sample.length;
  if (length === 0) {
    return {
      length: 0,
      charsetSize: 0,
      entropyBits: 0,
      strengthLabel: "CRITICAL WEAKNESS",
      argon2idRecommendation: "m=47104 (46 MiB), t=1, p=1 (OWASP ASVS Minimum Baseline)",
    };
  }

  let pool = 0;
  if (/[a-z]/.test(sample)) pool += 26;
  if (/[A-Z]/.test(sample)) pool += 26;
  if (/[0-9]/.test(sample)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(sample)) pool += 32;

  const entropyBits = Math.round(length * Math.log2(Math.max(pool, 2)));
  const strengthLabel: EntropyReport["strengthLabel"] =
    entropyBits >= 96
      ? "CRYPTOGRAPHIC GRADE"
      : entropyBits >= 72
      ? "STRONG"
      : entropyBits >= 48
      ? "MODERATE"
      : "CRITICAL WEAKNESS";

  return {
    length,
    charsetSize: pool,
    entropyBits,
    strengthLabel,
    argon2idRecommendation: "Argon2id: m=47104 (46 MiB), t=1, p=1, salt=16 bytes random + KMS pepper",
  };
}

export interface DefangReport {
  defangedText: string;
  extractedUrls: string[];
  extractedIps: string[];
  extractedCves: string[];
}

/**
 * Pure client-side CTI IOC Defanger & Atomic Indicator Extractor.
 */
export function defangAndExtractIocs(rawText: string): DefangReport {
  const urlMatches = rawText.match(/https?:\/\/[^\s"'<>]+/gi) || [];
  const ipMatches = rawText.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) || [];
  const cveMatches = rawText.match(/\bCVE-\d{4}-\d{4,7}\b/gi) || [];

  const defangedText = rawText
    .replace(/https:\/\//gi, "hxxps[://]")
    .replace(/http:\/\//gi, "hxxp[://]")
    .replace(/\b(\d{1,3}\.\d{1,3}\.\d{1,3})\.(\d{1,3})\b/g, "$1[.]$2")
    .replace(/([a-zA-Z0-9-]+)\.([a-zA-Z]{2,10})\b/g, "$1[.]$2");

  return {
    defangedText,
    extractedUrls: Array.from(new Set(urlMatches)),
    extractedIps: Array.from(new Set(ipMatches)),
    extractedCves: Array.from(new Set(cveMatches.map((c) => c.toUpperCase()))),
  };
}
