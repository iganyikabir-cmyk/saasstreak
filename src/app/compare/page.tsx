import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickCompareWidget } from "@/components/QuickCompareWidget";
import { comparisons, getSoftwareById } from "@/lib/queries";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Software Comparisons",
  description:
    "Compare the top business software products side by side on features, pricing, ease of use, and best use cases.",
  path: "/compare",
});

export default function ComparePage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Compare", href: "/compare" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Software Comparisons
      </h1>
      <p className="mt-2 max-w-2xl text-foreground-muted">
        Head-to-head breakdowns of the software buyers research most, plus an
        AI assistant to compare any two products instantly.
      </p>

      <div className="mt-8">
        <QuickCompareWidget />
      </div>

      <h2 className="mt-14 text-xl font-semibold text-foreground">Featured comparisons</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              <div className="flex items-center gap-3">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${a.logoColor} text-sm font-bold text-white`}>
                  {a.logoInitial}
                </span>
                <span className="text-xs font-semibold text-foreground-muted">VS</span>
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${b.logoColor} text-sm font-bold text-white`}>
                  {b.logoInitial}
                </span>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground group-hover:text-brand-blue">
                {a.name} vs {b.name}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-foreground-muted">{cmp.intro}</p>
              <p className="mt-3 flex items-center gap-1 text-sm font-medium text-brand-blue">
                See full comparison
                <ArrowRight size={14} />
              </p>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
