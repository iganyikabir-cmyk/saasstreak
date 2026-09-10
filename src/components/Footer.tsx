import Link from "next/link";
import { categories } from "@/data/categories";
import { Logo } from "./Logo";

const footerColumns = [
  {
    title: "Categories",
    links: categories
      .slice(0, 6)
      .map((c) => ({ label: c.name, href: `/category/${c.slug}` })),
  },
  {
    title: "Compare",
    links: [
      { label: "HubSpot vs Salesforce", href: "/compare/hubspot-vs-salesforce" },
      { label: "Notion vs ClickUp", href: "/compare/notion-vs-clickup" },
      { label: "Zendesk vs Freshdesk", href: "/compare/zendesk-vs-freshdesk" },
      { label: "All comparisons", href: "/compare" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "AI Recommender", href: "/ai-recommender" },
      { label: "All software", href: "/software" },
      { label: "All categories", href: "/categories" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About SaaSStreak", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Admin dashboard", href: "/admin" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface-muted">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="flex items-center">
              <Logo size={30} showTagline />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-foreground-muted">
              Discover, compare, and choose the right software for your business —
              backed by verified reviews and AI-powered recommendations.
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground-muted transition hover:text-brand-blue"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-foreground-muted sm:flex-row">
          <p>© {new Date().getFullYear()} SaaSStreak. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-brand-blue">Privacy Policy</Link>
            <Link href="#" className="hover:text-brand-blue">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
