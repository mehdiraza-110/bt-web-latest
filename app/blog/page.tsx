
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Blog() {
  const posts = [
    {
      id: "top-universities-2025",
      title: "Top 10 Universities in Pakistan for 2025",
      excerpt: "Discover the best universities in Pakistan based on rankings, facilities, and student satisfaction.",
      category: "Rankings",
      date: "March 15, 2025",
      author: "Beyond Taleem Team",
      readTime: "5 min read",
    },
    {
      id: "mdcat-preparation-guide",
      title: "Complete MDCAT Preparation Guide",
      excerpt: "Everything you need to know about preparing for MDCAT including study tips, resources, and test strategies.",
      category: "Test Prep",
      date: "March 10, 2025",
      author: "Dr. Ahmed Khan",
      readTime: "8 min read",
    },
    {
      id: "engineering-vs-medical",
      title: "Engineering vs Medical: Which Field is Right for You?",
      excerpt: "A comprehensive comparison to help students make an informed decision about their career path.",
      category: "Career Guidance",
      date: "March 5, 2025",
      author: "Career Counselor",
      readTime: "6 min read",
    },
    {
      id: "scholarship-opportunities",
      title: "Scholarship Opportunities for Pakistani Students",
      excerpt: "Complete guide to scholarships available for undergraduate and graduate studies in Pakistan and abroad.",
      category: "Scholarships",
      date: "February 28, 2025",
      author: "Financial Aid Team",
      readTime: "7 min read",
    },
    {
      id: "admission-process-guide",
      title: "Step-by-Step University Admission Process",
      excerpt: "Navigate the university admission process with our detailed guide covering applications, tests, and interviews.",
      category: "Admissions",
      date: "February 20, 2025",
      author: "Admission Expert",
      readTime: "10 min read",
    },
    {
      id: "best-schools-lahore",
      title: "Best Schools in Lahore: A Comprehensive Review",
      excerpt: "An in-depth look at the top schools in Lahore including facilities, curriculum, and fee structure.",
      category: "Schools",
      date: "February 15, 2025",
      author: "Education Analyst",
      readTime: "6 min read",
    },
  ];

  const categories = ["All", "Rankings", "Test Prep", "Career Guidance", "Scholarships", "Admissions", "Schools"];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Blog & Guides</h1>
          <p className="text-muted-foreground">
            Expert insights, guides, and tips for your educational journey
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <Card className="mb-8 overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-primary to-secondary h-64 md:h-auto flex items-center justify-center">
              <div className="text-center text-primary-foreground p-8">
                <Badge className="bg-accent text-accent-foreground mb-4">Featured</Badge>
                <h3 className="text-2xl font-bold mb-2">Latest Guides & Articles</h3>
                <p className="text-primary-foreground/80">Stay updated with the latest in education</p>
              </div>
            </div>
            <CardContent className="p-6 flex flex-col justify-center">
              <Badge variant="outline" className="w-fit mb-3">{posts[0].category}</Badge>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {posts[0].title}
              </h2>
              <p className="text-muted-foreground mb-4">{posts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{posts[0].date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{posts[0].author}</span>
                </div>
              </div>
              <a href={`/blog/${posts[0].id}`}>
                <Button className="bg-primary hover:bg-primary/90">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </CardContent>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((post) => (
            <a key={post.id} href={`/blog/${post.id}`}>
              <Card className="h-full group hover:shadow-lg transition-all duration-300">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 h-48 flex items-center justify-center">
                  <div className="text-center p-4">
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Want to Contribute?</h2>
          <p className="text-primary-foreground/90 mb-4">
            Share your educational insights and experiences with our community
          </p>
          <a href="/contact">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Submit an Article
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}





