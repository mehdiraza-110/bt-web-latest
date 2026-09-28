import type { Metadata } from "next";

// Canonical production site URL.
//
// NOTE: this repo does not define a single source of truth for the
// production domain anywhere (no constant in app/layout.tsx, next.config.ts
// or a committed .env.production). Set NEXT_PUBLIC_SITE_URL in the
// production environment to the real domain; the fallback below is a
// best-effort guess based on the API host (api.beyondtaleem.com) and should
// be confirmed with the team.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.beyondtaleem.com"
).replace(/\/$/, "");

export const SITE_NAME = "Beyond Taleem";

// Server-side API base URL. `components/apis/BaseAPI.ts` falls back to
// localhost/LAN addresses which only make sense for local dev — for
// server-rendered metadata/sitemap generation we want the real public API
// by default.
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://api.beyondtaleem.com"
).replace(/\/$/, "");

/** Shape of the SEO columns shared by blogs/news/jobs/institutes/admissions/resources/exam_results. */
export interface SeoFields {
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string[] | string | null;
  canonical_url?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  schema_markup?: string | null;
}

function toAbsoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function normalizeKeywords(
  keywords: SeoFields["meta_keywords"]
): string[] | undefined {
  if (!keywords) return undefined;
  if (Array.isArray(keywords)) return keywords.length ? keywords : undefined;
  if (typeof keywords === "string") {
    return keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
  }
  return undefined;
}

/**
 * Builds a Next.js `Metadata` object for a content-detail page from its
 * SEO columns, falling back to sensible defaults when a field is empty
 * (e.g. for content types whose SEO columns haven't been migrated in yet).
 */
export function buildContentMetadata({
  seo,
  path,
  fallbackTitle,
  fallbackDescription,
  image,
}: {
  seo?: SeoFields | null;
  path: string;
  fallbackTitle: string;
  fallbackDescription?: string | null;
  image?: string | null;
}): Metadata {
  const title = seo?.meta_title || `${fallbackTitle} | ${SITE_NAME}`;
  const description =
    seo?.meta_description || fallbackDescription || undefined;
  const canonical = seo?.canonical_url
    ? toAbsoluteUrl(seo.canonical_url)
    : toAbsoluteUrl(path);
  const ogTitle = seo?.og_title || seo?.meta_title || fallbackTitle;
  const ogDescription =
    seo?.og_description || seo?.meta_description || fallbackDescription || undefined;
  const keywords = normalizeKeywords(seo?.meta_keywords);

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: SITE_NAME,
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}

/** Truncates a plain-text/HTML snippet to a description-friendly length. */
export function truncateDescription(
  text: string | null | undefined,
  maxLength = 160
): string | undefined {
  if (!text) return undefined;
  const plain = text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!plain) return undefined;
  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength - 1).trimEnd()}…`;
}
