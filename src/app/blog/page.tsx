import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { blogPosts } from "@/lib/queries";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog & Software Buying Guides",
  description:
    "SEO-optimized guides, comparisons, and industry trends to help you choose the right business software — from CRM to AI tools.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        SaaSStreak Blog
      </h1>
      <p className="mt-2 max-w-2xl text-foreground-muted">
        Buying guides, software comparisons, and industry trends to help you
        make confident software decisions.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-lg"
          >
            <div className={`h-32 bg-gradient-to-br ${post.coverGradient}`} />
            <div className="flex flex-1 flex-col p-5">
              <span className="text-xs font-semibold tracking-wide text-brand-blue uppercase">
                {post.category}
              </span>
              <h2 className="mt-2 text-base font-semibold text-foreground group-hover:text-brand-blue">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-3 flex-1 text-sm text-foreground-muted">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-foreground-muted">
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {post.readMinutes} min read
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
