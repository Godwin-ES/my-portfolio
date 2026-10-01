import { Github, MonitorUp } from "lucide-react";
import { ExternalLink } from "@/components/external-link";
import type { ProjectLink } from "@/lib/project-types";

export function ProjectActions({ links, compact = false }: { links: ProjectLink[]; compact?: boolean }) {
  const safeLinks = links.filter(({ url }) => url.startsWith("https://"));
  if (!safeLinks.length) return null;
  return <div className={`project-actions ${compact ? "project-actions-compact" : ""}`} aria-label="Project links">{safeLinks.map((link, index) => <ExternalLink className={`button ${index === 0 ? "button-primary" : "button-secondary"}`} href={link.url} key={`${link.kind}-${link.url}`}>{link.kind === "live" ? <MonitorUp aria-hidden="true" size={16} /> : <Github aria-hidden="true" size={16} />}{link.label}</ExternalLink>)}</div>;
}
