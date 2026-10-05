"use client";

import { ArrowUpRight, Check, Copy, Github, Mail } from "lucide-react";
import { useState } from "react";
import { ExternalLink } from "@/components/external-link";
import { Magnetic } from "@/components/motion/magnetic";
import { SplitHeading } from "@/components/motion/split-heading";
import { site } from "@/content/site";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact-aura" aria-hidden="true" />
      <div className="container contact-inner">
        <p className="section-index"><span>06</span>Contact</p>
        <SplitHeading id="contact-title" className="contact-title" parts={["Have an AI product or workflow that needs to", { em: "work reliably" }, "in the real world?"]} />
        <div className="contact-actions">
          <Magnetic strength={0.4}>
            <a className="contact-orb" href={`mailto:${site.email}`} aria-label="Email me" data-cursor="Say hi">
              <Mail aria-hidden="true" size={22} /><span>Email me</span>
            </a>
          </Magnetic>
          <div className="contact-details">
            <button type="button" className="contact-email" onClick={copy} aria-label={copied ? "Email address copied" : `Copy email address ${site.email}`}>
              <span>{site.email}</span>{copied ? <Check aria-hidden="true" size={17} /> : <Copy aria-hidden="true" size={17} />}
              <small aria-live="polite">{copied ? "Copied" : "Copy"}</small>
            </button>
            <div className="contact-links">
              <ExternalLink className="button button-ghost" href={site.githubUrl}><Github aria-hidden="true" size={17} /> GitHub</ExternalLink>
              <a className="text-link" href={site.resumeUrl} target="_blank" rel="noreferrer">View résumé <ArrowUpRight aria-hidden="true" size={15} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
