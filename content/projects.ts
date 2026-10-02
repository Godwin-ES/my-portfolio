import part1 from "./projects/part-1.json";
import part2 from "./projects/part-2.json";
import part3 from "./projects/part-3.json";
import part4 from "./projects/part-4.json";
import part5 from "./projects/part-5.json";
import type { Project } from "@/lib/project-types";

const details: Record<string, Pick<Project, "title" | "collections" | "status" | "media" | "links" | "facts" | "flow" | "role" | "constraints"> & Partial<Pick<Project, "featured" | "featuredOrder">>> = {
  "voice-agent": {
    title: "EchoRun",
    collections: ["ai-engineering"],
    status: "live",
    media: { kind: "architecture" },
    links: [
      { kind: "live", label: "Open live app", url: "https://meet-nine-xi.vercel.app/" },
      { kind: "repository", label: "Agent repository", url: "https://github.com/Godwin-ES/agno_livekit_agent" },
      { kind: "repository", label: "Interface repository", url: "https://github.com/Godwin-ES/meet" },
    ],
    facts: [{ value: "Real-time", label: "streaming voice interaction" }, { value: "2", label: "coordinated repositories" }],
    flow: [{ label: "Join a room" }, { label: "Speak naturally" }, { label: "Transcribe" }, { label: "Reason and use tools" }, { label: "Stream a voice response" }],
    role: "Full-stack AI engineer across the agent integration, realtime runtime, and interaction surface.",
    constraints: "Low-latency audio, streamed providers, server-held credentials, and durable session context across two repositories.",
    featured: true,
    featuredOrder: 2,
  },
  "rag-app": {
    title: "ChatDocs",
    collections: ["ai-engineering"],
    status: "live",
    media: { kind: "architecture" },
    links: [
      { kind: "live", label: "Open live app", url: "https://rag-app-or7d.onrender.com/" },
      { kind: "repository", label: "Source repository", url: "https://github.com/Godwin-ES/ChatDocs" },
    ],
    facts: [{ value: "3", label: "isolated persistence layers" }, { value: "3", label: "supported document formats" }],
    flow: [{ label: "Authenticate" }, { label: "Upload documents" }, { label: "Index per user" }, { label: "Ask questions" }, { label: "Stream grounded answers" }],
    role: "Backend and AI engineer responsible for authentication, ingestion, retrieval, memory, and storage lifecycle.",
    constraints: "Strict user isolation across three persistence layers, durable cloud files, and coordinated deletion.",
    featured: true,
    featuredOrder: 4,
  },
  "koya-lead-agent": {
    title: "LeadLens",
    collections: ["ai-automation"],
    status: "live",
    media: { kind: "loom", status: "available", loomId: "0782a9f803264877a2f832000ee114bd", durationLabel: "4:44", poster: "https://cdn.loom.com/sessions/thumbnails/0782a9f803264877a2f832000ee114bd-be5ad2285fd76bd8.gif" },
    links: [
      { kind: "live", label: "Open live app", url: "https://koya-lead-agent-five.vercel.app" },
      { kind: "repository", label: "Source repository", url: "https://github.com/Godwin-ES/koya-lead-agent" },
    ],
    facts: [{ value: "Review-first", label: "human approval boundary" }, { value: "5", label: "controlled research stages" }],
    flow: [{ label: "Define objective" }, { label: "Discover companies" }, { label: "Research evidence" }, { label: "Qualify" }, { label: "Review drafts" }],
    role: "Full-stack agentic-systems engineer, from orchestration and data model to the review experience.",
    constraints: "Untrusted web content, long-running work, provider cost limits, uncertain evidence, and a mandatory human approval boundary.",
    featured: true,
    featuredOrder: 3,
  },
  "proposal-studio": {
    title: "ProposalFlow",
    collections: ["ai-automation"],
    status: "live",
    media: { kind: "loom", status: "available", loomId: "ec14befcc6464963ae2fd567bd26ac46", durationLabel: "4:34", poster: "https://cdn.loom.com/sessions/thumbnails/ec14befcc6464963ae2fd567bd26ac46-333222874213ecbd.gif" },
    links: [
      { kind: "live", label: "Open live app", url: "https://proposal-app-one-pi.vercel.app/" },
      { kind: "repository", label: "Source repository", url: "https://github.com/Godwin-ES/proposal-app" },
    ],
    facts: [{ value: "Immutable", label: "submitted proposal versions" }, { value: "Independent", label: "approval boundary" }],
    flow: [{ label: "Capture discovery" }, { label: "Generate proposal" }, { label: "Edit and version" }, { label: "Approve" }, { label: "Deliver PDF" }],
    role: "Full-stack workflow engineer across generation, versioning, approval, PDF output, and delivery.",
    constraints: "Immutable submitted content, independent approval, database-enforced transitions, and recoverable delivery state.",
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
    role: "AI product engineer responsible for the research-to-approval workflow and its evidence model.",
    constraints: "Source provenance, version integrity, conflicting evidence, and an honest boundary before external publishing.",
    featured: false,
  },
  "operations-reporting": {
    title: "Operations Reporting & Decision Support",
    collections: ["ai-automation"],
    status: "live",
    media: { kind: "loom", status: "available", loomId: "07c77bb238b24bfa98a2531ad26c1555", durationLabel: "4:57", poster: "https://cdn.loom.com/sessions/thumbnails/07c77bb238b24bfa98a2531ad26c1555-91e73a4f0c4a796a.gif" },
    links: [
      { kind: "live", label: "Open live dashboard", url: "https://koya-dashboard.streamlit.app/" },
      { kind: "repository", label: "Dashboard repository", url: "https://github.com/Godwin-ES/koya-dashboard" },
    ],
    facts: [{ value: "3", label: "operational domains" }, { value: "Deterministic", label: "authoritative KPI calculations" }],
    flow: [{ label: "Ingest operations data" }, { label: "Validate inputs" }, { label: "Calculate KPIs" }, { label: "Generate interpretation" }, { label: "Review exact run" }],
    role: "Automation and data engineer across workflow processing, persistence, AI interpretation, and dashboard delivery.",
    constraints: "Deterministic KPI truth, incomplete source data, partial-run usefulness, and exact-run traceability.",
    featured: false,
  },
  "invoice-processing": {
    title: "Intelligent Invoice Processing",
    collections: ["ai-automation"],
    status: "limited",
    media: { kind: "loom", status: "available", loomId: "f31cca28a78f42ddacf22540273ae76c", durationLabel: "4:57", poster: "https://cdn.loom.com/sessions/thumbnails/f31cca28a78f42ddacf22540273ae76c-2d96ea7173e1ef4e.gif" },
    links: [],
    facts: [{ value: "5", label: "explicit exception paths" }, { value: "Stable", label: "duplicate detection key" }],
    flow: [{ label: "Receive email" }, { label: "Detect invoice" }, { label: "Extract fields" }, { label: "Validate and deduplicate" }, { label: "Register outcome" }],
    role: "Automation engineer responsible for ingestion, extraction, validation, exception handling, and audit output.",
    constraints: "Messy inbox inputs, duplicates, damaged or scanned PDFs, incomplete fields, and explicit non-invoice outcomes.",
    featured: false,
  },
  "signbridge": {
    title: "SignBridge", collections: ["ai-engineering"], status: "live", media: { kind: "architecture" },
    links: [{ kind: "live", label: "Open live app", url: "https://asl-project-ehmkxe7wmhhf3pg3uwcphg.streamlit.app/" }, { kind: "repository", label: "Source repository", url: "https://github.com/Godwin-ES/SignBridge" }],
    facts: [{ value: "A–Z", label: "gesture alphabet" }, { value: "Two-way", label: "communication experience" }],
    flow: [{ label: "Open camera" }, { label: "Detect hand gesture" }, { label: "Translate to text" }, { label: "Compose a response" }, { label: "Show signing guidance" }],
    role: "Computer-vision and product engineer across gesture recognition and the two-way interaction design.",
    constraints: "Variable camera conditions, an explicit supported vocabulary, confidence-aware feedback, and no claim to replace an interpreter.",
    featured: false,
  },
  "relaydesk": {
    title: "RelayDesk", collections: ["ai-automation"], status: "live", media: { kind: "loom", status: "coming-soon" },
    links: [{ kind: "live", label: "Try the live agent", url: "https://koya-support-agent.vercel.app" }, { kind: "repository", label: "Source repository", url: "https://github.com/Godwin-ES/koya-support-agent" }],
    facts: [{ value: "7", label: "constrained support tools" }, { value: "15/15", label: "evaluation scenarios" }, { value: "5 min", label: "session safety limit" }],
    flow: [{ label: "Start a secure call" }, { label: "Understand the issue" }, { label: "Use a support tool" }, { label: "Confirm the outcome" }, { label: "Escalate when needed" }],
    role: "Full-stack voice AI engineer across the web experience, realtime agent, tool layer, and evaluation suite.",
    constraints: "Conversational latency, sensitive payment actions, a five-minute cost ceiling, and explicit human escalation.",
    featured: true, featuredOrder: 1,
  },
};

const catalogue: Project[] = ([...part2, ...part1, ...part3, ...part4, ...part5] as unknown as Project[]).map((project): Project => {
  const merged = { ...project, ...details[project.slug] };
  const nodeIds = new Set(merged.architecture.nodes.map(({ id }) => id));
  return {
    ...merged,
    architecture: {
      ...merged.architecture,
      previewNodeIds: merged.architecture.previewNodeIds?.filter((id) => nodeIds.has(id)).slice(0, 4),
    },
  };
});

export const projects = [
  catalogue.find(({ slug }) => slug === "voice-agent"),
  catalogue.find(({ slug }) => slug === "rag-app"),
  catalogue.find(({ slug }) => slug === "signbridge"),
  ...catalogue.filter(({ slug }) => !["voice-agent", "rag-app", "signbridge"].includes(slug)),
].filter((project): project is Project => Boolean(project));
