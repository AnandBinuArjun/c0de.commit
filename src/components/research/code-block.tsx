"use client";

import React, { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

interface CodeBlockProps {
  language: string;
  filename: string;
  code: string;
}

export function CodeBlock({ language, filename, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-brand-border bg-background-elevated">
      <div className="flex items-center justify-between border-b border-brand-border bg-background-card px-4 py-2">
        <div className="flex items-center gap-2 font-mono text-xs text-text-secondary">
          <Terminal className="h-3.5 w-3.5 text-brand-primary" />
          <span>{filename}</span>
          <span className="rounded bg-brand-deep px-1.5 py-0.5 text-[10px] text-brand-primary uppercase">
            {language}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code snippet"
          className="inline-flex items-center gap-1.5 rounded border border-brand-border bg-background-elevated px-2.5 py-1 font-mono text-xs text-text-secondary hover:border-brand-primary hover:text-brand-primary transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-brand-primary" />
              <span className="text-brand-primary">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-text-primary">
        <code>{code}</code>
      </pre>
    </div>
  );
}
