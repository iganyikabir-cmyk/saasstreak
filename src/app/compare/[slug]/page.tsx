import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RatingStars } from "@/components/RatingStars";
import { ComparisonTable } from "@/components/ComparisonTable";
import { JsonLd } from "@/components/JsonLd";
import { comparisons, getComparisonBySlug, getSoftwareById } from "@/lib/queries";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cmp = getComparisonBySlug(slug);
  if (!cmp) return {};
  const a = getSoftwareById(cmp.softwareAId);
  const b = getSoftwareById(cmp.softwareBId);
  return buildMetadata({
    title: `${a?.name} vs ${b?.name}: Which Is Better in 2026?`,
    description: cmp.intro,
    path: `/compare/${cmp.slug}`,
  });
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cmp = getComparisonBySlug(slug);
  if (!cmp) notFound();

  const a = getSoftwareById(cmp.softwareAId);
  const b = getSoftwareById(cmp.softwareBId);
  if (!a || !b) notFound();

  const winner = cmp.winnerId ? getSoftwareById(cmp.winnerId) : null;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Compare", url: "/compare" },
          { name: `${a.name} vs ${b.name}`, url: `/compare/${cmp.slug}` },
        ])}
      />
      <Container className="py-10">
        <Breadcrumbs
          items={[
            { name: "Compare", href: "/compare" },
            { name: `${a.name} vs ${b.name}`, href: `/compare/${cmp.slug}` },
          ]}
        />

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {a.name} vs {b.name}: Which Is Better in 2026?
        </h1>
        <p className="mt-4 max-w-3xl text-foreground-muted">{cmp.intro}</p>

        {/* Head-to-head cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[a, b].map((sw) => (
            <div key={sw.id} className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-center gap-3">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${sw.logoColor} text-lg font-bold text-white`}>
                  {sw.logoInitial}
                </span>
                <div>
                  <a
                    href={`/software/${sw.slug}`}
                    className="text-base font-semibold text-foreground hover:text-brand-blue"
                  >
                    {sw.name}
                  </a>
                  <RatingStars rating={sw.ratings.overall} size={13} />
                </div>
              </div>
              <p className="mt-3 text-sm text-foreground-muted">{sw.tagline}</p>
              <p className="mt-2 text-sm font-medium text-foreground">
                Starting at {sw.startingPrice}
              </p>
              <a
                href={sw.website}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 flex h-10 items-center justify-center gap-1.5 rounded-xl border border-border text-sm font-medium text-foreground transition hover:border-brand-blue hover:text-brand-blue"
              >
                Visit {sw.name}
                <ExternalLink size={13} />
              </a>
            </div>
          ))}
        </div>

        {/* Feature comparison */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-foreground">Feature Comparison</h2>
          <div className="mt-4">
            <ComparisonTable title="Feature" rows={cmp.featureRows} softwareA={a} softwareB={b} />
          </div>
        </section>

        {/* Pricing comparison */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">Pricing Comparison</h2>
          <div className="mt-4">
            <ComparisonTable title="Plan" rows={cmp.pricingRows} softwareA={a} softwareB={b} />
          </div>
        </section>

        {/* Ease of use + best use case */}
        <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="text-sm font-semibold text-foreground">Ease of Use</h3>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-foreground-muted">{a.name}</span>
              <RatingStars rating={cmp.easeOfUseA} size={13} />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-foreground-muted">{b.name}</span>
              <RatingStars rating={cmp.easeOfUseB} size={13} />
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="text-sm font-semibold text-foreground">Best Use Case</h3>
            <p className="mt-2 text-sm text-foreground-muted">
              <span className="font-medium text-foreground">{a.name}: </span>
              {cmp.bestUseCaseA}
            </p>
            <p className="mt-2 text-sm text-foreground-muted">
              <span className="font-medium text-foreground">{b.name}: </span>
              {cmp.bestUseCaseB}
            </p>
          </div>
        </section>

        {/* Verdict */}
        <section className="mt-10 rounded-2xl border border-brand-blue/20 bg-gradient-to-br from-brand-blue/5 to-brand-purple/5 p-6">
          <h2 className="text-xl font-semibold text-foreground">Final Verdict</h2>
          <p className="mt-3 text-foreground-muted">{cmp.verdict}</p>
          {winner && (
            <p className="mt-3 text-sm font-medium text-brand-blue">
              Our pick: {winner.name}
            </p>
          )}
        </section>
      </Container>
    </>
  );
}
