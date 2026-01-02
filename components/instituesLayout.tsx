"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InstituteCard from "@/components/InstituteCard";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllDataWithFilter } from "@/components/apis/";

type InstituteType = "University" | "School" | "College";

export default function InstitutesListPage({
  title,
  subtitle,
  routePath,
  instituteType,
}: {
  title: string;
  subtitle: string;
  routePath: string;
  instituteType: InstituteType;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const PAGE_SIZE = 10;

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCity, setSelectedCity] = useState(
    searchParams.get("city") || "all"
  );
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));

  const [institutes, setInstitutes] = useState<any[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  }>({
    page: 1,
    limit: PAGE_SIZE,
    totalPages: 1,
    totalItems: 0,
  });

  // ✅ URL Sync
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCity !== "all") params.set("city", selectedCity);
    params.set("page", String(page));
    router.replace(`${routePath}?${params.toString()}`);
  }, [searchQuery, selectedCity, page, routePath, router]);

  // ✅ Reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCity]);

  // ✅ Backend Pagination + Backend Filters (type included)
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const res = await getAllDataWithFilter("/get-institutes", {
          page,
          limit: PAGE_SIZE,
          search: searchQuery || undefined,
          city: selectedCity !== "all" ? selectedCity : undefined,
          institute_type: instituteType, // ✅ IMPORTANT (fix total + filter + pagination)
        });

        if (!res?.success) {
          setInstitutes([]);
          setCities([]);
          setPagination({
            page,
            limit: PAGE_SIZE,
            totalPages: 1,
            totalItems: 0,
          });
          return;
        }

        // ✅ Now backend should return ONLY requested type
        const items = res?.data?.institutes || [];
        const pag = res?.data?.pagination || {};
        const apiCities = res?.data?.filters?.cities || [];

        setInstitutes(items);

        setPagination({
          page: pag.page ?? page,
          limit: pag.limit ?? PAGE_SIZE,
          totalPages: pag.totalPages ?? 1,
          totalItems: pag.totalItems ?? pag.total ?? 0,
        });

        if (Array.isArray(apiCities) && apiCities.length) {
          setCities(apiCities);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [page, searchQuery, selectedCity, instituteType]);

  const totalPages = Math.max(1, pagination.totalPages || 1);
  const safePage = Math.min(page, totalPages);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder={`Search ${String(instituteType).toLowerCase()}s...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent className="h-40 overflow-y-scroll">
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Counts */}
        <div className="mb-6">
        <p className="text-muted-foreground">
            {loading
            ? "Loading institutes..."
            : `Showing ${page} of ${institutes.length} Total ${String(instituteType).toLowerCase()} results (${pagination.totalItems})`}
        </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {institutes.map((inst) => (
            <InstituteCard key={inst.id} {...inst} />
          ))}
        </div>

        {/* Empty */}
        {!loading && institutes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No {String(instituteType).toLowerCase()} found matching your
              criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setSelectedCity("all");
                setPage(1);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pagination ✅ */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              disabled={safePage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              Page {safePage} of {totalPages}
            </span>

            <Button
              variant="outline"
              disabled={safePage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
