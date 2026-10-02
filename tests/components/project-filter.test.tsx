import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectFilter } from "@/components/project-filter";
import { projects } from "@/content/projects";
import { renderToStaticMarkup } from "react-dom/server";

describe("ProjectFilter", () => {
  it("includes every project in server-rendered HTML before JavaScript runs", () => {
    const html = renderToStaticMarkup(<ProjectFilter projects={projects} />);
    expect(html.match(/data-testid="filter-project"/g)).toHaveLength(projects.length);
    for (const project of projects) expect(html).toContain(`/work/${project.slug}`);
  });

  it("server-renders all projects and filters only after an explicit selection", () => {
    render(<ProjectFilter projects={projects} />);
    expect(screen.getAllByTestId("filter-project")).toHaveLength(projects.length);
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "AI Engineering" }));
    expect(screen.getByRole("button", { name: "AI Engineering" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByTestId("filter-project")).toHaveLength(3);
    expect(screen.getByRole("link", { name: /agent repository/i })).toBeInTheDocument();
  });

  it("supports each known collection and safely resets unknown state", () => {
    render(<ProjectFilter projects={projects} initialFilter={"unknown" as never} />);
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "AI Automation" }));
    expect(screen.getAllByTestId("filter-project")).toHaveLength(6);
    fireEvent.click(screen.getByRole("button", { name: "AI Engineering" }));
    expect(screen.getAllByTestId("filter-project")).toHaveLength(3);
  });
});
