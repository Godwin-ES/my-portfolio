import { experience } from "@/content/experience";
import { SectionHeading } from "@/components/section-heading";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Engineering across AI, backend, data, and connected systems."
          description="A concise view of the environments that shaped how I build and evaluate software systems."
        />
        <div className="experience-list">
          {experience.map((entry) => (
            <article data-testid="experience-item" className="experience-item" key={`${entry.organization}-${entry.role}`}>
              <div className="experience-meta"><span>{entry.dates}</span></div>
              <div className="experience-title"><h3>{entry.role}</h3><p>{entry.organization}</p></div>
              <p className="experience-summary">{entry.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
