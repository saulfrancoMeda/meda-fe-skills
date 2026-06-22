---
name: meda-fe-review
description: >
  Use to review or audit MEDA frontend code (a PR or a component/page) against the frontend
  standards. Triggers on "review this component", "audit the frontend", "does this follow our FE
  standards", "check this PR" / "revisa este componente", "audita el front", "checa si cumple".
  Produces a findings report with file:line and severity. Does NOT implement changes. Reply in the
  user's language.
---

# /meda-fe-review — Frontend code review

Audit frontend code against MEDA standards. Report only, no implementation.
**Reply in the user's language.**

## Checklist (load the skills the code touches)
- **Components (`fe-components`):** Server/Client used correctly; no unnecessary `'use client'`;
  props typed; composition over config.
- **TypeScript (`fe-prohibited-practices`):** no `any`; no non-null `!` abuse; types for API data.
- **State (`fe-state-management`):** right tool (Zustand/Redux); no global state for local concerns;
  no derived state duplicated.
- **Data (`fe-data-fetching` / `fe-api-client`):** API errors handled (status:"ERROR"); loading/error
  states; queryKeys sane; no fetch without error handling.
- **Styling (`fe-styling-tailwind`):** tokens not magic values; responsive; no inline style hacks.
- **A11y (`fe-accessibility`):** semantic HTML, labels, keyboard nav, contrast.
- **Security (`fe-security`):** no secrets in client; tokens handled safely; no dangerouslySetInnerHTML
  with untrusted data; inputs sanitized.
- **Performance (`fe-performance`):** no obvious bundle bloat; images optimized; heavy components lazy.
- **Prohibited practices:** verify the FE P0 list.

## Report
```
## Summary
{target} — {N} findings: {X} P0, {Y} high, {Z} minor. Verdict: PASS / FAIL.
## Findings
| # | Severity | File:line | Rule | Problem | Fix |
## What's done well
## Verdict
```

## Rules
- Report only; don't fix unless asked next.
- Always file:line. Acknowledge what's done well.
- Respect the repo's stack choices; flag violations, not different-but-valid tools.
