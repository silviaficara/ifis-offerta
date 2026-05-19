"use client";

import { useActionState } from "react";
import { login } from "./actions";

const initialState = { error: null as string | null };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-sm">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1a1d56] mb-3">
          Accesso riservato
        </p>
        <h1 className="text-center text-2xl font-semibold tracking-tight text-zinc-900 mb-8">
          Offerta Banca Ifis
          <br />× Kronos Tech
        </h1>
        <form action={formAction} className="space-y-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            autoFocus
            autoComplete="current-password"
            className="block w-full h-12 px-5 rounded-full border border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-[#1a1d56] focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={pending}
            className="block w-full h-12 rounded-full bg-[#1a1d56] text-white text-base font-medium hover:bg-[#12143d] transition-colors disabled:opacity-60"
          >
            {pending ? "Verifica…" : "Entra"}
          </button>
          {state.error ? (
            <p className="text-center text-sm text-red-600 pt-1">
              {state.error}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
