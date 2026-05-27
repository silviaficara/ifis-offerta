"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart/CartContext";
import type { CartItem } from "@/lib/cart/types";
import { formatEuro } from "@/lib/format";

type FormState = {
  nome: string;
  cognome: string;
  partitaIva: string;
  email: string;
  telefono: string;
  cap: string;
  note: string;
  priority: boolean;
  privacy: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  nome: "",
  cognome: "",
  partitaIva: "",
  email: "",
  telefono: "",
  cap: "",
  note: "",
  priority: false,
  privacy: false,
};

const PRIVACY_INFORMATIVA_URL =
  "https://www.privacylab.it/informativa.php?10364343930";

const PARTITA_IVA_RE = /^(IT\d{11}|\d{11})$/;
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
const PHONE_RE = /^[+]?[\d\s\-()]{6,15}$/;
const CAP_RE = /^\d{5}$/;

function formatPartitaIva(input: string): string {
  const cleaned = input.replace(/[^A-Za-z0-9]/g, "");
  if (cleaned.length === 0) return "";
  const first = cleaned[0].toUpperCase();
  if (first === "I") {
    if (cleaned.length === 1) return "I";
    const second = cleaned[1].toUpperCase();
    if (second === "T") {
      const digits = cleaned.slice(2).replace(/\D/g, "").slice(0, 11);
      return "IT" + digits;
    }
    return cleaned.replace(/\D/g, "").slice(0, 11);
  }
  return cleaned.replace(/\D/g, "").slice(0, 11);
}

function formatPhone(input: string): string {
  return input.replace(/[^\d+\s\-()]/g, "").slice(0, 15);
}

function formatCap(input: string): string {
  return input.replace(/\D/g, "").slice(0, 5);
}

function validateField(key: keyof FormState, state: FormState): string | null {
  const value = state[key];
  switch (key) {
    case "nome":
      return (value as string).trim() ? null : "Inserisci il tuo nome";
    case "cognome":
      return (value as string).trim() ? null : "Inserisci il tuo cognome";
    case "partitaIva":
      if (!value) return "Inserisci la partita IVA";
      return PARTITA_IVA_RE.test(value as string)
        ? null
        : "P.IVA non valida: 11 cifre oppure IT seguito da 11 cifre";
    case "email":
      if (!value) return "Inserisci l'email";
      return EMAIL_RE.test(value as string)
        ? null
        : "Email non valida: deve contenere @ e un dominio (es. nome@email.it)";
    case "telefono":
      if (!value) return "Inserisci il numero di telefono";
      return PHONE_RE.test(value as string)
        ? null
        : "Telefono non valido: da 6 a 15 caratteri (cifre, eventuale + iniziale)";
    case "cap":
      if (!value) return "Inserisci il CAP";
      return CAP_RE.test(value as string)
        ? null
        : "CAP non valido: devono essere esattamente 5 cifre";
    case "privacy":
      return value === true
        ? null
        : "Devi accettare l'informativa sulla privacy per inviare la richiesta";
    default:
      return null;
  }
}

const REQUIRED_FIELDS: Array<keyof FormState> = [
  "nome",
  "cognome",
  "partitaIva",
  "email",
  "telefono",
  "cap",
  "privacy",
];

function isFormValid(state: FormState): boolean {
  return REQUIRED_FIELDS.every((key) => validateField(key, state) === null);
}

/** Costruisce la descrizione testuale del carrello per il lead. */
function buildCartItemsAndConfig(items: CartItem[]): {
  items: Array<{ k2rProduct: string; k2rVersion: string; quantity: number; productId: string }>;
  configurazione: string;
} {
  const apiItems = items.map((it) => {
    const parts = [
      it.config?.memory,
      it.config?.color,
      ...Object.values(it.config?.optionGroups ?? {}),
      ...(it.config?.addons ?? []),
      it.months > 0 ? `${it.months} mesi` : null,
    ].filter(Boolean) as string[];
    return {
      productId: it.productId,
      // Sostituisco \n con " — " per leggibilita' del testo nel CRM (alcuni
      // titoli pacchetto sono multi-riga, es. "Postazione\nMobilità").
      k2rProduct: it.name.replace(/\n/g, " — "),
      k2rVersion: parts.join(" · "),
      quantity: it.quantity,
    };
  });

  if (items.length === 0) {
    return { items: [], configurazione: "" };
  }

  const lines: string[] = [];
  items.forEach((it, idx) => {
    lines.push(`${idx + 1}. ${it.name.replace(/\n/g, " — ")} × ${it.quantity}`);
    const detail = [
      it.config?.memory,
      it.config?.color,
      ...Object.values(it.config?.optionGroups ?? {}),
      ...(it.config?.addons ?? []),
      it.months > 0 ? `${it.months} mesi` : null,
    ]
      .filter(Boolean)
      .join(" · ");
    if (detail) lines.push(`   ${detail}`);
    if (it.monthly > 0) {
      const totalLine =
        it.quantity > 1
          ? ` (totale ${formatEuro(it.monthly * it.quantity)} €/mese)`
          : "";
      lines.push(`   ${formatEuro(it.monthly)} €/mese${totalLine}`);
    } else {
      lines.push(`   Prezzo su richiesta`);
    }
  });
  return { items: apiItems, configurazione: lines.join("\n") };
}

export function ContactForm() {
  const router = useRouter();
  const { items, totalMonthly, clear } = useCart();
  const [state, setState] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const clearError = (key: keyof FormState) => {
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  };

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((s) => ({ ...s, [key]: value }));
    clearError(key);
  };

  const validateOne = (key: keyof FormState) => {
    const err = validateField(key, state);
    setErrors((e) => {
      const next = { ...e };
      if (err) next[key] = err;
      else delete next[key];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    const newErrors: FormErrors = {};
    REQUIRED_FIELDS.forEach((key) => {
      const err = validateField(key, state);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const { items: apiItems, configurazione } = buildCartItemsAndConfig(items);

    // Aggiungo riepilogo totale alla configurazione se ci sono prezzi non "su richiesta"
    const configWithTotal =
      totalMonthly > 0
        ? `${configurazione}\n\nTotale canone mensile: ${formatEuro(totalMonthly)} €/mese + IVA`
        : configurazione;

    const payload = {
      partnerToken: process.env.NEXT_PUBLIC_PARTNER_TOKEN ?? "",
      company: "", // Ifis non chiede l'azienda
      firstName: state.nome.trim(),
      lastName: state.cognome.trim(),
      piva: state.partitaIva.trim(),
      email: state.email.trim(),
      phone: state.telefono.trim(),
      cap: state.cap.trim(),
      // Qualifying fields non applicabili a Ifis/Credifarma: mandiamo stringhe
      // vuote/false in modo che il gestore non li mostri (skip dei vuoti).
      partitaIva: "",
      bilancioDepositato: false,
      giaCliente: false,
      noleggioUsato: false,
      consensoMarketing: false,
      items: apiItems,
      note: state.note.trim() + (state.priority ? "\n[Richiesta gestione prioritaria]" : ""),
      configurazione: configWithTotal,
    };

    setSubmitting(true);
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await r.json().catch(() => null);
      if (!r.ok || !json?.ok) {
        setSubmitError(
          `Errore nell'invio (${r.status}): ${
            json?.error ?? "riprova tra qualche istante"
          }`
        );
        setSubmitting(false);
        return;
      }
      clear(); // svuota il carrello dopo invio riuscito
      // Navigazione alla pagina di conferma dedicata (design completo con CTA).
      router.push("/checkout/grazie");
    } catch (err) {
      setSubmitError(
        "Connessione non disponibile. Verifica la rete e riprova."
      );
      console.warn("[lead] submit error", err);
      setSubmitting(false);
    }
  };

  const valid = isFormValid(state);

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white ring-1 ring-zinc-100 p-6 sm:p-8 space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Nome"
          value={state.nome}
          onChange={(v) => set("nome", v)}
          onBlur={() => validateOne("nome")}
          error={errors.nome}
          required
        />
        <Input
          label="Cognome"
          value={state.cognome}
          onChange={(v) => set("cognome", v)}
          onBlur={() => validateOne("cognome")}
          error={errors.cognome}
          required
        />
      </div>
      <Input
        label="Partita IVA"
        value={state.partitaIva}
        onChange={(v) => set("partitaIva", formatPartitaIva(v))}
        onBlur={() => validateOne("partitaIva")}
        error={errors.partitaIva}
        maxLength={13}
        placeholder="12345678901 o IT12345678901"
        required
      />
      <Input
        label="Email"
        type="email"
        value={state.email}
        onChange={(v) => set("email", v)}
        onBlur={() => validateOne("email")}
        error={errors.email}
        placeholder="nome@email.it"
        required
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Telefono"
          type="tel"
          value={state.telefono}
          onChange={(v) => set("telefono", formatPhone(v))}
          onBlur={() => validateOne("telefono")}
          error={errors.telefono}
          maxLength={15}
          inputMode="tel"
          placeholder="+39 333 1234567"
          required
        />
        <Input
          label="CAP"
          value={state.cap}
          onChange={(v) => set("cap", formatCap(v))}
          onBlur={() => validateOne("cap")}
          error={errors.cap}
          maxLength={5}
          inputMode="numeric"
          placeholder="20121"
          required
        />
      </div>

      <label className="block">
        <span className="block text-xs font-medium text-zinc-500 mb-1.5">
          Note aggiuntive
        </span>
        <textarea
          value={state.note}
          onChange={(e) => set("note", e.target.value)}
          rows={3}
          placeholder="Es. richieste particolari, tempistiche, dotazioni accessorie…"
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:border-[#1a1d56] focus:ring-[#1a1d56]/20 transition-all"
        />
      </label>

      <div className="space-y-3 pt-2">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={state.priority}
            onChange={(e) => set("priority", e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-[#1a1d56] focus:ring-[#1a1d56]"
          />
          <span className="text-sm text-zinc-600 leading-snug">
            Necessiti di tempi di gestione brevi? Seleziona questa opzione per
            dare priorità alla richiesta.
          </span>
        </label>

        <div>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={state.privacy}
              onChange={(e) => set("privacy", e.target.checked)}
              aria-invalid={errors.privacy ? "true" : undefined}
              className="mt-1 h-4 w-4 rounded border-zinc-300 text-[#1a1d56] focus:ring-[#1a1d56]"
            />
            <span className="text-sm text-zinc-600 leading-snug">
              Acconsento all&apos;
              <a
                href={PRIVACY_INFORMATIVA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a1d56] hover:underline"
              >
                informativa sulla privacy
              </a>
              . *
            </span>
          </label>
          {errors.privacy ? (
            <p className="mt-1.5 ml-7 text-xs text-red-600">{errors.privacy}</p>
          ) : null}
        </div>
      </div>

      <p className="text-xs text-zinc-500 leading-relaxed">
        Non hai trovato il prodotto che cercavi? Scrivici cosa ti serve: ti
        aiutiamo noi!
      </p>

      {submitError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {submitError}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className={`inline-flex h-12 w-full items-center justify-center rounded-full border text-base font-medium transition-colors ${
          submitting
            ? "border-zinc-300 bg-zinc-100 text-zinc-500 cursor-not-allowed"
            : valid
            ? "bg-[#1a1d56] border-[#1a1d56] text-white hover:bg-[#12143d] hover:border-[#12143d]"
            : "bg-transparent border-[#1a1d56] text-[#1a1d56] hover:bg-[#1a1d56]/5"
        }`}
      >
        {submitting ? "Invio in corso…" : "Invia"}
      </button>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  required,
  maxLength,
  inputMode,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  required?: boolean;
  maxLength?: number;
  inputMode?: "text" | "tel" | "email" | "numeric" | "decimal" | "url" | "search";
  placeholder?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-zinc-500 mb-1.5">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        maxLength={maxLength}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={error ? "true" : undefined}
        className={`w-full rounded-xl border bg-white px-4 h-11 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 transition-all ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
            : "border-zinc-200 focus:border-[#1a1d56] focus:ring-[#1a1d56]/20"
        }`}
      />
      {error ? (
        <span className="mt-1.5 block text-xs text-red-600">{error}</span>
      ) : null}
    </label>
  );
}
