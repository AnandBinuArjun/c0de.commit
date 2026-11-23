import { z } from "zod";

export const SERVICE_CATEGORY_OPTIONS = [
  { value: "penetration-testing", label: "Penetration Testing" },
  { value: "application-security", label: "Application Security" },
  { value: "security-audits", label: "Security Audits & Posture Assessment" },
  { value: "cloud-security", label: "Cloud Security (AWS / Azure)" },
  { value: "incident-response", label: "Incident Response & Readiness" },
  { value: "secure-development", label: "Secure Software & API Development" },
  { value: "cloudsentinel-platform", label: "CloudSentinel Architecture / Briefing" },
] as const;

export const TIMELINE_OPTIONS = [
  { value: "urgent-1-2-weeks", label: "Priority Scope (1–2 Weeks)" },
  { value: "standard-2-4-weeks", label: "Standard Planning (2–4 Weeks)" },
  { value: "quarter-1-3-months", label: "Upcoming Quarter (1–3 Months)" },
  { value: "exploratory", label: "Exploratory / Architecture Discussion" },
] as const;

const PROHIBITED_SECRET_PATTERNS: RegExp[] = [
  /-----BEGIN [A-Z0-9\s]*PRIVATE KEY-----/i,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bghp_[A-Za-z0-9]{30,}\b/,
  /\bsk-[A-Za-z0-9]{20,}\b/,
  /password\s*[:=]\s*\S+/i,
];

export function containsSensitiveSecretPattern(input: string): boolean {
  return PROHIBITED_SECRET_PATTERNS.some((pattern) => pattern.test(input));
}

export const contactSubmissionSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(100, "Full name must not exceed 100 characters.")
    .regex(/^[a-zA-ZÀ-ÿ0-9\s.'-]+$/, "Full name contains unsupported characters."),
  workEmail: z
    .string()
    .trim()
    .email("Please enter a valid work or professional email address.")
    .max(160, "Email address is too long."),
  organisation: z
    .string()
    .trim()
    .max(120, "Organisation name must not exceed 120 characters.")
    .optional()
    .or(z.literal("")),
  serviceCategory: z.enum([
    "penetration-testing",
    "application-security",
    "security-audits",
    "cloud-security",
    "incident-response",
    "secure-development",
    "cloudsentinel-platform",
  ], {
    errorMap: () => ({ message: "Please select a valid service category." }),
  }),
  projectDescription: z
    .string()
    .trim()
    .min(25, "Please provide at least 25 characters describing your scope or challenge.")
    .max(3000, "Project description must not exceed 3,000 characters.")
    .refine(
      (val) => !containsSensitiveSecretPattern(val),
      "For your security, do not submit private keys, API tokens, passwords, or raw credentials in this form."
    ),
  preferredTimeline: z.enum([
    "urgent-1-2-weeks",
    "standard-2-4-weeks",
    "quarter-1-3-months",
    "exploratory",
  ], {
    errorMap: () => ({ message: "Please select a preferred timeline." }),
  }),
  consentAccepted: z.boolean().refine((val) => val === true, {
    message: "You must confirm authorisation and data handling consent to proceed.",
  }),
  // Anti-spam honeypot field — must remain empty
  websiteUrl: z.string().max(0, "Spam check triggered.").optional().or(z.literal("")),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
