import {
  ATTACK_CATALOG,
  DEFENCE_CONTROLS,
  SIMULATED_SCENARIO,
  type ScenarioStep,
} from "@/data/attack-lab";

export type StepOutcome = "reached" | "detected" | "blocked" | "not-reached";

export interface SimulatedStep {
  step: ScenarioStep;
  name: string;
  outcome: StepOutcome;
  by?: string;
}

export interface SimulationResult {
  steps: SimulatedStep[];
  stoppedAt: number | null;
  detectedCount: number;
  summary: string;
}

/**
 * Qualitative walk through the scenario. The first step prevented by an enabled
 * control ends the attack; steps a control only detects are flagged but proceed.
 * This is an educational model, not a measurement of real control effectiveness.
 */
export function simulateScenario(enabledControlIds: string[]): SimulationResult {
  const enabled = DEFENCE_CONTROLS.filter((c) => enabledControlIds.includes(c.id));
  const steps: SimulatedStep[] = [];
  let stoppedAt: number | null = null;
  let detectedCount = 0;

  SIMULATED_SCENARIO.forEach((step, index) => {
    const name = ATTACK_CATALOG.find((t) => t.id === step.techniqueId)?.name ?? step.techniqueId;
    if (stoppedAt !== null) {
      steps.push({ step, name, outcome: "not-reached" });
      return;
    }
    const blocker = enabled.find((c) => c.prevents.includes(step.techniqueId));
    if (blocker) {
      stoppedAt = index;
      steps.push({ step, name, outcome: "blocked", by: blocker.name });
      return;
    }
    const detector = enabled.find((c) => c.detects.includes(step.techniqueId));
    if (detector) {
      detectedCount++;
      steps.push({ step, name, outcome: "detected", by: detector.name });
      return;
    }
    steps.push({ step, name, outcome: "reached" });
  });

  let summary: string;
  if (stoppedAt !== null) {
    summary = `The attack is stopped at step ${stoppedAt + 1} (${steps[stoppedAt].name}).`;
  } else if (detectedCount > 0) {
    summary = `The attack completes, but ${detectedCount} step(s) generate detections that could trigger a response.`;
  } else {
    summary = "The attack completes with no controls in the way and no detections raised.";
  }
  return { steps, stoppedAt, detectedCount, summary };
}
