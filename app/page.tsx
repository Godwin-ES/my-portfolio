import { AboutSection } from "@/components/about-section";
import { AutomationProgression } from "@/components/automation-progression";
import { ContactSection } from "@/components/contact-section";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Hero } from "@/components/hero";
import { MoreProjects } from "@/components/more-projects";
import { ProjectTheatre } from "@/components/project-theatre";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolkitGrid } from "@/components/toolkit-grid";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProjectTheatre projects={getFeaturedProjects()} />
        <AutomationProgression />
        <MoreProjects />
        <ExperienceTimeline />
        <ToolkitGrid />
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
