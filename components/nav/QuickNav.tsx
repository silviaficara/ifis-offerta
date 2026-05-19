import Image from "next/image";

type Category = {
  href: string;
  label: string;
  from?: number;
  custom?: boolean;
  image: string;
};

const categories: Category[] = [
  { href: "#apple", label: "Apple", from: 23, image: "/categories/apple.png" },
  {
    href: "#notebook",
    label: "Notebook",
    from: 26,
    image: "/categories/notebook.png",
  },
  {
    href: "#stampanti",
    label: "Stampanti",
    from: 15,
    image: "/categories/stampanti.png",
  },
  {
    href: "#servizi",
    label: "Servizi",
    custom: true,
    image: "/categories/servizi.png",
  },
];

export function QuickNav() {
  return (
    <section aria-label="Categorie" className="bg-[#fafafa]">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <header className="mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#0066cc] mb-3">
            Configura per categoria
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-900">
            Cosa vuoi noleggiare?
          </h2>
        </header>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <a
            key={cat.href}
            href={cat.href}
            className="group flex flex-col rounded-3xl bg-white ring-1 ring-[#0066cc]/30 hover:ring-2 hover:ring-[#0066cc] shadow-[0_8px_14px_#0000001a] transition-all overflow-hidden"
          >
            <div className="relative aspect-[5/3] bg-zinc-50">
              <Image
                src={cat.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 18rem, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-start justify-between gap-2 px-3 sm:px-5 py-3 sm:py-4">
              <div className="min-w-0 flex-1">
                <span className="block text-sm sm:text-lg font-semibold tracking-tight text-zinc-900 leading-tight">
                  {cat.label}
                </span>
                {cat.custom ? (
                  <span className="block mt-1 text-sm sm:text-base font-semibold text-[#0066cc] leading-none">
                    Su misura
                  </span>
                ) : (
                  <>
                    <span className="block mt-1 text-sm sm:text-base font-semibold text-[#0066cc] leading-none">
                      da {cat.from} €/mese
                    </span>
                    <span className="block mt-1 text-[10px] font-normal text-zinc-500 leading-none">
                      + IVA
                    </span>
                  </>
                )}
              </div>
              <span
                aria-hidden
                className="shrink-0 mt-0.5 text-[#0066cc] transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </div>
          </a>
        ))}
        </div>
      </div>
    </section>
  );
}
