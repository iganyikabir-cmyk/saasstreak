import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSectionData } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "The terms that govern your use of SaaSStreak, including rules for reviews, acceptable use, third-party links, and liability.",
  path: "/terms",
});

const sections: LegalSectionData[] = [
  {
    heading: "Acceptance of Terms",
    body: (
      <p>
        By accessing or using SaaSStreak (the &ldquo;Site&rdquo;), you agree to be bound by
        these Terms of Service and our{" "}
        <Link href="/privacy" className="text-brand-blue hover:underline">
          Privacy Policy
        </Link>
        . If you do not agree, please do not use the Site.
      </p>
    ),
  },
  {
    heading: "What SaaSStreak Provides",
    body: (
      <p>
        SaaSStreak is an informational platform offering software reviews, ratings, pricing
        summaries, side-by-side comparisons, buying guides, and AI-assisted recommendations.
        Our content is provided to help you research software and is not professional,
        financial, legal, or purchasing advice.
      </p>
    ),
  },
  {
    heading: "Accuracy of Information",
    body: (
      <p>
        We work to keep listings, features, and pricing accurate, but software vendors change
        their products and prices frequently. Information on the Site may be incomplete or out
        of date, and AI-generated recommendations are based on the details you provide and the
        data we hold. Always confirm pricing and features directly with the vendor before you
        buy.
      </p>
    ),
  },
  {
    heading: "User Reviews and Submissions",
    body: (
      <>
        <p>When you submit a review or other content, you agree that it:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Reflects your genuine, first-hand experience with the product.</li>
          <li>
            Is not false, misleading, defamatory, or posted in exchange for payment or other
            incentive from a vendor or competitor without clear disclosure.
          </li>
          <li>Does not infringe anyone&rsquo;s rights or contain confidential or unlawful material.</li>
        </ul>
        <p>
          You keep ownership of your content, but you grant SaaSStreak a non-exclusive,
          worldwide, royalty-free license to display, reproduce, and distribute it on the Site
          and in related promotion. We may moderate, edit for formatting, decline, or remove
          any submission at our discretion.
        </p>
      </>
    ),
  },
  {
    heading: "Acceptable Use",
    body: (
      <>
        <p>You agree not to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Post fake reviews or manipulate ratings, rankings, or votes.</li>
          <li>Scrape, copy, or republish substantial portions of the Site without permission.</li>
          <li>Attempt to disrupt, overload, or gain unauthorized access to the Site or its systems.</li>
          <li>Use the Site to send spam or to harass, abuse, or impersonate others.</li>
          <li>Use the Site in violation of any applicable law.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "Third-Party Links and Vendors",
    body: (
      <p>
        The Site links to third-party vendor websites. We do not control and are not
        responsible for their content, products, or practices, and any dealings you have with
        a vendor are solely between you and that vendor. Some links may be affiliate links,
        meaning SaaSStreak may earn a commission if you purchase through them, at no extra
        cost to you. Commercial relationships do not buy better ratings or rankings.
      </p>
    ),
  },
  {
    heading: "Intellectual Property",
    body: (
      <p>
        The Site&rsquo;s design, text, graphics, logo, and compilation of content are owned by
        SaaSStreak or its licensors and protected by intellectual property laws. Product names
        and logos belong to their respective owners. You may view and share links to Site
        content for personal, non-commercial use, but may not otherwise reproduce or
        distribute it without our written permission.
      </p>
    ),
  },
  {
    heading: "Disclaimer of Warranties",
    body: (
      <p>
        The Site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
        warranties of any kind, express or implied, including accuracy, fitness for a
        particular purpose, and non-infringement. We do not guarantee that the Site will be
        uninterrupted, error-free, or free of harmful components.
      </p>
    ),
  },
  {
    heading: "Limitation of Liability",
    body: (
      <p>
        To the fullest extent permitted by law, SaaSStreak and its owners, contributors, and
        partners are not liable for any indirect, incidental, special, consequential, or
        punitive damages, or for any loss of profits, data, or business, arising from your use
        of or reliance on the Site or any software you choose based on it.
      </p>
    ),
  },
  {
    heading: "Termination",
    body: (
      <p>
        We may suspend or restrict access to the Site, or remove content, at any time and
        without notice if we believe you have violated these Terms or to protect the Site and
        its users.
      </p>
    ),
  },
  {
    heading: "Changes to These Terms",
    body: (
      <p>
        We may update these Terms from time to time. We will revise the &ldquo;Last
        updated&rdquo; date when we do, and your continued use of the Site after changes take
        effect means you accept the updated Terms.
      </p>
    ),
  },
  {
    heading: "Contact Us",
    body: (
      <p>
        Questions about these Terms? Email{" "}
        <a href="mailto:hello@saasstreak.com" className="text-brand-blue hover:underline">
          hello@saasstreak.com
        </a>{" "}
        or visit our{" "}
        <Link href="/contact" className="text-brand-blue hover:underline">
          Contact page
        </Link>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      path="/terms"
      lastUpdated="October 6, 2026"
      intro="Welcome to SaaSStreak. These Terms of Service set out the rules for using our website, so please read them carefully."
      sections={sections}
    />
  );
}
