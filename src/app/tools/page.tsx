import React from "react";
import type { Metadata } from "next";
import { SecurityLabTools } from "@/components/tools/security-lab-tools";
import { LabSuite } from "@/components/tools/lab-suite";

export const metadata: Metadata = {
  title: "Zero-Egress Security Engineering Utilities & Lab Tools",
  description:
    "Client-side HTTP Security Header & CSP Evaluator, Password Entropy & Argon2id Parameter Calculator, and CTI IOC Defanger by CODE.COMMIT.",
};

export default function SecurityToolsPage() {
  return (
    <div className="space-y-0">
      <section className="border-b border-brand-border/70 bg-technical-grid py-16 lg:py-24">
        <div className="container mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-background-elevated px-3.5 py-1 font-mono text-xs text-brand-primary">
            <span>[ ZERO-EGRESS SECURITY LAB UTILITIES ]</span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Client-side security verification & CTI utilities.
          </h1>
          <p className="max-w-3xl text-lg text-text-secondary">
            Practical browser-native utilities for evaluating HTTP response headers and Content
            Security Policies, calculating cryptographic entropy & Argon2id parameters, and
            defanging Threat Intelligence indicators without transmitting sensitive data off your
            machine.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto">
          <SecurityLabTools />
        </div>
      </section>

      <section id="lab-suite" className="border-t border-brand-border/60 bg-background-secondary py-16 lg:py-24">
        <div className="container mx-auto space-y-8">
          <div className="space-y-3">
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              The wider toolbox
            </h2>
            <p className="max-w-3xl text-text-secondary">
              CVSS scoring, JWT and certificate inspection, regex safety, email-authentication checks, infrastructure-as-code linting, threat modelling, an attack-path lab and a CTF sandbox. All run locally in your browser.
            </p>
          </div>
          <LabSuite />
        </div>
      </section>
    </div>
  );
}
