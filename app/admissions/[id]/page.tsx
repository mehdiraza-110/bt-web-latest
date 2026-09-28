import type { Metadata } from "next";
import { fetchAdmissionById } from "@/components/apis/admissions";
import { buildContentMetadata, truncateDescription } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import AdmissionDetailClient from "./AdmissionDetailClient";

async function getAdmission(id: string) {
  try {
    const response = await fetchAdmissionById(id);
    return response?.success ? response?.data?.admission ?? null : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const admission = await getAdmission(id);

  if (!admission) {
    return { title: "Admission Not Found" };
  }

  const fallbackTitle = admission.institute
    ? `${admission.program} at ${admission.institute}`
    : admission.program;

  return buildContentMetadata({
    // Admissions don't carry meta_title/meta_description/etc yet — those
    // SEO columns are being added in a parallel DB migration. This is
    // written defensively so it starts working the moment they land,
    // without needing another code change.
    seo: admission,
    path: `/admissions/${id}`,
    fallbackTitle,
    fallbackDescription: truncateDescription(
      `${admission.program} admissions at ${admission.institute || "this institute"} — ${admission.field || ""} program, ${admission.duration || ""} duration.`
    ),
  });
}

export default async function AdmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const admission = await getAdmission(id);

  return (
    <>
      {admission?.schema_markup && <JsonLd data={admission.schema_markup} />}
      <AdmissionDetailClient />
    </>
  );
}
