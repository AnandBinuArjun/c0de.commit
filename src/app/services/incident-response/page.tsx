import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/services";
import { ServiceDetailTemplate } from "@/components/services/service-detail-template";

const service = getServiceBySlug("incident-response");

export const metadata: Metadata = {
  title: service?.title || "Incident Response",
  description: service?.shortDescription,
};

export default function IncidentResponsePage() {
  if (!service) return notFound();
  return <ServiceDetailTemplate service={service} />;
}
