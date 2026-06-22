---
name: fe-security
description: >
  MEDA frontend standard: frontend security — XSS prevention, safe token handling, no secrets in
  client code, input sanitization, CSP. UNIVERSAL skill for fintech. Use whenever handling tokens,
  user input, or external data. Triggers on security, xss, token, secret, sanitize, csp,
  dangerouslySetInnerHTML / "seguridad", "xss", "token", "secreto", "sanitizar".
---
# Frontend Security (fintech)

> Technical guidance, not legal compliance advice; validate regulatory aspects with compliance.

## Secrets & tokens
- NO secrets/API keys in client code or `NEXT_PUBLIC_*` (those ship to the browser). Server-only
  secrets stay in server env, used in Server Components/Route Handlers.
- Tokens: prefer httpOnly cookies; avoid localStorage for sensitive tokens (XSS can read it).
  Never log tokens or PII (same red line as backend).

## XSS
- Avoid `dangerouslySetInnerHTML`; if unavoidable, sanitize (DOMPurify) and never with untrusted data.
- React escapes by default — don't bypass it. Validate/encode anything reflected from URL/params.

## Input & data
- Validate and sanitize user input (Zod on forms); the backend re-validates regardless.
- Don't trust data from the URL, localStorage, or third parties without validation.

## Headers / CSP
- Set a Content-Security-Policy (via middleware/headers) to limit script sources.
- Use `rel="noopener noreferrer"` on external links with `target="_blank"`.

## Rules
- No PII in frontend logs. No secrets in the bundle. No unsanitized HTML injection.
- Auth boundary is the server, never the client alone (see `fe-auth`).
