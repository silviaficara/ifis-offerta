"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart/CartContext";
import { formatEuro } from "@/lib/format";

export function Header() {
  const { count, totalMonthly, toggle } = useCart();
  const [bump, setBump] = useState(false);
  const prevCountRef = useRef(count);

  useEffect(() => {
    if (count > prevCountRef.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 600);
      prevCountRef.current = count;
      return () => clearTimeout(t);
    }
    prevCountRef.current = count;
  }, [count]);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between gap-2">
        <Link
          href="/"
          aria-label="Kronos Tech × Banca Ifis — home"
          className="inline-flex items-center gap-2 sm:gap-3 min-w-0"
        >
          <Image
            src="/kronos-logo.png"
            alt="Kronos Tech"
            width={1600}
            height={222}
            priority
            className="h-5 sm:h-7 w-auto"
          />
          <span aria-hidden className="h-3.5 sm:h-5 w-px bg-zinc-300" />
          <Image
            src="/banca-ifis-logo.png"
            alt="Banca Ifis"
            width={3840}
            height={893}
            priority
            className="h-5 sm:h-7 w-auto"
          />
        </Link>

        <button
          type="button"
          onClick={toggle}
          aria-label={`Apri riepilogo preventivo: ${count} ${count === 1 ? "prodotto" : "prodotti"}`}
          className={`inline-flex shrink-0 items-center justify-center gap-1.5 sm:gap-2 rounded-full h-9 ${
            count === 0 ? "w-9 sm:w-auto sm:px-4" : "px-3 sm:px-4"
          } text-xs sm:text-sm font-medium transition-colors origin-center whitespace-nowrap ${
            bump
              ? "bg-[#1a1d56] text-white ring-4 ring-[#1a1d56]/25 animate-[cart-bump_0.6s_ease-out]"
              : count > 0
                ? "bg-[#FB8F22] hover:bg-[#E27D14] text-zinc-900"
                : "bg-zinc-100 hover:bg-zinc-200 text-zinc-900"
          }`}
        >
          <svg
            aria-hidden
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sm:w-[18px] sm:h-[18px]"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {count === 0 ? (
            <span className="hidden sm:inline text-zinc-500">
              Preventivo vuoto
            </span>
          ) : (
            <>
              <span className="font-semibold">{count}</span>
              <span className={bump ? "text-white/60" : "opacity-60"}>·</span>
              <span className="font-semibold">
                {formatEuro(totalMonthly)}
                <span className="hidden sm:inline"> €/mese</span>
                <span className="sm:hidden"> €/m</span>
              </span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
