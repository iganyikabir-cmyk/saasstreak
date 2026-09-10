import type { Metadata } from "next";
import { Mail, Clock, MessageCircle } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with SaaSStreak — questions, feedback, or suggestions for SaaS products to review. We'd love to hear from you.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="max-w-2xl py-10">
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />

      <div className="mt-4 flex items-center gap-2">
        <MessageCircle size={22} className="text-brand-blue" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Contact Us
        </h1>
      </div>

      <p className="mt-4 text-foreground-muted">
        We&rsquo;d love to hear from you! Whether you have questions,
        feedback, or suggestions as regards SaaS products for review, feel
        free to reach out.
      </p>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
            <Mail size={18} />
          </span>
          <div>
            <p className="text-xs text-foreground-muted">Email</p>
            <a
              href="mailto:hello@saasstreak.com"
              className="text-sm font-medium text-foreground hover:text-brand-blue"
            >
              hello@saasstreak.com
            </a>
          </div>
        </div>

        <div className="h-px bg-border" />

        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple">
            <Clock size={18} />
          </span>
          <div>
            <p className="text-xs text-foreground-muted">Support Hours</p>
            <p className="text-sm font-medium text-foreground">
              Monday to Friday, 9 AM – 6 PM (GMT)
            </p>
          </div>
        </div>
      </div>

      <a
        href="mailto:hello@saasstreak.com"
        className="mt-6 flex h-11 w-fit items-center gap-1.5 rounded-xl brand-gradient-bg px-5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
      >
        <Mail size={15} />
        Email SaaSStreak
      </a>

      <p className="mt-10 text-sm text-foreground-muted">
        Thank you for connecting with SaaSStreak!
      </p>
    </Container>
  );
}
