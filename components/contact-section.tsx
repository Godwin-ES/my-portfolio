import { ArrowUpRight, Github, Mail } from "lucide-react";
import { ExternalLink } from "@/components/external-link";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export function ContactSection() {
  return (
    <section id="contact" className="section contact-section">
      <Reveal className="container contact-card" variant="resolve">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Have an AI product or workflow that needs to work reliably in the real world?</h2>
        </div>
        <div className="contact-actions">
          <a className="button button-light" href={`mailto:${site.email}`} aria-label="Email me"><Mail aria-hidden="true" size={17} /> Email me</a>
          <ExternalLink className="button button-dark-outline" href={site.githubUrl}><Github aria-hidden="true" size={17} /> GitHub</ExternalLink>
          <a className="contact-resume" href={site.resumeUrl} target="_blank" rel="noreferrer">View résumé <ArrowUpRight aria-hidden="true" size={15} /></a>
        </div>
      </Reveal>
    </section>
  );
}
