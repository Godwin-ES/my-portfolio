import { CollectionGateway } from "@/components/collection-gateway";
import { getCollectionProjects } from "@/lib/projects";
import { workCollections } from "@/lib/work-collections";

export function WorkGateways() {
  return (
    <section id="collections" className="section work-gateways-section journey-chapter" aria-labelledby="work-gateways-title">
      <div className="container">
        <div className="gateway-heading">
          <p className="eyebrow">Two practices</p>
          <h2 id="work-gateways-title">Different responsibilities.<br />Same systems mindset.</h2>
          <p>AI Engineering turns model capability into a product people can use. AI Automation turns operational inputs into controlled outcomes. Explore the work by the job the system is responsible for.</p>
        </div>
        <div className="work-gateways-grid">
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
