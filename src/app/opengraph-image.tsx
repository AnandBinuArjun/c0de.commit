import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/config/site";

export const alt = "CODE.COMMIT — SECURITY × SOFTWARE | Cybersecurity & Secure Software Engineering";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#030806",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(0, 245, 138, 0.18), transparent 55%)",
          padding: "64px 72px",
          border: "2px solid #204D35",
          color: "#F3F8F5",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              border: "1px solid #00F58A",
              backgroundColor: "#0B1710",
              padding: "10px 20px",
              borderRadius: "999px",
              color: "#00F58A",
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}
          >
            <span>[ SYSTEM ONLINE ] — {SITE_CONFIG.brandStatement}</span>
          </div>

          <div
            style={{
              color: "#A5B7AA",
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            github.com/AnandBinuArjun · @c0de.commit
          </div>
        </div>

        {/* Center Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: 800,
              color: "#00F58A",
              letterSpacing: "0.18em",
            }}
          >
            CODE.COMMIT
          </div>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.08,
              color: "#F3F8F5",
            }}
          >
            Find vulnerabilities. Fix them. Build securely.
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#A5B7AA",
              maxWidth: "920px",
              lineHeight: 1.4,
            }}
          >
            Offensive Security · Defensive Cloud Architecture · 21 Verified Systems · Research Lab
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #204D35",
            paddingTop: "24px",
            fontSize: "18px",
            color: "#00F58A",
            fontWeight: 600,
          }}
        >
          <span>CloudSentinel (AWS & Azure CSPM)</span>
          <span>·</span>
          <span>AegisFlow (AI-Native AppSec)</span>
          <span>·</span>
          <span>SENTINEL-IoT (Honeypot Network)</span>
          <span>·</span>
          <span>RANSOMWATCH</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
