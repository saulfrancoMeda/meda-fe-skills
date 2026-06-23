# Development process in action (examples to start from)

How a MEDA frontend dev uses the skills end-to-end. Two real scenarios: one with the endpoint ready,
one without (MSW). Follow these and you develop deliberately, not ad-hoc.

---

## Scenario A — Endpoint IS ready: "integrate the transactions list"

**Phase 1 — Understand.** Goal: show the user their transactions. Contract: `GET /transaction/v1/list`
returns the APIResponse envelope with a `Transaction[]`. Layer: a `transactions` feature.

**Phase 2 — Plan.** Three layers: `lib/api/transactions.ts` (service) → `useTransactions` (hook) →
`TransactionList` (component).

**Phase 3 — Build** (ask the agent):
```
/meda-fe-endpoint integrate GET /transaction/v1/list returning Transaction[]
```
The agent (guided by fe-dev-process + fe-react-principles + fe-api-client) produces the service, hook,
and component with the four states — types first, no `any`.

**Phase 4 — Verify:**
```
/meda-fe-test write tests for useTransactions and the money formatting
npx tsc --noEmit
pnpm dev
```

**Phase 5 — Ship.** Exact versions, lockfile committed, small PR. Review is fast because the shape is
the standard one.

---

## Scenario B — Endpoint NOT ready: "build the beneficiary creation form"

The backend hasn't delivered `POST /beneficiary/v1/create` yet. DON'T hardcode a fake.

**Phase 1 — Understand + agree the contract.** With backend, agree the request/response shape (even
before it's built). Say it returns the APIResponse envelope with the created beneficiary.

**Phase 2 — Mock it with MSW** (ask the agent):
```
Set up an MSW handler for POST /beneficiary/v1/create following fe-mocking, returning the MEDA
APIResponse envelope with the created beneficiary. Also add an error case for duplicate CLABE.
```
This creates `src/mocks/handlers/beneficiary.ts` — OUTSIDE your app code.

**Phase 3 — Build the real feature against the mock:**
```
/meda-fe-component a beneficiary form (RHF + Zod, validate CLABE) that calls POST /beneficiary/v1/create
```
Your `lib/api` calls the REAL path. MSW answers it in dev because `NEXT_PUBLIC_ENABLE_MSW=true`.

**Phase 4 — Verify** with the mock (loading, success, the duplicate-CLABE error path).

**Phase 5 — Switch to real, zero code changes:**
When backend delivers the endpoint, set `NEXT_PUBLIC_ENABLE_MSW=false`. Your feature already works —
nothing to remove, because the fake never lived in your code. THIS is why we use MSW.

---

## The mental model
- Every feature: understand → plan three layers → build → verify → ship.
- Endpoint missing? Agree the contract, mock with MSW, build fully, flip the flag later.
- The skills enforce the shape so the team builds the same way → reviews are fast and predictable.
