"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Users, Building2, Award, Phone, Mail, Globe, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { fetchInstituteById } from "@/components/apis/institutes";

export default function UniversityDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.id as string;
  
  // Extract ID from slug (format: institute-name-123)
  const id = slug?.split('-').pop();
  
  const [institute, setInstitute] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadInstitute() {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await fetchInstituteById(id);
        
        if (response?.success && response?.data?.institute) {
          setInstitute(response.data.institute);
        } else {
          setError("Institute not found");
        }
      } catch (err) {
        console.error("Error loading institute:", err);
        setError("Failed to load institute details");
      } finally {
        setLoading(false);
      }
    }

    loadInstitute();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading institute details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !institute) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Institute Not Found</h2>
          <p className="text-muted-foreground mb-6">{error || "The requested institute could not be found."}</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Determine the back link based on institute type
  const getBackLink = (type: string) => {
    const typeMap: Record<string, string> = {
      School: "/schools",
      College: "/colleges",
      University: "/universities",
    };
    return typeMap[type] || "/";
  };

  const backLink = getBackLink(institute.institute_type);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12 px-4">
        <div className="container mx-auto">
          <Link href={backLink}>
            <Button variant="ghost" className="mb-4 text-primary-foreground hover:bg-primary-foreground/20">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {institute.institute_type}s
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-white p-4 rounded-lg">
              {institute.logo ? (
                <div className="relative w-24 h-24">
                  <Image 
                    src={institute.logo} 
                    alt={institute.institute_name}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary-foreground">
                    {institute.institute_name?.substring(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{institute.institute_name}</h1>
              <p className="text-primary-foreground/90 mb-4">
                {institute.legal_status} {institute.institute_type}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{institute.city}, {institute.province}</span>
                </div>
                {institute.establishment_year && (
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>Founded {institute.establishment_year}</span>
                  </div>
                )}
                {institute.recognising_authority && (
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>{institute.recognising_authority}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link href="/admissions">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                  Apply Now
                </Button>
              </Link>
              {institute.website && (
                <Button 
                  variant="outline" 
                  className="bg-white hover:bg-white/90 text-primary border-0"
                  onClick={() => window.open(institute.website.startsWith('http') ? institute.website : `https://${institute.website}`, '_blank')}
                >
                  Visit Website
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-card border-b border-border py-6 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {institute.current_enrollment && (
              <div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {institute.current_enrollment.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
            )}
            {(institute.teaching_staff_full_time || institute.teaching_staff_part_time) && (
              <div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {(institute.teaching_staff_full_time || 0) + (institute.teaching_staff_part_time || 0)}
                </div>
                <div className="text-sm text-muted-foreground">Faculty Members</div>
              </div>
            )}
            {institute.student_capacity && (
              <div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {institute.student_capacity.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Capacity</div>
              </div>
            )}
            {institute.number_of_departments && (
              <div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {institute.number_of_departments}
                </div>
                <div className="text-sm text-muted-foreground">Departments</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
            <TabsTrigger value="rankings">Rankings</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About {institute.institute_name}</h2>
                {institute.mission_vision && (
                  <p className="text-muted-foreground mb-6 whitespace-pre-line">
                    {institute.mission_vision}
                  </p>
                )}
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Key Information</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">{institute.legal_status} {institute.institute_type}</span>
                      </li>
                      {institute.establishment_year && (
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Founded:</span>
                          <span className="font-medium">{institute.establishment_year}</span>
                        </li>
                      )}
                      {institute.recognising_authority && (
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Recognition:</span>
                          <span className="font-medium">{institute.recognising_authority}</span>
                        </li>
                      )}
                      {institute.current_enrollment && (
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Total Students:</span>
                          <span className="font-medium">{institute.current_enrollment.toLocaleString()}</span>
                        </li>
                      )}
                      {institute.shift && (
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Shift:</span>
                          <span className="font-medium">{institute.shift}</span>
                        </li>
                      )}
                      {institute.managing_body_name && (
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Managing Body:</span>
                          <span className="font-medium">{institute.managing_body_name}</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Administration</h3>
                    <ul className="space-y-2 text-sm">
                      {institute.head_of_institution && (
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Head of Institution:</span>
                          <span className="font-medium">{institute.head_of_institution}</span>
                        </li>
                      )}
                      {institute.contact_person && (
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Contact Person:</span>
                          <span className="font-medium">{institute.contact_person}</span>
                        </li>
                      )}
                      {institute.contact_person_designation && (
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Designation:</span>
                          <span className="font-medium">{institute.contact_person_designation}</span>
                        </li>
                      )}
                      {institute.street_address && (
                        <li className="flex flex-col gap-1">
                          <span className="text-muted-foreground">Address:</span>
                          <span className="font-medium">
                            {institute.street_address}, {institute.city}, {institute.province}
                            {institute.postal_code && ` - ${institute.postal_code}`}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="programs">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Offered Programs</h2>
                
                {institute.levels_offered && institute.levels_offered.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Education Levels</h3>
                    <div className="flex flex-wrap gap-2">
                      {institute.levels_offered.map((level: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {level}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {institute.programs_offered && institute.programs_offered.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {institute.programs_offered.map((program: any, index: number) => (
                      <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                        <h3 className="font-semibold mb-2">{program.name}</h3>
                        {program.feeStructure && (
                          <p className="text-sm text-muted-foreground mb-2">
                            Fee: {program.feeStructure}
                          </p>
                        )}
                        <Link href="/admissions">
                          <Button variant="link" className="p-0 h-auto text-primary">
                            View Details →
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Program details will be updated soon.</p>
                )}

                {institute.fee_structure && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Fee Structure</h3>
                    <p className="text-sm text-muted-foreground">{institute.fee_structure}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facilities">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Campus Facilities</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold mb-3">Infrastructure</h3>
                    <ul className="space-y-2 text-sm">
                      {institute.building_type && (
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Building Type:</span>
                          <span className="font-medium">{institute.building_type}</span>
                        </li>
                      )}
                      {institute.number_of_classrooms && (
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Classrooms:</span>
                          <span className="font-medium">{institute.number_of_classrooms}</span>
                        </li>
                      )}
                      {institute.library_available && (
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Library:</span>
                          <span className="font-medium">{institute.library_available}</span>
                        </li>
                      )}
                      {institute.computer_labs && (
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Computer Labs:</span>
                          <span className="font-medium">{institute.computer_labs}</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Amenities</h3>
                    <ul className="space-y-2 text-sm">
                      {institute.hostel_facilities && (
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Hostel Facilities:</span>
                          <span className="font-medium">{institute.hostel_facilities}</span>
                        </li>
                      )}
                      {institute.sports_facilities && (
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Sports Facilities:</span>
                          <span className="font-medium">{institute.sports_facilities}</span>
                        </li>
                      )}
                      {institute.non_teaching_staff && (
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Support Staff:</span>
                          <span className="font-medium">{institute.non_teaching_staff}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {institute.library_available === "Yes" && (
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-sm">Digital Library</span>
                    </div>
                  )}
                  {institute.computer_labs === "Yes" && (
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-sm">Computer Labs</span>
                    </div>
                  )}
                  {institute.hostel_facilities === "Yes" && (
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-sm">Hostel</span>
                    </div>
                  )}
                  {institute.sports_facilities === "Yes" && (
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-sm">Sports Complex</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rankings">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Accreditation & Recognition</h2>
                <div className="space-y-4">
                  {institute.recognising_authority && (
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{institute.recognising_authority}</h3>
                        <p className="text-sm text-muted-foreground">Recognising Authority</p>
                      </div>
                      {institute.accreditation_status && (
                        <Badge className="bg-accent text-accent-foreground px-4 py-2">
                          {institute.accreditation_status}
                        </Badge>
                      )}
                    </div>
                  )}

                  {institute.recognition_number && (
                    <div className="p-4 border border-border rounded-lg">
                      <h3 className="font-semibold mb-1">Recognition Details</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                        <div>
                          <span className="text-muted-foreground">Registration Number:</span>
                          <p className="font-medium">{institute.recognition_number}</p>
                        </div>
                        {institute.recognition_year && (
                          <div>
                            <span className="text-muted-foreground">Recognition Year:</span>
                            <p className="font-medium">{institute.recognition_year}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {institute.affiliated_board && (
                    <div className="p-4 border border-border rounded-lg">
                      <h3 className="font-semibold mb-1">Affiliation</h3>
                      <p className="text-sm text-muted-foreground mt-2">{institute.affiliated_board}</p>
                    </div>
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
                  {institute.phone_numbers && (
                    <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                      <Phone className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <p className="text-muted-foreground">{institute.phone_numbers}</p>
                        {institute.fax_number && (
                          <p className="text-sm text-muted-foreground mt-1">Fax: {institute.fax_number}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {institute.email && (
                    <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                      <Mail className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a href={`mailto:${institute.email}`} className="text-primary hover:underline">
                          {institute.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {institute.website && (
                    <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                      <Globe className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Website</h3>
                        <a 
                          href={institute.website.startsWith('http') ? institute.website : `https://${institute.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {institute.website}
                        </a>
                      </div>
                    </div>
                  )}

                  {institute.street_address && (
                    <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Address</h3>
                        <p className="text-muted-foreground">
                          {institute.street_address}<br />
                          {institute.city}, {institute.district}<br />
                          {institute.province}, {institute.country || 'Pakistan'}
                          {institute.postal_code && <><br />Postal Code: {institute.postal_code}</>}
                        </p>
                      </div>
                    </div>
                  )}

                  {institute.social_media_handles && (
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-semibold mb-3">Social Media</h3>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(institute.social_media_handles).map(([platform, handle]: [string, any]) => (
                          <Badge key={platform} variant="outline" className="text-sm">
                            {platform}: {handle}
                          </Badge>
                        ))}
                      </div>
                    </div>
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