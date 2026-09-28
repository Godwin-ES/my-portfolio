import { projects } from "@/content/projects";

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
}

export function getAutomationProjects() {
  return projects
    .filter((project) => typeof project.automationOrder === "number")
    .sort((a, b) => (a.automationOrder ?? 99) - (b.automationOrder ?? 99));
}
