import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { EngineeringPractice } from "@/components/engineering-practice";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Hero } from "@/components/hero";
import { JourneyRail } from "@/components/journey-rail";
import { ProjectTheatre } from "@/components/project-theatre";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WorkGateways } from "@/components/work-gateways";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="portfolio-journey" tabIndex={-1}>
        <JourneyRail />
        <Hero />
        <ProjectTheatre projects={getFeaturedProjects()} />
        <WorkGateways />
        <EngineeringPractice />
        <ExperienceTimeline />
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
