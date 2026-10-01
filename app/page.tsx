import { AboutSection } from "@/components/about-section";
import { AutomationProgression } from "@/components/automation-progression";
import { ContactSection } from "@/components/contact-section";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Hero } from "@/components/hero";
import { MoreProjects } from "@/components/more-projects";
import { SelectedWork } from "@/components/selected-work";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolkitGrid } from "@/components/toolkit-grid";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <SelectedWork />
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
