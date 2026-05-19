import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ConfigurableProduct } from "@/lib/data/products";
import { ProductCard } from "./ProductCard";

import type { ReactNode } from "react";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: ReactNode;
  products: ConfigurableProduct[];
  tinted?: boolean;
};

export function ProductSection({
  id,
  eyebrow,
  title,
  subtitle,
  products,
  tinted = false,
}: Props) {
  const bgClass = tinted ? "bg-[#fafafa]" : "";
  const cardBg = tinted ? "bg-white" : "bg-[#fafafa]";
  return (
    <section id={id} className={`${bgClass} scroll-mt-24`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="grid gap-3 sm:gap-6 grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} cardBg={cardBg} />
          ))}
        </div>
      </div>
    </section>
  );
}
