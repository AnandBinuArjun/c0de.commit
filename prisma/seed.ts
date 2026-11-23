import { PrismaClient, ProjectStatus, PublicationStatus } from "@prisma/client";
import { PROJECTS_DATA } from "../src/data/projects";
import { RESEARCH_ARTICLES, RESEARCH_CATEGORIES } from "../src/data/research";
import { INSIGHTS_SERIES } from "../src/data/insights";
import { SITE_CONFIG } from "../src/config/site";

const prisma = new PrismaClient();

async function main() {
  console.log("[SEED] Initializing CODE.COMMIT database seed...");

  // 1. Site Settings
  await prisma.siteSetting.upsert({
    where: { key: "brand.statement" },
    update: { value: SITE_CONFIG.brandStatement },
    create: {
      key: "brand.statement",
      value: SITE_CONFIG.brandStatement,
      description: "Primary CODE.COMMIT brand statement",
    },
  });

  // 2. Projects & Technologies
  for (const proj of PROJECTS_DATA) {
    const createdProject = await prisma.project.upsert({
      where: { slug: proj.slug },
      update: {
        name: proj.name,
        shortDescription: proj.shortDescription,
        category: proj.category,
        isProduct: proj.isProduct,
        featured: proj.featured,
        developmentStatus: proj.developmentStatus as ProjectStatus,
        publicationStatus: PublicationStatus.PUBLISHED,
        problemStatement: proj.problemStatement,
        solutionOverview: proj.solutionOverview,
        architectureNotes: JSON.stringify(proj.architectureDiagram),
        implementedFeatures: proj.implementedFeatures,
        plannedFeatures: proj.plannedFeatures,
        securityConsiderations: proj.securityConsiderations,
        githubUrl: proj.githubUrl,
        logoPath: proj.logoSlot?.requiredAssetPath ?? null,
      },
      create: {
        slug: proj.slug,
        name: proj.name,
        shortDescription: proj.shortDescription,
        category: proj.category,
        isProduct: proj.isProduct,
        featured: proj.featured,
        developmentStatus: proj.developmentStatus as ProjectStatus,
        publicationStatus: PublicationStatus.PUBLISHED,
        problemStatement: proj.problemStatement,
        solutionOverview: proj.solutionOverview,
        architectureNotes: JSON.stringify(proj.architectureDiagram),
        implementedFeatures: proj.implementedFeatures,
        plannedFeatures: proj.plannedFeatures,
        securityConsiderations: proj.securityConsiderations,
        githubUrl: proj.githubUrl,
        logoPath: proj.logoSlot?.requiredAssetPath ?? null,
      },
    });

    for (const tech of proj.technologies) {
      await prisma.projectTechnology.upsert({
        where: {
          projectId_name: {
            projectId: createdProject.id,
            name: tech,
          },
        },
        update: {},
        create: {
          projectId: createdProject.id,
          name: tech,
          category: "Engineering Stack",
        },
      });
    }
  }

  // 3. Research Categories & Articles
  const categoryIdMap = new Map<string, string>();
  for (const cat of RESEARCH_CATEGORIES) {
    const createdCat = await prisma.researchCategory.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
      },
      create: {
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
      },
    });
    categoryIdMap.set(cat.slug, createdCat.id);
  }

  for (const article of RESEARCH_ARTICLES) {
    const categoryId = categoryIdMap.get(article.categorySlug);
    if (!categoryId) continue;

    await prisma.researchArticle.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        summary: article.summary,
        contentMdx: JSON.stringify(article.sections),
        categoryId,
        authorName: article.authorName,
        authorRole: article.authorRole,
        readingTimeMin: article.readingTimeMin,
        mitreAttackRefs: article.mitreAttackRefs.map((r) => `${r.id}: ${r.name}`),
        publicationStatus: PublicationStatus.DRAFT,
        publishedAt: new Date(article.publishedAt),
      },
      create: {
        slug: article.slug,
        title: article.title,
        summary: article.summary,
        contentMdx: JSON.stringify(article.sections),
        categoryId,
        authorName: article.authorName,
        authorRole: article.authorRole,
        readingTimeMin: article.readingTimeMin,
        mitreAttackRefs: article.mitreAttackRefs.map((r) => `${r.id}: ${r.name}`),
        publicationStatus: PublicationStatus.DRAFT,
        publishedAt: new Date(article.publishedAt),
      },
    });
  }

  // 4. Content Series & Insight Articles
  for (const series of INSIGHTS_SERIES) {
    const createdSeries = await prisma.contentSeries.upsert({
      where: { slug: series.slug },
      update: {
        title: series.title,
        subtitle: series.subtitle,
        description: series.description,
        totalPlannedPosts: series.totalPlannedPosts,
        publicationStatus: PublicationStatus.PUBLISHED,
      },
      create: {
        slug: series.slug,
        title: series.title,
        subtitle: series.subtitle,
        description: series.description,
        totalPlannedPosts: series.totalPlannedPosts,
        publicationStatus: PublicationStatus.PUBLISHED,
      },
    });

    for (const lesson of series.lessons) {
      await prisma.insightArticle.upsert({
        where: { slug: lesson.slug },
        update: {
          seriesId: createdSeries.id,
          lessonNumber: lesson.lessonNumber,
          title: lesson.title,
          summary: lesson.summary,
          threatExplanation: lesson.threatExplanation,
          realisticExample: lesson.realisticExample,
          defensiveRecommendations: lesson.defensiveRecommendations,
          furtherReading: lesson.furtherReading,
          isPlaceholder: lesson.isPlaceholder,
          publicationStatus: lesson.isPlaceholder
            ? PublicationStatus.DRAFT
            : PublicationStatus.PUBLISHED,
        },
        create: {
          slug: lesson.slug,
          seriesId: createdSeries.id,
          lessonNumber: lesson.lessonNumber,
          title: lesson.title,
          summary: lesson.summary,
          threatExplanation: lesson.threatExplanation,
          realisticExample: lesson.realisticExample,
          defensiveRecommendations: lesson.defensiveRecommendations,
          furtherReading: lesson.furtherReading,
          isPlaceholder: lesson.isPlaceholder,
          publicationStatus: lesson.isPlaceholder
            ? PublicationStatus.DRAFT
            : PublicationStatus.PUBLISHED,
        },
      });
    }
  }

  console.log("[SEED] CODE.COMMIT seed completed with zero fabricated metrics or testimonials.");
}

main()
  .catch((err) => {
    console.error("[SEED ERROR]", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
