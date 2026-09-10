import { BadgeCheck, ThumbsUp } from "lucide-react";
import type { Review } from "@/lib/types";
import { RatingStars } from "./RatingStars";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-foreground">{review.authorName}</h4>
            {review.verified && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                <BadgeCheck size={13} />
                Verified
              </span>
            )}
          </div>
          <p className="text-xs text-foreground-muted">
            {review.authorRole} · {review.authorCompanySize} employees
          </p>
        </div>
        <RatingStars rating={review.rating} size={13} />
      </div>

      <h5 className="mt-3 text-sm font-semibold text-foreground">{review.title}</h5>
      <p className="mt-1.5 text-sm text-foreground-muted">{review.body}</p>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <p className="rounded-lg bg-emerald-500/5 p-2.5 text-xs text-foreground-muted">
          <span className="font-medium text-emerald-600 dark:text-emerald-400">Pros: </span>
          {review.pros}
        </p>
        <p className="rounded-lg bg-rose-500/5 p-2.5 text-xs text-foreground-muted">
          <span className="font-medium text-rose-600 dark:text-rose-400">Cons: </span>
          {review.cons}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-foreground-muted">
        <span>{new Date(review.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
        <span className="flex items-center gap-1">
          <ThumbsUp size={12} />
          {review.helpfulCount} found this helpful
        </span>
      </div>
    </div>
  );
}
