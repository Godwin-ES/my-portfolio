import { projects } from "@/content/projects";

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects
    .filter((project) => project.collections.includes("selected"))
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
}

export function getAutomationProjects() {
  return projects
    .filter((project) => project.collections.includes("ai-automation"))
    .sort((a, b) => (a.automationOrder ?? 99) - (b.automationOrder ?? 99));
}

export function getPersonalProjects() {
  return projects.filter((project) => project.collections.includes("personal"));
}

export function getAppliedMlProjects() {
  return projects.filter((project) => project.collections.includes("applied-ml"));
}

export function getAdjacentProjects(slug: string) {
  const catalogue = [
    ...getFeaturedProjects(),
    ...projects.filter((project) => !project.collections.includes("selected")),
  ];
  const index = catalogue.findIndex((project) => project.slug === slug);
  if (index < 0) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? catalogue[index - 1] : undefined,
    next: index < catalogue.length - 1 ? catalogue[index + 1] : undefined,
  };
}
