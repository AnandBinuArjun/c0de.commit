import { describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";
import { resetRateLimitStore } from "@/lib/security/rate-limit";

describe("POST /api/contact Integration Tests", () => {
  beforeEach(() => {
    resetRateLimitStore();
  });

  it("creates a valid contact enquiry and returns a referenceCode (201)", async () => {
    const payload = {
      fullName: "Elena Vance",
      workEmail: "elena@enterprise.sec",
      organisation: "Vance Cloud Systems",
      serviceCategory: "cloud-security",
      projectDescription:
        "We need an AWS and Microsoft Azure IAM posture review and approval-gated remediation architecture.",
      preferredTimeline: "standard-2-4-weeks",
      consentAccepted: true,
      websiteUrl: "",
    };

    const req = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "198.51.100.10",
      },
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.referenceCode).toMatch(/^CC-\d{4}-[0-9A-F]{4}$/);
  });

  it("rejects spam submissions that populate the honeypot field (400)", async () => {
    const spamPayload = {
      fullName: "Spam Bot",
      workEmail: "bot@spam.example",
      serviceCategory: "penetration-testing",
      projectDescription:
        "Automated spam message attempting to bypass form validation controls.",
      preferredTimeline: "exploratory",
      consentAccepted: true,
      websiteUrl: "http://malicious-spam.example",
    };

    const req = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "198.51.100.25",
      },
      body: JSON.stringify(spamPayload),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.success).toBe(false);
  });

  it("enforces rate limiting after exceeding allowed requests per window (429)", async () => {
    const validPayload = {
      fullName: "Rate Limit Tester",
      workEmail: "tester@example.org",
      serviceCategory: "security-audits",
      projectDescription:
        "Testing rate limit controls on the project initialization endpoint.",
      preferredTimeline: "standard-2-4-weeks",
      consentAccepted: true,
      websiteUrl: "",
    };

    let lastStatus = 200;
    for (let i = 0; i < 6; i++) {
      const req = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "203.0.113.99",
        },
        body: JSON.stringify(validPayload),
      });
      const res = await POST(req);
      lastStatus = res.status;
    }

    expect(lastStatus).toBe(429);
  });
});
