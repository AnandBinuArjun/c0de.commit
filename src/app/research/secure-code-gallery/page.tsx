import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SECURE_CODE_GALLERY } from "@/data/secure-code-gallery";
import { SecureCodeGallery } from "@/components/research/secure-code-gallery";

export const metadata: Metadata = {
  title: "Secure Code Gallery — Vulnerable vs Fixed",
  description: "Side-by-side vulnerable and fixed code for common CWE categories including SQL injection, XSS, path traversal, SSRF, hard-coded secrets and unsafe deserialisation.",
};

export default function SecureCodeGalleryPage() {
  return (
    <div className="space-y-0">
      <section className="surface-technical border-b border-brand-border/70 py-16 lg:py-20">
        <div className="container mx-auto max-w-6xl space-y-5">
          <Link href="/research" className="inline-flex items-center gap-2 font-mono text-xs text-brand-primary hover:underline"><ArrowLeft className="h-3.5 w-3.5" />Back to Research</Link>
          <h1 className="text-hero-display font-display font-bold text-text-primary">Secure code gallery</h1>
          <p className="max-w-3xl text-lg text-text-secondary">Vulnerable and fixed code side by side, mapped to the weakness it demonstrates.</p>
        </div>
      </section>
      <section className="bg-background py-14 lg:py-20">
        <div className="container mx-auto max-w-6xl">
          <SecureCodeGallery examples={SECURE_CODE_GALLERY} />
        </div>
      </section>
    </div>
  );
}
