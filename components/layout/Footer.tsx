import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-start md:justify-between md:gap-8 md:text-left">
          <div className="shrink-0">
            <Image
              src="/kronos-logo.png"
              alt="Kronos Tech"
              width={1600}
              height={222}
              className="h-6 sm:h-7 w-auto"
            />
          </div>

          <div className="space-y-1 text-xs sm:text-sm text-zinc-900">
            <p>Via Toti, 2 — MM1 Conciliazione — Milano</p>
            <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 md:justify-start">
              <a
                href="tel:+390239003176"
                className="hover:underline transition-all"
              >
                tel: +39 02 39003176
              </a>
              <span aria-hidden>—</span>
              <a
                href="mailto:info@kronos.tech"
                className="hover:underline transition-all"
              >
                info@kronos.tech
              </a>
            </p>
            <p>P.IVA: 12586250156</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-zinc-900 sm:text-sm md:flex-col md:items-start md:gap-x-0 md:gap-y-2">
            <a
              href="https://www.privacylab.it/informativa.php?10364343930"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-all"
            >
              Privacy Policy
            </a>
            <span aria-hidden className="md:hidden">—</span>
            <a
              href="https://www.privacylab.it/informativa.php?10364463292"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-all"
            >
              Cookie Policy
            </a>
            <span aria-hidden className="md:hidden">—</span>
            <button
              type="button"
              className="elmo-show hover:underline transition-all cursor-pointer"
            >
              Modifica preferenze Cookie
            </button>
          </div>

          <div className="hidden md:block shrink-0">
            <Image
              src="/partners/apple-business-partner.webp"
              alt="Apple Business Partner"
              width={300}
              height={120}
              className="h-14 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
