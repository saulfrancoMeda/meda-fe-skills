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
- All interactive components are keyboard-accessible (see `fe-accessibility`).
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
