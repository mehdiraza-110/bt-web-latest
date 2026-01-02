"use client";

import { useParams } from "next/navigation";
import {
  Calendar,
  BookOpen,
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Award,
  Building2,
  Phone,
  Mail,
  Globe,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { fetchAdmissionById } from "@/app/apis/admissions";
import { useEffect, useState } from "react";

export default function AdmissionDetail() {
  const params = useParams();
  const id = params.id as string;

  const [admission, setAdmission] = useState(null);

  useEffect(() => {
    getAdmissionById();
  }, [id]);

  const getAdmissionById = async () => {
    const res = await fetchAdmissionById(id);
    if (res?.success) {
      setAdmission(res?.data?.admission);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12 px-4">
        <div className="container mx-auto">
          <a href="/admissions">
            <Button
              variant="ghost"
              className="mb-4 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admissions
            </Button>
          </a>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-white p-4 rounded-lg">
              <div className="w-24 h-24 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {admission?.program}
              </h1>
              <p className="text-primary-foreground/90 mb-4">
                {admission?.institute}
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <Badge
                  variant="outline"
                  className="bg-white/10 text-white border-white/20"
                >
                  {admission?.field}
                </Badge>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{admission?.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{admission?.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Intake: {admission?.intake}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <a href="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                  Apply Now
                </Button>
              </a>
              <Button
                variant="outline"
                className="bg-white hover:bg-white/90 text-primary border-0"
              >
                Download Prospectus
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-card border-b border-border py-6 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">
                Rs. {admission?.fee}
              </div>
              <div className="text-sm text-muted-foreground">Annual Fee</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">
                Rs. {admission?.totalfee}
              </div>
              <div className="text-sm text-muted-foreground">Total Fee</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">
                {admission?.seats}
              </div>
              <div className="text-sm text-muted-foreground">
                Available Seats
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">
                {admission?.deadline}
              </div>
              <div className="text-sm text-muted-foreground">
                Application Deadline
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="bg-card border-b border-border py-4 px-4">
        <div className="container mx-auto">
          <Badge
            className={
              admission?.status === "Closing Soon"
                ? "bg-red-500 text-white text-lg px-4 py-2"
                : "bg-green-500 text-white text-lg px-4 py-2"
            }
          >
            {admission?.status}
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
            <TabsTrigger value="process">Admission Process</TabsTrigger>
            <TabsTrigger value="program">Program Details</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Program Overview</h2>
                <p className="text-muted-foreground mb-6">
                  {admission?.program} at {admission?.institute} is a{" "}
                  {admission?.duration} program designed to provide
                  comprehensive education and training in{" "}
                  {admission?.field?.toLowerCase()}. This program offers
                  excellent career prospects and is recognized nationally and
                  internationally.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">
                      Key Information
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">
                          Institute:
                        </span>
                        <span className="font-medium">
                          {admission?.institute}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Program:</span>
                        <span className="font-medium">
                          {admission?.program}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">
                          {admission?.duration}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Field:</span>
                        <span className="font-medium">{admission?.field}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{admission?.city}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Intake:</span>
                        <span className="font-medium">{admission?.intake}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">
                          Available Seats:
                        </span>
                        <span className="font-medium">{admission?.seats}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">
                      Fee Structure
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">
                          Annual Fee:
                        </span>
                        <span className="font-medium">
                          Rs. {admission?.fee}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Program Fee:
                        </span>
                        <span className="font-medium">
                          Rs. {admission?.totalfee}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">
                          Application Deadline:
                        </span>
                        <span className="font-medium text-red-600">
                          {admission?.deadline}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge
                          className={
                            admission?.status === "Closing Soon"
                              ? "bg-red-500 text-white"
                              : "bg-green-500 text-white"
                          }
                        >
                          {admission?.status}
                        </Badge>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="eligibility">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  Eligibility Criteria
                </h2>
                <div className="space-y-3 mb-6">
                  {admission?.eligibility?.map(
                    (requirement: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 border border-border rounded-lg"
                      >
                        <Award className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">{requirement}</span>
                      </div>
                    )
                  )}
                </div>

                <h3 className="font-semibold text-lg mb-3">
                  Required Documents
                </h3>
                <div className="space-y-2">
                  {admission?.requirements?.map(
                    (requirement: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                      >
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{requirement}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="process">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Admission Process</h2>
                <div className="space-y-4">
                  {admission?.admissionprocess?.map(
                    (step: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 border-l-4 border-primary bg-muted rounded-lg"
                      >
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{step}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <h3 className="font-semibold mb-2">
                    Need Help with Application?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our team can guide you through the entire admission process
                    and help you prepare all required documents.
                  </p>
                  <a href="/contact">
                    <Button className="bg-primary hover:bg-primary/90">
                      Get Application Help
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="program">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Program Details</h2>
                <div className="space-y-3 mb-6">
                  {admission?.programdetails?.map(
                    (detail: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-muted rounded-lg"
                      >
                        <BookOpen className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </div>
                    )
                  )}
                </div>

                <h3 className="font-semibold text-lg mb-3">
                  Career Opportunities
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {admission?.careeropportunities?.map(
                    (career: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 border border-border rounded-lg"
                      >
                        <Users className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{career}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <Building2 className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Institute</h3>
                      <p className="text-muted-foreground">
                        {admission?.institute}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        {admission?.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground">
                        {admission?.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">
                        {admission?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <Globe className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Website</h3>
                      <a
                        href={`https://${admission?.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {admission?.website}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Still Have Questions?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contact our team for personalized guidance on admissions and
                    program selection.
                  </p>
                  <a href="/contact">
                    <Button className="bg-primary hover:bg-primary/90">
                      Contact Our Team
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
