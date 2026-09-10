import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchBar } from "@/components/SearchBar";
import { SoftwareSearchResults } from "@/components/SoftwareSearchResults";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Browse All Software",
  description:
    "Browse and search every software product on SaaSStreak, with verified reviews, pricing, and ratings across every category.",
  path: "/software",
});

export default function SoftwareIndexPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Software", href: "/software" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Browse Software
      </h1>
      <p className="mt-2 max-w-2xl text-foreground-muted">
        Search verified reviews, pricing, and ratings across our full software catalog.
      </p>

      <div className="mt-6 max-w-xl">
        <SearchBar size="lg" placeholder="Search software..." />
      </div>

      <Suspense fallback={null}>
        <SoftwareSearchResults />
      </Suspense>
    </Container>
  );
}
