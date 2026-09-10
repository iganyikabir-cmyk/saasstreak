"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Sparkles, X } from "lucide-react";
import { categories } from "@/data/categories";
import { ThemeToggle } from "./ThemeToggle";
import { Container } from "./Container";
import { Logo } from "./Logo";

const navLinks = [
  { label: "Compare", href: "/compare" },
  { label: "Blog", href: "/blog" },
  { label: "AI Recommender", href: "/ai-recommender" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center">
          <Logo size={30} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => setCategoriesOpen(false)}
          >
            <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground-muted transition hover:bg-surface-muted hover:text-foreground">
              Categories
              <ChevronDown size={14} />
            </button>
            {categoriesOpen && (
              <div className="absolute top-full left-0 w-[560px] pt-2">
                <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-surface p-3 shadow-xl">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      className="rounded-xl px-3 py-2 text-sm text-foreground-muted transition hover:bg-surface-muted hover:text-foreground"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground-muted transition hover:bg-surface-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/ai-recommender"
            className="hidden items-center gap-1.5 rounded-full brand-gradient-bg px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90 sm:flex"
          >
            <Sparkles size={15} />
            Ask AI
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            <p className="px-3 pb-1 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
              Categories
            </p>
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-foreground-muted hover:bg-surface-muted hover:text-foreground"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/categories"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-brand-blue"
            >
              View all categories →
            </Link>
            <div className="my-2 h-px bg-border" />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground-muted hover:bg-surface-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
