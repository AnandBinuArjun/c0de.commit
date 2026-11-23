import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/services";
import { ServiceDetailTemplate } from "@/components/services/service-detail-template";

const service = getServiceBySlug("secure-development");

export const metadata: Metadata = {
  title: service?.title || "Secure Development",
  description: service?.shortDescription,
};

export default function SecureDevelopmentPage() {
  if (!service) return notFound();
  return <ServiceDetailTemplate service={service} />;
}
