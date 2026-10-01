import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectActions } from "@/components/project-actions";
import { ProjectFacts } from "@/components/project-facts";
import { ProjectMedia } from "@/components/project-media";
import { ProjectStatus } from "@/components/project-status";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getFeaturedProjects } from "@/lib/projects";

export async function SelectedWork() {
  const projects = getFeaturedProjects();
  const media = await Promise.all(projects.map((project, index) => ProjectMedia({ project, priority: index < 2 })));
  return (
    <section id="work" className="section selected-work" aria-labelledby="selected-work-title">
      <div className="container">
        <SectionHeading eyebrow="Selected work" title="Products with a point of view—and the engineering to hold them up." description="Five flagship builds spanning real-time voice, accessible computer vision, document intelligence, and agentic automation." />
        <div className="selected-projects">
          {projects.map((project, index) => (
            <Reveal as="article" className="selected-project" delayMs={index % 2 === 0 ? 0 : 80} key={project.slug}>
              <div className="selected-project-media">{media[index]}</div>
              <div className="selected-project-copy">
                <div className="selected-project-kicker"><span>{String(index + 1).padStart(2, "0")}</span><ProjectStatus status={project.status} /></div>
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="selected-project-summary">{project.summary}</p>
                <ProjectFacts facts={project.facts} />
                <ProjectActions links={project.links} compact />
                <Link className="case-link" href={`/work/${project.slug}`}>Read the case study <ArrowRight aria-hidden="true" size={16} /></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
