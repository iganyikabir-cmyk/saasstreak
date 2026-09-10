"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  FileText,
  Tags,
  Trash2,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { software } from "@/data/software";
import { categories } from "@/data/categories";
import { reviews as seedReviews } from "@/data/reviews";
import { blogPosts as seedBlogPosts } from "@/data/blog";
import { comparisons } from "@/data/comparisons";
import { useLocalCollection } from "./useLocalCollection";
import type { BlogPost, Review } from "@/lib/types";

type Tab = "overview" | "software" | "reviews" | "blog" | "categories";

const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "software", label: "Software", icon: Package },
  { id: "reviews", label: "Reviews", icon: MessageSquare },
  { id: "blog", label: "Blog Posts", icon: FileText },
  { id: "categories", label: "Categories", icon: Tags },
];

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const draftReviews = useLocalCollection<Review>("saastreak_admin_reviews");
  const draftPosts = useLocalCollection<BlogPost>("saastreak_admin_posts");

  const allReviews = [...draftReviews.items, ...seedReviews];
  const allPosts = [...draftPosts.items, ...seedBlogPosts];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
      <aside className="flex flex-col gap-1 rounded-2xl border border-border bg-surface p-3 lg:sticky lg:top-24 lg:h-fit">
        <div className="flex items-center gap-2 px-2 pb-3">
          <ShieldCheck size={16} className="text-brand-blue" />
          <span className="text-xs font-semibold tracking-wide text-foreground-muted uppercase">
            CMS Console
          </span>
        </div>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
              tab === t.id
                ? "bg-brand-blue/10 text-brand-blue"
                : "text-foreground-muted hover:bg-surface-muted hover:text-foreground"
            }`}
          >
            <t.icon size={16} />
            {t.label}
          </button>
        ))}
      </aside>

      <div className="min-w-0">
        {tab === "overview" && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Software listings", value: software.length },
              { label: "Categories", value: categories.length },
              { label: "Reviews", value: allReviews.length },
              { label: "Blog posts", value: allPosts.length },
              { label: "Comparisons", value: comparisons.length },
              { label: "Pending review moderation", value: draftReviews.items.length },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-surface p-5">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-xs text-foreground-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "software" && <SoftwareTable />}
        {tab === "reviews" && (
          <ReviewsPanel
            draftReviews={draftReviews.items}
            onAdd={draftReviews.add}
            onRemove={(id) => draftReviews.remove((r) => r.id === id)}
          />
        )}
        {tab === "blog" && (
          <BlogPanel
            draftPosts={draftPosts.items}
            onAdd={draftPosts.add}
            onRemove={(id) => draftPosts.remove((p) => p.id === id)}
          />
        )}
        {tab === "categories" && <CategoriesTable />}
      </div>
    </div>
  );
}

function SoftwareTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="bg-surface-muted">
              <th className="px-4 py-3 text-left font-semibold text-foreground">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Categories</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Rating</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Pricing</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {software.map((s, i) => (
              <tr key={s.id} className={i % 2 === 0 ? "bg-surface" : "bg-surface-muted/40"}>
                <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                <td className="px-4 py-3 text-foreground-muted">{s.categorySlugs.length}</td>
                <td className="px-4 py-3 text-foreground-muted">{s.ratings.overall.toFixed(1)}</td>
                <td className="px-4 py-3 text-foreground-muted">{s.pricingModel}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    Published
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-border bg-surface-muted px-4 py-3 text-xs text-foreground-muted">
        Seed listings are read-only in this prototype. Connect Supabase (see src/lib/supabase/schema.sql) to enable full CRUD.
      </p>
    </div>
  );
}

function CategoriesTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-surface-muted">
            <th className="px-4 py-3 text-left font-semibold text-foreground">Category</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Slug</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Products</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c, i) => (
            <tr key={c.id} className={i % 2 === 0 ? "bg-surface" : "bg-surface-muted/40"}>
              <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
              <td className="px-4 py-3 text-foreground-muted">/{c.slug}</td>
              <td className="px-4 py-3 text-foreground-muted">{c.productCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReviewsPanel({
  draftReviews,
  onAdd,
  onRemove,
}: {
  draftReviews: Review[];
  onAdd: (r: Review) => void;
  onRemove: (id: string) => void;
}) {
  const [softwareId, setSoftwareId] = useState(software[0].id);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(5);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    onAdd({
      id: `admin-rev-${Date.now()}`,
      softwareId,
      authorName: "Admin (moderation queue)",
      authorRole: "Verified buyer",
      authorCompanySize: "11-50",
      rating,
      title,
      body,
      pros: "",
      cons: "",
      date: new Date().toISOString().slice(0, 10),
      verified: false,
      helpfulCount: 0,
    });
    setTitle("");
    setBody("");
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-5">
        <h3 className="text-sm font-semibold text-foreground">Add a review (moderation queue)</h3>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <select
            value={softwareId}
            onChange={(e) => setSoftwareId(e.target.value)}
            className="h-10 rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-brand-blue"
          >
            {software.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="h-10 rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-brand-blue"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r} stars</option>
            ))}
          </select>
        </div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Review title"
          className="mt-3 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-brand-blue"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Review body"
          rows={3}
          className="mt-3 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-brand-blue"
        />
        <button
          type="submit"
          className="mt-3 flex h-10 items-center gap-1.5 rounded-xl brand-gradient-bg px-4 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus size={15} />
          Submit to queue
        </button>
      </form>

      {draftReviews.length > 0 && (
        <div className="rounded-2xl border border-border bg-surface p-5">
          <h3 className="text-sm font-semibold text-foreground">Pending moderation ({draftReviews.length})</h3>
          <div className="mt-3 flex flex-col gap-3">
            {draftReviews.map((r) => {
              const sw = software.find((s) => s.id === r.softwareId);
              return (
                <div key={r.id} className="flex items-start justify-between gap-3 rounded-xl border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.title} — {sw?.name}</p>
                    <p className="mt-1 text-xs text-foreground-muted">{r.body}</p>
                  </div>
                  <button
                    onClick={() => onRemove(r.id)}
                    className="shrink-0 rounded-lg p-1.5 text-foreground-muted hover:bg-rose-500/10 hover:text-rose-500"
                    aria-label="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function BlogPanel({
  draftPosts,
  onAdd,
  onRemove,
}: {
  draftPosts: BlogPost[];
  onAdd: (p: BlogPost) => void;
  onRemove: (id: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState(categories[0].name);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim()) return;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    onAdd({
      id: `admin-post-${Date.now()}`,
      slug,
      title,
      excerpt,
      seoDescription: excerpt,
      content: excerpt,
      category,
      authorName: "Admin",
      publishedAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
      readMinutes: 4,
      coverGradient: "from-blue-500 to-purple-500",
      relatedSoftwareIds: [],
    });
    setTitle("");
    setExcerpt("");
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-5">
        <h3 className="text-sm font-semibold text-foreground">New blog post (draft)</h3>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-4 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-brand-blue"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="mt-3 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-brand-blue"
        />
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Excerpt / summary"
          rows={3}
          className="mt-3 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-brand-blue"
        />
        <button
          type="submit"
          className="mt-3 flex h-10 items-center gap-1.5 rounded-xl brand-gradient-bg px-4 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus size={15} />
          Save draft
        </button>
      </form>

      {draftPosts.length > 0 && (
        <div className="rounded-2xl border border-border bg-surface p-5">
          <h3 className="text-sm font-semibold text-foreground">Drafts ({draftPosts.length})</h3>
          <div className="mt-3 flex flex-col gap-3">
            {draftPosts.map((p) => (
              <div key={p.id} className="flex items-start justify-between gap-3 rounded-xl border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{p.title}</p>
                  <p className="mt-1 text-xs text-foreground-muted">{p.excerpt}</p>
                </div>
                <button
                  onClick={() => onRemove(p.id)}
                  className="shrink-0 rounded-lg p-1.5 text-foreground-muted hover:bg-rose-500/10 hover:text-rose-500"
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
