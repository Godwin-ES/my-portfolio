import { afterEach, describe, expect, it, vi } from "vitest";
import { getLoomMeta, LOOM_FALLBACK } from "@/lib/loom";

describe("getLoomMeta", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("normalizes valid oEmbed metadata", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ thumbnail_url: "https://cdn.example/thumb.jpg", width: 1280, height: 720 }),
    }));
    await expect(getLoomMeta("abc123")).resolves.toEqual({
      thumbnailUrl: "https://cdn.example/thumb.jpg",
      previewUrl: null,
      width: 1280,
      height: 720,
    });
  });

  it.each([
    ["failed response", vi.fn().mockResolvedValue({ ok: false })],
    ["network failure", vi.fn().mockRejectedValue(new Error("offline"))],
    ["invalid payload", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ width: 0 }) })],
  ])("uses a deterministic fallback for %s", async (_label, fetchMock) => {
    vi.stubGlobal("fetch", fetchMock);
    await expect(getLoomMeta("abc123")).resolves.toEqual(LOOM_FALLBACK);
  });
});
