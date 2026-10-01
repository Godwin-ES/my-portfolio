import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAutomationProjects } from "@/lib/projects";
import { SectionHeading } from "@/components/section-heading";

export function AutomationProgression() {
  const projects = getAutomationProjects();
  return (
    <section id="automation" className="section automation-section" aria-labelledby="automation-title">
      <div className="container">
        <SectionHeading
          eyebrow="AI automation systems"
          title="From workflow automation to agentic systems."
          description="A progression of increasingly complete business systems, each adding stronger state, validation, review, and reliability boundaries."
        />
        <div className="automation-list">
          {projects.map((project, index) => (
            <article className="automation-item" data-testid="automation-item" key={project.slug}>
              <div className="automation-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="automation-content">
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="automation-tags">{project.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div>
              </div>
              <Link className="automation-link" href={`/work/${project.slug}`} aria-label={`View ${project.title} case study`}>
                <ArrowUpRight aria-hidden="true" size={19} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
