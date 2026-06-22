---
name: fe-data-fetching
description: >
  MEDA frontend standard: data fetching with TanStack Query + Server Components (recommended),
  caching, revalidation, loading/error states, optimistic updates; SWR/RTK Query alternatives. Use
  whenever fetching or mutating server data. Triggers on data fetching, react query, tanstack, swr,
  cache, revalidate, loading state / "fetch", "react query", "cache", "carga de datos".
---
# Data Fetching

## Baseline (recommended)
- **Server Components** for initial page data (fetch on server, no client JS).
- **TanStack Query** for client-side interactive data (lists that refetch, mutations, polling).
- This combo is the solid default with App Router. SWR and RTK Query are valid alternatives;
  follow whatever the repo already uses.

## TanStack Query patterns
- Queries (reads): stable `queryKey`, sensible `staleTime`, handle `isLoading`/`isError`.
- Mutations (writes): `onSuccess` invalidates affected queries; optional optimistic update with rollback.
- Wrap the app in a `QueryClientProvider` (set up by `meda-fe-new`).

## States — always handle the three
Every data UI handles: **loading**, **error**, and **empty**. Never render assuming data exists.
Wire errors to the project's error handling (`fe-error-handling`).

## With MEDA APIs
All calls go through the API client (`fe-api-client`), which handles the APIResponse envelope and
status:"ERROR". Hooks call the client functions, not fetch directly.

## Rules
- Don't put server data in a global store; the query cache IS the state.
- Don't fetch in useEffect when a Server Component or a query hook fits.
- Always handle the error path (especially status:"ERROR" from MEDA APIs).
