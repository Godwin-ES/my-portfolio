"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { site } from "@/content/site";

export function SiteHeader({ homePrefix = "" }: { homePrefix?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href={homePrefix || "#top"} aria-label="Godwin Ekanem home">
          <span className="brand-mark">GE</span>
          <span>{site.name}</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {site.navigation.map((item) => (
            <a key={item.href} href={`${homePrefix}${item.href}`}>{item.label}</a>
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
            <a key={item.href} href={`${homePrefix}${item.href}`} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <a href={site.resumeUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Résumé</a>
        </div>
      </nav>
    </header>
  );
}
