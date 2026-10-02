import { ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/navigation/route-transition";
import { ProjectActions } from "@/components/project-actions";
import { ProjectFacts } from "@/components/project-facts";
import { ProjectMedia } from "@/components/project-media";
import { ProjectStatus } from "@/components/project-status";
import type { Project } from "@/lib/project-types";

export function ProjectTheatreStage({ project }: { project: Project }) {
  const tone = project.collections[0] === "ai-automation" ? "automation" : "engineering";
  return (
    <article
      className={`theatre-stage theatre-stage-${tone}`}
      data-testid="active-theatre-stage"
    >
      <div className="theatre-stage-topline">
        <span>{String(project.featuredOrder).padStart(2, "0")} / 04</span>
        <ProjectStatus status={project.status} />
      </div>
      <div className="theatre-stage-grid">
        <div className="theatre-media"><ProjectMedia project={project} priority variant="theatre" /></div>
        <div className="theatre-copy">
          <p className="project-category">{project.category}</p>
          <h3>{project.title}</h3>
          <p className="theatre-summary">{project.summary}</p>
          <ProjectFacts facts={project.facts.slice(0, 2)} />
          <div className="theatre-stack" aria-label={`${project.title} technologies`}>
            {project.stack.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}
          </div>
          <ProjectActions links={project.links} compact />
          <TransitionLink className="theatre-case-link" href={`/work/${project.slug}`}>
            Read the case study <ArrowUpRight aria-hidden="true" size={17} />
          </TransitionLink>
        </div>
      </div>
    </article>
  );
}
