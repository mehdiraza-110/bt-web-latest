"use client";
import InstitutesListPage from "@/components/instituesLayout";

export default function UniversitiesPage() {
  return (
    <InstitutesListPage
      title="Universities in Pakistan"
      subtitle="Explore top universities across Pakistan"
      routePath="/universities"
      instituteType="University"
    />
  );
}
