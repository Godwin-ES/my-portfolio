import { ArrowUpRight, Github, Mail } from "lucide-react";
import { ExternalLink } from "@/components/external-link";
import { site } from "@/content/site";

export function ContactSection() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-card">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Building something where AI needs to work reliably inside a real product or workflow?</h2>
        </div>
        <div className="contact-actions">
          <a className="button button-light" href={`mailto:${site.email}`} aria-label="Email me"><Mail aria-hidden="true" size={17} /> Email me</a>
          <ExternalLink className="button button-dark-outline" href={site.githubUrl}><Github aria-hidden="true" size={17} /> GitHub</ExternalLink>
          <a className="contact-resume" href={site.resumeUrl} target="_blank" rel="noreferrer">View résumé <ArrowUpRight aria-hidden="true" size={15} /></a>
        </div>
      </div>
    </section>
  );
}
