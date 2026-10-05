"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

export function SiteHeader({ homePrefix = "", activeItem }: { homePrefix?: string; activeItem?: string }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileNavRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", closeOnEscape); };
  }, [open]);

  useEffect(() => {
    if (homePrefix || activeItem || typeof IntersectionObserver === "undefined") return;
    const targets = site.navigation.map(({ href }) => document.querySelector(href)).filter((target): target is Element => Boolean(target));
    if (!targets.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(`#${visible.target.id}`);
    }, { rootMargin: "-20% 0px -65%", threshold: [0, .15, .5] });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [activeItem, homePrefix]);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 6) setHidden(y > lastY && y > 320);
      lastY = y;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  const currentItem = activeItem ?? activeSection;

  return (
    <header className="site-header" data-hidden={hidden && !open} data-scrolled={scrolled} data-open={open}>
      <div className="header-inner">
        <a className="brand" href={homePrefix ? `${homePrefix}#top` : "#top"} aria-label="Godwin Ekanem home">
          <span className="brand-mark" aria-hidden="true"><i />GE</span>
          <span className="brand-name">{site.name}</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {site.navigation.map((item) => (
            <a key={item.href} href={`${homePrefix}${item.href}`} aria-current={currentItem === item.href ? (homePrefix ? "page" : "location") : undefined}><span>{item.label}</span></a>
          ))}
        </nav>
        <a className="nav-resume" href={site.resumeUrl} target="_blank" rel="noreferrer"><span>Résumé</span></a>

        <button
          className="mobile-menu-button"
          ref={menuButtonRef}
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </div>

      <nav ref={mobileNavRef} id="mobile-navigation" className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Mobile navigation" aria-hidden={!open} inert={!open}>
        <div className="mobile-nav-inner">
          {site.navigation.map((item, index) => (
            <a key={item.href} style={{ "--i": index } as React.CSSProperties} href={`${homePrefix}${item.href}`} aria-current={currentItem === item.href ? (homePrefix ? "page" : "location") : undefined} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <a href={site.resumeUrl} target="_blank" rel="noreferrer" style={{ "--i": site.navigation.length } as React.CSSProperties} onClick={() => setOpen(false)}>Résumé</a>
          <p className="mobile-nav-foot">{site.email}</p>
        </div>
      </nav>
    </header>
  );
}
