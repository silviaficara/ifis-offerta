"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/cart/CartContext";
import type { PackageItem } from "@/lib/data/packages";
import { formatEuro } from "@/lib/format";

const tierStyles: Record<
  PackageItem["tier"],
  { label: string; mobileLabel: string; chip: string }
> = {
  silver: {
    label: "Silver",
    mobileLabel: "Silver",
    chip: "bg-zinc-100 text-zinc-700",
  },
  gold: {
    label: "Gold",
    mobileLabel: "★ Gold · Più scelto",
    chip: "bg-[#0066cc] text-white",
  },
  platinum: {
    label: "Premium",
    mobileLabel: "Premium",
    chip: "bg-indigo-100 text-indigo-800",
  },
};

type Props = { item: PackageItem; rowTitle: string };

export function PackageCard({ item, rowTitle }: Props) {
  const { addItem } = useCart();
  const tier = tierStyles[item.tier];
  const noPrice = item.monthly === null;
  const [bump, setBump] = useState(false);

  const handleAdd = () => {
    if (item.monthly === null) {
      window.location.href = "/checkout";
      return;
    }
    addItem({
      productId: item.id,
      name: `${rowTitle} ${tier.label} — ${item.title}`,
      monthly: item.monthly,
      months: item.months,
      source: "package",
    });
    setBump(true);
    setTimeout(() => setBump(false), 600);
  };

  const ariaAdd = noPrice
    ? `Richiedi ${rowTitle} ${tier.label}`
    : `Aggiungi ${rowTitle} ${tier.label} al preventivo`;

  return (
    <div className="relative flex h-full flex-col">
      <button
        type="button"
        onClick={handleAdd}
        aria-label={ariaAdd}
        className="absolute inset-0 z-10 rounded-2xl md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0066cc]"
      />

      <div className="md:hidden flex items-stretch gap-3 p-3">
        <div className="relative shrink-0 w-24 aspect-square rounded-xl bg-[#fafafa]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="96px"
            className="object-contain p-2 drop-shadow-[0_4px_8px_#0000001a]"
          />
        </div>
        <div className="flex flex-1 flex-col min-w-0">
          <span
            className={`mb-1.5 self-start inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide ${tier.chip}`}
          >
            {tier.mobileLabel}
          </span>
          <p className="text-[13px] leading-snug text-zinc-800 whitespace-pre-line line-clamp-3">
            {item.title}
          </p>
          <div className="mt-auto pt-2">
            {noPrice ? (
              <p className="text-xs text-zinc-500">Su richiesta</p>
            ) : (
              <p className="text-sm font-semibold text-[#0066cc] leading-tight">
                {formatEuro(item.monthly!)} €/mese
                <span className="block text-[10px] font-normal text-zinc-500 mt-0.5">
                  per {item.months} mesi · + IVA
                </span>
              </p>
            )}
          </div>
        </div>
        <div className="self-center shrink-0 pr-1" aria-hidden>
          <span
            className={`flex items-center justify-center h-8 w-8 rounded-full border-2 border-[#0066cc] transition-colors ${
              bump
                ? "bg-[#0066cc] text-white animate-[cart-bump_0.6s_ease-out]"
                : "bg-white text-[#0066cc]"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </div>
      </div>

      <div className="hidden md:flex md:h-full md:flex-col">
        <div className="relative aspect-[4/3] bg-[#fafafa]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 18rem, 25vw"
            className="object-contain p-4 drop-shadow-[0_8px_14px_#0000001a]"
          />
        </div>

        <div className="flex flex-1 flex-col items-center p-5 sm:p-6 text-center">
          <p className="mb-5 flex-1 text-sm leading-snug text-zinc-800 whitespace-pre-line">
            {item.title}
          </p>

          {noPrice ? (
            <p className="mb-4 text-sm text-zinc-500">Su richiesta</p>
          ) : (
            <div className="mb-4">
              <p className="text-base font-semibold text-[#0066cc]">
                {formatEuro(item.monthly!)} €/mese{" "}
                <span className="text-xs font-normal text-zinc-500">+ IVA</span>
              </p>
              <p className="text-[10px] text-zinc-500 mt-0.5">
                per {item.months} mesi
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex h-9 items-center justify-center rounded-full bg-[#0066cc] px-4 text-white text-xs font-medium hover:bg-[#0058b3] transition-colors"
          >
            {noPrice ? "Richiedi" : "Aggiungi"}
          </button>
        </div>
      </div>
    </div>
  );
}
