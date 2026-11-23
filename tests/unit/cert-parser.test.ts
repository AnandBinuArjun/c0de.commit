// @vitest-environment node
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { decodeCertificate } from "@/lib/security/cert-parser";

describe("X.509 certificate decoder", () => {
  const pem = readFileSync(join(__dirname, "../fixtures/test-cert.pem"), "utf8");

  it("decodes a real self-signed certificate", () => {
    const r = decodeCertificate(pem);
    expect(r.ok).toBe(true);
    expect(r.keyAlgorithm).toBe("RSA");
    expect(r.keyBits).toBe(2048);
    expect(r.subject).toContain("lab.example.test");
    expect(r.selfSigned).toBe(true);
    expect(r.sans).toContain("lab.example.test");
    expect(r.daysRemaining).toBeGreaterThan(100);
  });

  it("reports an expired certificate when evaluated in the future", () => {
    const r = decodeCertificate(pem, new Date("2040-01-01T00:00:00Z"));
    expect(r.findings.some((f) => f.severity === "CRITICAL")).toBe(true);
  });

  it("rejects input without a PEM block", () => {
    expect(decodeCertificate("nope").ok).toBe(false);
  });
});
