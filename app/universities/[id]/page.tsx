import type { Metadata } from "next";
import { getInstitute, buildInstituteMetadata } from "@/lib/institute-metadata";
import JsonLd from "@/components/seo/JsonLd";
import UniversityDetailClient from "./UniversityDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const institute = await getInstitute(id);
  return buildInstituteMetadata(institute, "universities", id);
}

export default async function UniversityDetailPage({
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
