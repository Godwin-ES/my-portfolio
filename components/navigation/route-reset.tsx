"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function RouteReset() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const isHistoryNavigation = useRef(false);

  useEffect(() => {
    const markHistoryNavigation = () => {
      isHistoryNavigation.current = window.location.pathname !== previousPathname.current;
    };

    window.addEventListener("popstate", markHistoryNavigation);
    return () => window.removeEventListener("popstate", markHistoryNavigation);
  }, []);

  useEffect(() => {
    if (pathname === previousPathname.current) return;

    previousPathname.current = pathname;

    if (isHistoryNavigation.current) {
      isHistoryNavigation.current = false;
      return;
    }

    if (window.location.hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.querySelector<HTMLElement>("#main-content")?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
