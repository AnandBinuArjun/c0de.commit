import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/services";
import { ServiceDetailTemplate } from "@/components/services/service-detail-template";

const service = getServiceBySlug("application-security");

export const metadata: Metadata = {
  title: service?.title || "Application Security",
  description: service?.shortDescription,
};

export default function ApplicationSecurityPage() {
  if (!service) return notFound();
  return <ServiceDetailTemplate service={service} />;
}
