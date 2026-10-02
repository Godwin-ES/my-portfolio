import { fireEvent, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ProjectTheatre } from "@/components/project-theatre";
import { getFeaturedProjects } from "@/lib/projects";

const projects = getFeaturedProjects();

describe("ProjectTheatre", () => {
  it("orders the four selectors and opens RelayDesk by default", () => {
    render(<ProjectTheatre projects={projects} />);
    const selector = screen.getByLabelText("Choose a selected project");
    const buttons = within(selector).getAllByRole("button");
    expect(buttons.map((button) => button.textContent)).toEqual([
      expect.stringContaining("RelayDesk"),
      expect.stringContaining("EchoRun"),
      expect.stringContaining("LeadLens"),
      expect.stringContaining("ChatDocs"),
    ]);
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("active-theatre-stage")).toHaveTextContent("RelayDesk");
  });

  it("updates the stage, actions, and proof media without autoplay", () => {
    render(<ProjectTheatre projects={projects} />);

    fireEvent.click(screen.getByRole("button", { name: /Select EchoRun/i }));
    expect(screen.getByTestId("active-theatre-stage")).toHaveTextContent("EchoRun");
    expect(screen.getByRole("link", { name: "Agent repository" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Select LeadLens/i }));
    expect(screen.getByTestId("active-theatre-stage")).toHaveTextContent("LeadLens");
    expect(screen.getByRole("button", { name: /Play LeadLens walkthrough/i })).toBeInTheDocument();
    expect(screen.queryByTitle("LeadLens walkthrough")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Select ChatDocs/i }));
    expect(screen.getByTestId("active-theatre-stage")).toHaveTextContent("ChatDocs");
    expect(screen.getByRole("link", { name: "Open live app" })).toHaveAttribute("href", "https://rag-app-or7d.onrender.com/");
  });

  it("keeps a case-study link for every project in static markup", () => {
    const markup = renderToStaticMarkup(<ProjectTheatre projects={projects} />);
    for (const project of projects) {
      expect(markup).toContain(`href="/work/${project.slug}"`);
      expect(markup).toContain(`Open ${project.title} case study`);
    }
  });
});
