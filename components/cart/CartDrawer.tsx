"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart/CartContext";
import { formatEuro } from "@/lib/format";
import { displayPrice, vatLabel } from "@/lib/pricing";

export function CartDrawer() {
  const {
    items,
    totalMonthly,
    removeItem,
    incrementItem,
    decrementItem,
    clear,
    isOpen,
    close,
  } = useCart();
  const hasOnRequest = items.some((item) => item.monthly === 0);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <>
      <div
        aria-hidden={!isOpen}
        onClick={close}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Riepilogo preventivo"
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 shrink-0">
          <div>
            <p className="text-base font-semibold tracking-tight text-zinc-900">
              Riepilogo preventivo
            </p>
            {items.length > 0 ? (
              <p className="text-xs text-zinc-500 mt-0.5">
                {items.length} {items.length === 1 ? "prodotto" : "prodotti"}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Chiudi"
            className="rounded-full w-9 h-9 flex items-center justify-center text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 text-xl leading-none"
          >
            ×
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-3xl mb-4">
              🛒
            </div>
            <p className="text-base font-semibold text-zinc-900">
              Il tuo riepilogo è vuoto
            </p>
            <p className="text-sm text-zinc-500 mt-2 max-w-xs">
              Aggiungi uno o più prodotti dai pacchetti pronti o dai
              configuratori.
            </p>
            <Link
              href="/#pacchetti"
              onClick={close}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#1a1d56] text-white text-sm font-medium px-6 hover:bg-[#12143d] transition-colors"
            >
              Vedi i pacchetti →
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="divide-y divide-zinc-100">
                {items.map((item) => (
                  <li key={item.id} className="py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-zinc-900 leading-snug">
                          {item.name}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {[
                            item.config?.memory,
                            item.config?.color,
                            ...Object.values(item.config?.optionGroups ?? {}),
                            ...(item.config?.addons ?? []),
                            item.months > 0 ? `${item.months} mesi` : null,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>
                      {item.monthly > 0 ? (
                        <p className="shrink-0 text-sm font-semibold text-[#1a1d56]">
                          {formatEuro(displayPrice(item.monthly * item.quantity))} €/mese{" "}
                          <span className="font-normal text-zinc-500">
                            {vatLabel}
                          </span>
                        </p>
                      ) : (
                        <p className="shrink-0 text-sm text-zinc-500">
                          Su richiesta
                        </p>
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-full bg-zinc-100">
                        <button
                          type="button"
                          onClick={() => decrementItem(item.id)}
                          aria-label="Riduci quantità"
                          className="w-7 h-7 flex items-center justify-center text-sm text-zinc-700 hover:text-zinc-900 transition-colors"
                        >
                          −
                        </button>
                        <span className="text-sm font-semibold text-[#1a1d56] w-6 text-center">
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
              <button
                type="button"
                onClick={clear}
                className="mt-4 text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                Svuota tutto
              </button>
            </div>

            <footer className="border-t border-zinc-100 px-6 py-5 shrink-0 bg-zinc-50">
              <div className="mb-4">
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
                    <p className="text-2xl font-semibold tracking-tight text-[#1a1d56]">
                      {formatEuro(displayPrice(totalMonthly))} €/mese{" "}
                      <span className="text-base font-normal text-zinc-500">
                        {vatLabel}
                      </span>
                    </p>
                  </div>
                </div>
                {hasOnRequest && (
                  <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                    Prodotti configurati: prezzo su richiesta, non incluso nel
                    totale.
                  </p>
                )}
              </div>
              <Link
                href="/checkout"
                onClick={close}
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#1a1d56] text-white text-sm font-medium hover:bg-[#12143d] transition-colors"
              >
                Richiedi preventivo →
              </Link>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
