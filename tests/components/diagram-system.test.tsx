import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { ProjectFlow } from "@/components/project-flow";
import { ProjectVisual } from "@/components/project-visual";
import { projects } from "@/content/projects";
import { getProjectBySlug } from "@/lib/projects";

describe("responsive diagram system", () => {
  it("uses curated preview nodes with complete, unclamped labels", () => {
    for (const project of projects) {
      const previewIds = project.architecture.previewNodeIds ?? [];
      expect(previewIds.length).toBeGreaterThanOrEqual(3);
      expect(previewIds.length).toBeLessThanOrEqual(4);
      expect(previewIds.every((id) => project.architecture.nodes.some((node) => node.id === id))).toBe(true);

      const { unmount } = render(<ProjectVisual project={project} />);
      const preview = screen.getByTestId("architecture-fallback");
      expect(within(preview).getAllByTestId("preview-node").map((node) => node.getAttribute("data-node-id"))).toEqual(previewIds);
      for (const id of previewIds) {
        const node = project.architecture.nodes.find((candidate) => candidate.id === id)!;
        expect(within(preview).getByText(node.label)).toBeVisible();
      }
      expect(preview.querySelector("[class*='truncate'], [class*='clamp']")).not.toBeInTheDocument();
      unmount();
    }
  });

  it("groups every architecture node and preserves connection semantics", () => {
    const project = getProjectBySlug("relaydesk")!;
    render(<ArchitectureDiagram architecture={project.architecture} />);
    expect(screen.getAllByTestId("architecture-layer").length).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByTestId("architecture-node")).toHaveLength(project.architecture.nodes.length);
    const connections = screen.getAllByTestId("architecture-connection");
    expect(connections).toHaveLength(project.architecture.edges.length);
    project.architecture.edges.forEach((edge, index) => {
      expect(connections[index]).toHaveAttribute("data-from", edge.from);
      expect(connections[index]).toHaveAttribute("data-to", edge.to);
      expect(connections[index]).toHaveAccessibleName(new RegExp(edge.label ?? "passes to", "i"));
    });
    expect(document.querySelector(".architecture-edges")).not.toBeInTheDocument();
  });

  it("caps product flow at five complete, visible steps", () => {
    const steps = ["Capture", "Validate", "Research", "Review", "Deliver", "Archive"].map((label) => ({ label }));
    render(<ProjectFlow steps={steps} />);
    const rendered = screen.getAllByTestId("flow-step");
    expect(rendered).toHaveLength(5);
    expect(rendered.map((step) => step.textContent)).toEqual([
      expect.stringContaining("Capture"), expect.stringContaining("Validate"), expect.stringContaining("Research"),
      expect.stringContaining("Review"), expect.stringContaining("Deliver"),
    ]);
    expect(rendered.every((step) => !step.hidden && !step.className.includes("hidden"))).toBe(true);
  });
});
