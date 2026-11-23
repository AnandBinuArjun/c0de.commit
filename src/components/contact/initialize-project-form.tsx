"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  ShieldAlert,
  ArrowUpRight,
  Lock,
  Loader2,
  RefreshCw,
  Download,
} from "lucide-react";
import {
  contactSubmissionSchema,
  SERVICE_CATEGORY_OPTIONS,
  TIMELINE_OPTIONS,
  type ContactSubmissionInput,
} from "@/lib/validation/contact";

export function InitializeProjectForm() {
  const [formData, setFormData] = useState<ContactSubmissionInput>({
    fullName: "",
    workEmail: "",
    organisation: "",
    serviceCategory: "penetration-testing",
    projectDescription: "",
    preferredTimeline: "standard-2-4-weeks",
    consentAccepted: false,
    websiteUrl: "",
  });

  // Pre-fill serviceCategory and projectDescription from URL query parameters (?service=...&scope=...&project=...)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    const scopeParam = params.get("scope");
    const projectParam = params.get("project");

    setFormData((prev) => {
      let nextCategory = prev.serviceCategory;
      let nextDescription = prev.projectDescription;

      const validCategories = SERVICE_CATEGORY_OPTIONS.map((o) => o.value);
      if (
        serviceParam &&
        validCategories.includes(serviceParam as ContactSubmissionInput["serviceCategory"])
      ) {
        nextCategory = serviceParam as ContactSubmissionInput["serviceCategory"];
      } else if (projectParam === "cloudsentinel") {
        nextCategory = "cloudsentinel-platform";
      }

      if (scopeParam && !prev.projectDescription) {
        nextDescription = scopeParam;
      } else if (projectParam && !prev.projectDescription) {
        nextDescription = `Requesting an architecture briefing and deployment consultation regarding ${projectParam.toUpperCase()}.`;
      }

      return {
        ...prev,
        serviceCategory: nextCategory,
        projectDescription: nextDescription,
      };
    });
  }, []);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    referenceCode: string;
    createdAt: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const parsed = contactSubmissionSchema.safeParse(formData);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const mapped: Record<string, string> = {};
      for (const [key, msgs] of Object.entries(flat)) {
        if (msgs && msgs.length > 0) {
          mapped[key] = msgs[0];
        }
      }
      setErrors(mapped);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setServerError(data.error || "Unable to process project enquiry.");
        setSubmitting(false);
        return;
      }

      setConfirmation({
        referenceCode: data.referenceCode,
        createdAt: data.createdAt,
        message: data.message,
      });
    } catch {
      setServerError("Network error while submitting enquiry. Please retry.");
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmation) {
    const handleDownloadScopeReceipt = () => {
      const receiptMarkdown = [
        `# CODE.COMMIT — PROJECT SCOPE INITIALIZATION RECEIPT`,
        `Reference Code: ${confirmation.referenceCode}`,
        `Timestamp (UTC): ${confirmation.createdAt}`,
        `Client Name: ${formData.fullName}`,
        `Work Email: ${formData.workEmail}`,
        `Organisation: ${formData.organisation || "Not specified"}`,
        `Service Track: ${formData.serviceCategory}`,
        `Preferred Timeline: ${formData.preferredTimeline}`,
        ``,
        `## Submitted Scope & Technical Objectives`,
        formData.projectDescription,
        ``,
        `## Pre-Engagement Rules of Engagement (RoE) Checklist`,
        `[ ] 1. Verify target asset ownership & hosting authorisation`,
        `[ ] 2. Execute mutual Non-Disclosure Agreement (NDA) & Statement of Work`,
        `[ ] 3. Define allowed testing windows & emergency escalation contacts`,
      ].join("\n");

      const blob = new Blob([receiptMarkdown], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${confirmation.referenceCode}-scope-receipt.md`;
      a.click();
      URL.revokeObjectURL(url);
    };

    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-brand-primary bg-background-card p-8 shadow-neon-sm space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-deep text-brand-primary border border-brand-primary/40">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary">
              [ ENQUIRY INITIALIZED ]
            </p>
            <h2 className="font-display text-2xl font-bold text-text-primary">
              Scope request logged securely.
            </h2>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-text-secondary">
          {confirmation.message}
        </p>

        <div className="rounded-xl border border-brand-border bg-background-elevated p-5 font-mono text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-text-muted">REFERENCE IDENTIFIER:</span>
            <span className="font-bold text-brand-primary">{confirmation.referenceCode}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-muted">SERVICE TRACK:</span>
            <span className="text-text-primary">{formData.serviceCategory}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-muted">CONTACT EMAIL:</span>
            <span className="text-text-primary">{formData.workEmail}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleDownloadScopeReceipt}
            className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-4 py-2.5 text-xs font-mono font-bold text-background hover:bg-brand-secondary transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Scope Receipt (.md)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setConfirmation(null);
              setFormData({
                fullName: "",
                workEmail: "",
                organisation: "",
                serviceCategory: "penetration-testing",
                projectDescription: "",
                preferredTimeline: "standard-2-4-weeks",
                consentAccepted: false,
                websiteUrl: "",
              });
            }}
            className="inline-flex items-center gap-2 rounded-md border border-brand-border bg-background-elevated px-4 py-2.5 text-xs font-mono text-text-primary hover:border-brand-primary"
          >
            <RefreshCw className="h-3.5 w-3.5 text-brand-primary" />
            <span>Submit Another Enquiry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-brand-border bg-background-card p-7 sm:p-9 shadow-card-elevated space-y-6"
    >
      <div className="border-b border-brand-border/60 pb-4 space-y-1">
        <span className="font-mono text-xs uppercase tracking-widest text-brand-primary">
          [ INITIALIZE PROJECT WORKFLOW ]
        </span>
        <h2 className="font-display text-2xl font-bold text-text-primary">
          Define your security or engineering scope
        </h2>
      </div>

      {/* Security Warning Banner */}
      <div className="rounded-xl border border-brand-primary/30 bg-background-elevated p-4 text-xs text-text-secondary">
        <div className="flex items-start gap-2.5">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
          <p>
            <strong className="text-text-primary">Operational Security Notice:</strong> Do not
            submit passwords, API keys, private keys, or confidential production logs through this
            public intake form. Our validation engine actively rejects credential patterns.
          </p>
        </div>
      </div>

      {serverError && (
        <div
          role="alert"
          className="rounded-xl border border-status-error/50 bg-status-error/10 p-4 text-xs text-status-error flex items-start gap-2.5"
        >
          <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Honeypot anti-spam field (visually hidden) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website-url-honeypot">Website URL (Leave empty)</label>
        <input
          id="website-url-honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.websiteUrl}
          onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Full Name */}
        <div className="space-y-2">
          <label
            htmlFor="fullName"
            className="block font-mono text-xs uppercase tracking-wider text-text-primary"
          >
            Full Name <span className="text-brand-primary">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Alex Mercer"
            className="w-full rounded-lg border border-brand-border bg-background-elevated px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-primary focus:outline-none"
          />
          {errors.fullName && (
            <p className="text-xs text-status-error">{errors.fullName}</p>
          )}
        </div>

        {/* Work Email */}
        <div className="space-y-2">
          <label
            htmlFor="workEmail"
            className="block font-mono text-xs uppercase tracking-wider text-text-primary"
          >
            Work Email <span className="text-brand-primary">*</span>
          </label>
          <input
            id="workEmail"
            name="workEmail"
            type="email"
            required
            value={formData.workEmail}
            onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
            placeholder="alex@organisation.org"
            className="w-full rounded-lg border border-brand-border bg-background-elevated px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-primary focus:outline-none"
          />
          {errors.workEmail && (
            <p className="text-xs text-status-error">{errors.workEmail}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Organisation (optional) */}
        <div className="space-y-2">
          <label
            htmlFor="organisation"
            className="block font-mono text-xs uppercase tracking-wider text-text-primary"
          >
            Organisation <span className="text-text-muted">(Optional)</span>
          </label>
          <input
            id="organisation"
            name="organisation"
            type="text"
            value={formData.organisation}
            onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
            placeholder="Acme Engineering Ltd"
            className="w-full rounded-lg border border-brand-border bg-background-elevated px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-primary focus:outline-none"
          />
          {errors.organisation && (
            <p className="text-xs text-status-error">{errors.organisation}</p>
          )}
        </div>

        {/* Service Category */}
        <div className="space-y-2">
          <label
            htmlFor="serviceCategory"
            className="block font-mono text-xs uppercase tracking-wider text-text-primary"
          >
            Service Category <span className="text-brand-primary">*</span>
          </label>
          <select
            id="serviceCategory"
            name="serviceCategory"
            value={formData.serviceCategory}
            onChange={(e) =>
              setFormData({
                ...formData,
                serviceCategory: e.target.value as ContactSubmissionInput["serviceCategory"],
              })
            }
            className="w-full rounded-lg border border-brand-border bg-background-elevated px-4 py-3 text-sm text-text-primary focus:border-brand-primary focus:outline-none"
          >
            {SERVICE_CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.serviceCategory && (
            <p className="text-xs text-status-error">{errors.serviceCategory}</p>
          )}
        </div>
      </div>

      {/* Preferred Timeline */}
      <div className="space-y-2">
        <label
          htmlFor="preferredTimeline"
          className="block font-mono text-xs uppercase tracking-wider text-text-primary"
        >
          Preferred Timeline <span className="text-brand-primary">*</span>
        </label>
        <select
          id="preferredTimeline"
          name="preferredTimeline"
          value={formData.preferredTimeline}
          onChange={(e) =>
            setFormData({
              ...formData,
              preferredTimeline: e.target.value as ContactSubmissionInput["preferredTimeline"],
            })
          }
          className="w-full rounded-lg border border-brand-border bg-background-elevated px-4 py-3 text-sm text-text-primary focus:border-brand-primary focus:outline-none"
        >
          {TIMELINE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.preferredTimeline && (
          <p className="text-xs text-status-error">{errors.preferredTimeline}</p>
        )}
      </div>

      {/* Project Description */}
      <div className="space-y-2">
        <label
          htmlFor="projectDescription"
          className="block font-mono text-xs uppercase tracking-wider text-text-primary"
        >
          Project Scope & Technical Objectives <span className="text-brand-primary">*</span>
        </label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          rows={5}
          required
          value={formData.projectDescription}
          onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
          placeholder="Describe your target architecture, assessment objectives, or secure development requirements (minimum 25 characters)..."
          className="w-full rounded-lg border border-brand-border bg-background-elevated p-4 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-primary focus:outline-none"
        />
        {errors.projectDescription && (
          <p className="text-xs text-status-error">{errors.projectDescription}</p>
        )}
      </div>

      {/* Consent Checkbox */}
      <div className="space-y-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            id="consentAccepted"
            name="consentAccepted"
            type="checkbox"
            checked={formData.consentAccepted}
            onChange={(e) => setFormData({ ...formData, consentAccepted: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-brand-border bg-background-elevated text-brand-primary focus:ring-brand-primary"
          />
          <span className="text-xs leading-relaxed text-text-secondary">
            I confirm that I am authorised to initiate this project enquiry on behalf of my
            organisation, and I consent to CODE.COMMIT processing this information in accordance
            with the{" "}
            <a href="/privacy" className="text-brand-primary underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {errors.consentAccepted && (
          <p className="text-xs text-status-error">{errors.consentAccepted}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-primary px-6 py-4 text-sm font-semibold text-background shadow-neon-sm transition-all hover:bg-brand-secondary disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Validating & Logging Scope...</span>
          </>
        ) : (
          <>
            <span>Initialize Project</span>
            <ArrowUpRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
