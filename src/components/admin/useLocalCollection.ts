"use client";

import { useEffect, useState } from "react";

// Persists admin-created records (drafts of reviews/blog posts) to
// localStorage so the CMS demo feels stateful without a backend. Swap for
// real Supabase writes (see src/lib/supabase) once a project is configured.
export function useLocalCollection<T>(key: string) {
  const [items, setItems] = useState<T[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(items));
    } catch {
      // storage unavailable — admin changes stay in-memory for this session
    }
  }, [key, items, hydrated]);

  function add(item: T) {
    setItems((prev) => [item, ...prev]);
  }

  function remove(predicate: (item: T) => boolean) {
    setItems((prev) => prev.filter((item) => !predicate(item)));
  }

  return { items, add, remove, hydrated };
}
