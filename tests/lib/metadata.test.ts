import { describe, expect, it } from "vitest";
import { getProjectBySlug } from "@/lib/projects";
import { buildProjectMetadata, HOME_DESCRIPTION, HOME_TITLE, SITE_URL } from "@/lib/metadata";

describe("portfolio metadata", () => {
  it("uses the approved home metadata and safe local URL default", () => {
    expect(HOME_TITLE).toBe("Godwin Ekanem — Software Engineer | AI Applications & Automation");
    expect(HOME_DESCRIPTION).toMatch(/reliable AI applications/i);
    if (!process.env.NEXT_PUBLIC_SITE_URL && !process.env.VERCEL_PROJECT_PRODUCTION_URL && !process.env.VERCEL_URL) {
      expect(SITE_URL.toString()).toBe("http://localhost:3000/");
    }
    expect(new URL("/og/default.png", SITE_URL).toString()).toContain("/og/default.png");
  });

  it("builds project metadata from the shared project content", () => {
    const project = getProjectBySlug("proposal-studio")!;
    const metadata = buildProjectMetadata(project);
    expect(metadata.title).toContain(project.title);
    expect(metadata.description).toBe(project.summary);
    expect(metadata.alternates?.canonical).toBe(`/work/${project.slug}`);
  });
});
