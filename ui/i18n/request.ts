import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import es from "../messages/es.json";
import en from "../messages/en.json";
import zh from "../messages/zh.json";

const MESSAGES = { es, en, zh } as const;
type Locale = keyof typeof MESSAGES;
const DEFAULT: Locale = "es";

/**
 * MEDA i18n — locale from a cookie (no URL routing). International teams (es/en/zh).
 * Static imports (not dynamic) so the bundler resolves messages reliably.
 * Change language by setting the `locale` cookie (see LanguageSwitcher).
 */
export default getRequestConfig(async () => {
  const store = await cookies();
  const cookieLocale = store.get("locale")?.value as Locale | undefined;
  const locale: Locale = cookieLocale && cookieLocale in MESSAGES ? cookieLocale : DEFAULT;
  return {
    locale,
    messages: MESSAGES[locale],
  };
});
