import { SplitHeading } from "@/components/motion/split-heading";
import { ScrollWords } from "@/components/motion/scroll-words";
import { Reveal } from "@/components/reveal";

const principles = [
  {
    title: "Make AI boundaries explicit.",
    example: "RelayDesk can act only through seven purpose-built support tools; unsupported requests follow a defined escalation path.",
    evidence: ["RelayDesk", "MCP", "Voice AI"],
  },
  {
    title: "Preserve state and evidence.",
    example: "LeadLens stores sources, confidence, run state, and approvals so research remains inspectable after the agent finishes.",
    evidence: ["LeadLens", "Supabase", "Claude Agent SDK"],
  },
  {
    title: "Design failure paths deliberately.",
    example: "ChatDocs coordinates file, vector, and metadata lifecycles instead of leaving stale knowledge behind when documents change.",
    evidence: ["ChatDocs", "GCS", "Pinecone", "MongoDB"],
  },
  {
    title: "Build the interface as part of the system.",
    example: "EchoRun pairs its real-time voice pipeline with visible session and tool state, making agent behaviour legible to the person using it.",
    evidence: ["EchoRun", "Next.js", "LiveKit", "Agno"],
  },
] as const;

export function EngineeringPractice() {
  return (
    <section className="section practice" aria-labelledby="practice-title">
      <div className="container practice-layout">
        <header className="practice-intro">
          <p className="section-index"><span>03</span>Engineering practice</p>
          <SplitHeading id="practice-title" parts={["The details that turn AI capability into", { em: "dependable software." }]} />
          <p className="section-lede">Models are only one part of the system. I design the boundaries, state, failure behaviour, and interface around them with equal care.</p>
        </header>
        <div className="practice-list">
          {principles.map((principle, index) => (
            <Reveal as="article" className="practice-item" data-testid="practice-item" key={principle.title} variant="rise">
              <span className="practice-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <ScrollWords as="h3" text={principle.title} />
              <p>{principle.example}</p>
              <ul aria-label="Evidence">{principle.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
