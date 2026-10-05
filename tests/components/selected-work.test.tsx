import { fireEvent, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SelectedWork } from "@/components/selected-work";
import { getFeaturedProjects } from "@/lib/projects";

const projects = getFeaturedProjects();

describe("SelectedWork", () => {
  it("stacks the four featured systems in order, RelayDesk first", () => {
    render(<SelectedWork projects={projects} />);
    const cards = screen.getAllByTestId("work-card");
    expect(cards.map((card) => within(card).getByRole("heading", { level: 3 }).textContent)).toEqual(["RelayDesk", "EchoRun", "LeadLens", "ChatDocs"]);
    expect(cards.map((card) => card.dataset.tone)).toEqual(["automation", "engineering", "automation", "engineering"]);
    expect(screen.queryByRole("heading", { name: "SignBridge" })).not.toBeInTheDocument();
  });

  it("exposes each project's actions and defers walkthrough playback", () => {
    render(<SelectedWork projects={projects} />);
    expect(screen.getByRole("link", { name: "Agent repository" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Open live app" }).some((link) => link.getAttribute("href") === "https://rag-app-or7d.onrender.com/")).toBe(true);
    const play = screen.getByRole("button", { name: /Play LeadLens walkthrough/i });
    expect(screen.queryByTitle("LeadLens walkthrough")).not.toBeInTheDocument();
    fireEvent.click(play);
    expect(screen.getByTitle("LeadLens walkthrough")).toHaveAttribute("src", expect.stringContaining("autoplay=1"));
  });

  it("keeps a case-study link for every project in static markup", () => {
    const markup = renderToStaticMarkup(<SelectedWork projects={projects} />);
    for (const project of projects) {
      expect(markup).toContain(`href="/work/${project.slug}"`);
      expect(markup).toContain(`Open ${project.title} case study`);
    }
  });
});
