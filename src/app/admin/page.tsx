import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin, SaaStreak",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  // The dashboard is a local prototype with no authentication, so it is only
  // available when explicitly enabled (NEXT_PUBLIC_ENABLE_ADMIN=true in .env.local).
  if (process.env.NEXT_PUBLIC_ENABLE_ADMIN !== "true") notFound();

  return (
    <Container className="py-10">
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Admin Dashboard
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-foreground-muted">
        Manage software listings, moderate reviews, and publish blog content.
        This prototype stores new drafts locally in your browser, wire it to
        Supabase (see src/lib/supabase/schema.sql) for a production CMS.
      </p>

      <div className="mt-8">
        <AdminDashboard />
      </div>
    </Container>
  );
}
