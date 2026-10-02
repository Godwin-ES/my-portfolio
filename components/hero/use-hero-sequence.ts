"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionPreferences } from "@/components/motion/motion-provider";
import { ScrollTrigger } from "@/lib/motion/gsap";
import { shouldReplayHero, type Discipline, type HeroPhase } from "@/lib/motion/hero-sequence";

const LABELS: Record<Discipline, string> = {
  automation: "AI Automation",
  engineering: "AI Engineering",
};

type SequenceState = { discipline: Discipline; displayText: string; phase: HeroPhase };

export function useHeroSequence() {
  const { ready, reducedMotion } = useMotionPreferences();
  const [state, setState] = useState<SequenceState>({ discipline: "automation", displayText: LABELS.automation, phase: "settled" });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const running = useRef(false);
  const hasDeparted = useRef(false);
  const lastPlayedAt = useRef(-Infinity);

  const cancel = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    running.current = false;
  }, []);

  const schedule = useCallback((callback: () => void, delay: number) => {
    timers.current.push(setTimeout(callback, delay));
  }, []);

  const play = useCallback(() => {
    cancel();
    running.current = true;
    hasDeparted.current = false;
    lastPlayedAt.current = performance.now();

    let at = 120;
    setState({ discipline: "automation", displayText: "", phase: "typing" });
    [...LABELS.automation].forEach((_, index) => {
      at += 58;
      schedule(() => setState({ discipline: "automation", displayText: LABELS.automation.slice(0, index + 1), phase: "typing" }), at);
    });
    at += 1_050;
    schedule(() => setState((current) => ({ ...current, phase: "holding" })), at);
    at += 430;
    [...LABELS.automation].forEach((_, index) => {
      at += 32;
      schedule(() => setState({ discipline: "automation", displayText: LABELS.automation.slice(0, LABELS.automation.length - index - 1), phase: "deleting" }), at);
    });
    at += 180;
    [...LABELS.engineering].forEach((_, index) => {
      at += 56;
      schedule(() => setState({ discipline: "engineering", displayText: LABELS.engineering.slice(0, index + 1), phase: "typing" }), at);
    });
    at += 620;
    schedule(() => {
      setState({ discipline: "engineering", displayText: LABELS.engineering, phase: "settled" });
      running.current = false;
      timers.current = [];
    }, at);
  }, [cancel, schedule]);

  const selectDiscipline = useCallback((discipline: Discipline) => {
    cancel();
    setState({ discipline, displayText: LABELS[discipline], phase: "settled" });
    lastPlayedAt.current = performance.now();
  }, [cancel]);

  useEffect(() => {
    if (!ready) return;
    if (reducedMotion) {
      cancel();
      setState({ discipline: "engineering", displayText: LABELS.engineering, phase: "settled" });
      return;
    }
    play();
    return cancel;
  }, [cancel, play, ready, reducedMotion]);

  useEffect(() => {
    if (!ready || reducedMotion) return;
    const hero = document.querySelector<HTMLElement>(".hero-section");
    if (!hero) return;

    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: "top bottom",
      end: "bottom top",
      onUpdate(self) {
        const bounds = hero.getBoundingClientRect();
        const visible = Math.max(0, Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 0));
        const visibility = visible / Math.max(Math.min(bounds.height, window.innerHeight), 1);
        if (visibility <= 0.08 && self.direction > 0) hasDeparted.current = true;
        if (shouldReplayHero({
          direction: self.direction,
          visibility,
          hasDeparted: hasDeparted.current,
          running: running.current,
          now: performance.now(),
          lastPlayedAt: lastPlayedAt.current,
        })) play();
      },
    });
    return () => trigger.kill();
  }, [play, ready, reducedMotion]);

  return { ...state, selectDiscipline };
}
