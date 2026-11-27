"use client";

import { CheckCircle2, Info, X } from "lucide-react";
import { useStore } from "@/stores/useStore";

export function ToastContainer() {
  const toasts = useStore((s) => s.toasts);
  const dismissToast = useStore((s) => s.dismissToast);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-4 right-4 z-[80] flex flex-col gap-2 max-w-sm w-[calc(100vw-2rem)] sm:w-auto pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 rounded-lg border border-beige bg-white px-4 py-3 shadow-lg text-charcoal"
          role="status"
        >
          {toast.variant === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-terracotta mt-0.5" />
          ) : (
            <Info className="h-5 w-5 shrink-0 text-walnut mt-0.5" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-charcoal">{toast.title}</p>
            {toast.description && (
              <p className="text-xs text-muted truncate mt-0.5">
                {toast.description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
            className="text-muted hover:text-charcoal p-0.5 rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
