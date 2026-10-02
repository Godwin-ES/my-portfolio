"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { Project, ProjectCollection } from "@/lib/project-types";

type Filter = "all" | ProjectCollection;
const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "ai-automation", label: "AI Automation" },
  { value: "ai-engineering", label: "AI Engineering" },
];

export function ProjectFilter({ projects, initialFilter = "all" }: { projects: Project[]; initialFilter?: Filter }) {
  const safeInitial = filters.some(({ value }) => value === initialFilter) ? initialFilter : "all";
  const [active, setActive] = useState<Filter>(safeInitial);
  const visible = active === "all" ? projects : projects.filter((project) => project.collections.includes(active));
  return (
    <div className="project-library">
      <div className="project-filter" aria-label="Filter projects">{filters.map((filter) => <button type="button" key={filter.value} aria-pressed={active === filter.value} onClick={() => setActive(filter.value)}>{filter.label}</button>)}</div>
      <div className="project-library-grid" aria-live="polite">{visible.map((project) => <div data-testid="filter-project" key={project.slug}><ProjectCard project={project} /></div>)}</div>
    </div>
  );
}
