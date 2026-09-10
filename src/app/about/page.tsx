import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Users2,
  Star,
  Scale,
  BookOpen,
  Ban,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About SaaSStreak",
  description:
    "SaaSStreak helps businesses discover, compare, and choose the right software through verified reviews and AI-powered recommendations.",
  path: "/about",
});

const stats = [
  { label: "Software reviewed", value: "1,200+" },
  { label: "Verified user reviews", value: "48,000+" },
  { label: "Categories covered", value: "60+" },
  { label: "Monthly buyers helped", value: "310,000+" },
];

const offerings = [
  { icon: Star, title: "Verified Reviews", desc: "Real feedback from real buyers, checked before it's published — filterable by company size and use case." },
  { icon: Scale, title: "Side-by-Side Comparisons", desc: "Head-to-head breakdowns of feature sets, pricing, ease of use, and best-fit use cases for the tools buyers research most." },
  { icon: Sparkles, title: "AI-Powered Recommendations", desc: "Answer a few questions and get ranked software matches based on your budget, team size, and priorities." },
  { icon: BookOpen, title: "Buying Guides & Blog", desc: "SEO-optimized guides, category roundups, and industry trend reporting to help you buy with confidence." },
];

const values = [
  { icon: ShieldCheck, title: "Verified, not vetted for show", desc: "Every review goes through a verification step before publication — we don't let anyone pay to skip it." },
  { icon: Ban, title: "No pay-to-rank listings", desc: "Rankings and ratings reflect real user feedback and product data, not advertising spend." },
  { icon: Users2, title: "Built for real buyers", desc: "We filter and present reviews by company size so a 5-person startup isn't drowned out by enterprise feedback." },
];

export default function AboutPage() {
  return (
    <Container className="max-w-4xl py-10">
      <Breadcrumbs items={[{ name: "About", href: "/about" }]} />

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        About SaaSStreak
      </h1>
      <p className="mt-4 max-w-2xl text-foreground-muted">
        SaaSStreak is a software review and comparison platform built to help
        businesses cut through marketing noise and make confident software
        decisions. We combine verified user reviews, transparent pricing
        breakdowns, and an AI-powered recommendation engine to match buyers
        with the right tools faster.
      </p>

      {/* Mission */}
      <div className="mt-8 rounded-2xl border border-brand-blue/20 bg-gradient-to-br from-brand-blue/5 to-brand-purple/5 p-6">
        <h2 className="text-sm font-semibold tracking-wide text-brand-blue uppercase">
          Our Mission
        </h2>
        <p className="mt-2 text-foreground-muted">
          Buying business software shouldn&rsquo;t mean wading through sponsored
          listicles and inflated star ratings. Our mission is to give every
          business — from solo founders to enterprise teams — an honest,
          data-backed way to find software that actually fits how they work.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-2 gap-6 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-xl font-bold text-foreground sm:text-2xl">{stat.value}</p>
            <p className="mt-1 text-xs text-foreground-muted">{stat.label}</p>
          </div>
        ))}
      </div>

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
      </section>

      {/* CTA */}
      <section className="mt-14 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-surface-muted p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-base font-semibold text-foreground">Have a question or a product to suggest?</h2>
          <p className="mt-1 text-sm text-foreground-muted">
            We&rsquo;d love to hear from you — reach out any time.
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
