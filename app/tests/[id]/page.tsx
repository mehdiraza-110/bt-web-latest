"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  Calendar,
  BookOpen,
  FileText,
  Award,
  Clock,
  Users,
  CheckCircle,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getDataById } from "@/components/apis";

type ApiTest = {
  id: number;
  test_name: string;
  test_full_name?: string;
  test_type?: string;
  test_date?: string;
  registration_deadline?: string;
  duration?: string;
  total_marks?: string | number;
  passing_marks?: string | number;
  registration_fee?: string | number;
  official_website?: string;

  test_overview?: string;

  test_structure?: Array<{ name?: string; marks?: any; questions?: any }>;
  test_syllabus?: Array<{ syllabus?: string }>;
  test_eligibility?: Array<{ eligibility?: string }>;
  test_preparation?: Array<{ preparation?: string }>;
  test_important_dates?: Array<{ event?: string; date?: string }>;
};

const formatDate = (iso?: string) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

export default function TestDetail() {
  const params = useParams();
  const id = params.id as string;

  const [test, setTest] = useState<ApiTest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getDataById("/tests", id);
        const fetched: ApiTest = res?.data?.test ?? res?.data ?? res;
        console.log(fetched);
        setTest(fetched);
      } catch (e: any) {
        setError(e?.message || "Failed to load test");
        setTest(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) run();
  }, [id]);

  const icon = useMemo(() => {
    const type = (test?.test_type || "").toLowerCase();
    if (type.includes("law")) return Award;
    if (type.includes("medical")) return BookOpen;
    if (type.includes("engineering")) return FileText;
    return BookOpen;
  }, [test?.test_type]);

  const IconComponent = icon;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-10 w-10 mx-auto mb-3 text-red-500" />
          <p className="text-sm text-muted-foreground mb-4">{error || "Test not found"}</p>
          <a href="/tests">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tests
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12 px-4">
        <div className="container mx-auto">
          <a href="/tests">
            <Button variant="ghost" className="mb-4 text-primary-foreground hover:bg-primary-foreground/20">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tests
            </Button>
          </a>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-white p-4 rounded-lg">
              <div className="bg-primary w-24 h-24 rounded-lg flex items-center justify-center">
                <IconComponent className="h-12 w-12 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{test.test_name}</h1>
              <p className="text-primary-foreground/90 mb-4">{test.test_full_name || ""}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  {test.test_type || "—"}
                </Badge>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Test Date: {formatDate(test.test_date)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Duration: {test.duration || "—"}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <a href="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                  Get Preparation Help
                </Button>
              </a>

              {test.official_website ? (
                <a href={test.official_website} target="_blank" rel="noreferrer">
                  <Button variant="outline" className="bg-white hover:bg-white/90 text-primary border-0 w-full">
                    Official Website
                  </Button>
                </a>
              ) : (
                <Button variant="outline" className="bg-white hover:bg-white/90 text-primary border-0" disabled>
                  Official Website
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-card border-b border-border py-6 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">{test.total_marks ?? "—"}</div>
              <div className="text-sm text-muted-foreground">Total Marks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">{test.passing_marks ?? "—"}</div>
              <div className="text-sm text-muted-foreground">Passing Marks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">{test.duration ?? "—"}</div>
              <div className="text-sm text-muted-foreground">Duration</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">
                {test.registration_fee ? `PKR ${test.registration_fee}` : "—"}
              </div>
              <div className="text-sm text-muted-foreground">Registration Fee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
            <TabsTrigger value="preparation">Preparation</TabsTrigger>
            <TabsTrigger value="dates">Important Dates</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Test Overview</h2>

                <p className="text-muted-foreground mb-6">
                  {test.test_overview ||
                    `${test.test_full_name || test.test_name} is an important entrance test for students.`}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Test Structure</h3>

                    <div className="space-y-3">
                      {(test.test_structure ?? []).map((s, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <span className="font-medium">{s.name || "—"}</span>
                          </div>
                          {/* if you later store questions/marks, show here */}
                          <Badge variant="outline">{s.questions} questions</Badge>
                        </div>
                      ))}

                      {(!test.test_structure || test.test_structure.length === 0) && (
                        <p className="text-sm text-muted-foreground">No structure available.</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Key Information</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Registration Deadline:</span>
                        <span className="font-medium">{formatDate(test.registration_deadline)}</span>
                      </li>

                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Test Date:</span>
                        <span className="font-medium">{formatDate(test.test_date)}</span>
                      </li>

                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{test.duration || "—"}</span>
                      </li>

                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Total Marks:</span>
                        <span className="font-medium">{test.total_marks ?? "—"}</span>
                      </li>

                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Registration Fee:</span>
                        <span className="font-medium">
                          {test.registration_fee ? `PKR ${test.registration_fee}` : "—"}
                        </span>
                      </li>

                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Official Website:</span>
                        {test.official_website ? (
                          <a
                            href={test.official_website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {test.official_website.replace(/^https?:\/\//, "")}
                          </a>
                        ) : (
                          <span className="font-medium">—</span>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="syllabus">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Test Syllabus</h2>

                <div className="space-y-4">
                  {(test.test_syllabus ?? []).map((x, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-sm">{x.syllabus || "—"}</span>
                    </div>
                  ))}

                  {(!test.test_syllabus || test.test_syllabus.length === 0) && (
                    <p className="text-sm text-muted-foreground">No syllabus available.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="eligibility">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Eligibility Criteria</h2>

                <div className="space-y-3">
                  {(test.test_eligibility ?? []).map((x, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 border border-border rounded-lg">
                      <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-sm">{x.eligibility || "—"}</span>
                    </div>
                  ))}

                  {(!test.test_eligibility || test.test_eligibility.length === 0) && (
                    <p className="text-sm text-muted-foreground">No eligibility criteria available.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preparation">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Preparation Tips</h2>

                <div className="space-y-3">
                  {(test.test_preparation ?? []).map((x, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                      <BookOpen className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-sm">{x.preparation || "—"}</span>
                    </div>
                  ))}

                  {(!test.test_preparation || test.test_preparation.length === 0) && (
                    <p className="text-sm text-muted-foreground">No preparation tips available.</p>
                  )}

                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dates">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Important Dates</h2>

                <div className="space-y-4">
                  {(test.test_important_dates ?? []).map((d, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{d.event || "—"}</h3>
                        <p className="text-sm text-muted-foreground">Mark your calendar</p>
                      </div>
                      <Badge className="bg-accent text-accent-foreground text-lg px-4 py-2">
                        {formatDate(d.date)}
                      </Badge>
                    </div>
                  ))}

                  {(!test.test_important_dates || test.test_important_dates.length === 0) && (
                    <p className="text-sm text-muted-foreground">No dates available.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
