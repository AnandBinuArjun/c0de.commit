import { describe, it, expect } from "vitest";
import {
  calculateCvss31,
  parseCvssVector,
  DEFAULT_CVSS,
  inspectJwt,
  transformEncoding,
  identifyHash,
  digestHex,
  analyzeRegex,
  lintIac,
  detectIacKind,
  analyzeEmailAuthRecord,
  generateThreats,
  threatModelMarkdown,
} from "@/lib/security/lab-engine";

describe("CVSS 3.1 calculator", () => {
  it("scores the canonical critical vector at 9.8", () => {
    expect(calculateCvss31(DEFAULT_CVSS).base).toBe(9.8);
  });
  it("scores a scope-changed XSS-style vector at 6.1", () => {
    const m = parseCvssVector("CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N");
    expect(m).not.toBeNull();
    expect(calculateCvss31(m!).base).toBe(6.1);
  });
  it("scores no impact as 0 / None", () => {
    const r = calculateCvss31({ ...DEFAULT_CVSS, C: "N", I: "N", A: "N" });
    expect(r.base).toBe(0);
    expect(r.severity).toBe("None");
  });
  it("rejects malformed vectors", () => {
    expect(parseCvssVector("CVSS:3.1/AV:X")).toBeNull();
  });
});

function b64url(obj: unknown): string {
  return btoa(JSON.stringify(obj)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

describe("JWT inspector", () => {
  it("decodes claims and flags a missing exp", () => {
    const token = `${b64url({ alg: "HS256", typ: "JWT" })}.${b64url({ sub: "1" })}.sig`;
    const r = inspectJwt(token);
    expect(r.valid).toBe(true);
    expect(r.payload?.sub).toBe("1");
    expect(r.findings.some((f) => f.message.includes("exp"))).toBe(true);
  });
  it("flags alg none as critical", () => {
    const token = `${b64url({ alg: "none" })}.${b64url({ sub: "1" })}.`;
    const r = inspectJwt(token);
    expect(r.findings.some((f) => f.severity === "CRITICAL")).toBe(true);
  });
  it("flags expired tokens", () => {
    const token = `${b64url({ alg: "RS256" })}.${b64url({ exp: 1000 })}.sig`;
    expect(inspectJwt(token).findings.some((f) => f.message.includes("expired"))).toBe(true);
  });
  it("rejects malformed input", () => {
    expect(inspectJwt("abc").valid).toBe(false);
  });
});

describe("encoding workbench", () => {
  it("round-trips base64, hex and url encodings", () => {
    const enc = transformEncoding("base64-encode", "héllo");
    expect(transformEncoding("base64-decode", enc.output).output).toBe("héllo");
    expect(transformEncoding("hex-encode", "hi").output).toBe("6869");
    expect(transformEncoding("hex-decode", "6869").output).toBe("hi");
    expect(transformEncoding("url-decode", transformEncoding("url-encode", "a b&c").output).output).toBe("a b&c");
  });
  it("reports invalid hex", () => {
    expect(transformEncoding("hex-decode", "zz").ok).toBe(false);
  });
  it("identifies hashes and computes SHA-256", async () => {
    expect(identifyHash("a".repeat(64))[0]).toContain("SHA-256");
    expect(await digestHex("SHA-256", "abc")).toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
    );
  });
});

describe("regex analyser", () => {
  it("refuses to execute catastrophic patterns", () => {
    const r = analyzeRegex("(a+)+$", "", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!");
    expect(r.risk).toBe("HIGH");
    expect(r.executed).toBe(false);
  });
  it("executes safe patterns", () => {
    const r = analyzeRegex("\\d+", "", "a1 b22");
    expect(r.executed).toBe(true);
    expect(r.matches).toEqual(["1", "22"]);
  });
  it("reports invalid patterns", () => {
    expect(analyzeRegex("(", "", "x").valid).toBe(false);
  });
});

describe("IaC linter", () => {
  it("detects kinds", () => {
    expect(detectIacKind("FROM node:latest")).toBe("dockerfile");
    expect(detectIacKind("apiVersion: v1\nkind: Pod")).toBe("kubernetes");
    expect(detectIacKind('resource "aws_s3_bucket" "b" {}')).toBe("terraform");
  });
  it("finds Dockerfile issues", () => {
    const r = lintIac("FROM node:latest\nENV API_TOKEN=abc123\nRUN curl http://x | sh");
    const ids = r.findings.map((f) => f.id);
    expect(ids).toContain("DF002");
    expect(ids).toContain("DF004");
    expect(ids).toContain("DF005");
    expect(ids).toContain("DF007");
  });
  it("finds Kubernetes and Terraform issues", () => {
    const k = lintIac("apiVersion: v1\nkind: Pod\nspec:\n  containers:\n  - securityContext:\n      privileged: true");
    expect(k.findings.some((f) => f.id === "K8S001")).toBe(true);
    const t = lintIac('resource "aws_s3_bucket" "b" {\n  acl = "public-read"\n}');
    expect(t.findings[0].id).toBe("TF001");
  });
});

describe("email authentication checker", () => {
  it("flags +all SPF", () => {
    const r = analyzeEmailAuthRecord("v=spf1 +all");
    expect(r.type).toBe("SPF");
    expect(r.findings.some((f) => f.severity === "CRITICAL")).toBe(true);
  });
  it("assesses DMARC policy", () => {
    const r = analyzeEmailAuthRecord("v=DMARC1; p=none");
    expect(r.type).toBe("DMARC");
    expect(r.findings.some((f) => f.message.includes("monitors"))).toBe(true);
    expect(r.findings.some((f) => f.message.includes("rua"))).toBe(true);
  });
  it("recognises DKIM and unknown records", () => {
    expect(analyzeEmailAuthRecord("v=DKIM1; k=rsa; p=QUJD").type).toBe("DKIM");
    expect(analyzeEmailAuthRecord("hello").type).toBe("UNKNOWN");
  });
});

describe("STRIDE generator", () => {
  const elements = [
    { id: "u", name: "Browser", kind: "external" as const, zone: "Internet" },
    { id: "a", name: "API", kind: "process" as const, zone: "App tier" },
    { id: "d", name: "Database", kind: "datastore" as const, zone: "Data tier" },
  ];
  const flows = [
    { id: "f1", from: "u", to: "a", label: "HTTPS" },
    { id: "f2", from: "a", to: "d", label: "SQL" },
  ];
  it("generates threats per element kind and boundary crossing", () => {
    const threats = generateThreats(elements, flows);
    expect(threats.filter((t) => t.target === "API").length).toBe(6);
    expect(threats.filter((t) => t.target === "Database").length).toBe(4);
    expect(threats.filter((t) => t.target === "Browser").length).toBe(2);
    expect(threats[0].priority).toBe("High");
  });
  it("exports markdown", () => {
    const md = threatModelMarkdown("Demo", elements, flows, generateThreats(elements, flows));
    expect(md).toContain("# Threat Model: Demo");
    expect(md).toContain("| Priority |");
  });
});
