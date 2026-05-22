import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Grazie — Kronos × Banca Ifis",
  description: "Abbiamo ricevuto la tua richiesta di preventivo.",
};

export default function GraziePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12 sm:py-20 lg:py-24 text-center">
          <div className="mx-auto mb-6 sm:mb-8 inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#1a1d56]/10 text-[#1a1d56]">
            <svg
              aria-hidden
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:w-7 sm:h-7"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#1a1d56] mb-3">
            Richiesta ricevuta
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight">
            Grazie, ci sentiamo presto.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
            Abbiamo ricevuto la tua richiesta di preventivo. Un nostro
            consulente ti contatterà entro 24 ore lavorative
            all&apos;indirizzo email e al numero di telefono che hai indicato.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-[#1a1d56] px-8 text-base font-medium text-white hover:bg-[#12143d] transition-colors"
            >
              Torna alla home
            </Link>
            <a
              href="mailto:info@kronos.tech"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full border border-[#1a1d56] px-8 text-base font-medium text-[#1a1d56] hover:bg-[#1a1d56]/5 transition-colors"
            >
              Scrivici un&apos;email
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
