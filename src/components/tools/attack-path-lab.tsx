"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Play, RotateCcw, StepForward, Trash2 } from "lucide-react";
import { ATTACK_CATALOG, DEFENCE_CONTROLS, TACTIC_ORDER } from "@/data/attack-lab";
import { simulateScenario, type StepOutcome } from "@/lib/security/attack-sim";
import { ToolFrame, buttonCls, labelCls } from "@/components/tools/lab-ui";
import { cn } from "@/lib/utils";

const SIMULATION_NOTE =
  "SIMULATED — an illustrative teaching model. It is not a measurement of any real control's effectiveness or of any real incident.";

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function ChainBuilder() {
  const [chain, setChain] = useState<string[]>(["T1566", "T1059", "T1003", "T1021"]);
  const [cursor, setCursor] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!playing) return;
    if (cursor >= chain.length - 1) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setCursor((c) => c + 1), 900);
    return () => clearTimeout(t);
  }, [playing, cursor, chain.length]);

  const techniques = chain.map((id) => ATTACK_CATALOG.find((t) => t.id === id)).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const tactics = new Set(techniques.map((t) => t.tactic));
  const groups = TACTIC_ORDER.map((tactic) => ({ tactic, items: ATTACK_CATALOG.filter((t) => t.tactic === tactic) })).filter((g) => g.items.length > 0);

  const reset = () => {
    setPlaying(false);
    setCursor(-1);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((g) => (
          <div key={g.tactic}>
            <div className={labelCls}>{g.tactic}</div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => { setChain([...chain, t.id]); reset(); }}
                  className="min-h-[44px] rounded-lg border border-brand-border px-3 text-left font-mono text-[11px] text-text-secondary hover:border-brand-primary hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50"
                >
                  <span className="text-text-muted">{t.id}</span> {t.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 rounded-xl border border-brand-border bg-background/60 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted">Attack chain ({chain.length} steps · {tactics.size} tactics)</h4>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={buttonCls} disabled={chain.length === 0 || reduced} onClick={() => { if (cursor >= chain.length - 1) setCursor(-1); setPlaying(true); }} title={reduced ? "Auto-play is disabled because reduced motion is on; use Step." : undefined}>
              <Play className="h-3.5 w-3.5" />Replay
            </button>
            <button type="button" className={buttonCls} disabled={chain.length === 0} onClick={() => { setPlaying(false); setCursor((c) => Math.min(c + 1, chain.length - 1)); }}>
              <StepForward className="h-3.5 w-3.5" />Step
            </button>
            <button type="button" className={buttonCls} onClick={reset}><RotateCcw className="h-3.5 w-3.5" />Reset</button>
            <button type="button" className={buttonCls} onClick={() => { setChain([]); reset(); }}><Trash2 className="h-3.5 w-3.5" />Clear</button>
          </div>
        </div>
        {techniques.length === 0 ? (
          <p className="font-mono text-xs text-text-muted">Add techniques above to build a chain.</p>
        ) : (
          <ol className="flex flex-wrap items-stretch gap-2" aria-label="Attack chain">
            {techniques.map((t, i) => {
              const state = i < cursor ? "done" : i === cursor ? "active" : "idle";
              return (
                <li key={`${t.id}-${i}`} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setChain(chain.filter((_, idx) => idx !== i))}
                    aria-label={`Remove step ${i + 1}: ${t.name}`}
                    className={cn(
                      "min-h-[56px] rounded-lg border px-3 py-2 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50",
                      state === "active" && "border-brand-primary bg-brand-deep",
                      state === "done" && "border-brand-primary/50 bg-brand-deep/40",
                      state === "idle" && "border-brand-border"
                    )}
                  >
                    <div className="font-mono text-[10px] text-text-muted">{i + 1}. {t.tactic}</div>
                    <div className="text-xs text-text-primary">{t.name}</div>
                    <div className="font-mono text-[10px] text-brand-primary">{t.id}</div>
                  </button>
                  {i < techniques.length - 1 ? <span aria-hidden className="text-brand-primary">→</span> : null}
                </li>
              );
            })}
          </ol>
        )}
        <p className="font-mono text-[11px] text-text-muted">Select a step to remove it. Technique IDs come from MITRE ATT&amp;CK.</p>
      </div>
    </div>
  );
}

const OUTCOME_STYLE: Record<StepOutcome, string> = {
  reached: "border-status-error/50 bg-status-error/10",
  detected: "border-status-warning/50 bg-status-warning/10",
  blocked: "border-brand-primary bg-brand-deep",
  "not-reached": "border-brand-border/50 opacity-50",
};
const OUTCOME_LABEL: Record<StepOutcome, string> = {
  reached: "Succeeds",
  detected: "Succeeds, detected",
  blocked: "BLOCKED",
  "not-reached": "Not reached",
};

function DefencePlayground() {
  const [enabled, setEnabled] = useState<string[]>([]);
  const result = useMemo(() => simulateScenario(enabled), [enabled]);

  const toggle = (id: string) => setEnabled((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        <div className={labelCls}>Security controls</div>
        <ul className="space-y-2">
          {DEFENCE_CONTROLS.map((c) => {
            const on = enabled.includes(c.id);
            return (
              <li key={c.id}>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  onClick={() => toggle(c.id)}
                  className={cn(
                    "flex min-h-[44px] w-full items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50",
                    on ? "border-brand-primary bg-brand-deep text-text-primary" : "border-brand-border text-text-secondary hover:border-brand-primary/60"
                  )}
                >
                  <span>{c.name}</span>
                  <span className={cn("font-mono text-[10px]", on ? "text-brand-primary" : "text-text-muted")}>{on ? "ON" : "OFF"}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <button type="button" className={buttonCls} onClick={() => setEnabled([])}>Turn all off</button>
      </div>
      <div className="space-y-3">
        <div className={labelCls}>Simulated intrusion</div>
        <ol className="space-y-2">
          {result.steps.map((s, i) => (
            <li key={s.step.techniqueId} className={cn("rounded-lg border p-3 text-xs", OUTCOME_STYLE[s.outcome])}>
              <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
                <span className="text-text-muted">{i + 1}. {s.step.techniqueId}</span>
                <span className={cn("font-semibold", s.outcome === "blocked" ? "text-brand-primary" : s.outcome === "reached" ? "text-status-error" : s.outcome === "detected" ? "text-status-warning" : "text-text-muted")}>{OUTCOME_LABEL[s.outcome]}</span>
              </div>
              <div className="mt-1 text-text-primary">{s.name}</div>
              <div className="text-text-secondary">{s.step.narrative}</div>
              {s.by ? <div className="mt-1 font-mono text-[10px] text-text-muted">via {s.by}</div> : null}
            </li>
          ))}
        </ol>
        <p role="status" aria-live="polite" className="rounded-lg border border-brand-border bg-background/60 p-3 text-xs text-text-primary">{result.summary}</p>
      </div>
    </div>
  );
}

export function AttackPathLab() {
  const [tab, setTab] = useState<"chain" | "defence">("chain");
  return (
    <ToolFrame
      title="Attack-path visualiser & defence playground"
      description="Build an attack chain from MITRE ATT&CK techniques and replay it step by step, or toggle security controls to see where a simulated intrusion would be stopped or detected."
    >
      <p className="rounded-lg border border-status-warning/40 bg-status-warning/10 p-3 font-mono text-[11px] text-status-warning">{SIMULATION_NOTE}</p>
      <div role="tablist" aria-label="Attack lab mode" className="flex gap-2">
        {([["chain", "Chain builder & replay"], ["defence", "Defence playground"]] as const).map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(buttonCls, tab === id && "border-brand-primary bg-brand-deep text-brand-primary")}
          >
            {label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{tab === "chain" ? <ChainBuilder /> : <DefencePlayground />}</div>
    </ToolFrame>
  );
}
