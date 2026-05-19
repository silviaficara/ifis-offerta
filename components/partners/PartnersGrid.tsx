import { SectionHeading } from "@/components/ui/SectionHeading";
import { partners } from "@/lib/data/partners";
import { PartnerLogo } from "./PartnerLogo";

export function PartnersGrid() {
  return (
    <section className="bg-[#fafafa]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-32">
        <SectionHeading
          eyebrow="Partner"
          title="Alcuni dei partner con cui lavoriamo."
          subtitle="Selezioniamo i migliori alleati per garantirti soluzioni affidabili end-to-end."
          align="center"
        />

        <div className="mx-auto mt-4 grid max-w-5xl grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((p) => (
            <div
              key={p.name}
              className="group flex aspect-[5/3] items-center justify-center overflow-hidden rounded-2xl bg-white px-3 sm:px-4 text-center"
            >
              <PartnerLogo partner={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
