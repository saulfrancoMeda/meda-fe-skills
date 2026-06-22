---
name: meda-fe-test
description: >
  Use to write or generate frontend tests for MEDA React/TypeScript code. Triggers on "write tests",
  "test this component", "add coverage", "test the hook" / "escríbele tests", "prueba este
  componente", "cobertura". Uses Vitest + Testing Library and covers the mandatory frontend scenarios
  (render, interaction, loading/error/empty states, API mocks). Reply in the user's language.
---

# /meda-fe-test — Frontend tests under standards

Loads `fe-testing`. **Reply in the user's language.**

## Mandatory scenarios (whichever apply)
- **Component render**: renders with required props; matches expected structure.
- **Interaction**: click/type/submit triggers the right behavior (userEvent).
- **States**: loading, error, and empty states render correctly.
- **Data hooks**: API success AND error (status:"ERROR") paths; mock the API client.
- **Forms**: validation errors shown; submit blocked when invalid; valid submit calls the handler.
- **A11y smoke**: key elements have accessible roles/labels.

## Standards
- Vitest + @testing-library/react + @testing-library/user-event.
- Test behavior, not implementation details. Query by role/label, not by test-id when avoidable.
- Mock the API client / network; never hit real endpoints.
- Naming: describe the behavior (`shows error toast when payment fails`).

## Rules
- Cover the error path, not just the happy path (a payment UI that only tests success is incomplete).
- Each test must be able to fail if the component breaks.
