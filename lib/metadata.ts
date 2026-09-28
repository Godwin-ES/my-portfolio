import type { Metadata } from "next";
import type { Project } from "@/lib/project-types";

const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? (deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000"),
);
export const HOME_TITLE = "Godwin Ekanem — Software Engineer | AI Applications & Automation";
export const HOME_DESCRIPTION = "Software engineer building reliable AI applications, backend systems, and automation workflows with strong validation, state, and human-review boundaries.";

const defaultImage = "/og/default.png";

export const homeMetadata: Metadata = {
  metadataBase: SITE_URL,
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    siteName: "Godwin Ekanem Portfolio",
    images: [{ url: defaultImage, width: 1200, height: 630, alt: "Godwin Ekanem — Software Engineer building reliable AI applications and automation systems" }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [defaultImage],
  },
};

export function buildProjectMetadata(project: Project): Metadata {
  const title = `${project.title} — Godwin Ekanem`;
  const path = `/work/${project.slug}`;
  return {
    metadataBase: SITE_URL,
    title,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title,
      description: project.summary,
      url: path,
      siteName: "Godwin Ekanem Portfolio",
      images: [{ url: defaultImage, width: 1200, height: 630, alt: `${project.title} case study by Godwin Ekanem` }],
    },
    twitter: { card: "summary_large_image", title, description: project.summary, images: [defaultImage] },
  };
}
