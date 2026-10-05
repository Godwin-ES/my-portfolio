"use client";

import { Fragment, useCallback, useRef, type ElementType } from "react";

export type HeadingPart = string | { em: string };

type SplitHeadingProps = {
  as?: ElementType;
  id?: string;
  className?: string;
  parts: HeadingPart[];
};

/** A heading whose words rise out of line masks when it scrolls into view. Text stays in the DOM for assistive tech. */
export function SplitHeading({ as: Tag = "h2", id, className, parts }: SplitHeadingProps) {
  const observer = useRef<IntersectionObserver | null>(null);
  const setNode = useCallback((node: HTMLElement | null) => {
    observer.current?.disconnect();
    observer.current = null;
    if (!node || typeof IntersectionObserver === "undefined") return;
    if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    node.dataset.visible = "false";
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      node.dataset.visible = "true";
      io.disconnect();
    }, { rootMargin: "0px 0px -10%" });
    io.observe(node);
    observer.current = io;
  }, []);

  let index = 0;
  return (
    <Tag ref={setNode} id={id} className={["split-heading", className].filter(Boolean).join(" ")} data-visible="true">
      {parts.map((part, partIndex) => {
        const emphasis = typeof part !== "string";
        const words = (emphasis ? part.em : part).split(/\s+/).filter(Boolean);
        const content = words.map((word, wordIndex) => (
          <Fragment key={`${partIndex}-${wordIndex}`}>
            <span className="split-word"><span style={{ "--i": index++ } as React.CSSProperties}>{word}</span></span>
            {wordIndex < words.length - 1 || partIndex < parts.length - 1 ? " " : null}
          </Fragment>
        ));
        return emphasis ? <em key={partIndex}>{content}</em> : <Fragment key={partIndex}>{content}</Fragment>;
      })}
    </Tag>
  );
}
