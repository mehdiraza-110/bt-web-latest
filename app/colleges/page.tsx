"use client";

import InstitutesListPage from "@/components/instituesLayout";

export default function CollegesPage() {
  return (
    <InstitutesListPage
      title="Colleges in Pakistan"
      subtitle="Explore colleges for intermediate & A-Level education"
      routePath="/colleges"
      instituteType="College"
    />
  );
}

