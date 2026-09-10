"use client";

import { useSearchParams } from "next/navigation";
import { SoftwareCard } from "@/components/SoftwareCard";
import { software as allSoftware, searchSoftware } from "@/lib/queries";

// Reads the `q` search param client-side so this works under
// `output: "export"` (Server Components can't read searchParams in a
// statically-exported build).

export function SoftwareSearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const results = q ? searchSoftware(q) : allSoftware;

  return (
    <>
      {q && (
        <p className="mt-6 text-sm text-foreground-muted">
          {results.length} result{results.length === 1 ? "" : "s"} for &ldquo;{q}&rdquo;
        </p>
      )}

      {results.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((sw) => (
            <SoftwareCard key={sw.id} sw={sw} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-foreground-muted">
          No software matches &ldquo;{q}&rdquo;. Try a different search term.
        </div>
      )}
    </>
  );
}
