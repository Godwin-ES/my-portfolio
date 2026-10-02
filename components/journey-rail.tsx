"use client";

import { useEffect, useState } from "react";

const chapters = [
  { id: "top", label: "Signal" },
  { id: "work", label: "Selected systems" },
  { id: "collections", label: "Two practices" },
  { id: "practice", label: "Engineering practice" },
  { id: "experience", label: "Experience / profile" },
  { id: "contact", label: "Contact" },
] as const;

export function JourneyRail() {
  const [activeId, setActiveId] = useState<(typeof chapters)[number]["id"]>("top");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const elements = chapters
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
      if (visible) setActiveId(visible.target.id as (typeof chapters)[number]["id"]);
    }, { rootMargin: "-22% 0px -62% 0px", threshold: [0, 0.12, 0.4] });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="journey-rail" aria-label="Portfolio chapters">
      <span className="journey-rail__signal" aria-hidden="true" />
      <ol>
        {chapters.map((chapter, index) => (
          <li key={chapter.id} className={activeId === chapter.id ? "is-active" : undefined}>
            <a href={`#${chapter.id}`} aria-current={activeId === chapter.id ? "location" : undefined}>
              <span className="journey-rail__index">{String(index + 1).padStart(2, "0")}</span>
              <i aria-hidden="true" />
              <span className="journey-rail__label">{chapter.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
