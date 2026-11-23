import type { ProjectItem } from "@/types";

export interface ProjectFilterCriteria {
  query?: string;
  category?: string;
  technology?: string;
}

export function filterProjects(
  projects: ProjectItem[],
  criteria: ProjectFilterCriteria
): ProjectItem[] {
  const normalizedQuery = (criteria.query || "").trim().toLowerCase();
  const normalizedCat = (criteria.category || "ALL").trim();
  const normalizedTech = (criteria.technology || "ALL").trim();

  return projects.filter((proj) => {
    const matchesCategory = normalizedCat === "ALL" || proj.category === normalizedCat;
    const matchesTechnology =
      normalizedTech === "ALL" || proj.technologies.includes(normalizedTech);

    const matchesQuery =
      !normalizedQuery ||
      proj.name.toLowerCase().includes(normalizedQuery) ||
      proj.shortDescription.toLowerCase().includes(normalizedQuery) ||
      proj.category.toLowerCase().includes(normalizedQuery) ||
      proj.technologies.some((t) => t.toLowerCase().includes(normalizedQuery));

    return matchesCategory && matchesTechnology && matchesQuery;
  });
}
