import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const SUPPORTED = ["es", "en", "zh"] as const;
const DEFAULT = "es";

/**
 * MEDA i18n — locale from a cookie (no URL routing). International teams (es/en/zh).
 * Change language by setting the `locale` cookie (see LanguageSwitcher).
 */
export default getRequestConfig(async () => {
  const store = await cookies();
  const cookieLocale = store.get("locale")?.value;
  const locale = (SUPPORTED as readonly string[]).includes(cookieLocale ?? "") ? cookieLocale! : DEFAULT;
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
