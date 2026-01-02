

import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, School, GraduationCap, BookOpen, Trophy, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InstituteCard from "@/components/InstituteCard";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const featuredInstitutes = [
    {
      id: "nust-islamabad",
      institute_name: "NUST - National University of Sciences and Technology",
      institute_type: "Engineering University",
      city: "Islamabad",
      rating: 4.8,
      students: 15000,
      category: "universities",
      featured: true,
    },
    {
      id: "aku-karachi",
      institute_name: "Aga Khan University",
      institute_type: "Medical University",
      city: "Karachi",
      rating: 4.9,
      students: 8000,
      category: "universities",
      featured: true,
    },
    {
      id: "lums-lahore",
      institute_name: "LUMS - Lahore University of Management Sciences",
      institute_type: "Business University",
      city: "Lahore",
      rating: 4.7,
      students: 5500,
      category: "universities",
      featured: true,
    },
  ];

  const upcomingTests = [
    { name: "MDCAT", date: "August 2025", icon: BookOpen, category: "Medical" },
    { name: "ECAT", date: "July 2025", icon: BookOpen, category: "Engineering" },
    { name: "NUST Entry Test", date: "June 2025", icon: BookOpen, category: "Engineering" },
    { name: "IELTS", date: "Year Round", icon: BookOpen, category: "Language" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/hero-banner.jpg" 
            alt="Students studying together in an educational environment" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
        </div>
        
        <div className="container mx-auto relative z-10 h-full flex items-center justify-center px-4">
          <div className="max-w-2xl w-full">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-fade-in text-center">
              Explore. Compare. Enroll.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 text-center">
              Discover top schools, colleges, and universities across Pakistan
            </p>

            <div className="bg-white rounded-lg p-2 shadow-xl mb-8">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by institute name, city, or institute_type..."
                    className="pl-10 border-0 focus-visible:ring-0 text-foreground"
                  />
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Search
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/universities">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
                  Explore Institutes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="/admissions">
                <Button size="lg" variant="outline" className="bg-white hover:bg-white/90 text-primary border-0 w-full sm:w-auto">
                  View Admissions
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a href="/schools">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <School className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Schools</h3>
                  <p className="text-muted-foreground text-sm">
                    Primary & Secondary Education
                  </p>
                </CardContent>
              </Card>
            </a>

            <a href="/colleges">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary group-hover:scale-110 transition-all">
                    <BookOpen className="h-8 w-8 text-secondary group-hover:text-white" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Colleges</h3>
                  <p className="text-muted-foreground text-sm">
                    Intermediate & A-Levels
                  </p>
                </CardContent>
              </Card>
            </a>

            <a href="/universities">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:scale-110 transition-all">
                    <GraduationCap className="h-8 w-8 text-accent group-hover:text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Universities</h3>
                  <p className="text-muted-foreground text-sm">
                    Higher Education & Research
                  </p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Institutes */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Institutes</h2>
            <a href="/universities">
              <Button variant="ghost" className="group">
                View All
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredInstitutes.map((institute) => (
              
              <InstituteCard key={institute.id} {...institute} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Universities</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-primary-foreground/80">Colleges</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-primary-foreground/80">Schools</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-primary-foreground/80">Cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Tests */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Upcoming Tests</h2>
            <a href="/tests">
              <Button variant="ghost" className="group">
                View All Tests
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingTests.map((test, index) => (
              <a key={index} href="/tests">
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:scale-110 transition-all">
                      <test.icon className="h-6 w-6 text-secondary group-hover:text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{test.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{test.date}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{test.category}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto text-center">
          <Trophy className="h-16 w-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Are you an Educational Institute?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join Beyond Taleem and reach thousands of students looking for quality education
          </p>
          <a href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Submit Your Institute
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
