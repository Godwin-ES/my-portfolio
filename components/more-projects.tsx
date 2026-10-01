import { ProjectFilter } from "@/components/project-filter";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/content/projects";

export function MoreProjects() {
  return (
    <section id="projects" className="section more-projects" aria-labelledby="more-projects-title">
      <div className="container">
        <SectionHeading eyebrow="Project index" title="Explore the complete body of work." description="Filter by personal products, AI Automation, or applied machine learning. Every project includes the decisions and reliability work behind the interface." />
        <ProjectFilter projects={projects} />
      </div>
    </section>
  );
}
