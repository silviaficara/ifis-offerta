const advantages: ReadonlyArray<readonly [string, string]> = [
  ["Noleggio beni Apple", " alle condizioni migliori del mercato"],
  ["Ampia gamma di soluzioni IT", " e servizi complementari firmati Kronos Tech"],
  ["Consulenza dedicata", " per scelta, configurazione e gestione dei dispositivi"],
  ["Consegna garantita", " presso la sede legale o operativa del banker"],
  ["Copertura totale", ": detrazione 100% del canone e assicurazione all risk"],
  ["Flessibilità a fine contratto", ": rinnovo, aggiornamento o restituzione dei dispositivi"],
  ["Durate flessibili", ": richiedi opzioni da 24, 36, 48 mesi"],
  ["Offerta riservata", " ai possessori di partita IVA"],
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-24 sm:pb-28"
    >
      <div className="flex items-center justify-center gap-3 sm:gap-5 mb-14 sm:mb-16">
        <span aria-hidden className="h-px w-6 sm:w-16 bg-[#0066cc]/30 shrink-0" />
        <p className="whitespace-nowrap text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[#0066cc]">
          Ifis Rental Services · Kronos Tech
        </p>
        <span aria-hidden className="h-px w-6 sm:w-16 bg-[#0066cc]/30 shrink-0" />
      </div>

      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight max-w-5xl mx-auto text-center text-balance">
        Offerta <span className="whitespace-nowrap">dedicata ai</span>
        <br className="hidden lg:inline" />
        {" "}consulenti finanziari <span className="text-[#2167AE]">Zurich Bank</span>
        <br className="hidden lg:inline" />
        {" "}con noleggio Ifis Rental Services
      </h1>

      <ul className="mt-14 sm:mt-16 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
        {advantages.map(([bold, rest]) => (
          <li
            key={bold}
            className="flex items-start gap-2 text-sm text-zinc-600 leading-snug"
          >
            <span
              aria-hidden
              className="mt-[3px] shrink-0 text-[#0066cc] text-xs font-bold"
            >
              ✓
            </span>
            <span>
              <strong className="font-medium text-zinc-900">{bold}</strong>
              {rest}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="#pacchetti"
          className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-[#0066cc] px-7 text-base font-medium text-white hover:bg-[#0058b3] transition-colors"
        >
          Configura la tua postazione
        </a>
        <a
          href="#apple"
          className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full border border-[#0066cc] bg-transparent px-7 text-base font-medium text-[#0066cc] hover:bg-[#0066cc]/5 transition-colors"
        >
          Vai ai prodotti
        </a>
      </div>
    </section>
  );
}
