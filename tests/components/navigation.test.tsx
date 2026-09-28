import { fireEvent, render, screen } from "@testing-library/react";
import { SiteHeader } from "@/components/site-header";

it("renders the primary navigation and résumé PDF action", () => {
  render(<SiteHeader />);
  for (const href of ["#work", "#experience", "#about", "#contact"]) {
    expect(document.querySelector(`a[href="${href}"]`)).toBeInTheDocument();
  }
  expect(screen.getAllByRole("link", { name: /résumé/i })[0]).toHaveAttribute(
    "href",
    "/resume/Ekanem_Godwin_Resume.pdf",
  );
});

it("exposes an accessible mobile menu toggle", () => {
  render(<SiteHeader />);
  const button = screen.getByRole("button", { name: /open navigation/i });
  expect(button).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(button);
  expect(button).toHaveAttribute("aria-expanded", "true");
});
