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
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";
import { StatusPill } from "@/components/ui/status-pill";
import { AmountInput } from "@/components/ui/amount-input";
import { CopyField } from "@/components/ui/copy-field";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { DropdownMenu, DropdownItem } from "@/components/ui/dropdown-menu";
import { Tooltip } from "@/components/ui/tooltip";
import { Accordion } from "@/components/ui/accordion";
import { Popover } from "@/components/ui/popover";
import { RadioGroup } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SuccessIcon, ErrorIcon, WaitingIcon, GeolocationIcon } from "@/components/icons/status-icons";
import { Combobox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/date-picker";
import { MedaLogo } from "@/features/auth/meda-logo";

function Demo({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="rounded-meda border border-border-default bg-surface p-5 meda-fade-in">
      <p className="mb-4 text-sm font-medium text-fg">{name}</p>
      <div className="flex min-h-12 flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}
function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-fg-secondary">{title}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}

export default function ComponentsPage() {
  const [sw, setSw] = useState(true);
  return (
    <main className="min-h-screen bg-bg p-8">
      <div className="mx-auto max-w-6xl meda-page-enter">
        <header className="mb-10 flex items-center justify-between">
          <MedaLogo className="h-8 text-fg" />
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-fg-secondary hover:text-fg">Home</Link>
            <Link href="/showcase" className="text-sm text-fg-secondary hover:text-fg">← Showcase</Link>
            <ThemeToggle />
          </div>
        </header>
        <h1 className="mb-2 text-2xl font-semibold text-fg">All components</h1>
        <p className="mb-10 text-sm text-fg-secondary">Every MEDA UI primitive with a live demo. Import from <code>@/components/ui</code>.</p>

        <Group title="Actions">
          <Demo name="Button"><Button variant="primary">Primary</Button><Button variant="outline">Outline</Button><Button variant="danger">Danger</Button></Demo>
          <Demo name="Badge"><Badge variant="success">Success</Badge><Badge variant="error">Error</Badge><Badge variant="brand">Brand</Badge></Demo>
          <Demo name="Avatar"><Avatar name="Ana García" /><Avatar name="Carlos López" /></Demo>
        </Group>

        <Group title="Forms">
          <Demo name="Input"><Input placeholder="Type here..." /></Demo>
          <Demo name="FormField"><FormField label="Email" placeholder="you@meda.com.mx" hint="Label + hint" /></Demo>
          <Demo name="Select"><Select options={[{ value: "1", label: "Option 1" }, { value: "2", label: "Option 2" }]} /></Demo>
          <Demo name="Textarea"><Textarea placeholder="Write a note..." /></Demo>
          <Demo name="Switch"><Switch checked={sw} onChange={setSw} /></Demo>
          <Demo name="Checkbox"><Checkbox label="I agree" defaultChecked /></Demo>
        </Group>

        <Group title="Feedback">
          <Demo name="Spinner"><Spinner /></Demo>
          <Demo name="Skeleton"><div className="w-full space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-1/2" /></div></Demo>
          <Demo name="Alert"><Alert variant="warning" title="Heads up">Check before sending.</Alert></Demo>
          <Demo name="Separator"><div className="w-full">Above<Separator className="my-2" />Below</div></Demo>
        </Group>

        <Group title="Fintech">
          <Demo name="StatusPill"><StatusPill status="SUCCESS" /><StatusPill status="PROCESSING" /><StatusPill status="FAILED" /></Demo>
          <Demo name="AmountInput"><AmountInput value={1234.5} onChange={() => {}} /></Demo>
          <Demo name="CopyField"><div className="w-full"><CopyField label="CLABE" value="012180012345678901" masked /></div></Demo>
        </Group>

        <Group title="Advanced fintech inputs">
          <Demo name="Combobox (searchable)"><div className="w-full"><Combobox value="" onChange={() => {}} options={[{ value: "1", label: "Binance" }, { value: "2", label: "BPN" }, { value: "3", label: "STP" }]} placeholder="Select merchant" /></div></Demo>
          <Demo name="DatePicker"><div className="w-full"><DatePicker value={null} onChange={() => {}} /></div></Demo>
        </Group>

        <Group title="Overlays & navigation">
          <Demo name="DropdownMenu"><DropdownMenu trigger={<Button variant="outline">Actions</Button>}><DropdownItem>Edit</DropdownItem><DropdownItem danger>Delete</DropdownItem></DropdownMenu></Demo>
          <Demo name="Tooltip"><Tooltip content="Helpful hint"><span className="text-fg underline">Hover me</span></Tooltip></Demo>
          <Demo name="Popover"><Popover trigger={<Button variant="outline">Open</Button>}><p className="text-sm text-fg">Popover content</p></Popover></Demo>
          <Demo name="Breadcrumb"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Transactions" }]} /></Demo>
        </Group>

        <Group title="More inputs & feedback">
          <Demo name="RadioGroup"><RadioGroup name="t" value="spei" onChange={() => {}} options={[{ value: "spei", label: "SPEI" }, { value: "card", label: "Card" }]} /></Demo>
          <Demo name="Progress"><div className="w-full"><Progress value={66} /></div></Demo>
          <Demo name="Accordion"><div className="w-full"><Accordion items={[{ id: "1", title: "Section one", content: "Hidden content" }]} /></div></Demo>
        </Group>

        <Group title="Brand icons">
          <Demo name="Status icons (MEDA brand)"><SuccessIcon size={40} /><ErrorIcon size={40} /><WaitingIcon size={40} /><GeolocationIcon size={40} /></Demo>
        </Group>

        <Group title="Layout">
          <Demo name="Card"><Card className="w-full"><CardHeader><CardTitle>Title</CardTitle></CardHeader><CardContent><p className="text-sm text-fg">Body content</p></CardContent></Card></Demo>
        </Group>
      </div>
    </main>
  );
}
