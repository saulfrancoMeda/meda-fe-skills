"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { TransactionCard } from "@/components/ui/transaction-card";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Avatar } from "@/components/ui/avatar";
import { MedaLogo } from "@/features/auth/meda-logo";

interface Tx { orderNo: string; merchant: string; amount: number; status: string; date: string; }
const rows: Tx[] = [
  { orderNo: "ORD-1001", merchant: "Binance", amount: 10000, status: "SUCCESS", date: "2026-06-22T10:00:00" },
  { orderNo: "ORD-1002", merchant: "BPN", amount: 5250, status: "PROCESSING", date: "2026-06-22T11:30:00" },
  { orderNo: "ORD-1003", merchant: "Binance", amount: 980, status: "FAILED", date: "2026-06-22T12:15:00" },
];
const cols: Column<Tx>[] = [
  { key: "orderNo", header: "Order", sortable: true },
  { key: "merchant", header: "Merchant", sortable: true },
  { key: "amount", header: "Amount", sortable: true, align: "right",
    render: (r) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(r.amount) },
  { key: "status", header: "Status",
    render: (r) => <Badge variant={r.status === "SUCCESS" ? "success" : r.status === "FAILED" ? "error" : "warning"}>{r.status}</Badge> },
  { key: "date", header: "Date", sortable: true },
];

export default function Home() {
  const [name, setName] = useState("");
  return (
    <main className="min-h-screen bg-bg p-8">
      <div className="mx-auto max-w-5xl meda-page-enter">
        <header className="mb-8 flex items-center justify-between">
          <MedaLogo className="h-8 text-fg" />
          <div className="flex items-center gap-3">
            <Badge variant="brand">MEDA UI</Badge>
            <Avatar name="Saul Renteria" />
          </div>
        </header>

        <h1 className="mb-2 text-2xl font-semibold text-fg">Component showcase</h1>
        <p className="mb-8 text-sm text-fg-secondary">Everything from the MEDA UI library, Binance-style.</p>

        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase text-fg-secondary">Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="link">Link</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase text-fg-secondary">Transactions</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {rows.map((r) => <TransactionCard key={r.orderNo} {...(r as any)} />)}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase text-fg-secondary">Data table (sort, columns, density)</h2>
          <DataTable columns={cols} data={rows} rowKey={(r) => r.orderNo} />
        </section>

        <section className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Card</CardTitle><CardDescription>A simple card</CardDescription></CardHeader>
            <CardContent><p className="text-sm text-fg">Content goes here.</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Form field</CardTitle></CardHeader>
            <CardContent>
              <FormField label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Type..." hint="With accessible label + hint" />
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
