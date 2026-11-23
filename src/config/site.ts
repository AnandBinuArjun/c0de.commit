export const SITE_CONFIG = {
  name: "CODE.COMMIT",
  brandStatement: "SECURITY × SOFTWARE",
  primaryHeadline: "Find vulnerabilities. Fix them. Build securely.",
  alternativePositioning: "Offensive Security. Defensive Engineering. Secure Software.",
  description:
    "Offensive security, application security, cloud defence and secure software engineering — built around practical technical expertise.",
  instagramHandle: "@c0de.commit",
  instagramUrl: "https://instagram.com/c0de.commit",
  githubProfileUrl: "https://github.com/AnandBinuArjun",
  leadEngineer: "Anand Binu Arjun",
  location: "Birmingham, United Kingdom",
  primaryCta: {
    label: "Explore Services",
    href: "/services",
  },
  secondaryCta: {
    label: "View Our Work",
    href: "/work",
  },
  conversionCta: {
    label: "Initialize Project",
    href: "/contact",
  },
  brandAssets: {
    horizontalLogoPath: "/brand/code-commit-logo.png",
    compactMarkPath: "/brand/code-commit-mark.png",
    wordmarkPath: "/brand/code-commit-wordmark.png",
    cloudSentinelLogoPath: "/products/cloudsentinel-logo.png",
    assetsSupplied: true,
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Work", href: "/work" },
    { label: "Research", href: "/research" },
    { label: "Insights", href: "/insights" },
    { label: "Tools", href: "/tools" },
    { label: "About", href: "/about" },
  ],
} as const;
