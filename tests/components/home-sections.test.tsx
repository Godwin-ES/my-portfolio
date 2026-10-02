import { render, screen } from "@testing-library/react";
import { AutomationProgression } from "@/components/automation-progression";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ToolkitGrid } from "@/components/toolkit-grid";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { MoreProjects } from "@/components/more-projects";

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

it("leads with a clear value proposition and the four flagship products", async () => {
  render(<><Hero />{await SelectedWork()}</>);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/AI products/i);
  expect(screen.getByRole("link", { name: /explore selected work/i })).toHaveAttribute("href", "#work");
  for (const title of ["RelayDesk", "EchoRun", "LeadLens", "ChatDocs"]) expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: "SignBridge" })).not.toBeInTheDocument();
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
