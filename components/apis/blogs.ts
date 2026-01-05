import { GetBaseURL } from "./BaseAPI";

export async function fetchBlogs({ 
  page = 1, 
  limit = 10, 
  status = "published",
  search = "" 
}) {
  try {
    const params = new URLSearchParams();

    params.set("page", page.toString());
    params.set("limit", limit.toString());
    params.set("status", status);

    if (search) params.set("search", search);

    const res = await fetch(
      `${GetBaseURL()}/blogs?${params.toString()}`,
      { cache: "no-store" }
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch blogs: ${res.status}`);
    }
    
    const response = await res.json();
    return response;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}

export async function fetchBlogBySlug(slug: string) {
  try {
    const res = await fetch(`${GetBaseURL()}/blogs/slug/${slug}`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch blog: ${res.status}`);
    }
    
    const response = await res.json();
    return response;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
}

export async function fetchBlogById(id: string | number) {
  try {
    const res = await fetch(`${GetBaseURL()}/blogs/${id}`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch blog: ${res.status}`);
    }
    
    const response = await res.json();
    return response;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
}

