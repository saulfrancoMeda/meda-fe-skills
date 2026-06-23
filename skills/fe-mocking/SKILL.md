---
name: fe-mocking
description: >
  MEDA standard for API mocking with MSW (Mock Service Worker) when the backend hasn't delivered an
  endpoint yet. Mocks at the NETWORK layer (not hardcoded in app code) and is controlled by an env
  var, so switching from fake to real endpoint is flipping a flag — never editing production code. Use
  when an endpoint isn't ready, when building against a contract, or setting up dev/test mocks.
  Triggers on mock, MSW, fake endpoint, stub, backend not ready, handler, mockServiceWorker /
  "mock", "endpoint falso", "simular API", "backend no listo".
---
# API Mocking with MSW (Mock Service Worker)

> The pain this solves: hardcoding a fake response inside your component/service means you later have
> to FIND and REMOVE it to use the real endpoint — error-prone, and fake code leaks to production.
> MSW intercepts at the network layer, lives OUTSIDE your app code, and is toggled by an env var.
> Your app code calls the real endpoint URL the whole time; MSW just answers it in dev when enabled.

## Why MSW (not a hardcoded JSON or a fake fetch)
- Your `lib/api` code never changes — it always calls the real path. No `if (fake) return {...}`.
- One env var turns mocking on/off. To go live: set the flag to false. Nothing to delete in code.
- Same handlers work in the browser (dev) and in tests (Vitest) — single source of truth.
- You see mocked responses in DevTools Network like real requests.

## Setup (Next.js App Router)
1. Install (exact version): `pnpm add -E -D msw` then `npx msw init public/ --save` (creates
   `public/mockServiceWorker.js` — auto-generated, don't edit).
2. Structure under `src/mocks/`:
   - `handlers/` — one file per domain (e.g. `transactions.ts`, `auth.ts`) + an `index.ts` barrel.
   - `browser.ts` — `setupWorker(...handlers)`.
   - `server.ts` — `setupServer(...handlers)` (for RSC/tests).
3. Control by env var (NEVER on in production):
   `NEXT_PUBLIC_ENABLE_MSW=true` only in `.env.development`/`.env.test`. A helper `isMSWEnabled()`
   returns false unless that flag is true AND not production.
4. A client `MSWProvider` defers rendering until the worker is ready (avoids race conditions).

## Handler example (matches MEDA APIResponse envelope)
```ts
// src/mocks/handlers/transactions.ts
import { http, HttpResponse } from "msw";
const BASE = process.env.NEXT_PUBLIC_API_URI_BASE;
export const transactionHandlers = [
  http.get(`${BASE}/transaction/v1/list`, () =>
    HttpResponse.json({
      status: "OK", errorCode: null, errorMessage: null,
      data: [{ orderNo: "ORD-1001", amount: 10000, status: "SUCCESS", date: "2026-06-22T10:00:00" }],
    })
  ),
];
```
Mock the SAME shape the backend will return (the APIResponse envelope), so when the real endpoint
arrives, your hook/component already handles it correctly. You can also mock errors and latency:
```ts
http.post(`${BASE}/transaction/v1/create`, async () => {
  await delay(800);                                   // simulate latency
  return HttpResponse.json({ status: "ERROR", errorCode: "330001", errorMessage: "Insufficient funds", data: null });
});
```

## Switching fake → real (the whole point)
1. Backend delivers the endpoint.
2. Set `NEXT_PUBLIC_ENABLE_MSW=false` (or remove that handler).
3. Done. Your `lib/api` and components never referenced the mock — nothing to clean up.

## Rules
- MSW is dev/test only. NEVER enable in production (guard with env + NODE_ENV check).
- Mock the real APIResponse envelope + real endpoint URL, not a simplified shape.
- Mocks live in `src/mocks/`, never inside `lib/api` or components.
- Commit `public/mockServiceWorker.js` (it's the generated worker).
- Keep handlers per domain; reuse the same handlers for tests (see fe-testing).
- Use `onUnhandledRequest: "bypass"` so un-mocked endpoints hit the real backend (partial mocking).
