"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-prefs-v1";
const OPEN_EVENT = "open-cookie-prefs";

type Choice = "all" | "essential";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const open = () => setVisible(true);
    window.addEventListener(OPEN_EVENT, open);
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        queueMicrotask(open);
      }
    } catch {}
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const save = (choice: Choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Preferenze cookie"
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-2xl flex flex-col gap-4">
        <div>
          <p className="text-base sm:text-lg font-semibold tracking-tight text-zinc-900">
            Preferenze cookie
          </p>
          <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
            Usiamo cookie tecnici necessari al funzionamento del sito e, previo
            consenso, cookie di analisi e di terze parti. Puoi accettare tutti
            i cookie, rifiutare i non essenziali, oppure consultare la nostra{" "}
            <a
              href="https://www.privacylab.it/informativa.php?10364477874"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-zinc-900"
            >
              Cookie Policy
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => save("essential")}
            className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            Rifiuta non essenziali
          </button>
          <button
            type="button"
            onClick={() => save("all")}
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#0066cc] px-5 text-sm font-medium text-white hover:bg-[#0058b3] transition-colors"
          >
            Accetta tutti
          </button>
        </div>
      </div>
    </div>
  );
}

export function openCookiePrefs() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_EVENT));
  }
}
