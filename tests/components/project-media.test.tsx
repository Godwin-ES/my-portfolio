import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LoomFacade } from "@/components/loom-facade";
import { ProjectMedia } from "@/components/project-media";
import { getProjectBySlug } from "@/lib/projects";

describe("project media", () => {
  it("defers the Loom iframe until the visitor chooses to play", () => {
    render(<LoomFacade loomId="abc123" title="ProposalFlow walkthrough" durationLabel="4 min" meta={{ thumbnailUrl: null, previewUrl: null, width: 16, height: 9 }} />);
    expect(screen.queryByTitle("ProposalFlow walkthrough")).not.toBeInTheDocument();
    expect(screen.getByText("Video walkthrough")).toBeInTheDocument();
    expect(screen.getByText("ProposalFlow walkthrough")).toBeInTheDocument();
    expect(screen.getByText("4 min")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /play proposalflow walkthrough/i }));
    expect(screen.getByTitle("ProposalFlow walkthrough")).toHaveAttribute("src", expect.stringContaining("abc123"));
  });

  it("renders explicit pending and coming-soon states", async () => {
    const pending = getProjectBySlug("content-studio")!;
    const relay = getProjectBySlug("relaydesk")!;
    const { rerender } = render(await ProjectMedia({ project: pending }));
    expect(screen.getByText(/walkthrough link pending/i)).toBeInTheDocument();
    rerender(await ProjectMedia({ project: relay }));
    expect(screen.getByText(/walkthrough coming soon/i)).toBeInTheDocument();
  });

  it("falls back to the architecture preview when image media is incomplete", async () => {
    const project = { ...getProjectBySlug("signbridge")!, media: { kind: "image", src: "", alt: "" } as const };
    render(await ProjectMedia({ project }));
    expect(screen.getByTestId("architecture-fallback")).toHaveAccessibleName(/signbridge system architecture preview/i);
  });
});
