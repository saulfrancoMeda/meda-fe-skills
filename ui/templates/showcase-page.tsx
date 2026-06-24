"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { TransactionCard } from "@/components/ui/transaction-card";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { CopyField } from "@/components/ui/copy-field";
import { StatusPill } from "@/components/ui/status-pill";
import { AmountInput } from "@/components/ui/amount-input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { TransferForm } from "@/features/transfer/transfer-form";
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

function ToastDemo() {
  const { show } = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary" onClick={() => show("success", "Transaction approved")}>Success toast</Button>
      <Button variant="danger" onClick={() => show("error", "Payment failed")}>Error toast</Button>
      <Button variant="outline" onClick={() => show("info", "Processing your request")}>Info toast</Button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10 meda-fade-in">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-fg-secondary">{title}</h2>
      {children}
    </section>
  );
}

export default function Home() {
  const [name, setName] = useState("");
  return (
    <ToastProvider>
      <main className="min-h-screen bg-bg p-8">
        <div className="mx-auto max-w-5xl meda-page-enter">
          <header className="mb-10 flex items-center justify-between">
            <MedaLogo className="h-8 text-fg" />
            <div className="flex items-center gap-3">
              <Link href="/components" className="text-sm text-fg-secondary hover:text-fg">All components →</Link>
              <Badge variant="brand">MEDA UI</Badge>
              <ThemeToggle />
              <Avatar name="Saul Renteria" />
            </div>
          </header>

          <h1 className="mb-2 text-2xl font-semibold text-fg">Component showcase</h1>
          <p className="mb-10 text-sm text-fg-secondary">Everything from the MEDA UI library, Binance-style. Toggle dark/light top-right.</p>

          <Section title="Buttons">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="link">Link</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </Section>

          <Section title="Toasts / notifications">
            <ToastDemo />
          </Section>

          <Section title="Transactions">
            <div className="grid gap-4 sm:grid-cols-3">
              {rows.map((r) => <TransactionCard key={r.orderNo} {...(r as any)} />)}
            </div>
          </Section>

          <Section title="Data table (sort, columns, density)">
            <DataTable columns={cols} data={rows} rowKey={(r) => r.orderNo} />
          </Section>

          <Section title="Fintech components">
            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader><CardTitle>Amount & status</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <AmountInput value={1234.5} onChange={() => {}} />
                    <div className="flex gap-4">
                      <StatusPill status="SUCCESS" />
                      <StatusPill status="PROCESSING" />
                      <StatusPill status="FAILED" />
                    </div>
                    <CopyField label="CLABE" value="012180012345678901" masked />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Transfer form (RHF + Zod + confirm modal)</CardTitle></CardHeader>
                <CardContent><TransferForm /></CardContent>
              </Card>
            </div>
          </Section>

          <Section title="Card & form">
            <div className="grid gap-6 sm:grid-cols-2">
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
            </div>
          </Section>
        </div>
      </main>
    </ToastProvider>
  );
}
