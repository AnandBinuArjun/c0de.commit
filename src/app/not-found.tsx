import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[75vh] items-center justify-center bg-technical-grid py-24">
      <div className="container mx-auto max-w-2xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-background-elevated px-4 py-1.5 font-mono text-xs text-brand-primary">
          <ShieldAlert className="h-4 w-4" />
          <span>[ HTTP 404 ] — ROUTE NOT RESOLVED</span>
        </div>

        <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
          Requested resource is outside defined scope.
        </h1>

        <p className="text-base text-text-secondary">
          The route you requested does not exist or has been relocated within the CODE.COMMIT
          architecture. Use standard navigation or return to the primary console.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-5 py-3 text-sm font-semibold text-background hover:bg-brand-secondary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-md border border-brand-border bg-background-card px-5 py-3 text-sm font-semibold text-text-primary hover:border-brand-primary transition-colors"
          >
            <Terminal className="h-4 w-4 text-brand-primary" />
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
