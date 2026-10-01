import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/project-types";
import { ProjectVisual } from "@/components/project-visual";
import { ProjectActions } from "@/components/project-actions";
import { ProjectStatus } from "@/components/project-status";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="project-card">
      <Link className="project-card-visual-link" href={`/work/${project.slug}`} aria-label={`View ${project.title} case study`}>
        <ProjectVisual project={project} priority={priority} />
      </Link>
      <div className="project-card-body">
        <div className="project-card-meta"><p className="project-category">{project.category}</p><ProjectStatus status={project.status} /></div>
        <h3><Link href={`/work/${project.slug}`}>{project.title}</Link></h3>
        <p className="project-summary">{project.summary}</p>
        <div className="project-stack" aria-label="Technology stack">
          {project.stack.slice(0, 5).map((item) => <span data-testid="stack-tag" key={item}>{item}</span>)}
        </div>
        <ProjectActions links={project.links} compact />
        <Link className="case-link" href={`/work/${project.slug}`}>View case study <ArrowRight aria-hidden="true" size={16} /></Link>
      </div>
    </article>
  );
}
