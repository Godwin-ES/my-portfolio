import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WorkCollectionLayout } from "@/components/work-collection-layout";
import { getCollectionProjects } from "@/lib/projects";
import { getWorkCollection } from "@/lib/work-collections";

describe("WorkCollectionLayout", () => {
  it("presents AI Automation as the six-system progression in exact order", () => {
    const collection = getWorkCollection("ai-automation")!;
    render(<WorkCollectionLayout collection={collection} projects={getCollectionProjects(collection.id)} />);

    expect(screen.getByRole("heading", { level: 1, name: "AI Automation" })).toBeInTheDocument();
    expect(screen.getByText(/reviewed, traceable outcomes/i)).toBeInTheDocument();
    const rows = screen.getAllByTestId("collection-project");
    expect(rows.map((row) => within(row).getByRole("heading", { level: 2 }).textContent)).toEqual([
      "Intelligent Invoice Processing",
      "Operations Reporting & Decision Support",
      "ProposalFlow",
      "ContentStudio",
      "LeadLens",
      "RelayDesk",
    ]);
    for (const row of rows) expect(within(row).queryAllByTestId("collection-stack-tag").length).toBeLessThanOrEqual(4);
    expect(screen.getByRole("button", { name: /Play LeadLens walkthrough/i })).toBeInTheDocument();
    expect(screen.getByText(/walkthrough link pending/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Play RelayDesk walkthrough/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Also explore AI Engineering/i })).toHaveAttribute("href", "/work/ai-engineering");
  });

  it("keeps personal products in AI Engineering without walkthrough controls", () => {
    const collection = getWorkCollection("ai-engineering")!;
    render(<WorkCollectionLayout collection={collection} projects={getCollectionProjects(collection.id)} />);

    expect(screen.getAllByTestId("collection-project").map((row) => within(row).getByRole("heading", { level: 2 }).textContent)).toEqual([
      "EchoRun", "ChatDocs", "SignBridge",
    ]);
    expect(screen.queryByRole("button", { name: /walkthrough/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Also explore AI Automation/i })).toHaveAttribute("href", "/work/ai-automation");
  });
});
