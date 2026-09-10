"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <CheckCircle2 size={18} className="text-emerald-500" />
        You&rsquo;re subscribed — check your inbox for a confirmation email.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Mail size={16} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-foreground-muted" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="h-11 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-sm text-foreground outline-none placeholder:text-foreground-muted focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10"
        />
      </div>
      <button
        type="submit"
        className="h-11 shrink-0 rounded-xl brand-gradient-bg px-5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
      >
        Subscribe
      </button>
    </form>
  );
}
