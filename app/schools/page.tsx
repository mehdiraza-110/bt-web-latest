"use client";
import InstitutesListPage from "@/components/instituesLayout";

export default function SchoolsPage() {
  return (
    <InstitutesListPage
      title="Schools in Pakistan"
      subtitle="Explore quality schools for primary and secondary education"
      routePath="/schools"
      instituteType="School"
    />
  );
}

