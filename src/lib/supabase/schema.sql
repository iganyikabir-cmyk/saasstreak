-- SaaSStreak — Supabase database schema
-- Run against a fresh Supabase Postgres project (SQL Editor or `supabase db push`).
-- This prototype ships with local seed data in src/data/*.ts; wiring src/data/*
-- to these tables (via src/lib/supabase/client.ts) is a drop-in swap once a
-- Supabase project is provisioned.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- User accounts (extends Supabase auth.users)
-- ---------------------------------------------------------------------------
create table if not exists public.user_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'editor', 'admin')),
  company text,
  job_title text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Categories
-- ---------------------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  short_name text not null,
  description text not null,
  seo_description text not null,
  icon text not null default 'layout-grid',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Software listings
-- ---------------------------------------------------------------------------
create table if not exists public.software (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text not null,
  logo_url text,
  website text,
  overview text not null,
  description text not null,
  features jsonb not null default '[]',        -- [{ title, description }]
  pricing jsonb not null default '[]',          -- [{ name, price, billingNote, features[], highlighted }]
  pricing_model text not null default 'Subscription',
  starting_price text,
  pros text[] not null default '{}',
  cons text[] not null default '{}',
  screenshots jsonb not null default '[]',      -- [{ url, alt }]
  faqs jsonb not null default '[]',             -- [{ question, answer }]
  founded text,
  best_for text,
  trending boolean not null default false,
  featured boolean not null default false,
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  created_by uuid references public.user_profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.software_categories (
  software_id uuid references public.software (id) on delete cascade,
  category_id uuid references public.categories (id) on delete cascade,
  primary key (software_id, category_id)
);

create table if not exists public.software_alternatives (
  software_id uuid references public.software (id) on delete cascade,
  alternative_id uuid references public.software (id) on delete cascade,
  primary key (software_id, alternative_id)
);

-- ---------------------------------------------------------------------------
-- Reviews
-- ---------------------------------------------------------------------------
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  software_id uuid not null references public.software (id) on delete cascade,
  user_id uuid references public.user_profiles (id),
  author_name text not null,
  author_role text,
  author_company_size text,
  rating numeric(2,1) not null check (rating >= 1 and rating <= 5),
  title text not null,
  body text not null,
  pros text,
  cons text,
  verified boolean not null default false,
  helpful_count int not null default 0,
  status text not null default 'published' check (status in ('pending', 'published', 'rejected')),
  created_at timestamptz not null default now()
);

-- Materialized rating rollups per software (refresh via trigger or scheduled job)
create table if not exists public.software_ratings (
  software_id uuid primary key references public.software (id) on delete cascade,
  overall numeric(3,2) not null default 0,
  ease_of_use numeric(3,2) not null default 0,
  features numeric(3,2) not null default 0,
  customer_support numeric(3,2) not null default 0,
  value_for_money numeric(3,2) not null default 0,
  review_count int not null default 0,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Comparisons
-- ---------------------------------------------------------------------------
create table if not exists public.comparisons (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  software_a_id uuid not null references public.software (id),
  software_b_id uuid not null references public.software (id),
  intro text not null,
  feature_rows jsonb not null default '[]',   -- [{ label, aValue, bValue }]
  pricing_rows jsonb not null default '[]',
  ease_of_use_a numeric(2,1),
  ease_of_use_b numeric(2,1),
  best_use_case_a text,
  best_use_case_b text,
  verdict text,
  winner_id uuid references public.software (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Blog posts
-- ---------------------------------------------------------------------------
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  seo_description text not null,
  content text not null,
  category text not null,
  author_id uuid references public.user_profiles (id),
  author_name text not null,
  read_minutes int not null default 5,
  cover_url text,
  related_software_ids uuid[] default '{}',
  status text not null default 'published' check (status in ('draft', 'published')),
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Newsletter subscribers
-- ---------------------------------------------------------------------------
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
create index if not exists idx_reviews_software_id on public.reviews (software_id);
create index if not exists idx_software_slug on public.software (slug);
create index if not exists idx_blog_posts_slug on public.blog_posts (slug);
create index if not exists idx_blog_posts_status_published on public.blog_posts (status, published_at desc);
create index if not exists idx_comparisons_slug on public.comparisons (slug);

-- ---------------------------------------------------------------------------
-- Row Level Security — public read on published content, writes via editor/admin
-- ---------------------------------------------------------------------------
alter table public.software enable row level security;
alter table public.categories enable row level security;
alter table public.reviews enable row level security;
alter table public.comparisons enable row level security;
alter table public.blog_posts enable row level security;

create policy "Public can read published software" on public.software
  for select using (status = 'published');

create policy "Public can read categories" on public.categories
  for select using (true);

create policy "Public can read published reviews" on public.reviews
  for select using (status = 'published');

create policy "Anyone can submit a review" on public.reviews
  for insert with check (true);

create policy "Public can read comparisons" on public.comparisons
  for select using (true);

create policy "Public can read published posts" on public.blog_posts
  for select using (status = 'published');

create policy "Editors and admins manage software" on public.software
  for all using (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role in ('editor', 'admin')
    )
  );

create policy "Editors and admins manage blog posts" on public.blog_posts
  for all using (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role in ('editor', 'admin')
    )
  );

create policy "Admins moderate reviews" on public.reviews
  for update using (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role = 'admin'
    )
  );
