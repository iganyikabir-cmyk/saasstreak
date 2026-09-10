"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/lib/types";

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-foreground">{faq.question}</span>
              <ChevronDown
                size={16}
                className={`shrink-0 text-foreground-muted transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm text-foreground-muted">{faq.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
