import { SectionHeading } from "@/components/ui/SectionHeading";
import { packageRows } from "@/lib/data/packages";
import { PackageCard } from "./PackageCard";

const tierHeaders = [
  { label: "Silver", weight: "font-normal", featured: false, underline: false },
  { label: "Gold", weight: "font-semibold", featured: true, underline: false },
  { label: "Premium", weight: "font-bold", featured: false, underline: true },
];

export function PackagesSection() {
  return (
    <section
      id="pacchetti"
      className="mx-auto max-w-6xl px-6 py-20 sm:py-24 scroll-mt-24"
    >
      <SectionHeading
        eyebrow="Pacchetti pronti all'uso"
        title="Per ogni postazione di lavoro."
        subtitle={
          <>
            Già preconfigurati e pronti all&apos;uso.
            <br />
            Tre livelli: Silver, Gold, Premium.
          </>
        }
      />

      <div className="hidden md:grid grid-cols-[240px_1fr_1fr_1fr] mb-3">
        <div />
        {tierHeaders.map((t) => (
          <div
            key={t.label}
            className="px-5 py-3 flex flex-col items-center gap-1.5"
          >
            <span
              className={`text-[9px] font-semibold uppercase tracking-[0.12em] rounded-full px-2 py-0.5 ${
                t.featured
                  ? "bg-[#1a1d56] text-white"
                  : "invisible"
              }`}
              aria-hidden={!t.featured}
            >
              {t.featured ? "Più scelto" : "placeholder"}
            </span>
            <p
              className={`text-xs uppercase tracking-[0.18em] text-zinc-900 ${t.weight}`}
            >
              <span
                className={
                  t.underline
                    ? "border-b-2 border-[#1a1d56] pb-1"
                    : undefined
                }
              >
                {t.label}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {packageRows.map((row) => (
          <div
            key={row.id}
            className="overflow-hidden rounded-3xl bg-[#fafafa] ring-1 ring-[#1a1d56]/30"
          >
            <div className="md:grid md:grid-cols-[240px_1fr_1fr_1fr]">
              <div className="px-3 pt-4 pb-2 md:p-6 md:flex md:flex-col md:items-start md:justify-center">
                <h3 className="text-base font-semibold tracking-tight text-zinc-900 whitespace-normal md:text-lg md:whitespace-pre-line">
                  {row.title}
                </h3>
                <div className="mt-1 md:mt-3 flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-px w-6 bg-[#1a1d56]"
                  />
                  <p className="text-[11px] md:text-xs italic text-zinc-600 leading-snug">
                    {row.tagline}
                  </p>
                </div>
              </div>
              <div className="md:contents flex flex-col gap-2 px-3 pb-4">
                {row.items.map((item) => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200 md:bg-transparent md:ring-0 md:rounded-none md:overflow-visible"
                  >
                    <PackageCard item={item} rowTitle={row.title} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
