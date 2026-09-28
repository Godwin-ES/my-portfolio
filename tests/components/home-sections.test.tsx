import { render, screen } from "@testing-library/react";
import { AutomationProgression } from "@/components/automation-progression";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ToolkitGrid } from "@/components/toolkit-grid";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";

it("renders the five automation systems in order", () => {
  render(<AutomationProgression />);
  const items = screen.getAllByTestId("automation-item");
  expect(items).toHaveLength(5);
  expect(items[0]).toHaveTextContent("Intelligent Invoice Processing");
  expect(items[1]).toHaveTextContent("Operations Reporting & Decision Support");
  expect(screen.getAllByText("Operations Reporting & Decision Support")).toHaveLength(1);
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
