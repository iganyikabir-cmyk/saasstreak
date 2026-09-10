"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { software } from "@/data/software";
import { buildQuickComparison, type QuickComparison } from "@/lib/compareEngine";

export function QuickCompareWidget() {
  const [aId, setAId] = useState(software[0].id);
  const [bId, setBId] = useState(software[1].id);
  const [result, setResult] = useState<QuickComparison | null>(null);

  function handleCompare() {
    if (aId === bId) return;
    setResult(buildQuickComparison(aId, bId));
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Sparkles size={16} className="text-brand-purple" />
        AI Comparison Assistant
      </div>
      <p className="mt-1 text-sm text-foreground-muted">
        Pick any two products and get an instant side-by-side breakdown.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <select
          value={aId}
          onChange={(e) => setAId(e.target.value)}
          className="h-11 flex-1 rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-brand-blue"
        >
          {software.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <span className="text-xs font-medium text-foreground-muted">vs</span>
        <select
          value={bId}
          onChange={(e) => setBId(e.target.value)}
          className="h-11 flex-1 rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-brand-blue"
        >
          {software.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleCompare}
          className="h-11 shrink-0 rounded-xl brand-gradient-bg px-5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
        >
          Compare
        </button>
      </div>

      {aId === bId && (
        <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">
          Choose two different products to compare.
        </p>
      )}

      {result && (
        <div className="mt-6">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead>
                <tr className="bg-surface-muted">
                  <th className="px-3 py-2.5 text-left font-semibold text-foreground"></th>
                  <th className="px-3 py-2.5 text-left font-semibold text-foreground">{result.softwareA.name}</th>
                  <th className="px-3 py-2.5 text-left font-semibold text-foreground">{result.softwareB.name}</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-surface" : "bg-surface-muted/40"}>
                    <td className="px-3 py-2.5 font-medium text-foreground-muted">{row.label}</td>
                    <td className="px-3 py-2.5 text-foreground">{row.aValue}</td>
                    <td className="px-3 py-2.5 text-foreground">{row.bValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 rounded-xl bg-brand-purple/5 p-4 text-sm text-foreground-muted">
            <span className="font-medium text-foreground">AI verdict: </span>
            {result.verdict}
          </p>
        </div>
      )}
    </div>
  );
}
