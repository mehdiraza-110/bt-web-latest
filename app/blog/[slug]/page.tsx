import type { Metadata } from "next";
import { fetchBlogBySlug } from "@/components/apis/blogs";
import { buildContentMetadata, truncateDescription } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import BlogDetailClient from "./BlogDetailClient";

async function getBlog(slug: string) {
  try {
    const response = await fetchBlogBySlug(slug);
    return response?.success ? response?.data?.blog ?? null : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return { title: "Blog Post Not Found" };
  }

  return buildContentMetadata({
    seo: blog,
    path: `/blog/${slug}`,
    fallbackTitle: blog.title,
    fallbackDescription: blog.excerpt || truncateDescription(blog.content),
    image: blog.featured_image,
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  return (
    <>
      {blog?.schema_markup && <JsonLd data={blog.schema_markup} />}
      <BlogDetailClient />
    </>
  );
}
