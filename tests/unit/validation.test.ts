import { describe, it, expect } from "vitest";
import {
  contactSubmissionSchema,
  containsSensitiveSecretPattern,
} from "@/lib/validation/contact";

describe("Contact Validation & Secret Rejection", () => {
  it("accepts a valid project enquiry payload", () => {
    const valid = {
      fullName: "Anand Binu Arjun",
      workEmail: "security@example.org",
      organisation: "Example Systems",
      serviceCategory: "penetration-testing",
      projectDescription:
        "We require an authorised web application and API penetration test for our SaaS control plane.",
      preferredTimeline: "standard-2-4-weeks",
      consentAccepted: true,
      websiteUrl: "",
    };

    const result = contactSubmissionSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects submissions when consentAccepted is false", () => {
    const invalid = {
      fullName: "Alex Mercer",
      workEmail: "alex@example.org",
      serviceCategory: "cloud-security",
      projectDescription:
        "We need an AWS and Microsoft Azure cloud security posture assessment.",
      preferredTimeline: "standard-2-4-weeks",
      consentAccepted: false,
    };

    const result = contactSubmissionSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("rejects submissions containing private keys or cloud API secrets", () => {
    const secretDescription =
      "Here is our server key -----BEGIN RSA PRIVATE KEY----- MIIEowIBAAKCAQEA...";
    expect(containsSensitiveSecretPattern(secretDescription)).toBe(true);

    const awsKeyDescription =
      "Please check our account using AKIAIOSFODNN7EXAMPLE in production.";
    expect(containsSensitiveSecretPattern(awsKeyDescription)).toBe(true);

    const result = contactSubmissionSchema.safeParse({
      fullName: "Alex Mercer",
      workEmail: "alex@example.org",
      serviceCategory: "cloud-security",
      projectDescription: secretDescription,
      preferredTimeline: "standard-2-4-weeks",
      consentAccepted: true,
    });
    expect(result.success).toBe(false);
  });
});
