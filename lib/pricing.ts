// Gestione IVA per il display dei prezzi.
// I prezzi nei dati (monthly, quickNavFromPrice) sono sempre NETTI (IVA esclusa).
// Per i partner "privati" (clienti consumer) i prezzi vanno mostrati IVA INCLUSA:
// l'env NEXT_PUBLIC_PRICE_VAT_INCLUDED="true" (impostata da adminportal) attiva
// questo comportamento, applicato SOLO a display (il dato resta netto).

export const VAT_RATE = 0.22;

/** True se questa landing deve mostrare i prezzi IVA inclusa (partner privati). */
export const PRICES_VAT_INCLUDED =
  process.env.NEXT_PUBLIC_PRICE_VAT_INCLUDED === "true";

/** Converte un prezzo netto nel prezzo da MOSTRARE: lordo se IVA inclusa, altrimenti invariato. */
export function displayPrice(net: number): number {
  return PRICES_VAT_INCLUDED ? net * (1 + VAT_RATE) : net;
}

/** Etichetta IVA accanto al prezzo: "IVA inclusa" per i privati, "+ IVA" per il business. */
export const vatLabel = PRICES_VAT_INCLUDED ? "IVA inclusa" : "+ IVA";
