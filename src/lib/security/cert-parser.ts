/**
 * Minimal, dependency-free X.509 PEM decoder for the CODE.COMMIT lab.
 * Parses the fields needed for a quick TLS hygiene review. It does NOT
 * validate chains or signatures.
 */
import type { Finding } from "@/lib/security/lab-engine";

interface Tlv {
  tag: number;
  start: number; // content start
  end: number; // content end
}

export interface CertReport {
  ok: boolean;
  error?: string;
  version?: number;
  serialHex?: string;
  subject?: string;
  issuer?: string;
  notBefore?: string;
  notAfter?: string;
  daysRemaining?: number;
  signatureAlgorithm?: string;
  keyAlgorithm?: string;
  keyBits?: number;
  curve?: string;
  sans: string[];
  selfSigned?: boolean;
  findings: Finding[];
}

const OID_NAMES: Record<string, string> = {
  "2.5.4.3": "CN",
  "2.5.4.6": "C",
  "2.5.4.7": "L",
  "2.5.4.8": "ST",
  "2.5.4.10": "O",
  "2.5.4.11": "OU",
};

const SIG_ALGS: Record<string, string> = {
  "1.2.840.113549.1.1.4": "md5WithRSAEncryption",
  "1.2.840.113549.1.1.5": "sha1WithRSAEncryption",
  "1.2.840.113549.1.1.11": "sha256WithRSAEncryption",
  "1.2.840.113549.1.1.12": "sha384WithRSAEncryption",
  "1.2.840.113549.1.1.13": "sha512WithRSAEncryption",
  "1.2.840.113549.1.1.10": "RSASSA-PSS",
  "1.2.840.10045.4.3.2": "ecdsa-with-SHA256",
  "1.2.840.10045.4.3.3": "ecdsa-with-SHA384",
  "1.2.840.10045.4.3.4": "ecdsa-with-SHA512",
  "1.3.101.112": "Ed25519",
};

const CURVES: Record<string, string> = {
  "1.2.840.10045.3.1.7": "P-256",
  "1.3.132.0.34": "P-384",
  "1.3.132.0.35": "P-521",
};

function readTlv(b: Uint8Array, pos: number): Tlv {
  if (pos + 2 > b.length) throw new Error("Truncated DER structure.");
  const tag = b[pos];
  let len = b[pos + 1];
  let offset = pos + 2;
  if (len & 0x80) {
    const n = len & 0x7f;
    if (n === 0 || n > 4) throw new Error("Unsupported DER length encoding.");
    len = 0;
    for (let i = 0; i < n; i++) len = len * 256 + b[offset++];
  }
  const end = offset + len;
  if (end > b.length) throw new Error("Truncated DER structure.");
  return { tag, start: offset, end };
}

function children(b: Uint8Array, t: Tlv): Tlv[] {
  const out: Tlv[] = [];
  let p = t.start;
  while (p < t.end) {
    const c = readTlv(b, p);
    out.push(c);
    p = c.end;
  }
  return out;
}

function oidOf(b: Uint8Array, t: Tlv): string {
  const parts: number[] = [];
  let value = 0;
  for (let i = t.start; i < t.end; i++) {
    value = value * 128 + (b[i] & 0x7f);
    if (!(b[i] & 0x80)) {
      parts.push(value);
      value = 0;
    }
  }
  if (parts.length === 0) return "";
  const first = parts[0];
  const head = first < 80 ? [Math.floor(first / 40), first % 40] : [2, first - 80];
  return [...head, ...parts.slice(1)].join(".");
}

function textOf(b: Uint8Array, t: Tlv): string {
  const slice = b.slice(t.start, t.end);
  return new TextDecoder(t.tag === 0x1e ? "utf-16be" : "utf-8").decode(slice);
}

function timeOf(b: Uint8Array, t: Tlv): Date {
  const s = textOf(b, t);
  let y: number;
  let rest: string;
  if (t.tag === 0x17) {
    const yy = Number(s.slice(0, 2));
    y = yy >= 50 ? 1900 + yy : 2000 + yy;
    rest = s.slice(2);
  } else {
    y = Number(s.slice(0, 4));
    rest = s.slice(4);
  }
  const mo = Number(rest.slice(0, 2));
  const d = Number(rest.slice(2, 4));
  const h = Number(rest.slice(4, 6));
  const mi = Number(rest.slice(6, 8));
  const se = Number(rest.slice(8, 10)) || 0;
  return new Date(Date.UTC(y, mo - 1, d, h, mi, se));
}

function nameOf(b: Uint8Array, t: Tlv): string {
  const rdns: string[] = [];
  for (const set of children(b, t)) {
    for (const atv of children(b, set)) {
      const [oid, value] = children(b, atv);
      if (!oid || !value) continue;
      const key = oidOf(b, oid);
      rdns.push(`${OID_NAMES[key] ?? key}=${textOf(b, value)}`);
    }
  }
  return rdns.join(", ");
}

function pemToDer(pem: string): Uint8Array {
  const match = /-----BEGIN CERTIFICATE-----([\s\S]*?)-----END CERTIFICATE-----/.exec(pem);
  if (!match) throw new Error("No PEM-encoded certificate block found.");
  const binary = atob(match[1].replace(/\s+/g, ""));
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

export function decodeCertificate(pem: string, now: Date = new Date()): CertReport {
  const findings: Finding[] = [];
  try {
    const b = pemToDer(pem);
    const root = readTlv(b, 0);
    const [tbs] = children(b, root);
    const kids = children(b, tbs);
    let i = 0;
    let version = 1;
    if (kids[0].tag === 0xa0) {
      const v = children(b, kids[0])[0];
      version = b[v.end - 1] + 1;
      i = 1;
    }
    const serial = kids[i];
    const sigAlgSeq = kids[i + 1];
    const issuerT = kids[i + 2];
    const validityT = kids[i + 3];
    const subjectT = kids[i + 4];
    const spki = kids[i + 5];

    let serialHex = Array.from(b.slice(serial.start, serial.end), (x) => x.toString(16).padStart(2, "0")).join(":");
    if (serialHex.length === 0) serialHex = "00";

    const sigOid = oidOf(b, children(b, sigAlgSeq)[0]);
    const signatureAlgorithm = SIG_ALGS[sigOid] ?? sigOid;
    const issuer = nameOf(b, issuerT);
    const subject = nameOf(b, subjectT);
    const [nb, na] = children(b, validityT);
    const notBefore = timeOf(b, nb);
    const notAfter = timeOf(b, na);
    const daysRemaining = Math.floor((notAfter.getTime() - now.getTime()) / 86400000);

    const [algSeq, keyBits] = children(b, spki);
    const algKids = children(b, algSeq);
    const keyOid = oidOf(b, algKids[0]);
    let keyAlgorithm = keyOid;
    let bits: number | undefined;
    let curve: string | undefined;
    if (keyOid === "1.2.840.113549.1.1.1") {
      keyAlgorithm = "RSA";
      const inner = readTlv(b, keyBits.start + 1);
      const modulus = children(b, inner)[0];
      let len = modulus.end - modulus.start;
      if (b[modulus.start] === 0) len -= 1;
      bits = len * 8;
    } else if (keyOid === "1.2.840.10045.2.1") {
      keyAlgorithm = "EC";
      if (algKids[1]) curve = CURVES[oidOf(b, algKids[1])] ?? oidOf(b, algKids[1]);
    } else if (keyOid === "1.3.101.112") {
      keyAlgorithm = "Ed25519";
    }

    const sans: string[] = [];
    const extWrapper = kids.find((k) => k.tag === 0xa3);
    if (extWrapper) {
      const extSeq = children(b, extWrapper)[0];
      for (const ext of children(b, extSeq)) {
        const parts = children(b, ext);
        if (oidOf(b, parts[0]) === "2.5.29.17") {
          const octet = parts[parts.length - 1];
          const names = children(b, readTlv(b, octet.start));
          for (const n of names) {
            if (n.tag === 0x82) sans.push(textOf(b, n));
          }
        }
      }
    }

    const selfSigned = issuer === subject;

    if (daysRemaining < 0) findings.push({ severity: "CRITICAL", message: `Certificate expired ${Math.abs(daysRemaining)} day(s) ago.` });
    else if (daysRemaining < 30) findings.push({ severity: "MEDIUM", message: `Certificate expires in ${daysRemaining} day(s). Renew soon.` });
    if (/md5|sha1/i.test(signatureAlgorithm)) findings.push({ severity: "HIGH", message: `Weak signature algorithm: ${signatureAlgorithm}.` });
    if (keyAlgorithm === "RSA" && bits !== undefined && bits < 2048) findings.push({ severity: "HIGH", message: `RSA key is only ${bits} bits. Use 2048 or larger.` });
    if (sans.length === 0) findings.push({ severity: "MEDIUM", message: "No Subject Alternative Name: modern clients ignore the Common Name for hostname matching." });
    if (selfSigned) findings.push({ severity: "INFO", message: "Self-signed (issuer equals subject). Not trusted by public clients." });
    const validityDays = Math.round((notAfter.getTime() - notBefore.getTime()) / 86400000);
    if (validityDays > 398) findings.push({ severity: "INFO", message: `Validity is ${validityDays} days. Publicly trusted TLS certificates are limited to 398 days or fewer.` });
    findings.push({ severity: "INFO", message: "Decoded locally. Chain and signature validity are not checked." });

    return {
      ok: true,
      version,
      serialHex,
      subject,
      issuer,
      notBefore: notBefore.toISOString(),
      notAfter: notAfter.toISOString(),
      daysRemaining,
      signatureAlgorithm,
      keyAlgorithm,
      keyBits: bits,
      curve,
      sans,
      selfSigned,
      findings,
    };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Unable to decode certificate.",
      sans: [],
      findings,
    };
  }
}
