import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SecurityLabTools } from "@/components/tools/security-lab-tools";
import { InteractiveTerminal } from "@/components/terminal/interactive-terminal";

describe("SecurityLabTools (/tools) Interactive Component Verification", () => {
  it("renders Utility 01 (HTTP Header & CSP Evaluator) by default and updates score live when headers change", () => {
    render(<SecurityLabTools />);

    expect(screen.getByText(/OWASP HEADER POSTURE SCORE/i)).toBeInTheDocument();
    expect(screen.getByText("100 / 100")).toBeInTheDocument();
    expect(screen.getByText("A+")).toBeInTheDocument();

    const textarea = screen.getByLabelText(/Raw HTTP Response Headers/i);
    fireEvent.change(textarea, {
      target: { value: "X-Content-Type-Options: nosniff" },
    });

    expect(screen.getByText("15 / 100")).toBeInTheDocument();
    expect(screen.getByText("D")).toBeInTheDocument();
  });

  it("switches to Utility 02 (Entropy & Argon2id Calculator) and recalculates bit entropy on input", () => {
    render(<SecurityLabTools />);

    const tab2 = screen.getByRole("tab", { name: /Entropy & Argon2id Calculator/i });
    fireEvent.click(tab2);

    const input = screen.getByLabelText(/Test Passphrase Structure/i);
    expect(input).toBeInTheDocument();
    expect(screen.getByText("CRYPTOGRAPHIC GRADE")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "abc" } });
    expect(screen.getByText("CRITICAL WEAKNESS")).toBeInTheDocument();
    expect(screen.getByText("14 bits")).toBeInTheDocument();
  });

  it("switches to Utility 03 (CTI IOC Defanger & Extractor) and defangs URLs, IPs, and extracts CVEs live", () => {
    render(<SecurityLabTools />);

    const tab3 = screen.getByRole("tab", { name: /CTI IOC Defanger & Extractor/i });
    fireEvent.click(tab3);

    const textarea = screen.getByLabelText(/Raw Threat Advisory/i);
    fireEvent.change(textarea, {
      target: {
        value:
          "Active C2 at https://bad-actor.org/dropper and 203.0.113.55 exploiting CVE-2025-1337",
      },
    });

    expect(
      screen.getByText(/hxxps\[:\/\/\]bad-actor\[\.\]org\/dropper/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/203\.0\.113\[\.\]55/i)).toBeInTheDocument();
    expect(screen.getByText("CVE-2025-1337")).toBeInTheDocument();
  });

  it("executes allowlisted commands in InteractiveTerminal and blocks unauthorized commands", () => {
    render(<InteractiveTerminal embedded={true} />);

    const input = screen.getByPlaceholderText(/Enter command/i);
    const form = input.closest("form")!;

    fireEvent.change(input, { target: { value: "projects" } });
    fireEvent.submit(form);
    expect(
      screen.getByText(/21 VERIFIED SYSTEMS ON github.com\/AnandBinuArjun/i)
    ).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "cat /etc/passwd" } });
    fireEvent.submit(form);
    expect(
      screen.getByText(/Arbitrary shell execution is disabled by design/i)
    ).toBeInTheDocument();
  });
});
