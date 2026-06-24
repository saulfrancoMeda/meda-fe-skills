"use client";
import * as React from "react";
import Link from "next/link";
import { ToastProvider } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MedaLogo } from "@/features/auth/meda-logo";
import { COMPONENT_META } from "./_meta";
import { getDoc } from "./_registry";
import { ExamplePreview } from "./_preview";

function ImportLine({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };
  return (
    <div className="flex items-center justify-between gap-3 rounded-meda border border-border-default bg-muted px-3 py-2">
      <code className="overflow-x-auto whitespace-nowrap font-mono text-xs text-fg">{code}</code>
      <button onClick={copy} className="shrink-0 text-xs font-medium text-brand-dark hover:underline">
        {copied ? "Copied ✓" : "Copy"}
      </button>
    </div>
  );
}

export function ComponentDetail({ slug }: { slug: string }) {
  const meta = COMPONENT_META.find((c) => c.slug === slug);
  const doc = getDoc(slug);

  const index = COMPONENT_META.findIndex((c) => c.slug === slug);
  const prev = index > 0 ? COMPONENT_META[index - 1] : null;
  const next = index >= 0 && index < COMPONENT_META.length - 1 ? COMPONENT_META[index + 1] : null;

  if (!meta || !doc) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-fg-secondary">Component not found.</p>
        <Link href="/components" className="mt-4 inline-block text-sm text-brand-dark hover:underline">← All components</Link>
      </main>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-bg">
        <header className="flex items-center justify-between border-b border-border-default px-6 py-4">
          <Link href="/" aria-label="Home"><MedaLogo className="h-7 text-fg" /></Link>
          <div className="flex items-center gap-4">
            <Link href="/components" className="text-sm text-fg-secondary hover:text-fg">Components</Link>
            <Link href="/showcase" className="text-sm text-fg-secondary hover:text-fg">Showcase</Link>
            <ThemeToggle />
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-6 py-10 meda-page-enter">
          <Link href="/components" className="text-sm text-fg-secondary hover:text-fg">← All components</Link>

          <div className="mt-4 flex items-center gap-3">
            <h1 className="text-3xl font-semibold text-fg">{meta.name}</h1>
            <Badge variant="brand">{meta.category}</Badge>
          </div>
          <p className="mt-2 text-fg-secondary">{doc.description}</p>

          <div className="mt-5">
            <ImportLine code={doc.import} />
          </div>

          <div className="mt-10 space-y-12">
            {doc.examples.map((ex, i) => (
              <ExamplePreview key={i} example={ex} />
            ))}
          </div>

          <nav className="mt-16 flex items-center justify-between border-t border-border-default pt-6">
            {prev ? (
              <Link href={`/components/${prev.slug}`} className="group text-left">
                <span className="block text-xs text-fg-tertiary">Previous</span>
                <span className="text-sm font-medium text-fg group-hover:text-brand-dark">← {prev.name}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/components/${next.slug}`} className="group text-right">
                <span className="block text-xs text-fg-tertiary">Next</span>
                <span className="text-sm font-medium text-fg group-hover:text-brand-dark">{next.name} →</span>
              </Link>
            ) : <span />}
          </nav>
        </main>
      </div>
    </ToastProvider>
  );
}
