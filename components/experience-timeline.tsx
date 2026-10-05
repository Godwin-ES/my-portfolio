import { experience } from "@/content/experience";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/reveal";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <div className="container">
        <header className="section-head">
          <p className="section-index"><span>04</span>Experience</p>
          <SplitHeading id="experience-title" parts={["Built across the stack.", { em: "Grounded in systems." }]} />
          <p className="section-lede">Roles spanning AI evaluation, real-time products, computer vision, backend services, and data infrastructure.</p>
        </header>
        <ol className="experience-list">
          {experience.map((entry, index) => (
            <Reveal as="article" data-testid="experience-item" className="experience-item" key={`${entry.organization}-${entry.role}`} delayMs={index * 70}>
              <span className="experience-dates">{entry.dates}</span>
              <div className="experience-title"><h3>{entry.role}</h3><p>{entry.organization}</p></div>
              <p className="experience-summary">{entry.summary}</p>
              <span className="experience-index" aria-hidden="true">{String(experience.length - index).padStart(2, "0")}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
