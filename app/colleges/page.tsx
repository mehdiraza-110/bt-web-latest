"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import InstitutesListPage from "@/components/instituesLayout";

function CollegesContent() {
  return (
    <InstitutesListPage
      title="Colleges in Pakistan"
      subtitle="Explore colleges for intermediate & A-Level education"
      routePath="/colleges"
      instituteType="College"
    />
  );
}

export default function CollegesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading colleges...</p>
        </div>
      </div>
    }>
      <CollegesContent />
    </Suspense>
  );
}

