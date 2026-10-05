import { fireEvent, render, screen } from "@testing-library/react";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { EngineeringPractice } from "@/components/engineering-practice";
import { WorkGateways } from "@/components/work-gateways";
import { getFeaturedProjects } from "@/lib/projects";

it("leads with both disciplines and an accessible discipline switch", () => {
  render(<><Hero stats={[{ value: 9, label: "systems built" }]} /><SelectedWork projects={getFeaturedProjects()} /></>);
  expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName("AI Automation & AI Engineering, built for production.");
  expect(screen.getByRole("link", { name: /explore selected work/i })).toHaveAttribute("href", "#work");
  expect(screen.getByText("09")).toBeInTheDocument();
  expect(screen.getByText(/Abuja, Nigeria/)).toBeInTheDocument();

  const automation = screen.getByRole("button", { name: /View AI Automation system/i });
  const engineering = screen.getByRole("button", { name: /View AI Engineering system/i });
  expect(automation).toHaveAttribute("aria-pressed", "true");
  expect(engineering).toHaveAttribute("aria-pressed", "false");
  expect(screen.getByRole("list", { name: "AI Automation stages" })).toHaveTextContent("Guardrails");
  fireEvent.click(engineering);
  expect(engineering).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText(/Product architecture that connects/i)).toBeInTheDocument();
  expect(screen.getByRole("list", { name: "AI Engineering stages" })).toHaveTextContent("Intelligence");
  expect(screen.queryByText(/\d+%|\d+\+/)).not.toBeInTheDocument();
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
