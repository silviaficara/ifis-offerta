export type MemoryOption = { label: string; priceDelta: number };
export type ColorOption = { label: string; swatch: string };
export type DurationOption = { months: number; factor: number };

export type ProductAddon = {
  id: string;
  label: string;
  description?: string;
};

export type OptionChoice = {
  label: string;
  sublabel?: string;
  /** If set, the choice is only selectable when memory.label is in this list. */
  requiresMemory?: string[];
  /** Keyed by option-group id → list of acceptable selected labels in that group. */
  requires?: Record<string, string[]>;
};

export type OptionGroup = {
  id: string;
  label: string;
  description?: string;
  /** "grid" = 2-column row for short labels; "stack" (default) = full-width cards. */
  layout?: "grid" | "stack";
  /** Force the group to span the whole row even when layout is "stack". */
  wide?: boolean;
  /** Lay out choices in N columns with vertical fill (fills col 1 top-to-bottom, then col 2). */
  splitColumns?: number;
  choices: OptionChoice[];
};

export type ConfigurableProduct = {
  id: string;
  name: string;
  image?: string;
  imageFit?: "contain" | "cover";
  tagline?: string;
  basePrice: number;
  memory?: MemoryOption[];
  colors?: ColorOption[];
  durations: DurationOption[];
  optionGroups?: OptionGroup[];
  addons?: ProductAddon[];
};

export const defaultDurations: DurationOption[] = [
  { months: 24, factor: 1.15 },
  { months: 36, factor: 1 },
  { months: 48, factor: 0.9 },
];

export const appleProducts: ConfigurableProduct[] = [
  {
    id: "iphone-17-pro",
    name: "iPhone 17 Pro",
    image: "/products/iphone-17-pro.png",
    tagline: "Pro al cubo.",
    basePrice: 30,
    memory: [
      { label: "256GB", priceDelta: 0 },
      { label: "512GB", priceDelta: 3 },
      { label: "1TB", priceDelta: 7 },
    ],
    colors: [
      { label: "Cosmic Orange", swatch: "#d96b3a" },
      { label: "Deep Blue", swatch: "#2a4d72" },
      { label: "Silver", swatch: "#d4d6d8" },
    ],
    durations: defaultDurations,
    addons: [
      {
        id: "applecare",
        label: "AppleCare+ per aziende",
        description: "Supporto Apple 24/7 e copertura per danni accidentali.",
      },
      {
        id: "caricabatterie",
        label: "Caricabatteria",
        description: "Caricatore compatibile incluso nella confezione.",
      },
    ],
  },
  {
    id: "ipad-pro-m5",
    name: "iPad Pro M5 + Kit Apple",
    image: "/products/ipad-pro-m5.png",
    tagline: "Pro come un Mac, mobile come un iPad.",
    basePrice: 36,
    memory: [
      { label: "256 GB", priceDelta: 0 },
      { label: "512 GB", priceDelta: 4 },
      { label: "1 TB", priceDelta: 10 },
      { label: "2 TB", priceDelta: 20 },
    ],
    colors: [
      { label: "Space Black", swatch: "#2a2a2c" },
      { label: "Silver", swatch: "#e3e4e6" },
    ],
    durations: defaultDurations,
    optionGroups: [
      {
        id: "screen",
        label: "Dimensioni schermo",
        layout: "grid",
        choices: [{ label: '11"' }, { label: '13"' }],
      },
      {
        id: "connectivity",
        label: "Connettività",
        choices: [
          { label: "Wi-Fi", sublabel: "Solo Wi-Fi" },
          { label: "Wi-Fi + Cellular", sublabel: "Con connessione dati 5G" },
        ],
      },
      {
        id: "glass",
        label: "Vetro del display",
        choices: [
          { label: "Vetro standard", sublabel: "Finitura lucida" },
          {
            label: "Vetro nano-texture",
            sublabel: "Disponibile solo con 1 TB o 2 TB",
            requiresMemory: ["1 TB", "2 TB"],
          },
        ],
      },
    ],
    addons: [
      {
        id: "applecare",
        label: "AppleCare+ per aziende",
        description: "Supporto Apple 24/7 e copertura per danni accidentali.",
      },
      {
        id: "caricabatterie",
        label: "Caricabatteria",
        description: "Caricatore compatibile incluso nella confezione.",
      },
    ],
  },
  {
    id: "imac",
    name: "iMac",
    image: "/products/imac.png",
    tagline: "Tutto in uno, davvero.",
    basePrice: 30,
    colors: [
      { label: "Silver", swatch: "#e3e4e6" },
      { label: "Green", swatch: "#a9c9a3" },
      { label: "Blue", swatch: "#7da7c8" },
      { label: "Pink", swatch: "#f0c5cf" },
      { label: "Orange", swatch: "#ed9d52" },
      { label: "Purple", swatch: "#c9b7e5" },
      { label: "Yellow", swatch: "#f0d268" },
    ],
    durations: defaultDurations,
    optionGroups: [
      {
        id: "chip",
        label: "Chip",
        choices: [
          { label: "M4 (8-core)", sublabel: "2 porte Thunderbolt / USB 4" },
          { label: "M4 (10-core)", sublabel: "4 porte Thunderbolt / USB 4" },
        ],
      },
      {
        id: "glass",
        label: "Vetro del display",
        choices: [
          { label: "Vetro standard", sublabel: "Finitura lucida" },
          {
            label: "Vetro nano-texture",
            sublabel: "Disponibile solo con SSD 1 TB o 2 TB",
            requires: {
              storage: [
                "24 GB · 1 TB SSD",
                "32 GB · 1 TB SSD",
                "32 GB · 2 TB SSD",
              ],
            },
          },
        ],
      },
      {
        id: "storage",
        label: "Archiviazione e memoria",
        description: "Scegli la capacità SSD.",
        wide: true,
        choices: [
          {
            label: "16 GB · 256 GB SSD",
            sublabel: "Non disponibile con la configurazione attuale",
            requires: { chip: ["M4 (8-core)"] },
          },
          {
            label: "16 GB · 512 GB SSD",
            sublabel: "Non disponibile con la configurazione attuale",
            requires: { chip: ["M4 (10-core)"] },
          },
          {
            label: "24 GB · 256 GB SSD",
            sublabel: "Non disponibile con la configurazione attuale",
            requires: { chip: ["M4 (10-core)"] },
          },
          {
            label: "24 GB · 512 GB SSD",
            sublabel: "Non disponibile con la configurazione attuale",
            requires: { chip: ["M4 (8-core)", "M4 (10-core)"] },
          },
          {
            label: "24 GB · 1 TB SSD",
            sublabel: "Non disponibile con la configurazione attuale",
            requires: { chip: ["M4 (8-core)", "M4 (10-core)"] },
          },
          {
            label: "32 GB · 512 GB SSD",
            sublabel: "Non disponibile con la configurazione attuale",
            requires: { chip: ["M4 (10-core)"] },
          },
          {
            label: "32 GB · 1 TB SSD",
            sublabel: "Non disponibile con la configurazione attuale",
            requires: { chip: ["M4 (10-core)"] },
          },
          {
            label: "32 GB · 2 TB SSD",
            sublabel: "Non disponibile con la configurazione attuale",
            requires: { chip: ["M4 (10-core)"] },
          },
        ],
      },
      {
        id: "pointing",
        label: "Dispositivo di puntamento",
        choices: [
          { label: "Magic Mouse" },
          { label: "Magic Trackpad" },
        ],
      },
      {
        id: "keyboard",
        label: "Tastiera",
        choices: [
          { label: "Magic Keyboard" },
          { label: "Magic Keyboard e Touch ID" },
        ],
      },
    ],
    addons: [
      {
        id: "applecare",
        label: "AppleCare+ per aziende",
        description: "Supporto Apple 24/7 e copertura per danni accidentali.",
      },
      {
        id: "caricabatterie",
        label: "Caricabatteria",
        description: "Caricatore compatibile incluso nella confezione.",
      },
    ],
  },
  {
    id: "macbook-neo",
    name: "MacBook Neo",
    image: "/products/macbook-neo-final.jpg",
    imageFit: "cover",
    tagline: "Il nuovo standard.",
    basePrice: 22,
    colors: [
      { label: "Silver", swatch: "#e3e4e6" },
      { label: "Yellow", swatch: "#f0d268" },
      { label: "Blue", swatch: "#4a5582" },
      { label: "Pink", swatch: "#f0c5cf" },
    ],
    durations: defaultDurations,
    optionGroups: [
      {
        id: "storage",
        label: "Archiviazione e memoria",
        description: "8 GB di memoria unificata · scegli la capacità SSD.",
        wide: true,
        choices: [
          { label: "256 GB SSD" },
          { label: "512 GB SSD" },
        ],
      },
    ],
    addons: [
      {
        id: "applecare",
        label: "AppleCare+ per aziende",
        description: "Supporto Apple 24/7 e copertura per danni accidentali.",
      },
      {
        id: "caricabatterie",
        label: "Caricabatteria",
        description: "Caricatore compatibile incluso nella confezione.",
      },
    ],
  },
  {
    id: "macbook-air",
    name: "MacBook Air",
    image: "/products/macbook-air-white.jpg",
    imageFit: "cover",
    tagline: "Leggero e super veloce.",
    basePrice: 23,
    colors: [
      { label: "Silver", swatch: "#e3e4e6" },
      { label: "Starlight", swatch: "#f2e8d5" },
      { label: "Midnight", swatch: "#1f2536" },
      { label: "Sky Blue", swatch: "#aac7e0" },
    ],
    durations: defaultDurations,
    optionGroups: [
      {
        id: "screen",
        label: "Dimensioni schermo",
        layout: "grid",
        choices: [{ label: '13"' }, { label: '15"' }],
      },
      {
        id: "cpu",
        label: "Core CPU e GPU",
        layout: "grid",
        choices: [
          { label: "CPU 10 core · GPU 8 core" },
          { label: "CPU 10 core · GPU 10 core" },
        ],
      },
      {
        id: "storage",
        label: "Archiviazione e memoria",
        choices: [
          { label: "512 GB SSD" },
          {
            label: "1 TB SSD",
            sublabel: "Non disponibile con la configurazione attuale",
            requires: { memory: ["24 GB", "32 GB"] },
          },
          {
            label: "2 TB SSD",
            sublabel: "Non disponibile con la configurazione attuale",
            requires: { memory: ["24 GB", "32 GB"] },
          },
          {
            label: "4 TB SSD",
            sublabel: "Non disponibile con la configurazione attuale",
            requires: { memory: ["32 GB"] },
          },
        ],
      },
      {
        id: "memory",
        label: "Memoria",
        choices: [
          { label: "16 GB" },
          {
            label: "24 GB",
            sublabel: "Non disponibile con la configurazione attuale",
            requires: { cpu: ["CPU 10 core · GPU 10 core"] },
          },
          {
            label: "32 GB",
            sublabel: "Non disponibile con la configurazione attuale",
            requires: { cpu: ["CPU 10 core · GPU 10 core"] },
          },
        ],
      },
    ],
    addons: [
      {
        id: "applecare",
        label: "AppleCare+ per aziende",
        description: "Supporto Apple 24/7 e copertura per danni accidentali.",
      },
      {
        id: "caricabatterie",
        label: "Caricabatteria",
        description: "Caricatore compatibile incluso nella confezione.",
      },
    ],
  },
  {
    id: "macbook-pro-m5",
    name: "MacBook Pro",
    image: "/products/macbook-pro-m5.png",
    tagline: "Potenza professionale.",
    basePrice: 37,
    colors: [
      { label: "Space Black", swatch: "#2a2a2c" },
      { label: "Silver", swatch: "#e3e4e6" },
    ],
    durations: defaultDurations,
    optionGroups: [
      {
        id: "screen",
        label: "Dimensioni schermo",
        layout: "grid",
        choices: [{ label: '14"' }, { label: '16"' }],
      },
      {
        id: "chip",
        label: "Chip",
        wide: true,
        choices: [
          { label: "M5" },
          { label: "M5 Pro" },
          { label: "M5 Max" },
        ],
      },
      {
        id: "memory",
        label: "Memoria",
        wide: true,
        splitColumns: 2,
        choices: [
          { label: "16 GB" },
          { label: "24 GB" },
          { label: "32 GB" },
          {
            label: "36 GB",
            sublabel: "Non disponibile con la configurazione attuale",
            requires: { chip: ["M5 Pro", "M5 Max"] },
          },
          {
            label: "48 GB",
            sublabel: "Non disponibile con la configurazione attuale",
            requires: { chip: ["M5 Pro", "M5 Max"] },
          },
          {
            label: "64 GB",
            sublabel: "Non disponibile con la configurazione attuale",
            requires: { chip: ["M5 Pro", "M5 Max"] },
          },
          {
            label: "128 GB",
            sublabel: "Non disponibile con la configurazione attuale",
            requires: { chip: ["M5 Max"] },
          },
        ],
      },
      {
        id: "storage",
        label: "Archiviazione e memoria",
        choices: [
          { label: "1 TB SSD" },
          { label: "2 TB SSD" },
          { label: "4 TB SSD" },
          {
            label: "8 TB SSD",
            sublabel: "Non disponibile con la configurazione attuale",
            requires: {
              memory: ["32 GB", "36 GB", "48 GB", "64 GB", "128 GB"],
            },
          },
        ],
      },
      {
        id: "glass",
        label: "Vetro del display",
        choices: [
          { label: "Vetro standard", sublabel: "Finitura lucida" },
          {
            label: "Vetro nano-texture",
            sublabel: "Riduce i riflessi, mantiene il contrasto",
          },
        ],
      },
    ],
    addons: [
      {
        id: "applecare",
        label: "AppleCare+ per aziende",
        description: "Supporto Apple 24/7 e copertura per danni accidentali.",
      },
      {
        id: "caricabatterie",
        label: "Caricabatteria",
        description: "Caricatore compatibile incluso nella confezione.",
      },
    ],
  },
];

export const notebookProducts: ConfigurableProduct[] = [
  {
    id: "hp-probook-460-g12",
    name: "HP ProBook 4",
    image: "/products/hp-probook.png",
    tagline: "HP ProBook 4 - G1i Intel Core Ultra 5",
    basePrice: 26,
    colors: [{ label: "Pike Silver", swatch: "#9ea2a6" }],
    durations: defaultDurations,
    optionGroups: [
      {
        id: "screen",
        label: "Dimensioni schermo",
        layout: "grid",
        choices: [{ label: '14"' }, { label: '16"' }],
      },
      {
        id: "storage",
        label: "Memoria e archiviazione",
        wide: true,
        choices: [
          { label: "16 GB DDR5 · 512 GB SSD NVMe" },
          {
            label: "24 GB DDR5 · 1 TB SSD NVMe",
            sublabel: 'Disponibile solo con schermo 16"',
            requires: { screen: ['16"'] },
          },
        ],
      },
    ],
  },
  {
    id: "lenovo-thinkpad-t14-gen6",
    name: "Lenovo ThinkBook",
    image: "/products/lenovo-thinkpad.png",
    tagline: "Lenovo ThinkBook 14 - IRL Gen 8 Core 5",
    basePrice: 27,
    colors: [{ label: "Dual Tone Arctic Grey", swatch: "#b5bcc4" }],
    durations: defaultDurations,
    optionGroups: [
      {
        id: "cpu",
        label: "Processore",
        choices: [
          { label: "Intel Core 5 210H", sublabel: "SSD PCIe 4.0" },
          { label: "Intel Core 7 240H" },
        ],
      },
      {
        id: "display",
        label: "Display",
        choices: [
          { label: '14" standard', sublabel: "Non touch" },
          {
            label: '14" IPS Touchscreen',
            sublabel: "1920×1200 touch — solo con Core 7 240H",
            requires: { cpu: ["Intel Core 7 240H"] },
          },
        ],
      },
    ],
  },
  {
    id: "dell-pro-14-premium",
    name: "Dell Pro",
    image: "/products/dell-pro.png",
    tagline: "DELL Pro 16 PC 16250 Core Ultra 7",
    basePrice: 31,
    colors: [
      { label: "Magnetite", swatch: "#2a2a2c" },
      { label: "Platinum Silver", swatch: "#d4d6d8" },
    ],
    durations: defaultDurations,
    optionGroups: [
      {
        id: "memory",
        label: "Memoria",
        choices: [
          { label: "16 GB DDR5" },
          { label: "32 GB DDR5 5600 MHz" },
        ],
      },
      {
        id: "display",
        label: "Display",
        choices: [
          {
            label: '16" standard',
            requires: { memory: ["16 GB DDR5"] },
          },
          {
            label: '16" Full HD+ touch anti-glare',
            sublabel: "Touch — solo con 16 GB",
            requires: { memory: ["16 GB DDR5"] },
          },
          {
            label: '16" anti-glare',
            sublabel: "Solo con 32 GB",
            requires: { memory: ["32 GB DDR5 5600 MHz"] },
          },
        ],
      },
    ],
  },
];

export const printerProducts: ConfigurableProduct[] = [
  {
    id: "hp-color-laserjet-3302fdn",
    name: "HP Color LaserJet Pro MFP\n3302fdn",
    image: "/products/hp-color-laserjet-3301.png",
    basePrice: 15,
    durations: defaultDurations,
  },
  {
    id: "brother-mfc-l8690cdw",
    name: "Brother\nMFC-L8690CDW",
    image: "/products/brother-mfc-l8690cdw.png",
    basePrice: 15,
    durations: defaultDurations,
  },
  {
    id: "xerox-c415v-dn",
    name: "Xerox\nC415V/DN",
    image: "/products/xerox-c625dn.png",
    basePrice: 31,
    durations: defaultDurations,
  },
];
export const monitorProducts: ConfigurableProduct[] = [];
