import type { Metadata } from "next";
import type { Project } from "@/lib/project-types";
import type { WorkCollection } from "@/lib/work-collections";

const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
export const SITE_URL = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? (deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000"));
export const HOME_TITLE = "Godwin Ekanem — AI Engineer building software that operates beyond the demo";
export const HOME_DESCRIPTION = "AI Engineer building real-time voice systems, grounded AI products, and governed automation with explicit state, reliability boundaries, and human review.";
const defaultImage = "/opengraph-image";

export const homeMetadata: Metadata = { metadataBase: SITE_URL, title: HOME_TITLE, description: HOME_DESCRIPTION, alternates: { canonical: "/" }, openGraph: { type: "website", title: HOME_TITLE, description: HOME_DESCRIPTION, url: "/", siteName: "Godwin Ekanem Portfolio", images: [{ url: defaultImage, width: 1200, height: 630, alt: "Godwin Ekanem — AI Engineering and AI Automation built to operate beyond the demo" }] }, twitter: { card: "summary_large_image", title: HOME_TITLE, description: HOME_DESCRIPTION, images: [defaultImage] } };

export function buildProjectMetadata(project: Project): Metadata {
  const title = `${project.title} — Godwin Ekanem`; const path = `/work/${project.slug}`;
  const image = `${path}/opengraph-image`;
  return { metadataBase: SITE_URL, title, description: project.summary, alternates: { canonical: path }, openGraph: { type: "article", title, description: project.summary, url: path, siteName: "Godwin Ekanem Portfolio", images: [{ url: image, width: 1200, height: 630, alt: `${project.title} case study by Godwin Ekanem` }] }, twitter: { card: "summary_large_image", title, description: project.summary, images: [image] } };
}

export function buildCollectionMetadata(collection: WorkCollection): Metadata {
  const path = `/work/${collection.id}`;
  const title = `${collection.title} Projects — Godwin Ekanem`;
  return {
    metadataBase: SITE_URL,
    title,
    description: collection.description,
    alternates: { canonical: path },
    openGraph: { type: "website", title, description: collection.description, url: path, siteName: "Godwin Ekanem Portfolio", images: [{ url: defaultImage, width: 1200, height: 630, alt: `${collection.title} projects by Godwin Ekanem` }] },
    twitter: { card: "summary_large_image", title, description: collection.description, images: [defaultImage] },
  };
}
