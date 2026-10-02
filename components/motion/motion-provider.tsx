"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { AmbientField } from "@/components/motion/ambient-field";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";

type MotionPreferences = { reducedMotion: boolean; finePointer: boolean; ready: boolean };

const DEFAULT_PREFERENCES: MotionPreferences = { reducedMotion: false, finePointer: false, ready: false };
const MotionPreferencesContext = createContext<MotionPreferences>(DEFAULT_PREFERENCES);

export function useMotionPreferences() {
  return useContext(MotionPreferencesContext);
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      setPreferences({ reducedMotion: true, finePointer: false, ready: true });
      return;
    }

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const update = () => setPreferences({
      reducedMotion: reducedQuery.matches,
      finePointer: pointerQuery.matches,
      ready: true,
    });

    update();
    reducedQuery.addEventListener("change", update);
    pointerQuery.addEventListener("change", update);
    return () => {
      reducedQuery.removeEventListener("change", update);
      pointerQuery.removeEventListener("change", update);
    };
  }, []);

  const smoothScroll = preferences.ready && preferences.finePointer && !preferences.reducedMotion;

  useEffect(() => {
    if (!smoothScroll) return;
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    const update = (time: number) => lenis.raf(time * 1000);
    const updateScrollTrigger = () => ScrollTrigger.update();
    const handleVisibility = () => {
      if (document.hidden) return gsap.ticker.sleep();
      gsap.ticker.wake();
      ScrollTrigger.refresh();
    };

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(update);
      gsap.ticker.wake();
    };
  }, [smoothScroll]);

  const contextValue = useMemo(() => preferences, [preferences]);

  return (
    <MotionPreferencesContext.Provider value={contextValue}>
      {smoothScroll ? <ReactLenis ref={lenisRef} root options={{ autoRaf: false, smoothWheel: true, lerp: 0.105, anchors: true }} /> : null}
      <AmbientField />
      {children}
    </MotionPreferencesContext.Provider>
  );
}
