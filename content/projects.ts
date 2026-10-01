import part1 from "./projects/part-1.json";
import part2 from "./projects/part-2.json";
import part3 from "./projects/part-3.json";
import part4 from "./projects/part-4.json";
import part5 from "./projects/part-5.json";
import type { Project } from "@/lib/project-types";

const details: Record<string, Pick<Project, "title" | "collections" | "status" | "media" | "links" | "facts" | "flow"> & Partial<Pick<Project, "featured" | "featuredOrder">>> = {
  "voice-agent": {
    title: "EchoRun",
    collections: ["selected", "personal"],
    status: "live",
    media: { kind: "architecture" },
    links: [
      { kind: "live", label: "Open live app", url: "https://meet-nine-xi.vercel.app/" },
      { kind: "repository", label: "Agent repository", url: "https://github.com/Godwin-ES/agno_livekit_agent" },
      { kind: "repository", label: "Interface repository", url: "https://github.com/Godwin-ES/meet" },
    ],
    facts: [{ value: "Real-time", label: "streaming voice interaction" }, { value: "2", label: "coordinated repositories" }],
    flow: [{ label: "Join a room" }, { label: "Speak naturally" }, { label: "Transcribe" }, { label: "Reason and use tools" }, { label: "Stream a voice response" }],
    featured: true,
    featuredOrder: 1,
  },
  "rag-app": {
    title: "ChatDocs",
    collections: ["selected", "personal"],
    status: "live",
    media: { kind: "architecture" },
    links: [
      { kind: "live", label: "Open live app", url: "https://rag-app-or7d.onrender.com/" },
      { kind: "repository", label: "Source repository", url: "https://github.com/Godwin-ES/ChatDocs" },
    ],
    facts: [{ value: "3", label: "isolated persistence layers" }, { value: "3", label: "supported document formats" }],
    flow: [{ label: "Authenticate" }, { label: "Upload documents" }, { label: "Index per user" }, { label: "Ask questions" }, { label: "Stream grounded answers" }],
    featured: true,
    featuredOrder: 4,
  },
  "koya-lead-agent": {
    title: "LeadLens",
    collections: ["selected", "ai-automation"],
    status: "live",
    media: { kind: "loom", status: "pending-link" },
    links: [
      { kind: "live", label: "Open live app", url: "https://koya-lead-agent-five.vercel.app" },
      { kind: "repository", label: "Source repository", url: "https://github.com/Godwin-ES/koya-lead-agent" },
    ],
    facts: [{ value: "Review-first", label: "human approval boundary" }, { value: "5", label: "controlled research stages" }],
    flow: [{ label: "Define objective" }, { label: "Discover companies" }, { label: "Research evidence" }, { label: "Qualify" }, { label: "Review drafts" }],
    featured: true,
    featuredOrder: 5,
  },
  "proposal-studio": {
    title: "ProposalFlow",
    collections: ["ai-automation"],
    status: "live",
    media: { kind: "loom", status: "pending-link" },
    links: [
      { kind: "live", label: "Open live app", url: "https://proposal-app-one-pi.vercel.app/" },
      { kind: "repository", label: "Source repository", url: "https://github.com/Godwin-ES/proposal-app" },
    ],
    facts: [{ value: "Immutable", label: "submitted proposal versions" }, { value: "Independent", label: "approval boundary" }],
    flow: [{ label: "Capture discovery" }, { label: "Generate proposal" }, { label: "Edit and version" }, { label: "Approve" }, { label: "Deliver PDF" }],
    featured: false,
  },
  "content-studio": {
    title: "ContentStudio",
    collections: ["ai-automation"],
    status: "live",
    media: { kind: "loom", status: "pending-link" },
    links: [
      { kind: "live", label: "Open live app", url: "https://content-app-nine-fawn.vercel.app/" },
      { kind: "repository", label: "Source repository", url: "https://github.com/Godwin-ES/content-app" },
    ],
    facts: [{ value: "Versioned", label: "sources and content" }, { value: "3", label: "downstream content channels" }],
    flow: [{ label: "Research" }, { label: "Review sources" }, { label: "Plan and draft" }, { label: "Adapt channels" }, { label: "Approve package" }],
    featured: false,
  },
  "operations-reporting": {
    title: "Operations Reporting & Decision Support",
    collections: ["ai-automation"],
    status: "live",
    media: { kind: "loom", status: "pending-link" },
    links: [
      { kind: "live", label: "Open live dashboard", url: "https://koya-dashboard.streamlit.app/" },
      { kind: "repository", label: "Dashboard repository", url: "https://github.com/Godwin-ES/koya-dashboard" },
    ],
    facts: [{ value: "3", label: "operational domains" }, { value: "Deterministic", label: "authoritative KPI calculations" }],
    flow: [{ label: "Ingest operations data" }, { label: "Validate inputs" }, { label: "Calculate KPIs" }, { label: "Generate interpretation" }, { label: "Review exact run" }],
    featured: false,
  },
  "invoice-processing": {
    title: "Intelligent Invoice Processing",
    collections: ["ai-automation"],
    status: "limited",
    media: { kind: "loom", status: "pending-link" },
    links: [],
    facts: [{ value: "5", label: "explicit exception paths" }, { value: "Stable", label: "duplicate detection key" }],
    flow: [{ label: "Receive email" }, { label: "Detect invoice" }, { label: "Extract fields" }, { label: "Validate and deduplicate" }, { label: "Register outcome" }],
    featured: false,
  },
  "malaria-detection": {
    title: "Malaria Detection with CNNs",
    collections: ["applied-ml"],
    status: "archived",
    media: { kind: "architecture" },
    links: [{ kind: "repository", label: "Source repository", url: "https://github.com/Godwin-ES/Malaria-Detection-using-CNNs" }],
    facts: [{ value: "2-stage", label: "validation and classification" }],
    flow: [{ label: "Upload image" }, { label: "Validate cell image" }, { label: "Run malaria CNN" }, { label: "Return confidence" }],
    featured: false,
  },
};

const catalogue = ([...part2, ...part1, ...part3, ...part4, ...part5] as unknown as Project[]).map(
  (project) => ({ ...project, ...details[project.slug] }),
);

export const projects = [
  catalogue.find(({ slug }) => slug === "voice-agent"),
  catalogue.find(({ slug }) => slug === "rag-app"),
  catalogue.find(({ slug }) => slug === "signbridge"),
  ...catalogue.filter(({ slug }) => !["voice-agent", "rag-app", "signbridge"].includes(slug)),
].filter((project): project is Project => Boolean(project));
