export type ArchitectureNode = {
  id: string;
  label: string;
  detail?: string;
  layer?: string;
};

export type ArchitectureEdge = {
  from: string;
  to: string;
  label?: string;
};

export type Decision = {
  title: string;
  detail: string;
};

export type ReliabilityItem = {
  title: string;
  detail: string;
};

export type EvidenceItem = {
  kind: "github" | "demo" | "screenshot" | "test" | "document";
  label: string;
  description: string;
  url?: string;
};

export type ProjectCollection = "ai-automation" | "ai-engineering";

export type ProjectStatus = "live" | "complete" | "limited" | "private" | "in-development" | "archived";

export type ProjectMedia =
  | { kind: "loom"; status: "available"; loomId: string; durationLabel: string; poster?: string }
  | { kind: "loom"; status: "pending-link"; durationLabel?: string; poster?: string }
  | { kind: "loom"; status: "coming-soon"; poster?: string }
  | { kind: "image"; src: string; alt: string }
  | { kind: "architecture" };

export type ProjectLink = {
  kind: "live" | "repository";
  label: string;
  url: string;
};

export type ProjectFact = {
  value: string;
  label: string;
};

export type ProjectFlowStep = {
  label: string;
  detail?: string;
};

export type ProjectAccessInfo = {
  notice?: string;
  credentials?: { email: string; password: string };
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  featured: boolean;
  featuredOrder?: number;
  automationOrder?: number;
  collections: ProjectCollection[];
  status: ProjectStatus;
  media: ProjectMedia;
  links: ProjectLink[];
  facts: ProjectFact[];
  flow: ProjectFlowStep[];
  access?: ProjectAccessInfo;
  stack: string[];
  githubUrl?: string;
  secondaryGithubUrl?: string;
  liveUrl?: string;
  heroImage?: string;
  heroAlt?: string;
  problem: string;
  system: string;
  architecture: {
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
    previewNodeIds?: string[];
  };
  engineeringDecisions: Decision[];
  reliability: ReliabilityItem[];
  result: string;
  evidence: EvidenceItem[];
};
