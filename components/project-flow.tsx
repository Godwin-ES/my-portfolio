"use client";

import { useRef, type CSSProperties } from "react";
import { useDiagramSequence } from "@/components/motion/use-diagram-sequence";
import type { ProjectFlowStep } from "@/lib/project-types";

type MotionStyle = CSSProperties & { "--motion-order": number };

export function ProjectFlow({ steps }: { steps: ProjectFlowStep[] }) {
  const flowRef = useRef<HTMLOListElement>(null);
  useDiagramSequence(flowRef);
  if (!steps.length) return null;

  return (
    <ol ref={flowRef} className="project-flow">
      {steps.slice(0, 5).map((step, index, visibleSteps) => (
        <li data-testid="flow-step" data-motion-node data-motion-order={index} style={{ "--motion-order": index } as MotionStyle} key={`${index}-${step.label}`}>
          <span data-motion-label>{String(index + 1).padStart(2, "0")}</span>
          <strong>{step.label}</strong>
          {step.detail ? <small>{step.detail}</small> : null}
          {index < visibleSteps.length - 1 ? <i className="flow-connector" data-motion-connector aria-hidden="true" /> : null}
        </li>
      ))}
    </ol>
  );
}
