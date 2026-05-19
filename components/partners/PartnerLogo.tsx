"use client";

import { useState } from "react";
import type { Partner } from "@/lib/data/partners";

export function PartnerLogo({ partner }: { partner: Partner }) {
  const [imageError, setImageError] = useState(false);
  const [slugError, setSlugError] = useState(false);

  const baseClass =
    "h-10 sm:h-20 w-auto max-w-[100px] sm:max-w-[200px] object-contain grayscale opacity-60 mix-blend-multiply group-hover:grayscale-0 group-hover:opacity-100 transition duration-200";

  const scaleStyle = partner.scale
    ? { transform: `scale(${partner.scale})` }
    : undefined;

  if (partner.image && !imageError) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={partner.image}
        alt={partner.name}
        loading="lazy"
        onError={() => setImageError(true)}
        className={baseClass}
        style={scaleStyle}
      />
    );
  }

  if (partner.slug && !slugError) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={`https://cdn.simpleicons.org/${partner.slug}`}
        alt={partner.name}
        loading="lazy"
        onError={() => setSlugError(true)}
        className={baseClass}
      />
    );
  }

  return (
    <span className="text-base font-medium text-zinc-500">{partner.name}</span>
  );
}
