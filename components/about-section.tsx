import { site } from "@/content/site";
import { toolkit } from "@/content/toolkit";
import { ScrollWords } from "@/components/motion/scroll-words";
import { Reveal } from "@/components/reveal";

export function AboutSection() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <p className="section-index"><span>05</span>Profile</p>
        <h2 id="about-title" className="about-title">An engineering foundation, <em>applied to intelligent products.</em></h2>
        <ScrollWords className="about-manifesto" text={site.about} />
        <div className="about-grid">
          <Reveal className="about-facts" variant="rise">
            <div className="education-line"><span>Education</span><strong>{site.education}</strong></div>
            <div><span>Based in</span><strong>Abuja, Nigeria</strong></div>
            <div><span>Focus</span><strong>AI Automation · AI Engineering</strong></div>
          </Reveal>
          <Reveal className="about-toolkit" variant="rise" delayMs={90}>
            {toolkit.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
