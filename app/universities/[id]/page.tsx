"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { MapPin, Star, Users, Building2, Award, Phone, Mail, Globe, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function UniversityDetail() {
  const params = useParams();
  const id = params.id as string;

  // Sample data - in real app, fetch based on id
  const university = {
    name: "NUST - National University of Sciences and Technology",
    type: "Public Engineering University",
    location: "Islamabad, Pakistan",
    founded: "1991",
    affiliation: "HEC Recognized",
    rating: 4.8,
    reviews: 450,
    students: 15000,
    faculty: 800,
    campuses: 3,
    programs: [
      "BS Computer Science",
      "BS Electrical Engineering",
      "BS Mechanical Engineering",
      "BS Civil Engineering",
      "BS Software Engineering",
      "MBA",
      "MS Computer Science",
      "PhD Engineering",
    ],
    facilities: [
      "State-of-the-art Labs",
      "Digital Library",
      "Sports Complex",
      "Hostels",
      "Medical Center",
      "Cafeteria",
      "Transport",
      "Wi-Fi Campus",
    ],
    rankings: [
      { title: "QS Asia Rankings", rank: "#72" },
      { title: "HEC Ranking (Engineering)", rank: "#1" },
      { title: "Times Higher Education", rank: "401-500" },
    ],
    contact: {
      phone: "+92 51 9085 5000",
      email: "info@nust.edu.pk",
      website: "www.nust.edu.pk",
    },    
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12 px-4">
        <div className="container mx-auto">
          <Link href="/universities">
            <Button variant="ghost" className="mb-4 text-primary-foreground hover:bg-primary-foreground/20">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Universities
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-white p-4 rounded-lg">
              <div className="w-24 h-24 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-4xl font-bold text-primary-foreground">NU</span>
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{university.name}</h1>
              <p className="text-primary-foreground/90 mb-4">{university.type}</p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{university.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>Founded {university.founded}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span>{university.rating} ({university.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link href="/admissions">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                  Apply Now
                </Button>
              </Link>
              <Button variant="outline" className="bg-white hover:bg-white/90 text-primary border-0">
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
                {university.students.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">
                {university.faculty}
              </div>
              <div className="text-sm text-muted-foreground">Faculty Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">
                {university.campuses}
              </div>
              <div className="text-sm text-muted-foreground">Campuses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">
                {university.programs.length}+
              </div>
              <div className="text-sm text-muted-foreground">Programs</div>
            </div>
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
                <h2 className="text-2xl font-bold mb-4">About {university.name}</h2>
                <p className="text-muted-foreground mb-6">
                  NUST is Pakistan's premier institution for science and technology education. 
                  Founded in 1991, it has consistently ranked as the top engineering university 
                  in Pakistan and among the best in Asia. The university offers world-class 
                  education with state-of-the-art facilities and highly qualified faculty.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Key Information</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">{university.type}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Founded:</span>
                        <span className="font-medium">{university.founded}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Affiliation:</span>
                        <span className="font-medium">{university.affiliation}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Total Students:</span>
                        <span className="font-medium">{university.students.toLocaleString()}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Admission Requirements</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• FSc Pre-Engineering / A-Levels (for Engineering)</li>
                      <li>• Minimum 70% marks</li>
                      <li>• NUST Entry Test required</li>
                      <li>• SAT/SAT Subject Tests (optional)</li>
                      <li>• Personal Statement</li>
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {university.programs.map((program, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <h3 className="font-semibold mb-2">{program}</h3>
                      <Link href="/admissions">
                        <Button variant="link" className="p-0 h-auto text-primary">
                          View Details →
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facilities">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Campus Facilities</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {university.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-sm">{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rankings">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Rankings & Achievements</h2>
                <div className="space-y-4">
                  {university.rankings.map((ranking, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{ranking.title}</h3>
                        <p className="text-sm text-muted-foreground">International Ranking</p>
                      </div>
                      <Badge className="bg-accent text-accent-foreground text-lg px-4 py-2">
                        {ranking.rank}
                      </Badge>
                    </div>
                  ))}
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
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground">{university.contact.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">{university.contact.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <Globe className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Website</h3>
                      <a href="#" className="text-primary hover:underline">
                        {university.contact.website}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-muted-foreground">{university.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}