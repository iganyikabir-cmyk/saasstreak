// Minimal renderer for the lightweight markdown used in src/data/blog.ts
// (## headings, "- " bullet lists, blank-line-separated paragraphs). Swap
// for a full markdown library if blog content grows beyond this subset.

export function MarkdownContent({ content }: { content: string }) {
  const blocks = content.split("\n\n");

  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="mt-4 text-xl font-semibold text-foreground">
              {block.replace("## ", "")}
            </h2>
          );
        }
        if (block.split("\n").every((line) => line.startsWith("- "))) {
          const items = block.split("\n").map((line) => line.replace("- ", ""));
          return (
            <ul key={i} className="list-disc space-y-1.5 pl-5">
              {items.map((item) => (
                <li key={item} className="text-foreground-muted">{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="leading-relaxed text-foreground-muted">
            {block}
          </p>
        );
      })}
    </div>
  );
}
