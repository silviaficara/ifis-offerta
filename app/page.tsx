import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { QuickNav } from "@/components/nav/QuickNav";
import { PackagesSection } from "@/components/packages/PackagesSection";
import { ProductSection } from "@/components/products/ProductSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { PartnersGrid } from "@/components/partners/PartnersGrid";
import * as productsModule from "@/lib/data/products";
import type { ConfigurableProduct } from "@/lib/data/products";
import { sortedCategories } from "@/lib/data/categories";

// Prezzo "a partire da" per categoria — visualizzato come hint sopra la lista.
// Mappa slug → prezzo; categorie senza prezzo definito non lo mostrano.
const FROM_PRICE_BY_SLUG: Record<string, number> = {
  apple: 22,
  notebook: 26,
  printer: 15,
};

export default function Home() {
  const cats = sortedCategories();
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <QuickNav />
        <PackagesSection />

        {cats.map((c, i) => {
          const arr = (productsModule as Record<string, unknown>)[`${c.slug}Products`];
          const products = Array.isArray(arr) ? (arr as ConfigurableProduct[]) : [];
          if (products.length === 0) return null;
          return (
            <ProductSection
              key={c.slug}
              id={c.slug}
              eyebrow={c.eyebrow ?? c.label}
              title={c.title ?? c.label}
              subtitle={c.subtitle ?? ""}
              products={products}
              tinted={i % 2 === 0}
              fromPrice={FROM_PRICE_BY_SLUG[c.slug]}
            />
          );
        })}

        <ServicesSection />
        <PartnersGrid />
      </main>
      <Footer />
    </>
  );
}
