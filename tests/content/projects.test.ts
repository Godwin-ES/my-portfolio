import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { validateProjects } from "@/lib/project-validation";
import {
  getAdjacentProjects,
  getAppliedMlProjects,
  getAutomationProjects,
  getFeaturedProjects,
  getPersonalProjects,
  getProjectBySlug,
} from "@/lib/projects";
import type { Project } from "@/lib/project-types";

const publicNames = [
  "Intelligent Invoice Processing",
  "Operations Reporting & Decision Support",
  "ProposalFlow",
  "ContentLedger",
  "LeadLens",
  "RelayDesk",
  "EchoRun",
  "ChatDocs",
  "SignBridge",
];

describe("portfolio project content", () => {
  it("contains every approved product name exactly once", () => {
    const titles = projects.map((project) => project.title);
    for (const name of publicNames) expect(titles.filter((title) => title === name)).toHaveLength(1);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
    expect(validateProjects(projects)).toEqual([]);
  });

  it("returns the approved selected, automation, personal, and applied-ML collections", () => {
    expect(getFeaturedProjects().map((project) => project.title)).toEqual([
      "EchoRun",
      "SignBridge",
      "RelayDesk",
      "ChatDocs",
      "LeadLens",
    ]);
    expect(getAutomationProjects().map((project) => project.title)).toEqual([
      "Intelligent Invoice Processing",
      "Operations Reporting & Decision Support",
      "ProposalFlow",
      "ContentLedger",
      "LeadLens",
      "RelayDesk",
    ]);
    expect(getPersonalProjects().map((project) => project.title)).toEqual([
      "EchoRun",
      "ChatDocs",
      "SignBridge",
    ]);
    expect(getAppliedMlProjects().map((project) => project.title)).toContain(
      "Malaria Detection with CNNs",
    );
  });

  it("keeps personal work walkthrough-free and marks RelayDesk walkthrough as coming soon", () => {
    for (const project of getPersonalProjects()) expect(project.media.kind).not.toBe("loom");
    expect(getProjectBySlug("relaydesk")?.media).toMatchObject({
      kind: "loom",
      status: "coming-soon",
    });
  });

  it("keeps each case study substantive and reachable", () => {
    for (const project of projects) {
      expect(project.problem.trim()).not.toBe("");
      expect(project.system.trim()).not.toBe("");
      expect(project.engineeringDecisions.length).toBeGreaterThan(0);
      expect(project.reliability.length).toBeGreaterThan(0);
      expect(project.result.trim()).not.toBe("");
      expect(project.collections.length).toBeGreaterThan(0);
      expect(project.stack.length).toBeLessThanOrEqual(7);
    }
    expect(getAdjacentProjects("relaydesk")).toEqual({
      previous: expect.objectContaining({ slug: "signbridge" }),
      next: expect.objectContaining({ slug: "rag-app" }),
    });
  });

  it("rejects duplicate slugs and malformed public links", () => {
    const duplicate = { ...projects[0] };
    const insecure = {
      ...projects[1],
      slug: "insecure-project",
      links: [{ kind: "live", label: "Live app", url: "http://example.com" }],
    } as Project;
    const errors = validateProjects([...projects, duplicate, insecure]);

    expect(errors).toContain(`Duplicate project slug: ${projects[0].slug}`);
    expect(errors).toContain("insecure-project: link URLs must use HTTPS");
  });

  it("rejects unusable media and empty facts", () => {
    const emptyLoom = {
      ...projects[0],
      slug: "empty-loom",
      media: { kind: "loom", status: "available", loomId: "", durationLabel: "5 min" },
    } as Project;
    const emptyImage = {
      ...projects[0],
      slug: "empty-image",
      media: { kind: "image", src: "", alt: "" },
    } as Project;
    const emptyFact = {
      ...projects[0],
      slug: "empty-fact",
      facts: [{ value: "", label: "Useful fact" }],
    } as Project;
    const errors = validateProjects([...projects, emptyLoom, emptyImage, emptyFact]);

    expect(errors).toContain("empty-loom: available Loom media requires an ID and duration");
    expect(errors).toContain("empty-image: image media requires a source and alt text");
    expect(errors).toContain("empty-fact: facts require non-empty values and labels");
  });
});
