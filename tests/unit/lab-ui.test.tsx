import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { simulateScenario } from "@/lib/security/attack-sim";
import { LabSuite } from "@/components/tools/lab-suite";
import { CtfSandbox } from "@/components/tools/ctf-sandbox";
import { DetectionLibrary } from "@/components/research/detection-library";
import { GlossarySearch } from "@/components/research/glossary-search";
import { DETECTION_RULES } from "@/data/detections";
import { GLOSSARY } from "@/data/glossary";

describe("defence simulation", () => {
  it("completes with no controls", () => {
    const r = simulateScenario([]);
    expect(r.stoppedAt).toBeNull();
    expect(r.steps.every((s) => s.outcome === "reached")).toBe(true);
  });
  it("stops at the first prevented step and marks later steps not reached", () => {
    const r = simulateScenario(["email"]);
    expect(r.stoppedAt).toBe(0);
    expect(r.steps[0].outcome).toBe("blocked");
    expect(r.steps.slice(1).every((s) => s.outcome === "not-reached")).toBe(true);
  });
  it("records detections without stopping the attack", () => {
    const r = simulateScenario(["siem"]);
    expect(r.stoppedAt).toBeNull();
    expect(r.detectedCount).toBeGreaterThan(0);
  });
});

describe("lab suite UI", () => {
  it("renders the CVSS tool by default and switches tools", () => {
    render(<LabSuite />);
    expect(screen.getByRole("heading", { name: /CVSS v3.1 base score calculator/i })).toBeTruthy();
    expect(screen.getByText("9.8")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "JWT inspector" }));
    expect(screen.getByRole("heading", { name: /JWT inspector/i })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "IaC linter" }));
    expect(screen.getByText(/DF002/)).toBeTruthy();
  });

  it("exposes every tool in the navigation", () => {
    render(<LabSuite />);
    for (const name of ["CVSS 3.1", "JWT inspector", "Encoding & hashes", "Regex / ReDoS", "TLS certificate", "SPF · DKIM · DMARC", "IaC linter", "STRIDE threat model", "Attack path & defence", "CTF sandbox"]) {
      expect(screen.getByRole("button", { name })).toBeTruthy();
    }
  });
});

describe("CTF sandbox", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        getItem: (k: string) => store.get(k) ?? null,
        setItem: (k: string, v: string) => void store.set(k, v),
        removeItem: (k: string) => void store.delete(k),
        clear: () => store.clear(),
      },
    });
  });

  it("accepts the correct answer and awards points", async () => {
    render(<CtfSandbox />);
    fireEvent.change(document.getElementById("ans-encoding") as HTMLInputElement, {
      target: { value: "CC{BASE64_IS_NOT_ENCRYPTION}" },
    });
    fireEvent.click(screen.getAllByRole("button", { name: "Submit" })[0]);
    await waitFor(() => expect(screen.getByText(/Solved: \+10 pts/)).toBeTruthy());
    expect(screen.getByText(/Score 10 \/ 65/)).toBeTruthy();
  });

  it("rejects a wrong answer", async () => {
    render(<CtfSandbox />);
    fireEvent.change(document.getElementById("ans-hex") as HTMLInputElement, { target: { value: "nope" } });
    fireEvent.click(screen.getAllByRole("button", { name: "Submit" })[2]);
    await waitFor(() => expect(screen.getByText(/Not quite/)).toBeTruthy());
  });
});

describe("research libraries", () => {
  it("filters detection rules by format", () => {
    render(<DetectionLibrary rules={DETECTION_RULES} />);
    const total = DETECTION_RULES.length;
    expect(screen.getByText(`${total} of ${total} rules`)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "YARA" }));
    const yara = DETECTION_RULES.filter((r) => r.format === "YARA").length;
    expect(screen.getByText(`${yara} of ${total} rules`)).toBeTruthy();
  });

  it("searches the glossary", () => {
    render(<GlossarySearch terms={GLOSSARY} />);
    fireEvent.change(screen.getByLabelText(/Search the glossary/i), { target: { value: "ssrf" } });
    expect(screen.getByText("Server-Side Request Forgery", { exact: false })).toBeTruthy();
  });
});

describe("reference data integrity", () => {
  it("has unique detection ids and valid ATT&CK id shapes", () => {
    const ids = new Set(DETECTION_RULES.map((r) => r.id));
    expect(ids.size).toBe(DETECTION_RULES.length);
    for (const r of DETECTION_RULES) {
      for (const a of r.attack) expect(a.id).toMatch(/^T\d{4}(\.\d{3})?$/);
    }
  });
});
