"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { useMotionPreferences } from "@/components/motion/motion-provider";

/** Pulls its child gently toward the pointer on fine-pointer devices. */
export function Magnetic({ children, strength = 0.32, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { finePointer, reducedMotion } = useMotionPreferences();

  const move = (event: PointerEvent<HTMLSpanElement>) => {
    if (!finePointer || reducedMotion || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * strength;
    const y = (event.clientY - bounds.top - bounds.height / 2) * strength;
    ref.current.style.setProperty("--mx", `${x}px`);
    ref.current.style.setProperty("--my", `${y}px`);
  };
  const reset = () => {
    ref.current?.style.setProperty("--mx", "0px");
    ref.current?.style.setProperty("--my", "0px");
  };

  return <span ref={ref} className={["magnetic", className].filter(Boolean).join(" ")} onPointerMove={move} onPointerLeave={reset}>{children}</span>;
}
