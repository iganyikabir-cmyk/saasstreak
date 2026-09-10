import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryIcon } from "@/components/CategoryIcon";
import { CategorySoftwareList } from "@/components/CategorySoftwareList";
import { categories, getCategoryBySlug, getSoftwareByCategory } from "@/lib/queries";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return buildMetadata({
    title: category.name,
    description: category.seoDescription,
    path: `/category/${category.slug}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const items = getSoftwareByCategory(category.slug);

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { name: "Categories", href: "/categories" },
          { name: category.name, href: `/category/${category.slug}` },
        ]}
      />

      <div className="mt-4 flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 text-brand-blue">
          <CategoryIcon name={category.icon} size={22} />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Best {category.name}
          </h1>
          <p className="text-sm text-foreground-muted">{category.productCount}+ products tracked</p>
        </div>
      </div>

      <p className="mt-4 max-w-3xl text-foreground-muted">{category.description}</p>

      <Suspense fallback={null}>
        <CategorySoftwareList items={items} categorySlug={category.slug} categoryName={category.name} />
      </Suspense>
    </Container>
  );
}
