import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  showIcon?: boolean;
};

export function ExternalLink({ children, className, showIcon = true, ...props }: ExternalLinkProps) {
  return (
    <a className={cn("external-link", className)} target="_blank" rel="noreferrer" {...props}>
      <span>{children}</span>
      {showIcon ? <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} /> : null}
    </a>
  );
}
