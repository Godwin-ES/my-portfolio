import { describe, expect, it } from "vitest";
import { shouldReplayHero } from "@/lib/motion/hero-sequence";

const eligible = {
  direction: -1,
  visibility: 0.6,
  hasDeparted: true,
  running: false,
  now: 10_000,
  lastPlayedAt: 5_000,
};

describe("shouldReplayHero", () => {
  it("replays only after a deliberate upward return", () => {
    expect(shouldReplayHero(eligible)).toBe(true);
    expect(shouldReplayHero({ ...eligible, direction: 1 })).toBe(false);
    expect(shouldReplayHero({ ...eligible, visibility: 0.59 })).toBe(false);
    expect(shouldReplayHero({ ...eligible, hasDeparted: false })).toBe(false);
    expect(shouldReplayHero({ ...eligible, running: true })).toBe(false);
    expect(shouldReplayHero({ ...eligible, now: 9_999 })).toBe(false);
  });
});
