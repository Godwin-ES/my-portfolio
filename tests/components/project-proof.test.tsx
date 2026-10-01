import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectAccess } from "@/components/project-access";
import { ProjectActions } from "@/components/project-actions";
import { ProjectFacts } from "@/components/project-facts";
import { ProjectFlow } from "@/components/project-flow";
import { ProjectStatus } from "@/components/project-status";

describe("project proof components", () => {
  it("renders only safe supplied project actions", () => {
    render(<ProjectActions links={[{ kind: "live", label: "Try it", url: "https://example.com" }, { kind: "repository", label: "Unsafe", url: "http://example.com" }]} />);
    expect(screen.getByRole("link", { name: /try it/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /unsafe/i })).not.toBeInTheDocument();
  });

  it("renders authentic facts, an ordered flow, and readable status", () => {
    render(<><ProjectStatus status="live" /><ProjectFacts facts={[{ value: "15/15", label: "evaluation scenarios" }]} /><ProjectFlow steps={[{ label: "Listen" }, { label: "Resolve" }]} /></>);
    expect(screen.getByText("Live")).toBeInTheDocument();
    expect(screen.getByText("15/15")).toBeInTheDocument();
    const flow = screen.getByRole("list");
    expect(flow).toHaveTextContent("Listen");
    expect(flow).toHaveTextContent("Resolve");
  });

  it("never exposes credentials that were not supplied", () => {
    const { rerender } = render(<ProjectAccess notice="A microphone is required." />);
    expect(screen.getByText("A microphone is required.")).toBeInTheDocument();
    expect(screen.queryByText(/password/i)).not.toBeInTheDocument();
    rerender(<ProjectAccess notice="Demo account" credentials={{ email: "demo@example.com", password: "shared-pass" }} />);
    expect(screen.getByText("demo@example.com")).toBeInTheDocument();
    expect(screen.getByText("shared-pass")).toBeInTheDocument();
  });
});
