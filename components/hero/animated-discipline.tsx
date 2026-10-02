import type { Discipline, HeroPhase } from "@/lib/motion/hero-sequence";

export function AnimatedDiscipline({ discipline, displayText, phase }: { discipline: Discipline; displayText: string; phase: HeroPhase }) {
  return (
    <span
      className="hero-discipline"
      data-discipline={discipline}
      data-phase={phase}
      data-testid="animated-discipline"
      aria-hidden="true"
    >
      <span className="hero-discipline-kicker">I work across</span>
      <span className="hero-discipline-word">
        <span>{displayText || "\u00a0"}</span>
        <i className="hero-type-caret" />
      </span>
      <span className="hero-title-outcome">One production mindset.</span>
    </span>
  );
}
