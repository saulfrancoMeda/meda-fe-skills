# MEDA Frontend Skills

Frontend-only toolbox for MEDA: Agent Skills + a smart CLI for Next.js 16 / TypeScript / Tailwind /
pnpm projects. Independent from the Java skills repo.

## What it does

The `meda-fe` CLI scans a repo and acts depending on what it finds:

```
meda-fe scan
   ├── EMPTY repo    → interactive setup (asks what to install) → records choices for the AI
   └── EXISTING repo → scans it → writes ASSESSMENT.md (how it's built + security scan)
After scan, you develop with the /meda-fe-* commands in Cursor/Claude Code (the AI uses the skills).
```

The CLI does the scanning/reporting (no AI needed). The AI does the development afterwards.

## Install (once per machine)
```bash
git clone <REPO-URL>/meda-fe-skills.git
cd meda-fe-skills
./setup.sh
```

## Use (in any frontend repo)
```bash
cd ~/my-frontend-repo
meda-fe scan            # decides: setup (if empty) or assessment (if existing)
# then open the folder in Cursor and use /meda-fe-dev, /meda-fe-new, /meda-fe-endpoint, etc.
```

## CLI commands
```
meda-fe scan      Scan: empty → setup; existing → ASSESSMENT.md
meda-fe setup     Interactive setup for a new repo (+ installs skills)
meda-fe assess    Scan an existing repo → ASSESSMENT.md (+ installs skills)
meda-fe install   Install skills only
meda-fe verify | list | version | help
```

## The skills (22)
Commands: meda-fe-dev (router) · meda-fe-new · meda-fe-init · meda-fe-component · meda-fe-endpoint ·
meda-fe-review · meda-fe-test.
Normative (15): fe-project-structure · fe-components · fe-state-management · fe-data-fetching ·
fe-api-client · fe-forms-validation · fe-styling-tailwind · fe-routing-navigation · fe-auth ·
fe-error-handling · fe-testing · fe-accessibility · fe-performance · fe-security ·
fe-prohibited-practices.

## Stack
Next.js 16 (App Router) · TypeScript · pnpm · Tailwind. State: Zustand default / Redux for complex.
Data: TanStack Query + Server Components recommended. MEDA UI components ship in a later version.

## MEDA UI — component library (Binance-style)

Real components with MEDA's identity (yellow `#FCD535`), converted from MEDA's MUI theme to Tailwind
tokens. shadcn-style: the CLI copies the component into your repo and you own the code.

```bash
meda-fe add all          # copy all components into components/ui/
meda-fe add button       # or just one
```
This also drops `lib/cn.ts`, `styles/meda-tokens.css`, and `meda-tailwind-preset.js`. Then:
- `tailwind.config`: `presets: [require('./meda-tailwind-preset')]`
- root layout: `import './styles/meda-tokens.css'`
- deps: `pnpm add clsx tailwind-merge`

Components: Button (primary/secondary/outline/link/export/ghost/danger), Input, FormField, Card,
Badge (success/error/warning/info/brand), Table, Dialog, Spinner. Tokens: `bg-brand`, `text-fg`,
`bg-surface`, `border-border-default`, `rounded-meda`, etc. Dark mode via the `.dark` class.

## Roadmap
More components (Select, Toast, Tabs, Dropdown), Storybook preview, and a project template for `meda-fe-new`.
