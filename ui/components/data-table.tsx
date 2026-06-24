"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

export interface Column<T> {
  key: keyof T & string;
  header: string;
  sortable?: boolean;
  hidden?: boolean;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "right" | "center";
}

type Density = "comfortable" | "compact" | "zen";

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  emptyMessage?: string;
}

export function DataTable<T>({ columns, data, rowKey, emptyMessage = "No data" }: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");
  const [density, setDensity] = React.useState<Density>("comfortable");
  const [hidden, setHidden] = React.useState<Set<string>>(
    new Set(columns.filter((c) => c.hidden).map((c) => c.key))
  );

  const visibleCols = columns.filter((c) => !hidden.has(c.key));

  const sorted = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey as keyof T];
      const bv = b[sortKey as keyof T];
      if (av === bv) return 0;
      const cmp = av > bv ? 1 : -1;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };
  const toggleColumn = (key: string) =>
    setHidden((prev) => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });

  const pad = density === "zen" ? "px-2 py-1" : density === "compact" ? "px-3 py-2" : "px-4 py-3";

  return (
    <div className="w-full">
      <div className="flex items-center justify-end gap-2 pb-3">
        <div className="flex items-center gap-1 text-xs">
          <span className="text-fg-secondary">Density:</span>
          {(["comfortable", "compact", "zen"] as Density[]).map((d) => (
            <button key={d} onClick={() => setDensity(d)}
              className={cn("rounded px-2 py-1 capitalize", density === d ? "bg-brand text-brand-foreground" : "text-fg-secondary hover:bg-muted")}>
              {d}
            </button>
          ))}
        </div>
        <details className="relative">
          <summary className="cursor-pointer rounded border border-border-default px-2 py-1 text-xs text-fg list-none">Columns</summary>
          <div className="meda-pop absolute right-0 z-10 mt-1 w-44 rounded-meda border border-border-default bg-surface p-2 shadow-lg">
            {columns.map((c) => (
              <label key={c.key} className="flex items-center gap-2 py-1 text-sm text-fg">
                <input type="checkbox" checked={!hidden.has(c.key)} onChange={() => toggleColumn(c.key)} />
                {c.header}
              </label>
            ))}
          </div>
        </details>
      </div>

      <div className="w-full overflow-auto rounded-meda border border-border-default">
        <table className="w-full text-sm">
          <thead className="bg-table-head">
            <tr>
              {visibleCols.map((c) => (
                <th key={c.key}
                  className={cn(pad, "text-left text-xs font-semibold text-table-title tracking-tight",
                    c.align === "right" && "text-right", c.align === "center" && "text-center",
                    c.sortable && "cursor-pointer select-none")}
                  onClick={() => c.sortable && toggleSort(c.key)}>
                  {c.header}
                  {sortKey === c.key && <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr><td colSpan={visibleCols.length} className={cn(pad, "text-center text-fg-secondary")}>{emptyMessage}</td></tr>
            ) : (
              sorted.map((row) => (
                <tr key={rowKey(row)} className="border-t border-border-default hover:bg-muted transition-colors">
                  {visibleCols.map((c) => (
                    <td key={c.key} className={cn(pad, "text-fg", c.align === "right" && "text-right", c.align === "center" && "text-center")}>
                      {c.render ? c.render(row) : String(row[c.key as keyof T] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
