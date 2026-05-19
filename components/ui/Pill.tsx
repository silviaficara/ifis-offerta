import type { ReactNode } from "react";

type Props = {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
};

export function Pill({ href, icon, children }: Props) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-zinc-100 hover:bg-zinc-200 px-5 h-11 text-sm font-medium text-zinc-900 transition-colors"
    >
      {icon ? (
        <span aria-hidden className="text-base leading-none">
          {icon}
        </span>
      ) : null}
      {children}
    </a>
  );
}
