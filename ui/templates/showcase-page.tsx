"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, type Column, type DataTableStat } from "@/components/ui/data-table";
import { DetailModal } from "@/components/ui/detail-modal";
import { Dialog } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Production-grade back-office screens built entirely from MEDA UI (DataTable + DetailModal + Dialog).
// Mirrors the real MEDA admin: rich table toolbar (stats, search, columns, export, zen), pagination.

type Screen = "users" | "movements" | "transfers" | "newTransfer";

export default function ShowcasePage() {
  const [screen, setScreen] = React.useState<Screen>("movements");
  const nav: { id: Screen; label: string }[] = [
    { id: "users", label: "Usuarios" },
    { id: "movements", label: "Movimientos" },
    { id: "transfers", label: "Transferencias" },
  ];
  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border-default bg-bg/90 px-6 backdrop-blur">
        <Link href="/" className="flex items-center gap-2 font-semibold text-fg"><span className="text-brand text-xl">◆</span> MEDÁ</Link>
        <nav className="flex items-center gap-1">
          {nav.map((n) => (
            <button key={n.id} onClick={() => setScreen(n.id)}
              className={`rounded-control px-3 py-1.5 text-sm transition-colors ${screen === n.id || (screen === "newTransfer" && n.id === "transfers") ? "bg-brand text-brand-foreground font-medium" : "text-fg-secondary hover:bg-muted"}`}>
              {n.label}
            </button>
          ))}
        </nav>
        <ThemeToggle />
      </header>

      <main className="mx-auto max-w-7xl p-6 lg:p-8">
        {screen === "users" && <UsersScreen />}
        {screen === "movements" && <MovementsScreen />}
        {screen === "transfers" && <TransfersScreen onNew={() => setScreen("newTransfer")} />}
        {screen === "newTransfer" && <NewTransferScreen onBack={() => setScreen("transfers")} />}
      </main>
    </div>
  );
}

// ---------- Users ----------
interface User { id: string; name: string; email: string; role: string; status: string; created: string; }
const USERS: User[] = [
  { id: "1", name: "Ana García", email: "ana.garcia@meda.com.mx", role: "Administrador", status: "Activo", created: "15 ene 2026" },
  { id: "2", name: "Carlos López", email: "carlos.lopez@meda.com.mx", role: "Operador", status: "Activo", created: "3 feb 2026" },
  { id: "3", name: "María Torres", email: "maria.torres@meda.com.mx", role: "Consulta", status: "Inactivo", created: "10 mar 2026" },
];

function UsersScreen() {
  const [addOpen, setAddOpen] = React.useState(false);
  const cols: Column<User>[] = [
    { key: "name", header: "Usuario", render: (u) => (
      <div className="flex items-center gap-3">
        <Avatar name={u.name} size="sm" />
        <div><p className="font-medium text-fg">{u.name}</p><p className="text-xs text-fg-secondary">{u.email}</p></div>
      </div>
    ) },
    { key: "role", header: "Rol", render: (u) => <Badge variant={u.role === "Administrador" ? "brand" : u.role === "Operador" ? "info" : "default"}>{u.role}</Badge> },
    { key: "status", header: "Estado", render: (u) => (
      <span className={`inline-flex items-center gap-1.5 text-sm ${u.status === "Activo" ? "text-success" : "text-fg-tertiary"}`}>
        <span className={`h-2 w-2 rounded-full ${u.status === "Activo" ? "bg-success" : "bg-border-strong"}`} />{u.status}
      </span>
    ) },
    { key: "created", header: "Alta", align: "right" },
    { key: "id", header: "Acciones", align: "right", render: () => (
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="outline">Editar</Button>
        <Button size="sm" variant="danger">Eliminar</Button>
      </div>
    ) },
  ];
  return (
    <>
      <h1 className="mb-1 text-2xl font-semibold text-fg">Usuarios</h1>
      <p className="mb-6 text-fg-secondary">Alta, edición, baja y asignación de roles.</p>
      <DataTable
        title="USUARIOS" count={USERS.length} data={USERS} columns={cols} rowKey={(u) => u.id}
        searchFields={[{ placeholder: "Buscar usuario…", keys: ["name", "email"] }]}
        actions={<Button onClick={() => setAddOpen(true)}>+ Nuevo usuario</Button>}
      />
      <Dialog open={addOpen} onClose={() => setAddOpen(false)} title="Agregar usuario">
        <div className="space-y-4">
          <Field><FieldLabel htmlFor="ue">Email</FieldLabel><Input id="ue" type="email" placeholder="usuario@meda.com.mx" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field><FieldLabel htmlFor="un">Nombre</FieldLabel><Input id="un" /></Field>
            <Field><FieldLabel htmlFor="ua">Apellido</FieldLabel><Input id="ua" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field><FieldLabel htmlFor="us">Estado</FieldLabel><Select id="us" options={[{ value: "a", label: "Activo" }, { value: "i", label: "Inactivo" }]} /></Field>
            <Field><FieldLabel htmlFor="ur">Rol</FieldLabel><Select id="ur" options={[{ value: "c", label: "Consulta" }, { value: "o", label: "Operador" }, { value: "ad", label: "Administrador" }]} /></Field>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancelar</Button>
            <Button onClick={() => setAddOpen(false)}>Guardar</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

// ---------- Movements ----------
interface Mov { id: string; trace: string; date: string; medaId: string; type: string; network: string; amount: number; status: string; }
const MOVS: Mov[] = Array.from({ length: 23 }).map((_, i) => ({
  id: `${(Math.random() * 1e8 | 0).toString(16)}-c8a-4674`,
  trace: `${(Math.random() * 1e15 | 0).toString(16)}`,
  date: "24/06/2026",
  medaId: ["15072", "132914", "14475", "88011"][i % 4],
  type: i % 3 === 0 ? "Crédito" : "Débito",
  network: i % 2 === 0 ? "Externa" : "Interna",
  amount: Math.round(Math.random() * 12000000) / 100,
  status: i % 3 === 0 ? "Completado" : "En proceso",
}));

function MovementsScreen() {
  const [detail, setDetail] = React.useState<Mov | null>(null);
  const stats: DataTableStat[] = [
    { label: "Monto total", value: "$1,850,861.71 MXN", icon: "▤", tone: "success" },
    { label: "Membresías", value: "$69.00 MXN", icon: "▦", tone: "brand" },
  ];
  const cols: Column<Mov>[] = [
    { key: "id", header: "ID", render: (m) => <span className="font-mono text-xs">{m.id.slice(0, 14)}…</span> },
    { key: "trace", header: "Clave rastreo", render: (m) => <span className="font-mono text-xs">{m.trace.slice(0, 18)}</span> },
    { key: "date", header: "Fecha" },
    { key: "medaId", header: "Meda ID" },
    { key: "type", header: "Tipo", render: (m) => <Badge variant={m.type === "Crédito" ? "success" : "error"}>{m.type}</Badge> },
    { key: "network", header: "Red", render: (m) => <Badge variant={m.network === "Interna" ? "info" : "warning"}>{m.network}</Badge> },
    { key: "amount", header: "Monto", align: "right", render: (m) => (
      <span className={m.type === "Crédito" ? "font-semibold text-price-up" : "font-semibold text-fg"}>${m.amount.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN</span>
    ) },
    { key: "status", header: "Estado", render: (m) => (
      <span className={`text-sm ${m.status === "Completado" ? "text-success" : "text-info"}`}>{m.status}</span>
    ) },
    { key: "trace", header: "CEP", align: "right", render: (m) => m.status !== "Completado"
      ? <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); setDetail(m); }}>Ver CEP</Button>
      : <span className="text-fg-tertiary">—</span> },
  ];
  return (
    <>
      <h1 className="mb-1 text-2xl font-semibold text-fg">Movimientos</h1>
      <p className="mb-6 text-fg-secondary">Historial de entradas y salidas de la cuenta.</p>
      <DataTable
        title="MOVIMIENTOS" count={50} data={MOVS} columns={cols} rowKey={(m) => m.id + m.trace} stats={stats}
        onRowClick={(m) => setDetail(m)}
        searchFields={[
          { placeholder: "ID Transacción", keys: ["id"] },
          { placeholder: "Clave de rastreo", keys: ["trace"] },
          { placeholder: "Meda ID", keys: ["medaId"] },
        ]}
      />
      <DetailModal
        open={!!detail} onClose={() => setDetail(null)} title="Comprobante Banxico (CEP)" icon="▤" size="lg"
        fields={detail ? [
          { label: "Concepto", value: "Pago" },
          { label: "Estado", value: "Liquidado" },
          { label: "Clave de rastreo", value: <span className="font-mono">{detail.trace.slice(0, 16)}</span> },
          { label: "Cuenta origen", value: "012090004555164987" },
          { label: "Cuenta destino", value: "646180191202426879" },
          { label: "Monto", value: `$${detail.amount.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN` },
        ] : []}
        footer={<><Button variant="outline" onClick={() => setDetail(null)}>Cerrar</Button><Button>⭳ Descargar CEP</Button></>}
      >
        <p className="text-sm text-fg-secondary">Comprobante Electrónico de Pago emitido por Banxico para esta operación SPEI®.</p>
      </DetailModal>
    </>
  );
}

// ---------- Transfers ----------
interface Trf { id: string; folio: string; beneficiary: string; clabe: string; amount: number; concept: string; status: string; date: string; }
const TRFS: Trf[] = [
  { id: "1", folio: "TRF-2001", beneficiary: "Comercializadora Norte SA", clabe: "0123**********4567", amount: 5000, concept: "Pago proveedor", status: "Success", date: "18 jun 2026" },
  { id: "2", folio: "TRF-2002", beneficiary: "Juan Pérez López", clabe: "0145**********6789", amount: 1500, concept: "Reembolso gastos", status: "Processing", date: "21 jun 2026" },
];

function TransfersScreen({ onNew }: { onNew: () => void }) {
  const cols: Column<Trf>[] = [
    { key: "folio", header: "Folio", render: (t) => <span className="font-mono text-xs">{t.folio}</span> },
    { key: "beneficiary", header: "Beneficiario", render: (t) => <span className="font-medium text-fg">{t.beneficiary}</span> },
    { key: "clabe", header: "CLABE", render: (t) => <span className="font-mono text-xs text-fg-secondary">{t.clabe}</span> },
    { key: "amount", header: "Monto", align: "right", render: (t) => <span className="font-semibold text-fg">${t.amount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span> },
    { key: "concept", header: "Concepto" },
    { key: "status", header: "Estado", render: (t) => (
      <span className={`inline-flex items-center gap-1.5 text-sm ${t.status === "Success" ? "text-success" : "text-info"}`}>
        <span className={`h-2 w-2 rounded-full ${t.status === "Success" ? "bg-success" : "bg-info"}`} />{t.status}
      </span>
    ) },
    { key: "date", header: "Fecha", align: "right" },
  ];
  return (
    <>
      <h1 className="mb-1 text-2xl font-semibold text-fg">Transferencias</h1>
      <p className="mb-6 text-fg-secondary">Transferencias enviadas y su estado.</p>
      <DataTable
        title="TRANSFERENCIAS" count={TRFS.length} data={TRFS} columns={cols} rowKey={(t) => t.id}
        actions={<Button onClick={onNew}>+ Nueva transferencia</Button>}
      />
    </>
  );
}

function NewTransferScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="mx-auto max-w-xl">
      <button onClick={onBack} className="mb-4 text-sm text-fg-secondary hover:text-fg">← Volver a transferencias</button>
      <div className="rounded-meda border border-border-default bg-surface p-6">
        <h1 className="text-xl font-semibold text-fg">Nueva transferencia</h1>
        <p className="mb-6 text-sm text-fg-secondary">Validación CLABE, RFC y confirmación antes de enviar.</p>
        <div className="space-y-4">
          <Field><FieldLabel htmlFor="b">Beneficiario</FieldLabel><Input id="b" placeholder="Nombre completo" /></Field>
          <Field><FieldLabel htmlFor="c">CLABE (18 dígitos)</FieldLabel><Input id="c" placeholder="0000 0000 0000 0000 00" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field><FieldLabel htmlFor="r">RFC (opcional)</FieldLabel><Input id="r" placeholder="XAXX010101000" /></Field>
            <Field><FieldLabel htmlFor="a">Monto</FieldLabel><Input id="a" placeholder="$ 0.00" /></Field>
          </div>
          <Field><FieldLabel htmlFor="co">Concepto (opcional)</FieldLabel><Input id="co" placeholder="Pago de…" /></Field>
          <Button className="w-full">Revisar transferencia</Button>
        </div>
      </div>
    </div>
  );
}
