import { describe, expect, it } from "vitest";
import { getProjectBySlug } from "@/lib/projects";
import { buildCollectionMetadata, buildProjectMetadata, HOME_DESCRIPTION, HOME_TITLE, SITE_URL } from "@/lib/metadata";
import { projects } from "@/content/projects";
import sitemap from "@/app/sitemap";
import { getWorkCollection } from "@/lib/work-collections";

describe("portfolio metadata",()=>{
  it("uses product-focused home metadata and a safe local URL default",()=>{
    expect(HOME_TITLE).toBe("Godwin Ekanem — AI Automation & AI Engineering");
    expect(HOME_DESCRIPTION).toMatch(/AI automation.*AI engineering/i);
    if(!process.env.NEXT_PUBLIC_SITE_URL&&!process.env.VERCEL_PROJECT_PRODUCTION_URL&&!process.env.VERCEL_URL)expect(SITE_URL.toString()).toBe("http://localhost:3000/");
  });

  it("builds renamed, canonical project metadata with project-specific images",()=>{
    const project=getProjectBySlug("proposal-studio")!;
    const metadata=buildProjectMetadata(project);
    expect(metadata.title).toContain("ProposalFlow");
    expect(metadata.description).toBe(project.summary);
    expect(metadata.alternates?.canonical).toBe(`/work/${project.slug}`);
    expect(metadata.openGraph && "images" in metadata.openGraph ? metadata.openGraph.images : []).toEqual(expect.arrayContaining([expect.objectContaining({url:`/work/${project.slug}/opengraph-image`})]));
  });

  it("builds canonical metadata for each work collection", () => {
    const collection = getWorkCollection("ai-automation")!;
    const metadata = buildCollectionMetadata(collection);
    expect(metadata.title).toContain("AI Automation");
    expect(metadata.description).toBe(collection.description);
    expect(metadata.alternates?.canonical).toBe("/work/ai-automation");
  });

  it("publishes one unique sitemap entry for every stable project slug",()=>{
    const entries=sitemap();
    const projectEntries=entries.filter(({url})=>url.includes("/work/"));
    expect(projectEntries).toHaveLength(projects.length + 2);
    expect(new Set(entries.map(({url})=>url)).size).toBe(entries.length);
    for(const slug of ["proposal-studio","content-studio","koya-lead-agent","voice-agent","rag-app","relaydesk","signbridge"])expect(projectEntries.some(({url})=>url.endsWith(`/work/${slug}`))).toBe(true);
    for (const collection of ["ai-automation", "ai-engineering"]) expect(projectEntries.some(({ url }) => url.endsWith(`/work/${collection}`))).toBe(true);
    expect(projectEntries.some(({url})=>url.endsWith("/work/malaria-detection"))).toBe(false);
  });
});
