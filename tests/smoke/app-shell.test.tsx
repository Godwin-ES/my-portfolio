import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

it("renders the portfolio inside a main landmark", async () => {
  render(await Home());
  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1, name: /AI Automation.*AI Engineering.*built for production/i })).toBeInTheDocument();
  expect(screen.getAllByRole("heading", { name: "RelayDesk" }).length).toBeGreaterThan(0);
});
