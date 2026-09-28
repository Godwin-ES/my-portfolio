import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

it("renders the portfolio identity inside a main landmark", () => {
  render(<Home />);
  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(screen.getByText("Godwin Ekanem")).toBeInTheDocument();
});
