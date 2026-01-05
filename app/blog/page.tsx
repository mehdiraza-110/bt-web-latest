"use client";

import Link from "next/link";
import { Calendar, User, ArrowRight, Loader2, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { fetchBlogs } from "@/components/apis/blogs";

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  useEffect(() => {
    async function loadBlogs() {
      try {
        setLoading(true);
        const response = await fetchBlogs({
          page,
          limit: 10,
          status: "published",
          search: searchQuery,
        });

        if (response?.success && response?.data?.blogs) {
          setPosts(response.data.blogs);
          setPagination(response.data.pagination || {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 1,
          });
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Error loading blogs:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, [page, searchQuery]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content?.split(" ").length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Blog & Guides</h1>
          <p className="text-muted-foreground">
            Expert insights, guides, and tips for your educational journey
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {posts.length > 0 && (
          <Card className="mb-8 overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-to-br from-primary to-secondary h-64 md:h-auto flex items-center justify-center">
                {posts[0].featured_image ? (
                  <img 
                    src={posts[0].featured_image} 
                    alt={posts[0].title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-primary-foreground p-8">
                    <Badge className="bg-accent text-accent-foreground mb-4">Featured</Badge>
                    <h3 className="text-2xl font-bold mb-2">Latest Guides & Articles</h3>
                    <p className="text-primary-foreground/80">Stay updated with the latest in education</p>
                  </div>
                )}
              </div>
              <CardContent className="p-6 flex flex-col justify-center">
                <Badge variant="outline" className="w-fit mb-3">Featured</Badge>
                <Link href={`/blog/${posts[0].slug}`}>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {posts[0].title}
                  </h2>
                </Link>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {posts[0].excerpt || posts[0].content?.substring(0, 150) + "..."}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(posts[0].created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{posts[0].author_name || "BTaleem Team"}</span>
                  </div>
                </div>
                <Link href={`/blog/${posts[0].slug}`}>
                  <Button className="bg-primary hover:bg-primary/90">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </div>
          </Card>
        )}

        {posts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(1).map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="h-full group hover:shadow-lg transition-all duration-300">
                    {post.featured_image ? (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={post.featured_image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 h-48 flex items-center justify-center">
                        <div className="text-center p-4">
                          <Badge variant="outline">Blog</Badge>
                        </div>
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt || post.content?.substring(0, 100) + "..."}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(post.created_at)}</span>
                        </div>
                        <span>{calculateReadTime(post.content || "")}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>

                <span className="text-sm text-muted-foreground">
                  Page {pagination.page} of {pagination.totalPages}
                </span>

                <Button
                  variant="outline"
                  disabled={page === pagination.totalPages}
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No blogs found. {searchQuery && "Try a different search term."}
            </p>
            {searchQuery && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            )}
          </div>
        )}

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





