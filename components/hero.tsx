"use client";

import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { useState } from "react";
import { SignalField } from "@/components/hero/signal-field";
import { LocalTime } from "@/components/local-time";
import { Magnetic } from "@/components/motion/magnetic";
import { site } from "@/content/site";

type Discipline = "automation" | "engineering";

const disciplines: Record<Discipline, { title: string; caption: string; stages: string[] }> = {
  automation: {
    title: "AI Automation",
    caption: "Governed workflows that move real events through guardrails, orchestration, and human approval.",
    stages: ["Intake", "Guardrails", "Orchestrate", "Approval", "Outcome"],
  },
  engineering: {
    title: "AI Engineering",
    caption: "Product architecture that connects the interface, application logic, intelligence, and durable state.",
    stages: ["Interface", "Application", "Intelligence", "State", "Product"],
  },
};

export type HeroStat = { value: number; label: string };

export function Hero({ stats = [] }: { stats?: HeroStat[] }) {
  const [selected, setSelected] = useState<Discipline>("automation");
  const [hovered, setHovered] = useState<Discipline | null>(null);
  const active = hovered ?? selected;
  const system = disciplines[active];

  const word = (discipline: Discipline, label: string) => (
    <em
      className="hero-discipline"
      data-tone={discipline}
      data-active={active === discipline}
      onPointerEnter={() => setHovered(discipline)}
      onPointerLeave={() => setHovered(null)}
    >{label}</em>
  );

  return (
    <section id="top" className="hero" data-focus={active}>
      <SignalField focus={active} />
      <div className="hero-shade" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-meta hero-enter" style={{ "--d": 0 } as React.CSSProperties}>
          <span className="hero-meta-name">{site.name}</span>
          <span className="hero-meta-role">{site.eyebrow}</span>
          <LocalTime className="hero-meta-time" />
        </div>

        <h1 className="hero-title">
          <span className="hero-line"><span style={{ "--d": 1 } as React.CSSProperties}>AI {word("automation", "Automation")}</span></span>{" "}
          <span className="hero-line"><span style={{ "--d": 2 } as React.CSSProperties}>&amp; AI {word("engineering", "Engineering")},</span></span>{" "}
          <span className="hero-line"><span style={{ "--d": 3 } as React.CSSProperties}>built for <i>production.</i></span></span>
        </h1>

        <div className="hero-bottom">
          <div className="hero-lede hero-enter" style={{ "--d": 5 } as React.CSSProperties}>
            <p>{site.intro}</p>
            <div className="hero-actions">
              <Magnetic><a className="button button-primary" href="#work">Explore selected work <ArrowDown aria-hidden="true" size={16} /></a></Magnetic>
              <Magnetic><a className="button button-ghost" href={site.resumeUrl} target="_blank" rel="noreferrer"><FileText aria-hidden="true" size={16} /> Résumé</a></Magnetic>
              <a className="text-link" href={site.githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight aria-hidden="true" size={15} /></a>
            </div>
          </div>

          <div className="hero-console hero-enter" style={{ "--d": 6 } as React.CSSProperties} data-tone={active}>
            <div className="console-switch" role="group" aria-label="Choose a discipline">
              {(Object.keys(disciplines) as Discipline[]).map((discipline, index) => (
                <button
                  type="button"
                  key={discipline}
                  data-tone={discipline}
                  aria-label={`View ${disciplines[discipline].title} system`}
                  aria-pressed={selected === discipline}
                  onClick={() => setSelected(discipline)}
                  onPointerEnter={() => setHovered(discipline)}
                  onPointerLeave={() => setHovered(null)}
                >
                  <span>0{index + 1}</span>{disciplines[discipline].title}
                </button>
              ))}
            </div>
            <ol className="console-pipeline" key={active} aria-label={`${system.title} stages`}>
              {system.stages.map((stage, index) => <li key={stage} style={{ "--s": index } as React.CSSProperties}><span>{String(index + 1).padStart(2, "0")}</span>{stage}</li>)}
            </ol>
            <p className="console-caption" aria-live="polite">{system.caption}</p>
          </div>
        </div>

        <div className="hero-foot hero-enter" style={{ "--d": 7 } as React.CSSProperties}>
          <dl className="hero-stats">
            {stats.map((stat) => <div key={stat.label}><dt>{String(stat.value).padStart(2, "0")}</dt><dd>{stat.label}</dd></div>)}
          </dl>
          <a className="hero-scroll" href="#work" aria-label="Scroll to selected work"><span>Scroll</span><i aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
