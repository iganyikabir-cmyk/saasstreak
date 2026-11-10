import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSectionData } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Affiliate Disclosure",
  description:
    "How SaaStreak earns money, what an affiliate link is, and why affiliate relationships never influence our scores or rankings.",
  path: "/affiliate-disclosure",
});

const sections: LegalSectionData[] = [
  {
    heading: "Affiliate Links",
    body: (
      <p>
        Some links on SaaStreak may be affiliate links. If you click one and sign up for or
        buy a product, we may earn a commission from the company. It does not cost you
        anything extra, and the price you pay is the same as if you had gone to the
        company&rsquo;s website directly.
      </p>
    ),
  },
  {
    heading: "Our Independence",
    body: (
      <>
        <p>
          Affiliate relationships do not decide what we write, how we score a product, or
          where it appears. Our scores are our own editorial assessments, explained on the{" "}
          <Link href="/methodology" className="text-brand-blue hover:underline">
            how we rate software
          </Link>{" "}
          page.
        </p>
        <p>
          We may have affiliate relationships with some of the companies we cover and none
          with others. We write about both in the same way, and we will say plainly when a
          product is not the right fit, even if we could earn a commission from it.
        </p>
      </>
    ),
  },
  {
    heading: "Where You Will See Disclosures",
    body: (
      <p>
        We place a short disclosure next to the buttons and links that may earn us a
        commission, such as &ldquo;Visit Website&rdquo; on a software profile, in addition
        to this page. Links that may earn us a commission are marked as sponsored in the
        page code so search engines can tell.
      </p>
    ),
  },
  {
    heading: "Check the Details Yourself",
    body: (
      <p>
        Vendors change features, plans, and prices often. We aim to keep our information
        current, but you should always confirm the details on the vendor&rsquo;s own website
        before you buy.
      </p>
    ),
  },
  {
    heading: "Questions",
    body: (
      <p>
        If you have a question about how SaaStreak makes money or about a specific link,
        email{" "}
        <a href="mailto:hello@saastreak.com" className="text-brand-blue hover:underline">
          hello@saastreak.com
        </a>
        .
      </p>
    ),
  },
];

export default function AffiliateDisclosurePage() {
  return (
    <LegalPage
      title="Affiliate Disclosure"
      path="/affiliate-disclosure"
      lastUpdated="November 10, 2026"
      intro="SaaStreak is free to use. This page explains how the site may earn money, so you can judge our recommendations with full information."
      sections={sections}
    />
  );
}
