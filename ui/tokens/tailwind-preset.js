/**
 * MEDA UI — Tailwind preset
 * Import this preset in your tailwind.config so all MEDA token classes are available:
 *   import medaPreset from './ui/tokens/tailwind-preset'
 *   export default { presets: [medaPreset], content: [...] }
 *
 * Then use semantic classes (NOT raw hex): bg-brand, text-fg, border-default, bg-surface, etc.
 * Dark mode toggles via the `.dark` class on <html> (class strategy).
 */

/** @type {import('tailwindcss').Config} */
const medaPreset = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--meda-brand)",
          light: "var(--meda-brand-light)",
          dark: "var(--meda-brand-dark)",
          foreground: "var(--meda-brand-foreground)",
        },
        bg: "var(--meda-bg)",
        surface: "var(--meda-surface)",
        sidebar: {
          DEFAULT: "var(--meda-sidebar)",
          text: "var(--meda-sidebar-text)",
          selected: "var(--meda-sidebar-selected)",
          "selected-text": "var(--meda-sidebar-selected-text)",
          hover: "var(--meda-sidebar-hover)",
          "hover-text": "var(--meda-sidebar-hover-text)",
        },
        fg: {
          DEFAULT: "var(--meda-fg)",
          secondary: "var(--meda-fg-secondary)",
          tertiary: "var(--meda-fg-tertiary)",
          disabled: "var(--meda-fg-disabled)",
        },
        muted: "var(--meda-muted)",
        "border-default": "var(--meda-border)",
        success: {
          DEFAULT: "var(--meda-success)",
          light: "var(--meda-success-light)",
          dark: "var(--meda-success-dark)",
        },
        error: {
          DEFAULT: "var(--meda-error)",
          light: "var(--meda-error-light)",
          dark: "var(--meda-error-dark)",
        },
        warning: {
          DEFAULT: "var(--meda-warning)",
          light: "var(--meda-warning-light)",
          dark: "var(--meda-warning-dark)",
        },
        info: {
          DEFAULT: "var(--meda-info)",
          light: "var(--meda-info-light)",
          dark: "var(--meda-info-dark)",
        },
        table: {
          head: "var(--meda-table-head-bg)",
          title: "var(--meda-table-title)",
          subtitle: "var(--meda-table-subtitle)",
        },
      },
      borderRadius: {
        meda: "var(--meda-radius)",
      },
      fontFamily: {
        sans: ["Binance Plex", "system-ui", "-apple-system", "sans-serif"],
      },
      borderColor: {
        DEFAULT: "var(--meda-border)",
      },
    },
  },
};

export default medaPreset;
