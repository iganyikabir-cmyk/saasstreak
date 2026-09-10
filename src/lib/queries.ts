// Central data-access layer. Every page reads through these functions instead
// of importing src/data directly, so swapping the local seed arrays for real
// Supabase queries (see src/lib/supabase/client.ts + schema.sql) touches one
// file instead of every page.

import { categories, getCategoryBySlug } from "@/data/categories";
import {
  software,
  getSoftwareBySlug,
  getSoftwareById,
  getSoftwareByCategory,
  getFeaturedSoftware,
  getTrendingSoftware,
} from "@/data/software";
import { reviews, getReviewsBySoftwareId } from "@/data/reviews";
import { comparisons, getComparisonBySlug } from "@/data/comparisons";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";

export {
  categories,
  getCategoryBySlug,
  software,
  getSoftwareBySlug,
  getSoftwareById,
  getSoftwareByCategory,
  getFeaturedSoftware,
  getTrendingSoftware,
  reviews,
  getReviewsBySoftwareId,
  comparisons,
  getComparisonBySlug,
  blogPosts,
  getBlogPostBySlug,
};

export function searchSoftware(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return software.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) ||
      s.categorySlugs.some((c) => c.replace(/-/g, " ").includes(q))
  );
}

export function getLatestReviews(limit = 6) {
  return [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
    .map((review) => ({
      review,
      software: getSoftwareById(review.softwareId),
    }))
    .filter((r) => r.software);
}

export function getLatestBlogPosts(limit = 3) {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getAlternatives(sw: { alternativeIds: string[] }) {
  return sw.alternativeIds
    .map((id) => getSoftwareById(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
}

export function getRelatedComparisons(softwareId: string) {
  return comparisons.filter(
    (c) => c.softwareAId === softwareId || c.softwareBId === softwareId
  );
}

export function getCategoriesForSoftware(sw: { categorySlugs: string[] }) {
  return sw.categorySlugs
    .map((slug) => getCategoryBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
}
