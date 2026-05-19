"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { useCart } from "@/lib/cart/CartContext";
import type { ConfigurableProduct } from "@/lib/data/products";

type Props = {
  product: ConfigurableProduct;
  open: boolean;
  onClose: () => void;
};

export function Configurator({ product, open, onClose }: Props) {
  const { addItem } = useCart();

  const defaultMemory = product.memory?.[0]?.label;
  const defaultColor = product.colors?.[0]?.label;
  const defaultMonths =
    product.durations.find((d) => d.months === 36)?.months ??
    product.durations[0].months;

  const [memory, setMemory] = useState<string | undefined>(defaultMemory);
  const [color, setColor] = useState<string | undefined>(defaultColor);
  const [months, setMonths] = useState<number>(defaultMonths);

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      monthly: 0,
      months,
      source: "product",
      config: {
        memory,
        color,
      },
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} title={`Configura ${product.name}`}>
      <div className="space-y-7">
        {product.memory ? (
          <Field label="Memoria">
            <div className="flex flex-wrap gap-2">
              {product.memory.map((m) => {
                const active = m.label === memory;
                return (
                  <button
                    key={m.label}
                    type="button"
                    onClick={() => setMemory(m.label)}
                    className={`rounded-xl border px-4 py-3 text-sm transition-all ${
                      active
                        ? "border-[#0066cc] bg-[#0066cc]/5 text-zinc-900"
                        : "border-zinc-200 text-zinc-700 hover:border-zinc-400"
                    }`}
                  >
                    <span className="block font-medium">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </Field>
        ) : null}

        {product.colors ? (
          <Field label="Colore">
            <div className="flex flex-wrap gap-3">
              {product.colors.map((c) => {
                const active = c.label === color;
                return (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => setColor(c.label)}
                    aria-label={c.label}
                    className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all ${
                      active
                        ? "border-[#0066cc] bg-[#0066cc]/5"
                        : "border-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="h-5 w-5 rounded-full ring-1 ring-zinc-200"
                      style={{ background: c.swatch }}
                    />
                    <span className="text-zinc-700">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </Field>
        ) : null}

        <Field label="Durata">
          <div className="grid grid-cols-3 gap-2">
            {product.durations.map((d) => {
              const active = d.months === months;
              return (
                <button
                  key={d.months}
                  type="button"
                  onClick={() => setMonths(d.months)}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                    active
                      ? "border-[#0066cc] bg-[#0066cc]/5 text-zinc-900"
                      : "border-zinc-200 text-zinc-700 hover:border-zinc-400"
                  }`}
                >
                  {d.months} mesi
                </button>
              );
            })}
          </div>
        </Field>

        <div className="flex justify-end pt-4 border-t border-zinc-100">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#0066cc] px-5 text-white text-sm font-medium hover:bg-[#0058b3] transition-colors sm:w-auto"
          >
            Aggiungi al preventivo
          </button>
        </div>
      </div>
    </Dialog>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-zinc-900 mb-3">{label}</p>
      {children}
    </div>
  );
}
