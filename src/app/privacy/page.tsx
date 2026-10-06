import type { Metadata } from "next";
import { LegalPage, type LegalSectionData } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How SaaSStreak collects, uses, and protects your information when you browse reviews, subscribe to our newsletter, or contact us.",
  path: "/privacy",
});

const sections: LegalSectionData[] = [
  {
    heading: "Information We Collect",
    body: (
      <>
        <p>We collect only the information needed to run SaaSStreak:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="text-foreground">Information you give us:</strong> your email
            address if you subscribe to our newsletter or contact us, and any name, role,
            company size, and review text you submit when you post a software review.
          </li>
          <li>
            <strong className="text-foreground">Usage data:</strong> basic technical data such
            as pages visited, browser type, device type, and approximate location, collected
            automatically through our hosting provider&rsquo;s server logs.
          </li>
          <li>
            <strong className="text-foreground">Local preferences:</strong> settings such as
            your light/dark theme choice, which are stored in your own browser&rsquo;s local
            storage and are not sent to us.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "How We Use Your Information",
    body: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Publish and moderate reviews and verify their authenticity.</li>
          <li>Send the newsletter you signed up for, and respond to your messages.</li>
          <li>Improve our content, search, comparisons, and recommendation features.</li>
          <li>Keep the site secure and prevent spam, fraud, and abuse.</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </>
    ),
  },
  {
    heading: "Reviews and Public Content",
    body: (
      <p>
        Reviews you submit, including the display name, role, and company size you provide,
        may be shown publicly on SaaSStreak. Please do not include confidential or sensitive
        information in a review. To request removal or correction of a review you wrote,
        contact us at the address below.
      </p>
    ),
  },
  {
    heading: "Cookies and Similar Technologies",
    body: (
      <p>
        SaaSStreak uses browser local storage for essential preferences such as your theme
        selection. We do not use advertising cookies. If we add analytics tools in the
        future, we will update this policy and, where required, ask for your consent.
      </p>
    ),
  },
  {
    heading: "Sharing Your Information",
    body: (
      <>
        <p>We share information only in limited circumstances:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            With service providers that help us operate the site, such as hosting (Google
            Firebase) and email delivery, who may only use it to provide their services to us.
          </li>
          <li>When required by law, legal process, or to protect the rights and safety of others.</li>
          <li>
            In connection with a merger, acquisition, or sale of assets, in which case we will
            notify you of any change in how your information is handled.
          </li>
        </ul>
        <p>
          When you click through to a vendor&rsquo;s website from a SaaSStreak listing, that
          vendor&rsquo;s own privacy policy applies to anything you share with them.
        </p>
      </>
    ),
  },
  {
    heading: "Data Retention and Security",
    body: (
      <p>
        We keep personal information only as long as needed for the purposes described above
        or as required by law. We use reasonable technical and organizational measures to
        protect your information, but no method of transmission or storage is completely
        secure, so we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    heading: "Your Rights and Choices",
    body: (
      <>
        <p>
          Depending on where you live, you may have the right to access, correct, delete, or
          export your personal information, or to object to or restrict certain processing.
          You can unsubscribe from our newsletter at any time using the link in any email.
        </p>
        <p>To exercise any of these rights, contact us using the details below.</p>
      </>
    ),
  },
  {
    heading: "Children’s Privacy",
    body: (
      <p>
        SaaSStreak is intended for business users and is not directed to children under 16.
        We do not knowingly collect personal information from children. If you believe a
        child has provided us information, please contact us and we will delete it.
      </p>
    ),
  },
  {
    heading: "Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. When we do, we will revise the
        &ldquo;Last updated&rdquo; date at the top of this page. Continued use of SaaSStreak
        after changes means you accept the updated policy.
      </p>
    ),
  },
  {
    heading: "Contact Us",
    body: (
      <p>
        Questions about this policy? Email{" "}
        <a href="mailto:hello@saasstreak.com" className="text-brand-blue hover:underline">
          hello@saasstreak.com
        </a>{" "}
        (Monday to Friday, 9 AM – 6 PM GMT).
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      lastUpdated="October 6, 2026"
      intro="Your privacy matters to us. This Privacy Policy explains what information SaaSStreak collects, how we use it, and the choices you have when you use our website."
      sections={sections}
    />
  );
}
