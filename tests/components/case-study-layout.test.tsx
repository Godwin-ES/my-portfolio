import { render, screen } from "@testing-library/react";
import { CaseStudyLayout } from "@/components/case-study-layout";
import { getProjectBySlug } from "@/lib/projects";

it("renders a proof-first seven-part technical story", async () => {
  render(await CaseStudyLayout({ project: getProjectBySlug("koya-lead-agent")! }));
  for (const heading of ["Project snapshot", "Experience flow", "System architecture", "Engineering decisions", "Reliability boundaries", "Outcome", "Proof & access"]) {
    expect(screen.getByRole("heading", { level: 2, name: heading })).toBeInTheDocument();
  }
  for (const id of ["overview", "flow", "architecture", "decisions", "reliability", "result", "evidence"]) expect(document.getElementById(id)).toBeInTheDocument();
  expect(document.querySelector(".case-proof")?.compareDocumentPosition(document.querySelector(".case-hero-copy")!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(document.querySelector(".case-snapshot")?.textContent).toContain("The challenge");
  expect(document.querySelector(".case-snapshot")?.textContent).toContain("The approach");
});

it("omits unavailable live actions", async () => {
  render(await CaseStudyLayout({ project: getProjectBySlug("invoice-processing")! }));
  expect(screen.queryByRole("link", { name: /live demo/i })).not.toBeInTheDocument();
});

it("does not offer walkthrough UI for personal products", async () => {
  render(await CaseStudyLayout({ project: getProjectBySlug("voice-agent")! }));
  expect(screen.queryByText(/walkthrough/i)).not.toBeInTheDocument();
});

it("returns projects to their owning collection", async () => {
  const { rerender } = render(await CaseStudyLayout({ project: getProjectBySlug("proposal-studio")! }));
  expect(screen.getByRole("link", { name: /back to AI Automation/i })).toHaveAttribute("href", "/work/ai-automation");
  rerender(await CaseStudyLayout({ project: getProjectBySlug("signbridge")! }));
  expect(screen.getByRole("link", { name: /back to AI Engineering/i })).toHaveAttribute("href", "/work/ai-engineering");
});
