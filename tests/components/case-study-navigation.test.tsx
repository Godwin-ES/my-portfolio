import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CaseStudyNavigation } from "@/components/case-study-navigation";
import { getAdjacentProjects } from "@/lib/projects";

describe("CaseStudyNavigation", () => {
  it("renders stable section links and deterministic neighbors", () => {
    const adjacent = getAdjacentProjects("relaydesk");
    render(<CaseStudyNavigation sections={[{ id: "overview", label: "Overview" }, { id: "evidence", label: "Evidence" }]} previous={adjacent.previous} next={adjacent.next} />);
    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute("href", "#overview");
    expect(screen.getByRole("link", { name: /previous project: signbridge/i })).toHaveAttribute("href", "/work/signbridge");
    expect(screen.getByRole("link", { name: /next project: chatdocs/i })).toHaveAttribute("href", "/work/rag-app");
  });

  it("handles the first and last catalogue boundaries", () => {
    const first = getAdjacentProjects("voice-agent");
    const { rerender } = render(<CaseStudyNavigation sections={[]} previous={first.previous} next={first.next} />);
    expect(screen.queryByRole("link", { name: /previous project/i })).not.toBeInTheDocument();
    const last = getAdjacentProjects("malaria-detection");
    rerender(<CaseStudyNavigation sections={[]} previous={last.previous} next={last.next} />);
    expect(screen.queryByRole("link", { name: /next project/i })).not.toBeInTheDocument();
  });
});
