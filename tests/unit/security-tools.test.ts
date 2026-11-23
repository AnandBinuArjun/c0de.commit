import { describe, it, expect } from "vitest";
import {
  evaluateSecurityHeaders,
  calculatePasswordEntropy,
  defangAndExtractIocs,
} from "@/lib/security/tools-engine";
import { GET as getRssFeed } from "@/app/feed.xml/route";
import fs from "fs";
import path from "path";

describe("Zero-Egress Security Lab Utilities & RFC 9116 / RSS Endpoints", () => {
  it("grades a complete set of hardened HTTP security headers as A+ (100/100)", () => {
    const raw = [
      "Content-Security-Policy: default-src 'self'; frame-ancestors 'none'",
      "Strict-Transport-Security: max-age=63072000; includeSubDomains; preload",
      "X-Content-Type-Options: nosniff",
      "X-Frame-Options: DENY",
      "Referrer-Policy: strict-origin-when-cross-origin",
      "Permissions-Policy: camera=(), microphone=()",
    ].join("\n");

    const report = evaluateSecurityHeaders(raw);
    expect(report.score).toBe(100);
    expect(report.grade).toBe("A+");
  });

  it("calculates password entropy bits and returns Argon2id guidance", () => {
    const strong = calculatePasswordEntropy("Correct-Horse-Battery-Staple#94!");
    expect(strong.entropyBits).toBeGreaterThanOrEqual(96);
    expect(strong.strengthLabel).toBe("CRYPTOGRAPHIC GRADE");
    expect(strong.argon2idRecommendation).toContain("Argon2id");
  });

  it("defangs malicious URLs and IPv4s and extracts CVE identifiers accurately", () => {
    const raw =
      "Mirai payload fetched from http://198.51.100.42/arm7 and https://evil.example.com exploiting CVE-2024-3400";
    const res = defangAndExtractIocs(raw);
    expect(res.defangedText).toContain("hxxp[://]");
    expect(res.defangedText).toContain("hxxps[://]");
    expect(res.defangedText).toContain("198.51.100[.]42");
    expect(res.extractedCves).toContain("CVE-2024-3400");
  });

  it("provides RFC 9116 /.well-known/security.txt with Contact, Expires, and Canonical directives", () => {
    const securityTxtPath = path.resolve(process.cwd(), "public/.well-known/security.txt");
    const text = fs.readFileSync(securityTxtPath, "utf8");
    expect(text).toContain("Contact:");
    expect(text).toContain("Expires:");
    expect(text).toContain("Canonical: https://codecommit.sec/.well-known/security.txt");
  });

  it("serves valid RSS 2.0 XML feed at /feed.xml containing Research and Insights items", async () => {
    const response = await getRssFeed();
    expect(response.status).toBe(200);
    const xml = await response.text();
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain("[Research]");
    expect(xml).toContain("[Insights]");
  });
});
