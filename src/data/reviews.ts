import type { Review } from "@/lib/types";

// User reviews are not open yet, so there is intentionally no seed data here.
export const reviews: Review[] = [];

export function getReviewsBySoftwareId(softwareId: string): Review[] {
  return reviews.filter((r) => r.softwareId === softwareId);
}
