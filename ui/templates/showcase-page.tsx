"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { TransactionCard } from "@/components/ui/transaction-card";
import { StatusPill } from "@/components/ui/status-pill";
import { AmountInput } from "@/components/ui/amount-input";
import { CopyField } from "@/components/ui/copy-field";
import { Combobox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/date-picker";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { TransferForm } from "@/features/transfer/transfer-form";
import { MedaLogo } from "@/features/auth/meda-logo";

// Real fintech use-cases. Click a card → see the actual screen built with MEDA UI.
type UseCase = "dashboard" | "transfer" | "txdetail" | "login";

const CASES: { id: UseCase; title: string; desc: string }[] = [
  { id: "dashboard", title: "Dashboard de cuenta", desc: "Balance, movimientos y KPIs — la pantalla principal de un usuario." },
  { id: "transfer", title: "Nueva transferencia", desc: "Formulario con validación CLABE/monto + confirmación." },
  { id: "txdetail", title: "Detalle de transacción", desc: "Estado, monto, comprobante y datos del movimiento." },
  { id: "login", title: "Inicio de sesión", desc: "Pantalla de acceso con la identidad MEDA." },
];

export default function ShowcasePage() {
  const [active, setActive] = useState<UseCase | null>(null);
  return (
    <ToastProvider>
      <div className="min-h-screen bg-bg">
        <header className="flex items-center justify-between border-b border-border-default px-6 py-4">
          <MedaLogo />
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-fg-secondary hover:text-fg">Home</Link>
            <Link href="/components" className="text-sm text-fg-secondary hover:text-fg">Componentes</Link>
            <ThemeToggle />
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-10">
          <h1 className="text-2xl font-semibold text-fg">Casos de uso</h1>
          <p className="mt-1 text-fg-secondary">Pantallas reales de un producto fintech. Haz click en una para verla construida con MEDA UI.</p>

          {!active ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {CASES.map((c) => (
                <button key={c.id} onClick={() => setActive(c.id)}
                  className="rounded-meda border border-border-default bg-surface p-5 text-left transition-colors hover:border-brand">
                  <h3 className="font-semibold text-fg">{c.title}</h3>
                  <p className="mt-1 text-sm text-fg-secondary">{c.desc}</p>
                  <span className="mt-3 inline-block text-sm font-medium text-brand-dark">Ver pantalla →</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <Button variant="outline" size="sm" onClick={() => setActive(null)}>← Volver a casos de uso</Button>
              <div className="mt-4">
                {active === "dashboard" && <DashboardCase />}
                {active === "transfer" && <TransferCase />}
                {active === "txdetail" && <TxDetailCase />}
                {active === "login" && <LoginCase />}
              </div>
            </div>
          )}
        </main>
      </div>
    </ToastProvider>
  );
}

// ---- Use-case 1: Dashboard ----
function DashboardCase() {
  const txs = [
    { orderNo: "MX-9001", merchant: "Spotify", amount: -149, status: "SUCCESS", date: "2026-06-22" },
    { orderNo: "MX-9002", merchant: "Depósito SPEI", amount: 5000, status: "SUCCESS", date: "2026-06-21" },
    { orderNo: "MX-9003", merchant: "Amazon", amount: -899, status: "PROCESSING", date: "2026-06-20" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="p-5">
          <p className="text-sm text-fg-secondary">Balance total</p>
          <p className="mt-1 text-2xl font-semibold text-fg">$24,580.00</p>
          <p className="mt-1 text-sm text-price-up">+2.4% este mes</p>
        </CardContent></Card>
        <Card><CardContent className="p-5">
          <p className="text-sm text-fg-secondary">Ingresos</p>
          <p className="mt-1 text-2xl font-semibold text-price-up">$8,200.00</p>
          <p className="mt-1 text-sm text-fg-tertiary">12 movimientos</p>
        </CardContent></Card>
        <Card><CardContent className="p-5">
          <p className="text-sm text-fg-secondary">Egresos</p>
          <p className="mt-1 text-2xl font-semibold text-price-down">$3,620.00</p>
          <p className="mt-1 text-sm text-fg-tertiary">28 movimientos</p>
        </CardContent></Card>
      </div>
      <Card><CardContent className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-fg">Movimientos (últimos 7 días)</h3>
          <Badge variant="brand">Demo</Badge>
        </div>
        <div className="mt-4 rounded-meda border border-dashed border-border-default p-8 text-center text-sm text-fg-secondary">
          Aquí va la gráfica de área (AreaTrendChart) — activa recharts para verla.<br />
          <code className="text-xs">pnpm add -E recharts</code> + renombra meda-charts.tsx.template
        </div>
      </CardContent></Card>
      <div>
        <h3 className="mb-3 font-semibold text-fg">Transacciones recientes</h3>
        <div className="space-y-2">
          {txs.map((t) => <TransactionCard key={t.orderNo} orderNo={t.orderNo} merchant={t.merchant} amount={t.amount} date={t.date} status={t.status as never} />)}
        </div>
      </div>
    </div>
  );
}

// ---- Use-case 2: Transfer ----
function TransferCase() {
  return (
    <Card className="max-w-lg"><CardContent className="p-6">
      <h3 className="mb-4 font-semibold text-fg">Nueva transferencia</h3>
      <TransferForm />
    </CardContent></Card>
  );
}

// ---- Use-case 3: Transaction detail ----
function TxDetailCase() {
  const { show } = useToast();
  const [confirm, setConfirm] = useState(false);
  return (
    <Card className="max-w-lg"><CardContent className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-fg">Detalle de transacción</h3>
        <StatusPill status="SUCCESS" />
      </div>
      <div className="text-center py-4">
        <p className="text-sm text-fg-secondary">Monto</p>
        <p className="text-3xl font-semibold text-fg">$1,250.00</p>
        <p className="text-sm text-fg-tertiary">MXN</p>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-fg-secondary">Orden</span><span className="text-fg">MX-9001</span></div>
        <div className="flex justify-between"><span className="text-fg-secondary">Beneficiario</span><span className="text-fg">Juan Pérez</span></div>
        <div className="flex justify-between"><span className="text-fg-secondary">Fecha</span><span className="text-fg">22 jun 2026</span></div>
      </div>
      <CopyField label="CLABE" value="012180012345678901" />
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={() => show("info", "Descargando comprobante…")}>Comprobante</Button>
        <Button variant="danger" className="flex-1" onClick={() => setConfirm(true)}>Reportar</Button>
      </div>
      <ConfirmDialog open={confirm} onClose={() => setConfirm(false)}
        onConfirm={() => { setConfirm(false); show("success", "Reporte enviado", { action: { label: "Deshacer", onClick: () => show("info", "Reporte cancelado") } }); }}
        title="¿Reportar esta transacción?" description="Nuestro equipo la revisará en 24h." />
    </CardContent></Card>
  );
}

// ---- Use-case 4: Login ----
function LoginCase() {
  return (
    <Card className="max-w-sm mx-auto"><CardContent className="p-6">
      <div className="flex justify-center mb-6"><MedaLogo /></div>
      <h3 className="text-center font-semibold text-fg mb-6">Inicia sesión</h3>
      <div className="space-y-4">
        <FormField label="Correo" type="email" placeholder="tu@meda.com.mx" />
        <FormField label="Contraseña" type="password" placeholder="••••••••" />
        <Button className="w-full">Entrar</Button>
      </div>
    </CardContent></Card>
  );
}
