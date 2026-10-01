import type { ProjectStatus as Status } from "@/lib/project-types";
const labels: Record<Status, string> = { live: "Live", complete: "Completed build", limited: "Limited demo", private: "Private build", "in-development": "In development", archived: "Archive" };
export function ProjectStatus({ status }: { status: Status }) { return <span className={`project-status project-status-${status}`}><i aria-hidden="true" />{labels[status]}</span>; }
