import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/lib/types";
import { CategoryIcon } from "./CategoryIcon";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 text-brand-blue">
          <CategoryIcon name={category.icon} size={20} />
        </span>
        <ArrowRight
          size={16}
          className="mt-2 text-foreground-muted opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-foreground">{category.name}</h3>
        <p className="mt-1 text-xs text-foreground-muted">
          {category.productCount}+ products
        </p>
      </div>
    </Link>
  );
}
