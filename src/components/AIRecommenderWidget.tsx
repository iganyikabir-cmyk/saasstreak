"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { categories } from "@/data/categories";
import { recommend, type RecommenderInput, type RecommendationResult } from "@/lib/recommender";
import { RatingStars } from "./RatingStars";

const companySizes: RecommenderInput["companySize"][] = ["1-10", "11-50", "51-200", "201-1000", "1000+"];
const budgets: { value: RecommenderInput["budget"]; label: string }[] = [
  { value: "free", label: "Free / freemium only" },
  { value: "low", label: "Under $50/mo" },
  { value: "mid", label: "$50–$200/mo" },
  { value: "high", label: "$200+/mo" },
  { value: "any", label: "No preference" },
];
const priorities: { value: RecommenderInput["priority"]; label: string }[] = [
  { value: "ease-of-use", label: "Ease of use" },
  { value: "features", label: "Feature depth" },
  { value: "value", label: "Value for money" },
  { value: "support", label: "Customer support" },
];

export function AIRecommenderWidget() {
  const [categorySlug, setCategorySlug] = useState(categories[0].slug);
  const [companySize, setCompanySize] = useState<RecommenderInput["companySize"]>("11-50");
  const [budget, setBudget] = useState<RecommenderInput["budget"]>("any");
  const [priority, setPriority] = useState<RecommenderInput["priority"]>("value");
  const [results, setResults] = useState<RecommendationResult[] | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    // Simulated reasoning delay for the AI-assistant feel — the scoring itself
    // is a deterministic local heuristic (src/lib/recommender.ts) so this works
    // without an external API key.
    setTimeout(() => {
      setResults(recommend({ categorySlug, companySize, budget, priority }));
      setLoading(false);
    }, 700);
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-2 flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6"
      >
        <div>
          <label className="text-sm font-medium text-foreground">What kind of software?</label>
          <select
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-brand-blue"
          >
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Company size</label>
          <select
            value={companySize}
            onChange={(e) => setCompanySize(e.target.value as RecommenderInput["companySize"])}
            className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-brand-blue"
          >
            {companySizes.map((s) => (
              <option key={s} value={s}>{s} employees</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Budget</label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value as RecommenderInput["budget"])}
            className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-brand-blue"
          >
            {budgets.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">What matters most?</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as RecommenderInput["priority"])}
            className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-brand-blue"
          >
            {priorities.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex h-11 items-center justify-center gap-2 rounded-xl brand-gradient-bg text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Analyzing your needs...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Get AI recommendations
            </>
          )}
        </button>
      </form>

      <div className="lg:col-span-3">
        {!results && !loading && (
          <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center">
            <Sparkles size={28} className="text-brand-blue" />
            <p className="mt-3 max-w-xs text-sm text-foreground-muted">
              Answer a few questions and SaaSStreak&rsquo;s recommendation engine will
              rank the best-fit software for your team.
            </p>
          </div>
        )}

        {loading && (
          <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border border-border p-8 text-center">
            <Loader2 size={24} className="animate-spin text-brand-blue" />
            <p className="text-sm text-foreground-muted">Scoring products against your criteria...</p>
          </div>
        )}

        {results && (
          <div className="flex flex-col gap-4">
            {results.map((result, i) => (
              <div
                key={result.software.id}
                className="rounded-2xl border border-border bg-surface p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br brand-gradient-bg text-xs font-bold text-white">
                      #{i + 1}
                    </span>
                    <div>
                      <Link
                        href={`/software/${result.software.slug}`}
                        className="text-sm font-semibold text-foreground hover:text-brand-blue"
                      >
                        {result.software.name}
                      </Link>
                      <RatingStars rating={result.software.ratings.overall} size={12} />
                    </div>
                  </div>
                  <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-xs font-medium text-brand-blue">
                    {result.score}% match
                  </span>
                </div>
                <p className="mt-3 text-sm text-foreground-muted">{result.reasoning}</p>
                <Link
                  href={`/software/${result.software.slug}`}
                  className="mt-3 flex w-fit items-center gap-1 text-sm font-medium text-brand-blue hover:underline"
                >
                  View full review
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
