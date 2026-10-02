import { render, screen, within } from "@testing-library/react";
import { JourneyRail } from "@/components/journey-rail";

it("connects the portfolio into six named chapters", () => {
  render(<JourneyRail />);
  const rail = screen.getByRole("navigation", { name: "Portfolio chapters" });
  for (const [label, href] of [
    ["Signal", "#top"],
    ["Selected systems", "#work"],
    ["Two practices", "#collections"],
    ["Engineering practice", "#practice"],
    ["Experience / profile", "#experience"],
    ["Contact", "#contact"],
  ]) expect(within(rail).getByRole("link", { name: new RegExp(label, "i") })).toHaveAttribute("href", href);
});
