import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export interface Crumb {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbSchema(all.map((c) => ({ name: c.name, url: c.href })))} />
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm">
        {all.map((crumb, i) => {
          const isLast = i === all.length - 1;
          return (
            <span key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={13} className="text-foreground-muted" />}
              {isLast ? (
                <span className="font-medium text-foreground">{crumb.name}</span>
              ) : (
                <Link href={crumb.href} className="text-foreground-muted hover:text-brand-blue">
                  {crumb.name}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
