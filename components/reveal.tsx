"use client";

import { type HTMLAttributes, type ReactNode, useCallback, useRef } from "react";

export type RevealVariant = "rise" | "editorial" | "lateral" | "cascade" | "resolve";

type RevealProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  as?: "div" | "section" | "article";
  delayMs?: number;
  variant?: RevealVariant;
  once?: boolean;
  children: ReactNode;
};

export function Reveal({ as = "div", id, className, delayMs = 0, variant = "rise", once = true, children, ...rest }: RevealProps) {
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
      const visible = entries.some((entry) => entry.isIntersecting);
      node.dataset.visible = String(visible);
      if (visible && once) observer.disconnect();
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
    observer.observe(node);
    observerRef.current = observer;
  }, [once]);

  const Tag = as;
  return <Tag {...rest} ref={setNode} id={id} className={["reveal", className].filter(Boolean).join(" ")} data-reveal={variant} data-enhanced="false" data-visible="true" style={{ ...rest.style, "--reveal-delay": `${delayMs}ms` } as React.CSSProperties}>{children}</Tag>;
}
