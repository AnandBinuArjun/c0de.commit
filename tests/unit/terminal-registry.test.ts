import { describe, it, expect } from "vitest";
import {
  ALLOWED_TERMINAL_COMMANDS,
  executeAllowlistedTerminalCommand,
} from "@/components/terminal/command-registry";

describe("Allowlisted Interactive Terminal Registry", () => {
  it("supports all 7 required allowlisted commands", () => {
    expect(ALLOWED_TERMINAL_COMMANDS).toEqual([
      "help",
      "about",
      "services",
      "projects",
      "research",
      "contact",
      "clear",
    ]);
  });

  it("returns navigation links for services, projects, research, about, and contact", () => {
    expect(executeAllowlistedTerminalCommand("services").actionHref).toBe("/services");
    expect(executeAllowlistedTerminalCommand("projects").actionHref).toBe("/work");
    expect(executeAllowlistedTerminalCommand("research").actionHref).toBe("/research");
    expect(executeAllowlistedTerminalCommand("about").actionHref).toBe("/about");
    expect(executeAllowlistedTerminalCommand("contact").actionHref).toBe("/contact");
  });

  it("flags shouldClear on the clear command", () => {
    const res = executeAllowlistedTerminalCommand("clear");
    expect(res.shouldClear).toBe(true);
  });

  it("blocks arbitrary shell commands and never executes system binaries", () => {
    const res = executeAllowlistedTerminalCommand("rm -rf / && whoami");
    expect(res.actionHref).toBeUndefined();
    expect(res.lines.join(" ")).toContain("Arbitrary shell execution is disabled by design");
  });
});
