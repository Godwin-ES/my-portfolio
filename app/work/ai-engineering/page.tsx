import { WorkCollectionLayout } from "@/components/work-collection-layout";
import { buildCollectionMetadata } from "@/lib/metadata";
import { getCollectionProjects } from "@/lib/projects";
import { getWorkCollection } from "@/lib/work-collections";

const collection = getWorkCollection("ai-engineering")!;
export const metadata = buildCollectionMetadata(collection);

export default function AiEngineeringPage() {
  return <WorkCollectionLayout collection={collection} projects={getCollectionProjects(collection.id)} />;
}
