import { act, fireEvent, render, screen } from "@testing-library/react";
import { SiteHeader } from "@/components/site-header";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

let observerCallback: IntersectionObserverCallback;
const disconnect = vi.fn();

beforeEach(() => {
  disconnect.mockClear();
  vi.stubGlobal("IntersectionObserver", vi.fn((callback: IntersectionObserverCallback) => {
    observerCallback = callback;
    return { observe: vi.fn(), unobserve: vi.fn(), disconnect, takeRecords: vi.fn(), root: null, rootMargin: "0px", thresholds: [] };
  }));
});

afterEach(() => { vi.unstubAllGlobals(); document.body.style.overflow = ""; });

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
  expect(document.body.style.overflow).toBe("hidden");
  fireEvent.keyDown(document, { key: "Escape" });
  expect(button).toHaveAttribute("aria-expanded", "false");
  expect(document.body.style.overflow).toBe("");
});

it("marks the observed homepage section and cleans up", () => {
  document.body.innerHTML = '<section id="work"></section><section id="experience"></section>';
  const { unmount } = render(<SiteHeader />);
  act(() => observerCallback([{ isIntersecting: true, intersectionRatio: 1, target: document.getElementById("work")! } as unknown as IntersectionObserverEntry], {} as IntersectionObserver));
  expect(screen.getAllByRole("link", { name: "Work" })[0]).toHaveAttribute("aria-current", "location");
  unmount();
  expect(disconnect).toHaveBeenCalled();
});
