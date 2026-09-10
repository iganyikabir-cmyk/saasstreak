import type { ComparisonRow, Software } from "@/lib/types";

export function ComparisonTable({
  title,
  rows,
  softwareA,
  softwareB,
}: {
  title: string;
  rows: ComparisonRow[];
  softwareA: Software;
  softwareB: Software;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="bg-surface-muted">
              <th className="px-4 py-3 text-left font-semibold text-foreground">{title}</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">{softwareA.name}</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">{softwareB.name}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.label}
                className={i % 2 === 0 ? "bg-surface" : "bg-surface-muted/40"}
              >
                <td className="px-4 py-3 font-medium text-foreground-muted">{row.label}</td>
                <td className="px-4 py-3 text-foreground">{row.aValue}</td>
                <td className="px-4 py-3 text-foreground">{row.bValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
