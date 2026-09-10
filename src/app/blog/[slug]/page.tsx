import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarkdownContent } from "@/components/MarkdownContent";
import { SoftwareCard } from "@/components/SoftwareCard";
import { JsonLd } from "@/components/JsonLd";
import { blogPosts, getBlogPostBySlug, getSoftwareById } from "@/lib/queries";
import { buildMetadata, articleSchema } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.seoDescription,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = post.relatedSoftwareIds
    .map((id) => getSoftwareById(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <Container className="max-w-3xl py-10">
        <Breadcrumbs
          items={[
            { name: "Blog", href: "/blog" },
            { name: post.title, href: `/blog/${post.slug}` },
          ]}
        />

        <span className="mt-4 block text-xs font-semibold tracking-wide text-brand-blue uppercase">
          {post.category}
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-foreground-muted">
          <span>By {post.authorName}</span>
          <span>·</span>
          <span>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.readMinutes} min read
          </span>
        </div>

        <div className={`mt-6 h-56 rounded-2xl bg-gradient-to-br ${post.coverGradient}`} />

        <div className="mt-8">
          <MarkdownContent content={post.content} />
        </div>

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-lg font-semibold text-foreground">Mentioned in this article</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {related.map((sw) => (
                <SoftwareCard key={sw.id} sw={sw} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
