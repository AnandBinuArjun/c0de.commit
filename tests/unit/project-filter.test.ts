import { describe, it, expect } from "vitest";
import { PROJECTS_DATA } from "@/data/projects";
import { filterProjects } from "@/components/projects/project-filter-utils";

describe("Project Filtering & Portfolio Verification", () => {
  it("contains all 21 verified portfolio projects including CloudSentinel, AegisFlow, SENTINEL-IoT, RANSOMWATCH, and REDRECON-X", () => {
    expect(PROJECTS_DATA.length).toBe(21);
    const slugs = PROJECTS_DATA.map((p) => p.slug);
    expect(slugs).toContain("cloudsentinel");
    expect(slugs).toContain("aegisflow");
    expect(slugs).toContain("sentinel-iot");
    expect(slugs).toContain("ransomwatch");
    expect(slugs).toContain("redrecon-x");
    expect(slugs).toContain("threat-intelligence-cti-analysis");
    expect(slugs).toContain("total-entity-exposure-monitor");
    expect(slugs).toContain("codex-cyberstrike");
    expect(slugs).toContain("civicshield");
  });

  it("filters projects by category accurately", () => {
    const cloudProjects = filterProjects(PROJECTS_DATA, {
      category: "Cloud Security",
    });
    expect(cloudProjects.length).toBeGreaterThanOrEqual(1);
    expect(cloudProjects[0].slug).toBe("cloudsentinel");
  });

  it("filters projects by technology and search query", () => {
    const iotResults = filterProjects(PROJECTS_DATA, {
      query: "honeypot",
      technology: "Python",
    });
    expect(iotResults.some((p) => p.slug === "sentinel-iot")).toBe(true);
  });

  it("distinguishes implementedFeatures from plannedFeatures on every project", () => {
    for (const project of PROJECTS_DATA) {
      expect(project.implementedFeatures.length).toBeGreaterThan(0);
      expect(project.plannedFeatures.length).toBeGreaterThan(0);
    }
  });
});
