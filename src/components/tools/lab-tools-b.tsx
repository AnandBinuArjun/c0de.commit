"use client";

import React, { useMemo, useState } from "react";
import { analyzeEmailAuthRecord, analyzeRegex, detectIacKind, lintIac } from "@/lib/security/lab-engine";
import { decodeCertificate } from "@/lib/security/cert-parser";
import { FindingList, ToolFrame, inputCls, labelCls } from "@/components/tools/lab-ui";
import { cn } from "@/lib/utils";

export function RegexTool() {
  const [pattern, setPattern] = useState("^(\\w+)\\s+(\\d+)$");
  const [flags, setFlags] = useState("");
  const [sample, setSample] = useState("alpha 42\nbeta 7");
  const report = useMemo(() => analyzeRegex(pattern, flags, sample), [pattern, flags, sample]);
  const riskColour = report.risk === "HIGH" ? "text-status-error" : report.risk === "MEDIUM" ? "text-status-warning" : "text-brand-primary";

  return (
    <ToolFrame
      title="Regex & ReDoS tester"
      description="Test a pattern and check it for catastrophic-backtracking shapes. Patterns judged high risk are deliberately not executed, so this page cannot hang. The analysis is heuristic, not a proof of safety."
    >
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="sm:col-span-3">
          <label htmlFor="re-pattern" className={labelCls}>Pattern</label>
          <input id="re-pattern" className={inputCls} value={pattern} onChange={(e) => setPattern(e.target.value)} spellCheck={false} />
        </div>
        <div>
          <label htmlFor="re-flags" className={labelCls}>Flags</label>
          <input id="re-flags" className={inputCls} value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="gim" maxLength={8} />
        </div>
      </div>
      <div>
        <label htmlFor="re-sample" className={labelCls}>Sample text</label>
        <textarea id="re-sample" rows={4} className={inputCls} value={sample} onChange={(e) => setSample(e.target.value)} spellCheck={false} />
      </div>
      {!report.valid ? (
        <p role="alert" className="font-mono text-xs text-status-error">{report.error}</p>
      ) : (
        <div className="space-y-3 rounded-xl border border-brand-border/70 bg-background/60 p-4">
          <p className="font-mono text-xs">
            ReDoS risk: <span className={cn("font-semibold", riskColour)}>{report.risk}</span>
          </p>
          <ul className="list-disc space-y-1 pl-5 text-xs text-text-secondary">
            {report.reasons.map((r) => <li key={r}>{r}</li>)}
          </ul>
          {report.note ? <p className="text-xs text-status-warning">{report.note}</p> : null}
          {report.executed ? (
            <div>
              <div className={labelCls}>{report.matches.length} match(es)</div>
              <ul className="flex flex-wrap gap-2">
                {report.matches.map((m, i) => (
                  <li key={`${m}-${i}`} className="rounded border border-brand-border bg-background px-2 py-1 font-mono text-xs text-text-primary">{m === "" ? "(empty)" : m}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </ToolFrame>
  );
}

export function CertTool() {
  const [pem, setPem] = useState("");
  const report = useMemo(() => (pem.trim() ? decodeCertificate(pem) : null), [pem]);

  return (
    <ToolFrame
      title="TLS certificate decoder"
      description="Paste a PEM-encoded certificate (public data) to review its subject, validity, key strength, signature algorithm and names. Decoded locally; chain and signature validity are not checked. Never paste private keys."
    >
      <div>
        <label htmlFor="cert-pem" className={labelCls}>Certificate (PEM)</label>
        <textarea id="cert-pem" rows={7} className={inputCls} value={pem} onChange={(e) => setPem(e.target.value)} placeholder={"-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----"} spellCheck={false} />
      </div>
      {report && !report.ok ? <p role="alert" className="font-mono text-xs text-status-error">{report.error}</p> : null}
      {report && report.ok ? (
        <div className="space-y-4">
          <dl className="grid gap-x-6 gap-y-2 rounded-xl border border-brand-border/70 bg-background/60 p-4 font-mono text-xs sm:grid-cols-[auto_1fr]">
            <dt className="text-text-muted">Subject</dt><dd className="break-all text-text-primary">{report.subject}</dd>
            <dt className="text-text-muted">Issuer</dt><dd className="break-all text-text-primary">{report.issuer}</dd>
            <dt className="text-text-muted">Valid from</dt><dd className="text-text-primary">{report.notBefore}</dd>
            <dt className="text-text-muted">Valid to</dt><dd className="text-text-primary">{report.notAfter} ({report.daysRemaining} days)</dd>
            <dt className="text-text-muted">Key</dt><dd className="text-text-primary">{report.keyAlgorithm}{report.keyBits ? ` ${report.keyBits}-bit` : ""}{report.curve ? ` ${report.curve}` : ""}</dd>
            <dt className="text-text-muted">Signature</dt><dd className="text-text-primary">{report.signatureAlgorithm}</dd>
            <dt className="text-text-muted">Serial</dt><dd className="break-all text-text-primary">{report.serialHex}</dd>
            <dt className="text-text-muted">DNS names</dt><dd className="break-all text-text-primary">{report.sans.join(", ") || "none"}</dd>
          </dl>
          <FindingList findings={report.findings} />
        </div>
      ) : null}
    </ToolFrame>
  );
}

const SAMPLE_RECORDS = [
  { label: "SPF", value: "v=spf1 include:_spf.example.net ~all" },
  { label: "DMARC", value: "v=DMARC1; p=none; rua=mailto:dmarc@example.org" },
];

export function EmailAuthTool() {
  const [record, setRecord] = useState(SAMPLE_RECORDS[1].value);
  const report = useMemo(() => analyzeEmailAuthRecord(record), [record]);
  return (
    <ToolFrame
      title="SPF / DKIM / DMARC record checker"
      description="Paste a DNS TXT record for review. The checker explains the policy and flags weak settings. It does not perform DNS lookups, so nothing is sent anywhere."
    >
      <div className="flex flex-wrap gap-2">
        {SAMPLE_RECORDS.map((s) => (
          <button key={s.label} type="button" onClick={() => setRecord(s.value)} className="min-h-[44px] rounded-lg border border-brand-border px-3 font-mono text-xs text-text-secondary hover:border-brand-primary hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50">
            Load {s.label} sample
          </button>
        ))}
      </div>
      <div>
        <label htmlFor="email-record" className={labelCls}>TXT record</label>
        <textarea id="email-record" rows={3} className={inputCls} value={record} onChange={(e) => setRecord(e.target.value)} spellCheck={false} />
      </div>
      <p className="font-mono text-xs text-text-secondary">Detected type: <span className="text-brand-primary">{report.type}</span></p>
      {Object.keys(report.tags).length > 0 ? (
        <dl className="grid gap-x-6 gap-y-1 rounded-xl border border-brand-border/70 bg-background/60 p-4 font-mono text-xs sm:grid-cols-[auto_1fr]">
          {Object.entries(report.tags).map(([k, v]) => (
            <React.Fragment key={k}>
              <dt className="text-text-muted">{k}</dt>
              <dd className="break-all text-text-primary">{v.length > 80 ? `${v.slice(0, 80)}…` : v}</dd>
            </React.Fragment>
          ))}
        </dl>
      ) : null}
      <FindingList findings={report.findings} />
    </ToolFrame>
  );
}

const IAC_SAMPLE = `FROM node:latest
ENV API_TOKEN=abc123
RUN curl http://example.com/install.sh | sh
COPY . /app
CMD ["node", "server.js"]`;

export function IacTool() {
  const [source, setSource] = useState(IAC_SAMPLE);
  const kind = useMemo(() => detectIacKind(source), [source]);
  const result = useMemo(() => lintIac(source, kind), [source, kind]);
  return (
    <ToolFrame
      title="IaC misconfiguration linter"
      description="Paste a Dockerfile, Kubernetes manifest or Terraform configuration. A rule-based check flags common risky patterns with fixes. It is a quick review aid, not a replacement for a full scanner."
    >
      <div>
        <label htmlFor="iac-src" className={labelCls}>Configuration</label>
        <textarea id="iac-src" rows={9} className={inputCls} value={source} onChange={(e) => setSource(e.target.value)} spellCheck={false} />
      </div>
      <p className="font-mono text-xs text-text-secondary">
        Detected: <span className="text-brand-primary">{result.kind}</span> · {result.findings.length} finding(s)
      </p>
      <FindingList
        findings={result.findings.map((f) => ({
          severity: f.severity,
          message: f.message,
          fix: f.fix,
          meta: `${f.id}${f.line ? ` · line ${f.line}` : ""}`,
        }))}
      />
    </ToolFrame>
  );
}
