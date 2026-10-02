import type { ProjectCollection } from "@/lib/project-types";

export type WorkCollection = {
  id: ProjectCollection;
  title: string;
  eyebrow: string;
  description: string;
  projectSlugs: readonly string[];
  motif: "orchestration" | "product-layers";
};

export const workCollections: readonly WorkCollection[] = [
  {
    id: "ai-automation",
    title: "AI Automation",
    eyebrow: "Governed workflows",
    description: "Six systems that turn incoming documents, operational data, research, and live customer questions into reviewed, traceable outcomes.",
    projectSlugs: ["invoice-processing", "operations-reporting", "proposal-studio", "content-studio", "koya-lead-agent", "relaydesk"],
    motif: "orchestration",
  },
  {
    id: "ai-engineering",
    title: "AI Engineering",
    eyebrow: "Intelligent products",
    description: "Production-oriented software spanning real-time voice, grounded document intelligence, and accessible computer vision.",
    projectSlugs: ["voice-agent", "rag-app", "signbridge"],
    motif: "product-layers",
  },
] as const;

export function getWorkCollection(id: string) {
  return workCollections.find((collection) => collection.id === id);
}
