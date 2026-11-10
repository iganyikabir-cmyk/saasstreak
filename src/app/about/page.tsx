import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Users2,
  Star,
  Scale,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { blogPosts, categories, comparisons, software } from "@/lib/queries";

export const metadata: Metadata = buildMetadata({
  title: "About SaaStreak",
  description:
    "SaaStreak helps freelancers, consultants, and small businesses compare software with independent reviews, pricing breakdowns, and buying guides.",
  path: "/about",
});

const offerings = [
  { icon: Star, title: "Independent Reviews", desc: "Software profiles covering features, pricing, pros and cons, and who each product is best for." },
  { icon: Scale, title: "Side-by-Side Comparisons", desc: "Head-to-head breakdowns of feature sets, pricing, ease of use, and best-fit use cases." },
  { icon: Sparkles, title: "Guided Recommendations", desc: "Answer a few questions about your budget, team size, and priorities to get a shortlist." },
  { icon: BookOpen, title: "Buying Guides", desc: "Plain-language guides to help you choose software without overspending." },
];

const values = [
  { icon: ShieldCheck, title: "Editorial independence", desc: "Scores are our own assessment. Affiliate relationships never change a rating or a ranking." },
  { icon: Star, title: "Clear about what a score is", desc: "Our scores are editorial, not an average of user ratings. We say so on every page." },
  { icon: Users2, title: "Built for small teams", desc: "We focus on freelancers, consultants, small agencies, and small businesses." },
];

export default function AboutPage() {
  const stats = [
    { label: "Software profiles", value: software.length },
    { label: "Categories", value: categories.length },
    { label: "Comparisons", value: comparisons.length },
    { label: "Buying guides", value: blogPosts.length },
  ];

  return (
    <Container className="max-w-4xl py-10">
      <Breadcrumbs items={[{ name: "About", href: "/about" }]} />

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        About SaaStreak
      </h1>
      <p className="mt-4 max-w-2xl text-foreground-muted">
        SaaStreak is a software review and comparison site built to help
        freelancers, consultants, small agencies, and small business owners cut
        through marketing noise and choose software with confidence. We combine
        independent reviews, transparent pricing breakdowns, and practical
        buying guides.
      </p>

      {/* Mission */}
      <div className="mt-8 rounded-2xl border border-brand-blue/20 bg-gradient-to-br from-brand-blue/5 to-brand-purple/5 p-6">
        <h2 className="text-sm font-semibold tracking-wide text-brand-blue uppercase">
          Our Mission
        </h2>
        <p className="mt-2 text-foreground-muted">
          Buying business software shouldn&rsquo;t mean wading through sponsored
          listicles and inflated star ratings. Our mission is to give small
          businesses an honest, plain-language way to find software that
          actually fits how they work.
        </p>
      </div>

      {/* What is on the site today */}
      <div className="mt-10 grid grid-cols-2 gap-6 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-xl font-bold text-foreground sm:text-2xl">{stat.value}</p>
            <p className="mt-1 text-xs text-foreground-muted">{stat.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-foreground-muted">
        What is on the site today. We are a new site and we add to this regularly.
      </p>

      {/* What we do */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-foreground">What We Do</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {offerings.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-surface p-5">
              <item.icon size={20} className="text-brand-blue" />
              <h3 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1.5 text-sm text-foreground-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-foreground">How We Work</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {values.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-surface p-5">
              <item.icon size={20} className="text-brand-blue" />
              <h3 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1.5 text-sm text-foreground-muted">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-foreground-muted">
          Read the details in{" "}
          <Link href="/methodology" className="text-brand-blue hover:underline">
            how we rate software
          </Link>{" "}
          and our{" "}
          <Link href="/affiliate-disclosure" className="text-brand-blue hover:underline">
            affiliate disclosure
          </Link>
          .
        </p>
      </section>

      {/* CTA */}
      <section className="mt-14 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-surface-muted p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-base font-semibold text-foreground">Have a question or a product to suggest?</h2>
          <p className="mt-1 text-sm text-foreground-muted">
            We&rsquo;d love to hear from you. Reach out any time.
          </p>
        </div>
        <Link
          href="/contact"
          className="flex shrink-0 items-center gap-1.5 rounded-xl brand-gradient-bg px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
        >
          Contact Us
          <ArrowRight size={15} />
        </Link>
      </section>
    </Container>
  );
}
