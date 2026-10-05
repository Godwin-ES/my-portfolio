"use client";

import { ArrowUpRight } from "lucide-react";
import type { PointerEvent } from "react";
import { TransitionLink } from "@/components/navigation/route-transition";
import type { WorkCollection } from "@/lib/work-collections";

export function CollectionMotif({ motif }: { motif: WorkCollection["motif"] }) {
  if (motif === "orchestration") {
    return (
      <div className="motif motif-pipeline" aria-hidden="true">
        <i className="motif-wire" /><i className="motif-packet" />
        {["Input", "Validate", "Orchestrate", "Review", "Deliver"].map((label, index) => (
          <span key={label} style={{ "--s": index } as React.CSSProperties}><b>{String(index + 1).padStart(2, "0")}</b>{label}</span>
        ))}
      </div>
    );
  }
  return (
    <div className="motif motif-layers" aria-hidden="true">
      {["Interface", "Intelligence", "Services", "Data"].map((label, index) => (
        <span key={label} style={{ "--s": index } as React.CSSProperties}><b>{String(4 - index).padStart(2, "0")}</b>{label}</span>
      ))}
    </div>
  );
}

export function CollectionGateway({ collection, projectTitles }: { collection: WorkCollection; projectTitles: string[] }) {
  const tone = collection.id === "ai-automation" ? "automation" : "engineering";
  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--px", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--py", `${event.clientY - bounds.top}px`);
  };

  return (
    <TransitionLink
      className="gateway"
      data-tone={tone}
      data-cursor="Explore"
      href={`/work/${collection.id}`}
      tone={tone}
      aria-label={`Explore ${collection.title} projects`}
      onPointerMove={handlePointerMove}
    >
      <span className="gateway-spot" aria-hidden="true" />
      <span className="gateway-count" aria-hidden="true">{String(projectTitles.length).padStart(2, "0")}</span>
      <div className="gateway-top"><span>{collection.eyebrow}</span><b>{projectTitles.length} projects</b></div>
      <div className="gateway-copy">
        <h3>{collection.title}</h3>
        <p>{collection.description}</p>
      </div>
      <CollectionMotif motif={collection.motif} />
      <ol className="gateway-projects">
        {projectTitles.map((title, index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span>{title}</li>)}
      </ol>
      <span className="gateway-action">Explore projects <span className="arrow-chip"><ArrowUpRight aria-hidden="true" size={18} /></span></span>
    </TransitionLink>
  );
}
