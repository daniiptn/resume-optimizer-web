import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  autoCloseMs?: number;
};

export default function Toast({
  message,
  type = "success",
  onClose,
  autoCloseMs = 3000,
}: ToastProps) {
  useEffect(() => {
    const id = setTimeout(onClose, autoCloseMs);
    return () => clearTimeout(id);
  }, [onClose, autoCloseMs]);

  const base =
    "fixed bottom-6 right-6 z-50 rounded-md shadow-lg px-4 py-3 text-sm flex items-start gap-2";
  const styles =
    type === "success"
      ? "bg-green-50 border border-green-200 text-green-800"
      : "bg-red-50 border border-red-200 text-red-800";

  return (
    <div className={`${base} ${styles}`} role="status" aria-live="polite">
      <span>✅</span>
      <p>{message}</p>
      <button
        type="button"
        onClick={onClose}
        className="ml-3 text-xs underline underline-offset-2"
        aria-label="Dismiss"
      >
        Dismiss
      </button>
    </div>
  );
}
