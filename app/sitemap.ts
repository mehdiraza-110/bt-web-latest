import type { MetadataRoute } from "next";
import { API_BASE_URL, SITE_URL } from "@/lib/seo";

// Hard cap on total sitemap entries (Next.js/Google convention is 50,000 per
// sitemap file; we cap much lower since current content volume is a few
// hundred rows per table — well short of needing a sitemap index).
const MAX_TOTAL_ENTRIES = 5000;
const PAGE_LIMIT = 100;
// Safety cap per content type so a runaway backend (or a bug returning the
// same page forever) can't hang the build.
const MAX_PAGES_PER_TYPE = 50;

type SitemapEntry = MetadataRoute.Sitemap[number];

async function fetchJson(path: string): Promise<any | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      // Sitemap is regenerated on each request/build; no need to cache
      // against a live, frequently-changing content backend.
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.warn(`sitemap: failed to fetch ${path}`, error);
    return null;
  }
}

/**
 * Generic paginated fetch loop shared by all content types. `getItems` and
 * `getTotalPages` adapt to each endpoint's response shape.
 */
async function fetchAllPages<T>(
  buildPath: (page: number) => string,
  getItems: (json: any) => T[] | undefined | null,
  getTotalPages: (json: any) => number | undefined
): Promise<T[]> {
  const items: T[] = [];
  let page = 1;
  let totalPages: number | undefined;

  do {
    const json = await fetchJson(buildPath(page));
    if (!json) break;

    const pageItems = getItems(json) || [];
    items.push(...pageItems);

    if (totalPages === undefined) {
      totalPages = getTotalPages(json);
    }

    if (pageItems.length === 0) break;
    page += 1;
  } while (
    page <= MAX_PAGES_PER_TYPE &&
    (totalPages === undefined || page <= totalPages) &&
    items.length < MAX_TOTAL_ENTRIES
  );

  return items;
}

function safeDate(value: unknown): Date | undefined {
  if (!value) return undefined;
  const d = new Date(value as string);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

async function getBlogEntries(): Promise<SitemapEntry[]> {
  const blogs = await fetchAllPages<any>(
    (page) => `/blogs?status=published&page=${page}&limit=${PAGE_LIMIT}`,
    (json) => json?.data?.blogs,
    (json) => json?.data?.pagination?.totalPages
  );

  return blogs
    .filter((b) => b?.slug)
    .map((b) => ({
      url: `${SITE_URL}/blog/${b.slug}`,
      lastModified: safeDate(b.updated_at) ?? new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
}

// Institute type -> the frontend route section it's shown under.
const INSTITUTE_TYPE_TO_SECTION: Record<string, string> = {
  School: "schools",
  College: "colleges",
  University: "universities",
};

async function getInstituteEntries(): Promise<SitemapEntry[]> {
  // NOTE: /get-institutes has no server-side status filter today (it
  // returns every non-deleted institute regardless of pending/approved/
  // rejected/suspended status), so we filter to "approved" here to avoid
  // publishing unapproved listings in the sitemap.
  const institutes = await fetchAllPages<any>(
    (page) => `/get-institutes?page=${page}&limit=${PAGE_LIMIT}`,
    (json) => json?.data?.institutes,
    (json) => json?.data?.pagination?.totalPages
  );

  return institutes
    .filter((i) => i?.id && i?.status === "approved")
    .map((i) => {
      const section = INSTITUTE_TYPE_TO_SECTION[i.institute_type] || "universities";
      return {
        url: `${SITE_URL}/${section}/${i.id}`,
        lastModified: safeDate(i.updated_at) ?? new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      } satisfies SitemapEntry;
    });
}

async function getAdmissionEntries(): Promise<SitemapEntry[]> {
  const admissions = await fetchAllPages<any>(
    (page) => `/admissions?page=${page}&limit=${PAGE_LIMIT}`,
    (json) => json?.admissions,
    (json) => json?.pagination?.totalPages
  );

  return admissions
    .filter((a) => a?.id)
    .map((a) => ({
      url: `${SITE_URL}/admissions/${a.id}`,
      lastModified: safeDate(a.updated_at) ?? new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: SitemapEntry[] = (
    [
      { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
      { url: `${SITE_URL}/blog`, changeFrequency: "daily", priority: 0.8 },
      { url: `${SITE_URL}/colleges`, changeFrequency: "weekly", priority: 0.8 },
      { url: `${SITE_URL}/schools`, changeFrequency: "weekly", priority: 0.8 },
      { url: `${SITE_URL}/universities`, changeFrequency: "weekly", priority: 0.8 },
      { url: `${SITE_URL}/admissions`, changeFrequency: "weekly", priority: 0.8 },
      { url: `${SITE_URL}/tests`, changeFrequency: "weekly", priority: 0.6 },
      { url: `${SITE_URL}/compare`, changeFrequency: "monthly", priority: 0.5 },
      { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.3 },
    ] as const
  ).map((r) => ({ ...r, lastModified: new Date() }));

  // News, jobs, resources and exam-results all carry the SEO columns on the
  // backend already, but this Next.js app has no corresponding listing/
  // detail routes yet (only blog, colleges/schools/universities, admissions
  // and tests exist under app/) — so there is nothing to link to yet.
  // Once those pages are built, add fetchAllPages() calls for them here the
  // same way as blogs/institutes/admissions below.
  const [blogEntries, instituteEntries, admissionEntries] = await Promise.all([
    getBlogEntries(),
    getInstituteEntries(),
    getAdmissionEntries(),
  ]);

  const dynamicEntries = [...blogEntries, ...instituteEntries, ...admissionEntries];
  const allEntries = [...staticRoutes, ...dynamicEntries];

  return allEntries.slice(0, MAX_TOTAL_ENTRIES);
}
