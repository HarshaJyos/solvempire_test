import { ImageResponse } from "next/og";
import { COMPANY } from "@/lib/company";

export const alt = `${COMPANY.brandName} — Product Engineering Company`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f3f6fc",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 800,
              fontSize: "24px",
            }}
          >
            S
          </div>
          <span style={{ fontSize: "32px", fontWeight: 800, color: "#0a0f1d", letterSpacing: "-0.5px" }}>
            {COMPANY.brandName}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "950px" }}>
          <span style={{ fontSize: "20px", fontWeight: 700, color: "#2563eb", letterSpacing: "2px", textTransform: "uppercase" }}>
            {COMPANY.positioning.eyebrow}
          </span>
          <h1 style={{ fontSize: "64px", fontWeight: 800, color: "#0a0f1d", lineHeight: 1.1, margin: 0, letterSpacing: "-1.5px" }}>
            {COMPANY.positioning.h1}
          </h1>
          <p style={{ fontSize: "24px", color: "#475569", lineHeight: 1.5, margin: 0 }}>
            {COMPANY.positioning.subhead}
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", borderTop: "2px solid #e2e8f0", paddingTop: "32px" }}>
          <span style={{ fontSize: "18px", color: "#64748b", fontWeight: 600 }}>
            Mechanical CAD · Custom PCB · Firmware · Cloud Telemetry
          </span>
          <span style={{ fontSize: "18px", color: "#2563eb", fontWeight: 700 }}>
            solvempire.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
