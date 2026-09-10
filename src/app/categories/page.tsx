import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryCard } from "@/components/CategoryCard";
import { categories } from "@/lib/queries";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Software Categories",
  description:
    "Browse every software category on SaaSStreak — CRM, marketing, project management, AI tools, and more. Compare top-rated products in each category.",
  path: "/categories",
});

export default function CategoriesPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Categories", href: "/categories" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Software Categories
      </h1>
      <p className="mt-2 max-w-2xl text-foreground-muted">
        Browse verified reviews and comparisons across every major software
        category, from CRM to AI tools.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </Container>
  );
}
