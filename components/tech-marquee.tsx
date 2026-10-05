"use client";

import { useRef } from "react";
import { useMotionPreferences } from "@/components/motion/motion-provider";
import { marquee } from "@/content/toolkit";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";

/** An endless technology band that accelerates and leans with scroll velocity. */
export function TechMarquee() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ready, reducedMotion } = useMotionPreferences();

  useGSAP(() => {
    const root = rootRef.current;
    if (!root || !ready || reducedMotion || typeof window.matchMedia !== "function") return;
    const track = root.querySelector<HTMLElement>(".marquee-track");
    if (!track) return;
    const loop = gsap.to(track, { xPercent: -50, ease: "none", duration: 38, repeat: -1 });
    const skew = gsap.quickTo(track, "skewX", { duration: 0.5, ease: "power3" });
    let settle: ReturnType<typeof setTimeout> | undefined;
    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onUpdate(self) {
        const velocity = self.getVelocity();
        const boost = gsap.utils.clamp(-5, 5, velocity / 320);
        gsap.to(loop, { timeScale: (self.direction < 0 ? -1 : 1) * (1 + Math.abs(boost)), duration: 0.25, overwrite: true });
        skew(gsap.utils.clamp(-7, 7, velocity / -260));
        clearTimeout(settle);
        settle = setTimeout(() => { skew(0); gsap.to(loop, { timeScale: self.direction < 0 ? -1 : 1, duration: 0.9 }); }, 140);
      },
    });
    return () => { clearTimeout(settle); trigger.kill(); loop.kill(); };
  }, { scope: rootRef, dependencies: [ready, reducedMotion], revertOnUpdate: true });

  const items = [...marquee, ...marquee];
  return (
    <div ref={rootRef} className="marquee" aria-label="Technologies I build with">
      <ul className="sr-only">{marquee.map((item) => <li key={item}>{item}</li>)}</ul>
      <div className="marquee-track" aria-hidden="true">
        {items.map((item, index) => <span key={`${item}-${index}`} className={index % 3 === 1 ? "is-outline" : undefined}>{item}<i>✦</i></span>)}
      </div>
    </div>
  );
}
