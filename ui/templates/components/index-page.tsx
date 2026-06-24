"use client";
import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MedaLogo } from "@/features/auth/meda-logo";
import { CATEGORIES, COMPONENT_META } from "./_meta";

export default function ComponentsPage() {
  const [query, setQuery] = React.useState("");
  const q = query.trim().toLowerCase();

  const filtered = q
    ? COMPONENT_META.filter(
        (c) => c.name.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q) || c.slug.includes(q)
      )
    : COMPONENT_META;

  return (
    <div className="min-h-screen bg-bg">
      <header className="flex items-center justify-between border-b border-border-default px-6 py-4">
        <Link href="/" aria-label="Home"><MedaLogo className="h-7 text-fg" /></Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-fg-secondary hover:text-fg">Home</Link>
          <Link href="/showcase" className="text-sm text-fg-secondary hover:text-fg">Showcase</Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 meda-page-enter">
        <h1 className="text-3xl font-semibold text-fg">Components</h1>
        <p className="mt-2 max-w-2xl text-fg-secondary">
          Every MEDA UI primitive with live examples and copy-paste code. Click any component to see
          its variations, props and usage. Import from <code className="text-sm">@/components/ui</code>.
        </p>

        <div className="mt-6 max-w-sm">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search components…" aria-label="Search components" />
        </div>

        {filtered.length === 0 ? (
          <p className="mt-12 text-fg-secondary">No components match “{query}”.</p>
        ) : (
          <div className="mt-10 space-y-10">
            {CATEGORIES.map((cat) => {
              const items = filtered.filter((c) => c.category === cat);
              if (items.length === 0) return null;
              return (
                <section key={cat}>
                  <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-fg-secondary">{cat}</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/components/${c.slug}`}
                        className="meda-fade-in rounded-meda border border-border-default bg-surface p-5 transition-colors hover:border-brand"
                      >
                        <h3 className="font-semibold text-fg">{c.name}</h3>
                        <p className="mt-1 text-sm text-fg-secondary">{c.summary}</p>
                        <span className="mt-3 inline-block text-sm font-medium text-brand-dark">View component →</span>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
