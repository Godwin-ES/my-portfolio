import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Reveal } from "@/components/reveal";

describe("Reveal", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("keeps content readable, reveals on intersection, and cleans up", () => {
    let callback!: IntersectionObserverCallback;
    const disconnect = vi.fn();
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: false }));
    vi.stubGlobal("IntersectionObserver", vi.fn((cb: IntersectionObserverCallback) => { callback = cb; return { observe: vi.fn(), disconnect, unobserve: vi.fn(), takeRecords: vi.fn(), root: null, rootMargin: "0px", thresholds: [] }; }));
    const { unmount } = render(<Reveal><p>Visible story</p></Reveal>);
    const wrapper = screen.getByText("Visible story").parentElement!;
    expect(wrapper).not.toHaveAttribute("hidden");
    act(() => callback([{ isIntersecting: true, target: wrapper } as unknown as IntersectionObserverEntry], {} as IntersectionObserver));
    expect(wrapper).toHaveAttribute("data-visible", "true");
    unmount();
    expect(disconnect).toHaveBeenCalled();
  });

  it("bypasses observation for reduced motion", () => {
    const observer = vi.fn();
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: true }));
    vi.stubGlobal("IntersectionObserver", observer);
    render(<Reveal><p>Reduced motion story</p></Reveal>);
    expect(screen.getByText("Reduced motion story").parentElement).toHaveAttribute("data-visible", "true");
    expect(observer).not.toHaveBeenCalled();
  });
});
