"use client";

import { useRef, useState, type PointerEvent } from "react";
import { Play } from "lucide-react";
import { useMotionPreferences } from "@/components/motion/motion-provider";
import type { LoomMeta } from "@/lib/loom";

export function LoomFacade({ loomId, title, durationLabel, meta }: { loomId: string; title: string; durationLabel: string; meta: LoomMeta }) {
  const [playing, setPlaying] = useState(false);
  const facadeRef = useRef<HTMLDivElement>(null);
  const { finePointer, reducedMotion } = useMotionPreferences();

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!finePointer || reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    facadeRef.current?.style.setProperty("--loom-x", `${x * -9}px`);
    facadeRef.current?.style.setProperty("--loom-y", `${y * -7}px`);
  };

  const resetPointer = () => {
    facadeRef.current?.style.setProperty("--loom-x", "0px");
    facadeRef.current?.style.setProperty("--loom-y", "0px");
  };

  return (
    <div ref={facadeRef} className="loom-facade" data-playing={playing} style={{ aspectRatio: `${meta.width} / ${meta.height}` }}>
      {playing ? (
        <iframe src={`https://www.loom.com/embed/${encodeURIComponent(loomId)}?autoplay=1`} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
      ) : (
        <button className="loom-play" type="button" onClick={() => setPlaying(true)} onPointerMove={handlePointerMove} onPointerLeave={resetPointer} aria-label={`Play ${title}`}>
          <span className="loom-poster" style={meta.thumbnailUrl ? { backgroundImage: `linear-gradient(180deg,rgba(8,18,16,.08),rgba(8,18,16,.66)),url(${meta.thumbnailUrl})` } : undefined} aria-hidden="true" />
          <span className="loom-topline"><i /> Video walkthrough <b>{durationLabel}</b></span>
          <span className="loom-play-control" aria-hidden="true"><span className="loom-play-icon"><Play fill="currentColor" size={21} /></span><small>Play walkthrough</small></span>
          <span className="loom-meta"><strong>{title}</strong><small>Product tour · architecture · decisions</small></span>
          <span className="loom-timeline" aria-hidden="true"><i /></span>
        </button>
      )}
    </div>
  );
}
