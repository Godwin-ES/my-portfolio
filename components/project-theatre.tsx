"use client";

import { ArrowUpRight } from "lucide-react";
import { startTransition, useState, ViewTransition } from "react";
import { ProjectTheatreStage } from "@/components/project-theatre-stage";
import { TransitionLink } from "@/components/navigation/route-transition";
import type { Project } from "@/lib/project-types";

export function ProjectTheatre({ projects }: { projects: Project[] }) {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug);
  if (!projects.length) return null;

  const activeProject = projects.find(({ slug }) => slug === activeSlug) ?? projects[0];
  const activeIndex = projects.findIndex(({ slug }) => slug === activeProject.slug);

  return (
    <section id="work" className="section project-theatre-section" aria-labelledby="project-theatre-title">
      <div className="container">
        <div className="theatre-heading">
          <div>
            <p className="eyebrow">Selected systems</p>
            <h2 id="project-theatre-title">Four products. One engineering standard.</h2>
          </div>
          <p>Explore the product, the proof, and the decisions behind four systems built for real use—not just a polished demo.</p>
        </div>

        <div className="project-theatre">
          <div className="theatre-selector" aria-label="Choose a selected project">
            <p className="theatre-selector-label">PROJECT INDEX</p>
            {projects.map((project, index) => {
              const active = project.slug === activeProject.slug;
              return (
                <div className={`theatre-option ${active ? "is-active" : ""}`} key={project.slug}>
                  <button type="button" aria-label={`Select ${project.title}`} aria-pressed={active} onClick={() => startTransition(() => setActiveSlug(project.slug))}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{project.title}</strong>
                    <small>{project.category.split("·")[0].trim()}</small>
                  </button>
                  <TransitionLink href={`/work/${project.slug}`} aria-label={`Open ${project.title} case study`}><ArrowUpRight aria-hidden="true" size={16} /></TransitionLink>
                </div>
              );
            })}
          </div>

          <div className="theatre-stage-shell">
            <p className="sr-only" aria-live="polite">Showing {activeProject.title}</p>
            <div className="theatre-progress" aria-hidden="true"><i style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }} /></div>
            <ViewTransition name="selected-project-stage">
              <ProjectTheatreStage key={activeProject.slug} project={activeProject} />
            </ViewTransition>
          </div>
        </div>
      </div>
    </section>
  );
}
