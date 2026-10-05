"use client";

import { useEffect, useState } from "react";
import type { CaseSectionLink } from "@/components/case-study-navigation";

export function CaseSectionNav({ sections }: { sections: CaseSectionLink[] }) {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const targets = sections.map(({ id }) => document.getElementById(id)).filter((target): target is HTMLElement => Boolean(target));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-35% 0px -55%" });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="case-section-nav" aria-label="Case study sections">
      {sections.map((section, index) => (
        <a href={`#${section.id}`} key={section.id} aria-current={active === section.id ? "location" : undefined}>
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{section.label}
        </a>
      ))}
    </nav>
  );
}
