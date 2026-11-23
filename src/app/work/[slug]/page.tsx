import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, PROJECTS_DATA } from "@/data/projects";
import { ProjectDetailTemplate } from "@/components/projects/project-detail-template";

export async function generateStaticParams() {
  return PROJECTS_DATA.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${project.name} — Engineering Portfolio`,
    description: project.shortDescription,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  return <ProjectDetailTemplate project={project} sectionLabel="ENGINEERING WORK" />;
}
