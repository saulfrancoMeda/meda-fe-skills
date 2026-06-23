/** MEDA UI utils — PII masking for display (never log raw PII). */

/** Mask an account/CLABE: keep first 4 and last 4. */
export function maskAccount(value: string): string {
  const v = value.replace(/\s/g, "");
  if (v.length <= 8) return "****";
  return `${v.slice(0, 4)}${"*".repeat(v.length - 8)}${v.slice(-4)}`;
}

/** Mask an email: j****@domain.com */
export function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!domain) return "****";
  return `${user[0]}${"*".repeat(Math.max(user.length - 1, 1))}@${domain}`;
}

/** Mask a phone: keep last 4. */
export function maskPhone(phone: string): string {
  const v = phone.replace(/\D/g, "");
  return v.length >= 4 ? `${"*".repeat(v.length - 4)}${v.slice(-4)}` : "****";
}
