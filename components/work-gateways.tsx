import { CollectionGateway } from "@/components/collection-gateway";
import { Reveal } from "@/components/reveal";
import { getCollectionProjects } from "@/lib/projects";
import { workCollections } from "@/lib/work-collections";

export function WorkGateways() {
  return (
    <section id="collections" className="section work-gateways-section" aria-labelledby="work-gateways-title">
      <div className="container">
        <Reveal className="gateway-heading" variant="editorial">
          <p className="eyebrow">Complete body of work</p>
          <h2 id="work-gateways-title">Two disciplines.<br />One way of thinking.</h2>
          <p>Choose a collection to explore the complete systems, walkthroughs, architecture, and engineering decisions behind the work.</p>
        </Reveal>
        <Reveal className="work-gateways-grid" variant="cascade">
          {workCollections.map((collection) => (
            <CollectionGateway
              key={collection.id}
              collection={collection}
              projectTitles={getCollectionProjects(collection.id).map(({ title }) => title)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
