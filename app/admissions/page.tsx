"use client";

import { useEffect, useState, Suspense } from "react";
import {
  Search,
  Calendar,
  DollarSign,
  BookOpen,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchAdmissionDetails } from "@/components/apis/admissions";

function AdmissionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCity, setSelectedCity] = useState(
    searchParams.get("city") || "all"
  );
  const [selectedField, setSelectedField] = useState(
    searchParams.get("field") || "all"
  );
  const [page, setPage] = useState(1);

  const [admissions, setAdmissions] = useState([]);
  const [cities, setCities] = useState<string[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) params.set("search", searchQuery);
    if (selectedCity !== "all") params.set("city", selectedCity);
    if (selectedField !== "all") params.set("field", selectedField);

    router.replace(`/admissions?${params.toString()}`);
    setPage(1);
  }, [searchQuery, selectedCity, selectedField]);

  useEffect(() => {
    getAllAdmissions();
  }, [page]);

  const getAllAdmissions = async () => {
    const res = await fetchAdmissionDetails({
      page,
      search: searchQuery,
      city: selectedCity !== "all" ? selectedCity : "",
      field: selectedField !== "all" ? selectedField : "",
    });
    if (res?.success) {
      setAdmissions(res?.admissions);
      setCities(res?.filters?.cities);
      setFields(res?.filters?.fields);
      setPagination(res?.pagination);
    }
  };

  const filteredAdmissions = Array.isArray(admissions)
    ? admissions?.filter((admission) => {
        const matchesSearch =
          admission?.program
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          admission?.institute
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesField =
          selectedField === "all" || admission?.field === selectedField;
        const matchesCity =
          selectedCity === "all" || admission?.city === selectedCity;
        return matchesSearch && matchesField && matchesCity;
      })
    : [];

//    const dateStr = admissions?.deadline
// const date  = new Date(dateStr)
//    const formatted = date.toLocaleDateString('en-Us',year:'numeric',month:'short',day:'numeric')

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">
            Open Admissions
          </h1>
          <p className="text-muted-foreground">
            Find and apply to programs currently accepting applications
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by program or institute..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger>
                <SelectValue placeholder="Field" />
              </SelectTrigger>
              <SelectContent className="h-40 overflow-y-scroll scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                <SelectItem value="all">All Fields</SelectItem>
                {fields?.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent className="h-40 overflow-y-scroll scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                <SelectItem value="all">All Cities</SelectItem>
                {cities?.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredAdmissions?.length} of {admissions?.length}{" "}
            Admissions
          </p>
        </div>

        <div className="space-y-4">
          {filteredAdmissions?.map((admission) => (
            <Card
              key={admission?.id}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors mb-1">
                          {admission?.program}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {admission?.institute}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm">
                      <Badge variant="outline">{admission?.field}</Badge>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{admission?.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>{admission?.fee}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <Badge
                      className={
                        admission?.status === "Closing Soon"
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }
                    >
                      {admission?.status}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      Deadline:{" "}
                      <span className="font-medium">{admission?.deadline}</span>
                    </div>
                    <a href={`/admissions/${admission?.id}`}>
                      <Button className="bg-primary hover:bg-primary/90">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAdmissions?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No admissions found matching your criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setSelectedField("all");
                setSelectedCity("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages}
            </span>

            <Button
              variant="outline"
              disabled={page === pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}

        <div className="mt-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Need Admission Guidance?</h2>
          <p className="text-primary-foreground/90 mb-4">
            Our team can help you choose the right program and guide you through
            the admission process
          </p>
          <a href="/contact">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Contact Our Team
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Admissions() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading admissions...</p>
        </div>
      </div>
    }>
      <AdmissionsContent />
    </Suspense>
  );
}
