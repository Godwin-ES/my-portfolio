import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

it("renders the portfolio inside a main landmark", async () => {
  render(await Home());
  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1, name: /AI products that work beyond the demo/i })).toBeInTheDocument();
  expect(screen.getAllByRole("heading", { name: "RelayDesk" }).length).toBeGreaterThan(0);
});
