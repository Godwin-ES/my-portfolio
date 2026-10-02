import { ArrowDown, FileText, Github } from "lucide-react";
import { DualSignal } from "@/components/hero/dual-signal";
import { ExternalLink } from "@/components/external-link";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span aria-hidden="true" />{site.eyebrow}</p>
          <h1>
            <span className="hero-title-line">AI Automation.</span>
            <span className="hero-title-line hero-title-accent">AI Engineering.</span>
            <span className="hero-title-line hero-title-outcome">One production mindset.</span>
          </h1>
          <p className="hero-intro">{site.intro}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore selected work <ArrowDown aria-hidden="true" size={16} /></a>
            <a className="button button-secondary" href={site.resumeUrl} target="_blank" rel="noreferrer"><FileText aria-hidden="true" size={16} /> Résumé</a>
            <ExternalLink className="hero-github" href={site.githubUrl}><Github aria-hidden="true" size={16} /> GitHub</ExternalLink>
          </div>
          <div className="tech-line" aria-label="Primary technologies">
            {site.technologyLine.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
        </div>
        <div className="hero-visual-wrap"><DualSignal /></div>
      </div>
      <div className="container hero-footnote" aria-hidden="true"><span>Scroll to explore</span><i /><span>Lagos, Nigeria</span></div>
    </section>
  );
}
