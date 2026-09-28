import type { Project } from "@/lib/project-types";

export function ArchitectureDiagram({ architecture }: { architecture: Project["architecture"] }) {
  const labels = new Map(architecture.nodes.map((node) => [node.id, node.label]));
  return (
    <div className="architecture-diagram">
      <div className="architecture-nodes">
        {architecture.nodes.map((node, index) => (
          <div className="architecture-node" key={node.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{node.label}</strong>
            {node.detail ? <p>{node.detail}</p> : null}
          </div>
        ))}
      </div>
      <div className="architecture-edges" aria-label="System connections">
        {architecture.edges.map((edge, index) => (
          <div className="architecture-edge" key={`${edge.from}-${edge.to}-${index}`}>
            <span>{labels.get(edge.from) ?? edge.from}</span>
            <i aria-hidden="true" />
            {edge.label ? <small>{edge.label}</small> : null}
            <i aria-hidden="true" />
            <span>{labels.get(edge.to) ?? edge.to}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
