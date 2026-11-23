import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DETECTION_RULES } from "@/data/detections";
import { DetectionLibrary } from "@/components/research/detection-library";

export const metadata: Metadata = {
  title: "Detection Rule Library — Sigma, YARA & Suricata",
  description: "Reference detection rules mapped to MITRE ATT&CK, with false-positive guidance. Illustrative starting points for detection engineers.",
};

export default function DetectionsPage() {
  return (
    <div className="space-y-0">
      <section className="surface-technical border-b border-brand-border/70 py-16 lg:py-20">
        <div className="container mx-auto max-w-5xl space-y-5">
          <Link href="/research" className="inline-flex items-center gap-2 font-mono text-xs text-brand-primary hover:underline"><ArrowLeft className="h-3.5 w-3.5" />Back to Research</Link>
          <h1 className="text-hero-display font-display font-bold text-text-primary">Detection rule library</h1>
          <p className="max-w-3xl text-lg text-text-secondary">
            Reference Sigma, YARA and Suricata rules, each mapped to a MITRE ATT&amp;CK technique and annotated with likely false positives.
          </p>
          <p className="max-w-3xl rounded-lg border border-status-warning/40 bg-status-warning/10 p-3 text-xs text-status-warning">
            <span className="font-mono font-bold">ILLUSTRATIVE:</span> these rules are starting points authored for education. They have not been validated against production telemetry. Test and tune them in your own environment before deployment.
          </p>
        </div>
      </section>
      <section className="bg-background py-14 lg:py-20">
        <div className="container mx-auto max-w-5xl">
          <DetectionLibrary rules={DETECTION_RULES} />
        </div>
      </section>
    </div>
  );
}
