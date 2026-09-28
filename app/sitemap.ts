import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { SITE_URL } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: new URL("/", SITE_URL).toString(), changeFrequency: "monthly", priority: 1 },
    { url: new URL("/resume", SITE_URL).toString(), changeFrequency: "yearly", priority: 0.7 },
    ...projects.map((project) => ({ url: new URL(`/work/${project.slug}`, SITE_URL).toString(), changeFrequency: "monthly" as const, priority: project.featured ? 0.9 : 0.7 })),
  ];
}
