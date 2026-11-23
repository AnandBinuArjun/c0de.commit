import type { MetadataRoute } from "next";
import { SERVICES_DATA } from "@/data/services";
import { PROJECTS_DATA } from "@/data/projects";
import { RESEARCH_ARTICLES, RESEARCH_CATEGORIES } from "@/data/research";
import { getAllInsightLessons } from "@/data/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codecommit.sec";
  const now = new Date();

  const staticRoutes = [
    "",
    "/services",
    "/products",
    "/work",
    "/research",
    "/insights",
    "/tools",
    "/lab",
    "/research/detections",
    "/research/glossary",
    "/research/secure-code-gallery",
    "/disclosure",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const serviceRoutes = SERVICES_DATA.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const productRoutes = PROJECTS_DATA.filter((p) => p.isProduct).map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const workRoutes = PROJECTS_DATA.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const researchCategoryRoutes = RESEARCH_CATEGORIES.map((c) => ({
    url: `${baseUrl}/research/categories/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const researchArticleRoutes = RESEARCH_ARTICLES.map((a) => ({
    url: `${baseUrl}/research/${a.slug}`,
    lastModified: new Date(a.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const insightRoutes = getAllInsightLessons().map((l) => ({
    url: `${baseUrl}/insights/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...productRoutes,
    ...workRoutes,
    ...researchCategoryRoutes,
    ...researchArticleRoutes,
    ...insightRoutes,
  ];
}
