# Migration guide — modernizing an old MEDA frontend

For taking an existing/legacy MEDA project and bringing it up to the current standard. Two independent
tracks — do them in order, one at a time, never both at once on the same file.

**Track A: JavaScript → TypeScript** (add types)
**Track B: old styles → MEDA UI** (adopt the Binance-style design system)

Migrate incrementally. Never rewrite the whole app in one PR — migrate file by file, keep it shippable
at every step.

---

## Track A — JavaScript → TypeScript

### Step 1 — Add TypeScript without breaking anything
```bash
pnpm add -D typescript @types/react @types/node @types/react-dom
```
Create `tsconfig.json` with `"allowJs": true` and `"strict": false` to start. This lets `.js` and
`.ts` coexist — nothing breaks on day one.
```json
{
  "compilerOptions": {
    "allowJs": true,
    "strict": false,
    "jsx": "preserve",
    "moduleResolution": "bundler",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

### Step 2 — Rename files one at a time
`Component.js` → `Component.tsx` (with JSX) or `util.js` → `util.ts` (no JSX). After each rename, fix
the type errors in THAT file only. Commit. Move to the next.

### Step 3 — Type the obvious things first
- Component props: turn implicit props into an `interface`.
  ```tsx
  // before (JS): function Card({ title, amount }) {...}
  // after  (TS):
  interface CardProps { title: string; amount: number; }
  function Card({ title, amount }: CardProps) {...}
  ```
- API responses: type them from the contract (see fe-api-client) — replaces `data.foo` guesses.
- Remove `any` as you go. A temporary `any` is fine to keep moving; leave a `// TODO: type` so it's findable.

### Step 4 — Tighten gradually
Once most files are `.ts`/`.tsx`, flip `"strict": true` and fix what surfaces (usually nullables).
Then remove `"allowJs": true` when no `.js` files remain. Don't do this on day one — it's the finish line.

### Order that works
utilities/helpers first (pure functions, easy to type) → API layer → hooks → components → pages.
Leaf-first means each file you type only depends on already-typed files.

---

## Track B — Old styles → MEDA UI (Binance design)

The goal: replace ad-hoc CSS, inline styles, and one-off components with MEDA UI tokens + components,
so the app gets the consistent Binance-style look (dark-first, #FCD535, the token system).

### Step 1 — Install MEDA UI into the project
Use the harness to add components + tokens to the existing repo:
```bash
meda-fe add all          # copies components/ui/, tokens, icons into the project
```
Wire the tokens in your global CSS (Tailwind v4): `@import "../styles/meda-tokens.css";` at the TOP.

### Step 2 — Map old → new (don't rewrite, replace)
Go screen by screen. For each old element, swap to the MEDA component:
| Old (legacy) | New (MEDA UI) |
|---|---|
| `<button class="btn-primary">` | `<Button variant="primary">` |
| `<input class="form-control">` | `<Input />` or `<FormField label=... />` |
| custom modal div | `<Dialog>` / `<ConfirmDialog>` |
| hand-made dropdown | `<DropdownMenu>` |
| `<span style={{color:'green'}}>+5%</span>` | `<span className="text-price-up">+5%</span>` |
| hardcoded `#FCD535` | token class `bg-brand` / `text-brand` |
| hardcoded `#fff`/`#000` | `bg-surface` / `text-fg` (theme-aware) |

### Step 3 — Replace hardcoded colors with tokens
This is what makes dark/light work and aligns to Binance. Search the codebase for hex colors and
replace with token classes:
- backgrounds: `#fff`/`#1e1e1e` → `bg-surface`, `bg-bg`, `bg-muted`
- text: `#000`/`#333` → `text-fg`, `text-fg-secondary`
- borders: any → `border-border-default`
- brand yellow → `bg-brand` / `text-brand` (never the raw hex)
- price up/down → `text-price-up` / `text-price-down`

### Step 4 — Align sizing to the Binance system
As you touch each component, apply the standard sizes (see fe-meda-ui): control height 40px (`h-10`),
control radius 4px (`rounded-control`), card radius 8px (`rounded-meda`), input text 14px (`text-sm`).

### Step 5 — Verify per screen
After migrating a screen: it compiles (`tsc`), looks right in BOTH dark and light, keyboard works
(fe-quality). Commit that screen. Move to the next. Never migrate everything before testing.

### What NOT to do
- Don't mix old CSS and MEDA tokens on the same element (you get half-themed UI that breaks in dark).
- Don't rewrite a working screen just to "modernize" it if it's not being touched — migrate what you're
  already working on, opportunistically, plus a planned screen-by-screen pass.
- Don't keep hardcoded hex "just for now" — that's the thing that breaks dark mode.

---

## Doing both tracks together on one project
Sequence per screen: **(1) type it (JS→TS), (2) then restyle it (→ MEDA UI), (3) verify, commit.**
One screen at a time. The app stays shippable throughout. Ask the agent: *"migrate this screen
following docs/migration.md — first to TypeScript, then to MEDA UI"*.
