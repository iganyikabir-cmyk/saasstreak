import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  viewAllHref,
  viewAllLabel = "View all",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold tracking-wide text-brand-blue uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-xl text-sm text-foreground-muted">{description}</p>
        )}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-brand-blue hover:underline"
        >
          {viewAllLabel}
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
