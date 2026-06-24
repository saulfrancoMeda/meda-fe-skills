"use client";
import * as React from "react";
import Link from "next/link";
import { MedaLogo } from "@/features/auth/meda-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const CARDS = [
  { title: "Develop", short: "Construye features con tu agente de IA.",
    detail: "Pídele a tu agente (Claude Code, Cursor, etc.) que use los comandos meda-fe-component (para crear componentes con los estándares MEDA) y meda-fe-endpoint (para generar tipos + cliente + hook de TanStack desde un OpenAPI). Las skills guían al agente." },
  { title: "Mock", short: "¿El endpoint no está listo? Usa MSW.",
    detail: "MSW (Mock Service Worker) ya está configurado en src/mocks/. Define handlers que simulan la API real para desarrollar el front sin esperar al backend. La skill fe-mocking explica el flujo." },
  { title: "Standards", short: "Las skills imponen calidad por defecto.",
    detail: "Las 25 skills imponen SRP, seguridad (supply-chain, sin PII en logs), los cuatro estados de UI (loading/error/empty/success), accesibilidad y el diseño MEDA (estilo Binance). El agente las sigue automáticamente." },
];

export default function Home() {
  const [open, setOpen] = React.useState<number | null>(null);
  return (
    <main className="min-h-screen bg-bg">
      <header className="mx-auto flex max-w-5xl items-center justify-end p-6"><ThemeToggle /></header>
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center meda-page-enter">
        <MedaLogo className="mb-8 h-12 text-fg" />
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-fg">Bienvenido a tu app MEDA</h1>
        <p className="mb-10 max-w-xl text-fg-secondary">
          Construido con los estándares frontend de MEDA: Next.js, TypeScript, Tailwind y la librería MEDA UI.
          Empieza explorando los componentes y luego construye tus features.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/showcase" className="rounded-control bg-brand px-6 py-3 font-medium text-brand-foreground transition-colors hover:bg-brand-dark">Ver funcionalidades</Link>
          <Link href="/components" className="rounded-control border border-border-default px-6 py-3 font-medium text-fg transition-colors hover:bg-muted">Ver todos los componentes</Link>
        </div>
        <div className="mt-16 grid w-full gap-4 sm:grid-cols-3 text-left">
          {CARDS.map((c, i) => (
            <button key={c.title} onClick={() => setOpen(open === i ? null : i)}
              className={`rounded-meda border bg-surface p-5 text-left transition-all ${open === i ? "border-brand" : "border-border-default hover:border-brand/50"}`}>
              <div className="flex items-center justify-between">
                <p className="font-medium text-fg">{c.title}</p>
                <span className="text-xs text-fg-tertiary">{open === i ? "−" : "+"}</span>
              </div>
              <p className="mt-1 text-sm text-fg-secondary">{c.short}</p>
              {open === i && <p className="mt-3 rounded-control bg-muted p-3 text-xs leading-relaxed text-fg-secondary meda-fade-in">{c.detail}</p>}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
