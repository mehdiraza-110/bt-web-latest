"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllData } from "@/components/apis";

type TestItem = {
  id: number | string;
  name: string;
  full_name?: string;
  category?: string;
  test_date?: string;
};

const formatDate = (iso?: string) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function Tests() {
  const [allTests, setAllTests] = useState<TestItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Tests");

  // client-side pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAllTests = async () => {
    try {
      setLoading(true);
      setError("");
      const first = await getAllData(`/get-tests?page=1&limit=${limit}`);
      const firstPagination = first?.data?.pagination;
      const totalPages = firstPagination?.totalPages ?? 1;

      const mapTests = (raw: any[]): TestItem[] =>
        raw.map((t: any) => ({
          id: t.id,
          name: t.test_name,
          full_name: t.test_full_name,
          category: t.test_type,
          test_date: t.test_date,
        }));

      let merged: TestItem[] = [];
      merged = merged.concat(mapTests(first?.data?.tests ?? []));

      for (let p = 2; p <= totalPages; p++) {
        const res = await getAllData(`/get-tests?page=${p}&limit=${limit}`);
        merged = merged.concat(mapTests(res?.data?.tests ?? []));
      }

      setAllTests(merged);
    } catch (e: any) {
      setError(e?.message || "Failed to load tests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTests();
  }, []);

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    allTests.forEach((t) => {
      if (!t.category) return;
      counts[t.category] = (counts[t.category] || 0) + 1;
    });

    const rest = Object.entries(counts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, count]) => ({ name, count }));

    return [{ name: "All Tests", count: allTests.length }, ...rest];
  }, [allTests]);

  const filteredAll = useMemo(() => {
    if (selectedCategory === "All Tests") return allTests;
    return allTests.filter((t) => t.category === selectedCategory);
  }, [allTests, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredAll.length / limit));

  const visibleTests = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredAll.slice(start, start + limit);
  }, [filteredAll, page]);

  const onSelectCategory = (name: string) => {
    setSelectedCategory(name);
    setPage(1);
  };

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">
            General Testing Information
          </h1>
          <p className="text-muted-foreground">
            Complete information about academic and entry tests in Pakistan
          </p>
        </div>

        {loading && (
          <p className="text-sm text-muted-foreground mb-4">Loading tests...</p>
        )}
        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((c) => {
              const isActive = selectedCategory === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => onSelectCategory(c.name)}
                  className="focus:outline-none"
                >
                  <Badge
                    variant={isActive ? "default" : "outline"}
                    className={[
                      "px-4 py-2 cursor-pointer transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "hover:bg-primary hover:text-primary-foreground",
                    ].join(" ")}
                  >
                    {c.name} ({c.count})
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTests.map((test) => (
            <Link key={test.id} href={`/tests/${test.id}`} className="block">
              <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>

                  {test.category && (
                    <Badge variant="outline" className="mb-3 text-xs">
                      {test.category}
                    </Badge>
                  )}

                  <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                    {test.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {test.full_name || ""}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(test.test_date)}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages} • Total: {filteredAll.length}
          </p>

          <div className="flex gap-2">
            <button
              onClick={goPrev}
              disabled={page <= 1 || loading}
              className="px-4 py-2 rounded-lg border disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={goNext}
              disabled={page >= totalPages || loading}
              className="px-4 py-2 rounded-lg border disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
