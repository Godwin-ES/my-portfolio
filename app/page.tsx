import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { EngineeringPractice } from "@/components/engineering-practice";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TechMarquee } from "@/components/tech-marquee";
import { WorkGateways } from "@/components/work-gateways";
import { getFeaturedProjects, getPortfolioStats } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Hero stats={getPortfolioStats()} />
        <TechMarquee />
        <SelectedWork projects={getFeaturedProjects()} />
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
