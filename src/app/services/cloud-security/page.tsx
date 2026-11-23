import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/services";
import { ServiceDetailTemplate } from "@/components/services/service-detail-template";

const service = getServiceBySlug("cloud-security");

export const metadata: Metadata = {
  title: service?.title || "Cloud Security",
  description: service?.shortDescription,
};

export default function CloudSecurityPage() {
  if (!service) return notFound();
  return <ServiceDetailTemplate service={service} />;
}
