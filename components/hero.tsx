import { ArrowDown, Github } from "lucide-react";
import { ExternalLink } from "@/components/external-link";
import { site } from "@/content/site";
import { Reveal } from "@/components/reveal";

function SystemMotif() {
  return (
    <div className="hero-system" role="img" aria-label="Illustration of a reliable AI system moving from input through AI reasoning and validation to a usable product outcome">
      <div className="motif-grid" aria-hidden="true" />
      <div className="motif-status"><span /> system online</div>
      <div className="motif-node motif-node-a"><small>01 · INPUT</small><strong>Real data</strong><span>Documents · Web · Events</span></div>
      <div className="motif-node motif-node-b"><small>02 · AI</small><strong>Reasoning</strong><span>Research · Retrieval · Generation</span></div>
      <div className="motif-node motif-node-c"><small>03 · CONTROL</small><strong>Validation</strong><span>Rules · State · Human Review</span></div>
      <div className="motif-node motif-node-d"><small>04 · OUTPUT</small><strong>Useful system</strong><span>Traceable · Testable · Reliable</span></div>
      <div className="motif-line line-1" aria-hidden="true" />
      <div className="motif-line line-2" aria-hidden="true" />
      <div className="motif-line line-3" aria-hidden="true" />
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="container hero-grid">
        <Reveal className="hero-copy">
          <p className="eyebrow">{site.eyebrow}</p>
          <h1>{site.headline}</h1>
          <p className="hero-intro">{site.intro}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore selected work <ArrowDown aria-hidden="true" size={16} /></a>
            <ExternalLink className="button button-secondary" href={site.githubUrl}><Github aria-hidden="true" size={16} /> GitHub</ExternalLink>
            <a className="text-action" href={site.resumeUrl} target="_blank" rel="noreferrer">Résumé</a>
          </div>
          <div className="tech-line" aria-label="Primary technologies">
            {site.technologyLine.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
        </Reveal>
        <Reveal delayMs={100}><SystemMotif /></Reveal>
      </div>
    </section>
  );
}
