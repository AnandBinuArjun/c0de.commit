import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GLOSSARY } from "@/data/glossary";
import { GlossarySearch } from "@/components/research/glossary-search";

export const metadata: Metadata = {
  title: "Security Glossary",
  description: "Plain-language definitions of offensive, defensive, cloud, application and intelligence terms used across CODE.COMMIT research.",
};

export default function GlossaryPage() {
  return (
    <div className="space-y-0">
      <section className="surface-technical border-b border-brand-border/70 py-16 lg:py-20">
        <div className="container mx-auto max-w-5xl space-y-5">
          <Link href="/research" className="inline-flex items-center gap-2 font-mono text-xs text-brand-primary hover:underline"><ArrowLeft className="h-3.5 w-3.5" />Back to Research</Link>
          <h1 className="text-hero-display font-display font-bold text-text-primary">Security glossary</h1>
          <p className="max-w-3xl text-lg text-text-secondary">The vocabulary behind our research and tools, explained plainly.</p>
        </div>
      </section>
      <section className="bg-background py-14 lg:py-20">
        <div className="container mx-auto max-w-5xl">
          <GlossarySearch terms={GLOSSARY} />
        </div>
      </section>
    </div>
  );
}
