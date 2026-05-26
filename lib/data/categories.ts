// Configurazione delle categorie prodotto.
// Gestite via UI /categories: CRUD + riordino.
// Ogni categoria mappa su un array `<slug>Products` in lib/data/products.ts.

export type Category = {
  /** Identificatore tecnico, usato come prefisso del nome array (es. "apple" → appleProducts) */
  slug: string;
  /** Etichetta mostrata in dashboard adminportal */
  label: string;
  /** Ordine di apparizione in dashboard e landing (numero crescente) */
  order: number;
  /** Descrizione breve opzionale (mostrata in /categories) */
  description?: string;

  // ─── Campi marketing per la landing partner ──────────────────────────────
  /** Eyebrow: piccola etichetta sopra al titolo (es. "Apple"). Default: label */
  eyebrow?: string;
  /** Titolo sezione sulla landing (es. "Il meglio di Apple, in noleggio."). Default: label */
  title?: string;
  /** Sottotitolo (es. "Configura memoria, colore e durata."). Default: vuoto */
  subtitle?: string;

  /**
   * Lista di slug partner su cui la categoria NON deve apparire.
   * Default vuoto = visibile su tutti i partner.
   * Esempio: ["credifarma"] → categoria visibile solo su Ifis (e adminportal).
   */
  hiddenFor?: string[];
};

export const categories: Category[] = [
  {
    slug: "apple",
    label: "Apple",
    order: 0,
    description: "Prodotti Apple (MacBook, iPad, iPhone, ecc.)",
    eyebrow: "Apple",
    title: "Il meglio di Apple, in noleggio.",
    subtitle: "Configura memoria, colore e durata.",
  },
  {
    slug: "notebook",
    label: "Notebook business",
    order: 1,
    description: "Notebook Windows e business laptop",
    eyebrow: "Notebook",
    title: "Notebook business.",
    subtitle: "HP, Lenovo, DELL per il lavoro quotidiano.",
  },
  {
    slug: "printer",
    label: "Stampanti",
    order: 2,
    description: "Stampanti multifunzione e periferiche",
    eyebrow: "Stampanti",
    title: "Stampanti multifunzione.",
    subtitle: "Laser a colori, wireless. Per studi e uffici.",
  },
  {
    slug: "monitor",
    label: "Monitor x Aziende",
    order: 3,
    eyebrow: "Monitor Professionali",
    title: "La nostra selezione di monitor",
    subtitle: "il monitor migliore di sempre",
    hiddenFor: [
      "ifis",
    ],
  },
];

/** Nome dell'array in products.ts per una category slug. */
export function arrayNameForCategory(slug: string): string {
  return `${slug}Products`;
}

/** Ritorna le categorie ordinate per `order` crescente. */
export function sortedCategories(): Category[] {
  return [...categories].sort((a, b) => a.order - b.order);
}

/**
 * Ritorna le categorie visibili per un partner specifico, ordinate.
 * Esclude quelle con `hiddenFor` contenente lo slug del partner.
 * Su adminportal lo slug è `undefined` → mostra tutto (override admin).
 */
export function categoriesForPartner(partnerSlug?: string): Category[] {
  const all = sortedCategories();
  if (!partnerSlug) return all;
  return all.filter((c) => !c.hiddenFor?.includes(partnerSlug));
}

/**
 * Estrae lo slug dal token partner (formato `<slug>_<hex>`).
 * Usato sulle landing per sapere quali categorie mostrare in base alla
 * env var NEXT_PUBLIC_PARTNER_TOKEN.
 */
export function slugFromPartnerToken(token: string | undefined): string | undefined {
  if (!token) return undefined;
  const idx = token.indexOf("_");
  if (idx <= 0) return undefined;
  return token.slice(0, idx);
}
