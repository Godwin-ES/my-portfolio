import type { ProjectFact } from "@/lib/project-types";
export function ProjectFacts({ facts }: { facts: ProjectFact[] }) {
  const visible = facts.filter(({ value, label }) => value.trim() && label.trim());
  if (!visible.length) return null;
  return <dl className="project-facts">{visible.map((fact, index) => <div key={`${fact.value}-${fact.label}`} data-fact-index={index}><dt>{fact.value}</dt><dd>{fact.label}</dd></div>)}</dl>;
}
