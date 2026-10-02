"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { AmbientField } from "@/components/motion/ambient-field";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";

type MotionPreferences = { reducedMotion: boolean; finePointer: boolean; ready: boolean };

const DEFAULT_PREFERENCES: MotionPreferences = { reducedMotion: false, finePointer: false, ready: false };
const MotionPreferencesContext = createContext<MotionPreferences>(DEFAULT_PREFERENCES);

export function useMotionPreferences() {
  return useContext(MotionPreferencesContext);
}

function LenisScrollSync() {
  const lenis = useLenis(() => ScrollTrigger.update(), []);

  useEffect(() => {
    if (!lenis) return;
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return null;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      const fallbackTimer = window.setTimeout(() => setPreferences({ reducedMotion: true, finePointer: false, ready: true }), 0);
      return () => window.clearTimeout(fallbackTimer);
    }

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const update = () => setPreferences({
      reducedMotion: reducedQuery.matches,
      finePointer: pointerQuery.matches,
      ready: true,
    });

    const initialTimer = window.setTimeout(update, 0);
    reducedQuery.addEventListener("change", update);
    pointerQuery.addEventListener("change", update);
    return () => {
      window.clearTimeout(initialTimer);
      reducedQuery.removeEventListener("change", update);
      pointerQuery.removeEventListener("change", update);
    };
  }, []);

  const smoothScroll = preferences.ready && preferences.finePointer && !preferences.reducedMotion;

  useEffect(() => {
    if (!smoothScroll) return;
    const handleVisibility = () => {
      if (document.hidden) return gsap.ticker.sleep();
      gsap.ticker.wake();
      ScrollTrigger.refresh();
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      gsap.ticker.wake();
    };
  }, [smoothScroll]);

  const contextValue = useMemo(() => preferences, [preferences]);

  return (
    <MotionPreferencesContext.Provider value={contextValue}>
      {smoothScroll ? <><ReactLenis root options={{ autoRaf: false, smoothWheel: true, lerp: 0.105, anchors: true }} /><LenisScrollSync /></> : null}
      <AmbientField />
      {children}
    </MotionPreferencesContext.Provider>
  );
}
