import { ImageResponse } from "next/og";
import { getProjectBySlug, getProjectCollection } from "@/lib/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const title = project?.title ?? "Project case study";
  const category = project?.category ?? "Software Engineering";
  const collection = project ? getProjectCollection(project)?.title : "AI Engineering";

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "62px 68px", background: "#f5f7f3", color: "#171918", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 21, fontWeight: 700 }}>
        <span>Godwin Ekanem</span>
        <span style={{ padding: "9px 14px", border: "1px solid #c9d4ce", borderRadius: 99, color: "#155f6d", fontSize: 15, textTransform: "uppercase", letterSpacing: 1.6 }}>{collection}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ color: "#155f6d", fontSize: 17, textTransform: "uppercase", letterSpacing: 2 }}>{category}</div>
        <div style={{ maxWidth: 1060, fontSize: title.length > 28 ? 65 : 82, lineHeight: .98, letterSpacing: -4, fontWeight: 650 }}>{title}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "#59615d", fontSize: 18 }}>
        <span>System architecture · Decisions · Reliability · Proof</span>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}><i style={{ width: 9, height: 9, borderRadius: 99, background: "#2d8b61" }} /> Case study</span>
      </div>
    </div>,
    size,
  );
}
