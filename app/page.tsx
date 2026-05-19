import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { QuickNav } from "@/components/nav/QuickNav";
import { PackagesSection } from "@/components/packages/PackagesSection";
import { ProductSection } from "@/components/products/ProductSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { PartnersGrid } from "@/components/partners/PartnersGrid";
import {
  appleProducts,
  notebookProducts,
  printerProducts,
} from "@/lib/data/products";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <QuickNav />
        <PackagesSection />

        <ProductSection
          id="apple"
          eyebrow="Apple"
          title="Il meglio di Apple, in noleggio."
          subtitle="Configura memoria, colore e durata."
          products={appleProducts}
          tinted
        />

        <ProductSection
          id="notebook"
          eyebrow="Notebook"
          title="Notebook business."
          subtitle="HP, Lenovo, DELL per il lavoro quotidiano."
          products={notebookProducts}
        />

        <ProductSection
          id="stampanti"
          eyebrow="Stampanti"
          title="Stampanti multifunzione."
          subtitle="Laser a colori, wireless. Per studi e uffici."
          products={printerProducts}
          tinted
        />

        <ServicesSection />
        <PartnersGrid />
      </main>
      <Footer />
    </>
  );
}
