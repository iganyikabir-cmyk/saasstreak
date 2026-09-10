import { Star } from "lucide-react";

export function RatingStars({
  rating,
  size = 14,
  showValue = true,
}: {
  rating: number;
  size?: number;
  showValue?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <Star
              key={i}
              size={size}
              className={filled ? "fill-amber-400 text-amber-400" : "fill-none text-border"}
            />
          );
        })}
      </span>
      {showValue && (
        <span className="text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
      )}
    </span>
  );
}
