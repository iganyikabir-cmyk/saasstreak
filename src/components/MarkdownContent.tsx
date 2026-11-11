// Small renderer for the lightweight markdown used in src/data/blog.ts:
// "## " and "### " headings, "- " bullet lists, pipe tables, "---" rules,
// **bold** text, and blank-line-separated paragraphs. Swap for a full markdown
// library if blog content grows beyond this subset.

import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

export function MarkdownContent({ content }: { content: string }) {
  const blocks = content.split("\n\n");

  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, i) => {
        const lines = block.split("\n");

        if (block.trim() === "---") {
          return <hr key={i} className="my-4 border-border" />;
        }
        if (block.startsWith("### ")) {
          return (
            <h3 key={i} className="mt-2 text-lg font-semibold text-foreground">
              {block.replace("### ", "")}
            </h3>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="mt-4 text-xl font-semibold text-foreground">
              {block.replace("## ", "")}
            </h2>
          );
        }
        if (lines.every((line) => line.startsWith("- "))) {
          return (
            <ul key={i} className="list-disc space-y-1.5 pl-5">
              {lines.map((line, j) => (
                <li key={j} className="text-foreground-muted">
                  {renderInline(line.replace("- ", ""))}
                </li>
              ))}
            </ul>
          );
        }
        if (lines.length > 1 && lines.every((line) => line.trim().startsWith("|"))) {
          const [header, , ...rows] = lines.map(parseTableRow);
          return (
            <div key={i} className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface-muted text-foreground">
                  <tr>
                    {header.map((cell, j) => (
                      <th key={j} className="px-4 py-2.5 font-semibold">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, r) => (
                    <tr key={r} className="border-t border-border text-foreground-muted">
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-2.5">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return (
          <p key={i} className="leading-relaxed text-foreground-muted">
            {renderInline(block)}
          </p>
        );
      })}
    </div>
  );
}
