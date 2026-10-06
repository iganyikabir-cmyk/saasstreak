import type { ReactNode } from "react";
import { Container } from "./Container";
import { Breadcrumbs } from "./Breadcrumbs";

export interface LegalSectionData {
  heading: string;
  body: ReactNode;
}

export function LegalPage({
  title,
  path,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  path: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSectionData[];
}) {
  return (
    <Container className="max-w-3xl py-10">
      <Breadcrumbs items={[{ name: title, href: path }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="mt-2 text-xs text-foreground-muted">Last updated: {lastUpdated}</p>
      <p className="mt-6 text-foreground-muted">{intro}</p>

      <div className="mt-8 space-y-8">
        {sections.map((section, i) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold text-foreground">
              {i + 1}. {section.heading}
            </h2>
            <div className="mt-2 space-y-3 text-sm leading-relaxed text-foreground-muted">
              {section.body}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
