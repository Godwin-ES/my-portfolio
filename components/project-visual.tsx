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

  const previewIds = project.architecture.previewNodeIds ?? project.architecture.nodes.slice(0, 4).map(({ id }) => id);
  const nodeById = new Map(project.architecture.nodes.map((node) => [node.id, node]));
  const nodes = previewIds.flatMap((id) => nodeById.get(id) ?? []);
  return (
    <div className="project-visual architecture-fallback" data-testid="architecture-fallback" role="img" aria-label={`${project.title} system architecture preview`}>
      <div className="visual-topline"><span>{project.category.split("·")[0].trim()}</span><span>{String(project.featuredOrder ?? project.automationOrder ?? "").padStart(2, "0")}</span></div>
      <div className="visual-flow visual-preview-grid" aria-hidden="true">
        {nodes.map((node, index) => (
          <div className="visual-flow-item" key={node.id}>
            <div className="visual-node" data-testid="preview-node" data-node-id={node.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{node.label}</strong>
              {node.detail ? <small>{node.detail}</small> : null}
            </div>
            {index < nodes.length - 1 ? <div className="visual-connector"><i /></div> : null}
          </div>
        ))}
      </div>
      <div className="visual-caption">system preview / {nodes.length} defining stages</div>
    </div>
  );
}
