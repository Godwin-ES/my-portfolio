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
  "ContentStudio",
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
      "ContentStudio",
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

  it("publishes the supplied weekly walkthroughs and keeps Week 4 pending", () => {
    expect(getProjectBySlug("invoice-processing")?.media).toEqual({ kind: "loom", status: "available", loomId: "f31cca28a78f42ddacf22540273ae76c", durationLabel: "4:57", poster: "https://cdn.loom.com/sessions/thumbnails/f31cca28a78f42ddacf22540273ae76c-2d96ea7173e1ef4e.gif" });
    expect(getProjectBySlug("operations-reporting")?.media).toEqual({ kind: "loom", status: "available", loomId: "07c77bb238b24bfa98a2531ad26c1555", durationLabel: "4:57", poster: "https://cdn.loom.com/sessions/thumbnails/07c77bb238b24bfa98a2531ad26c1555-91e73a4f0c4a796a.gif" });
    expect(getProjectBySlug("proposal-studio")?.media).toEqual({ kind: "loom", status: "available", loomId: "ec14befcc6464963ae2fd567bd26ac46", durationLabel: "4:34", poster: "https://cdn.loom.com/sessions/thumbnails/ec14befcc6464963ae2fd567bd26ac46-333222874213ecbd.gif" });
    expect(getProjectBySlug("content-studio")?.media).toEqual({ kind: "loom", status: "pending-link" });
    expect(getProjectBySlug("koya-lead-agent")?.media).toEqual({ kind: "loom", status: "available", loomId: "0782a9f803264877a2f832000ee114bd", durationLabel: "4:44", poster: "https://cdn.loom.com/sessions/thumbnails/0782a9f803264877a2f832000ee114bd-be5ad2285fd76bd8.gif" });
  });

  it("publishes only the confirmed live application URLs", () => {
    expect(getProjectBySlug("voice-agent")?.links).toContainEqual({ kind: "live", label: "Open live app", url: "https://meet-nine-xi.vercel.app/" });
    expect(getProjectBySlug("rag-app")?.links).toContainEqual({ kind: "live", label: "Open live app", url: "https://rag-app-or7d.onrender.com/" });
    expect(getProjectBySlug("signbridge")?.links).toContainEqual({ kind: "live", label: "Open live app", url: "https://asl-project-ehmkxe7wmhhf3pg3uwcphg.streamlit.app/" });
    expect(getProjectBySlug("operations-reporting")?.links).toContainEqual({ kind: "live", label: "Open live dashboard", url: "https://koya-dashboard.streamlit.app/" });
    expect(getProjectBySlug("proposal-studio")?.links).toContainEqual({ kind: "live", label: "Open live app", url: "https://proposal-app-one-pi.vercel.app/" });
    expect(getProjectBySlug("content-studio")?.links).toContainEqual({ kind: "live", label: "Open live app", url: "https://content-app-nine-fawn.vercel.app/" });
    expect(getProjectBySlug("koya-lead-agent")?.links).toContainEqual({ kind: "live", label: "Open live app", url: "https://koya-lead-agent-five.vercel.app" });
    expect(getProjectBySlug("relaydesk")?.links).toContainEqual({ kind: "live", label: "Try the live agent", url: "https://koya-support-agent.vercel.app" });
  });

  it("never presents a project as live without a visitor-accessible app", () => {
    for (const project of projects.filter(({ status }) => status === "live")) {
      expect(project.links.some(({ kind }) => kind === "live")).toBe(true);
    }
    expect(getProjectBySlug("voice-agent")?.status).toBe("live");
    expect(getProjectBySlug("rag-app")?.status).toBe("live");
    expect(getProjectBySlug("signbridge")?.status).toBe("live");
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
