import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { software } from "@/data/software";
import { comparisons } from "@/data/comparisons";
import { blogPosts } from "@/data/blog";
import { siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "daily", priority: 1 },
    { url: `${base}/categories`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/software`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/compare`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/blog`, changeFrequency: "daily", priority: 0.7 },
    { url: `${base}/ai-recommender`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/category/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const softwareRoutes: MetadataRoute.Sitemap = software.map((s) => ({
    url: `${base}/software/${s.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${base}/compare/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...softwareRoutes,
    ...comparisonRoutes,
    ...blogRoutes,
  ];
}
