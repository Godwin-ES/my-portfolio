"use client";

import { type ReactNode, useCallback, useRef } from "react";

export function Reveal({ as = "div", id, className, delayMs = 0, children }: { as?: "div" | "section" | "article"; id?: string; className?: string; delayMs?: number; children: ReactNode }) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const setNode = useCallback((node: HTMLElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;
    if (!node) return;
    const reduced = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") return;
    node.dataset.enhanced = "true";
    node.dataset.visible = "false";
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        node.dataset.visible = "true";
        observer.disconnect();
      }
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
    observer.observe(node);
    observerRef.current = observer;
  }, []);

  const Tag = as;
  return <Tag ref={setNode} id={id} className={["reveal", className].filter(Boolean).join(" ")} data-enhanced="false" data-visible="true" style={{ "--reveal-delay": `${delayMs}ms` } as React.CSSProperties}>{children}</Tag>;
}
