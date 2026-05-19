import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/data/services";
import { AddServiceButton } from "./AddServiceButton";

export function ServicesSection() {
  return (
    <section id="servizi" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <SectionHeading
          eyebrow="Servizi"
          title="Tutto incluso, niente sorprese."
          subtitle="Aggiungi servizi gestiti al tuo noleggio."
        />

        <div className="grid gap-3 sm:gap-6 grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.id}
              className="group flex flex-col rounded-2xl sm:rounded-3xl bg-[#fafafa] ring-1 ring-[#0066cc]/30 shadow-[0_8px_14px_#0000001a] overflow-hidden"
            >
              <div className="relative aspect-[5/3] bg-[#fafafa]">
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 50vw"
                  className="object-contain p-3 sm:p-6 drop-shadow-[0_4px_8px_#0000001a] sm:drop-shadow-[0_8px_14px_#0000001a]"
                />
              </div>
              <div className="flex flex-col px-3 sm:px-5 py-3 sm:py-4 gap-2.5 sm:gap-4">
                <div className="min-w-0">
                  <h4 className="block text-sm sm:text-lg font-semibold tracking-tight text-zinc-900 leading-tight">
                    {s.name}
                  </h4>
                  <p className="mt-2 text-sm leading-snug text-zinc-800">
                    {s.description}
                  </p>
                </div>
                <AddServiceButton service={s} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
