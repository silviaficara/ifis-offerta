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
];

/** Nome dell'array in products.ts per una category slug. */
export function arrayNameForCategory(slug: string): string {
  return `${slug}Products`;
}

/** Ritorna le categorie ordinate per `order` crescente. */
export function sortedCategories(): Category[] {
  return [...categories].sort((a, b) => a.order - b.order);
}
