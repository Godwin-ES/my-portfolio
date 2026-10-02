"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

export function SiteHeader({ homePrefix = "" }: { homePrefix?: string }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", closeOnEscape); };
  }, [open]);

  useEffect(() => {
    if (homePrefix || typeof IntersectionObserver === "undefined") return;
    const targets = site.navigation.map(({ href }) => document.querySelector(href)).filter((target): target is Element => Boolean(target));
    if (!targets.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(`#${visible.target.id}`);
    }, { rootMargin: "-20% 0px -65%", threshold: [0, .15, .5] });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [homePrefix]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href={homePrefix ? `${homePrefix}#top` : "#top"} aria-label="Godwin Ekanem home">
          <span className="brand-mark">GE</span>
          <span>{site.name}</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {site.navigation.map((item) => (
            <a key={item.href} href={`${homePrefix}${item.href}`} aria-current={activeSection === item.href ? "location" : undefined}>{item.label}</a>
          ))}
          <a className="nav-resume" href={site.resumeUrl} target="_blank" rel="noreferrer">Résumé</a>
        </nav>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </div>

      <nav id="mobile-navigation" className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Mobile navigation" aria-hidden={!open}>
        <div className="container mobile-nav-inner">
          {site.navigation.map((item) => (
            <a key={item.href} href={`${homePrefix}${item.href}`} aria-current={activeSection === item.href ? "location" : undefined} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <a href={site.resumeUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Résumé</a>
        </div>
      </nav>
    </header>
  );
}
