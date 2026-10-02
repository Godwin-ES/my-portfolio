import { fireEvent, render, screen } from "@testing-library/react";
import { AutomationProgression } from "@/components/automation-progression";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ToolkitGrid } from "@/components/toolkit-grid";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { ProjectTheatre } from "@/components/project-theatre";
import { MoreProjects } from "@/components/more-projects";
import { getFeaturedProjects } from "@/lib/projects";

it("renders the six AI Automation systems in order without legacy public labels", () => {
  render(<AutomationProgression />);
  const items = screen.getAllByTestId("automation-item");
  expect(items).toHaveLength(6);
  expect(items[0]).toHaveTextContent("Intelligent Invoice Processing");
  expect(items[1]).toHaveTextContent("Operations Reporting & Decision Support");
  expect(screen.getAllByText("Operations Reporting & Decision Support")).toHaveLength(1);
  expect(items[2]).toHaveTextContent("ProposalFlow");
  expect(items[3]).toHaveTextContent("ContentStudio");
  expect(items[4]).toHaveTextContent("LeadLens");
  expect(items[5]).toHaveTextContent("RelayDesk");
  expect(screen.queryByText(/AI Automation Program/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Koya/i)).not.toBeInTheDocument();
});

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

it("keeps every approved catalogue project discoverable", () => {
  render(<MoreProjects />);
  expect(screen.queryByText("Malaria Detection with CNNs")).not.toBeInTheDocument();
  expect(screen.getAllByTestId("filter-project")).toHaveLength(9);
});

it("keeps experience and toolkit concise", () => {
  render(<><ExperienceTimeline /><ToolkitGrid /></>);
  expect(screen.getAllByTestId("experience-item")).toHaveLength(4);
  expect(screen.getAllByTestId("toolkit-category")).toHaveLength(4);
});

it("renders education and a direct email action", () => {
  render(<><AboutSection /><ContactSection /></>);
  expect(screen.getByText(/B\.Eng\. Electrical & Electronics Engineering/)).toHaveTextContent("4.80/5.00");
  expect(screen.getByRole("link", { name: /email me/i })).toHaveAttribute("href", "mailto:ekanemgodwins@gmail.com");
});
