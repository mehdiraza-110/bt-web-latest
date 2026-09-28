import type { Metadata } from "next";
import { getInstitute, buildInstituteMetadata } from "@/lib/institute-metadata";
import JsonLd from "@/components/seo/JsonLd";
// Reuse the University detail client component for schools and colleges —
// they're all rendered from the same `institutes` row shape.
import UniversityDetailClient from "@/app/universities/[id]/UniversityDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const institute = await getInstitute(id);
  return buildInstituteMetadata(institute, "colleges", id);
}

export default async function CollegeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const institute = await getInstitute(id);

  return (
    <>
      {institute?.schema_markup && <JsonLd data={institute.schema_markup} />}
      <UniversityDetailClient />
    </>
  );
}
