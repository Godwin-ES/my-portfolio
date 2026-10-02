import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { CaseStudyNavigation, type CaseSectionLink } from "@/components/case-study-navigation";
import { EvidenceList } from "@/components/evidence-list";
import { ProjectAccess } from "@/components/project-access";
import { ProjectActions } from "@/components/project-actions";
import { ProjectFacts } from "@/components/project-facts";
import { ProjectFlow } from "@/components/project-flow";
import { ProjectMedia } from "@/components/project-media";
import { ProjectStatus } from "@/components/project-status";
import { Reveal } from "@/components/reveal";
import type { Project } from "@/lib/project-types";
import { getAdjacentProjects, getProjectCollection } from "@/lib/projects";

const sections: CaseSectionLink[] = [
  { id: "overview", label: "Overview" }, { id: "flow", label: "Flow" },
  { id: "architecture", label: "Architecture" }, { id: "decisions", label: "Decisions" },
  { id: "reliability", label: "Reliability" }, { id: "result", label: "Result" },
  { id: "evidence", label: "Evidence" },
];

function DetailGrid({ items }: { items: { title: string; detail: string }[] }) {
  return <div className="detail-grid">{items.map((item, index) => <article className="detail-card" key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div>;
}

function CaseSection({ id, eyebrow, title, children, wide = false }: { id: string; eyebrow: string; title: string; children: ReactNode; wide?: boolean }) {
  return <Reveal as="section" id={id} className={`case-section ${wide ? "case-section-wide" : ""}`}><div className="case-section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><div className="case-section-body">{children}</div></Reveal>;
}

export async function CaseStudyLayout({ project }: { project: Project }) {
  const adjacent = getAdjacentProjects(project.slug);
  const media = await ProjectMedia({ project, priority: true, variant: "hero" });
  const collection = getProjectCollection(project);
  const returnPath = collection
    ? { href: `/work/${collection.id}`, label: collection.title }
    : { href: "/#work", label: "selected work" };
  return <main className="case-study">
    <div className="container case-back-row"><Link href={returnPath.href}><ArrowLeft aria-hidden="true" size={16} /> Back to {returnPath.label}</Link></div>
    <header className="container case-hero">
      <div className="case-hero-copy">
        <div className="case-hero-meta"><p className="eyebrow">{project.category}</p><ProjectStatus status={project.status} /></div>
        <h1>{project.title}</h1><p>{project.summary}</p>
        <ProjectActions links={project.links} />
        <div className="case-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
      <div className="case-proof">{media}</div>
    </header>
    <CaseStudyNavigation sections={sections} previous={adjacent.previous} next={adjacent.next} />
    <div className="case-content container">
      <section id="overview" className="case-section case-overview">
        <div><p className="eyebrow">01 · Overview</p><h2>What it solves</h2><p className="case-prose">{project.problem}</p></div>
        <div><p className="eyebrow">The product</p><h2>How it works</h2><p className="case-prose">{project.system}</p></div>
        <ProjectFacts facts={project.facts} />
        {project.access ? <ProjectAccess {...project.access} /> : null}
      </section>
      <CaseSection id="flow" eyebrow="02" title="Product flow" wide><ProjectFlow steps={project.flow} /></CaseSection>
      <CaseSection id="architecture" eyebrow="03" title="Architecture" wide><ArchitectureDiagram architecture={project.architecture} /></CaseSection>
      <CaseSection id="decisions" eyebrow="04" title="Engineering decisions" wide><DetailGrid items={project.engineeringDecisions} /></CaseSection>
      <CaseSection id="reliability" eyebrow="05" title="Reliability & edge cases" wide><DetailGrid items={project.reliability} /></CaseSection>
      <CaseSection id="result" eyebrow="06" title="Result"><p className="case-result">{project.result}</p></CaseSection>
      <CaseSection id="evidence" eyebrow="07" title="Evidence" wide><EvidenceList items={project.evidence} /></CaseSection>
      <CaseStudyNavigation sections={[]} previous={adjacent.previous} next={adjacent.next} />
    </div>
  </main>;
}
