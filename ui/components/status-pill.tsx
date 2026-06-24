import * as React from "react";
import { cn } from "@/lib/cn";

type Status = "SUCCESS" | "PROCESSING" | "PENDING" | "FAILED" | "REFUNDED";
const map: Record<Status, { label: string; dot: string; text: string }> = {
  SUCCESS:    { label: "Success",    dot: "bg-success", text: "text-success-dark" },
  PROCESSING: { label: "Processing", dot: "bg-warning", text: "text-warning-dark" },
  PENDING:    { label: "Pending",    dot: "bg-warning", text: "text-warning-dark" },
  FAILED:     { label: "Failed",     dot: "bg-error",   text: "text-error-dark" },
  REFUNDED:   { label: "Refunded",   dot: "bg-info",    text: "text-info-dark" },
};

/** Transaction status with a colored dot — clearer than color-only (accessibility). */
export function StatusPill({ status, className }: { status: Status; className?: string }) {
  const s = map[status] ?? map.PENDING;
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm font-medium", s.text, className)}>
      <span className={cn("h-2 w-2 rounded-full", s.dot)} aria-hidden /> {s.label}
    </span>
  );
}
