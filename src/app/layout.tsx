import type { Metadata } from "next";
import { Manrope, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";
import { SITE_CONFIG } from "@/config/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://codecommit.sec"),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.brandStatement} | Cybersecurity & Secure Software Engineering`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "CODE.COMMIT",
    "Cybersecurity Engineering",
    "Penetration Testing",
    "Application Security",
    "Cloud Security AWS Azure",
    "CloudSentinel",
    "SENTINEL-IoT",
    "Secure Software Development",
    "Anand Binu Arjun",
  ],
  authors: [{ name: SITE_CONFIG.leadEngineer, url: SITE_CONFIG.githubProfileUrl }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.primaryHeadline}`,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.brandStatement}`,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${manrope.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen bg-background text-text-primary antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
