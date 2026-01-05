"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  Share2, 
  Loader2,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { fetchBlogBySlug } from "@/components/apis/blogs";

export default function BlogDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlog() {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await fetchBlogBySlug(slug);
        
        if (response?.success && response?.data?.blog) {
          setBlog(response.data.blog);
        } else {
          setError("Blog not found");
        }
      } catch (err) {
        console.error("Error loading blog:", err);
        setError("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    }

    loadBlog();
  }, [slug]);

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

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  
  const handleShare = (platform: string) => {
    const title = blog?.title || "";
    const url = encodeURIComponent(shareUrl);
    const text = encodeURIComponent(title);

    let shareLink = "";
    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "width=600,height=400");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading blog post...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <p className="text-muted-foreground mb-6">
            {error || "The requested blog post could not be found."}
          </p>
          <Button onClick={() => router.push("/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link href="/blog">
            <Button 
              variant="ghost" 
              className="mb-4 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          <div className="mb-4">
            {blog.status === "published" && (
              <Badge className="bg-accent text-accent-foreground">Published</Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

          {blog.excerpt && (
            <p className="text-lg text-primary-foreground/90 mb-6">
              {blog.excerpt}
            </p>
          )}

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{blog.author_name || "BTaleem Team"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(blog.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{calculateReadTime(blog.content)}</span>
            </div>
            {blog.views > 0 && (
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{blog.views.toLocaleString()} views</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {blog.featured_image && (
        <div className="container mx-auto max-w-4xl px-4 -mt-8">
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src={blog.featured_image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6 md:p-8">
                <div 
                  className="prose prose-lg max-w-none
                    prose-headings:text-foreground 
                    prose-p:text-muted-foreground
                    prose-a:text-primary hover:prose-a:underline
                    prose-strong:text-foreground
                    prose-ul:text-muted-foreground
                    prose-ol:text-muted-foreground
                    prose-blockquote:text-muted-foreground
                    prose-blockquote:border-l-primary
                    prose-code:text-primary
                    prose-pre:bg-muted"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                <Separator className="my-8" />

                {/* Meta Tags */}
                {blog.meta_keywords && blog.meta_keywords.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {blog.meta_keywords.map((keyword: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Buttons */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Share this article
                  </h3>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("facebook")}
                    >
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("twitter")}
                    >
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("linkedin")}
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">About the Author</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">
                      {(blog.author_name || "BT").substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{blog.author_name || "BTaleem Team"}</p>
                    <p className="text-sm text-muted-foreground">Author</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Published:</span>
                    <span className="font-medium">{formatDate(blog.created_at)}</span>
                  </div>
                  {blog.updated_at !== blog.created_at && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Updated:</span>
                      <span className="font-medium">{formatDate(blog.updated_at)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Views:</span>
                    <span className="font-medium">{blog.views.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Read Time:</span>
                    <span className="font-medium">{calculateReadTime(blog.content)}</span>
                  </div>
                </div>

                {blog.canonical_url && (
                  <>
                    <Separator className="my-4" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Canonical URL:</p>
                      <a 
                        href={blog.canonical_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline break-all"
                      >
                        {blog.canonical_url}
                      </a>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Articles CTA */}
        <div className="mt-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Explore More Articles</h2>
          <p className="text-primary-foreground/90 mb-4">
            Discover more educational insights and guides
          </p>
          <Link href="/blog">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              View All Posts
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

