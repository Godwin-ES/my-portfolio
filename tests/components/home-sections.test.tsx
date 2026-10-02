import { fireEvent, render, screen } from "@testing-library/react";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { ProjectTheatre } from "@/components/project-theatre";
import { EngineeringPractice } from "@/components/engineering-practice";
import { WorkGateways } from "@/components/work-gateways";
import { getFeaturedProjects } from "@/lib/projects";

it("positions AI Automation and AI Engineering as one production practice", async () => {
  render(<><Hero /><ProjectTheatre projects={getFeaturedProjects()} /></>);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/AI Automation/i);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/AI Engineering/i);
  expect(screen.getByRole("link", { name: /explore selected work/i })).toHaveAttribute("href", "#work");

  const automationLane = screen.getByRole("button", { name: /AI Automation lane/i });
  const engineeringLane = screen.getByRole("button", { name: /AI Engineering lane/i });
  expect(automationLane).toHaveAttribute("aria-pressed", "false");
  expect(engineeringLane).toHaveAttribute("aria-pressed", "false");
  fireEvent.focus(automationLane);
  expect(automationLane).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText(/governed workflows/i)).toBeInTheDocument();
  fireEvent.focus(engineeringLane);
  expect(engineeringLane).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText(/product architecture/i)).toBeInTheDocument();
  expect(screen.getByText("Production system")).toBeInTheDocument();
  expect(screen.queryByText(/\d+%|\d+\+/)).not.toBeInTheDocument();

  for (const title of ["RelayDesk", "EchoRun", "LeadLens", "ChatDocs"]) expect(screen.getByRole("button", { name: `Select ${title}` })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /Select SignBridge/i })).not.toBeInTheDocument();
});

it("routes the two bodies of work through equal collection gateways", () => {
  render(<WorkGateways />);
  expect(screen.getByRole("link", { name: /Explore AI Automation projects/i })).toHaveAttribute("href", "/work/ai-automation");
  expect(screen.getByRole("link", { name: /Explore AI Engineering projects/i })).toHaveAttribute("href", "/work/ai-engineering");
  expect(screen.getByText("6 projects")).toBeInTheDocument();
  expect(screen.getByText("3 projects")).toBeInTheDocument();
  expect(screen.queryByText(/AI Automation Program/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Koya/i)).not.toBeInTheDocument();
});

it("explains engineering judgment through four concrete principles", () => {
  render(<EngineeringPractice />);
  for (const principle of [
    "Make AI boundaries explicit.",
    "Preserve state and evidence.",
    "Design failure paths deliberately.",
    "Build the interface as part of the system.",
  ]) expect(screen.getByRole("heading", { name: principle })).toBeInTheDocument();
  expect(screen.getAllByTestId("practice-item")).toHaveLength(4);
  expect(screen.queryByText(/toolkit/i)).not.toBeInTheDocument();
});

it("keeps experience, profile, and contact concise", () => {
  render(<><ExperienceTimeline /><AboutSection /><ContactSection /></>);
  expect(screen.getAllByTestId("experience-item")).toHaveLength(4);
  expect(screen.getByText(/B\.Eng\. Electrical & Electronics Engineering/)).toHaveTextContent("4.80/5.00");
  expect(screen.getByRole("link", { name: /email me/i })).toHaveAttribute("href", "mailto:ekanemgodwins@gmail.com");
  expect(screen.queryByRole("button", { name: "All" })).not.toBeInTheDocument();
  expect(screen.queryByText(/Explore the complete body of work/i)).not.toBeInTheDocument();
});
