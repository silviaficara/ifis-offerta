"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart/CartContext";
import type { Service } from "@/lib/data/services";

export function AddServiceButton({ service }: { service: Service }) {
  const { addItem } = useCart();
  const [bump, setBump] = useState(false);

  const handleAdd = () => {
    addItem({
      productId: service.id,
      name: service.name,
      monthly: 0,
      months: 0,
      source: "service",
    });
    setBump(true);
    setTimeout(() => setBump(false), 600);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`inline-flex h-9 sm:h-10 w-full items-center justify-center rounded-full border px-3 sm:px-4 text-xs sm:text-sm font-medium transition-colors ${
        bump
          ? "border-[#FB8F22] bg-[#FB8F22] text-white animate-[cart-bump_0.6s_ease-out]"
          : "border-[#1a1d56] bg-transparent text-[#1a1d56] hover:bg-[#1a1d56]/5"
      }`}
    >
      Aggiungi
    </button>
  );
}
