"use client";

import { useCart } from "@/lib/cart/CartContext";

export function CartToast() {
  const { notification } = useCart();
  const visible = notification !== null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2"
      }`}
    >
      <div className="inline-flex items-center gap-3 rounded-2xl bg-zinc-900 text-white px-5 py-3 shadow-xl">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1a1d56] text-xs font-bold">
          ✓
        </span>
        <span className="text-sm font-medium">
          {notification ?? "Aggiunto al preventivo"}
        </span>
      </div>
    </div>
  );
}
