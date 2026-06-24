"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

interface AmountInputProps {
  value: number | "";
  onChange: (value: number | "") => void;
  currency?: string;
  error?: boolean;
  placeholder?: string;
  className?: string;
  id?: string;
}

/** Money input: shows the currency symbol, accepts only valid decimal amounts, two decimals max. */
export function AmountInput({ value, onChange, currency = "MXN", error, placeholder = "0.00", className, id }: AmountInputProps) {
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    if (raw === "") return onChange("");
    // max two decimals
    if (/^\d*\.?\d{0,2}$/.test(raw)) onChange(Number(raw));
  };
  return (
    <div className={cn("flex items-center rounded-control border bg-surface px-3 h-10",
      error ? "border-error" : "border-border-default focus-within:border-brand", className)}>
      <span className="mr-2 text-fg-secondary text-sm">{currency === "MXN" ? "$" : currency}</span>
      <input
        id={id}
        inputMode="decimal"
        value={value === "" ? "" : value}
        onChange={handle}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-fg outline-none text-sm"
      />
      <span className="ml-2 text-fg-tertiary text-xs">{currency}</span>
    </div>
  );
}
