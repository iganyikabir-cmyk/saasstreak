// Heuristic recommendation engine for the AI-powered features (recommendation
// wizard, comparison assistant, smart search ranking). It scores the local
// software catalog deterministically so the prototype works with no external
// API key. The scoring function is isolated here so it can be swapped for a
// real LLM call (e.g. an /api/recommend route proxying to an LLM) without
// touching any component.

import type { Software } from "./types";
import { software } from "@/data/software";

export interface RecommenderInput {
  categorySlug: string;
  companySize: "1-10" | "11-50" | "51-200" | "201-1000" | "1000+";
  budget: "free" | "low" | "mid" | "high" | "any";
  priority: "ease-of-use" | "features" | "value" | "support";
}

export interface RecommendationResult {
  software: Software;
  score: number;
  reasoning: string;
}

const budgetToPricingModel: Record<RecommenderInput["budget"], Software["pricingModel"][]> = {
  free: ["Free", "Freemium"],
  low: ["Freemium", "Subscription"],
  mid: ["Subscription", "Freemium"],
  high: ["Subscription", "Custom"],
  any: ["Free", "Freemium", "Subscription", "One-time", "Custom"],
};

export function recommend(input: RecommenderInput): RecommendationResult[] {
  const candidates = software.filter((s) =>
    s.categorySlugs.includes(input.categorySlug)
  );

  const pool = candidates.length > 0 ? candidates : software;

  const scored = pool.map((s) => {
    let score = s.ratings.overall * 10;
    const reasons: string[] = [];

    if (budgetToPricingModel[input.budget].includes(s.pricingModel)) {
      score += 15;
      reasons.push(
        input.budget === "any"
          ? `has flexible ${s.pricingModel.toLowerCase()} pricing`
          : `fits your budget with ${s.pricingModel.toLowerCase()} pricing`
      );
    }

    const priorityScoreMap: Record<RecommenderInput["priority"], number> = {
      "ease-of-use": s.ratings.easeOfUse,
      features: s.ratings.features,
      value: s.ratings.valueForMoney,
      support: s.ratings.customerSupport,
    };
    const priorityScore = priorityScoreMap[input.priority];
    score += priorityScore * 8;
    reasons.push(`scores ${priorityScore.toFixed(1)}/5 on ${input.priority.replace("-", " ")}`);

    if (
      (input.companySize === "1-10" || input.companySize === "11-50") &&
      (s.pricingModel === "Free" || s.pricingModel === "Freemium")
    ) {
      score += 8;
      reasons.push("has a free/low-cost entry point suited to smaller teams");
    }

    if (
      (input.companySize === "201-1000" || input.companySize === "1000+") &&
      s.ratings.features >= 4.4
    ) {
      score += 8;
      reasons.push("feature depth suited to larger organizations");
    }

    if (s.trending) {
      score += 4;
      reasons.push("currently trending among SaaSStreak users");
    }

    const reasonText =
      reasons.length > 1
        ? `${reasons.slice(0, -1).join(", ")}, and ${reasons[reasons.length - 1]}`
        : reasons[0];

    return {
      software: s,
      score: Math.min(99, Math.round(score)),
      reasoning: `${s.name} ${reasonText}.`,
    };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, 3);
}
