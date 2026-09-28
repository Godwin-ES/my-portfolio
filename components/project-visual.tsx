import Image from "next/image";
import type { Project } from "@/lib/project-types";

export function ProjectVisual({ project, priority = false }: { project: Project; priority?: boolean }) {
  if (project.heroImage && project.heroAlt) {
    return (
      <div className="project-visual project-visual-image">
        <Image src={project.heroImage} alt={project.heroAlt} fill sizes="(max-width: 800px) 100vw, 50vw" priority={priority} />
      </div>
    );
  }

  const nodes = project.architecture.nodes.slice(0, 5);
  return (
    <div className="project-visual architecture-fallback" data-testid="architecture-fallback" aria-label={`${project.title} system architecture preview`}>
      <div className="visual-topline"><span>{project.category.split("·")[0].trim()}</span><span>{String(project.featuredOrder ?? project.automationOrder ?? "").padStart(2, "0")}</span></div>
      <div className="visual-flow" aria-hidden="true">
        {nodes.map((node, index) => (
          <div className="visual-flow-item" key={node.id}>
            <div className="visual-node">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{node.label}</strong>
              {node.detail ? <small>{node.detail}</small> : null}
            </div>
            {index < nodes.length - 1 ? <div className="visual-connector"><i /></div> : null}
          </div>
        ))}
      </div>
      <div className="visual-caption">system architecture / {nodes.length} stages</div>
    </div>
  );
}
