"use client";

import { useRef, type PointerEvent } from "react";
import { useMotionPreferences } from "@/components/motion/motion-provider";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import type { Discipline, HeroPhase } from "@/lib/motion/hero-sequence";

const systems = {
  automation: {
    shortLabel: "Automation",
    title: "AI Automation",
    caption: "Governed workflows move real events through guardrails, orchestration, and human approval.",
    stages: ["Intake", "Guardrails", "Orchestrate", "Approval", "Outcome"],
    meta: ["event", "rules", "tools", "human", "evidence"],
  },
  engineering: {
    shortLabel: "Engineering",
    title: "AI Engineering",
    caption: "Product architecture connects the interface, application logic, intelligence, durable state, and outcome.",
    stages: ["Interface", "Application", "Intelligence", "State", "Product"],
    meta: ["human", "logic", "models", "memory", "system"],
  },
} as const;

export function DualSignal({ mode, phase, onSelect }: { mode: Discipline; phase: HeroPhase; onSelect(mode: Discipline): void }) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const { finePointer, ready, reducedMotion } = useMotionPreferences();
  const system = systems[mode];

  useGSAP(() => {
    if (!surfaceRef.current || !ready || reducedMotion) return;
    const media = gsap.matchMedia();
    media.add({ narrow: "(max-width: 620px)", wide: "(min-width: 621px)" }, (context) => {
      const narrow = Boolean(context.conditions?.narrow);
      const track = surfaceRef.current?.querySelector<HTMLElement>(".system-track");
      const packet = surfaceRef.current?.querySelector<HTMLElement>(".system-packet");
      const trackLength = (narrow ? track?.clientHeight : track?.clientWidth) ?? 0;
      const packetSize = narrow ? packet?.offsetHeight ?? 0 : packet?.offsetWidth ?? 0;
      const packetTravel = Math.max(trackLength - packetSize, 0);
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .fromTo(".system-node", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .46, stagger: .075 })
        .fromTo(".system-track-live", narrow ? { scaleY: 0 } : { scaleX: 0 }, narrow ? { scaleY: 1, duration: .72 } : { scaleX: 1, duration: .72 }, "<.08")
        .fromTo(".system-packet", narrow ? { y: 0, autoAlpha: 0 } : { x: 0, autoAlpha: 0 }, narrow ? { y: packetTravel, autoAlpha: 1, duration: 1.05 } : { x: packetTravel, autoAlpha: 1, duration: 1.05 }, "<");
      return () => timeline.kill();
    });
    return () => media.revert();
  }, { scope: surfaceRef, dependencies: [mode, ready, reducedMotion], revertOnUpdate: true });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!finePointer || reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--signal-x", `${x * 3.2}deg`);
    event.currentTarget.style.setProperty("--signal-y", `${y * -3.2}deg`);
    event.currentTarget.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
    event.currentTarget.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
  };

  const resetPointer = () => {
    surfaceRef.current?.style.setProperty("--signal-x", "0deg");
    surfaceRef.current?.style.setProperty("--signal-y", "0deg");
  };

  return (
    <div
      ref={surfaceRef}
      className="dual-signal"
      data-mode={mode}
      data-phase={phase}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      aria-label="Interactive model of AI Automation and AI Engineering"
    >
      <div className="signal-grid" aria-hidden="true" />
      <div className="signal-topline" aria-hidden="true">
        <span>INTELLIGENT SYSTEM / LIVE MODEL</span>
        <span className="signal-online"><i /> SIGNAL ACTIVE</span>
      </div>

      <div className="system-mode-switch" aria-label="Choose a system view">
        {(Object.keys(systems) as Discipline[]).map((discipline, index) => (
          <button
            type="button"
            key={discipline}
            aria-label={`View ${systems[discipline].title} system`}
            aria-pressed={mode === discipline}
            onClick={() => onSelect(discipline)}
            onFocus={() => { if (phase === "settled") onSelect(discipline); }}
            onPointerEnter={() => { if (phase === "settled") onSelect(discipline); }}
          >
            <span>0{index + 1}</span>
            <strong>{systems[discipline].shortLabel}</strong>
          </button>
        ))}
      </div>

      <div className="system-stage" aria-hidden="true">
        <div className="system-stage-heading">
          <span>{mode === "automation" ? "ORCHESTRATED EXECUTION" : "PRODUCT ARCHITECTURE"}</span>
          <strong>{system.title}</strong>
        </div>
        <div className="system-track"><i /><i className="system-track-live" /><b className="system-packet" /></div>
        <div className="system-nodes">
          {system.stages.map((stage, index) => (
            <div className="system-node" key={stage}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{stage}</strong>
              <small>{system.meta[index]}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="signal-resolution" aria-hidden="true">
        <span><i /> governed flow</span>
        <b />
        <strong>Production system</strong>
        <b />
        <span><i /> engineered product</span>
      </div>
      <p className="signal-caption" aria-live="polite">{system.caption}</p>
    </div>
  );
}
