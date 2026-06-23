---
name: meda-fe-component
description: >
  Use to build a new React/TypeScript component under MEDA standards. Triggers on "build a
  component", "create a card/table/modal", "make a UI element" / "crea un componente", "haz una
  tarjeta/tabla/modal". Applies Server/Client component rules, typing, Tailwind tokens, and
  accessibility. Reply in the user's language.
---

# /meda-fe-component — Build a component under standards

Loads `fe-components`, `fe-styling-tailwind`, `fe-quality`.
**Reply in the user's language.**

## Steps
1. Decide **Server vs Client Component**: default to Server; use `'use client'` only when it needs
   state, effects, event handlers, or browser APIs (`fe-components`).
2. Type props explicitly (no `any`); provide sensible defaults; prefer composition over config bloat.
3. Style with Tailwind + MEDA design tokens (no magic hex values; use token classes). Responsive and
   dark-mode aware (`fe-styling-tailwind`).
4. Accessibility: semantic HTML, ARIA where needed, keyboard navigation, labels, focus states
   (`fe-quality`) — mandatory in fintech.
5. Co-locate: component + its types + its test in the feature/component folder (`fe-project-structure`).
6. If it's a reusable primitive (button/input/etc.), align it to MEDA UI conventions.

## Rules
- Don't make everything a Client Component (hurts performance). Default Server.
- No inline business logic in presentational components; data comes via props or hooks.
- Leave a basic test (`fe-testing`) for interactive components.
