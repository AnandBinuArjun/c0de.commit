import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/config/site";
import { RESEARCH_ARTICLES } from "@/data/research";
import { INSIGHTS_SERIES } from "@/data/insights";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codecommit.sec";
  const publishedInsights = INSIGHTS_SERIES.flatMap((s) =>
    s.lessons.filter((l) => !l.isPlaceholder)
  );

  const itemsXml: string[] = [];

  for (const article of RESEARCH_ARTICLES) {
    const url = `${baseUrl}/research/${article.slug}`;
    itemsXml.push(`
    <item>
      <title>${escapeXml(`[Research] ${article.title}`)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <category>${escapeXml(article.categoryName)}</category>
      <description>${escapeXml(article.summary)}</description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
    </item>`);
  }

  for (const lesson of publishedInsights) {
    const url = `${baseUrl}/insights/${lesson.slug}`;
    itemsXml.push(`
    <item>
      <title>${escapeXml(`[Insights] ${lesson.title}`)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <category>Cybersecurity Education</category>
      <description>${escapeXml(lesson.summary)}</description>
      <pubDate>${new Date(lesson.publishedAt).toUTCString()}</pubDate>
    </item>`);
  }

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE_CONFIG.name} — Security Research & Technical Insights`)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <language>en-gb</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${itemsXml.join("\n")}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
