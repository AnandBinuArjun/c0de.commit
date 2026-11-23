import { prisma } from "@/lib/db/prisma";
import { PROJECTS_DATA, getProjectBySlug } from "@/data/projects";
import { RESEARCH_ARTICLES, RESEARCH_CATEGORIES, getResearchArticleBySlug } from "@/data/research";
import { INSIGHTS_SERIES, getInsightLessonBySlug } from "@/data/insights";
import type { ContactSubmissionInput } from "@/lib/validation/contact";
import crypto from "crypto";

export interface StoredContactSubmission {
  id: string;
  referenceCode: string;
  fullName: string;
  workEmail: string;
  organisation?: string;
  serviceCategory: string;
  projectDescription: string;
  preferredTimeline: string;
  createdAt: string;
  persistedInDatabase: boolean;
}

const inMemorySubmissions: StoredContactSubmission[] = [];

export function generateReferenceCode(): string {
  const year = new Date().getUTCFullYear();
  const suffix = crypto.randomBytes(2).toString("hex").toUpperCase();
  return `CC-${year}-${suffix}`;
}

export function hashClientIp(ip: string): string {
  return crypto.createHash("sha256").update(`code-commit-salt:${ip}`).digest("hex").slice(0, 24);
}

export async function saveContactSubmission(
  input: ContactSubmissionInput,
  clientIp = "0.0.0.0"
): Promise<StoredContactSubmission> {
  const referenceCode = generateReferenceCode();
  const ipHash = hashClientIp(clientIp);

  if (process.env.DATABASE_URL) {
    try {
      const created = await prisma.contactSubmission.create({
        data: {
          referenceCode,
          fullName: input.fullName,
          workEmail: input.workEmail,
          organisation: input.organisation || null,
          serviceCategory: input.serviceCategory,
          projectDescription: input.projectDescription,
          preferredTimeline: input.preferredTimeline,
          consentAccepted: input.consentAccepted,
          ipHash,
          status: "RECEIVED",
        },
      });

      return {
        id: created.id,
        referenceCode: created.referenceCode,
        fullName: created.fullName,
        workEmail: created.workEmail,
        organisation: created.organisation ?? undefined,
        serviceCategory: created.serviceCategory,
        projectDescription: created.projectDescription,
        preferredTimeline: created.preferredTimeline,
        createdAt: created.createdAt.toISOString(),
        persistedInDatabase: true,
      };
    } catch {
      // Fallback to in-memory ledger if PostgreSQL is unreachable in dev/test
    }
  }

  const fallbackRecord: StoredContactSubmission = {
    id: crypto.randomUUID(),
    referenceCode,
    fullName: input.fullName,
    workEmail: input.workEmail,
    organisation: input.organisation || undefined,
    serviceCategory: input.serviceCategory,
    projectDescription: input.projectDescription,
    preferredTimeline: input.preferredTimeline,
    createdAt: new Date().toISOString(),
    persistedInDatabase: false,
  };

  inMemorySubmissions.push(fallbackRecord);
  return fallbackRecord;
}

export function getRepositoryCatalog() {
  return {
    projects: PROJECTS_DATA,
    getProjectBySlug,
    researchCategories: RESEARCH_CATEGORIES,
    researchArticles: RESEARCH_ARTICLES,
    getResearchArticleBySlug,
    insightsSeries: INSIGHTS_SERIES,
    getInsightLessonBySlug,
  };
}
