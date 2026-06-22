---
name: fe-testing
description: >
  MEDA frontend standard: Vitest + Testing Library, what to test, API mocks, and mandatory scenarios
  (render, interaction, loading/error/empty, forms). Use whenever writing or reviewing frontend
  tests. Triggers on test, vitest, testing library, mock, coverage, component test / "test",
  "prueba", "cobertura", "mock".
---
# Frontend Testing

## Stack
- **Vitest** + **@testing-library/react** + **@testing-library/user-event**.
- Mock the API client / network (e.g. MSW or vi.mock); never hit real endpoints.

## What to test (behavior, not implementation)
- Query by role/label (accessible queries) over test-ids when possible.
- Render with required props; interaction (click/type/submit); the three states (loading/error/empty).
- Data hooks: success AND error (status:"ERROR") paths.
- Forms: validation shown, submit blocked when invalid, valid submit calls handler.

## Naming & structure
- Describe behavior: `shows error toast when payment fails`.
- One behavior per test; each test must be able to fail if the component breaks.

## Rules
- Cover the error path, not only success.
- Don't test framework internals; test what the user experiences.
