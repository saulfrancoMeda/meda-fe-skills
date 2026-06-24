# MEDA Frontend Cookbook — a feature end to end

One coherent example showing how the skills work together day to day. Scenario: **"Show the user's
account movements"** — but the backend endpoint isn't ready yet. This is the most common real
situation. Follow it and you've used the whole standard.

## Step 0 — Understand (fe-dev-process, Phase 1)
- Goal: a screen listing the user's movements (deposits/withdrawals), with the four states handled.
- Contract: agreed with backend → `GET /account/v1/movements` returns the APIResponse envelope with
  `Movement[]`. The endpoint doesn't exist yet, so we'll mock it.
- Layers: service (`lib/api`) → hook (`useMovements`) → component (`MovementList`).

## Step 1 — Mock the endpoint (fe-mocking)
Create `src/mocks/handlers/movements.ts` returning the agreed envelope (with latency so you can see
the loading state). Register it in `src/mocks/handlers/index.ts`. Set `NEXT_PUBLIC_ENABLE_MSW=true` in
`.env.development`. Your app code will call the real path; MSW answers it in dev.

## Step 2 — Service (meda-fe-endpoint / fe-api-client)
```ts
// src/lib/api/account.ts
import { get } from "@/lib/api/client";
export interface Movement { id: string; amount: number; type: "DEPOSIT" | "WITHDRAWAL"; date: string; }
export const getMovements = () => get<Movement[]>("/account/v1/movements");
```

## Step 3 — Hook (fe-data-fetching, with cursor pagination for large data)
```ts
// src/features/account/hooks/useMovements.ts
import { useQuery } from "@tanstack/react-query";
import { getMovements } from "@/lib/api/account";
export function useMovements() {
  return useQuery({ queryKey: ["movements"], queryFn: getMovements });
}
```
(For millions of rows, swap to `useCursorPagination` + `getMovementsPage(cursor)` — see
`fe-data-fetching`.)

## Step 4 — Component (meda-fe-component, four states + MEDA UI)
```tsx
// src/features/account/components/MovementList.tsx
"use client";
import { useMovements } from "../hooks/useMovements";
import { TransactionCard } from "@/components/ui/transaction-card";
import { Spinner } from "@/components/ui/spinner";
import { Alert } from "@/components/ui/alert";

export function MovementList() {
  const { data, isLoading, isError, refetch } = useMovements();
  if (isLoading) return <Spinner />;
  if (isError) return <Alert variant="error" title="Error">Couldn't load movements. <button onClick={() => refetch()} className="underline">Retry</button></Alert>;
  if (!data?.length) return <p className="text-fg-secondary">No movements yet.</p>;
  return (
    <div className="grid gap-3">
      {data.map((m) => (
        <TransactionCard key={m.id} orderNo={m.id} amount={Math.abs(m.amount)}
          status={m.type === "DEPOSIT" ? "SUCCESS" : "PROCESSING"} date={m.date} merchant={m.type} />
      ))}
    </div>
  );
}
```

## Step 5 — Test (meda-fe-test / fe-testing)
Mock the hook to drive each state; test money formatting edge cases. (See `meda-fe-test` for the
full test file.)

## Step 6 — Review (meda-fe-review)
The reviewer checks the predictable list: fetch in hook (not inline)? four states? types (no `any`)?
reuses MEDA UI + lib? envelope handled? Because you built with the skills, findings are rare.

## Step 7 — Go live (fe-security)
Backend ships the endpoint → set `NEXT_PUBLIC_ENABLE_MSW=false`. Nothing in your code changes. Pin
exact dependency versions, commit the lockfile, no secrets in the bundle or deploy config.

---

## The point
Every feature follows this same shape. A new dev (es/en/zh) reads the skills, produces this structure,
and the reviewer knows exactly where to look. That consistency is the whole value: faster reviews,
predictable implementations, fewer bugs.
