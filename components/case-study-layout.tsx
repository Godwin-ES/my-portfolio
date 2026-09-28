import type { ReactNode } from "react";
import { ArrowLeft, Github } from "lucide-react";
import Link from "next/link";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { EvidenceList } from "@/components/evidence-list";
import { ExternalLink } from "@/components/external-link";
import { ProjectVisual } from "@/components/project-visual";
import type { Project } from "@/lib/project-types";

function DetailGrid({ items }: { items: { title: string; detail: string }[] }) {
  return (
    <div className="detail-grid">
      {items.map((item, index) => (
        <article className="detail-card" key={item.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{item.title}</h3>
          <p>{item.detail}</p>
        </article>
      ))}
    </div>
  );
}

function CaseSection({ eyebrow, title, children, wide = false }: { eyebrow: string; title: string; children: ReactNode; wide?: boolean }) {
  return (
    <section className={`case-section ${wide ? "case-section-wide" : ""}`}>
      <div className="case-section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
      <div className="case-section-body">{children}</div>
    </section>
  );
}

export function CaseStudyLayout({ project }: { project: Project }) {
  return (
    <main className="case-study">
      <div className="container case-back-row"><Link href="/#work"><ArrowLeft aria-hidden="true" size={16} /> Back to selected work</Link></div>
      <header className="container case-hero">
        <div className="case-hero-copy">
          <p className="eyebrow">{project.category}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <div className="case-actions">
            {project.githubUrl ? <ExternalLink className="button button-primary" href={project.githubUrl}><Github aria-hidden="true" size={16} /> GitHub</ExternalLink> : null}
            {project.liveUrl ? <ExternalLink className="button button-secondary" href={project.liveUrl}>Live demo</ExternalLink> : null}
            {project.secondaryGithubUrl ? <ExternalLink className="case-secondary-link" href={project.secondaryGithubUrl}>Related repository</ExternalLink> : null}
          </div>
          <div className="case-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
        <ProjectVisual project={project} priority />
      </header>

      <div className="case-content container">
        <CaseSection eyebrow="01" title="Problem"><p className="case-prose">{project.problem}</p></CaseSection>
        <CaseSection eyebrow="02" title="System"><p className="case-prose">{project.system}</p></CaseSection>
        <CaseSection eyebrow="03" title="Architecture" wide><ArchitectureDiagram architecture={project.architecture} /></CaseSection>
        <CaseSection eyebrow="04" title="Engineering decisions" wide><DetailGrid items={project.engineeringDecisions} /></CaseSection>
        <CaseSection eyebrow="05" title="Reliability & edge cases" wide><DetailGrid items={project.reliability} /></CaseSection>
        <CaseSection eyebrow="06" title="Result"><p className="case-result">{project.result}</p></CaseSection>
        <CaseSection eyebrow="07" title="Evidence" wide><EvidenceList items={project.evidence} /></CaseSection>
      </div>
    </main>
  );
}
