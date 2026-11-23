-- CreateEnum
CREATE TYPE "PublicationStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('ACTIVE_DEVELOPMENT', 'RESEARCH_PROTOTYPE', 'ARCHITECTURAL_BLUEPRINT', 'PRODUCTION_READY');

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isProduct" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "developmentStatus" "ProjectStatus" NOT NULL DEFAULT 'ACTIVE_DEVELOPMENT',
    "publicationStatus" "PublicationStatus" NOT NULL DEFAULT 'PUBLISHED',
    "problemStatement" TEXT NOT NULL,
    "solutionOverview" TEXT NOT NULL,
    "architectureNotes" TEXT NOT NULL,
    "implementedFeatures" TEXT[],
    "plannedFeatures" TEXT[],
    "securityConsiderations" TEXT[],
    "githubUrl" TEXT,
    "documentationUrl" TEXT,
    "logoPath" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTechnology" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "projectId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    CONSTRAINT "ProjectTechnology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchCategory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ResearchCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchArticle" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "contentMdx" TEXT NOT NULL,
    "categoryId" UUID NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorRole" TEXT NOT NULL,
    "readingTimeMin" INTEGER NOT NULL DEFAULT 8,
    "mitreAttackRefs" TEXT[],
    "publicationStatus" "PublicationStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ResearchArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentSeries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "totalPlannedPosts" INTEGER NOT NULL DEFAULT 20,
    "publicationStatus" "PublicationStatus" NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ContentSeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsightArticle" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" TEXT NOT NULL,
    "seriesId" UUID NOT NULL,
    "lessonNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "threatExplanation" TEXT NOT NULL,
    "realisticExample" TEXT NOT NULL,
    "defensiveRecommendations" TEXT[],
    "furtherReading" TEXT[],
    "isPlaceholder" BOOLEAN NOT NULL DEFAULT false,
    "publicationStatus" "PublicationStatus" NOT NULL DEFAULT 'PUBLISHED',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "InsightArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "referenceCode" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "workEmail" TEXT NOT NULL,
    "organisation" TEXT,
    "serviceCategory" TEXT NOT NULL,
    "projectDescription" TEXT NOT NULL,
    "preferredTimeline" TEXT NOT NULL,
    "consentAccepted" BOOLEAN NOT NULL,
    "ipHash" TEXT,
    "status" TEXT NOT NULL DEFAULT 'RECEIVED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
CREATE INDEX "Project_category_idx" ON "Project"("category");
CREATE INDEX "Project_featured_idx" ON "Project"("featured");
CREATE INDEX "Project_publicationStatus_idx" ON "Project"("publicationStatus");
CREATE UNIQUE INDEX "ProjectTechnology_projectId_name_key" ON "ProjectTechnology"("projectId", "name");
CREATE INDEX "ProjectTechnology_name_idx" ON "ProjectTechnology"("name");
CREATE UNIQUE INDEX "ResearchCategory_slug_key" ON "ResearchCategory"("slug");
CREATE UNIQUE INDEX "ResearchArticle_slug_key" ON "ResearchArticle"("slug");
CREATE INDEX "ResearchArticle_categoryId_idx" ON "ResearchArticle"("categoryId");
CREATE INDEX "ResearchArticle_publicationStatus_idx" ON "ResearchArticle"("publicationStatus");
CREATE UNIQUE INDEX "ContentSeries_slug_key" ON "ContentSeries"("slug");
CREATE UNIQUE INDEX "InsightArticle_slug_key" ON "InsightArticle"("slug");
CREATE UNIQUE INDEX "InsightArticle_seriesId_lessonNumber_key" ON "InsightArticle"("seriesId", "lessonNumber");
CREATE INDEX "InsightArticle_seriesId_idx" ON "InsightArticle"("seriesId");
CREATE INDEX "InsightArticle_publicationStatus_idx" ON "InsightArticle"("publicationStatus");
CREATE UNIQUE INDEX "ContactSubmission_referenceCode_key" ON "ContactSubmission"("referenceCode");
CREATE INDEX "ContactSubmission_workEmail_idx" ON "ContactSubmission"("workEmail");
CREATE INDEX "ContactSubmission_serviceCategory_idx" ON "ContactSubmission"("serviceCategory");
CREATE INDEX "ContactSubmission_createdAt_idx" ON "ContactSubmission"("createdAt");
CREATE UNIQUE INDEX "SiteSetting_key_key" ON "SiteSetting"("key");

-- AddForeignKey
ALTER TABLE "ProjectTechnology" ADD CONSTRAINT "ProjectTechnology_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResearchArticle" ADD CONSTRAINT "ResearchArticle_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ResearchCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "InsightArticle" ADD CONSTRAINT "InsightArticle_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "ContentSeries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
