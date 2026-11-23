"use client";

import React, { useMemo, useRef, useState } from "react";
import { Download, Plus, Trash2 } from "lucide-react";
import {
  generateThreats,
  threatModelMarkdown,
  type ElementKind,
  type TmElement,
  type TmFlow,
} from "@/lib/security/lab-engine";
import { CopyButton, ToolFrame, buttonCls, inputCls, labelCls } from "@/components/tools/lab-ui";
import { cn } from "@/lib/utils";

const SAMPLE_ELEMENTS: TmElement[] = [
  { id: "e1", name: "Browser", kind: "external", zone: "Internet" },
  { id: "e2", name: "Web API", kind: "process", zone: "App tier" },
  { id: "e3", name: "Database", kind: "datastore", zone: "Data tier" },
];
const SAMPLE_FLOWS: TmFlow[] = [
  { id: "f1", from: "e1", to: "e2", label: "HTTPS" },
  { id: "f2", from: "e2", to: "e3", label: "SQL" },
];

const KIND_LABEL: Record<ElementKind, string> = {
  external: "External entity",
  process: "Process / service",
  datastore: "Data store",
};

function Diagram({ elements, flows }: { elements: TmElement[]; flows: TmFlow[] }) {
  const zones = Array.from(new Set(elements.map((e) => e.zone.trim() || "Unassigned")));
  const colW = 200;
  const rowH = 76;
  const pos = new Map<string, { x: number; y: number }>();
  zones.forEach((zone, zi) => {
    elements
      .filter((e) => (e.zone.trim() || "Unassigned") === zone)
      .forEach((e, ri) => pos.set(e.id, { x: zi * colW + 20, y: ri * rowH + 44 }));
  });
  const rows = Math.max(1, ...zones.map((z) => elements.filter((e) => (e.zone.trim() || "Unassigned") === z).length));
  const width = Math.max(zones.length * colW, 320);
  const height = rows * rowH + 56;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full rounded-xl border border-brand-border bg-background" role="img" aria-label="Data flow diagram with trust boundaries">
      <defs>
        <marker id="tm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#00F58A" />
        </marker>
      </defs>
      {zones.map((zone, zi) => (
        <g key={zone}>
          <rect x={zi * colW + 6} y={6} width={colW - 12} height={height - 12} rx={10} fill="none" stroke="#204D35" strokeDasharray="5 4" />
          <text x={zi * colW + 16} y={26} fill="#72877A" fontSize={11} fontFamily="monospace">{zone}</text>
        </g>
      ))}
      {flows.map((f) => {
        const a = pos.get(f.from);
        const b = pos.get(f.to);
        if (!a || !b) return null;
        const x1 = a.x + 150 > b.x ? a.x + 75 : a.x + 150;
        const y1 = a.y + 20;
        const x2 = b.x > a.x ? b.x : b.x + 150;
        const y2 = b.y + 20;
        return (
          <g key={f.id}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00F58A" strokeWidth={1.4} markerEnd="url(#tm-arrow)" opacity={0.85} />
            {f.label ? <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 5} fill="#A5B7AA" fontSize={10} textAnchor="middle" fontFamily="monospace">{f.label}</text> : null}
          </g>
        );
      })}
      {elements.map((e) => {
        const p = pos.get(e.id);
        if (!p) return null;
        return (
          <g key={e.id}>
            <rect x={p.x} y={p.y} width={150} height={40} rx={e.kind === "process" ? 20 : 6} fill="#101D15" stroke={e.kind === "datastore" ? "#65B9FF" : "#204D35"} />
            <text x={p.x + 75} y={p.y + 24} fill="#F3F8F5" fontSize={12} textAnchor="middle">{e.name.length > 18 ? `${e.name.slice(0, 17)}…` : e.name}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function ThreatModelBuilder() {
  const [name, setName] = useState("Customer portal");
  const [elements, setElements] = useState<TmElement[]>(SAMPLE_ELEMENTS);
  const [flows, setFlows] = useState<TmFlow[]>(SAMPLE_FLOWS);
  const counter = useRef(100);
  const [form, setForm] = useState({ name: "", kind: "process" as ElementKind, zone: "App tier" });
  const [flowForm, setFlowForm] = useState({ from: "e1", to: "e2", label: "" });

  const threats = useMemo(() => generateThreats(elements, flows), [elements, flows]);
  const markdown = useMemo(() => threatModelMarkdown(name, elements, flows, threats), [name, elements, flows, threats]);

  const addElement = () => {
    if (!form.name.trim()) return;
    counter.current += 1;
    setElements([...elements, { id: `e${counter.current}`, name: form.name.trim().slice(0, 40), kind: form.kind, zone: form.zone.trim().slice(0, 30) || "Unassigned" }]);
    setForm({ ...form, name: "" });
  };
  const addFlow = () => {
    if (!flowForm.from || !flowForm.to || flowForm.from === flowForm.to) return;
    counter.current += 1;
    setFlows([...flows, { id: `f${counter.current}`, from: flowForm.from, to: flowForm.to, label: flowForm.label.trim().slice(0, 30) }]);
    setFlowForm({ ...flowForm, label: "" });
  };
  const removeElement = (id: string) => {
    setElements(elements.filter((e) => e.id !== id));
    setFlows(flows.filter((f) => f.from !== id && f.to !== id));
  };
  const download = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "threat-model.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const idToName = new Map(elements.map((e) => [e.id, e.name]));

  return (
    <ToolFrame
      title="STRIDE threat-model builder"
      description="Describe your system's components, trust zones and data flows. The builder generates candidate STRIDE threats and mitigations, prioritising anything that crosses a trust boundary. Output is a starting point that needs human review."
    >
      <div>
        <label htmlFor="tm-name" className={labelCls}>System name</label>
        <input id="tm-name" className={inputCls} value={name} onChange={(e) => setName(e.target.value)} maxLength={60} />
      </div>

      <Diagram elements={elements} flows={flows} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <div className={labelCls}>Add component</div>
          <div className="grid gap-2 sm:grid-cols-3">
            <input aria-label="Component name" className={inputCls} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <select aria-label="Component type" className={inputCls} value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value as ElementKind })}>
              {(Object.keys(KIND_LABEL) as ElementKind[]).map((k) => <option key={k} value={k}>{KIND_LABEL[k]}</option>)}
            </select>
            <input aria-label="Trust zone" className={inputCls} placeholder="Trust zone" value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value })} />
          </div>
          <button type="button" className={buttonCls} onClick={addElement}><Plus className="h-3.5 w-3.5" />Add component</button>
          <ul className="space-y-1.5">
            {elements.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-2 rounded-lg border border-brand-border/70 px-3 py-2 font-mono text-xs">
                <span className="text-text-primary">{e.name} <span className="text-text-muted">· {KIND_LABEL[e.kind]} · {e.zone}</span></span>
                <button type="button" aria-label={`Remove ${e.name}`} onClick={() => removeElement(e.id)} className="flex h-8 w-8 items-center justify-center rounded text-text-muted hover:text-status-error focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50"><Trash2 className="h-3.5 w-3.5" /></button>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <div className={labelCls}>Add data flow</div>
          <div className="grid gap-2 sm:grid-cols-3">
            <select aria-label="Flow source" className={inputCls} value={flowForm.from} onChange={(e) => setFlowForm({ ...flowForm, from: e.target.value })}>
              {elements.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
            <select aria-label="Flow destination" className={inputCls} value={flowForm.to} onChange={(e) => setFlowForm({ ...flowForm, to: e.target.value })}>
              {elements.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
            <input aria-label="Flow label" className={inputCls} placeholder="Label (e.g. HTTPS)" value={flowForm.label} onChange={(e) => setFlowForm({ ...flowForm, label: e.target.value })} />
          </div>
          <button type="button" className={buttonCls} onClick={addFlow}><Plus className="h-3.5 w-3.5" />Add flow</button>
          <ul className="space-y-1.5">
            {flows.map((f) => (
              <li key={f.id} className="flex items-center justify-between gap-2 rounded-lg border border-brand-border/70 px-3 py-2 font-mono text-xs">
                <span className="text-text-primary">{idToName.get(f.from) ?? "?"} → {idToName.get(f.to) ?? "?"} <span className="text-text-muted">{f.label}</span></span>
                <button type="button" aria-label="Remove flow" onClick={() => setFlows(flows.filter((x) => x.id !== f.id))} className="flex h-8 w-8 items-center justify-center rounded text-text-muted hover:text-status-error focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50"><Trash2 className="h-3.5 w-3.5" /></button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted">{threats.length} candidate threats</h4>
          <div className="flex gap-2">
            <CopyButton text={markdown} label="Copy Markdown" />
            <button type="button" className={cn(buttonCls, "min-h-[36px] px-3 py-1")} onClick={download}><Download className="h-3.5 w-3.5" />Download .md</button>
          </div>
        </div>
        <div className="max-h-[28rem] overflow-auto rounded-xl border border-brand-border">
          <table className="w-full min-w-[640px] text-left text-xs">
            <thead className="sticky top-0 bg-background-elevated font-mono text-[11px] uppercase text-text-muted">
              <tr><th className="p-3">Priority</th><th className="p-3">Category</th><th className="p-3">Target</th><th className="p-3">Mitigation</th></tr>
            </thead>
            <tbody>
              {threats.map((t, i) => (
                <tr key={`${t.target}-${t.category}-${i}`} className="border-t border-brand-border/60 align-top">
                  <td className={cn("p-3 font-mono font-semibold", t.priority === "High" ? "text-status-error" : t.priority === "Medium" ? "text-status-warning" : "text-text-secondary")}>{t.priority}</td>
                  <td className="p-3 text-text-primary">{t.category}</td>
                  <td className="p-3 text-text-secondary">{t.target}</td>
                  <td className="p-3 text-text-secondary">{t.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ToolFrame>
  );
}
