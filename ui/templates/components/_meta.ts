// MEDA UI — component catalog metadata (plain data, no JSX).
// Used by the /components index (cards + search) and by [slug]/page.tsx (generateStaticParams).
// Keep this in sync with _registry.tsx (every slug here must have examples there).

export interface ComponentMeta {
  slug: string;
  name: string;
  category: string;
  summary: string;
}

export const CATEGORIES = [
  "Actions",
  "Forms",
  "Feedback",
  "Overlays",
  "Navigation",
  "Data display",
  "Fintech",
  "Brand",
] as const;

export const COMPONENT_META: ComponentMeta[] = [
  // Actions
  { slug: "button", name: "Button", category: "Actions", summary: "Triggers an action. Variants, sizes and loading state." },
  { slug: "badge", name: "Badge", category: "Actions", summary: "Small label for status, counts or categories." },
  { slug: "avatar", name: "Avatar", category: "Actions", summary: "User image with initials fallback." },
  { slug: "toggle-group", name: "Toggle Group", category: "Actions", summary: "Set of toggle buttons for a single choice." },
  { slug: "theme-toggle", name: "Theme Toggle", category: "Actions", summary: "Switch between light and dark mode." },

  // Forms
  { slug: "input", name: "Input", category: "Forms", summary: "Single-line text field with error state." },
  { slug: "form-field", name: "Form Field", category: "Forms", summary: "Input + label + hint/error in one component." },
  { slug: "field", name: "Field", category: "Forms", summary: "Composable field primitive (label, description, error)." },
  { slug: "input-group", name: "Input Group", category: "Forms", summary: "Input with icons, text or buttons attached." },
  { slug: "input-otp", name: "Input OTP", category: "Forms", summary: "One-time-password / verification code input." },
  { slug: "label", name: "Label", category: "Forms", summary: "Accessible label for form controls." },
  { slug: "textarea", name: "Textarea", category: "Forms", summary: "Multi-line text field." },
  { slug: "select", name: "Select", category: "Forms", summary: "Native dropdown select." },
  { slug: "checkbox", name: "Checkbox", category: "Forms", summary: "Boolean choice with optional label." },
  { slug: "radio-group", name: "Radio Group", category: "Forms", summary: "Choose one option from a list." },
  { slug: "switch", name: "Switch", category: "Forms", summary: "On/off toggle." },
  { slug: "slider", name: "Slider", category: "Forms", summary: "Pick a numeric value from a range." },
  { slug: "combobox", name: "Combobox", category: "Forms", summary: "Searchable select for long lists." },
  { slug: "date-picker", name: "Date Picker", category: "Forms", summary: "Calendar input for selecting a date." },

  // Feedback
  { slug: "spinner", name: "Spinner", category: "Feedback", summary: "Indeterminate loading indicator." },
  { slug: "skeleton", name: "Skeleton", category: "Feedback", summary: "Placeholder shimmer while content loads." },
  { slug: "progress", name: "Progress", category: "Feedback", summary: "Determinate progress bar." },
  { slug: "alert", name: "Alert", category: "Feedback", summary: "Inline message for info, success, warning, error." },
  { slug: "toast", name: "Toast", category: "Feedback", summary: "Transient notification (Binance-style)." },
  { slug: "separator", name: "Separator", category: "Feedback", summary: "Visual divider between content." },

  // Overlays
  { slug: "dialog", name: "Dialog", category: "Overlays", summary: "Modal window centered on screen." },
  { slug: "confirm-dialog", name: "Confirm Dialog", category: "Overlays", summary: "Confirmation modal for risky actions." },
  { slug: "dropdown-menu", name: "Dropdown Menu", category: "Overlays", summary: "Menu of actions triggered by a button." },
  { slug: "popover", name: "Popover", category: "Overlays", summary: "Floating content anchored to a trigger." },
  { slug: "tooltip", name: "Tooltip", category: "Overlays", summary: "Hint shown on hover/focus." },
  { slug: "hover-card", name: "Hover Card", category: "Overlays", summary: "Rich preview shown on hover." },
  { slug: "sheet", name: "Sheet", category: "Overlays", summary: "Side panel that slides in." },
  { slug: "command", name: "Command", category: "Overlays", summary: "Command palette / quick search." },

  // Navigation
  { slug: "tabs", name: "Tabs", category: "Navigation", summary: "Switch between sections of content." },
  { slug: "breadcrumb", name: "Breadcrumb", category: "Navigation", summary: "Shows the current location in a hierarchy." },
  { slug: "pagination", name: "Pagination", category: "Navigation", summary: "Navigate between pages of data." },
  { slug: "accordion", name: "Accordion", category: "Navigation", summary: "Collapsible stacked sections." },
  { slug: "collapsible", name: "Collapsible", category: "Navigation", summary: "Show/hide a single block of content." },
  { slug: "scroll-area", name: "Scroll Area", category: "Navigation", summary: "Scrollable container with styled overflow." },

  // Data display
  { slug: "card", name: "Card", category: "Data display", summary: "Surface that groups related content." },
  { slug: "table", name: "Table", category: "Data display", summary: "Primitive table elements." },
  { slug: "data-table", name: "Data Table", category: "Data display", summary: "Sortable table with density, columns, pagination." },

  // Fintech
  { slug: "amount-input", name: "Amount Input", category: "Fintech", summary: "Money input with currency symbol." },
  { slug: "copy-field", name: "Copy Field", category: "Fintech", summary: "Read-only field with copy button (CLABE, refs)." },
  { slug: "status-pill", name: "Status Pill", category: "Fintech", summary: "Transaction status indicator." },
  { slug: "transaction-card", name: "Transaction Card", category: "Fintech", summary: "Row summarizing a single movement." },

  // Brand
  { slug: "status-icons", name: "Status Icons", category: "Brand", summary: "MEDA brand SVG status icons." },
];
