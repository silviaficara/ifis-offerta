"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { deriveAuthToken, timingSafeCompare } from "@/lib/auth/token";

type State = { error: string | null };

const COOKIE_NAME = "site-auth";
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 5 * 60 * 1000;
const FAIL_DELAY_MS = 600;

const attempts = new Map<string, { count: number; resetAt: number }>();

async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

function rateLimitCheck(ip: string): {
  allowed: boolean;
  retryAfterMinutes?: number;
} {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt < now) return { allowed: true };
  if (entry.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterMinutes: Math.max(1, Math.ceil((entry.resetAt - now) / 60000)),
    };
  }
  return { allowed: true };
}

function registerFailure(ip: string): void {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    entry.count += 1;
  }
}

function clearFailures(ip: string): void {
  attempts.delete(ip);
}

export async function login(_prev: State, formData: FormData): Promise<State> {
  const password = formData.get("password");

  if (typeof password !== "string" || password.length === 0) {
    return { error: "Inserisci la password" };
  }

  const ip = await getClientIp();
  const rl = rateLimitCheck(ip);
  if (!rl.allowed) {
    return {
      error: `Troppi tentativi. Riprova tra ${rl.retryAfterMinutes} ${rl.retryAfterMinutes === 1 ? "minuto" : "minuti"}.`,
    };
  }

  const expected = process.env.SITE_PASSWORD ?? "";
  const match = expected.length > 0 && timingSafeCompare(password, expected);

  if (!match) {
    registerFailure(ip);
    await new Promise((r) => setTimeout(r, FAIL_DELAY_MS));
    return { error: "Password errata" };
  }

  clearFailures(ip);

  const token = await deriveAuthToken(expected);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 30,
    path: "/",
  });

  redirect("/");
}
