import type { ReactNode } from "react";
import { formatEuro } from "@/lib/format";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  id?: string;
  align?: "left" | "center";
  fromPrice?: number;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
  align = "left",
  fromPrice,
}: Props) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const titleBlock = (
    <div className={alignment}>
      {eyebrow ? (
        <p className="text-xs sm:text-sm font-semibold text-[#1a1d56] mb-3 uppercase tracking-[0.12em]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-900">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-3 sm:mt-4 text-sm sm:text-lg text-zinc-600 max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );

  if (fromPrice == null) {
    return (
      <header id={id} className="scroll-mt-24 mb-12">
        {titleBlock}
      </header>
    );
  }

  return (
    <header
      id={id}
      className="scroll-mt-24 mb-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
    >
      {titleBlock}
      <PriceBadge amount={fromPrice} />
    </header>
  );
}

function PriceBadge({ amount }: { amount: number }) {
  return (
    <div className="self-start sm:self-auto inline-flex shrink-0 items-center gap-3 rounded-2xl bg-white ring-1 ring-zinc-200 shadow-[0_4px_12px_#0000000d] px-4 py-3">
      <span
        aria-hidden
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a1d56]/5 text-[#1a1d56]"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      </span>
      <div className="leading-tight">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          A partire da
        </p>
        <p className="text-xl font-semibold text-[#1a1d56]">
          {formatEuro(amount)} €
          <span className="ml-1 text-xs font-normal text-zinc-500">
            /mese + IVA
          </span>
        </p>
      </div>
    </div>
  );
}
