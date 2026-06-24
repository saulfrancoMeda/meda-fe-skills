"use client";
import * as React from "react";
interface CollapsibleProps { trigger: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean; }
export function Collapsible({ trigger, children, defaultOpen }: CollapsibleProps) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return (
    <div>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="w-full text-left">
        {trigger}
      </button>
      {open && <div className="meda-fade-in mt-2">{children}</div>}
    </div>
  );
}
