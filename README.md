# SaaSStreak

A software review and comparison platform — discover, compare, and choose
business software backed by verified reviews and an AI-powered
recommendation engine.

## Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Backend (wiring point):** Supabase — schema in [`src/lib/supabase/schema.sql`](src/lib/supabase/schema.sql), client in [`src/lib/supabase/client.ts`](src/lib/supabase/client.ts)
- **Data (this prototype):** Local seed data in `src/data/*.ts`, read through `src/lib/queries.ts` so swapping in real Supabase queries only touches one file

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Connecting Supabase

1. Create a Supabase project and run `src/lib/supabase/schema.sql` in the SQL editor.
2. Copy `.env.local.example` to `.env.local` and fill in your project URL and anon key.
3. Migrate the data-access functions in `src/lib/queries.ts` from the local `src/data` arrays to Supabase queries (the shapes already match the schema).

## Site map

- `/` — homepage (hero, categories, trending software, latest reviews, comparisons, newsletter)
- `/categories`, `/category/[slug]` — the 11 core categories with sort/filter
- `/software`, `/software/[slug]` — full catalog + individual review pages (overview, features, pricing, pros/cons, screenshots, alternatives, ratings, reviews, FAQs)
- `/compare`, `/compare/[slug]` — curated comparisons (HubSpot vs Salesforce, Notion vs ClickUp, Zendesk vs Freshdesk) plus an "AI comparison assistant" widget for any two products
- `/blog`, `/blog/[slug]` — SEO-optimized guides and articles
- `/ai-recommender` — AI-powered recommendation wizard
- `/admin` — CMS dashboard (drafts persist to `localStorage` in this prototype)
- `/sitemap.xml`, `/robots.txt` — generated automatically from `src/data`

## Notes on the "AI" features

The recommendation engine and comparison assistant (`src/lib/recommender.ts`,
`src/lib/compareEngine.ts`) are deterministic heuristic scorers, not calls to
an external LLM — this keeps the prototype fully functional without an API
key. Swap the body of either function for a real LLM call (e.g. a server
route proxying to an LLM) without touching any component that uses them.
