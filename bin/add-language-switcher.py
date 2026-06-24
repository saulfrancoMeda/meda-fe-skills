#!/usr/bin/env python3
"""Insert <LanguageSwitcher /> next to <ThemeToggle /> in a page, plus its import."""
import sys

def main():
    path = sys.argv[1]
    with open(path) as f:
        s = f.read()
    if "LanguageSwitcher" in s:
        return  # already added

    # 1. Add the import right after the ThemeToggle import
    toggle_import = 'import { ThemeToggle } from "@/components/ui/theme-toggle";'
    if toggle_import in s:
        s = s.replace(
            toggle_import,
            toggle_import + '\nimport { LanguageSwitcher } from "@/features/i18n/language-switcher";',
            1,
        )
    # 2. Render it right before each <ThemeToggle />
    s = s.replace("<ThemeToggle />", "<LanguageSwitcher /><ThemeToggle />")

    with open(path, "w") as f:
        f.write(s)

if __name__ == "__main__":
    main()
