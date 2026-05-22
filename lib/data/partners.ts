export type Partner = {
  name: string;
  image?: string;
  slug?: string;
  scale?: number;
};

export const partners: Partner[] = [
  {
    name: "Apple Business Partner",
    image: "/partners/apple-business-partner.webp",
  },
  {
    name: "Apple Consultants Network",
    image: "/partners/acn.png",
    scale: 1,
  },
  { name: "HP", image: "/partners/hp.png", slug: "hp" },
  { name: "DELL", image: "/partners/dell.png", slug: "dell" },
  { name: "Lenovo", image: "/partners/lenovo.png", slug: "lenovo", scale: 0.7 },
  { name: "Microsoft", image: "/partners/microsoft.webp", slug: "microsoft" },
  { name: "Google", image: "/partners/google.png", slug: "google" },
  { name: "Samsung", image: "/partners/samsung.jpg", slug: "samsung" },
  { name: "Sony", image: "/partners/sony.jpg" },
  { name: "Xerox", image: "/partners/xerox.png" },
];
