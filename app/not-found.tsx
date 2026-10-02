import { ArrowLeft } from "lucide-react";
import { TransitionLink } from "@/components/navigation/route-transition";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="container not-found-card">
        <p className="eyebrow">404 · Project not found</p>
        <h1>This case study isn’t available.</h1>
        <p>The project link may have changed, or the case study may not be part of the current portfolio.</p>
        <TransitionLink className="button button-primary" href="/#work"><ArrowLeft aria-hidden="true" size={16} /> Back to selected work</TransitionLink>
      </div>
    </main>
  );
}
