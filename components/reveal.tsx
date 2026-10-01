"use client";

import { createElement, type ElementType, type ReactNode, useEffect, useRef, useState } from "react";

export function Reveal({ as = "div", id, className, delayMs = 0, children }: { as?: ElementType; id?: string; className?: string; delayMs?: number; children: ReactNode }) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(true);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const reduced = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined" || !ref.current) return;
    setEnhanced(true);
    setVisible(false);
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return createElement(as, { ref, id, className: ["reveal", className].filter(Boolean).join(" "), "data-enhanced": enhanced, "data-visible": visible, style: { "--reveal-delay": `${delayMs}ms` } as React.CSSProperties }, children);
}
