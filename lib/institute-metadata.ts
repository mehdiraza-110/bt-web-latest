import type { Metadata } from "next";
import { fetchInstituteById } from "@/components/apis/institutes";
import { buildContentMetadata, truncateDescription } from "@/lib/seo";

/**
 * Shared by the schools/colleges/universities detail pages — they're all
 * backed by the same `institutes` table/endpoint, just filtered to a
 * different `institute_type` for their listing pages.
 */
export async function getInstitute(id: string) {
  try {
    const response = await fetchInstituteById(id);
    return response?.success ? response?.data?.institute ?? null : null;
  } catch {
    return null;
  }
}

export function buildInstituteMetadata(
  institute: any | null,
  section: "schools" | "colleges" | "universities",
  id: string
): Metadata {
  if (!institute) {
    return { title: "Institute Not Found" };
  }

  return buildContentMetadata({
    // Institutes don't carry meta_title/meta_description/etc yet — those
    // SEO columns are being added in a parallel DB migration. Written
    // defensively so it starts working the moment they land.
    seo: institute,
    path: `/${section}/${id}`,
    fallbackTitle: institute.institute_name,
    fallbackDescription: truncateDescription(
      institute.mission_vision ||
        `${institute.institute_name} is a ${institute.legal_status || ""} ${institute.institute_type || "institute"} located in ${institute.city || "Pakistan"}.`
    ),
    image: institute.logo,
  });
}
