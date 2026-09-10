// Deterministic "AI comparison assistant" — generates a quick side-by-side
// summary for any two products in the catalog, even ones without a curated
// Comparison entry in src/data/comparisons.ts. Swap for a real LLM call later
// by replacing the body of buildQuickComparison while keeping its signature.

import type { Software } from "./types";
import { getSoftwareById } from "@/data/software";

export interface QuickComparisonRow {
  label: string;
  aValue: string;
  bValue: string;
}

export interface QuickComparison {
  softwareA: Software;
  softwareB: Software;
  rows: QuickComparisonRow[];
  verdict: string;
}

export function buildQuickComparison(aId: string, bId: string): QuickComparison | null {
  const softwareA = getSoftwareById(aId);
  const softwareB = getSoftwareById(bId);
  if (!softwareA || !softwareB) return null;

  const rows: QuickComparisonRow[] = [
    { label: "Overall rating", aValue: `${softwareA.ratings.overall.toFixed(1)} / 5`, bValue: `${softwareB.ratings.overall.toFixed(1)} / 5` },
    { label: "Ease of use", aValue: `${softwareA.ratings.easeOfUse.toFixed(1)} / 5`, bValue: `${softwareB.ratings.easeOfUse.toFixed(1)} / 5` },
    { label: "Value for money", aValue: `${softwareA.ratings.valueForMoney.toFixed(1)} / 5`, bValue: `${softwareB.ratings.valueForMoney.toFixed(1)} / 5` },
    { label: "Pricing model", aValue: softwareA.pricingModel, bValue: softwareB.pricingModel },
    { label: "Starting price", aValue: softwareA.startingPrice, bValue: softwareB.startingPrice },
    { label: "Best for", aValue: softwareA.bestFor, bValue: softwareB.bestFor },
  ];

  const aWins = [
    softwareA.ratings.overall > softwareB.ratings.overall,
    softwareA.ratings.valueForMoney > softwareB.ratings.valueForMoney,
  ].filter(Boolean).length;
  const bWins = [
    softwareB.ratings.overall > softwareA.ratings.overall,
    softwareB.ratings.valueForMoney > softwareA.ratings.valueForMoney,
  ].filter(Boolean).length;

  let verdict: string;
  if (aWins > bWins) {
    verdict = `${softwareA.name} edges ahead overall, with a higher rating and stronger value for money. ${softwareB.name} is still worth considering if ${softwareB.bestFor.toLowerCase()}.`;
  } else if (bWins > aWins) {
    verdict = `${softwareB.name} edges ahead overall, with a higher rating and stronger value for money. ${softwareA.name} is still worth considering if ${softwareA.bestFor.toLowerCase()}.`;
  } else {
    verdict = `${softwareA.name} and ${softwareB.name} are closely matched on ratings. The better fit depends on your use case: ${softwareA.name} is best for ${softwareA.bestFor.toLowerCase()}, while ${softwareB.name} is best for ${softwareB.bestFor.toLowerCase()}.`;
  }

  return { softwareA, softwareB, rows, verdict };
}
