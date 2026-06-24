"use client";
import * as React from "react";
import { Menu } from "lucide-react";
import { MedaLogo } from "@/features/auth/meda-logo";
import { ThemeToggle } from "./theme-toggle";
import { Sidebar, type NavGroup } from "./sidebar";

interface AppShellProps {
  groups: NavGroup[];
  activeHref?: string;
  /** Sidebar header (defaults to MedaLogo). */
  sidebarHeader?: React.ReactNode;
  /** Sidebar footer (user menu, version…). */
  sidebarFooter?: React.ReactNode;
  /** Right side of the top bar. */
  topRight?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Admin app shell: customizable Sidebar + top bar + content. Standard layout for MEDA back-office.
 * The sidebar is the <Sidebar> component (collapsible, badges, header/footer) — pass groups to configure.
 */
export function AppShell({ groups, activeHref, sidebarHeader, sidebarFooter, topRight, children }: AppShellProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar
        groups={groups} activeHref={activeHref}
        header={sidebarHeader ?? <MedaLogo />} footer={sidebarFooter}
        mobileOpen={open} onMobileClose={() => setOpen(false)}
      />
      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border-default bg-bg/90 px-5 backdrop-blur">
          <button onClick={() => setOpen((o) => !o)} className="lg:hidden text-fg" aria-label="Menu"><Menu className="h-5 w-5" /></button>
          <div className="ml-auto flex items-center gap-3">{topRight}<ThemeToggle /></div>
        </header>
        <main className="flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
