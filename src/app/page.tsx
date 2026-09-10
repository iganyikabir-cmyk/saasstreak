import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Users2 } from "lucide-react";
import { Container } from "@/components/Container";
import { SearchBar } from "@/components/SearchBar";
import { CategoryCard } from "@/components/CategoryCard";
import { SoftwareCard } from "@/components/SoftwareCard";
import { ReviewCard } from "@/components/ReviewCard";
import { SectionHeading } from "@/components/SectionHeading";
import { NewsletterForm } from "@/components/NewsletterForm";
import { RatingStars } from "@/components/RatingStars";
import {
  categories,
  getTrendingSoftware,
  getLatestReviews,
  comparisons,
  getSoftwareById,
} from "@/lib/queries";

const stats = [
  { label: "Software reviewed", value: "1,200+" },
  { label: "Verified user reviews", value: "48,000+" },
  { label: "Categories covered", value: "60+" },
  { label: "Monthly buyers helped", value: "310,000+" },
];

export default function HomePage() {
  const trending = getTrendingSoftware();
  const latestReviews = getLatestReviews(3);

  return (
    <div>
      {/* Hero */}
      <section className="hero-glow relative overflow-hidden border-b border-border">
        <Container className="flex flex-col items-center gap-8 py-20 text-center sm:py-28">
          <span className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground-muted">
            <Sparkles size={13} className="text-brand-purple" />
            New: AI-powered software recommendations
          </span>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Discover the{" "}
            <span className="brand-gradient-text">Best Software</span> for
            Your Business
          </h1>

          <p className="max-w-xl text-base text-foreground-muted sm:text-lg">
            Compare verified reviews, pricing, and features across thousands
            of business software products — powered by real users and AI.
          </p>

          <div className="w-full max-w-xl">
            <SearchBar size="lg" />
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-foreground-muted">
              <span>Popular:</span>
              {["CRM", "Project Management", "AI Tools", "E-commerce"].map((tag) => (
                <Link
                  key={tag}
                  href={`/category/${categories.find((c) => c.name.includes(tag.split(" ")[0]))?.slug ?? "ai-tools"}`}
                  className="rounded-full border border-border px-2.5 py-1 hover:border-brand-blue hover:text-brand-blue"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid w-full max-w-2xl grid-cols-2 gap-6 pt-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-xl font-bold text-foreground sm:text-2xl">{stat.value}</p>
                <p className="text-xs text-foreground-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured categories */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Browse"
            title="Featured software categories"
            description="Explore the most-searched software categories, each optimized with verified reviews and pricing breakdowns."
            viewAllHref="/categories"
          />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </Container>
      </section>

      {/* Trending software */}
      <section className="border-y border-border bg-surface-muted py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Trending"
            title="Trending software products"
            description="The tools businesses are researching and switching to most this month."
            viewAllHref="/software"
          />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trending.map((sw) => (
              <SoftwareCard key={sw.id} sw={sw} />
            ))}
          </div>
        </Container>
      </section>

      {/* Latest reviews */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Fresh"
            title="Latest verified reviews"
            description="Real feedback from real buyers, published this month."
            viewAllHref="/software"
            viewAllLabel="Browse all software"
          />
          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {latestReviews.map(({ review, software: sw }) =>
              sw ? (
                <div key={review.id}>
                  <Link
                    href={`/software/${sw.slug}`}
                    className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand-blue"
                  >
                    <span className={`flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br ${sw.logoColor} text-[10px] font-bold text-white`}>
                      {sw.logoInitial}
                    </span>
                    Review of {sw.name}
                  </Link>
                  <ReviewCard review={review} />
                </div>
              ) : null
            )}
          </div>
        </Container>
      </section>

      {/* Comparison section */}
      <section className="border-y border-border bg-surface-muted py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Head to head"
            title="Popular software comparisons"
            description="See exactly how the top tools stack up on features, pricing, and ease of use."
            viewAllHref="/compare"
          />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {comparisons.map((cmp) => {
              const a = getSoftwareById(cmp.softwareAId);
              const b = getSoftwareById(cmp.softwareBId);
              if (!a || !b) return null;
              return (
                <Link
                  key={cmp.id}
                  href={`/compare/${cmp.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-lg"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${a.logoColor} text-sm font-bold text-white`}>
                      {a.logoInitial}
                    </span>
                    <span className="text-xs font-semibold text-foreground-muted">VS</span>
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${b.logoColor} text-sm font-bold text-white`}>
                      {b.logoInitial}
                    </span>
                  </div>
                  <h3 className="mt-4 text-center text-sm font-semibold text-foreground group-hover:text-brand-blue">
                    {a.name} vs {b.name}
                  </h3>
                  <p className="mt-3 flex items-center justify-center gap-1 text-sm font-medium text-brand-blue">
                    See full comparison
                    <ArrowRight size={14} />
                  </p>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Why SaaSStreak */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Verified reviews", desc: "Every review is checked for authenticity — no fake ratings, ever." },
              { icon: Zap, title: "AI-powered matching", desc: "Answer a few questions and get software matched to your exact needs." },
              { icon: Users2, title: "Built for real buyers", desc: "Filter reviews by company size to see feedback from teams like yours." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-surface p-6">
                <item.icon size={22} className="text-brand-blue" />
                <h3 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-sm text-foreground-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border">
        <Container className="flex flex-col items-center gap-6 py-16 text-center sm:py-20">
          <RatingStars rating={4.8} size={16} showValue={false} />
          <h2 className="max-w-lg text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Get the best software deals and reviews in your inbox
          </h2>
          <p className="max-w-md text-sm text-foreground-muted">
            Join 40,000+ buyers getting weekly software buying guides, deal
            alerts, and new comparison reports.
          </p>
          <NewsletterForm />
        </Container>
      </section>
    </div>
  );
}
