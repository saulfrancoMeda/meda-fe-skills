"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

const LOCALES = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
];

/** Switches the app language by setting the `locale` cookie and refreshing. */
export function LanguageSwitcher() {
  const router = useRouter();
  const [current, setCurrent] = React.useState("es");

  React.useEffect(() => {
    const m = document.cookie.match(/(?:^|; )locale=([^;]+)/);
    if (m) setCurrent(m[1]);
  }, []);

  const change = (code: string) => {
    document.cookie = `locale=${code}; path=/; max-age=31536000`;
    setCurrent(code);
    router.refresh();
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-meda border border-border-default p-0.5">
      {LOCALES.map((l) => (
        <button key={l.code} onClick={() => change(l.code)}
          className={`rounded px-2 py-1 text-xs transition-colors ${current === l.code ? "bg-brand text-brand-foreground" : "text-fg-secondary hover:bg-muted"}`}>
          {l.label}
        </button>
      ))}
    </div>
  );
}
