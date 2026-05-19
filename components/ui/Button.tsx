import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

const variants: Record<Variant, string> = {
  primary: "bg-[#1a1d56] text-white hover:bg-[#12143d]",
  secondary: "bg-zinc-900 text-white hover:bg-zinc-700",
  ghost: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
  outline:
    "bg-transparent text-zinc-900 border border-zinc-300 hover:border-zinc-900",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
