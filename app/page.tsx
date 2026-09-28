import { AboutSection } from "@/components/about-section";
import { AutomationProgression } from "@/components/automation-progression";
import { ContactSection } from "@/components/contact-section";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolkitGrid } from "@/components/toolkit-grid";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
  const projects = getFeaturedProjects();
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <section id="work" className="section selected-work">
          <div className="container">
            <SectionHeading
              eyebrow="Selected work"
              title="Systems built beyond the demo."
              description="A small set of projects that show how I approach AI engineering, backend architecture, workflow reliability, and human review."
            />
            <div className="featured-grid">
              {projects.map((project, index) => <ProjectCard key={project.slug} project={project} priority={index < 2} />)}
            </div>
          </div>
        </section>
        <AutomationProgression />
        <ExperienceTimeline />
        <ToolkitGrid />
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
