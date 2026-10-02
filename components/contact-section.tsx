import { ArrowUpRight, Github, Mail } from "lucide-react";
import { ExternalLink } from "@/components/external-link";
import { site } from "@/content/site";

export function ContactSection() {
  return (
    <section id="contact" className="section contact-section journey-chapter">
      <div className="container contact-card">
        <div className="contact-copy">
          <p className="eyebrow">Contact · Final state</p>
          <h2>Need the AI feature to behave like software, not a demo?</h2>
          <p>I’m interested in AI engineering, automation, and software work where the hard part is system quality: state, latency, failure handling, evidence, and user trust.</p>
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
