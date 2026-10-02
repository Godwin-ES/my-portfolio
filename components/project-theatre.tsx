"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { ProjectTheatreStage } from "@/components/project-theatre-stage";
import type { Project } from "@/lib/project-types";

export function ProjectTheatre({ projects }: { projects: Project[] }) {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug);
  if (!projects.length) return null;

  const activeProject = projects.find(({ slug }) => slug === activeSlug) ?? projects[0];

  return (
    <section id="work" className="section project-theatre-section journey-chapter" aria-labelledby="project-theatre-title">
      <div className="container">
        <div className="theatre-heading">
          <div>
            <p className="eyebrow">Selected systems</p>
            <h2 id="project-theatre-title">Four systems. Four different engineering problems.</h2>
          </div>
          <p>Voice latency, user isolation, evidence, approvals, and constrained actions: each project exposes a different place where AI software can fail if the surrounding system is weak.</p>
        </div>

        <div className="project-theatre">
          <div className="theatre-selector" aria-label="Choose a selected project">
            <p className="theatre-selector-label">SYSTEM INDEX</p>
            {projects.map((project, index) => {
              const active = project.slug === activeProject.slug;
              return (
                <div className={`theatre-option ${active ? "is-active" : ""}`} key={project.slug}>
                  <button type="button" aria-label={`Select ${project.title}`} aria-pressed={active} onClick={() => setActiveSlug(project.slug)}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{project.title}</strong>
                    <small>{project.category.split("·")[0].trim()}</small>
                  </button>
                  <Link href={`/work/${project.slug}`} aria-label={`Open ${project.title} case study`}><ArrowUpRight aria-hidden="true" size={16} /></Link>
                </div>
              );
            })}
          </div>

          <div className="theatre-stage-shell">
            <p className="sr-only" aria-live="polite">Showing {activeProject.title}</p>
            {projects.map((project) => <ProjectTheatreStage key={project.slug} project={project} active={project.slug === activeProject.slug} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
