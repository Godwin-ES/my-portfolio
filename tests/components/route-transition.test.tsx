import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RouteTransitionProvider, TransitionLink, shouldAnimateNavigation } from "@/components/navigation/route-transition";

const navigation = vi.hoisted(() => ({ pathname: "/", push: vi.fn() }));

vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
  useRouter: () => ({ push: navigation.push }),
}));
vi.mock("@/components/motion/motion-provider", () => ({
  useMotionPreferences: () => ({ ready: true, reducedMotion: false, finePointer: true }),
}));

describe("route transitions", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    navigation.pathname = "/";
    navigation.push.mockReset();
  });
  afterEach(() => vi.useRealTimers());

  it("covers briefly, navigates, then reveals the destination", () => {
    const { rerender } = render(<RouteTransitionProvider><TransitionLink href="/work/relaydesk">RelayDesk</TransitionLink></RouteTransitionProvider>);
    fireEvent.click(screen.getByRole("link", { name: "RelayDesk" }));
    expect(screen.getByTestId("route-transition")).toHaveAttribute("data-phase", "covering");
    expect(navigation.push).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(420));
    expect(navigation.push).toHaveBeenCalledWith("/work/relaydesk");

    navigation.pathname = "/work/relaydesk";
    rerender(<RouteTransitionProvider><TransitionLink href="/work/relaydesk">RelayDesk</TransitionLink></RouteTransitionProvider>);
    expect(screen.getByTestId("route-transition")).toHaveAttribute("data-phase", "revealing");
    act(() => vi.advanceTimersByTime(620));
    expect(screen.getByTestId("route-transition")).toHaveAttribute("data-phase", "idle");
  });

  it("animates only an unmodified internal route", () => {
    const base = { href: "/work/relaydesk", button: 0, modified: false, target: undefined, download: false, reducedMotion: false };
    expect(shouldAnimateNavigation(base)).toBe(true);
    expect(shouldAnimateNavigation({ ...base, href: "#work" })).toBe(false);
    expect(shouldAnimateNavigation({ ...base, href: "https://example.com" })).toBe(false);
    expect(shouldAnimateNavigation({ ...base, button: 1 })).toBe(false);
    expect(shouldAnimateNavigation({ ...base, modified: true })).toBe(false);
    expect(shouldAnimateNavigation({ ...base, target: "_blank" })).toBe(false);
    expect(shouldAnimateNavigation({ ...base, download: true })).toBe(false);
    expect(shouldAnimateNavigation({ ...base, reducedMotion: true })).toBe(false);
  });
});
