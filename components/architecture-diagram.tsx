"use client";

import { useRef, type CSSProperties } from "react";
import { useDiagramSequence } from "@/components/motion/use-diagram-sequence";
import type { Project } from "@/lib/project-types";

type MotionStyle = CSSProperties & { "--motion-order": number };

export function ArchitectureDiagram({ architecture }: { architecture: Project["architecture"] }) {
  const diagramRef = useRef<HTMLElement>(null);
  useDiagramSequence(diagramRef);
  const labels = new Map(architecture.nodes.map((node) => [node.id, node.label]));
  const orderById = new Map(architecture.nodes.map((node, index) => [node.id, index]));
  const layers = architecture.nodes.reduce<Map<string, typeof architecture.nodes>>((grouped, node) => {
    const layer = node.layer ?? "System";
    grouped.set(layer, [...(grouped.get(layer) ?? []), node]);
    return grouped;
  }, new Map());
  const outbound = architecture.edges.reduce<Map<string, typeof architecture.edges>>((grouped, edge) => {
    grouped.set(edge.from, [...(grouped.get(edge.from) ?? []), edge]);
    return grouped;
  }, new Map());

  return (
    <figure ref={diagramRef} className="architecture-diagram architecture-system">
      <div className="architecture-layers">
        {[...layers].map(([layer, nodes], layerIndex) => (
          <section className="architecture-layer" data-testid="architecture-layer" key={layer}>
            <header data-motion-label><span>{String(layerIndex + 1).padStart(2, "0")}</span><h3>{layer}</h3></header>
            <div className="architecture-layer-nodes">
              {nodes.map((node) => {
                const motionOrder = orderById.get(node.id) ?? 0;
                return (
                <article className="architecture-node" data-testid="architecture-node" data-motion-node data-motion-order={motionOrder} style={{ "--motion-order": motionOrder } as MotionStyle} key={node.id}>
                  <div className="architecture-node-copy">
                    <strong>{node.label}</strong>
                    {node.detail ? <p>{node.detail}</p> : null}
                  </div>
                  {(outbound.get(node.id) ?? []).length ? (
                    <ul className="architecture-node-links" aria-label={`Connections from ${node.label}`}>
                      {(outbound.get(node.id) ?? []).map((edge, index) => {
                        const relationship = edge.label ?? "passes to";
                        const destination = labels.get(edge.to) ?? edge.to;
                        return (
                          <li
                            data-testid="architecture-connection"
                            data-motion-connector
                            data-motion-order={motionOrder}
                            data-from={edge.from}
                            data-to={edge.to}
                            aria-label={`${node.label} to ${destination}: ${relationship}`}
                            key={`${edge.from}-${edge.to}-${index}`}
                          >
                            <span>{relationship}</span><i aria-hidden="true">→</i><strong>{destination}</strong>
                          </li>
                        );
                      })}
                    </ul>
                  ) : <p className="architecture-terminal">Final system outcome</p>}
                </article>
              )})}
            </div>
          </section>
        ))}
      </div>
      <figcaption>{architecture.nodes.length} components across {layers.size} system layers. Connections are shown at their point of origin.</figcaption>
    </figure>
  );
}
