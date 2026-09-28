export type ArchitectureNode = {
  id: string;
  label: string;
  detail?: string;
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

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  featured: boolean;
  featuredOrder?: number;
  automationOrder?: number;
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
  };
  engineeringDecisions: Decision[];
  reliability: ReliabilityItem[];
  result: string;
  evidence: EvidenceItem[];
};
