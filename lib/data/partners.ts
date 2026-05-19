export type Partner = {
  name: string;
  image?: string;
  slug?: string;
  scale?: number;
};

export const partners: Partner[] = [
  {
    name: "Apple Business Partner",
    image: "/partners/apple.png",
    scale: 3,
  },
  { name: "HP", image: "/partners/hp.png", slug: "hp" },
  { name: "DELL", image: "/partners/dell.png", slug: "dell" },
  { name: "Lenovo", image: "/partners/lenovo.png", slug: "lenovo" },
  { name: "Microsoft", image: "/partners/microsoft.webp", slug: "microsoft" },
  { name: "Google", image: "/partners/google.png", slug: "google", scale: 1.3 },
  { name: "Samsung", image: "/partners/samsung.jpg", slug: "samsung" },
  { name: "Xerox", image: "/partners/xerox.png" },
];
