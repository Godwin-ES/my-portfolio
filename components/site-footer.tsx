import { ExternalLink } from "@/components/external-link";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div><strong>{site.name}</strong><span>Software Engineer · AI Systems · Automation</span></div>
        <div className="footer-links">
          <a href={`mailto:${site.email}`}>Email</a>
          <ExternalLink href={site.githubUrl}>GitHub</ExternalLink>
        </div>
      </div>
    </footer>
  );
}
