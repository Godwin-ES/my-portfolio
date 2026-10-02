"use client";

import type { RefObject } from "react";
import { useMotionPreferences } from "@/components/motion/motion-provider";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";

export function useDiagramSequence(container: RefObject<HTMLElement | null>, options: { once?: boolean } = {}) {
  const { ready, reducedMotion } = useMotionPreferences();
  const once = options.once ?? true;

  useGSAP(() => {
    const root = container.current;
    if (!root || !ready) return;

    const nodes = gsap.utils.toArray<HTMLElement>("[data-motion-node]", root);
    const connectors = gsap.utils.toArray<HTMLElement>("[data-motion-connector]", root);
    const labels = gsap.utils.toArray<HTMLElement>("[data-motion-label]", root);

    if (reducedMotion || typeof window.matchMedia !== "function") {
      gsap.set([...nodes, ...connectors, ...labels], { clearProps: "all" });
      root.dataset.motionComplete = "true";
      return;
    }

    const timeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } })
      .fromTo(labels, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: .34, stagger: .045 })
      .fromTo(nodes, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .5, stagger: .075 }, "<.06")
      .fromTo(connectors, { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" }, { autoAlpha: 1, clipPath: "inset(0 0% 0 0)", duration: .44, stagger: .045 }, "<.14")
      .to(root, { "--signal-progress": 1, duration: .58, onComplete: () => { root.dataset.motionComplete = "true"; } }, "<");

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top 82%",
      onEnter: () => timeline.play(0),
      onLeaveBack: () => { if (!once) timeline.reverse(); },
    });

    let active = true;
    document.fonts?.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => {
      active = false;
      trigger.kill();
      timeline.kill();
    };
  }, { scope: container, dependencies: [once, ready, reducedMotion], revertOnUpdate: true });
}
