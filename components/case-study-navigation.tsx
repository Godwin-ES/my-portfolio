import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/project-types";

export type CaseSectionLink = { id: string; label: string };

export function CaseStudyNavigation({ sections, previous, next }: { sections: CaseSectionLink[]; previous?: Project; next?: Project }) {
  return <div className="case-navigation">
    {sections.length ? <nav className="case-section-nav" aria-label="Case study sections">{sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.label}</a>)}</nav> : null}
    <nav className="case-neighbors" aria-label="More case studies">
      {previous ? <Link className="case-neighbor case-neighbor-previous" href={`/work/${previous.slug}`} aria-label={`Previous project: ${previous.title}`}><ArrowLeft aria-hidden="true" size={17} /><span><small>Previous project</small><strong>{previous.title}</strong></span></Link> : <span />}
      {next ? <Link className="case-neighbor case-neighbor-next" href={`/work/${next.slug}`} aria-label={`Next project: ${next.title}`}><span><small>Next project</small><strong>{next.title}</strong></span><ArrowRight aria-hidden="true" size={17} /></Link> : null}
    </nav>
  </div>;
}
