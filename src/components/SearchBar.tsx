"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Star } from "lucide-react";
import { searchSoftware } from "@/lib/queries";

export function SearchBar({
  size = "md",
  placeholder = "Search software, e.g. \"CRM\" or \"HubSpot\"",
}: {
  size?: "md" | "lg";
  placeholder?: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchSoftware(query).slice(0, 6), [query]);

  function goToSearch() {
    if (!query.trim()) return;
    router.push(`/software?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  }

  const inputClasses =
    size === "lg"
      ? "h-14 pl-12 pr-4 text-base rounded-2xl"
      : "h-11 pl-10 pr-3 text-sm rounded-xl";

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search
          size={size === "lg" ? 20 : 16}
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-foreground-muted"
        />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "Enter") goToSearch();
            if (e.key === "Escape") setOpen(false);
          }}
          type="text"
          placeholder={placeholder}
          className={`w-full border border-border bg-surface text-foreground placeholder:text-foreground-muted outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 ${inputClasses}`}
        />
      </div>

      {open && query.trim() && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
          {results.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto py-2">
              {results.map((s) => (
                <li key={s.id}>
                  <a
                    href={`/software/${s.slug}`}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-muted"
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${s.logoColor} text-xs font-semibold text-white`}
                    >
                      {s.logoInitial}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {s.name}
                      </span>
                      <span className="block truncate text-xs text-foreground-muted">
                        {s.tagline}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-foreground-muted">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {s.ratings.overall.toFixed(1)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-foreground-muted">
              No software found for &ldquo;{query}&rdquo;
            </div>
          )}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={goToSearch}
            className="w-full border-t border-border px-4 py-2.5 text-left text-sm font-medium text-brand-blue hover:bg-surface-muted"
          >
            See all results for &ldquo;{query}&rdquo;
          </button>
        </div>
      )}
    </div>
  );
}
