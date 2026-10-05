import { ArrowLeft, ArrowRight } from "lucide-react";
import { CaseSectionNav } from "@/components/case-section-nav";
import { TransitionLink } from "@/components/navigation/route-transition";
import type { Project } from "@/lib/project-types";

export type CaseSectionLink = { id: string; label: string };

export function CaseStudyNavigation({ sections, previous, next, collectionTitle = "portfolio" }: { sections: CaseSectionLink[]; previous?: Project; next?: Project; collectionTitle?: string }) {
  return <div className={`case-navigation ${sections.length ? "case-navigation-sections" : "case-navigation-neighbors"}`}>
    {sections.length ? <CaseSectionNav sections={sections} /> : null}
    {!sections.length ? <nav className="case-neighbors" aria-label={`More ${collectionTitle} case studies`}>
      {previous ? <TransitionLink className="case-neighbor case-neighbor-previous" href={`/work/${previous.slug}`} aria-label={`Previous project: ${previous.title}`}><span className="arrow-chip"><ArrowLeft aria-hidden="true" size={18} /></span><span><small>Previous project</small><strong>{previous.title}</strong></span></TransitionLink> : <span />}
      {next ? <TransitionLink className="case-neighbor case-neighbor-next" href={`/work/${next.slug}`} aria-label={`Next project: ${next.title}`}><span><small>Next project</small><strong>{next.title}</strong></span><span className="arrow-chip"><ArrowRight aria-hidden="true" size={18} /></span></TransitionLink> : null}
    </nav> : null}
  </div>;
}
