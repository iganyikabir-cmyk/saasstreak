import type { Metadata } from "next";

export const siteConfig = {
  name: "SaaSStreak",
  tagline: "Discover the Best Software for Your Business",
  url: "https://saasstreak.com",
  description:
    "SaaSStreak is a software review and comparison platform helping businesses find, compare, and choose the right SaaS tools with verified reviews, pricing breakdowns, and AI-powered recommendations.",
};

export function buildMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function softwareSchema(sw: {
  name: string;
  overview: string;
  website: string;
  ratings: { overall: number; reviewCount: number };
  pricing: { price: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: sw.name,
    description: sw.overview,
    applicationCategory: "BusinessApplication",
    url: sw.website,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: sw.ratings.overall,
      reviewCount: sw.ratings.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      price: sw.pricing[0]?.price?.replace(/[^0-9.]/g, "") || "0",
      priceCurrency: "USD",
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(post: {
  title: string;
  seoDescription: string;
  authorName: string;
  publishedAt: string;
  updatedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription,
    author: { "@type": "Organization", name: post.authorName },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}
