export type LoomMeta = {
  thumbnailUrl: string | null;
  previewUrl: string | null;
  width: number;
  height: number;
};

export const LOOM_FALLBACK: LoomMeta = { thumbnailUrl: null, previewUrl: null, width: 16, height: 9 };

export async function getLoomMeta(loomId: string): Promise<LoomMeta> {
  try {
    const response = await fetch(`https://www.loom.com/v1/oembed?url=https://www.loom.com/share/${encodeURIComponent(loomId)}`, { cache: "force-cache" });
    if (!response.ok) return LOOM_FALLBACK;
    const payload = (await response.json()) as Record<string, unknown>;
    if (typeof payload.thumbnail_url !== "string" || !payload.thumbnail_url.startsWith("https://") || typeof payload.width !== "number" || typeof payload.height !== "number" || payload.width <= 0 || payload.height <= 0) return LOOM_FALLBACK;
    return { thumbnailUrl: payload.thumbnail_url, previewUrl: null, width: payload.width, height: payload.height };
  } catch {
    return LOOM_FALLBACK;
  }
}
