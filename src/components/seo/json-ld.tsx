import React from "react";
import { SITE_CONFIG } from "@/config/site";

export function OrganizationJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codecommit.sec";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    slogan: SITE_CONFIG.brandStatement,
    description: SITE_CONFIG.description,
    url: baseUrl,
    logo: `${baseUrl}/brand/code-commit-logo.png`,
    founder: {
      "@type": "Person",
      name: SITE_CONFIG.leadEngineer,
      url: SITE_CONFIG.githubProfileUrl,
    },
    sameAs: [SITE_CONFIG.githubProfileUrl, SITE_CONFIG.instagramUrl],
    knowsAbout: [
      "Penetration Testing",
      "Application Security",
      "Cloud Security AWS Azure",
      "Threat Intelligence MITRE ATT&CK",
      "Digital Forensics",
      "Secure Software Engineering",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
