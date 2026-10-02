import { ImageResponse } from "next/og";

export const alt = "Godwin Ekanem — AI Engineering and AI Automation built to operate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function Lane({ label, detail }: { label: string; detail: string }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
    <div style={{ width: 12, height: 12, borderRadius: 999, background: "#155f6d", boxShadow: "0 0 0 6px rgba(21,95,109,.10)" }} />
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ color: "#172320", fontSize: 18, fontWeight: 700 }}>{label}</div>
      <div style={{ color: "#6a7773", fontSize: 13, letterSpacing: 1.2, textTransform: "uppercase" }}>{detail}</div>
    </div>
  </div>;
}

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", background: "#f7f7f4", color: "#171918", padding: "58px 68px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ position: "absolute", width: 460, height: 460, right: -120, top: -160, borderRadius: 999, border: "1px solid rgba(21,95,109,.12)", boxShadow: "0 0 0 70px rgba(21,95,109,.025), 0 0 0 140px rgba(21,95,109,.018)" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 15, fontSize: 22, fontWeight: 700 }}><div style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12, background: "#172320", color: "white", fontSize: 16 }}>GE</div>Godwin Ekanem</div>
        <div style={{ color: "#7b8783", fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>Portfolio / Systems</div>
      </div>
      <div style={{ display: "flex", alignItems: "stretch", gap: 52 }}>
        <div style={{ width: 710, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ color: "#155f6d", fontSize: 17, letterSpacing: 2.2, textTransform: "uppercase", fontWeight: 700 }}>AI Engineering + AI Automation</div>
          <div style={{ fontSize: 88, lineHeight: .92, letterSpacing: -5.2, fontWeight: 650 }}>Built to<br />operate.</div>
        </div>
        <div style={{ width: 300, display: "flex", flexDirection: "column", justifyContent: "center", gap: 30, borderLeft: "1px solid #ccd7d2", paddingLeft: 34 }}>
          <Lane label="Engineering" detail="Product · state · reliability" />
          <div style={{ width: 1, height: 20, marginLeft: 5, background: "#b7c8c2" }} />
          <Lane label="Automation" detail="Workflow · controls · outcomes" />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #d8dedb", paddingTop: 24 }}>
        <div style={{ color: "#5f6d68", fontSize: 16 }}>Voice systems · Grounded AI · Governed automation</div>
        <div style={{ color: "#89938f", fontSize: 15 }}>Lagos, Nigeria</div>
      </div>
    </div>,
    size,
  );
}
