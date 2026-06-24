#!/usr/bin/env python3
"""Wrap a Next.js RootLayout with NextIntlClientProvider for next-intl (no locale routing)."""
import sys, re

def main():
    path = sys.argv[1]
    with open(path) as f:
        s = f.read()
    if "NextIntlClientProvider" in s:
        return  # already wrapped

    # 1. Add imports at the top
    imports = ('import { NextIntlClientProvider } from "next-intl";\n'
               'import { getLocale, getMessages } from "next-intl/server";\n')
    s = imports + s

    # 2. Make RootLayout async
    s = s.replace("export default function RootLayout", "export default async function RootLayout")

    # 3. Insert locale/messages fetch right after the function's opening brace
    m = re.search(r"(export default async function RootLayout\([^)]*\)[^{]*\{)", s)
    if m:
        insert = m.group(1) + "\n  const locale = await getLocale();\n  const messages = await getMessages();"
        s = s[:m.start()] + insert + s[m.end():]

    # 4. Wrap {children} with the provider
    s = s.replace("{children}",
                  "<NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider>",
                  1)

    with open(path, "w") as f:
        f.write(s)

if __name__ == "__main__":
    main()
