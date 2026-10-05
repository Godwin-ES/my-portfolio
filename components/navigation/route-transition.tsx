"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type ComponentProps, type MouseEvent, type ReactNode } from "react";
import { useMotionPreferences } from "@/components/motion/motion-provider";

type RoutePhase = "idle" | "covering" | "revealing";
type RouteTone = "default" | "automation" | "engineering";
type NavigationInput = { href: string; button: number; modified: boolean; target?: string; download: boolean; reducedMotion: boolean };

type RouteTransitionContextValue = {
  beginNavigation(href: string, tone: RouteTone): void;
  reducedMotion: boolean;
};

const RouteTransitionContext = createContext<RouteTransitionContextValue | null>(null);

export function shouldAnimateNavigation({ href, button, modified, target, download, reducedMotion }: NavigationInput) {
  return !reducedMotion
    && button === 0
    && !modified
    && !target
    && !download
    && href.startsWith("/")
    && !href.startsWith("//")
    && !href.includes("#");
}

export function RouteTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { ready, reducedMotion } = useMotionPreferences();
  const previousPathname = useRef(pathname);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const failsafeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseRef = useRef<RoutePhase>("idle");
  const [phase, setPhase] = useState<RoutePhase>("idle");
  const [tone, setTone] = useState<RouteTone>("default");

  const updatePhase = (next: RoutePhase) => {
    phaseRef.current = next;
    setPhase(next);
  };
  const clearTimers = () => {
    if (navigationTimer.current) clearTimeout(navigationTimer.current);
    if (revealTimer.current) clearTimeout(revealTimer.current);
    if (failsafeTimer.current) clearTimeout(failsafeTimer.current);
    navigationTimer.current = revealTimer.current = failsafeTimer.current = null;
  };

  const beginNavigation = (href: string, nextTone: RouteTone) => {
    clearTimers();
    setTone(nextTone);
    updatePhase("covering");
    navigationTimer.current = setTimeout(() => router.push(href), 420);
    failsafeTimer.current = setTimeout(() => updatePhase("idle"), 1_800);
  };

  useEffect(() => {
    if (pathname === previousPathname.current) return;
    previousPathname.current = pathname;
    if (phaseRef.current !== "covering") return;
    if (failsafeTimer.current) clearTimeout(failsafeTimer.current);
    updatePhase("revealing");
    revealTimer.current = setTimeout(() => updatePhase("idle"), 620);
  }, [pathname]);

  useEffect(() => clearTimers, []);

  return (
    <RouteTransitionContext.Provider value={{ beginNavigation, reducedMotion: !ready || reducedMotion }}>
      {children}
      <div className="route-transition" data-testid="route-transition" data-phase={phase} data-tone={tone} aria-hidden="true">
        <span /><i /><b>GODWIN EKANEM</b>
      </div>
    </RouteTransitionContext.Provider>
  );
}

export function TransitionLink({ tone = "default", onClick, ...props }: ComponentProps<typeof Link> & { tone?: RouteTone }) {
  const transition = useContext(RouteTransitionContext);
  const href = typeof props.href === "string" ? props.href : "";

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || !transition) return;
    const animate = shouldAnimateNavigation({
      href,
      button: event.button,
      modified: event.metaKey || event.ctrlKey || event.shiftKey || event.altKey,
      target: props.target,
      download: Boolean(props.download),
      reducedMotion: transition.reducedMotion,
    });
    if (!animate) return;
    event.preventDefault();
    transition.beginNavigation(href, tone);
  };

  return <Link {...props} onClick={handleClick} />;
}
