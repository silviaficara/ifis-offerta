import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Documenti noleggio consultabili — Kronos × Banca Ifis",
  description:
    "Documentazione del noleggio operativo Ifis Rental Services: contratto, polizza, recesso, informativa privacy.",
};

const docs = [
  {
    title: "Informazione precontrattuale per il consumatore",
    description:
      "Documento informativo precontrattuale sui termini e condizioni del noleggio.",
    href: "https://contract.kronos.tech/documenti/documento-20290_InformazioniPrecontrattuali_RN_Consumatori_W01-1703088106142.pdf",
  },
  {
    title: "Schema di Contratto di Locazione Consumatori",
    description: "Testo integrale del contratto di noleggio.",
    href: "https://contract.kronos.tech/documenti/documento-20289_Contratto_RN_Consumatori_W01-1703087609700.pdf",
  },
  {
    title: "Estratto polizza",
    description:
      "Estratto della polizza assicurativa Generali per furto e danni.",
    href: "https://contract.kronos.tech/documenti/20296_Allegato2_EstrattoPolizzaGenerali_RN_W01.pdf",
  },
  {
    title: "Modulo recesso ex art. 52 Codice del Consumo",
    description:
      "Modulo per esercitare il diritto di recesso entro 14 giorni dalla consegna.",
    href: "https://contract.kronos.tech/documenti/Esercizio-Recesso.pdf",
  },
  {
    title: "Informativa privacy",
    description:
      "Informativa sul trattamento dei dati personali di Ifis Rental Services.",
    href: "https://contract.kronos.tech/documenti/Ifis-Rental-Services_Informativa-Privacy_Clientela-consensi-1.pdf",
  },
];

export default function DocumentiConsultabili() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
          <Link
            href="/checkout"
            className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-8"
          >
            <span aria-hidden>←</span> Torna al checkout
          </Link>

          <header className="mb-10">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#1a1d56] mb-3">
              Documentazione
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight">
              Documenti noleggio consultabili
            </h1>
            <p className="mt-4 text-base text-zinc-600">
              Tutta la documentazione relativa al prodotto di noleggio offerto
              da Ifis Rental Services.
            </p>
          </header>

          <ul className="divide-y divide-zinc-200">
            {docs.map((d) => (
              <li key={d.href}>
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 py-5 hover:bg-[#fafafa] transition-colors px-4 -mx-4 rounded-lg"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span
                      aria-hidden
                      className="mt-0.5 shrink-0 text-zinc-400 group-hover:text-[#1a1d56] text-xl"
                    >
                      📄
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 group-hover:text-[#1a1d56] transition-colors">
                        {d.title}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {d.description}
                      </p>
                    </div>
                  </div>
                  <span
                    aria-hidden
                    className="shrink-0 text-zinc-300 group-hover:text-[#1a1d56] transition-colors"
                  >
                    PDF →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
