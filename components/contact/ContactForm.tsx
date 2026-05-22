"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart/CartContext";

type FormState = {
  nome: string;
  cognome: string;
  partitaIva: string;
  email: string;
  telefono: string;
  cap: string;
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

export function ContactForm() {
  const router = useRouter();
  const { clear } = useCart();
  const [state, setState] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    REQUIRED_FIELDS.forEach((key) => {
      const err = validateField(key, state);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    console.log("[bozza] form contatti:", state);
    clear();
    router.push("/checkout/grazie");
  };

  const valid = isFormValid(state);

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-2xl sm:rounded-3xl bg-white ring-1 ring-zinc-100 p-5 sm:p-7 lg:p-8 space-y-4"
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

      <button
        type="submit"
        className={`inline-flex h-12 w-full items-center justify-center rounded-full border text-base font-medium transition-colors ${
          valid
            ? "bg-[#1a1d56] border-[#1a1d56] text-white hover:bg-[#12143d] hover:border-[#12143d]"
            : "bg-transparent border-[#1a1d56] text-[#1a1d56] hover:bg-[#1a1d56]/5"
        }`}
      >
        Invia
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
