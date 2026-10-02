export type Discipline = "automation" | "engineering";
export type HeroPhase = "typing" | "holding" | "deleting" | "settled";

export type HeroReplayInput = {
  direction: number;
  visibility: number;
  hasDeparted: boolean;
  running: boolean;
  now: number;
  lastPlayedAt: number;
};

export function shouldReplayHero({ direction, visibility, hasDeparted, running, now, lastPlayedAt }: HeroReplayInput) {
  return direction < 0 && visibility >= 0.6 && hasDeparted && !running && now - lastPlayedAt >= 5_000;
}
