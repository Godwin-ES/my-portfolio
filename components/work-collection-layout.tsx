import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CollectionProjectRow } from "@/components/collection-project-row";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Project } from "@/lib/project-types";
import { workCollections, type WorkCollection } from "@/lib/work-collections";

function CollectionHeroMotif({ collection }: { collection: WorkCollection }) {
  const labels = collection.motif === "orchestration"
    ? ["Capture", "Validate", "Orchestrate", "Review", "Deliver"]
    : ["Data", "Services", "Intelligence", "Interface"];

  return (
    <div className={`collection-hero-motif collection-hero-motif-${collection.motif}`} aria-hidden="true">
      <div className="collection-motif-topline"><span>SYSTEM PATH</span><span>{collection.projectSlugs.length} BUILDS</span></div>
      <div className="collection-motif-flow">
        {labels.map((label, index) => <span key={label}><i>{String(index + 1).padStart(2, "0")}</i><b>{label}</b></span>)}
      </div>
      <p>{collection.motif === "orchestration" ? "From incoming work to governed outcome" : "From durable foundations to usable intelligence"}</p>
    </div>
  );
}

export function WorkCollectionLayout({ collection, projects }: { collection: WorkCollection; projects: Project[] }) {
  const otherCollection = workCollections.find(({ id }) => id !== collection.id)!;

  return (
    <>
      <SiteHeader homePrefix="/" activeItem="#work" />
      <main id="main-content" className={`collection-page collection-page-${collection.id}`} tabIndex={-1}>
        <header className="collection-hero">
          <div className="container">
            <Link className="collection-back" href="/#collections"><ArrowLeft aria-hidden="true" size={16} /> All work collections</Link>
            <div className="collection-hero-grid">
              <div className="collection-hero-copy">
                <p className="eyebrow">{collection.eyebrow}</p>
                <h1>{collection.title}</h1>
                <p>{collection.description}</p>
                <div className="collection-hero-meta"><span>{projects.length} projects</span><i /><span>Architecture, proof & decisions</span></div>
              </div>
              <CollectionHeroMotif collection={collection} />
            </div>
          </div>
        </header>

        <section className="collection-projects" aria-label={`${collection.title} projects`}>
          <div className="container">
            <div className="collection-projects-intro">
              <p className="eyebrow">Project sequence</p>
              <p>{collection.id === "ai-automation" ? "A progression from deterministic workflow control to agentic, real-time support." : "Three products built across voice, documents, computer vision, backend architecture, and accessible interfaces."}</p>
            </div>
            <div className="collection-project-list">
              {projects.map((project, index) => <CollectionProjectRow key={project.slug} project={project} index={index} />)}
            </div>
          </div>
        </section>

        <section className="collection-next">
          <div className="container">
            <Link href={`/work/${otherCollection.id}`} aria-label={`Also explore ${otherCollection.title}`}>
              <span><small>Also explore</small><strong>{otherCollection.title}</strong></span>
              <ArrowUpRight aria-hidden="true" size={30} />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
