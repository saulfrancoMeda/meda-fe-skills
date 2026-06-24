"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Avatar } from "@/components/ui/avatar";
import { Select } from "@/components/ui/select";
import { Tabs } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MedaLogo } from "@/features/auth/meda-logo";

const items = [
  { id: "button", name: "Button", demo: <div className="flex gap-2"><Button variant="primary">Primary</Button><Button variant="outline">Outline</Button></div> },
  { id: "badge", name: "Badge", demo: <div className="flex gap-2"><Badge variant="success">Success</Badge><Badge variant="error">Error</Badge><Badge variant="brand">Brand</Badge></div> },
  { id: "input", name: "Input", demo: <Input placeholder="Type here..." /> },
  { id: "form-field", name: "FormField", demo: <FormField label="Email" placeholder="you@meda.com.mx" hint="With label + hint" /> },
  { id: "spinner", name: "Spinner", demo: <Spinner /> },
  { id: "avatar", name: "Avatar", demo: <div className="flex gap-2"><Avatar name="Ana García" /><Avatar name="Carlos López" /></div> },
  { id: "select", name: "Select", demo: <Select options={[{ value: "1", label: "Option 1" }, { value: "2", label: "Option 2" }]} /> },
  { id: "badge2", name: "Card", demo: <Card><CardHeader><CardTitle>Title</CardTitle></CardHeader><CardContent><p className="text-sm text-fg">Body</p></CardContent></Card> },
];

export default function ComponentsPage() {
  const [tab, setTab] = useState("all");
  return (
    <main className="min-h-screen bg-bg p-8">
      <div className="mx-auto max-w-5xl meda-page-enter">
        <header className="mb-10 flex items-center justify-between">
          <MedaLogo className="h-8 text-fg" />
          <div className="flex items-center gap-3">
            <Link href="/showcase" className="text-sm text-fg-secondary hover:text-fg">← Showcase</Link>
            <ThemeToggle />
          </div>
        </header>
        <h1 className="mb-2 text-2xl font-semibold text-fg">All components</h1>
        <p className="mb-8 text-sm text-fg-secondary">Every MEDA UI primitive with a live demo. Import from <code>@/components/ui</code>.</p>

        <Tabs tabs={[{ id: "all", label: "All" }]} active={tab} onChange={setTab} className="mb-8" />

        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((it) => (
            <div key={it.id} className="rounded-meda border border-border-default bg-surface p-5 meda-fade-in">
              <p className="mb-4 text-sm font-medium text-fg">{it.name}</p>
              <div className="flex min-h-12 items-center">{it.demo}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
