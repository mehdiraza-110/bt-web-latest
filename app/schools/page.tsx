"use client";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import InstitutesListPage from "@/components/instituesLayout";

function SchoolsContent() {
  return (
    <InstitutesListPage
      title="Schools in Pakistan"
      subtitle="Explore quality schools for primary and secondary education"
      routePath="/schools"
      instituteType="School"
    />
  );
}

export default function SchoolsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading schools...</p>
        </div>
      </div>
    }>
      <SchoolsContent />
    </Suspense>
  );
}

