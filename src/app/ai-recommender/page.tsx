import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AIRecommenderWidget } from "@/components/AIRecommenderWidget";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AI Software Recommendation Engine",
  description:
    "Answer a few questions and get personalized software recommendations for your business, ranked and explained by SaaSStreak's AI matching engine.",
  path: "/ai-recommender",
});

export default function AIRecommenderPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "AI Recommender", href: "/ai-recommender" }]} />

      <div className="mt-4 flex items-center gap-2">
        <Sparkles size={22} className="text-brand-purple" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          AI Software Recommender
        </h1>
      </div>
      <p className="mt-2 max-w-2xl text-foreground-muted">
        Tell us what you need, and we&rsquo;ll match you against verified
        ratings, pricing, and company-size fit across our software catalog.
      </p>

      <div className="mt-8">
        <AIRecommenderWidget />
      </div>
    </Container>
  );
}
