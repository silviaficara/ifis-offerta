import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  id?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
  align = "left",
}: Props) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <header id={id} className={`scroll-mt-24 mb-12 ${alignment}`}>
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
    </header>
  );
}
