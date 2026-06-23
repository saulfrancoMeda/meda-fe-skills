"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

type ToastType = "success" | "error" | "info" | "warning";
interface Toast { id: string; type: ToastType; message: string; }

const ToastCtx = React.createContext<{ show: (t: ToastType, m: string) => void } | null>(null);
export const useToast = () => {
  const c = React.useContext(ToastCtx);
  if (!c) throw new Error("useToast must be used within ToastProvider");
  return c;
};

const colors: Record<ToastType, string> = {
  success: "border-success bg-success/10 text-success-dark",
  error: "border-error bg-error/10 text-error-dark",
  info: "border-info bg-info/10 text-info-dark",
  warning: "border-warning bg-warning/10 text-warning-dark",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const show = React.useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);
  return (
    <ToastCtx.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2" role="region" aria-label="Notifications">
        {toasts.map((t) => (
          <div key={t.id} role="alert" className={cn("rounded-meda border px-4 py-3 text-sm shadow-lg", colors[t.type])}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
