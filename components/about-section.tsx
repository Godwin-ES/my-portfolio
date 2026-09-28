import { site } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";

export function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-grid">
        <SectionHeading eyebrow="About" title="Systems thinking, carried into software." />
        <div className="about-copy">
          <p>{site.about}</p>
          <div className="education-line"><span>Education</span><strong>{site.education}</strong></div>
        </div>
      </div>
    </section>
  );
}
