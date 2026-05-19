export type PackageTier = "silver" | "gold" | "platinum";

export type PackageItem = {
  id: string;
  tier: PackageTier;
  title: string;
  image: string;
  monthly: number | null;
  months: number;
};

export type PackageRow = {
  id: string;
  title: string;
  tagline: string;
  items: PackageItem[];
};

export const packageRows: PackageRow[] = [
  {
    id: "mobilita",
    title: "Postazione\nMobilità",
    tagline: "Per il banker in movimento",
    items: [
      {
        id: "mob-silver",
        tier: "silver",
        title: "iPad + Apple Pencil +\niPhone 17e",
        image: "/packages/mob-silver.png",
        monthly: 27.5,
        months: 36,
      },
      {
        id: "mob-gold",
        tier: "gold",
        title: "HP ProBook 4 G1i +\nSamsung Galaxy A37",
        image: "/packages/mob-gold-v2.png",
        monthly: 41,
        months: 36,
      },
      {
        id: "mob-platinum",
        tier: "platinum",
        title: "MacBook Pro 14 M5 + iPhone 17 +\nAirPods 4",
        image: "/packages/mob-platinum.png",
        monthly: 66.5,
        months: 36,
      },
    ],
  },
  {
    id: "ufficio",
    title: "Postazione\nUfficio",
    tagline: "Per la sede operativa",
    items: [
      {
        id: "uff-silver",
        tier: "silver",
        title: "Lenovo ThinkBook 14 Gen8 +\nSamsung Galaxy A26",
        image: "/packages/uff-silver.png",
        monthly: 35,
        months: 36,
      },
      {
        id: "uff-gold",
        tier: "gold",
        title: "iMac +\niPhone 17",
        image: "/packages/uff-gold.png",
        monthly: 52.6,
        months: 36,
      },
      {
        id: "uff-platinum",
        tier: "platinum",
        title: "Mac mini M4 + DELL 27\" 2K +\nApple Kit + iPhone 17",
        image: "/packages/uff-platinum.png",
        monthly: 66,
        months: 36,
      },
    ],
  },
  {
    id: "executive",
    title: "Postazione\nExecutive",
    tagline: "Per il top performer",
    items: [
      {
        id: "exe-silver",
        tier: "silver",
        title: "MacBook Pro 14 M5 + iPhone Air +\nAirPods Pro 3",
        image: "/packages/exe-silver.png",
        monthly: 70.8,
        months: 36,
      },
      {
        id: "exe-gold",
        tier: "gold",
        title: "DELL Pro 16 + Samsung S26 Ultra +\nDELL 27\" 4K + Kit DELL",
        image: "/packages/exe-gold-v2.png",
        monthly: 96,
        months: 36,
      },
      {
        id: "exe-platinum",
        tier: "platinum",
        title:
          "MacBook Pro 16 M5 Pro +\nStudio Display + AirPods Pro 3 +\nApple Kit + iPhone 17 Pro",
        image: "/packages/exe-platinum.png",
        monthly: 143.6,
        months: 36,
      },
    ],
  },
];
