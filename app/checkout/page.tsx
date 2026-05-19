import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { CheckoutCartRecap } from "@/components/checkout/CheckoutCartRecap";
import { AvvertenzeDocumenti } from "@/components/checkout/AvvertenzeDocumenti";

export const metadata: Metadata = {
  title: "Richiedi preventivo — Kronos × Zurich Bank",
  description:
    "Invia la tua richiesta di preventivo con i pacchetti e i prodotti che hai configurato.",
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-8"
          >
            <span aria-hidden>←</span> Torna alla landing
          </Link>

          <header className="mb-12">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#0066cc] mb-3">
              Richiesta preventivo
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight">
              Parliamo del tuo progetto.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-600">
              Compila il form qui sotto — ti ricontatteremo entro 24 ore
              lavorative con il preventivo definitivo.
            </p>
          </header>

          <CheckoutCartRecap />

          <ContactForm />

          <AvvertenzeDocumenti />
        </div>
      </main>
      <Footer />
    </>
  );
}
