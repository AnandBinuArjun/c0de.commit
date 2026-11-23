"use client";

import React, { useMemo, useState } from "react";
import {
  CVSS_OPTIONS,
  DEFAULT_CVSS,
  calculateCvss31,
  digestHex,
  identifyHash,
  inspectJwt,
  parseCvssVector,
  transformEncoding,
  type CvssMetrics,
  type DigestAlgorithm,
  type EncodingOp,
} from "@/lib/security/lab-engine";
import { CopyButton, FindingList, ToolFrame, buttonCls, inputCls, labelCls } from "@/components/tools/lab-ui";
import { cn } from "@/lib/utils";

const METRIC_LABELS: Record<keyof CvssMetrics, string> = {
  AV: "Attack Vector",
  AC: "Attack Complexity",
  PR: "Privileges Required",
  UI: "User Interaction",
  S: "Scope",
  C: "Confidentiality",
  I: "Integrity",
  A: "Availability",
};

const SEVERITY_COLOUR: Record<string, string> = {
  None: "text-text-secondary",
  Low: "text-status-info",
  Medium: "text-status-warning",
  High: "text-status-error",
  Critical: "text-status-error",
};

export function CvssTool() {
  const [metrics, setMetrics] = useState<CvssMetrics>(DEFAULT_CVSS);
  const [vectorInput, setVectorInput] = useState("");
  const [vectorError, setVectorError] = useState(false);
  const result = useMemo(() => calculateCvss31(metrics), [metrics]);

  return (
    <ToolFrame
      title="CVSS v3.1 base score calculator"
      description="Select base metrics or paste a vector string. Scoring follows the FIRST CVSS v3.1 specification and runs locally."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {(Object.keys(CVSS_OPTIONS) as (keyof CvssMetrics)[]).map((key) => (
            <fieldset key={key}>
              <legend className={labelCls}>{METRIC_LABELS[key]}</legend>
              <div className="flex flex-wrap gap-2">
                {CVSS_OPTIONS[key].map((o) => {
                  const active = metrics[key] === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setMetrics({ ...metrics, [key]: o.value } as CvssMetrics)}
                      className={cn(
                        "min-h-[44px] rounded-lg border px-3 font-mono text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50",
                        active ? "border-brand-primary bg-brand-deep text-brand-primary" : "border-brand-border text-text-secondary hover:border-brand-primary/60"
                      )}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
        <div className="space-y-4 rounded-xl border border-brand-border bg-background/60 p-5">
          <div className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Base score</div>
          <div className={cn("font-display text-6xl font-bold", SEVERITY_COLOUR[result.severity])} aria-live="polite">
            {result.base.toFixed(1)}
          </div>
          <div className={cn("font-mono text-sm font-semibold", SEVERITY_COLOUR[result.severity])}>{result.severity}</div>
          <dl className="grid grid-cols-2 gap-2 font-mono text-[11px] text-text-secondary">
            <dt>Impact</dt>
            <dd className="text-right text-text-primary">{result.impact.toFixed(1)}</dd>
            <dt>Exploitability</dt>
            <dd className="text-right text-text-primary">{result.exploitability.toFixed(1)}</dd>
          </dl>
          <code className="block break-all rounded bg-background p-2 font-mono text-[11px] text-text-primary">{result.vector}</code>
          <CopyButton text={result.vector} label="Copy vector" />
        </div>
      </div>
      <div>
        <label htmlFor="cvss-vector" className={labelCls}>Load from vector string</label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="cvss-vector"
            className={inputCls}
            placeholder="CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
            value={vectorInput}
            onChange={(e) => setVectorInput(e.target.value)}
            aria-invalid={vectorError}
          />
          <button
            type="button"
            className={buttonCls}
            onClick={() => {
              const parsed = parseCvssVector(vectorInput);
              setVectorError(!parsed);
              if (parsed) setMetrics(parsed);
            }}
          >
            Apply
          </button>
        </div>
        {vectorError ? <p role="alert" className="mt-2 font-mono text-xs text-status-error">Not a valid CVSS v3.x base vector.</p> : null}
      </div>
    </ToolFrame>
  );
}

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZW1vLXVzZXIiLCJyb2xlIjoidmlld2VyIiwiaWF0IjoxNzAwMDAwMDAwfQ.c2lnbmF0dXJl";

export function JwtTool() {
  const [token, setToken] = useState(SAMPLE_JWT);
  const report = useMemo(() => inspectJwt(token), [token]);
  return (
    <ToolFrame
      title="JWT inspector"
      description="Decode a token's header and claims and review common weaknesses. Decode only: the signature is not verified and nothing leaves your browser. Do not paste production tokens that are still valid."
    >
      <div>
        <label htmlFor="jwt-input" className={labelCls}>Token</label>
        <textarea id="jwt-input" rows={4} className={inputCls} value={token} onChange={(e) => setToken(e.target.value)} spellCheck={false} />
      </div>
      {!report.valid ? (
        <p role="alert" className="font-mono text-xs text-status-error">{report.error}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className={labelCls}>Header</div>
            <pre className="overflow-auto rounded-lg border border-brand-border bg-background p-3 font-mono text-xs text-text-primary">{JSON.stringify(report.header, null, 2)}</pre>
          </div>
          <div>
            <div className={labelCls}>Payload</div>
            <pre className="overflow-auto rounded-lg border border-brand-border bg-background p-3 font-mono text-xs text-text-primary">{JSON.stringify(report.payload, null, 2)}</pre>
          </div>
          {report.issuedAt || report.expiresAt ? (
            <p className="font-mono text-xs text-text-secondary md:col-span-2">
              {report.issuedAt ? `Issued: ${report.issuedAt}` : ""} {report.expiresAt ? ` · Expires: ${report.expiresAt}` : ""}
            </p>
          ) : null}
          <div className="md:col-span-2">
            <FindingList findings={report.findings} />
          </div>
        </div>
      )}
    </ToolFrame>
  );
}

const ENCODING_OPS: { value: EncodingOp; label: string }[] = [
  { value: "base64-encode", label: "Base64 encode" },
  { value: "base64-decode", label: "Base64 decode" },
  { value: "hex-encode", label: "Hex encode" },
  { value: "hex-decode", label: "Hex decode" },
  { value: "url-encode", label: "URL encode" },
  { value: "url-decode", label: "URL decode" },
];

const DIGESTS: DigestAlgorithm[] = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];

export function EncodingTool() {
  const [op, setOp] = useState<EncodingOp>("base64-encode");
  const [input, setInput] = useState("CODE.COMMIT");
  const [digests, setDigests] = useState<Record<string, string>>({});
  const out = useMemo(() => transformEncoding(op, input), [op, input]);
  const identified = useMemo(() => identifyHash(input), [input]);

  const computeDigests = async () => {
    const entries = await Promise.all(DIGESTS.map(async (a) => [a, await digestHex(a, input)] as const));
    setDigests(Object.fromEntries(entries));
  };

  return (
    <ToolFrame
      title="Encoding, hash & identification workbench"
      description="Convert between common encodings, compute SHA digests with the browser's Web Crypto API, and identify likely hash formats. Encoding is not encryption."
    >
      <div>
        <label htmlFor="enc-input" className={labelCls}>Input</label>
        <textarea id="enc-input" rows={3} className={inputCls} value={input} onChange={(e) => { setInput(e.target.value); setDigests({}); }} spellCheck={false} />
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Operation">
        {ENCODING_OPS.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={op === o.value}
            onClick={() => setOp(o.value)}
            className={cn(buttonCls, op === o.value && "border-brand-primary bg-brand-deep text-brand-primary")}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className={labelCls + " mb-0"}>Output</span>
          {out.ok ? <CopyButton text={out.output} /> : null}
        </div>
        {out.ok ? (
          <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-all rounded-lg border border-brand-border bg-background p-3 font-mono text-xs text-text-primary">{out.output}</pre>
        ) : (
          <p role="alert" className="font-mono text-xs text-status-error">{out.error}</p>
        )}
      </div>
      <div className="space-y-3 rounded-xl border border-brand-border/70 bg-background/60 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className={labelCls + " mb-0"}>Digests of the input</span>
          <button type="button" className={buttonCls} onClick={computeDigests}>Compute SHA digests</button>
        </div>
        {Object.keys(digests).length > 0 ? (
          <dl className="space-y-2">
            {DIGESTS.map((a) => (
              <div key={a}>
                <dt className="font-mono text-[11px] text-text-muted">{a}</dt>
                <dd className="break-all font-mono text-xs text-text-primary">{digests[a]}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <p className="font-mono text-xs text-text-secondary">
          Hash format guess for the input: <span className="text-brand-primary">{identified.join(", ") || "n/a"}</span>
        </p>
      </div>
    </ToolFrame>
  );
}
