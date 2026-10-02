import { ImageResponse } from "next/og";

export const alt = "Godwin Ekanem — AI Automation and AI Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f5f7f3", color: "#171918", padding: "62px 68px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 15, fontSize: 22, fontWeight: 700 }}>
          <div style={{ width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 13, background: "#171918", color: "white", fontSize: 16 }}>GE</div>
          Godwin Ekanem
        </div>
        <div style={{ color: "#155f6d", fontSize: 16, letterSpacing: 2, textTransform: "uppercase" }}>Portfolio · 2026</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
        <div style={{ maxWidth: 1020, fontSize: 74, lineHeight: .98, letterSpacing: -4, fontWeight: 650 }}>AI Automation. AI Engineering.</div>
        <div style={{ color: "#58615d", fontSize: 25 }}>One production mindset—from governed workflows to intelligent products.</div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {["Voice systems", "Agentic applications", "Intelligent workflows", "Reliable delivery"].map((label) => <span key={label} style={{ padding: "10px 15px", border: "1px solid #cad4ce", borderRadius: 99, color: "#4f5854", fontSize: 16 }}>{label}</span>)}
      </div>
    </div>,
    size,
  );
}
