"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

type ToastType = "success" | "error" | "info" | "warning";
interface ToastAction { label: string; onClick: () => void; }
interface Toast { id: string; type: ToastType; message: string; action?: ToastAction; }

interface ShowOptions { action?: ToastAction; duration?: number; }
const ToastCtx = React.createContext<{ show: (t: ToastType, m: string, o?: ShowOptions) => void } | null>(null);
export const useToast = () => {
  const c = React.useContext(ToastCtx);
  if (!c) throw new Error("useToast must be used within ToastProvider");
  return c;
};

const styles: Record<ToastType, { border: string; dot: string }> = {
  success: { border: "border-l-success", dot: "bg-success" },
  error:   { border: "border-l-error",   dot: "bg-error" },
  info:    { border: "border-l-info",    dot: "bg-info" },
  warning: { border: "border-l-warning", dot: "bg-warning" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const remove = React.useCallback((id: string) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const show = React.useCallback((type: ToastType, message: string, o?: ShowOptions) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, type, message, action: o?.action }]);
    setTimeout(() => remove(id), o?.duration ?? 5000);
  }, [remove]);

  return (
    <ToastCtx.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80" role="region" aria-label="Notifications">
        {toasts.map((t) => (
          <div key={t.id} role="alert"
            className={cn("meda-pop flex items-start gap-3 rounded-meda border border-border-default border-l-4 bg-surface px-4 py-3 shadow-lg", styles[t.type].border)}>
            <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", styles[t.type].dot)} aria-hidden />
            <p className="flex-1 text-sm text-fg">{t.message}</p>
            {t.action && (
              <button onClick={() => { t.action!.onClick(); remove(t.id); }}
                className="shrink-0 text-xs font-semibold text-brand-dark hover:underline">{t.action.label}</button>
            )}
            <button onClick={() => remove(t.id)} aria-label="Dismiss" className="shrink-0 text-fg-tertiary hover:text-fg">×</button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
