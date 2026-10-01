import type { ProjectFlowStep } from "@/lib/project-types";
export function ProjectFlow({ steps }: { steps: ProjectFlowStep[] }) {
  if (!steps.length) return null;
  return <ol className="project-flow">{steps.map((step, index) => <li key={`${index}-${step.label}`}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step.label}</strong>{step.detail ? <small>{step.detail}</small> : null}</li>)}</ol>;
}
