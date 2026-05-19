"use client";

import Image from "next/image";
import { useState } from "react";
import { Configurator } from "./Configurator";
import type { ConfigurableProduct } from "@/lib/data/products";

type Props = { product: ConfigurableProduct; cardBg?: string };

export function ProductCard({ product, cardBg = "bg-white" }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article
        className={`group flex flex-col rounded-2xl sm:rounded-3xl ${cardBg} ring-1 ring-[#0066cc]/30 shadow-[0_8px_14px_#0000001a] overflow-hidden`}
      >
        <div className={`relative aspect-[5/3] ${cardBg}`}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 50vw"
              className={
                product.imageFit === "cover"
                  ? "object-cover"
                  : "object-contain p-3 sm:p-6 drop-shadow-[0_4px_8px_#0000001a] sm:drop-shadow-[0_8px_14px_#0000001a]"
              }
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-zinc-400 text-xs sm:text-sm font-medium px-3 sm:px-6 text-center">
                {product.name}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col px-3 sm:px-5 py-3 sm:py-4 gap-2.5 sm:gap-4">
          <div className="min-w-0">
            {(() => {
              const [head, ...rest] = product.name.split("\n");
              return (
                <>
                  <span className="block text-sm sm:text-lg font-semibold tracking-tight text-zinc-900 leading-tight">
                    {head}
                  </span>
                  {rest.length > 0 && (
                    <span className="block text-sm leading-snug text-zinc-800 whitespace-pre-line">
                      {rest.join("\n")}
                    </span>
                  )}
                </>
              );
            })()}
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-9 sm:h-10 w-full items-center justify-center rounded-full border border-[#0066cc] bg-transparent px-3 sm:px-4 text-[#0066cc] text-xs sm:text-sm font-medium hover:bg-[#0066cc]/5 transition-colors"
          >
            Configura
          </button>
        </div>
      </article>

      <Configurator
        product={product}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
