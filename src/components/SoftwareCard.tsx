import Link from "next/link";
import { Flame, TrendingUp } from "lucide-react";
import type { Software } from "@/lib/types";
import { RatingStars } from "./RatingStars";

export function SoftwareCard({ sw }: { sw: Software }) {
  return (
    <Link
      href={`/software/${sw.slug}`}
      className={`group flex flex-col rounded-2xl border bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-lg ${
        sw.spotlight
          ? "border-brand-purple/40 ring-1 ring-brand-purple/15 hover:border-brand-purple/60"
          : "border-border hover:border-brand-blue/40"
      }`}
    >
      <div className="flex items-start justify-between">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${sw.logoColor} text-base font-bold text-white`}
        >
          {sw.logoInitial}
        </span>
        {sw.spotlight ? (
          <span className="flex items-center gap-1 rounded-full brand-gradient-bg px-2 py-1 text-[11px] font-medium text-white">
            <Flame size={11} />
            Most Talked About
          </span>
        ) : (
          sw.trending && (
            <span className="flex items-center gap-1 rounded-full bg-brand-purple/10 px-2 py-1 text-[11px] font-medium text-brand-purple">
              <TrendingUp size={11} />
              Trending
            </span>
          )
        )}
      </div>

      <h3 className="mt-4 text-base font-semibold text-foreground group-hover:text-brand-blue">
        {sw.name}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-foreground-muted">{sw.tagline}</p>

      <div className="mt-4 flex items-center justify-between">
        <RatingStars rating={sw.ratings.overall} size={13} />
        <span className="text-xs font-medium text-foreground-muted">
          {sw.startingPrice}
        </span>
      </div>
    </Link>
  );
}
