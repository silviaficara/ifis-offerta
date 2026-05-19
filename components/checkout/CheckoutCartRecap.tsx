"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";
import { formatEuro } from "@/lib/format";

export function CheckoutCartRecap() {
  const {
    items,
    totalMonthly,
    removeItem,
    incrementItem,
    decrementItem,
    clear,
  } = useCart();
  const hasOnRequest = items.some((item) => item.monthly === 0);

  if (items.length === 0) {
    return (
      <div className="mb-12 rounded-2xl bg-[#fafafa] p-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-900">
            Nessun prodotto nel preventivo
          </p>
          <p className="text-xs text-zinc-500 mt-0.5">
            Puoi inviare comunque la richiesta — ti aiuteremo a configurare la
            soluzione giusta.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex h-9 w-fit items-center justify-center rounded-full bg-zinc-900 text-white text-xs font-medium px-4 hover:bg-zinc-700 transition-colors"
        >
          Sfoglia i pacchetti →
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-12 rounded-2xl bg-[#fafafa] p-6 sm:p-7">
      <div className="flex items-center justify-between mb-5">
        <p className="text-base sm:text-lg font-semibold tracking-tight text-zinc-900">
          Riepilogo preventivo ·{" "}
          <span className="text-zinc-500 font-normal">
            {items.length} {items.length === 1 ? "prodotto" : "prodotti"}
          </span>
        </p>
        <button
          type="button"
          onClick={clear}
          className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          Svuota
        </button>
      </div>

      <ul className="divide-y divide-zinc-200">
        {items.map((item) => (
          <li key={item.id} className="py-3">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-zinc-900 leading-snug">
                  {item.name}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {[
                    item.config?.memory,
                    item.config?.color,
                    item.months > 0 ? `${item.months} mesi` : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              {item.monthly > 0 ? (
                <p className="shrink-0 text-sm font-semibold text-[#0066cc]">
                  {formatEuro(item.monthly * item.quantity)} €/mese{" "}
                  <span className="font-normal text-zinc-500">+ IVA</span>
                </p>
              ) : (
                <p className="shrink-0 text-sm text-zinc-500">Su richiesta</p>
              )}
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <div className="inline-flex items-center rounded-full bg-white ring-1 ring-zinc-200">
                <button
                  type="button"
                  onClick={() => decrementItem(item.id)}
                  aria-label="Riduci quantità"
                  className="w-7 h-7 flex items-center justify-center text-sm text-zinc-700 hover:text-zinc-900 transition-colors"
                >
                  −
                </button>
                <span className="text-sm font-semibold text-[#0066cc] w-6 text-center">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => incrementItem(item.id)}
                  aria-label="Aumenta quantità"
                  className="w-7 h-7 flex items-center justify-center text-sm text-zinc-700 hover:text-zinc-900 transition-colors"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                Rimuovi
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 pt-5 border-t border-zinc-200">
        <div className="flex items-end justify-between gap-3">
          <p className="text-[10px] uppercase tracking-[0.12em] text-zinc-500">
            Totale canone mensile
          </p>
          <div className="text-right">
            {hasOnRequest && (
              <p className="text-[10px] uppercase tracking-[0.12em] text-zinc-500 mb-1">
                a partire da
              </p>
            )}
            <p className="text-2xl font-semibold tracking-tight text-[#0066cc]">
              {formatEuro(totalMonthly)} €/mese{" "}
              <span className="text-base font-normal text-zinc-500">+ IVA</span>
            </p>
          </div>
        </div>
        {hasOnRequest && (
          <p className="mt-3 text-xs text-zinc-500 leading-relaxed">
            I prodotti configurati hanno prezzo su richiesta e non sono inclusi
            nel totale. Ti contatteremo per il preventivo finale.
          </p>
        )}
      </div>
    </div>
  );
}
