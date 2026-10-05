"use client";

import { Fragment, useRef, type ElementType } from "react";
import { useMotionPreferences } from "@/components/motion/motion-provider";
import { gsap, useGSAP } from "@/lib/motion/gsap";

/** Text whose words brighten one by one as the reader scrolls through it. */
export function ScrollWords({ text, as: Tag = "p", className }: { text: string; as?: ElementType; className?: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const { ready, reducedMotion } = useMotionPreferences();

  useGSAP(() => {
    const root = rootRef.current;
    if (!root || !ready || reducedMotion || typeof window.matchMedia !== "function") return;
    gsap.fromTo(root.querySelectorAll(".scroll-word"), { opacity: 0.16 }, {
      opacity: 1,
      ease: "none",
      stagger: 0.08,
      scrollTrigger: { trigger: root, start: "top 82%", end: "bottom 52%", scrub: 0.6 },
    });
  }, { scope: rootRef, dependencies: [ready, reducedMotion], revertOnUpdate: true });

  const words = text.split(/\s+/).filter(Boolean);
  return (
    <Tag ref={rootRef} className={["scroll-words", className].filter(Boolean).join(" ")}>
      {words.map((word, index) => <Fragment key={index}><span className="scroll-word">{word}</span>{index < words.length - 1 ? " " : null}</Fragment>)}
    </Tag>
  );
}
