import React from "react";

/**
 * Custom SVG Architectural Blueprint Schematics for the 3 Core Disciplines:
 * 1. Offensive Security (Exploit Chain & Target Attack Surface Vector Radar)
 * 2. Defensive Engineering (Multi-Cloud Shield & Telemetry Isolation Mesh)
 * 3. Secure Development (Zero-Trust AST Schema & Cryptographic Pipeline)
 */
export function DisciplineSchematic({
  variant,
}: {
  variant: "OFFENSIVE" | "DEFENSIVE" | "DEVELOPMENT";
}) {
  if (variant === "OFFENSIVE") {
    return (
      <svg
        viewBox="0 0 360 120"
        fill="none"
        className="w-full h-28 rounded-xl border border-brand-border/60 bg-background/80 p-2"
        aria-hidden="true"
      >
        {/* Background Grid Lines */}
        <line x1="0" y1="30" x2="360" y2="30" stroke="#204D35" strokeOpacity="0.35" strokeDasharray="3 3" />
        <line x1="0" y1="60" x2="360" y2="60" stroke="#204D35" strokeOpacity="0.35" strokeDasharray="3 3" />
        <line x1="0" y1="90" x2="360" y2="90" stroke="#204D35" strokeOpacity="0.35" strokeDasharray="3 3" />

        {/* Attack Path Vectors */}
        <path
          d="M 28 60 C 75 60, 85 28, 130 28 L 220 28 C 255 28, 265 60, 315 60"
          stroke="#00F58A"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <path
          d="M 28 60 C 75 60, 85 92, 130 92 L 220 92 C 255 92, 265 60, 315 60"
          stroke="#00C878"
          strokeWidth="1.2"
          strokeOpacity="0.6"
        />
        <line x1="28" y1="60" x2="315" y2="60" stroke="#00F58A" strokeWidth="1.5" />

        {/* Recon Node */}
        <circle cx="28" cy="60" r="8" fill="#0B3824" stroke="#00F58A" strokeWidth="1.5" />
        <circle cx="28" cy="60" r="3" fill="#00F58A" />
        <text x="14" y="84" fill="#A5B7AA" fontSize="8" fontFamily="monospace">
          RECON
        </text>

        {/* Auth / BOLA Vector Node */}
        <rect x="115" y="18" width="44" height="20" rx="4" fill="#101D15" stroke="#00F58A" strokeWidth="1.2" />
        <text x="123" y="31" fill="#00F58A" fontSize="8" fontFamily="monospace">
          API/BOLA
        </text>

        {/* Logic Chain Node */}
        <rect x="155" y="50" width="52" height="20" rx="4" fill="#0B3824" stroke="#00F58A" strokeWidth="1.5" />
        <text x="163" y="63" fill="#F3F8F5" fontSize="8" fontFamily="monospace">
          ROE-TEST
        </text>

        {/* Lateral Path Node */}
        <rect x="115" y="82" width="44" height="20" rx="4" fill="#101D15" stroke="#204D35" strokeWidth="1.2" />
        <text x="122" y="95" fill="#A5B7AA" fontSize="8" fontFamily="monospace">
          NET-SEG
        </text>

        {/* Target Reticle */}
        <circle cx="315" cy="60" r="16" stroke="#00F58A" strokeWidth="1.2" strokeOpacity="0.4" />
        <circle cx="315" cy="60" r="9" fill="#0B3824" stroke="#00F58A" strokeWidth="1.5" />
        <circle cx="315" cy="60" r="3" fill="#00F58A" />
        <text x="294" y="92" fill="#00F58A" fontSize="8" fontFamily="monospace">
          POC-VERIFIED
        </text>
      </svg>
    );
  }

  if (variant === "DEFENSIVE") {
    return (
      <svg
        viewBox="0 0 360 120"
        fill="none"
        className="w-full h-28 rounded-xl border border-brand-border/60 bg-background/80 p-2"
        aria-hidden="true"
      >
        <line x1="0" y1="60" x2="360" y2="60" stroke="#204D35" strokeOpacity="0.4" />
        {/* AWS & Azure Cloud Sources */}
        <rect x="18" y="22" width="64" height="28" rx="5" fill="#101D15" stroke="#204D35" strokeWidth="1.2" />
        <text x="28" y="39" fill="#F3F8F5" fontSize="8.5" fontFamily="monospace">
          AWS STS
        </text>

        <rect x="18" y="70" width="64" height="28" rx="5" fill="#101D15" stroke="#204D35" strokeWidth="1.2" />
        <text x="25" y="87" fill="#F3F8F5" fontSize="8.5" fontFamily="monospace">
          AZURE AD
        </text>

        {/* Connectors */}
        <path d="M 82 36 L 138 54" stroke="#00F58A" strokeWidth="1.4" />
        <path d="M 82 84 L 138 66" stroke="#00F58A" strokeWidth="1.4" />

        {/* Central Posture & MITRE Engine */}
        <rect x="138" y="34" width="84" height="52" rx="8" fill="#0B3824" stroke="#00F58A" strokeWidth="1.6" />
        <text x="150" y="56" fill="#00F58A" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
          POSTURE-18
        </text>
        <text x="152" y="70" fill="#F3F8F5" fontSize="7.5" fontFamily="monospace">
          MITRE ATT&amp;CK
        </text>

        {/* Approval Gate */}
        <line x1="222" y1="60" x2="266" y2="60" stroke="#00F58A" strokeWidth="1.6" strokeDasharray="3 2" />
        <rect x="266" y="40" width="76" height="40" rx="6" fill="#101D15" stroke="#00F58A" strokeWidth="1.4" />
        <text x="276" y="57" fill="#00F58A" fontSize="8" fontFamily="monospace" fontWeight="bold">
          SoD GATE
        </text>
        <text x="275" y="70" fill="#A5B7AA" fontSize="7.5" fontFamily="monospace">
          HUMAN SIGN
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 360 120"
      fill="none"
      className="w-full h-28 rounded-xl border border-brand-border/60 bg-background/80 p-2"
      aria-hidden="true"
    >
      {/* Pipeline Track */}
      <line x1="30" y1="60" x2="330" y2="60" stroke="#00F58A" strokeWidth="1.5" />

      {/* Stage 1: Zod / Schema */}
      <rect x="20" y="38" width="68" height="44" rx="6" fill="#101D15" stroke="#00F58A" strokeWidth="1.3" />
      <text x="30" y="57" fill="#00F58A" fontSize="8" fontFamily="monospace" fontWeight="bold">
        ZOD/ASVS
      </text>
      <text x="30" y="70" fill="#A5B7AA" fontSize="7.5" fontFamily="monospace">
        PARSE-STRICT
      </text>

      {/* Stage 2: API / Rate Limit */}
      <rect x="112" y="38" width="68" height="44" rx="6" fill="#0B3824" stroke="#00F58A" strokeWidth="1.5" />
      <text x="122" y="57" fill="#F3F8F5" fontSize="8" fontFamily="monospace" fontWeight="bold">
        ZERO-TRUST
      </text>
      <text x="122" y="70" fill="#00F58A" fontSize="7.5" fontFamily="monospace">
        API-GUARD
      </text>

      {/* Stage 3: PostgreSQL RLS */}
      <rect x="204" y="38" width="64" height="44" rx="6" fill="#101D15" stroke="#00F58A" strokeWidth="1.3" />
      <text x="215" y="57" fill="#00F58A" fontSize="8" fontFamily="monospace" fontWeight="bold">
        PG16+RLS
      </text>
      <text x="215" y="70" fill="#A5B7AA" fontSize="7.5" fontFamily="monospace">
        ISOLATED
      </text>

      {/* Stage 4: Verified Build */}
      <circle cx="314" cy="60" r="18" fill="#0B3824" stroke="#00F58A" strokeWidth="1.5" />
      <path d="M 307 60 L 312 65 L 322 54" stroke="#00F58A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
