"use client";

import { useSyncExternalStore } from "react";

type WithAvailability = { availability?: string; availableFrom?: string };

/** Nota «Disponibile dal…» da mostrare oggi: nessuna se `availableFrom` (AAAA-MM-GG) è già passata. */
export function availabilityNote(p: WithAvailability, now: Date = new Date()): string | undefined {
  if (!p.availability) return undefined;
  if (p.availableFrom && now >= new Date(`${p.availableFrom}T00:00:00`)) return undefined;
  return p.availability;
}

const noSubscription = () => () => {};

/**
 * Le pagine sono statiche: in idratazione si usa la nota com'era al build
 * (stessa del server, niente errori), poi il browser la ricalcola con la data
 * di oggi e la toglie se è già passata.
 */
export function useAvailabilityNote(p: WithAvailability): string | undefined {
  return useSyncExternalStore(
    noSubscription,
    () => availabilityNote(p),
    () => p.availability,
  );
}
