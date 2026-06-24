"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
import type { Example } from "./_registry";

/**
 * Renders one example as a shadcn-style block: a title/description, then a
 * Preview/Code tab switch. The live preview and the code come from the same
 * registry entry so they never drift.
 */
export function ExamplePreview({ example }: { example: Example }) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview");
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(example.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <section className="meda-fade-in">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-fg">{example.title}</h3>
        {example.description && <p className="mt-0.5 text-sm text-fg-secondary">{example.description}</p>}
      </div>

      <div className="flex items-center justify-between border-b border-border-default">
        <div className="flex gap-1">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "-mb-px border-b-2 px-3 py-2 text-sm font-medium capitalize transition-colors",
                tab === t ? "border-brand text-fg" : "border-transparent text-fg-secondary hover:text-fg"
              )}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === "code" && (
          <button onClick={copy} className="px-2 py-1 text-xs font-medium text-brand-dark hover:underline">
            {copied ? "Copied ✓" : "Copy"}
          </button>
        )}
      </div>

      {tab === "preview" ? (
        <div className="flex min-h-32 items-center justify-center rounded-b-meda border border-t-0 border-border-default bg-surface p-8">
          {example.render()}
        </div>
      ) : (
        <pre className="overflow-x-auto rounded-b-meda border border-t-0 border-border-default bg-[#0B0E11] p-4 text-xs leading-relaxed text-[#EAECEF]">
          <code>{example.code}</code>
        </pre>
      )}
    </section>
  );
}
