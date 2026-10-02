import { Reveal } from "@/components/reveal";

const principles = [
  {
    title: "Make AI boundaries explicit.",
    example: "RelayDesk can act only through seven purpose-built support tools; unsupported requests follow a defined escalation path.",
    evidence: "RelayDesk · MCP · Voice AI",
  },
  {
    title: "Preserve state and evidence.",
    example: "LeadLens stores sources, confidence, run state, and approvals so research remains inspectable after the agent finishes.",
    evidence: "LeadLens · Supabase · Claude Agent SDK",
  },
  {
    title: "Design failure paths deliberately.",
    example: "ChatDocs coordinates file, vector, and metadata lifecycles instead of leaving stale knowledge behind when documents change.",
    evidence: "ChatDocs · GCS · Pinecone · MongoDB",
  },
  {
    title: "Build the interface as part of the system.",
    example: "EchoRun pairs its real-time voice pipeline with visible session and tool state, making agent behaviour legible to the person using it.",
    evidence: "EchoRun · Next.js · LiveKit · Agno",
  },
] as const;

export function EngineeringPractice() {
  return (
    <section className="section practice-section" aria-labelledby="practice-title">
      <div className="container practice-layout">
        <Reveal className="practice-intro" variant="editorial">
          <p className="eyebrow">Engineering practice</p>
          <h2 id="practice-title">The details that turn AI capability into dependable software.</h2>
          <p>Models are only one part of the system. I design the boundaries, state, failure behaviour, and interface around them with equal care.</p>
        </Reveal>
        <Reveal className="practice-list" variant="cascade">
          {principles.map((principle, index) => (
            <article className="practice-item" data-testid="practice-item" key={principle.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{principle.title}</h3><p>{principle.example}</p><small>{principle.evidence}</small></div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
