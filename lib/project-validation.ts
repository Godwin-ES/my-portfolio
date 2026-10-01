import type { Project } from "@/lib/project-types";

export function validateProjects(projects: Project[]): string[] {
  const errors: string[] = [];
  const slugs = new Set<string>();

  for (const project of projects) {
    if (slugs.has(project.slug)) errors.push(`Duplicate project slug: ${project.slug}`);
    slugs.add(project.slug);

    if (project.links.some(({ url }) => !url.startsWith("https://"))) {
      errors.push(`${project.slug}: link URLs must use HTTPS`);
    }

    if (
      project.media.kind === "loom" &&
      project.media.status === "available" &&
      (!project.media.loomId.trim() || !project.media.durationLabel.trim())
    ) {
      errors.push(`${project.slug}: available Loom media requires an ID and duration`);
    }

    if (
      project.media.kind === "image" &&
      (!project.media.src.trim() || !project.media.alt.trim())
    ) {
      errors.push(`${project.slug}: image media requires a source and alt text`);
    }

    if (project.facts.some(({ value, label }) => !value.trim() || !label.trim())) {
      errors.push(`${project.slug}: facts require non-empty values and labels`);
    }

    if (project.collections.length === 0) {
      errors.push(`${project.slug}: at least one collection is required`);
    }
  }

  return errors;
}
