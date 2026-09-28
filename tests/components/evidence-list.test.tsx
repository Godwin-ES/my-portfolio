import { render, screen } from "@testing-library/react";
import { EvidenceList } from "@/components/evidence-list";

it("renders linked and descriptive-only evidence correctly", () => {
  render(<EvidenceList items={[
    { kind: "github", label: "Repository", description: "Source", url: "https://github.com/Godwin-ES/rag-app" },
    { kind: "test", label: "Test evidence", description: "Verified scenarios" }
  ]} />);
  expect(screen.getByRole("link", { name: /repository/i })).toHaveAttribute("href", "https://github.com/Godwin-ES/rag-app");
  expect(screen.getByText("Test evidence").closest("a")).toBeNull();
});
