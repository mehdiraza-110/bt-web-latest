"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

// Reuse UniversityDetail component for schools and colleges
const UniversityDetail = dynamic(() => import("@/app/universities/[id]/page"), {
  ssr: false,
});

export default function SchoolDetail() {
  return <UniversityDetail />;
}





