# How development reflects the principles (before / after)

This is how the MEDA frontend skills shape day-to-day code. Every dev builds the same shape, so code
reviews become fast and predictable. Each example: what a dev might write WITHOUT the standard, and
what the skills produce WITH it.

---

## Example 1 — "Build a transactions list that loads from the API"

### ✗ Without the standard (everything in one component)
```tsx
function Transactions() {
  const [data, setData] = useState([]);
  useEffect(() => { fetch("/api/tx").then(r => r.json()).then(setData); }, []);
  return <div>{data.map(t => <div key={t.id}>{t.amount}</div>)}</div>;
}
```
Problems: fetch + state + render in one place (SRP violated), no loading/error/empty states, no types,
raw fetch without the MEDA APIResponse handling.

### ✓ With the standard (3 layers: service → hook → component)
```tsx
// lib/api/transactions.ts — the service
export async function getTransactions(): Promise<Transaction[]> {
  return get<Transaction[]>("/transaction/v1/list");   // handles APIResponse + status:ERROR
}

// features/transactions/hooks/useTransactions.ts — the logic
export function useTransactions() {
  return useQuery({ queryKey: ["transactions"], queryFn: getTransactions });
}

// features/transactions/components/TransactionList.tsx — presentational only
export function TransactionList() {
  const { data, isLoading, isError } = useTransactions();
  if (isLoading) return <Spinner />;
  if (isError) return <p className="text-error">Couldn't load transactions.</p>;
  if (!data?.length) return <p className="text-fg-secondary">No transactions yet.</p>;
  return <div className="grid gap-3">{data.map(t => <TransactionCard key={t.orderNo} {...t} />)}</div>;
}
```
Why: SRP (each file one job), the four states handled, typed, reuses MEDA UI + API client. ANY dev
produces this exact shape → a reviewer knows where to look instantly.

---

## Example 2 — "Add a search box that queries the API"

### ✗ Without: fires a request on every keystroke (performance + race conditions)
```tsx
<input onChange={e => fetch(`/api/search?q=${e.target.value}`)} />
```

### ✓ With: debounced hook, cancels stale requests (fe-react-principles pattern #1)
```tsx
// hooks/useDebounce.ts — reusable (DRY)
export function useDebounce<T>(value: T, ms = 300) {
  const [v, setV] = useState(value);
  useEffect(() => { const id = setTimeout(() => setV(value), ms); return () => clearTimeout(id); }, [value, ms]);
  return v;
}

// in the component
const debounced = useDebounce(query, 300);
const { data, isLoading } = useQuery({
  queryKey: ["search", debounced],
  queryFn: () => searchApi(debounced),
  enabled: debounced.length > 1,
});
```
Why: debounce (performance), TanStack cancels stale requests (race conditions), `enabled` guards empty
queries (edge case). This is the Autocomplete pattern, built to standard.

---

## Example 3 — "A form to register a beneficiary"

### ✗ Without: ad-hoc validation, `any`, no error display
```tsx
const [name, setName] = useState("");
function submit() { if (!name) alert("required"); /* ... */ }
```

### ✓ With: RHF + Zod, typed, accessible errors (fe-forms-validation)
```tsx
const schema = z.object({
  name: z.string().min(1, "Required"),
  clabe: z.string().refine(isValidCLABE, "Invalid CLABE"),   // reuses lib/utils/validators
});
type Values = z.infer<typeof schema>;
const { register, handleSubmit, formState: { errors } } = useForm<Values>({ resolver: zodResolver(schema) });
// <FormField label="CLABE" error={errors.clabe?.message} {...register("clabe")} />
```
Why: one source of truth for the schema, reuses MX validators (DRY), accessible field errors, no `any`.

---

## How this helps code review

Because every feature has the SAME shape, a reviewer checks a short, predictable list:
1. Is the fetch in a hook/service (not inline in the component)?  → SRP / separation
2. Are loading/error/empty handled?  → edge cases
3. Are types real (no `any`)?  → fe-prohibited-practices
4. Does it reuse MEDA UI + lib/utils instead of re-implementing?  → DRY
5. Is status:"ERROR" handled on API calls?  → fe-api-client
6. Exact dependency versions, lockfile committed?  → fe-dependency-security

The reviewer (or `/meda-fe-review`) runs this list against any PR. Since the author built with the
same skills, findings are rare and specific — not "rewrite the whole thing".

## How a dev triggers this day-to-day
```
/meda-fe-component a transactions list that loads from the API
/meda-fe-endpoint integrate the create-beneficiary endpoint
/meda-fe-review check this PR against MEDA standards
```
Or just natural language ("build a debounced search for merchants") — the router loads
`fe-react-principles` + the relevant skills and produces the standard shape.
