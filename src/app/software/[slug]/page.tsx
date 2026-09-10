import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, X, ExternalLink, Star } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RatingStars } from "@/components/RatingStars";
import { PricingTable } from "@/components/PricingTable";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ReviewCard } from "@/components/ReviewCard";
import { SoftwareCard } from "@/components/SoftwareCard";
import { JsonLd } from "@/components/JsonLd";
import {
  software,
  getSoftwareBySlug,
  getReviewsBySoftwareId,
  getAlternatives,
  getCategoriesForSoftware,
  getRelatedComparisons,
} from "@/lib/queries";
import { buildMetadata, softwareSchema, faqSchema } from "@/lib/seo";

export function generateStaticParams() {
  return software.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sw = getSoftwareBySlug(slug);
  if (!sw) return {};
  return buildMetadata({
    title: `${sw.name} Reviews, Pricing & Features (2026)`,
    description: sw.overview,
    path: `/software/${sw.slug}`,
  });
}

const ratingRows = (r: { label: string; value: number }[]) => r;

export default async function SoftwarePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sw = getSoftwareBySlug(slug);
  if (!sw) notFound();

  const swReviews = getReviewsBySoftwareId(sw.id);
  const alternatives = getAlternatives(sw);
  const swCategories = getCategoriesForSoftware(sw);
  const relatedComparisons = getRelatedComparisons(sw.id);

  const ratingBreakdown = ratingRows([
    { label: "Ease of Use", value: sw.ratings.easeOfUse },
    { label: "Features", value: sw.ratings.features },
    { label: "Customer Support", value: sw.ratings.customerSupport },
    { label: "Value for Money", value: sw.ratings.valueForMoney },
  ]);

  return (
    <>
      <JsonLd data={softwareSchema(sw)} />
      <JsonLd data={faqSchema(sw.faqs)} />

      <Container className="py-10">
        <Breadcrumbs
          items={[
            { name: swCategories[0]?.name ?? "Software", href: `/category/${swCategories[0]?.slug ?? ""}` },
            { name: sw.name, href: `/software/${sw.slug}` },
          ]}
        />

        {/* Header */}
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <span
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${sw.logoColor} text-2xl font-bold text-white`}
            >
              {sw.logoInitial}
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{sw.name}</h1>
              <p className="mt-1 text-foreground-muted">{sw.tagline}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <RatingStars rating={sw.ratings.overall} />
                <span className="text-sm text-foreground-muted">({sw.ratings.reviewCount.toLocaleString()} reviews)</span>
                <div className="flex gap-1.5">
                  {swCategories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      className="rounded-full border border-border px-2.5 py-0.5 text-xs text-foreground-muted hover:border-brand-blue hover:text-brand-blue"
                    >
                      {c.shortName}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:w-52">
            <a
              href={sw.website}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex h-11 items-center justify-center gap-1.5 rounded-xl brand-gradient-bg text-sm font-medium text-white shadow-sm transition hover:opacity-90"
            >
              Visit Website
              <ExternalLink size={14} />
            </a>
            <a
              href="#reviews"
              className="flex h-11 items-center justify-center rounded-xl border border-border text-sm font-medium text-foreground transition hover:border-brand-blue hover:text-brand-blue"
            >
              Read Reviews
            </a>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="flex flex-col gap-12 lg:col-span-2">
            {/* Overview */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Overview</h2>
              <p className="mt-3 text-foreground-muted">{sw.overview}</p>
              <p className="mt-3 text-foreground-muted">{sw.description}</p>
              <dl className="mt-5 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-4">
                <div>
                  <dt className="text-xs text-foreground-muted">Founded</dt>
                  <dd className="text-sm font-medium text-foreground">{sw.founded}</dd>
                </div>
                <div>
                  <dt className="text-xs text-foreground-muted">Pricing model</dt>
                  <dd className="text-sm font-medium text-foreground">{sw.pricingModel}</dd>
                </div>
                <div>
                  <dt className="text-xs text-foreground-muted">Starting price</dt>
                  <dd className="text-sm font-medium text-foreground">{sw.startingPrice}</dd>
                </div>
                <div>
                  <dt className="text-xs text-foreground-muted">Best for</dt>
                  <dd className="text-sm font-medium text-foreground">{sw.bestFor}</dd>
                </div>
              </dl>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Features</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {sw.features.map((f) => (
                  <div key={f.title} className="rounded-xl border border-border bg-surface p-4">
                    <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                    <p className="mt-1 text-sm text-foreground-muted">{f.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Screenshots */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Screenshots</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {sw.screenshots.map((shot) => {
                  const gradient = shot.url.replace("gradient:", "");
                  return (
                    <div
                      key={shot.alt}
                      className={`flex aspect-video items-end rounded-xl bg-gradient-to-br ${gradient} p-3`}
                    >
                      <span className="rounded-md bg-black/30 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                        {shot.alt}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Pricing */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Pricing</h2>
              <p className="mt-2 text-sm text-foreground-muted">
                {sw.name} uses a {sw.pricingModel.toLowerCase()} pricing model, starting at {sw.startingPrice}.
              </p>
              <div className="mt-4">
                <PricingTable plans={sw.pricing} />
              </div>
            </section>

            {/* Pros & Cons */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Pros and Cons</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-surface p-5">
                  <h3 className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    <Check size={16} /> Pros
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {sw.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2 text-sm text-foreground-muted">
                        <Check size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-5">
                  <h3 className="flex items-center gap-1.5 text-sm font-semibold text-rose-600 dark:text-rose-400">
                    <X size={16} /> Cons
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {sw.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2 text-sm text-foreground-muted">
                        <X size={14} className="mt-0.5 shrink-0 text-rose-500" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Alternatives */}
            {alternatives.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-foreground">Alternatives to {sw.name}</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {alternatives.map((alt) => (
                    <SoftwareCard key={alt.id} sw={alt} />
                  ))}
                </div>
              </section>
            )}

            {/* Reviews */}
            <section id="reviews">
              <h2 className="text-xl font-semibold text-foreground">
                User Reviews ({swReviews.length})
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {swReviews.length > 0 ? (
                  swReviews.map((review) => <ReviewCard key={review.id} review={review} />)
                ) : (
                  <p className="text-sm text-foreground-muted">No reviews yet — be the first to review {sw.name}.</p>
                )}
              </div>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Frequently Asked Questions</h2>
              <div className="mt-4">
                <FAQAccordion faqs={sw.faqs} />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="text-sm font-semibold text-foreground">Rating Breakdown</h3>
              <div className="mt-4 flex items-center gap-3">
                <span className="text-3xl font-bold text-foreground">{sw.ratings.overall.toFixed(1)}</span>
                <div>
                  <RatingStars rating={sw.ratings.overall} showValue={false} />
                  <p className="text-xs text-foreground-muted">{sw.ratings.reviewCount.toLocaleString()} reviews</p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2.5">
                {ratingBreakdown.map((row) => (
                  <div key={row.label} className="flex items-center gap-3">
                    <span className="w-32 shrink-0 text-xs text-foreground-muted">{row.label}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-muted">
                      <div
                        className="h-full brand-gradient-bg"
                        style={{ width: `${(row.value / 5) * 100}%` }}
                      />
                    </div>
                    <span className="w-8 shrink-0 text-right text-xs font-medium text-foreground">
                      {row.value.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="text-sm font-semibold text-foreground">Ready to try {sw.name}?</h3>
              <p className="mt-1.5 text-sm text-foreground-muted">
                Starting at {sw.startingPrice}. No credit card details shared with SaaSStreak.
              </p>
              <a
                href={sw.website}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 flex h-11 items-center justify-center gap-1.5 rounded-xl brand-gradient-bg text-sm font-medium text-white shadow-sm transition hover:opacity-90"
              >
                Visit Website
                <ExternalLink size={14} />
              </a>
            </div>

            {relatedComparisons.length > 0 && (
              <div className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="text-sm font-semibold text-foreground">Related comparisons</h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {relatedComparisons.map((cmp) => (
                    <li key={cmp.id}>
                      <Link
                        href={`/compare/${cmp.slug}`}
                        className="flex items-center gap-1.5 text-sm text-brand-blue hover:underline"
                      >
                        <Star size={13} />
                        {cmp.slug.replace(/-/g, " ")}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </>
  );
}
