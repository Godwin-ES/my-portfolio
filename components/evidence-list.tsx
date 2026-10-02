import { FileCheck2, Github, Image as ImageIcon, Play, TestTube2 } from "lucide-react";
import { ExternalLink } from "@/components/external-link";
import type { EvidenceItem } from "@/lib/project-types";

const iconMap = {
  github: Github,
  demo: Play,
  screenshot: ImageIcon,
  test: TestTube2,
  document: FileCheck2,
};

const kindLabel = { github: "Source code", demo: "Product proof", screenshot: "Interface", test: "Quality", document: "Documentation" };

export function EvidenceList({ items }: { items: EvidenceItem[] }) {
  return (
    <div className="evidence-list">
      {items.map((item, index) => {
        const Icon = iconMap[item.kind];
        const content = (
          <>
            <span className="evidence-icon"><Icon aria-hidden="true" size={18} strokeWidth={1.7} /></span>
            <span className="evidence-copy"><span className="evidence-kind">{kindLabel[item.kind]}</span><strong>{item.label}</strong><small>{item.description}</small></span>
          </>
        );
        return item.url ? (
          <ExternalLink className="evidence-item is-link" href={item.url} key={`${item.label}-${index}`} data-evidence-index={index}>{content}</ExternalLink>
        ) : (
          <div className="evidence-item" key={`${item.label}-${index}`} data-evidence-index={index}>{content}</div>
        );
      })}
    </div>
  );
}
