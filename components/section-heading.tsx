import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

export function SectionHeading({ eyebrow, title, description, aside }: { eyebrow: string; title: string; description?: string; aside?: ReactNode }) {
  return (
    <Reveal className="section-heading" variant="editorial">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {aside ? <div className="section-heading-aside">{aside}</div> : null}
    </Reveal>
  );
}
