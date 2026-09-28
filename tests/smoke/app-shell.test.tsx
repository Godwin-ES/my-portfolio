import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

it("renders the portfolio inside a main landmark", () => {
  render(<Home />);
  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1, name: /software engineer building reliable ai applications and automation systems/i })).toBeInTheDocument();
});
