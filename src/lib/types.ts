// Core domain types — shaped to mirror the Supabase schema (see src/lib/supabase/schema.sql)
// so the local data layer in src/data can be swapped for real Supabase queries later
// without changing component props.

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  seoDescription: string;
  icon: string; // lucide-react icon name
  productCount: number;
}

export interface PricingPlan {
  name: string;
  price: string; // e.g. "$49/mo" or "Free" or "Custom"
  billingNote?: string;
  features: string[];
  highlighted?: boolean;
}

export interface Screenshot {
  url: string;
  alt: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  softwareId: string;
  authorName: string;
  authorRole: string;
  authorCompanySize: "1-10" | "11-50" | "51-200" | "201-1000" | "1000+";
  rating: number; // 1-5
  title: string;
  body: string;
  pros: string;
  cons: string;
  date: string; // ISO date
  verified: boolean;
  helpfulCount: number;
}

export interface RatingBreakdown {
  overall: number;
  easeOfUse: number;
  features: number;
  customerSupport: number;
  valueForMoney: number;
  reviewCount: number;
}

export interface Software {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  logoInitial: string; // fallback logo glyph
  logoColor: string; // tailwind gradient classes
  categorySlugs: string[];
  website: string;
  overview: string;
  description: string;
  features: { title: string; description: string }[];
  pricing: PricingPlan[];
  pricingModel: "Free" | "Freemium" | "Subscription" | "One-time" | "Custom";
  startingPrice: string;
  pros: string[];
  cons: string[];
  screenshots: Screenshot[];
  alternativeIds: string[];
  ratings: RatingBreakdown;
  faqs: FAQ[];
  founded: string;
  bestFor: string;
  trending: boolean;
  featured: boolean;
  spotlight?: boolean;
}

export interface ComparisonRow {
  label: string;
  aValue: string;
  bValue: string;
}

export interface Comparison {
  id: string;
  slug: string; // e.g. "hubspot-vs-salesforce"
  softwareAId: string;
  softwareBId: string;
  intro: string;
  featureRows: ComparisonRow[];
  pricingRows: ComparisonRow[];
  easeOfUseA: number;
  easeOfUseB: number;
  bestUseCaseA: string;
  bestUseCaseB: string;
  verdict: string;
  winnerId: string | null;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  seoDescription: string;
  content: string; // markdown-ish content, rendered as paragraphs/headings
  category: string;
  authorName: string;
  publishedAt: string; // ISO date
  updatedAt: string;
  readMinutes: number;
  coverGradient: string;
  relatedSoftwareIds: string[];
}
