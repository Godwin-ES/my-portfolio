"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useMotionPreferences } from "@/components/motion/motion-provider";

type AmbientStyle = CSSProperties & { "--pointer-x": string; "--pointer-y": string; "--page-progress": string };

export function AmbientField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const { finePointer, ready, reducedMotion } = useMotionPreferences();

  useEffect(() => {
    const field = fieldRef.current;
    if (!field || !ready || reducedMotion) return;

    let pointerX = 0;
    let pointerY = 0;
    let pageProgress = 0;
    let frame = 0;

    const render = () => {
      frame = 0;
      field.style.setProperty("--pointer-x", pointerX.toFixed(4));
      field.style.setProperty("--pointer-y", pointerY.toFixed(4));
      field.style.setProperty("--page-progress", pageProgress.toFixed(4));
    };
    const schedule = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(render);
    };
    const handlePointer = (event: PointerEvent) => {
      pointerX = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      pointerY = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
      schedule();
    };
    const handleScroll = () => {
      const travel = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      pageProgress = Math.min(Math.max(window.scrollY / travel, 0), 1);
      schedule();
    };

    if (finePointer) window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("scroll", handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [finePointer, ready, reducedMotion]);

  const style: AmbientStyle = { "--pointer-x": "0", "--pointer-y": "0", "--page-progress": "0" };
  return <div ref={fieldRef} className="ambient-field" style={style} aria-hidden="true" />;
}
