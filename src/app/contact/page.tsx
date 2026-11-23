import React from "react";
import type { Metadata } from "next";
import { ShieldCheck, Terminal, CheckCircle2, ArrowUpRight } from "lucide-react";
import { InitializeProjectForm } from "@/components/contact/initialize-project-form";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Initialize Project — Contact & Security Engagement Scoping",
  description:
    "Scope an authorised penetration test, application security review, AWS/Azure cloud security audit, or secure software development project with CODE.COMMIT.",
};

export default function ContactPage() {
  return (
    <div className="space-y-0">
      <section className="border-b border-brand-border/70 bg-technical-grid py-16 lg:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Context */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-background-elevated px-3.5 py-1 font-mono text-xs text-brand-primary">
                <span>[ INITIALIZE PROJECT ]</span>
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
                Scope your security or engineering project.
              </h1>

              <p className="text-base leading-relaxed text-text-secondary">
                Share your system architecture, target timelines, and objectives. All offensive
                testing engagements require verified asset ownership and signed Rules of Engagement
                (RoE).
              </p>

              <div className="rounded-2xl border border-brand-border bg-background-card p-6 space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-primary">
                  <ShieldCheck className="h-4 w-4" />
                  <span>What Happens After Intake</span>
                </div>
                <ul className="space-y-3 text-xs text-text-secondary">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                    <span>
                      <strong>01 · Scope Review:</strong> Principal engineering review of your
                      requested service category and architecture context.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                    <span>
                      <strong>02 · Rules of Engagement & NDA:</strong> Mutual confidentiality and
                      explicit target authorisation sign-off.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                    <span>
                      <strong>03 · Technical Execution:</strong> Structured assessment or full-stack
                      engineering sprint initiation.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-brand-border bg-background-card p-6 space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-brand-primary">
                  <Terminal className="h-4 w-4" />
                  <span>DIRECT CHANNELS</span>
                </div>
                <p className="text-text-secondary">
                  GitHub:{" "}
                  <a
                    href={SITE_CONFIG.githubProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-primary underline inline-flex items-center gap-1"
                  >
                    <span>github.com/AnandBinuArjun</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </p>
                <p className="text-text-secondary">
                  Instagram:{" "}
                  <a
                    href={SITE_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-primary underline inline-flex items-center gap-1"
                  >
                    <span>{SITE_CONFIG.instagramHandle}</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </p>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <InitializeProjectForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
