import { CollectionGateway } from "@/components/collection-gateway";
import { SplitHeading } from "@/components/motion/split-heading";
import { getCollectionProjects } from "@/lib/projects";
import { workCollections } from "@/lib/work-collections";

export function WorkGateways() {
  return (
    <section id="collections" className="section disciplines" aria-labelledby="work-gateways-title">
      <div className="container">
        <header className="section-head">
          <p className="section-index"><span>02</span>Complete body of work</p>
          <SplitHeading id="work-gateways-title" parts={["Two disciplines.", { em: "One way of thinking." }]} />
          <p className="section-lede">Choose a collection to explore the complete systems, walkthroughs, architecture, and engineering decisions behind the work.</p>
        </header>
        <div className="discipline-split">
          {workCollections.map((collection) => (
            <CollectionGateway
              key={collection.id}
              collection={collection}
              projectTitles={getCollectionProjects(collection.id).map(({ title }) => title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
