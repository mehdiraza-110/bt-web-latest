"use client";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import InstitutesListPage from "@/components/instituesLayout";

function UniversitiesContent() {
  return (
    <InstitutesListPage
      title="Universities in Pakistan"
      subtitle="Explore top universities across Pakistan"
      routePath="/universities"
      instituteType="University"
    />
  );
}

export default function UniversitiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading universities...</p>
        </div>
      </div>
    }>
      <UniversitiesContent />
    </Suspense>
  );
}
