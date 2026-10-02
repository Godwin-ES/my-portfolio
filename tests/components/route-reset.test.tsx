import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RouteReset } from "@/components/navigation/route-reset";

let pathname = "/";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

describe("RouteReset", () => {
  beforeEach(() => {
    pathname = "/";
    window.history.replaceState({}, "", "/");
    vi.stubGlobal("scrollTo", vi.fn());
    document.body.innerHTML = '<main id="main-content" tabindex="-1"></main>';
  });

  it("resets forward pathname changes but preserves hash and history restoration", () => {
    const { rerender } = render(<RouteReset />);
    expect(window.scrollTo).not.toHaveBeenCalled();

    pathname = "/work/relaydesk";
    rerender(<RouteReset />);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "instant" });

    vi.mocked(window.scrollTo).mockClear();
    window.history.replaceState({}, "", "/work/relaydesk#architecture");
    rerender(<RouteReset />);
    expect(window.scrollTo).not.toHaveBeenCalled();

    window.dispatchEvent(new PopStateEvent("popstate"));
    pathname = "/";
    window.history.replaceState({}, "", "/");
    rerender(<RouteReset />);
    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
