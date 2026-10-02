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
    <section id="practice" className="section practice-section journey-chapter" aria-labelledby="practice-title">
      <div className="container practice-layout">
        <div className="practice-intro">
          <p className="eyebrow">Engineering practice</p>
          <h2 id="practice-title">The model is never the whole system.</h2>
          <p>The work is usually decided by what surrounds it: action boundaries, durable state, evidence, recovery paths, and an interface that makes the system legible.</p>
        </div>
        <div className="practice-list">
          {principles.map((principle, index) => (
            <article className="practice-item" data-testid="practice-item" key={principle.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{principle.title}</h3><p>{principle.example}</p><small>{principle.evidence}</small></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
