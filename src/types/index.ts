export type ProjectStatusType =
  | "ACTIVE_DEVELOPMENT"
  | "RESEARCH_PROTOTYPE"
  | "ARCHITECTURAL_BLUEPRINT"
  | "PRODUCTION_READY";

export type PublicationStatusType = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface ServiceItem {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  shortDescription: string;
  iconName: string;
  capabilityGroup: "OFFENSIVE SECURITY" | "DEFENSIVE ENGINEERING" | "SECURE DEVELOPMENT";
  problemStatement: string;
  whatWeAssessOrDeliver: {
    title: string;
    description: string;
  }[];
  methodology: {
    phase: string;
    title: string;
    description: string;
  }[];
  engagementWorkflow: string[];
  deliverables: string[];
  toolsAndTechnologies: string[];
  relatedProjectSlugs: string[];
  relatedResearchSlugs: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  legalNotice?: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  category:
    | "Cloud Security"
    | "IoT & Honeypot Defense"
    | "Threat Intelligence"
    | "Identity & Exposure"
    | "Forensics & DFIR"
    | "Security Orchestration"
    | "AI & Digital Safety"
    | "Vulnerability Management"
    | "Application Security"
    | "Offensive Reconnaissance";
  isProduct: boolean;
  featured: boolean;
  developmentStatus: ProjectStatusType;
  statusLabel: string;
  problemStatement: string;
  solutionOverview: string;
  architectureDiagram: {
    nodes: { id: string; label: string; layer: string; detail: string }[];
    flows: string[];
  };
  technologies: string[];
  implementedFeatures: string[];
  plannedFeatures: string[];
  securityConsiderations: string[];
  githubUrl: string;
  githubVerificationNote: string;
  documentationUrl?: string;
  logoSlot?: {
    requiredAssetPath: string;
    productName: string;
    note: string;
  };
  relatedResearchSlugs: string[];
}

export interface ResearchCategoryItem {
  slug: string;
  name: string;
  description: string;
}

export interface ResearchArticleItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  categorySlug: string;
  categoryName: string;
  authorName: string;
  authorRole: string;
  readingTimeMin: number;
  publicationStatus: PublicationStatusType;
  statusLabel: string;
  publishedAt: string;
  updatedAt: string;
  mitreAttackRefs: {
    id: string;
    name: string;
    tactic: string;
  }[];
  tableOfContents: {
    id: string;
    title: string;
  }[];
  sections: {
    id: string;
    heading: string;
    paragraphs: string[];
    codeSnippet?: {
      language: string;
      filename: string;
      code: string;
    };
    diagramNote?: string;
  }[];
  references: {
    title: string;
    url: string;
  }[];
  relatedProjectSlugs: string[];
}

export interface InsightLessonItem {
  slug: string;
  seriesSlug: string;
  lessonNumber: number;
  title: string;
  summary: string;
  threatExplanation: string;
  realisticExample: string;
  defensiveRecommendations: string[];
  furtherReading: string[];
  isPlaceholder: boolean;
  publishedAt: string;
}

export interface ContentSeriesItem {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  instagramHandle: string;
  totalPlannedPosts: number;
  categoryTag: string;
  lessons: InsightLessonItem[];
}
