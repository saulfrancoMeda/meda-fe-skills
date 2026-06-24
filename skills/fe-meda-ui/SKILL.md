---
name: fe-meda-ui
description: >
  MEDA UI component library: Binance-style design system (yellow #FCD535) as Tailwind tokens +
  shadcn-style copyable components. Use whenever building UI that should match MEDA's look, adding a
  Button/Input/Card/Table/Dialog/Badge, or theming with MEDA tokens. Triggers on MEDA UI, component
  library, design system, brand colors, Binance style, button/input/card / "MEDA UI", "componentes",
  "diseño", "colores de marca".
---
# MEDA UI — Design system & components (Binance-style)

## Identity (from MEDA's theme)
- **Brand:** #FCD535 (Binance yellow); hover gold #C99400; light #FDDD66. Text on brand: #0A0F14.
- **Dark surfaces:** bg #141518, paper #181a20, sidebar #0a0f14. **Light:** bg #FCFCFC, paper #FFFFFF.
- **Text:** #0A0F14 (light) / #f9fafb (dark). Radius: 8px. Font: Binance Plex.
- **Semantic:** success #10b981, error #ef4444, warning #f59e0b, info #3b82f6.

## Tokens — use semantic classes, NOT raw hex
The Tailwind preset (`meda-tailwind-preset.js`) exposes: `bg-brand`, `text-brand-foreground`,
`bg-surface`, `bg-bg`, `text-fg`, `text-fg-secondary`, `border-border-default`, `bg-muted`,
`bg-success/error/warning/info`, `rounded-meda`, sidebar/table tokens. Dark mode via `.dark` class.
NEVER hardcode `#FCD535` in a component — use `bg-brand`. (Prohibited: magic hex values.)

## Setup in a project
1. `meda-fe add all` (or a specific component) — copies into `components/ui/`, plus `lib/cn.ts`,
   `styles/meda-tokens.css`, `meda-tailwind-preset.js`.
2. In `tailwind.config`: `presets: [require('./meda-tailwind-preset')]`.
3. In the root layout: `import './styles/meda-tokens.css'`.
4. Load Binance Plex font (or fallback to system-ui).

## Components (shadcn-style: copied into the repo, you own the code)
- **Button** — variants: primary (yellow), secondary, outline, link (gold), export, ghost, danger;
  sizes sm/md/lg (md = 44px); `loading` prop.
- **Input / FormField** — FormField adds accessible label + error + hint (aria-describedby).
- **Card** (+ Header/Title/Description/Content/Footer).
- **Badge** — default/success/error/warning/info/brand (great for payment statuses).
- **Table** (THead/TR/TH/TD) — muted head, row hover, matches MEDA table style.
- **Dialog** — accessible modal (role=dialog, Esc to close, overlay).
- **Spinner**.

## Rules
- Use MEDA UI primitives instead of re-styling raw HTML; keeps the Binance look consistent.
- Components are copied (you own them) — customize freely, but keep token classes for theming.
- All interactive components are keyboard-accessible (see `fe-quality`).
- Add new shared primitives to MEDA UI rather than duplicating styles across features.

## Utility layer (lib/) — installed with MEDA UI
Besides components, `meda-fe add` installs reusable utilities under `lib/` (or `src/lib/`):
- `lib/cn.ts` — className merger (clsx + tailwind-merge).
- `lib/utils/format.ts` — `formatCurrency` (MXN), `formatNumber`, `formatDate`, `formatDateTime`.
- `lib/utils/validators.ts` — `isValidRFC`, `isValidCURP`, `isValidCLABE`, `isValidEmail`, `isValidPhoneMX`.
- `lib/utils/mask.ts` — `maskAccount`, `maskEmail`, `maskPhone` (PII masking for display).
- `lib/api/client.ts` — `post`/`get` handling the MEDA APIResponse envelope + `MedaApiError`.

Import via the `@/*` alias: `import { formatCurrency } from "@/lib/utils/format"`. Use these instead
of re-implementing currency/date/validation logic per project — they keep MX fintech formatting and
PII handling consistent. The `@/*` alias points to `src/*` (the CLI configures this).

## Extended component catalog (shadcn-level coverage, Binance style)

All live in `components/ui/`, you own the code. How to ask the agent + a usage example for each.

### DropdownMenu — contextual menu
Ask: *"add a row actions dropdown (edit, delete) to the table"*
```tsx
<DropdownMenu trigger={<Button variant="outline">Actions</Button>}>
  <DropdownItem onClick={onEdit}>Edit</DropdownItem>
  <DropdownItem danger onClick={onDelete}>Delete</DropdownItem>
</DropdownMenu>
```

### Tooltip — hint on hover/focus (accessible)
Ask: *"add a tooltip explaining the fee field"*
```tsx
<Tooltip content="Network fee, charged by the blockchain"><span>Fee ⓘ</span></Tooltip>
```

### Accordion — collapsible sections
Ask: *"show the FAQ as an accordion"*
```tsx
<Accordion items={[{ id: "1", title: "How do transfers work?", content: <p>...</p> }]} />
```

### Popover — floating panel for rich content
Ask: *"put the date filters in a popover"*
```tsx
<Popover trigger={<Button variant="outline">Filters</Button>}><FilterForm /></Popover>
```

### Command — keyboard search palette
Ask: *"add a searchable command palette to pick a merchant"*
```tsx
<Command items={merchants.map(m => ({ id: m.id, label: m.name, onSelect: () => pick(m) }))} />
```

### Sheet — side drawer
Ask: *"open the transaction detail in a side drawer"*
```tsx
<Sheet open={open} onClose={() => setOpen(false)} title="Transaction detail"><TxDetail /></Sheet>
```

### RadioGroup, Label, Progress, Breadcrumb
```tsx
<RadioGroup name="type" value={v} onChange={setV} options={[{ value: "spei", label: "SPEI" }, { value: "card", label: "Card" }]} />
<Label htmlFor="amount">Amount</Label>
<Progress value={66} />
<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Transactions" }]} />
```

## Rule
These are the project's base — build features by composing them, don't re-create primitives. If a
needed primitive is missing, add it to `components/ui/` in this same style (token classes, accessible,
typed) so it becomes part of the shared base for everyone.

### ToggleGroup, Slider, Collapsible, HoverCard, Pagination, ScrollArea
- **ToggleGroup** — segmented control. Ask: *"add a 1D/1W/1M range toggle to the chart"*
  ```tsx
  <ToggleGroup value={range} onChange={setRange} options={[{value:"1d",label:"1D"},{value:"1w",label:"1W"}]} />
  ```
- **Slider** — Ask: *"add a slider to set the alert threshold"* → `<Slider value={v} onChange={setV} max={1000} />`
- **Collapsible** — Ask: *"make the advanced options collapsible"* → `<Collapsible trigger={<span>Advanced</span>}>...</Collapsible>`
- **HoverCard** — Ask: *"show merchant details on hover"* → `<HoverCard trigger={<span>{name}</span>}><MerchantInfo/></HoverCard>`
- **Pagination** — numbered (offset). Ask: *"add numbered pagination"* → `<Pagination page={p} totalPages={20} onPage={setP} />`
  (For millions of rows / cursor pagination, use the `DataTable` `pagination` prop instead — see fe-data-fetching.)
- **ScrollArea** — Ask: *"make this list scrollable with a thin scrollbar"* → `<ScrollArea className="max-h-80">...</ScrollArea>`

## Icons — two sources (don't add other icon libraries)
1. **Generic UI icons → lucide-react** (the same set shadcn uses; safe, tree-shakeable, outline style
   matching Binance). Ask the agent normally; import what you need:
   ```tsx
   import { ArrowRight, Copy, Search, X } from "lucide-react";
   <Search className="h-4 w-4 text-fg-secondary" />
   ```
   Size with `h-/w-` (16px=h-4 inline, 20px=h-5). Color inherits via `text-*`.
2. **Brand status icons → MEDA's own SVG** in `components/icons/status-icons.tsx` (SuccessIcon,
   ErrorIcon, WaitingIcon, GeolocationIcon). Brand yellow, no dependency. Use for result/confirmation
   screens via `StatusResult`:
   ```tsx
   <StatusResult status="SUCCESS" title="Transfer sent" description="Your transfer is on its way." />
   ```

Rule: only these two icon sources. Don't add font-awesome, react-icons, heroicons, etc. — keep the
dependency surface small (fintech supply-chain, see fe-security).

## Binance-aligned sizing (use these, don't invent)
The tokens follow Binance's UI system. When building or asking for components, keep to:
- Control height: 40px default (`h-10`), 32px compact (`h-8`), 48px CTA (`h-12`).
- Control radius: 4px (`rounded-control`). Card radius: 8px (`rounded-meda`).
- Input text: 14px (`text-sm`). Horizontal padding: 12px (`px-3`).
- Form field gap: 16px (`gap-4`).
- Price up/down: use `text-price-up` / `text-price-down` (Binance green #0ECB81 / red #F6465D).
- Dark theme is the default (Binance presents dark-first); light is available via the toggle.

## Advanced fintech components (Tanda 2)

### Combobox — searchable select (NOT a plain select)
For long lists where a basic Select is unusable: merchants, currencies, beneficiaries, countries.
Type to filter, ↑/↓ to navigate, Enter to pick.
Ask: *"use a searchable combobox to pick the beneficiary"*
```tsx
import { Combobox } from "@/components/ui/combobox";
<Combobox value={v} onChange={setV} options={beneficiaries.map(b => ({ value: b.id, label: b.name, description: b.clabe }))}
  placeholder="Select beneficiary" searchPlaceholder="Search by name..." />
```

### DatePicker — real month calendar (NOT a plain date input)
For transaction date filters, scheduling. Month navigation, locale-aware, no external lib.
Ask: *"add a date picker to filter transactions by date"*
```tsx
import { DatePicker } from "@/components/ui/date-picker";
<DatePicker value={date} onChange={setDate} locale="es-MX" />
```

### PdfViewer — view + search statements/receipts (opt-in)
Needs `react-pdf` (pdf.js / Mozilla — the standard, safe library). It ships as a `.template` so it
doesn't break builds when react-pdf isn't installed. To activate:
1. `pnpm add -E react-pdf`
2. Rename `components/ui/pdf-viewer.tsx.template` → `pdf-viewer.tsx`
3. Import directly (it's not in the barrel): `import { PdfViewer } from "@/components/ui/pdf-viewer";`
Ask: *"show the account statement PDF with search"*
```tsx
<PdfViewer file={statementUrl} />   // page nav, zoom, in-document text search (highlights matches)
```
Why opt-in: react-pdf is heavy and not every app needs it — keeping it out of the default install
respects the supply-chain rule (fe-security). The worker loads from CDN, pinned to the lib version.
