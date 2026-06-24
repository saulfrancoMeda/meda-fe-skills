import Link from "next/link";
import { MedaLogo } from "@/features/auth/meda-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <header className="mx-auto flex max-w-5xl items-center justify-end p-6">
        <ThemeToggle />
      </header>
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center meda-page-enter">
        <MedaLogo className="mb-8 h-12 text-fg" />
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-fg">Welcome to your MEDA app</h1>
        <p className="mb-10 max-w-xl text-fg-secondary">
          Built with the MEDA frontend standards: Next.js, TypeScript, Tailwind, and the MEDA UI
          library. Start by exploring the components, then build your features.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/showcase" className="rounded-meda bg-brand px-6 py-3 font-medium text-brand-foreground transition-colors hover:bg-brand-dark">
            View component showcase
          </Link>
          <Link href="/components" className="rounded-meda border border-border-default px-6 py-3 font-medium text-fg transition-colors hover:bg-muted">
            Browse all components
          </Link>
        </div>
        <div className="mt-16 grid w-full gap-4 sm:grid-cols-3 text-left">
          <div className="rounded-meda border border-border-default bg-surface p-5">
            <p className="mb-1 font-medium text-fg">Develop</p>
            <p className="text-sm text-fg-secondary">Use /meda-fe-component and /meda-fe-endpoint with your agent.</p>
          </div>
          <div className="rounded-meda border border-border-default bg-surface p-5">
            <p className="mb-1 font-medium text-fg">Mock</p>
            <p className="text-sm text-fg-secondary">Endpoint not ready? MSW is set up in src/mocks/.</p>
          </div>
          <div className="rounded-meda border border-border-default bg-surface p-5">
            <p className="mb-1 font-medium text-fg">Standards</p>
            <p className="text-sm text-fg-secondary">Skills enforce SRP, security, and the four UI states.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
