"use client";

import { useEffect, useRef } from "react";
import { useMotionPreferences } from "@/components/motion/motion-provider";

const INTERACTIVE = "a, button, [data-cursor]";

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const { finePointer, ready, reducedMotion } = useMotionPreferences();
  const enabled = ready && finePointer && !reducedMotion;

  useEffect(() => {
    const ring = ringRef.current;
    if (!enabled || !ring) return;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let frame = 0;
    let visible = false;

    const tick = () => {
      current.x += (target.x - current.x) * 0.2;
      current.y += (target.y - current.y) * 0.2;
      ring.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      frame = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX;
      target.y = event.clientY;
      if (!visible) { visible = true; current.x = target.x; current.y = target.y; ring.dataset.visible = "true"; }
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onOver = (event: PointerEvent) => {
      const element = (event.target as Element | null)?.closest?.(INTERACTIVE);
      const label = element?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
      ring.dataset.state = element ? (label ? "label" : "hover") : "idle";
      ring.querySelector("span")!.textContent = label ?? "";
    };
    const onLeave = () => { visible = false; ring.dataset.visible = "false"; };
    const onDown = () => ring.dataset.pressed = "true";
    const onUp = () => ring.dataset.pressed = "false";

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={ringRef} className="cursor-ring" data-state="idle" data-visible="false" aria-hidden="true"><span /></div>;
}
