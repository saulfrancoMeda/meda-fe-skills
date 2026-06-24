"use client";
import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MedaLogo } from "@/features/auth/meda-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/features/i18n/language-switcher";

export default function Home() {
  const t = useTranslations("home");
  const [open, setOpen] = React.useState<number | null>(null);
  const cards = [
    { title: t("develop"), short: t("developShort"), detail: t("developDetail") },
    { title: t("mock"), short: t("mockShort"), detail: t("mockDetail") },
    { title: t("standards"), short: t("standardsShort"), detail: t("standardsDetail") },
  ];
  return (
    <main className="min-h-screen bg-bg">
      <header className="mx-auto flex max-w-5xl items-center justify-end gap-3 p-6"><LanguageSwitcher /><ThemeToggle /></header>
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center meda-page-enter">
        <MedaLogo className="mb-8 h-12 text-fg" />
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-fg">{t("title")}</h1>
        <p className="mb-10 max-w-xl text-fg-secondary">{t("subtitle")}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/showcase" className="rounded-control bg-brand px-6 py-3 font-medium text-brand-foreground transition-colors hover:bg-brand-dark">{t("ctaShowcase")}</Link>
          <Link href="/components" className="rounded-control border border-border-default px-6 py-3 font-medium text-fg transition-colors hover:bg-muted">{t("ctaComponents")}</Link>
        </div>
        <div className="mt-16 grid w-full gap-4 sm:grid-cols-3 text-left">
          {cards.map((c, i) => (
            <button key={i} onClick={() => setOpen(open === i ? null : i)}
              className={`rounded-meda border bg-surface p-5 text-left transition-all ${open === i ? "border-brand" : "border-border-default hover:border-brand/50"}`}>
              <div className="flex items-center justify-between"><p className="font-medium text-fg">{c.title}</p><span className="text-xs text-fg-tertiary">{open === i ? "−" : "+"}</span></div>
              <p className="mt-1 text-sm text-fg-secondary">{c.short}</p>
              {open === i && <p className="mt-3 rounded-control bg-muted p-3 text-xs leading-relaxed text-fg-secondary meda-fade-in">{c.detail}</p>}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
