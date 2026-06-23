---
name: meda-fe-test
description: >
  Command to generate or improve tests for MEDA frontend code using Vitest + Testing Library,
  following the fe-testing standard (money, validators, transaction states, forms, four UI states).
  Invoke when the user asks to write tests, add coverage, or test a component/hook/utility. Triggers
  on "write tests", "add tests", "test this", "meda-fe-test", "genera pruebas", "agrega tests".
---
# /meda-fe-test — generate tests

Generate real, runnable tests for the target code. Load `fe-testing` for the standard.

## Steps
1. Read the target (component, hook, or utility) and identify what carries risk:
   money/formatting, validators, state logic, forms, data-driven UI.
2. Generate a `*.test.ts(x)` file next to it using Vitest + Testing Library.
3. Cover, in priority order: money/rounding edge cases → validators (valid + invalid) → transaction
   state mapping → form valid/invalid submit → the four UI states (mock the hook/query).
4. Mock external calls (the API client, TanStack). Don't hit real endpoints.
5. Use real assertions on behavior the user sees, not implementation details.

## Fintech must-cover (don't skip)
- Amounts: zero, negative, large, fractional cents — formatting never loses/adds a cent.
- Validators: RFC/CURP/CLABE/phone with valid and boundary-invalid inputs.
- Transaction status → correct UI (badge/variant).
- Forms: invalid input does NOT call the submit handler; valid input calls it with the right shape.

## Output
- The test file(s), runnable with `pnpm test` (Vitest).
- If Vitest isn't set up, note the deps to add (exact versions): vitest, @testing-library/react,
  @testing-library/user-event, jsdom — and a minimal vitest.config.ts.
