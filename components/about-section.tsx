import { site } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-grid">
        <SectionHeading eyebrow="Profile" title="An engineering foundation, applied to intelligent products." />
        <Reveal className="about-copy" variant="resolve">
          <p>{site.about}</p>
          <div className="education-line"><span>Education</span><strong>{site.education}</strong></div>
        </Reveal>
      </div>
    </section>
  );
}
