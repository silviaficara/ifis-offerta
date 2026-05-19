"use client";

import { useCart } from "@/lib/cart/CartContext";
import type { Service } from "@/lib/data/services";

export function AddServiceButton({ service }: { service: Service }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      productId: service.id,
      name: service.name,
      monthly: 0,
      months: 0,
      source: "service",
    });
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="inline-flex h-9 sm:h-10 w-full items-center justify-center rounded-full border border-[#0066cc] bg-transparent px-3 sm:px-4 text-[#0066cc] text-xs sm:text-sm font-medium hover:bg-[#0066cc]/5 transition-colors"
    >
      <span className="sm:hidden">Aggiungi</span>
      <span className="hidden sm:inline">Aggiungi al preventivo</span>
    </button>
  );
}
