import { ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/navigation/route-transition";
import { ProjectActions } from "@/components/project-actions";
import { ProjectFacts } from "@/components/project-facts";
import { ProjectMedia } from "@/components/project-media";
import { ProjectStatus } from "@/components/project-status";
import { Reveal } from "@/components/reveal";
import type { Project } from "@/lib/project-types";

export function CollectionProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal as="article" variant="resolve" className="collection-project-row" data-testid="collection-project" data-project-slug={project.slug}>
      <div className="collection-project-media"><ProjectMedia project={project} priority={index < 2} /></div>
      <div className="collection-project-copy">
        <div className="collection-project-meta">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <ProjectStatus status={project.status} />
        </div>
        <p className="project-category">{project.category}</p>
        <h2>{project.title}</h2>
        <p className="collection-project-summary">{project.summary}</p>
        <ProjectFacts facts={project.facts.slice(0, 2)} />
        <div className="collection-project-stack" aria-label={`${project.title} technologies`}>
          {project.stack.slice(0, 4).map((technology) => <span data-testid="collection-stack-tag" key={technology}>{technology}</span>)}
        </div>
        <ProjectActions links={project.links} compact />
        <TransitionLink className="collection-case-link" href={`/work/${project.slug}`}>
          Explore the case study <ArrowUpRight aria-hidden="true" size={17} />
        </TransitionLink>
      </div>
    </Reveal>
  );
}
