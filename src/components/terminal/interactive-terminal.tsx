"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Terminal, X, ArrowUpRight, CornerDownLeft } from "lucide-react";
import {
  ALLOWED_TERMINAL_COMMANDS,
  executeAllowlistedTerminalCommand,
  type TerminalCommandOutput,
} from "@/components/terminal/command-registry";

interface InteractiveTerminalProps {
  isOpen?: boolean;
  onClose?: () => void;
  embedded?: boolean;
}

export function InteractiveTerminal({
  isOpen = true,
  onClose,
  embedded = false,
}: InteractiveTerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalCommandOutput[]>([
    executeAllowlistedTerminalCommand("help"),
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen && !embedded) {
    return null;
  }

  const handleRunCommand = (cmdText: string) => {
    const result = executeAllowlistedTerminalCommand(cmdText);
    if (result.shouldClear) {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, result]);
    }
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRunCommand(input);
  };

  const terminalContent = (
    <div
      className="flex flex-col overflow-hidden rounded-xl border border-brand-border bg-background-elevated/95 shadow-card-elevated backdrop-blur-md"
      role="region"
      aria-label="CODE.COMMIT Interactive Navigation Terminal"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-brand-border bg-background-card px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-brand-primary" />
          <span className="font-mono text-xs font-medium text-text-primary">
            code.commit@nav-console:~
          </span>
          <span className="rounded bg-brand-deep px-1.5 py-0.5 font-mono text-[10px] text-brand-primary">
            ALLOWLISTED UI
          </span>
        </div>
        {onClose && !embedded && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close terminal modal"
            className="rounded p-1 text-text-muted hover:bg-background-elevated hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Quick Command Pills for Accessibility / Touch */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-brand-border/50 bg-background/60 px-4 py-2">
        <span className="mr-1 font-mono text-[11px] text-text-muted">Quick execute:</span>
        {ALLOWED_TERMINAL_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => handleRunCommand(cmd)}
            className="rounded border border-brand-border/80 bg-background-card px-2 py-0.5 font-mono text-xs text-text-secondary hover:border-brand-primary hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Output Log */}
      <div
        ref={scrollContainerRef}
        className="h-64 overflow-y-auto p-4 font-mono text-xs leading-relaxed space-y-4"
        aria-live="polite"
      >
        {history.length === 0 ? (
          <p className="text-text-muted">Console cleared. Type &apos;help&apos; or select a command above.</p>
        ) : (
          history.map((entry, idx) => (
            <div key={`${entry.command}-${idx}`} className="space-y-1.5">
              {entry.command && (
                <div className="flex items-center gap-2 text-brand-primary">
                  <span>$</span>
                  <span className="font-semibold">{entry.command}</span>
                </div>
              )}
              <div className="space-y-1 pl-3 border-l border-brand-border/60 text-text-secondary">
                {entry.lines.map((line, lineIdx) => (
                  <p key={lineIdx} className="whitespace-pre-wrap">
                    {line}
                  </p>
                ))}
                {entry.actionHref && entry.actionLabel && (
                  <div className="pt-1.5">
                    <Link
                      href={entry.actionHref}
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 rounded bg-brand-deep/80 border border-brand-primary/40 px-2.5 py-1 text-xs font-medium text-brand-primary hover:bg-brand-primary hover:text-background transition-colors"
                    >
                      <span>{entry.actionLabel}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Prompt */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-brand-border bg-background px-4 py-2.5"
      >
        <label htmlFor="terminal-command-input" className="font-mono text-xs text-brand-primary">
          $
        </label>
        <input
          id="terminal-command-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command (help, services, projects, research, contact)..."
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent font-mono text-xs text-text-primary placeholder:text-text-muted focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Execute command"
          className="inline-flex items-center gap-1 rounded border border-brand-border bg-background-card px-2.5 py-1 font-mono text-xs text-text-secondary hover:border-brand-primary hover:text-brand-primary"
        >
          <span>Run</span>
          <CornerDownLeft className="h-3 w-3" />
        </button>
      </form>
    </div>
  );

  if (embedded) {
    return terminalContent;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Navigation Console"
    >
      <div className="w-full max-w-2xl">{terminalContent}</div>
    </div>
  );
}
