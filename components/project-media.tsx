import { LoomFacade } from "@/components/loom-facade";
import { ProjectVisual } from "@/components/project-visual";
import { getLoomMeta } from "@/lib/loom";
import type { Project } from "@/lib/project-types";

export async function ProjectMedia({ project, priority = false, variant = "card" }: { project: Project; priority?: boolean; variant?: "card" | "hero" }) {
  const media = project.media;
  if (media.kind === "loom" && media.status === "available") {
    return <LoomFacade loomId={media.loomId} title={`${project.title} walkthrough`} durationLabel={media.durationLabel} meta={await getLoomMeta(media.loomId)} />;
  }
  if (media.kind === "loom") {
    return <div className={`project-media-state project-media-${variant}`}><ProjectVisual project={project} priority={priority} /><div className="project-media-state-label"><span>{media.status === "coming-soon" ? "Walkthrough coming soon" : "Walkthrough link pending"}</span><small>{media.status === "coming-soon" ? "A guided product tour is in production." : "The product story is available in the case study."}</small></div></div>;
  }
  if (media.kind === "image" && media.src.trim() && media.alt.trim()) {
    return <ProjectVisual project={{ ...project, heroImage: media.src, heroAlt: media.alt }} priority={priority} />;
  }
  return <ProjectVisual project={{ ...project, heroImage: undefined, heroAlt: undefined }} priority={priority} />;
}
