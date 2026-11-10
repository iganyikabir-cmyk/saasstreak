import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSectionData } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "How We Rate Software",
  description:
    "What the SaaStreak score means, what we score, where our information comes from, and what to check before you buy.",
  path: "/methodology",
});

const sections: LegalSectionData[] = [
  {
    heading: "What the SaaStreak Score Is",
    body: (
      <p>
        The score on each software profile is our own editorial assessment on a five point
        scale. It is not an average of customer ratings, and we do not present it as one.
      </p>
    ),
  },
  {
    heading: "What We Score",
    body: (
      <>
        <p>Each product gets a score in four areas, plus an overall score:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="text-foreground">Ease of use:</strong> how quickly a small team
            can set the product up and use it day to day.
          </li>
          <li>
            <strong className="text-foreground">Features:</strong> how well the product covers
            the jobs it is meant for.
          </li>
          <li>
            <strong className="text-foreground">Customer support:</strong> the support options
            on offer and how well they appear to serve small customers.
          </li>
          <li>
            <strong className="text-foreground">Value for money:</strong> what you get for the
            price, compared with similar products.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "Where Our Information Comes From",
    body: (
      <p>
        We aim to base product details such as features and pricing on public information
        from the vendor. Vendors change plans and prices often, so details can be out of
        date. Always confirm the current features and pricing on the vendor&rsquo;s own
        website before you buy.
      </p>
    ),
  },
  {
    heading: "User Reviews",
    body: (
      <p>
        SaaStreak does not accept user reviews yet. If we open them in the future, we will
        label them clearly, keep them separate from our editorial score, and explain how
        they are checked.
      </p>
    ),
  },
  {
    heading: "Independence",
    body: (
      <p>
        We may earn a commission from some of the companies we cover. This never changes a
        score or a ranking. Read the full{" "}
        <Link href="/affiliate-disclosure" className="text-brand-blue hover:underline">
          affiliate disclosure
        </Link>
        .
      </p>
    ),
  },
  {
    heading: "Corrections",
    body: (
      <p>
        If you spot an error or an out of date price, please tell us at{" "}
        <a href="mailto:hello@saastreak.com" className="text-brand-blue hover:underline">
          hello@saastreak.com
        </a>{" "}
        and we will review it.
      </p>
    ),
  },
];

export default function MethodologyPage() {
  return (
    <LegalPage
      title="How We Rate Software"
      path="/methodology"
      lastUpdated="November 10, 2026"
      intro="This page explains what the scores on SaaStreak mean and how to use them, so you know exactly what you are looking at."
      sections={sections}
    />
  );
}
