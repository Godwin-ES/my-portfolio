import { toolkit } from "@/content/toolkit";
import { SectionHeading } from "@/components/section-heading";

export function ToolkitGrid() {
  return (
    <section className="section toolkit-section">
      <div className="container">
        <SectionHeading
          eyebrow="Technical toolkit"
          title="Tools selected around the system, not the other way around."
          description="The technologies I use most often across AI applications, backend engineering, data infrastructure, and automation."
        />
        <div className="toolkit-grid">
          {toolkit.map((group, index) => (
            <article data-testid="toolkit-category" className="toolkit-card" key={group.title}>
              <span className="toolkit-number">0{index + 1}</span>
              <h3>{group.title}</h3>
              <div className="toolkit-items">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
