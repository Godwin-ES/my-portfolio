import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CaseStudyNavigation } from "@/components/case-study-navigation";
import { getAdjacentProjects } from "@/lib/projects";

describe("CaseStudyNavigation", () => {
  it("renders concise section links and collection-scoped neighbors", () => {
    const adjacent = getAdjacentProjects("relaydesk");
    const { rerender } = render(<CaseStudyNavigation sections={[{ id: "overview", label: "Overview" }, { id: "evidence", label: "Evidence" }]} collectionTitle="AI Automation" />);
    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute("href", "#overview");
    rerender(<CaseStudyNavigation sections={[]} previous={adjacent.previous} next={adjacent.next} collectionTitle="AI Automation" />);
    expect(screen.getByRole("link", { name: /previous project: leadlens/i })).toHaveAttribute("href", "/work/koya-lead-agent");
    expect(screen.queryByRole("link", { name: /next project/i })).not.toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /more ai automation case studies/i })).toBeInTheDocument();
  });

  it("handles the first and last catalogue boundaries", () => {
    const first = getAdjacentProjects("voice-agent");
    const { rerender } = render(<CaseStudyNavigation sections={[]} previous={first.previous} next={first.next} />);
    expect(screen.queryByRole("link", { name: /previous project/i })).not.toBeInTheDocument();
    const last = getAdjacentProjects("signbridge");
    rerender(<CaseStudyNavigation sections={[]} previous={last.previous} next={last.next} />);
    expect(screen.queryByRole("link", { name: /next project/i })).not.toBeInTheDocument();
  });
});
