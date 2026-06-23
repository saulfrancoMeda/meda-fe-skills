# MEDA Frontend Skills

Toolbox to develop MEDA frontends (Next.js 16 + TypeScript + Tailwind + pnpm) with consistent
standards across Cursor, Claude Code, and Gemini CLI. It includes:

- **A smart CLI** (`meda-fe`) that scans a repo and knows what to do (new project vs existing vs review).
- **23 Agent Skills** that teach the AI MEDA's frontend standards.
- **MEDA UI**: Binance-style components (yellow `#FCD535`) you copy into your repo.

> This is a **toolbox**, not your app. You install it once, then use it inside your own repos.

---

## Key concept (read this first)

There are always **two different things**, don't mix them up:

| | What it is | Where it lives |
|---|---|---|
| **This repo (`meda-fe-skills`)** | The toolbox (CLI + skills + UI) | You clone it once |
| **Your app** | Your real Next.js project | A separate folder where you run `meda-fe` |

You never develop your app *inside* `meda-fe-skills`. You install the `meda-fe` command from here,
then go to YOUR project folder and run it there.

---

## STEP 0 — Install the toolbox (once per machine)

You need the `meda-fe` command available everywhere. Do this one time.

```bash
# 1. Clone the toolbox (or unzip it if you got a .zip)
git clone https://github.com/saulfrancoMeda/meda-fe-skills.git
cd meda-fe-skills

# 2. Install the 'meda-fe' command on your PATH
./setup.sh
```

If `setup.sh` warns that the folder is not on your PATH, copy the `export PATH=...` line it shows
into your `~/.zshrc`, then open a NEW terminal.

```bash
# 3. Verify it works (from any folder)
meda-fe version      # should print: meda-fe v0.3.0
```

If `meda-fe version` works, STEP 0 is done. You won't repeat this.

> Got a `.zip` instead of cloning? Unzip it first, make sure the folder is named `meda-fe-skills`
> (rename it if it ends in `-dist`: `mv meda-fe-skills-dist meda-fe-skills`), then run `./setup.sh`.

---

## STEP 1 — Use it in your project (pick your scenario)

> **Use the explicit command for your case** (clearer and predictable):
> - New project → `meda-fe new`
> - Existing repo → `meda-fe assess`
> - Just review → `meda-fe assess --report-only`
>
> `meda-fe scan` exists as an optional shortcut: if you don't know whether a folder is empty or has
> code, it detects and routes to `new` or `assess` for you (and tells you what it decided). You don't
> need it if you already know your case.


The main command is `meda-fe scan`. It looks at the current folder and decides what to do.
Always `cd` into YOUR project folder first.

### Scenario A — Brand-new project (empty folder)

```bash
mkdir ~/repos/my-new-app
cd ~/repos/my-new-app

meda-fe new
```

Runs an **interactive setup** that asks a few questions (Enter for the
recommended default):

```
1) Project type — full-app / landing / lib [full-app]
2) State management — zustand / redux / none [zustand]
3) Data fetching — tanstack / rsc / swr [tanstack]
4) Include MEDA UI base components — y/n [y]
5) Authentication — y/n [n]
6) Connect to MEDA Java APIs — y/n [y]
```

It also asks one more question:
```
7) Generate the Next.js project now (runs create-next-app + pnpm install) — y/n [y]
```

The setup now **explains the why of each question** and asks about **folder architecture** (3 options):
- `by-type` — components/ hooks/ services/ (simple, small apps)
- `by-feature` — features/<name>/ with their own components+hooks (balanced, recommended)
- `screaming` — modules/<domain>/ per business domain (large apps/teams)

It also shows a summary of your choices before generating.

If you say **yes** (recommended), the CLI does everything for you:
- Runs `create-next-app` (Next.js 16 + TypeScript + Tailwind + ESLint + App Router + Turbopack).
- Installs your chosen deps (Zustand or Redux; TanStack Query or SWR; Zod; clsx/tailwind-merge).
- Adds MEDA UI components if you chose yes.
- Installs the skills.

When it finishes, the project is ready:
```
cd my-new-app
pnpm dev          # http://localhost:3000
```

Requires `pnpm` and Node.js 20.9+ installed. If you say **no** to question 7, it only records your
choices in `MEDA-FE-SETUP.md` and you can generate later by opening the folder in your agent and
typing `/meda-fe-new use MEDA-FE-SETUP.md`.

> Note: a pnpm message about `approve-builds` (sharp, etc.) is normal and optional — the project
> still works.

### Scenario B — Existing project (has code, you want to develop in it)

```bash
cd ~/repos/my-existing-app

meda-fe assess
```

Writes `ASSESSMENT.md` (how the project is built + a security scan) AND
installs the skills.

```bash
cat ASSESSMENT.md     # read how your project compares to MEDA standards
```

If your repo uses npm or yarn, the report includes a step-by-step **guide to migrate to pnpm**
(MEDA's standard) — safe and reversible, it changes how deps install, not your code.

**Next:** open in Cursor and use the commands, e.g.:
```
/meda-fe-review review this project against MEDA standards
/meda-fe-endpoint integrate the create-payment endpoint
```

### Scenario C — Review only (don't touch anything)

```bash
cd ~/repos/some-repo

meda-fe assess --report-only
cat ASSESSMENT.md
```

Writes ONLY `ASSESSMENT.md`. Does NOT create `.claude/`, `.gemini/`, or install anything. The repo
stays untouched.

> The `ASSESSMENT.md` is for you — if you don't want it in the repo's git, delete it after reading
> (`rm ASSESSMENT.md`) or add it to `.gitignore`.

---

## STEP 2 — Add MEDA UI components (optional, when you need UI)

MEDA UI is Binance-style (yellow `#FCD535`). shadcn-style: the CLI copies the component into your
repo and you own the code.

```bash
cd ~/repos/my-app

meda-fe add all          # copy ALL components into components/ui/
# or
meda-fe add button       # copy just one
```

Also drops `lib/cn.ts`, `styles/meda-tokens.css`, and `meda-tailwind-preset.js`. Then wire them:

```bash
pnpm add clsx tailwind-merge
```
- In `tailwind.config`: `presets: [require('./meda-tailwind-preset')]`
- In your root layout: `import './styles/meda-tokens.css'`

Components: Button (primary/secondary/outline/link/export/ghost/danger), Input, FormField, Card,
Badge (success/error/warning/info/brand), Table, Dialog, Spinner.
Token classes (use these, never raw hex): `bg-brand`, `text-brand-foreground`, `bg-surface`,
`text-fg`, `border-border-default`, `rounded-meda`. Dark mode via the `.dark` class.

---

## All CLI commands

```
meda-fe scan                      Scan the folder: empty -> setup; existing -> assessment
meda-fe setup                     Interactive setup for a NEW repo (installs skills)
meda-fe assess [--report-only]    Scan an existing repo -> ASSESSMENT.md
                                  --report-only: report ONLY, do not install or modify anything
meda-fe add <component|all>       Copy a MEDA UI component into the repo
meda-fe install                   Install skills only (no scan)
meda-fe verify                    Verify skills are installed
meda-fe list                      List available skills
meda-fe version | help
```

### Quick reference — which command for which case

| Your situation | Command |
|---|---|
| New empty project | `meda-fe new` |
| Existing repo, want to develop | `meda-fe assess` |
| Just review, touch nothing | `meda-fe assess --report-only` |
| Need MEDA UI components | `meda-fe add all` |
| Check skills are installed | `meda-fe verify` |

---

## The skills (23)

Commands (`/meda-fe-*`): meda-fe-dev (router) - meda-fe-new - meda-fe-init - meda-fe-component -
meda-fe-endpoint - meda-fe-review - meda-fe-test.

Normative (15): fe-project-structure - fe-components - fe-state-management - fe-data-fetching -
fe-api-client - fe-forms-validation - fe-styling-tailwind - fe-routing-navigation - fe-auth -
fe-error-handling - fe-testing - fe-accessibility - fe-performance - fe-security -
fe-prohibited-practices.

Plus fe-meda-ui (component library), fe-react-principles (SRP/DRY/separation/edge cases applied to
every component), and fe-dependency-security (supply-chain).

See `docs/development-examples.md` for before/after code showing how the principles shape day-to-day
development and speed up code reviews.

After installing in a repo, type `/` in the agent chat to see them, or just write naturally
("integrate the payment endpoint") and the right skill activates.

---

## Stack & conventions

Next.js 16 (App Router) - TypeScript - pnpm - Tailwind.
State: **Zustand by default**, **Redux Toolkit** for complex global state (the setup asks).
Data: **TanStack Query + Server Components** recommended; SWR / RTK Query valid alternatives.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `cd meda-fe-skills: no such file or directory` | Your folder is probably named `meda-fe-skills-dist`. Rename it: `mv meda-fe-skills-dist meda-fe-skills` |
| `meda-fe: command not found` | You didn't run STEP 0, or the PATH line isn't in `~/.zshrc`. Re-run `./setup.sh` and open a new terminal |
| Commands don't show in Cursor | Reload the window: `Cmd+Shift+P` -> "Developer: Reload Window" |
| `git commit` says "Author identity unknown" | `git config --global user.email "you@meda.com.mx"` and `git config --global user.name "Your Name"` |
| `git branch` shows nothing | You have no commits yet. Make sure files exist, then `git add . && git commit -m "..."` |

---

## Multi-agent support

`meda-fe new`/`assess`/`install` set up the skills for all four agents at once:
- **Claude Code / Cursor** → `.claude/skills/` + `CLAUDE.md`
- **Gemini CLI** → `.gemini/skills/`
- **Codex CLI** → `.agents/skills/` + `AGENTS.md`
- **VS Code (GitHub Copilot)** → `.github/copilot-instructions.md`

## Dependency supply-chain security (fintech)

MEDA pins **exact versions** (no `^`/`~`) for dependencies. A caret like `^1.2.3` lets a fresh install
pull any `1.x.x` — if a future patch is compromised (a real supply-chain attack pattern), you'd get it
silently. The CLI:
- Installs deps with `pnpm add -E` (exact versions).
- Strips carets from the base `package.json` and re-syncs the lockfile.
- Pre-approves only vetted build scripts via `onlyBuiltDependencies`.
- The `fe-dependency-security` skill documents the full policy (pin, commit lockfile, audit, vet new
  packages, update deliberately in reviewed PRs).

`meda-fe assess` flags caret ranges and a missing lockfile in its report.

## Maintenance

When a standard changes, edit the matching `SKILL.md` in `skills/`, bump `VERSION`, commit and push.
In your repos, run `meda-fe install` again to get the new version.

## Roadmap

More components (Select, Toast, Tabs, Dropdown), a project template so `meda-fe-new` scaffolds a full
Next.js app automatically, and a Storybook preview.
