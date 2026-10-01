import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectFilter } from "@/components/project-filter";
import { projects } from "@/content/projects";

describe("ProjectFilter", () => {
  it("server-renders all projects and filters only after an explicit selection", () => {
    render(<ProjectFilter projects={projects} />);
    expect(screen.getAllByTestId("filter-project")).toHaveLength(projects.length);
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Personal" }));
    expect(screen.getByRole("button", { name: "Personal" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByTestId("filter-project")).toHaveLength(3);
    expect(screen.getByRole("link", { name: /agent repository/i })).toBeInTheDocument();
  });

  it("supports each known collection and safely resets unknown state", () => {
    render(<ProjectFilter projects={projects} initialFilter={"unknown" as never} />);
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "AI Automation" }));
    expect(screen.getAllByTestId("filter-project")).toHaveLength(6);
    fireEvent.click(screen.getByRole("button", { name: "Applied ML" }));
    expect(screen.getAllByTestId("filter-project")).toHaveLength(1);
  });
});
