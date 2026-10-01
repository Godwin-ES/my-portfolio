import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/components/project-card";
import { getProjectBySlug } from "@/lib/projects";

it("renders project content and case-study link", () => {
  const project = getProjectBySlug("rag-app")!;
  render(<ProjectCard project={project} />);
  expect(screen.getByText(project.title)).toBeInTheDocument();
  expect(screen.getByText(project.category)).toBeInTheDocument();
  expect(screen.getByText(project.summary)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /view case study/i })).toHaveAttribute("href", "/work/rag-app");
  expect(screen.getByRole("link", { name: /source repository/i })).toHaveAttribute("href", "https://github.com/Godwin-ES/rag-app");
  expect(screen.getAllByTestId("stack-tag").length).toBeLessThanOrEqual(5);
});

it("uses architecture fallback when no authentic hero image exists", () => {
  const project = getProjectBySlug("koya-lead-agent")!;
  render(<ProjectCard project={project} />);
  expect(screen.getByTestId("architecture-fallback")).toBeInTheDocument();
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
});
