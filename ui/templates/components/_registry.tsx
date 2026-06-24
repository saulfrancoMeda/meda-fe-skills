"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import {
  Field, FieldGroup, FieldLabel, FieldDescription, FieldError,
  FieldSet, FieldLegend, FieldContent, FieldTitle,
} from "@/components/ui/field";
import {
  InputGroup, InputGroupInput, InputGroupAddon, InputGroupText, InputGroupButton,
} from "@/components/ui/input-group";
import { InputOTP } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Combobox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/date-picker";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Alert } from "@/components/ui/alert";
import { useToast } from "@/components/ui/toast";
import { Separator } from "@/components/ui/separator";
import { Dialog } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { DropdownMenu, DropdownItem } from "@/components/ui/dropdown-menu";
import { Popover } from "@/components/ui/popover";
import { Tooltip } from "@/components/ui/tooltip";
import { HoverCard } from "@/components/ui/hover-card";
import { Sheet } from "@/components/ui/sheet";
import { Command } from "@/components/ui/command";
import { Tabs } from "@/components/ui/tabs";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { Accordion } from "@/components/ui/accordion";
import { Collapsible } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, THead, TR, TH, TD } from "@/components/ui/table";
import { DataTable, type Column } from "@/components/ui/data-table";
import { AmountInput } from "@/components/ui/amount-input";
import { CopyField } from "@/components/ui/copy-field";
import { StatusPill, StatusResult } from "@/components/ui/status-pill";
import { TransactionCard } from "@/components/ui/transaction-card";
import { SuccessIcon, ErrorIcon, WaitingIcon, GeolocationIcon } from "@/components/icons/status-icons";

export interface Example {
  title: string;
  description?: string;
  code: string;
  render: () => React.ReactNode;
}
export interface ComponentDoc {
  description: string;
  import: string;
  examples: Example[];
}

/* ----------------------------- interactive demos ---------------------------- */

function SwitchDemo() {
  const [on, setOn] = React.useState(true);
  return (
    <div className="flex items-center gap-3">
      <Switch checked={on} onChange={setOn} />
      <span className="text-sm text-fg-secondary">{on ? "Enabled" : "Disabled"}</span>
    </div>
  );
}
function RadioDemo() {
  const [v, setV] = React.useState("spei");
  return <RadioGroup name="pay" value={v} onChange={setV}
    options={[{ value: "spei", label: "SPEI" }, { value: "card", label: "Card" }, { value: "cash", label: "Cash" }]} />;
}
function SliderDemo() {
  const [v, setV] = React.useState(40);
  return (
    <div className="w-full max-w-xs">
      <div className="mb-2 flex justify-between text-sm text-fg-secondary"><span>Amount</span><span className="text-fg">{v}%</span></div>
      <Slider value={v} onChange={setV} />
    </div>
  );
}
function ComboboxDemo() {
  const [v, setV] = React.useState("");
  return (
    <div className="w-full max-w-xs">
      <Combobox value={v} onChange={setV} placeholder="Select merchant"
        options={[
          { value: "binance", label: "Binance", description: "Crypto exchange" },
          { value: "bpn", label: "BPN", description: "Bank" },
          { value: "stp", label: "STP", description: "SPEI provider" },
        ]} />
    </div>
  );
}
function DatePickerDemo() {
  const [d, setD] = React.useState<Date | null>(null);
  return <div className="w-full max-w-xs"><DatePicker value={d} onChange={setD} /></div>;
}
function TabsDemo() {
  const [tab, setTab] = React.useState("overview");
  return (
    <div className="w-full max-w-md">
      <Tabs active={tab} onChange={setTab}
        tabs={[{ id: "overview", label: "Overview" }, { id: "activity", label: "Activity" }, { id: "settings", label: "Settings" }]} />
      <div className="p-4 text-sm text-fg-secondary">Active tab: <span className="text-fg font-medium">{tab}</span></div>
    </div>
  );
}
function DialogDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Edit profile">
        <p className="text-sm text-fg-secondary">Update your account details and save changes.</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Save</Button>
        </div>
      </Dialog>
    </>
  );
}
function ConfirmDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>Delete account</Button>
      <ConfirmDialog open={open} onClose={() => setOpen(false)} onConfirm={() => setOpen(false)}
        danger title="Delete this account?" description="This action cannot be undone." confirmLabel="Delete" />
    </>
  );
}
function SheetDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Open sheet</Button>
      <Sheet open={open} onClose={() => setOpen(false)} title="Filters">
        <p className="text-sm text-fg-secondary">Side panel content goes here.</p>
      </Sheet>
    </>
  );
}
function PaginationDemo() {
  const [page, setPage] = React.useState(1);
  return <Pagination page={page} totalPages={5} onPage={setPage} />;
}
function AmountDemo() {
  const [v, setV] = React.useState<number | "">(1234.5);
  return <div className="w-full max-w-xs"><AmountInput value={v} onChange={setV} /></div>;
}
function ToggleGroupDemo() {
  const [v, setV] = React.useState("1d");
  return <ToggleGroup value={v} onChange={setV}
    options={[{ value: "1d", label: "1D" }, { value: "1w", label: "1W" }, { value: "1m", label: "1M" }, { value: "1y", label: "1Y" }]} />;
}
function ToastDemo() {
  const { show } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => show("success", "Transfer sent")}>Success</Button>
      <Button variant="outline" onClick={() => show("error", "Payment failed")}>Error</Button>
      <Button variant="outline" onClick={() => show("info", "Heads up", { action: { label: "Undo", onClick: () => show("info", "Undone") } })}>With action</Button>
    </div>
  );
}
function ProgressDemo() {
  const [v, setV] = React.useState(33);
  return (
    <div className="w-full max-w-xs space-y-3">
      <Progress value={v} />
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setV((x) => Math.max(0, x - 10))}>-10</Button>
        <Button size="sm" variant="outline" onClick={() => setV((x) => Math.min(100, x + 10))}>+10</Button>
      </div>
    </div>
  );
}
function OtpDemo() {
  const [v, setV] = React.useState("");
  return (
    <div className="space-y-2">
      <InputOTP maxLength={6} value={v} onChange={setV} groups={[3, 3]} />
      <p className="text-xs text-fg-secondary">Code: {v || "—"}</p>
    </div>
  );
}
function CheckboxDemo() {
  const [checked, setChecked] = React.useState(true);
  return <Checkbox label="I accept the terms" checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
}
function CommandDemo() {
  const { show } = useToast();
  return (
    <div className="w-full max-w-md">
      <Command
        placeholder="Type a command…"
        items={[
          { id: "new", label: "New transfer", onSelect: () => show("info", "New transfer") },
          { id: "search", label: "Search transactions", onSelect: () => show("info", "Search") },
          { id: "export", label: "Export report", onSelect: () => show("info", "Export") },
        ]} />
    </div>
  );
}

/* ------------------------------- demo data --------------------------------- */

type Row = { id: string; merchant: string; amount: number; status: string };
const ROWS: Row[] = [
  { id: "MX-9001", merchant: "Spotify", amount: -149, status: "SUCCESS" },
  { id: "MX-9002", merchant: "Depósito SPEI", amount: 5000, status: "SUCCESS" },
  { id: "MX-9003", merchant: "Amazon", amount: -899, status: "PROCESSING" },
];
const COLUMNS: Column<Row>[] = [
  { key: "id", header: "Order", sortable: true },
  { key: "merchant", header: "Merchant", sortable: true },
  { key: "amount", header: "Amount", align: "right", sortable: true, render: (r) => (
    <span className={r.amount < 0 ? "text-price-down" : "text-price-up"}>{r.amount < 0 ? "-" : "+"}${Math.abs(r.amount)}</span>
  ) },
  { key: "status", header: "Status", render: (r) => <StatusPill status={r.status as never} /> },
];

/* ------------------------------- the registry ------------------------------ */

export const EXAMPLES: Record<string, ComponentDoc> = {
  /* ---------------------------------- Actions -------------------------------- */
  button: {
    description: "Buttons trigger an action or event. Use the right variant to signal intent: primary for the main action, outline/secondary for secondary ones, danger for destructive, link/ghost for low-emphasis.",
    import: 'import { Button } from "@/components/ui/button";',
    examples: [
      { title: "Variants", description: "Every visual style available.",
        code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="danger">Danger</Button>`,
        render: () => (
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="danger">Danger</Button>
          </div>
        ) },
      { title: "Sizes",
        code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
        render: () => (
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        ) },
      { title: "Loading & disabled", description: "Loading shows a spinner and blocks clicks.",
        code: `<Button loading>Sending…</Button>
<Button disabled>Disabled</Button>`,
        render: () => (
          <div className="flex flex-wrap gap-3">
            <Button loading>Sending…</Button>
            <Button disabled>Disabled</Button>
          </div>
        ) },
      { title: "Full width",
        code: `<Button className="w-full">Continue</Button>`,
        render: () => <div className="w-full max-w-sm"><Button className="w-full">Continue</Button></div> },
    ],
  },
  badge: {
    description: "Badges highlight status, counts or metadata. In fintech, use them for transaction states and risk levels.",
    import: 'import { Badge } from "@/components/ui/badge";',
    examples: [
      { title: "Variants",
        code: `<Badge>Default</Badge>
<Badge variant="brand">Brand</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>`,
        render: () => (
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="brand">Brand</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        ) },
      { title: "In context",
        code: `<span>Verified <Badge variant="success">KYC</Badge></span>`,
        render: () => <span className="text-sm text-fg">Verified <Badge variant="success">KYC</Badge></span> },
    ],
  },
  avatar: {
    description: "Avatars represent a user. They fall back to initials derived from the name when no image is provided.",
    import: 'import { Avatar } from "@/components/ui/avatar";',
    examples: [
      { title: "Initials fallback",
        code: `<Avatar name="Ana García" />
<Avatar name="Carlos López" />`,
        render: () => <div className="flex gap-3"><Avatar name="Ana García" /><Avatar name="Carlos López" /></div> },
      { title: "Sizes",
        code: `<Avatar name="Ana García" size="sm" />
<Avatar name="Ana García" size="md" />
<Avatar name="Ana García" size="lg" />`,
        render: () => (
          <div className="flex items-center gap-3">
            <Avatar name="Ana García" size="sm" />
            <Avatar name="Ana García" size="md" />
            <Avatar name="Ana García" size="lg" />
          </div>
        ) },
    ],
  },
  "toggle-group": {
    description: "A set of two-state buttons where one option is active. Great for chart ranges, view switches or filters.",
    import: 'import { ToggleGroup } from "@/components/ui/toggle-group";',
    examples: [
      { title: "Single select",
        code: `const [v, setV] = useState("1d");
<ToggleGroup value={v} onChange={setV} options={[
  { value: "1d", label: "1D" },
  { value: "1w", label: "1W" },
  { value: "1m", label: "1M" },
  { value: "1y", label: "1Y" },
]} />`,
        render: () => <ToggleGroupDemo /> },
    ],
  },
  "theme-toggle": {
    description: "Toggles the .dark class on <html>. MEDA is dark-first (Binance style); the toggle persists the choice.",
    import: 'import { ThemeToggle } from "@/components/ui/theme-toggle";',
    examples: [
      { title: "Default",
        code: `<ThemeToggle />`,
        render: () => <ThemeToggle /> },
    ],
  },

  /* ----------------------------------- Forms -------------------------------- */
  input: {
    description: "The base text field. Spreads native input attributes and exposes an `error` flag for invalid states.",
    import: 'import { Input } from "@/components/ui/input";',
    examples: [
      { title: "Default",
        code: `<Input placeholder="you@meda.com.mx" />`,
        render: () => <div className="w-full max-w-xs"><Input placeholder="you@meda.com.mx" /></div> },
      { title: "Error state",
        code: `<Input error defaultValue="not-an-email" />`,
        render: () => <div className="w-full max-w-xs"><Input error defaultValue="not-an-email" /></div> },
      { title: "Disabled & types",
        code: `<Input disabled placeholder="Disabled" />
<Input type="password" placeholder="Password" />`,
        render: () => (
          <div className="w-full max-w-xs space-y-3">
            <Input disabled placeholder="Disabled" />
            <Input type="password" placeholder="Password" />
          </div>
        ) },
    ],
  },
  "form-field": {
    description: "Opinionated all-in-one: label + input + hint/error wired with the correct aria attributes. Use it for quick forms; use Field for full control.",
    import: 'import { FormField } from "@/components/ui/form-field";',
    examples: [
      { title: "Label + hint",
        code: `<FormField label="Email" placeholder="you@meda.com.mx" hint="We'll never share it." />`,
        render: () => <div className="w-full max-w-xs"><FormField label="Email" placeholder="you@meda.com.mx" hint="We'll never share it." /></div> },
      { title: "With error",
        code: `<FormField label="Email" defaultValue="bad" error="Enter a valid email" />`,
        render: () => <div className="w-full max-w-xs"><FormField label="Email" defaultValue="bad" error="Enter a valid email" /></div> },
    ],
  },
  field: {
    description: "The composable form primitive (shadcn pattern). Assemble Field + FieldLabel + control + FieldDescription/FieldError yourself. Use FieldGroup to stack, FieldSet/FieldLegend to group, and orientation=\"horizontal\" for toggles.",
    import: 'import { Field, FieldGroup, FieldLabel, FieldDescription, FieldError, FieldSet, FieldLegend, FieldSeparator } from "@/components/ui/field";',
    examples: [
      { title: "Basic field",
        code: `<Field>
  <FieldLabel htmlFor="name">Full name</FieldLabel>
  <Input id="name" placeholder="Ana García" />
  <FieldDescription>As it appears on your ID.</FieldDescription>
</Field>`,
        render: () => (
          <div className="w-full max-w-sm">
            <Field>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input id="name" placeholder="Ana García" />
              <FieldDescription>As it appears on your ID.</FieldDescription>
            </Field>
          </div>
        ) },
      { title: "With validation error",
        code: `<Field>
  <FieldLabel htmlFor="clabe">CLABE</FieldLabel>
  <Input id="clabe" error defaultValue="0121800" />
  <FieldError>CLABE must be 18 digits.</FieldError>
</Field>`,
        render: () => (
          <div className="w-full max-w-sm">
            <Field>
              <FieldLabel htmlFor="clabe">CLABE</FieldLabel>
              <Input id="clabe" error defaultValue="0121800" />
              <FieldError>CLABE must be 18 digits.</FieldError>
            </Field>
          </div>
        ) },
      { title: "Horizontal (for toggles)",
        code: `<Field orientation="horizontal">
  <FieldContent>
    <FieldTitle>Two-factor auth</FieldTitle>
    <FieldDescription>Extra security at sign-in.</FieldDescription>
  </FieldContent>
  <Switch checked={on} onChange={setOn} />
</Field>`,
        render: () => <HorizontalFieldDemo /> },
      { title: "Grouped (FieldSet + FieldGroup)",
        code: `<FieldSet>
  <FieldLegend>Beneficiary</FieldLegend>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="b-name">Name</FieldLabel>
      <Input id="b-name" placeholder="Juan Pérez" />
    </Field>
    <Field>
      <FieldLabel htmlFor="b-clabe">CLABE</FieldLabel>
      <Input id="b-clabe" placeholder="18 digits" />
    </Field>
  </FieldGroup>
</FieldSet>`,
        render: () => (
          <div className="w-full max-w-sm">
            <FieldSet>
              <FieldLegend>Beneficiary</FieldLegend>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="b-name">Name</FieldLabel>
                  <Input id="b-name" placeholder="Juan Pérez" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="b-clabe">CLABE</FieldLabel>
                  <Input id="b-clabe" placeholder="18 digits" />
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>
        ) },
    ],
  },
  "input-group": {
    description: "Attach icons, text or buttons to an input. Compose with InputGroupAddon (align inline-start / inline-end / block-end), InputGroupInput, InputGroupText and InputGroupButton.",
    import: 'import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText, InputGroupButton } from "@/components/ui/input-group";',
    examples: [
      { title: "Leading icon",
        code: `<InputGroup>
  <InputGroupAddon><span>🔍</span></InputGroupAddon>
  <InputGroupInput placeholder="Search transactions…" />
</InputGroup>`,
        render: () => (
          <div className="w-full max-w-xs">
            <InputGroup>
              <InputGroupAddon><span aria-hidden>🔍</span></InputGroupAddon>
              <InputGroupInput placeholder="Search transactions…" />
            </InputGroup>
          </div>
        ) },
      { title: "Text addons (prefix / suffix)",
        code: `<InputGroup>
  <InputGroupAddon><InputGroupText>$</InputGroupText></InputGroupAddon>
  <InputGroupInput inputMode="decimal" placeholder="0.00" />
  <InputGroupAddon align="inline-end"><InputGroupText>MXN</InputGroupText></InputGroupAddon>
</InputGroup>`,
        render: () => (
          <div className="w-full max-w-xs">
            <InputGroup>
              <InputGroupAddon><InputGroupText>$</InputGroupText></InputGroupAddon>
              <InputGroupInput inputMode="decimal" placeholder="0.00" />
              <InputGroupAddon align="inline-end"><InputGroupText>MXN</InputGroupText></InputGroupAddon>
            </InputGroup>
          </div>
        ) },
      { title: "Inline button",
        code: `<InputGroup>
  <InputGroupInput placeholder="Promo code" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton>Apply</InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
        render: () => (
          <div className="w-full max-w-xs">
            <InputGroup>
              <InputGroupInput placeholder="Promo code" />
              <InputGroupAddon align="inline-end"><InputGroupButton>Apply</InputGroupButton></InputGroupAddon>
            </InputGroup>
          </div>
        ) },
    ],
  },
  "input-otp": {
    description: "One-time-password input. Dependency-free, with auto-advance, backspace, arrow keys and paste. Use `groups` to split the code (e.g. [3,3]) and `onComplete` to submit automatically.",
    import: 'import { InputOTP } from "@/components/ui/input-otp";',
    examples: [
      { title: "6 digits, grouped",
        code: `const [code, setCode] = useState("");
<InputOTP maxLength={6} value={code} onChange={setCode} groups={[3, 3]} />`,
        render: () => <OtpDemo /> },
      { title: "4 digits (PIN)",
        code: `<InputOTP maxLength={4} value={pin} onChange={setPin} />`,
        render: () => <OtpFourDemo /> },
    ],
  },
  label: {
    description: "A styled, accessible <label>. Pair with form controls via htmlFor.",
    import: 'import { Label } from "@/components/ui/label";',
    examples: [
      { title: "With input",
        code: `<Label htmlFor="email">Email</Label>
<Input id="email" placeholder="you@meda.com.mx" />`,
        render: () => (
          <div className="w-full max-w-xs space-y-1.5">
            <Label htmlFor="email-demo">Email</Label>
            <Input id="email-demo" placeholder="you@meda.com.mx" />
          </div>
        ) },
    ],
  },
  textarea: {
    description: "Multi-line text input. Supports the same error flag as Input.",
    import: 'import { Textarea } from "@/components/ui/textarea";',
    examples: [
      { title: "Default",
        code: `<Textarea placeholder="Add a note…" />`,
        render: () => <div className="w-full max-w-sm"><Textarea placeholder="Add a note…" /></div> },
      { title: "Error",
        code: `<Textarea error placeholder="Required" />`,
        render: () => <div className="w-full max-w-sm"><Textarea error placeholder="Required" /></div> },
    ],
  },
  select: {
    description: "Native select wrapped with MEDA styles. Pass options as an array.",
    import: 'import { Select } from "@/components/ui/select";',
    examples: [
      { title: "Default",
        code: `<Select options={[
  { value: "mxn", label: "MXN — Peso" },
  { value: "usd", label: "USD — Dollar" },
  { value: "eur", label: "EUR — Euro" },
]} />`,
        render: () => (
          <div className="w-full max-w-xs">
            <Select options={[{ value: "mxn", label: "MXN — Peso" }, { value: "usd", label: "USD — Dollar" }, { value: "eur", label: "EUR — Euro" }]} />
          </div>
        ) },
    ],
  },
  checkbox: {
    description: "A boolean control with an optional label. Controlled or uncontrolled.",
    import: 'import { Checkbox } from "@/components/ui/checkbox";',
    examples: [
      { title: "Controlled",
        code: `const [checked, setChecked] = useState(true);
<Checkbox label="I accept the terms" checked={checked} onChange={(e) => setChecked(e.target.checked)} />`,
        render: () => <CheckboxDemo /> },
      { title: "States",
        code: `<Checkbox label="Default" />
<Checkbox label="Checked" defaultChecked />
<Checkbox label="Disabled" disabled />`,
        render: () => (
          <div className="space-y-2">
            <Checkbox label="Default" />
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="Disabled" disabled />
          </div>
        ) },
    ],
  },
  "radio-group": {
    description: "Pick exactly one option from a small list. Controlled via value/onChange.",
    import: 'import { RadioGroup } from "@/components/ui/radio-group";',
    examples: [
      { title: "Payment method",
        code: `const [v, setV] = useState("spei");
<RadioGroup name="pay" value={v} onChange={setV} options={[
  { value: "spei", label: "SPEI" },
  { value: "card", label: "Card" },
  { value: "cash", label: "Cash" },
]} />`,
        render: () => <RadioDemo /> },
    ],
  },
  switch: {
    description: "An on/off toggle for instant settings (no submit). Controlled via checked/onChange.",
    import: 'import { Switch } from "@/components/ui/switch";',
    examples: [
      { title: "Controlled",
        code: `const [on, setOn] = useState(true);
<Switch checked={on} onChange={setOn} />`,
        render: () => <SwitchDemo /> },
    ],
  },
  slider: {
    description: "Select a numeric value within a range. Controlled via value/onChange with optional min/max/step.",
    import: 'import { Slider } from "@/components/ui/slider";',
    examples: [
      { title: "Percentage",
        code: `const [v, setV] = useState(40);
<Slider value={v} onChange={setV} />`,
        render: () => <SliderDemo /> },
    ],
  },
  combobox: {
    description: "A searchable select for long lists (merchants, currencies, beneficiaries). Type to filter, arrow keys to move, Enter to pick.",
    import: 'import { Combobox } from "@/components/ui/combobox";',
    examples: [
      { title: "Searchable",
        code: `const [v, setV] = useState("");
<Combobox value={v} onChange={setV} placeholder="Select merchant" options={[
  { value: "binance", label: "Binance", description: "Crypto exchange" },
  { value: "bpn", label: "BPN", description: "Bank" },
  { value: "stp", label: "STP", description: "SPEI provider" },
]} />`,
        render: () => <ComboboxDemo /> },
    ],
  },
  "date-picker": {
    description: "A calendar input. Controlled via a Date | null value. Localized (defaults to es-MX).",
    import: 'import { DatePicker } from "@/components/ui/date-picker";',
    examples: [
      { title: "Default",
        code: `const [date, setDate] = useState<Date | null>(null);
<DatePicker value={date} onChange={setDate} />`,
        render: () => <DatePickerDemo /> },
    ],
  },

  /* --------------------------------- Feedback ------------------------------- */
  spinner: {
    description: "An indeterminate loading indicator. Inherits the current text color.",
    import: 'import { Spinner } from "@/components/ui/spinner";',
    examples: [
      { title: "Default",
        code: `<Spinner />`,
        render: () => <Spinner /> },
      { title: "Inside a button",
        code: `<Button loading>Loading</Button>`,
        render: () => <Button loading>Loading</Button> },
    ],
  },
  skeleton: {
    description: "A shimmering placeholder shown while content loads. Compose to mirror the final layout.",
    import: 'import { Skeleton } from "@/components/ui/skeleton";',
    examples: [
      { title: "Lines",
        code: `<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-4 w-1/2" />`,
        render: () => (
          <div className="w-full max-w-xs space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) },
      { title: "Card placeholder",
        code: `<div className="flex items-center gap-3">
  <Skeleton className="h-10 w-10 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-3 w-32" />
    <Skeleton className="h-3 w-20" />
  </div>
</div>`,
        render: () => (
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ) },
    ],
  },
  progress: {
    description: "A determinate progress bar (0–100). Useful for uploads, onboarding and limits.",
    import: 'import { Progress } from "@/components/ui/progress";',
    examples: [
      { title: "Interactive",
        code: `const [v, setV] = useState(33);
<Progress value={v} />`,
        render: () => <ProgressDemo /> },
    ],
  },
  alert: {
    description: "An inline message box. Four intents: info, success, warning, error.",
    import: 'import { Alert } from "@/components/ui/alert";',
    examples: [
      { title: "Intents",
        code: `<Alert variant="info" title="Info">New statement available.</Alert>
<Alert variant="success" title="Done">Transfer completed.</Alert>
<Alert variant="warning" title="Heads up">Verify before sending.</Alert>
<Alert variant="error" title="Error">Insufficient balance.</Alert>`,
        render: () => (
          <div className="w-full max-w-md space-y-3">
            <Alert variant="info" title="Info">New statement available.</Alert>
            <Alert variant="success" title="Done">Transfer completed.</Alert>
            <Alert variant="warning" title="Heads up">Verify before sending.</Alert>
            <Alert variant="error" title="Error">Insufficient balance.</Alert>
          </div>
        ) },
    ],
  },
  toast: {
    description: "Transient notifications (Binance-style). Wrap your app in <ToastProvider> and call useToast().show(type, message, options). Supports an action button (e.g. Undo).",
    import: 'import { ToastProvider, useToast } from "@/components/ui/toast";',
    examples: [
      { title: "Show toasts",
        code: `const { show } = useToast();
<Button onClick={() => show("success", "Transfer sent")}>Success</Button>
<Button onClick={() => show("error", "Payment failed")}>Error</Button>
<Button onClick={() => show("info", "Heads up", {
  action: { label: "Undo", onClick: () => show("info", "Undone") },
})}>With action</Button>`,
        render: () => <ToastDemo /> },
    ],
  },
  separator: {
    description: "A thin divider between blocks of content.",
    import: 'import { Separator } from "@/components/ui/separator";',
    examples: [
      { title: "Horizontal",
        code: `Above
<Separator className="my-2" />
Below`,
        render: () => (
          <div className="w-full max-w-xs text-sm text-fg">Above<Separator className="my-2" />Below</div>
        ) },
    ],
  },

  /* --------------------------------- Overlays ------------------------------- */
  dialog: {
    description: "A modal window for focused tasks. Controlled via open/onClose. Closes on Escape and backdrop click.",
    import: 'import { Dialog } from "@/components/ui/dialog";',
    examples: [
      { title: "Basic",
        code: `const [open, setOpen] = useState(false);
<Button onClick={() => setOpen(true)}>Open dialog</Button>
<Dialog open={open} onClose={() => setOpen(false)} title="Edit profile">
  …content…
</Dialog>`,
        render: () => <DialogDemo /> },
    ],
  },
  "confirm-dialog": {
    description: "A pre-built confirmation modal for risky/financial actions. Always confirm money movements and deletions.",
    import: 'import { ConfirmDialog } from "@/components/ui/confirm-dialog";',
    examples: [
      { title: "Destructive",
        code: `<ConfirmDialog open={open} onClose={close} onConfirm={remove}
  danger title="Delete this account?"
  description="This action cannot be undone." confirmLabel="Delete" />`,
        render: () => <ConfirmDemo /> },
    ],
  },
  "dropdown-menu": {
    description: "A menu of actions anchored to a trigger. Use DropdownItem (danger flag for destructive).",
    import: 'import { DropdownMenu, DropdownItem } from "@/components/ui/dropdown-menu";',
    examples: [
      { title: "Actions",
        code: `<DropdownMenu trigger={<Button variant="outline">Actions</Button>}>
  <DropdownItem onClick={edit}>Edit</DropdownItem>
  <DropdownItem onClick={share}>Share</DropdownItem>
  <DropdownItem danger onClick={remove}>Delete</DropdownItem>
</DropdownMenu>`,
        render: () => (
          <DropdownMenu trigger={<Button variant="outline">Actions</Button>}>
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem>Share</DropdownItem>
            <DropdownItem danger>Delete</DropdownItem>
          </DropdownMenu>
        ) },
    ],
  },
  popover: {
    description: "Floating content anchored to a trigger. For rich, non-menu content.",
    import: 'import { Popover } from "@/components/ui/popover";',
    examples: [
      { title: "Default",
        code: `<Popover trigger={<Button variant="outline">Open</Button>}>
  <p className="text-sm text-fg">Popover content</p>
</Popover>`,
        render: () => (
          <Popover trigger={<Button variant="outline">Open</Button>}>
            <p className="text-sm text-fg">Popover content with anything inside.</p>
          </Popover>
        ) },
    ],
  },
  tooltip: {
    description: "A small hint shown on hover or focus. Choose the side.",
    import: 'import { Tooltip } from "@/components/ui/tooltip";',
    examples: [
      { title: "Default",
        code: `<Tooltip content="Helpful hint">
  <span className="underline">Hover me</span>
</Tooltip>`,
        render: () => <Tooltip content="Helpful hint"><span className="text-fg underline">Hover me</span></Tooltip> },
    ],
  },
  "hover-card": {
    description: "A richer preview shown on hover — for profiles, token details or definitions.",
    import: 'import { HoverCard } from "@/components/ui/hover-card";',
    examples: [
      { title: "Profile preview",
        code: `<HoverCard trigger={<span className="underline">@ana</span>}>
  <div className="flex items-center gap-3">
    <Avatar name="Ana García" />
    <div><p className="font-medium text-fg">Ana García</p><p className="text-xs text-fg-secondary">Verified merchant</p></div>
  </div>
</HoverCard>`,
        render: () => (
          <HoverCard trigger={<span className="text-fg underline">@ana</span>}>
            <div className="flex items-center gap-3">
              <Avatar name="Ana García" />
              <div><p className="font-medium text-fg">Ana García</p><p className="text-xs text-fg-secondary">Verified merchant</p></div>
            </div>
          </HoverCard>
        ) },
    ],
  },
  sheet: {
    description: "A panel that slides in from the side — for filters, details or secondary forms.",
    import: 'import { Sheet } from "@/components/ui/sheet";',
    examples: [
      { title: "Right side",
        code: `const [open, setOpen] = useState(false);
<Button onClick={() => setOpen(true)}>Open sheet</Button>
<Sheet open={open} onClose={() => setOpen(false)} title="Filters">…</Sheet>`,
        render: () => <SheetDemo /> },
    ],
  },
  command: {
    description: "A command palette: searchable list of actions. Pair with a keyboard shortcut for power users.",
    import: 'import { Command } from "@/components/ui/command";',
    examples: [
      { title: "Quick actions",
        code: `<Command placeholder="Type a command…" items={[
  { id: "new", label: "New transfer", onSelect: () => {} },
  { id: "search", label: "Search transactions", onSelect: () => {} },
  { id: "export", label: "Export report", onSelect: () => {} },
]} />`,
        render: () => <CommandDemo /> },
    ],
  },

  /* -------------------------------- Navigation ------------------------------ */
  tabs: {
    description: "Switch between sections without leaving the page. Controlled via active/onChange.",
    import: 'import { Tabs } from "@/components/ui/tabs";',
    examples: [
      { title: "Basic",
        code: `const [tab, setTab] = useState("overview");
<Tabs active={tab} onChange={setTab} tabs={[
  { id: "overview", label: "Overview" },
  { id: "activity", label: "Activity" },
  { id: "settings", label: "Settings" },
]} />`,
        render: () => <TabsDemo /> },
    ],
  },
  breadcrumb: {
    description: "Shows where the user is in a hierarchy and lets them go back up.",
    import: 'import { Breadcrumb } from "@/components/ui/breadcrumb";',
    examples: [
      { title: "Path",
        code: `<Breadcrumb items={[
  { label: "Home", href: "/" },
  { label: "Transactions", href: "/tx" },
  { label: "MX-9001" },
]} />`,
        render: () => <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Transactions", href: "/tx" }, { label: "MX-9001" }]} /> },
    ],
  },
  pagination: {
    description: "Navigate between pages of data. Controlled via page/totalPages/onPage.",
    import: 'import { Pagination } from "@/components/ui/pagination";',
    examples: [
      { title: "Default",
        code: `const [page, setPage] = useState(1);
<Pagination page={page} totalPages={5} onPage={setPage} />`,
        render: () => <PaginationDemo /> },
    ],
  },
  accordion: {
    description: "Stacked sections that expand one at a time. Good for FAQs and dense settings.",
    import: 'import { Accordion } from "@/components/ui/accordion";',
    examples: [
      { title: "FAQ",
        code: `<Accordion items={[
  { id: "1", title: "How long do transfers take?", content: "SPEI is near-instant." },
  { id: "2", title: "What are the limits?", content: "Up to $99,999 per day." },
]} />`,
        render: () => (
          <div className="w-full max-w-md">
            <Accordion items={[
              { id: "1", title: "How long do transfers take?", content: "SPEI is near-instant, usually under 30 seconds." },
              { id: "2", title: "What are the limits?", content: "Up to $99,999 MXN per day for verified accounts." },
            ]} />
          </div>
        ) },
    ],
  },
  collapsible: {
    description: "Show or hide a single block of content behind a trigger.",
    import: 'import { Collapsible } from "@/components/ui/collapsible";',
    examples: [
      { title: "Default",
        code: `<Collapsible trigger={<Button variant="outline">Show details</Button>}>
  <p className="text-sm text-fg-secondary mt-2">Hidden details revealed here.</p>
</Collapsible>`,
        render: () => (
          <Collapsible trigger={<Button variant="outline">Show details</Button>}>
            <p className="mt-2 text-sm text-fg-secondary">Hidden details revealed here.</p>
          </Collapsible>
        ) },
    ],
  },
  "scroll-area": {
    description: "A scrollable container with styled overflow for long lists.",
    import: 'import { ScrollArea } from "@/components/ui/scroll-area";',
    examples: [
      { title: "Vertical list",
        code: `<ScrollArea className="h-40 w-56 rounded-meda border border-border-default p-3">
  {items.map(i => <p key={i}>Item {i}</p>)}
</ScrollArea>`,
        render: () => (
          <ScrollArea className="h-40 w-56 rounded-meda border border-border-default p-3">
            {Array.from({ length: 20 }).map((_, i) => <p key={i} className="py-1 text-sm text-fg">Item {i + 1}</p>)}
          </ScrollArea>
        ) },
    ],
  },

  /* ------------------------------- Data display ----------------------------- */
  card: {
    description: "A surface that groups related content. Compose with Card + CardHeader/Title/Description/Content/Footer.",
    import: 'import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";',
    examples: [
      { title: "Full anatomy",
        code: `<Card>
  <CardHeader>
    <CardTitle>Balance</CardTitle>
    <CardDescription>Available to spend</CardDescription>
  </CardHeader>
  <CardContent><p className="text-2xl font-semibold">$24,580.00</p></CardContent>
  <CardFooter><Button size="sm">Add funds</Button></CardFooter>
</Card>`,
        render: () => (
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Balance</CardTitle>
              <CardDescription>Available to spend</CardDescription>
            </CardHeader>
            <CardContent><p className="text-2xl font-semibold text-fg">$24,580.00</p></CardContent>
            <CardFooter><Button size="sm">Add funds</Button></CardFooter>
          </Card>
        ) },
    ],
  },
  table: {
    description: "Low-level table primitives (Table, THead, TR, TH, TD) for full control. For sorting/density/pagination use DataTable.",
    import: 'import { Table, THead, TR, TH, TD } from "@/components/ui/table";',
    examples: [
      { title: "Basic",
        code: `<Table>
  <THead><TR><TH>Order</TH><TH>Merchant</TH><TH>Amount</TH></TR></THead>
  <tbody>
    <TR><TD>MX-9001</TD><TD>Spotify</TD><TD>-$149</TD></TR>
  </tbody>
</Table>`,
        render: () => (
          <div className="w-full max-w-md">
            <Table>
              <THead><TR><TH>Order</TH><TH>Merchant</TH><TH>Amount</TH></TR></THead>
              <tbody>
                {ROWS.map((r) => <TR key={r.id}><TD>{r.id}</TD><TD>{r.merchant}</TD><TD>{r.amount}</TD></TR>)}
              </tbody>
            </Table>
          </div>
        ) },
    ],
  },
  "data-table": {
    description: "A full-featured table: column sorting, density switch, column show/hide and optional cursor pagination. Define columns with render functions for custom cells.",
    import: 'import { DataTable, type Column } from "@/components/ui/data-table";',
    examples: [
      { title: "Sortable with custom cells",
        code: `const columns: Column<Row>[] = [
  { key: "id", header: "Order", sortable: true },
  { key: "merchant", header: "Merchant", sortable: true },
  { key: "amount", header: "Amount", align: "right", sortable: true,
    render: (r) => <span>{r.amount}</span> },
  { key: "status", header: "Status",
    render: (r) => <StatusPill status={r.status} /> },
];
<DataTable columns={columns} data={rows} rowKey={(r) => r.id} />`,
        render: () => <div className="w-full"><DataTable columns={COLUMNS} data={ROWS} rowKey={(r) => r.id} /></div> },
    ],
  },

  /* ---------------------------------- Fintech ------------------------------- */
  "amount-input": {
    description: "A money input that shows the currency symbol and accepts only valid decimals (max two). Controlled via a number | \"\" value.",
    import: 'import { AmountInput } from "@/components/ui/amount-input";',
    examples: [
      { title: "MXN",
        code: `const [amount, setAmount] = useState<number | "">(1234.5);
<AmountInput value={amount} onChange={setAmount} />`,
        render: () => <AmountDemo /> },
    ],
  },
  "copy-field": {
    description: "A read-only field with a copy button — for CLABE, account numbers and references. Optionally masked.",
    import: 'import { CopyField } from "@/components/ui/copy-field";',
    examples: [
      { title: "Masked CLABE",
        code: `<CopyField label="CLABE" value="012180012345678901" masked />`,
        render: () => <div className="w-full max-w-xs"><CopyField label="CLABE" value="012180012345678901" masked /></div> },
      { title: "Plain reference",
        code: `<CopyField label="Reference" value="MX-9001-ABCD" />`,
        render: () => <div className="w-full max-w-xs"><CopyField label="Reference" value="MX-9001-ABCD" /></div> },
    ],
  },
  "status-pill": {
    description: "A compact indicator for transaction status. StatusResult shows a larger success/failure summary.",
    import: 'import { StatusPill, StatusResult } from "@/components/ui/status-pill";',
    examples: [
      { title: "Pills",
        code: `<StatusPill status="SUCCESS" />
<StatusPill status="PROCESSING" />
<StatusPill status="PENDING" />
<StatusPill status="FAILED" />
<StatusPill status="REFUNDED" />`,
        render: () => (
          <div className="flex flex-wrap gap-2">
            <StatusPill status="SUCCESS" />
            <StatusPill status="PROCESSING" />
            <StatusPill status="PENDING" />
            <StatusPill status="FAILED" />
            <StatusPill status="REFUNDED" />
          </div>
        ) },
      { title: "Result summary",
        code: `<StatusResult status="SUCCESS" title="Transfer completed" description="$1,250.00 sent to Juan Pérez" />`,
        render: () => <StatusResult status="SUCCESS" title="Transfer completed" description="$1,250.00 sent to Juan Pérez" /> },
    ],
  },
  "transaction-card": {
    description: "A row that summarizes a single movement: merchant, amount (colored by sign), status and date.",
    import: 'import { TransactionCard } from "@/components/ui/transaction-card";',
    examples: [
      { title: "List",
        code: `<TransactionCard orderNo="MX-9001" merchant="Spotify" amount={-149} date="2026-06-22" status="SUCCESS" />
<TransactionCard orderNo="MX-9002" merchant="Depósito SPEI" amount={5000} date="2026-06-21" status="SUCCESS" />`,
        render: () => (
          <div className="w-full max-w-md space-y-2">
            <TransactionCard orderNo="MX-9001" merchant="Spotify" amount={-149} date="2026-06-22" status="SUCCESS" />
            <TransactionCard orderNo="MX-9002" merchant="Depósito SPEI" amount={5000} date="2026-06-21" status="SUCCESS" />
            <TransactionCard orderNo="MX-9003" merchant="Amazon" amount={-899} date="2026-06-20" status="PROCESSING" />
          </div>
        ) },
    ],
  },

  /* ----------------------------------- Brand -------------------------------- */
  "status-icons": {
    description: "MEDA's brand status icons as inline SVGs (no external icon library). Size via the `size` prop.",
    import: 'import { SuccessIcon, ErrorIcon, WaitingIcon, GeolocationIcon } from "@/components/icons/status-icons";',
    examples: [
      { title: "All icons",
        code: `<SuccessIcon size={40} />
<ErrorIcon size={40} />
<WaitingIcon size={40} />
<GeolocationIcon size={40} />`,
        render: () => (
          <div className="flex flex-wrap items-center gap-4">
            <SuccessIcon size={40} />
            <ErrorIcon size={40} />
            <WaitingIcon size={40} />
            <GeolocationIcon size={40} />
          </div>
        ) },
    ],
  },
};

function HorizontalFieldDemo() {
  const [on, setOn] = React.useState(true);
  return (
    <div className="w-full max-w-sm rounded-meda border border-border-default p-4">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Two-factor auth</FieldTitle>
          <FieldDescription>Extra security at sign-in.</FieldDescription>
        </FieldContent>
        <Switch checked={on} onChange={setOn} />
      </Field>
    </div>
  );
}
function OtpFourDemo() {
  const [pin, setPin] = React.useState("");
  return <InputOTP maxLength={4} value={pin} onChange={setPin} />;
}

export function getDoc(slug: string): ComponentDoc | undefined {
  return EXAMPLES[slug];
}
