/** MEDA UI utils — formatting (MXN currency, dates, numbers). */

const MXN = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });

/** Format a number as MXN currency: 1234.5 -> "$1,234.50". */
export function formatCurrency(amount: number): string {
  return MXN.format(amount);
}

/** Format a number with thousands separators: 1234567 -> "1,234,567". */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("es-MX").format(value);
}

/** Format an ISO date string to es-MX long date: "2026-06-22" -> "22 de junio de 2026". */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" });
}

/** Format an ISO date string to date + time. */
export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("es-MX", { dateStyle: "medium", timeStyle: "short" });
}
