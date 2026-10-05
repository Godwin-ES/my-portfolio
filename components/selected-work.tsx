"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import { useMotionPreferences } from "@/components/motion/motion-provider";
import { SplitHeading } from "@/components/motion/split-heading";
import { TransitionLink } from "@/components/navigation/route-transition";
import { ProjectActions } from "@/components/project-actions";
import { ProjectFacts } from "@/components/project-facts";
import { ProjectMedia } from "@/components/project-media";
import { ProjectStatus } from "@/components/project-status";
import type { Project } from "@/lib/project-types";
import { gsap, useGSAP } from "@/lib/motion/gsap";

function toneOf(project: Project) {
  return project.collections[0] === "ai-automation" ? "automation" : "engineering";
}

function trackPointer(event: PointerEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--px", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--py", `${event.clientY - bounds.top}px`);
}

export function SelectedWork({ projects }: { projects: Project[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const { ready, reducedMotion } = useMotionPreferences();

  useGSAP(() => {
    const list = listRef.current;
    if (!list || !ready || reducedMotion || typeof window.matchMedia !== "function") return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1000px) and (min-height: 700px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".work-card", list);
      cards.slice(0, -1).forEach((card, index) => {
        gsap.to(card.querySelector(".work-card-inner"), {
          scale: 0.9 + index * 0.012,
          "--dim": 1,
          ease: "none",
          scrollTrigger: { trigger: cards[index + 1], start: "top bottom", end: "top 18%", scrub: true },
        });
      });
    });
    return () => media.revert();
  }, { scope: listRef, dependencies: [ready, reducedMotion, projects.length], revertOnUpdate: true });

  if (!projects.length) return null;

  return (
    <section id="work" className="section selected-work" aria-labelledby="selected-work-title">
      <div className="container">
        <header className="section-head">
          <p className="section-index"><span>01</span>Selected work</p>
          <SplitHeading id="selected-work-title" parts={["Four systems,", { em: "built to be trusted." }]} />
          <p className="section-lede">The product, the proof, and the decisions behind four systems made for real use, not just a polished demo.</p>
        </header>

        <div ref={listRef} className="work-stack" aria-label="Selected projects">
          {projects.map((project, index) => (
            <article
              className="work-card"
              data-tone={toneOf(project)}
              data-testid="work-card"
              key={project.slug}
              style={{ "--i": index } as React.CSSProperties}
            >
              <div className="work-card-inner" onPointerMove={trackPointer}>
                <span className="work-card-spot" aria-hidden="true" />
                <header className="work-card-top">
                  <span className="work-index">{String(index + 1).padStart(2, "0")}<small>/{String(projects.length).padStart(2, "0")}</small></span>
                  <span className="work-category">{project.category}</span>
                  <ProjectStatus status={project.status} />
                </header>
                <div className="work-card-grid">
                  <div className="work-card-copy">
                    <h3>{project.title}</h3>
                    <p className="work-summary">{project.summary}</p>
                    <ProjectFacts facts={project.facts.slice(0, 3)} />
                    <div className="work-tags" aria-label={`${project.title} technologies`}>
                      {project.stack.slice(0, 5).map((technology) => <span key={technology}>{technology}</span>)}
                    </div>
                    <div className="work-card-actions">
                      <ProjectActions links={project.links} compact />
                      <TransitionLink className="case-link" href={`/work/${project.slug}`} tone={toneOf(project)} aria-label={`Open ${project.title} case study`} data-cursor="Read">
                        Case study <span className="arrow-chip"><ArrowUpRight aria-hidden="true" size={16} /></span>
                      </TransitionLink>
                    </div>
                  </div>
                  <div className="work-card-media" data-cursor={project.media.kind === "loom" && project.media.status === "available" ? "Play" : undefined}>
                    <ProjectMedia project={project} priority={index === 0} variant="theatre" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
