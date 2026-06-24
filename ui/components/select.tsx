"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, error, className, ...props }, ref) => (
    <select ref={ref}
      className={cn("flex h-10 w-full rounded-control border bg-surface px-3 text-sm text-fg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:border-brand",
        "disabled:cursor-not-allowed disabled:opacity-60",
        error ? "border-error" : "border-border-default", className)}
      {...props}>
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
);
Select.displayName = "Select";
