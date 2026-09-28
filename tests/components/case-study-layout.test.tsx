import { render, screen } from "@testing-library/react";
import { CaseStudyLayout } from "@/components/case-study-layout";
import { getProjectBySlug } from "@/lib/projects";

it("renders the complete shared case-study structure", () => {
  render(<CaseStudyLayout project={getProjectBySlug("koya-lead-agent")!} />);
  for (const heading of ["Problem", "System", "Architecture", "Engineering decisions", "Reliability & edge cases", "Result", "Evidence"]) {
    expect(screen.getByRole("heading", { level: 2, name: heading })).toBeInTheDocument();
  }
});

it("omits unavailable live actions", () => {
  render(<CaseStudyLayout project={getProjectBySlug("malaria-detection")!} />);
  expect(screen.queryByRole("link", { name: /live demo/i })).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
});
