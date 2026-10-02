"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PointerEvent } from "react";
import type { WorkCollection } from "@/lib/work-collections";

function CollectionMotif({ motif }: { motif: WorkCollection["motif"] }) {
  if (motif === "orchestration") {
    return (
      <div className="gateway-motif gateway-motif-automation" aria-hidden="true">
        {[
          ["01", "Input"], ["02", "Validate"], ["03", "Orchestrate"], ["04", "Review"], ["05", "Deliver"],
        ].map(([index, label]) => <span key={index}><i>{index}</i><b>{label}</b></span>)}
      </div>
    );
  }

  return (
    <div className="gateway-motif gateway-motif-engineering" aria-hidden="true">
      <span><i>04</i><b>Interface</b></span>
      <span><i>03</i><b>Intelligence</b></span>
      <span><i>02</i><b>Services</b></span>
      <span><i>01</i><b>Data</b></span>
    </div>
  );
}

export function CollectionGateway({ collection, projectTitles }: { collection: WorkCollection; projectTitles: string[] }) {
  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--gateway-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--gateway-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <Link
      className={`collection-gateway collection-gateway-${collection.id}`}
      href={`/work/${collection.id}`}
      aria-label={`Explore ${collection.title} projects`}
      onPointerMove={handlePointerMove}
    >
      <span className="gateway-glow" aria-hidden="true" />
      <div className="gateway-topline"><span>{collection.eyebrow}</span><b>{projectTitles.length} projects</b></div>
      <div className="gateway-copy">
        <h3>{collection.title}</h3>
        <p>{collection.description}</p>
      </div>
      <CollectionMotif motif={collection.motif} />
      <ol className="gateway-projects">
        {projectTitles.map((title, index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span>{title}</li>)}
      </ol>
      <span className="gateway-action">Explore projects <ArrowUpRight aria-hidden="true" size={18} /></span>
    </Link>
  );
}
