import { projects } from "@/content/projects";
import type { Project, ProjectCollection } from "@/lib/project-types";
import { getWorkCollection, workCollections } from "@/lib/work-collections";

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
}

export function getCollectionProjects(id: ProjectCollection) {
  const collection = getWorkCollection(id);
  if (!collection) return [];
  return collection.projectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => Boolean(project));
}

export function getProjectCollection(project: Project) {
  return workCollections.find(({ id }) => project.collections.includes(id));
}

export function getAdjacentProjects(slug: string) {
  const project = getProjectBySlug(slug);
  const collection = project ? getProjectCollection(project) : undefined;
  const catalogue = collection ? getCollectionProjects(collection.id) : [];
  const index = catalogue.findIndex((project) => project.slug === slug);
  if (index < 0) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? catalogue[index - 1] : undefined,
    next: index < catalogue.length - 1 ? catalogue[index + 1] : undefined,
  };
}
