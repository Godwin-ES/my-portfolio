import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CollectionMotif } from "@/components/collection-gateway";
import { CollectionProjectRow } from "@/components/collection-project-row";
import { TransitionLink } from "@/components/navigation/route-transition";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Project } from "@/lib/project-types";
import { workCollections, type WorkCollection } from "@/lib/work-collections";

export function WorkCollectionLayout({ collection, projects }: { collection: WorkCollection; projects: Project[] }) {
  const otherCollection = workCollections.find(({ id }) => id !== collection.id)!;
  const tone = collection.id === "ai-automation" ? "automation" : "engineering";

  return (
    <>
      <SiteHeader homePrefix="/" activeItem="#work" />
      <main id="main-content" className={`collection-page collection-page-${collection.id}`} data-tone={tone} tabIndex={-1}>
        <header className="collection-hero">
          <div className="collection-hero-glow" aria-hidden="true" />
          <span className="collection-hero-count" aria-hidden="true">{String(projects.length).padStart(2, "0")}</span>
          <div className="container">
            <TransitionLink className="collection-back" href="/#collections"><ArrowLeft aria-hidden="true" size={16} /> All work collections</TransitionLink>
            <div className="collection-hero-grid">
              <Reveal variant="editorial" className="collection-hero-copy">
                <p className="eyebrow">{collection.eyebrow}</p>
                <h1>{collection.title}</h1>
                <p>{collection.description}</p>
                <div className="collection-hero-meta"><span>{projects.length} projects</span><i /><span>Architecture, proof & decisions</span></div>
              </Reveal>
              <Reveal variant="resolve" className="collection-hero-motif" delayMs={100}>
                <div className="collection-motif-topline" aria-hidden="true"><span>System path</span><span>{collection.projectSlugs.length} builds</span></div>
                <CollectionMotif motif={collection.motif} />
                <p>{collection.motif === "orchestration" ? "From incoming work to governed outcome" : "From durable foundations to usable intelligence"}</p>
              </Reveal>
            </div>
          </div>
        </header>

        <section className="collection-projects" aria-label={`${collection.title} projects`}>
          <div className="container">
            <Reveal variant="lateral" className="collection-projects-intro">
              <p className="eyebrow">Project sequence</p>
              <p>{collection.id === "ai-automation" ? "A progression from deterministic workflow control to agentic, real-time support." : "Three products built across voice, documents, computer vision, backend architecture, and accessible interfaces."}</p>
            </Reveal>
            <div className="collection-project-list">
              {projects.map((project, index) => <CollectionProjectRow key={project.slug} project={project} index={index} />)}
            </div>
          </div>
        </section>

        <Reveal as="section" variant="resolve" className="collection-next">
          <div className="container">
            <TransitionLink data-tone={otherCollection.id === "ai-automation" ? "automation" : "engineering"} data-cursor="Next" href={`/work/${otherCollection.id}`} tone={otherCollection.id === "ai-automation" ? "automation" : "engineering"} aria-label={`Also explore ${otherCollection.title}`}>
              <span><small>Also explore</small><strong>{otherCollection.title}</strong></span>
              <span className="arrow-chip collection-next-chip"><ArrowUpRight aria-hidden="true" size={30} /></span>
            </TransitionLink>
          </div>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
