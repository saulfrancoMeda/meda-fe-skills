"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
import { Input } from "./input";
import { Select } from "./select";
import { Textarea } from "./textarea";
import { Switch } from "./switch";
import { Checkbox } from "./checkbox";
import { AmountInput } from "./amount-input";
import { Combobox, type ComboboxOption } from "./combobox";
import { Field, FieldLabel, FieldDescription, FieldError } from "./field";
import { Button } from "./button";

export type FieldType = "text" | "email" | "password" | "number" | "amount" | "select" | "combobox" | "textarea" | "switch" | "checkbox";

export interface FormFieldSchema {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: { value: string; label: string }[];   // select/combobox
  /** Span full row in a 2-col grid (default false = half width on sm+). */
  full?: boolean;
  /** Custom validator: return an error string or null. */
  validate?: (value: unknown, values: Record<string, unknown>) => string | null;
  min?: number; max?: number; pattern?: string;
}

export interface FormSchema {
  fields: FormFieldSchema[];
  submitLabel?: string;
  /** 1 or 2 columns (default 2 on desktop). */
  columns?: 1 | 2;
}

interface FormRendererProps {
  schema: FormSchema;
  initialValues?: Record<string, unknown>;
  onSubmit: (values: Record<string, unknown>) => void;
  className?: string;
}

/**
 * Renders a complete, validated form from a JSON schema. Lets you define forms as data
 * (config-driven) instead of hand-writing JSX per field — ideal for dynamic/admin forms.
 *
 *   const schema: FormSchema = { submitLabel: "Guardar", fields: [
 *     { name: "email", label: "Correo", type: "email", required: true, full: true },
 *     { name: "amount", label: "Monto", type: "amount", required: true },
 *     { name: "role", label: "Rol", type: "select", options: [{ value: "op", label: "Operador" }] },
 *   ]};
 *   <FormRenderer schema={schema} onSubmit={(values) => api.save(values)} />
 */
export function FormRenderer({ schema, initialValues = {}, onSubmit, className }: FormRendererProps) {
  const [values, setValues] = React.useState<Record<string, unknown>>(initialValues);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const cols = schema.columns ?? 2;

  const setVal = (name: string, v: unknown) => setValues((prev) => ({ ...prev, [name]: v }));

  const validateField = (f: FormFieldSchema, v: unknown): string | null => {
    if (f.required && (v === undefined || v === "" || v === null)) return "Campo obligatorio";
    if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v))) return "Correo inválido";
    if (f.pattern && v && !new RegExp(f.pattern).test(String(v))) return "Formato inválido";
    if (f.type === "amount" && f.min != null && Number(v) < f.min) return `Mínimo ${f.min}`;
    if (f.validate) return f.validate(v, values);
    return null;
  };

  const submit = () => {
    const next: Record<string, string> = {};
    for (const f of schema.fields) {
      const err = validateField(f, values[f.name]);
      if (err) next[f.name] = err;
    }
    setErrors(next);
    if (Object.keys(next).length === 0) onSubmit(values);
  };

  const renderControl = (f: FormFieldSchema) => {
    const v = values[f.name];
    const err = !!errors[f.name];
    switch (f.type) {
      case "select":
        return <Select id={f.name} error={err} options={f.options ?? []} value={(v as string) ?? ""} onChange={(e) => setVal(f.name, e.target.value)} />;
      case "combobox":
        return <Combobox id={f.name} error={err} options={(f.options ?? []) as ComboboxOption[]} value={(v as string) ?? ""} onChange={(val) => setVal(f.name, val)} placeholder={f.placeholder} />;
      case "textarea":
        return <Textarea id={f.name} error={err} placeholder={f.placeholder} value={(v as string) ?? ""} onChange={(e) => setVal(f.name, e.target.value)} />;
      case "switch":
        return <Switch checked={!!v} onChange={(val) => setVal(f.name, val)} />;
      case "checkbox":
        return <Checkbox id={f.name} checked={!!v} onChange={(e) => setVal(f.name, e.target.checked)} label={f.placeholder} />;
      case "amount":
        return <AmountInput id={f.name} error={err} value={(v as number) ?? ""} onChange={(val) => setVal(f.name, val)} />;
      default:
        return <Input id={f.name} type={f.type} error={err} placeholder={f.placeholder} value={(v as string) ?? ""} onChange={(e) => setVal(f.name, e.target.value)} />;
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className={cn("grid gap-4", cols === 2 ? "sm:grid-cols-2" : "grid-cols-1")}>
        {schema.fields.map((f) => (
          <Field key={f.name} className={cn(f.full && "sm:col-span-2", (f.type === "switch" || f.type === "checkbox") && "flex-row items-center gap-3")}>
            {f.type !== "checkbox" && <FieldLabel htmlFor={f.name}>{f.label}{f.required && <span className="text-error"> *</span>}</FieldLabel>}
            {renderControl(f)}
            {f.description && <FieldDescription>{f.description}</FieldDescription>}
            <FieldError>{errors[f.name]}</FieldError>
          </Field>
        ))}
      </div>
      <Button onClick={submit} className="w-full sm:w-auto">{schema.submitLabel ?? "Enviar"}</Button>
    </div>
  );
}
