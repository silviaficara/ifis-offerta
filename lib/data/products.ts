export type MemoryOption = { label: string; priceDelta: number };
export type ColorOption = { label: string; swatch: string };
export type DurationOption = { months: number; factor: number };

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
  },
  {
    id: "ipad-pro-m5",
    name: "iPad Pro M5 + Kit Apple",
    image: "/products/ipad-pro-m5.png",
    tagline: "Pro come un Mac, mobile come un iPad.",
    basePrice: 36,
    memory: [
      { label: "256GB", priceDelta: 0 },
      { label: "512GB", priceDelta: 4 },
      { label: "1TB", priceDelta: 10 },
    ],
    colors: [
      { label: "Silver", swatch: "#e3e4e6" },
      { label: "Space Black", swatch: "#2a2a2c" },
    ],
    durations: defaultDurations,
  },
  {
    id: "imac",
    name: "iMac",
    image: "/products/imac.png",
    tagline: "Tutto in uno, davvero.",
    basePrice: 30,
    memory: [
      { label: "256GB", priceDelta: 0 },
      { label: "512GB", priceDelta: 4 },
      { label: "1TB", priceDelta: 9 },
    ],
    colors: [
      { label: "Silver", swatch: "#e3e4e6" },
      { label: "Blue", swatch: "#7da7c8" },
      { label: "Pink", swatch: "#f0c5cf" },
      { label: "Yellow", swatch: "#f0d268" },
      { label: "Orange", swatch: "#ed9d52" },
      { label: "Purple", swatch: "#c9b7e5" },
      { label: "Green", swatch: "#a9c9a3" },
    ],
    durations: defaultDurations,
  },
  {
    id: "macbook-neo",
    name: "MacBook Neo",
    image: "/products/macbook-neo-final.jpg",
    imageFit: "cover",
    tagline: "Il nuovo standard.",
    basePrice: 22,
    memory: [
      { label: "256GB", priceDelta: 0 },
      { label: "512GB", priceDelta: 3 },
    ],
    colors: [
      { label: "Citrus", swatch: "#f0d268" },
      { label: "Blush", swatch: "#f0c5cf" },
      { label: "Indigo", swatch: "#4a5582" },
      { label: "Silver", swatch: "#e3e4e6" },
    ],
    durations: defaultDurations,
  },
  {
    id: "macbook-air",
    name: "MacBook Air",
    image: "/products/macbook-air-white.jpg",
    imageFit: "cover",
    tagline: "Leggerezza che vola.",
    basePrice: 23,
    memory: [
      { label: "256GB", priceDelta: 0 },
      { label: "512GB", priceDelta: 4 },
      { label: "1TB", priceDelta: 9 },
    ],
    colors: [
      { label: "Midnight", swatch: "#1f2536" },
      { label: "Starlight", swatch: "#f2e8d5" },
      { label: "Silver", swatch: "#e3e4e6" },
      { label: "Sky Blue", swatch: "#aac7e0" },
    ],
    durations: defaultDurations,
  },
  {
    id: "macbook-pro-m5",
    name: "MacBook Pro M5",
    image: "/products/macbook-pro-m5.png",
    tagline: "Potenza professionale.",
    basePrice: 37,
    memory: [
      { label: "512GB", priceDelta: 0 },
      { label: "1TB", priceDelta: 5 },
      { label: "2TB", priceDelta: 12 },
    ],
    colors: [
      { label: "Silver", swatch: "#e3e4e6" },
      { label: "Space Black", swatch: "#2a2a2c" },
    ],
    durations: defaultDurations,
  },
];

export const notebookProducts: ConfigurableProduct[] = [
  {
    id: "hp-probook-460-g12",
    name: "HP ProBook",
    image: "/products/hp-probook.png",
    tagline: "Intel Core Ultra 7, 16GB RAM, 16\" FHD.",
    basePrice: 26,
    memory: [
      { label: "256GB SSD", priceDelta: 0 },
      { label: "512GB SSD", priceDelta: 3 },
      { label: "1TB SSD", priceDelta: 8 },
      { label: "2TB SSD", priceDelta: 16 },
    ],
    colors: [{ label: "Pike Silver", swatch: "#9ea2a6" }],
    durations: defaultDurations,
  },
  {
    id: "lenovo-thinkpad-t14-gen6",
    name: "Lenovo ThinkPad",
    image: "/products/lenovo-thinkpad.png",
    tagline: "Intel Core Ultra 7, 16GB RAM, 14\" WUXGA.",
    basePrice: 27,
    memory: [
      { label: "256GB SSD", priceDelta: 0 },
      { label: "512GB SSD", priceDelta: 3 },
      { label: "1TB SSD", priceDelta: 8 },
      { label: "2TB SSD", priceDelta: 16 },
    ],
    colors: [{ label: "Thunder Black", swatch: "#1d1d1f" }],
    durations: defaultDurations,
  },
  {
    id: "dell-pro-14-premium",
    name: "Dell Pro",
    image: "/products/dell-pro.png",
    tagline: "Intel Core Ultra 7, 16GB RAM, 14\" QHD+.",
    basePrice: 31,
    memory: [
      { label: "512GB SSD", priceDelta: 0 },
      { label: "1TB SSD", priceDelta: 5 },
      { label: "2TB SSD", priceDelta: 13 },
    ],
    colors: [
      { label: "Aluminum", swatch: "#c0c0c0" },
      { label: "Carbon Black", swatch: "#1d1d1f" },
    ],
    durations: defaultDurations,
  },
];

export const printerProducts: ConfigurableProduct[] = [
  {
    id: "hp-color-laserjet-3302fdn",
    name: "HP Color LaserJet Pro MFP\n3302fdn",
    image: "/products/hp-color-laserjet-3301.png",
    tagline: "Laser a colori A4, fronte/retro, rete, fino a 25 ppm.",
    basePrice: 15,
    durations: defaultDurations,
  },
  {
    id: "brother-mfc-l8690cdw",
    name: "Brother\nMFC-L8690CDW",
    image: "/products/brother-mfc-l8690cdw.png",
    tagline: "Laser a colori A4, Wi-Fi, fronte/retro, fino a 31 ppm.",
    basePrice: 15,
    durations: defaultDurations,
  },
  {
    id: "xerox-c415v-dn",
    name: "Xerox\nC415V/DN",
    image: "/products/xerox-c625dn.png",
    tagline: "Multifunzione laser a colori A4, fronte/retro, rete, fino a 38 ppm.",
    basePrice: 31,
    durations: defaultDurations,
  },
];
