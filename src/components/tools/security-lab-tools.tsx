"use client";

import React, { useState, useMemo } from "react";
import {
  ShieldCheck,
  KeyRound,
  Radar,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Lock,
  Copy,
  Check,
} from "lucide-react";
import {
  evaluateSecurityHeaders,
  calculatePasswordEntropy,
  defangAndExtractIocs,
} from "@/lib/security/tools-engine";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

const SAMPLE_HEADERS = `Content-Security-Policy: default-src 'self'; frame-ancestors 'none'; object-src 'none'
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()`;

const SAMPLE_CTI_TEXT = `Observed Mirai dropper staging from http://198.51.100.42:8080/bins/arm7 and callback to https://c2-telemetry-node.example.net/gate exploiting CVE-2024-3400.`;

export function SecurityLabTools() {
  const [activeTab, setActiveTab] = useState<"HEADERS" | "ENTROPY" | "IOC">("HEADERS");

  // Tool 1: Headers
  const [headersInput, setHeadersInput] = useState(SAMPLE_HEADERS);
  const headerReport = useMemo(() => evaluateSecurityHeaders(headersInput), [headersInput]);

  // Tool 2: Password / Key Entropy
  const [entropySample, setEntropySample] = useState("Correct-Horse-Battery-Staple#94!");
  const entropyReport = useMemo(() => calculatePasswordEntropy(entropySample), [entropySample]);

  // Tool 3: CTI IOC Defanger
  const [ctiInput, setCtiInput] = useState(SAMPLE_CTI_TEXT);
  const [copiedDefanged, setCopiedDefanged] = useState(false);
  const iocReport = useMemo(() => defangAndExtractIocs(ctiInput), [ctiInput]);

  const handleCopyDefanged = async () => {
    try {
      await navigator.clipboard.writeText(iocReport.defangedText);
      setCopiedDefanged(true);
      setTimeout(() => setCopiedDefanged(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-8">
      {/* Zero-Egress Assurance Banner */}
      <div className="rounded-2xl border border-brand-primary/40 bg-brand-deep/30 p-4 font-mono text-xs text-text-primary flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Lock className="h-4 w-4 text-brand-primary shrink-0" />
          <span>
            <strong className="text-brand-primary">[ZERO-EGRESS CLIENT SANDBOX]:</strong> All three
            security utilities execute 100% locally in your browser memory. Zero bytes are sent to
            any server.
          </span>
        </div>
        <span className="rounded border border-brand-primary/40 bg-background-elevated px-2.5 py-0.5 text-[10px] text-brand-primary">
          OFFLINE-CAPABLE
        </span>
      </div>

      {/* Tool Selector Tabs */}
      <div
        role="tablist"
        aria-label="Interactive Security Engineering Utilities"
        className="grid grid-cols-1 gap-3 sm:grid-cols-3"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "HEADERS"}
          onClick={() => setActiveTab("HEADERS")}
          className={cn(
            "flex items-center gap-3 rounded-xl border p-4 text-left transition-all",
            activeTab === "HEADERS"
              ? "border-brand-primary bg-background-card text-text-primary shadow-neon-sm"
              : "border-brand-border bg-background-elevated/60 text-text-secondary hover:border-brand-primary/40"
          )}
        >
          <ShieldCheck className="h-5 w-5 text-brand-primary shrink-0" />
          <div>
            <p className="font-mono text-[10px] text-brand-primary">UTILITY // 01</p>
            <p className="font-display text-sm font-bold">HTTP Header & CSP Evaluator</p>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "ENTROPY"}
          onClick={() => setActiveTab("ENTROPY")}
          className={cn(
            "flex items-center gap-3 rounded-xl border p-4 text-left transition-all",
            activeTab === "ENTROPY"
              ? "border-brand-primary bg-background-card text-text-primary shadow-neon-sm"
              : "border-brand-border bg-background-elevated/60 text-text-secondary hover:border-brand-primary/40"
          )}
        >
          <KeyRound className="h-5 w-5 text-brand-primary shrink-0" />
          <div>
            <p className="font-mono text-[10px] text-brand-primary">UTILITY // 02</p>
            <p className="font-display text-sm font-bold">Entropy & Argon2id Calculator</p>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "IOC"}
          onClick={() => setActiveTab("IOC")}
          className={cn(
            "flex items-center gap-3 rounded-xl border p-4 text-left transition-all",
            activeTab === "IOC"
              ? "border-brand-primary bg-background-card text-text-primary shadow-neon-sm"
              : "border-brand-border bg-background-elevated/60 text-text-secondary hover:border-brand-primary/40"
          )}
        >
          <Radar className="h-5 w-5 text-brand-primary shrink-0" />
          <div>
            <p className="font-mono text-[10px] text-brand-primary">UTILITY // 03</p>
            <p className="font-display text-sm font-bold">CTI IOC Defanger & Extractor</p>
          </div>
        </button>
      </div>

      {/* Tool 1 Panel: HTTP Headers */}
      {activeTab === "HEADERS" && (
        <SpotlightCard className="p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="headers-textarea"
                  className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary"
                >
                  Raw HTTP Response Headers
                </label>
                <button
                  type="button"
                  onClick={() => setHeadersInput(SAMPLE_HEADERS)}
                  className="font-mono text-xs text-text-muted hover:text-brand-primary underline"
                >
                  Load Hardened Baseline
                </button>
              </div>
              <textarea
                id="headers-textarea"
                rows={10}
                value={headersInput}
                onChange={(e) => setHeadersInput(e.target.value)}
                className="w-full rounded-xl border border-brand-border bg-background-elevated p-4 font-mono text-xs leading-relaxed text-text-primary focus:border-brand-primary focus:outline-none"
                placeholder="Paste response headers (Key: Value)..."
              />
            </div>

            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center justify-between rounded-xl border border-brand-border bg-background-elevated p-4">
                <div>
                  <p className="font-mono text-xs text-text-muted">OWASP HEADER POSTURE SCORE</p>
                  <p className="font-display text-2xl font-bold text-text-primary">
                    {headerReport.score} / 100
                  </p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-brand-primary bg-brand-deep font-display text-2xl font-bold text-brand-primary shadow-neon-sm">
                  {headerReport.grade}
                </div>
              </div>

              <div className="space-y-2.5">
                {headerReport.findings.map((f) => (
                  <div
                    key={f.header}
                    className="flex items-start justify-between gap-3 rounded-xl border border-brand-border/70 bg-background-elevated/70 p-3.5 text-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      {f.status === "PASS" && (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                      )}
                      {f.status === "WARN" && (
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-status-warning" />
                      )}
                      {f.status === "MISSING" && (
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-status-error" />
                      )}
                      <div>
                        <p className="font-mono font-bold text-text-primary">{f.header}</p>
                        <p className="mt-0.5 text-text-secondary">{f.detail}</p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "rounded px-2 py-0.5 font-mono text-[10px] font-bold",
                        f.status === "PASS"
                          ? "bg-brand-deep text-brand-primary"
                          : f.status === "WARN"
                          ? "bg-status-warning/15 text-status-warning"
                          : "bg-status-error/15 text-status-error"
                      )}
                    >
                      {f.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SpotlightCard>
      )}

      {/* Tool 2 Panel: Entropy & Argon2id */}
      {activeTab === "ENTROPY" && (
        <SpotlightCard className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="entropy-input"
              className="block font-mono text-xs font-bold uppercase tracking-wider text-brand-primary"
            >
              Test Passphrase Structure (Evaluated Locally in RAM)
            </label>
            <input
              id="entropy-input"
              type="text"
              value={entropySample}
              onChange={(e) => setEntropySample(e.target.value)}
              className="w-full rounded-xl border border-brand-border bg-background-elevated px-4 py-3 font-mono text-sm text-text-primary focus:border-brand-primary focus:outline-none"
              placeholder="Enter sample structure to evaluate entropy bits..."
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-brand-border bg-background-elevated p-4">
              <p className="font-mono text-xs text-text-muted">ENTROPY BITS</p>
              <p className="mt-1 font-mono text-2xl font-bold text-brand-primary">
                {entropyReport.entropyBits} bits
              </p>
            </div>
            <div className="rounded-xl border border-brand-border bg-background-elevated p-4">
              <p className="font-mono text-xs text-text-muted">CHARACTER LENGTH</p>
              <p className="mt-1 font-mono text-2xl font-bold text-text-primary">
                {entropyReport.length} chars
              </p>
            </div>
            <div className="rounded-xl border border-brand-border bg-background-elevated p-4">
              <p className="font-mono text-xs text-text-muted">KEYSPACE POOL</p>
              <p className="mt-1 font-mono text-2xl font-bold text-text-primary">
                {entropyReport.charsetSize} symbols
              </p>
            </div>
            <div className="rounded-xl border border-brand-border bg-background-elevated p-4">
              <p className="font-mono text-xs text-text-muted">VERDICT</p>
              <p className="mt-1 font-mono text-sm font-bold text-brand-primary">
                {entropyReport.strengthLabel}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-brand-primary/30 bg-background-elevated p-4 font-mono text-xs space-y-1">
            <p className="text-brand-primary font-bold">
              OWASP ASVS KDF STORAGE SPECIFICATION:
            </p>
            <p className="text-text-secondary">{entropyReport.argon2idRecommendation}</p>
          </div>
        </SpotlightCard>
      )}

      {/* Tool 3 Panel: CTI IOC Defanger */}
      {activeTab === "IOC" && (
        <SpotlightCard className="p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6 space-y-3">
              <label
                htmlFor="cti-raw-textarea"
                className="block font-mono text-xs font-bold uppercase tracking-wider text-brand-primary"
              >
                Raw Threat Advisory / Incident Notes
              </label>
              <textarea
                id="cti-raw-textarea"
                rows={8}
                value={ctiInput}
                onChange={(e) => setCtiInput(e.target.value)}
                className="w-full rounded-xl border border-brand-border bg-background-elevated p-4 font-mono text-xs leading-relaxed text-text-primary focus:border-brand-primary focus:outline-none"
                placeholder="Paste threat notes containing URLs, IPs, or CVEs..."
              />
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
                  Defanged Safe Output (Safe for Reports & Tickets)
                </span>
                <button
                  type="button"
                  onClick={handleCopyDefanged}
                  className="inline-flex items-center gap-1.5 rounded border border-brand-border bg-background-elevated px-3 py-1 font-mono text-xs text-text-primary hover:border-brand-primary"
                >
                  {copiedDefanged ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-brand-primary" />
                      <span className="text-brand-primary">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Defanged</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="whitespace-pre-wrap rounded-xl border border-brand-border bg-background-elevated p-4 font-mono text-xs leading-relaxed text-brand-primary">
                {iocReport.defangedText}
              </pre>

              <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                <div className="rounded-lg border border-brand-border bg-background-elevated p-3">
                  <span className="text-text-muted block text-[10px]">EXTRACTED IPv4</span>
                  <span className="font-bold text-text-primary">
                    {iocReport.extractedIps.length}
                  </span>
                </div>
                <div className="rounded-lg border border-brand-border bg-background-elevated p-3">
                  <span className="text-text-muted block text-[10px]">EXTRACTED URLS</span>
                  <span className="font-bold text-text-primary">
                    {iocReport.extractedUrls.length}
                  </span>
                </div>
                <div className="rounded-lg border border-brand-border bg-background-elevated p-3">
                  <span className="text-text-muted block text-[10px]">EXTRACTED CVES</span>
                  <span className="font-bold text-brand-primary">
                    {iocReport.extractedCves.join(", ") || "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SpotlightCard>
      )}
    </div>
  );
}
