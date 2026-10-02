"use client";

import { useRef, useState, type PointerEvent } from "react";

type Lane = "automation" | "engineering";

const lanes = {
  automation: {
    title: "AI Automation",
    code: "FLOW / A",
    caption: "Governed workflows move real events through validation, orchestration, and human approval.",
    steps: ["Event", "Validate", "Orchestrate", "Approve"],
  },
  engineering: {
    title: "AI Engineering",
    code: "BUILD / B",
    caption: "Product architecture connects data, application logic, intelligence, and the interface people use.",
    steps: ["Data", "Logic", "Intelligence", "Interface"],
  },
} as const;

export function DualSignal() {
  const [activeLane, setActiveLane] = useState<Lane | null>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--signal-x", `${x * 4}deg`);
    event.currentTarget.style.setProperty("--signal-y", `${y * -4}deg`);
    event.currentTarget.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
    event.currentTarget.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
  };

  const clearPointerState = () => {
    const surface = surfaceRef.current;
    if (!surface) return;
    surface.style.setProperty("--signal-x", "0deg");
    surface.style.setProperty("--signal-y", "0deg");
    if (!surface.contains(document.activeElement)) setActiveLane(null);
  };

  const caption = activeLane
    ? lanes[activeLane].caption
    : "Two disciplines converge on one observable, usable production system.";

  return (
    <div
      ref={surfaceRef}
      className="dual-signal"
      data-active={activeLane ?? "none"}
      onPointerMove={handlePointerMove}
      onPointerLeave={clearPointerState}
      aria-label="AI Automation and AI Engineering converge into a production system"
    >
      <div className="signal-grid" aria-hidden="true" />
      <div className="signal-topline" aria-hidden="true">
        <span>DUAL SIGNAL / SYSTEM MAP</span>
        <span className="signal-online"><i /> READY</span>
      </div>

      <div className="signal-lanes">
        {(Object.keys(lanes) as Lane[]).map((lane) => {
          const content = lanes[lane];
          return (
            <button
              key={lane}
              type="button"
              className={`signal-lane signal-lane-${lane}`}
              aria-label={`${content.title} lane`}
              aria-pressed={activeLane === lane}
              onFocus={() => setActiveLane(lane)}
              onBlur={(event) => {
                if (!surfaceRef.current?.contains(event.relatedTarget)) setActiveLane(null);
              }}
              onPointerEnter={() => setActiveLane(lane)}
              onClick={() => setActiveLane(lane)}
            >
              <span className="signal-lane-heading">
                <small>{content.code}</small>
                <strong>{content.title}</strong>
              </span>
              <span className="signal-path" aria-hidden="true">
                {content.steps.map((step, index) => (
                  <span className="signal-step" key={step}>
                    <i>{String(index + 1).padStart(2, "0")}</i>
                    <b>{step}</b>
                  </span>
                ))}
              </span>
            </button>
          );
        })}
      </div>

      <div className="signal-convergence" aria-hidden="true"><i /><i /></div>
      <div className="signal-outcome">
        <span>SHARED OUTCOME</span>
        <strong>Production system</strong>
        <small>Observable · usable · resilient</small>
      </div>
      <p className="signal-caption" aria-live="polite">{caption}</p>
    </div>
  );
}
