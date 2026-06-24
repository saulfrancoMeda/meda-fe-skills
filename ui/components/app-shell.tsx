"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { MedaLogo } from "@/features/auth/meda-logo";
import { ThemeToggle } from "./theme-toggle";

export interface NavItem { label: string; href: string; icon?: React.ReactNode; }
export interface NavGroup { title?: string; items: NavItem[]; }

interface AppShellProps {
  groups: NavGroup[];
  activeHref?: string;
  /** Right side of the top bar (user menu, language switcher, theme toggle). */
  topRight?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Admin app shell: collapsible sidebar + top bar + content. The standard layout for
 * MEDA back-office screens (movements, users, transfers, balances). Mobile: sidebar slides in.
 */
export function AppShell({ groups, activeHref, topRight, children }: AppShellProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex min-h-screen bg-bg">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-60 shrink-0 border-r border-border-default bg-surface transition-transform lg:static lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center border-b border-border-default px-5"><MedaLogo /></div>
        <nav className="space-y-5 p-3">
          {groups.map((g, gi) => (
            <div key={gi}>
              {g.title && <p className="mb-1 px-2 text-[11px] font-medium uppercase tracking-wide text-fg-tertiary">{g.title}</p>}
              <ul className="space-y-0.5">
                {g.items.map((it) => {
                  const active = activeHref === it.href;
                  return (
                    <li key={it.href}>
                      <Link href={it.href} onClick={() => setOpen(false)}
                        className={cn("flex items-center gap-2.5 rounded-control px-3 py-2 text-sm transition-colors",
                          active ? "bg-brand/15 font-medium text-brand-dark" : "text-fg-secondary hover:bg-muted hover:text-fg")}>
                        {it.icon && <span className="text-base">{it.icon}</span>}
                        {it.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border-default bg-bg/90 px-5 backdrop-blur">
          <button onClick={() => setOpen((o) => !o)} className="lg:hidden text-fg" aria-label="Menu">☰</button>
          <div className="ml-auto flex items-center gap-3">{topRight}<ThemeToggle /></div>
        </header>
        <main className="flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
