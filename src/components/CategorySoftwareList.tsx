"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SoftwareCard } from "@/components/SoftwareCard";
import type { Software } from "@/lib/types";

// Reads the sort filter from the URL client-side so this works under
// `output: "export"` (Server Components can't read searchParams in a
// statically-exported build) while keeping the filter shareable via URL.

const sortOptions = [
  { value: "top-rated", label: "Top Rated" },
  { value: "free", label: "Free" },
  { value: "freemium", label: "Freemium" },
  { value: "subscription", label: "Subscription" },
] as const;

function sortSoftware(list: Software[], sort: string): Software[] {
  if (sort === "free") return list.filter((s) => s.pricingModel === "Free" || s.pricingModel === "Freemium");
  if (sort === "freemium") return list.filter((s) => s.pricingModel === "Freemium");
  if (sort === "subscription") return list.filter((s) => s.pricingModel === "Subscription");
  return [...list].sort((a, b) => b.ratings.overall - a.ratings.overall);
}

export function CategorySoftwareList({
  items,
  categorySlug,
  categoryName,
}: {
  items: Software[];
  categorySlug: string;
  categoryName: string;
}) {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? "top-rated";
  const sorted = sortSoftware(items, sort);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2">
        {sortOptions.map((opt) => (
          <Link
            key={opt.value}
            href={`/category/${categorySlug}?sort=${opt.value}`}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
              sort === opt.value
                ? "border-brand-blue bg-brand-blue/10 text-brand-blue"
                : "border-border text-foreground-muted hover:border-brand-blue hover:text-brand-blue"
            }`}
          >
            {opt.label}
          </Link>
        ))}
      </div>

      {sorted.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((sw) => (
            <SoftwareCard key={sw.id} sw={sw} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-foreground-muted">
          No listings match this filter yet. New {categoryName.toLowerCase()} reviews are added weekly —{" "}
          <Link href="/categories" className="text-brand-blue hover:underline">
            browse other categories
          </Link>
          .
        </div>
      )}
    </>
  );
}
