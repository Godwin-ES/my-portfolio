import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { ExternalLink } from "@/components/external-link";
import { LocalTime } from "@/components/local-time";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-row">
          <div className="footer-id"><strong>{site.name}</strong><span>Software Engineer · AI Systems · Automation</span></div>
          <LocalTime className="footer-time" />
          <nav className="footer-links" aria-label="Footer">
            <a href={`mailto:${site.email}`}>Email</a>
            <ExternalLink href={site.githubUrl}>GitHub</ExternalLink>
            <a href={site.resumeUrl} target="_blank" rel="noreferrer">Résumé</a>
            <Link href="/#top" className="footer-top">Back to top <ArrowUp aria-hidden="true" size={14} /></Link>
          </nav>
        </div>
        <p className="footer-wordmark" aria-hidden="true"><span>Godwin</span> <em>Ekanem</em></p>
        <p className="footer-legal">© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}
