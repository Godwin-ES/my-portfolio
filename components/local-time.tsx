"use client";

import { useEffect, useState } from "react";

const formatter = typeof Intl !== "undefined" ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" }) : null;

export function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string>();

  useEffect(() => {
    if (!formatter) return;
    const update = () => setTime(formatter.format(new Date()));
    const first = window.setTimeout(update, 0);
    const timer = window.setInterval(update, 20_000);
    return () => { window.clearTimeout(first); window.clearInterval(timer); };
  }, []);

  return <span className={className}><i aria-hidden="true" />Abuja, Nigeria <time suppressHydrationWarning>{time ?? "--:--"}</time> WAT</span>;
}
