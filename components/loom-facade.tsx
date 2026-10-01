"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { LoomMeta } from "@/lib/loom";

export function LoomFacade({ loomId, title, durationLabel, meta }: { loomId: string; title: string; durationLabel: string; meta: LoomMeta }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="loom-facade" style={{ aspectRatio: `${meta.width} / ${meta.height}` }}>
      {playing ? <iframe src={`https://www.loom.com/embed/${encodeURIComponent(loomId)}?autoplay=1`} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /> : (
        <button className="loom-play" type="button" onClick={() => setPlaying(true)} style={meta.thumbnailUrl ? { backgroundImage: `linear-gradient(rgba(8,18,16,.2),rgba(8,18,16,.45)),url(${meta.thumbnailUrl})` } : undefined} aria-label={`Play ${title}`}>
          <span className="loom-play-icon"><Play aria-hidden="true" fill="currentColor" size={22} /></span><span>Watch walkthrough</span><small>{durationLabel}</small>
        </button>
      )}
    </div>
  );
}
