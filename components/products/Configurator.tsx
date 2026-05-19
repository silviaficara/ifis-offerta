"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { useCart } from "@/lib/cart/CartContext";
import type {
  ConfigurableProduct,
  OptionChoice,
} from "@/lib/data/products";

type Props = {
  product: ConfigurableProduct;
  open: boolean;
  onClose: () => void;
};

function isChoiceAvailable(
  choice: OptionChoice,
  memory: string | undefined,
  optionGroupSel: Record<string, string>,
) {
  if (choice.requiresMemory && !choice.requiresMemory.includes(memory ?? "")) {
    return false;
  }
  if (choice.requires) {
    for (const [groupId, allowed] of Object.entries(choice.requires)) {
      if (!allowed.includes(optionGroupSel[groupId] ?? "")) return false;
    }
  }
  return true;
}

export function Configurator({ product, open, onClose }: Props) {
  const { addItem } = useCart();

  const defaultMemory = product.memory?.[0]?.label;
  const defaultColor = product.colors?.[0]?.label;
  const defaultMonths =
    product.durations.find((d) => d.months === 36)?.months ??
    product.durations[0].months;
  // Resolve defaults iteratively so later groups can depend on earlier groups.
  const defaultOptionGroups: Record<string, string> = {};
  for (const g of product.optionGroups ?? []) {
    const first = g.choices.find((c) =>
      isChoiceAvailable(c, defaultMemory, defaultOptionGroups),
    );
    defaultOptionGroups[g.id] = first?.label ?? g.choices[0]?.label ?? "";
  }

  const [memory, setMemory] = useState<string | undefined>(defaultMemory);
  const [color, setColor] = useState<string | undefined>(defaultColor);
  const [months, setMonths] = useState<number>(defaultMonths);
  const [optionGroupSel, setOptionGroupSel] =
    useState<Record<string, string>>(defaultOptionGroups);
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [bump, setBump] = useState(false);

  // When inputs change, fall back any selection whose constraints are no
  // longer satisfied. Re-runs until stable so chained dependencies converge.
  useEffect(() => {
    if (!product.optionGroups) return;
    setOptionGroupSel((prev) => {
      let next = { ...prev };
      let changed = false;
      for (let pass = 0; pass < 8; pass++) {
        let passChanged = false;
        for (const g of product.optionGroups ?? []) {
          const current = g.choices.find((c) => c.label === next[g.id]);
          if (current && !isChoiceAvailable(current, memory, next)) {
            const fallback = g.choices.find((c) =>
              isChoiceAvailable(c, memory, next),
            );
            if (fallback && fallback.label !== next[g.id]) {
              next[g.id] = fallback.label;
              passChanged = true;
              changed = true;
            }
          }
        }
        if (!passChanged) break;
      }
      return changed ? next : prev;
    });
  }, [memory, optionGroupSel, product.optionGroups]);

  const toggleAddon = (id: string) =>
    setAddonIds((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );

  const handleAdd = () => {
    const addonLabels = (product.addons ?? [])
      .filter((a) => addonIds.includes(a.id))
      .map((a) => a.label);
    addItem({
      productId: product.id,
      name: product.name,
      monthly: 0,
      months,
      source: "product",
      config: {
        memory,
        color,
        optionGroups:
          Object.keys(optionGroupSel).length > 0 ? optionGroupSel : undefined,
        addons: addonLabels.length > 0 ? addonLabels : undefined,
      },
    });
    setBump(true);
    setTimeout(() => {
      setBump(false);
      onClose();
    }, 600);
  };

  return (
    <Dialog open={open} onClose={onClose} title={`Configura ${product.name}`}>
      <div className="space-y-6">
        {product.memory ? (
          <Field label="Memoria">
            <div className="flex flex-wrap gap-2">
              {product.memory.map((m) => {
                const active = m.label === memory;
                return (
                  <button
                    key={m.label}
                    type="button"
                    onClick={() => setMemory(m.label)}
                    className={`flex-1 min-w-[5.5rem] rounded-xl border px-4 py-3 text-sm transition-all ${
                      active
                        ? "border-[#1a1d56] bg-[#1a1d56]/5 text-zinc-900"
                        : "border-zinc-200 text-zinc-700 hover:border-zinc-400"
                    }`}
                  >
                    <span className="block font-medium">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </Field>
        ) : null}

        {product.colors ? (
          <Field label="Colore">
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => {
                const active = c.label === color;
                return (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => setColor(c.label)}
                    aria-label={c.label}
                    className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all ${
                      active
                        ? "border-[#1a1d56] bg-[#1a1d56]/5"
                        : "border-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="h-5 w-5 shrink-0 rounded-full ring-1 ring-zinc-200"
                      style={{ background: c.swatch }}
                    />
                    <span className="text-zinc-700 leading-tight">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </Field>
        ) : null}

        {product.optionGroups && product.optionGroups.length > 0 ? (
          <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
            {product.optionGroups.map((group) => {
              const current = optionGroupSel[group.id];
              // "grid" → full row + choices side by side (short options).
              // "wide" or splitColumns → full row + choices stacked or split.
              // default → half row, paired with the next stack group on sm+.
              const fullWidth =
                group.layout === "grid" || !!group.wide || !!group.splitColumns;
              const choicesAsGrid = group.layout === "grid";
              const splitCols = group.splitColumns;
              const splitRows = splitCols
                ? Math.ceil(group.choices.length / splitCols)
                : 0;
              return (
                <div
                  key={group.id}
                  className={fullWidth ? "sm:col-span-2" : ""}
                >
                  <p className="text-sm font-semibold text-zinc-900">
                    {group.label}
                  </p>
                  {group.description ? (
                    <p className="text-xs text-zinc-500 mt-0.5 mb-3">
                      {group.description}
                    </p>
                  ) : (
                    <div className="mb-3" />
                  )}
                  <div
                    className={
                      splitCols
                        ? "flex flex-col gap-2 sm:grid sm:grid-flow-col"
                        : choicesAsGrid
                          ? "grid grid-cols-2 gap-2"
                          : "flex flex-col gap-2"
                    }
                    style={
                      splitCols
                        ? {
                            gridTemplateColumns: `repeat(${splitCols}, minmax(0, 1fr))`,
                            gridTemplateRows: `repeat(${splitRows}, auto)`,
                          }
                        : undefined
                    }
                  >
                    {group.choices.map((choice) => {
                      const available = isChoiceAvailable(
                        choice,
                        memory,
                        optionGroupSel,
                      );
                      const active = choice.label === current && available;
                      return (
                        <button
                          key={choice.label}
                          type="button"
                          disabled={!available}
                          onClick={() =>
                            setOptionGroupSel((prev) => ({
                              ...prev,
                              [group.id]: choice.label,
                            }))
                          }
                          className={`text-left rounded-xl border px-4 py-3 transition-all ${
                            !available
                              ? "border-zinc-200 bg-zinc-50 text-zinc-400 cursor-not-allowed"
                              : active
                                ? "border-[#1a1d56] bg-[#1a1d56]/5 text-zinc-900"
                                : "border-zinc-200 text-zinc-700 hover:border-zinc-400"
                          }`}
                        >
                          <span className="block text-sm font-medium">
                            {choice.label}
                          </span>
                          {choice.sublabel ? (
                            <span
                              className={`block text-xs mt-0.5 ${
                                !available ? "text-zinc-400" : "text-zinc-500"
                              }`}
                            >
                              {choice.sublabel}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        {product.addons && product.addons.length > 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-4 sm:p-5">
            <p className="text-sm font-semibold text-zinc-900">
              Aggiungi al canone
            </p>
            <p className="text-xs text-zinc-500 mt-0.5 mb-4">
              Opzionali. Clicca per includere ciò che ti serve.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {product.addons.map((addon) => {
                const active = addonIds.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    aria-pressed={active}
                    className={`group text-left rounded-xl border bg-white p-4 transition-all ${
                      active
                        ? "border-[#1a1d56] ring-1 ring-[#1a1d56]/30"
                        : "border-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[11px] font-bold transition-all ${
                          active
                            ? "border-[#1a1d56] bg-[#1a1d56] text-white"
                            : "border-zinc-300 bg-white text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-zinc-900 leading-snug">
                          {addon.label}
                        </span>
                        {addon.description ? (
                          <span className="block text-xs text-zinc-500 mt-1 leading-snug">
                            {addon.description}
                          </span>
                        ) : null}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <Field label="Durata">
          <div className="grid grid-cols-3 gap-2">
            {product.durations.map((d) => {
              const active = d.months === months;
              return (
                <button
                  key={d.months}
                  type="button"
                  onClick={() => setMonths(d.months)}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                    active
                      ? "border-[#1a1d56] bg-[#1a1d56]/5 text-zinc-900"
                      : "border-zinc-200 text-zinc-700 hover:border-zinc-400"
                  }`}
                >
                  {d.months} mesi
                </button>
              );
            })}
          </div>
        </Field>

        <div className="flex justify-end pt-4 border-t border-zinc-100">
          <button
            type="button"
            onClick={handleAdd}
            disabled={bump}
            className={`inline-flex h-11 w-full items-center justify-center rounded-full px-5 text-sm font-medium transition-colors sm:w-auto ${
              bump
                ? "bg-[#FB8F22] text-white animate-[cart-bump_0.6s_ease-out]"
                : "bg-[#1a1d56] text-white hover:bg-[#12143d]"
            }`}
          >
            {bump ? "Aggiunto!" : "Aggiungi al preventivo"}
          </button>
        </div>
      </div>
    </Dialog>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-zinc-900 mb-3">{label}</p>
      {children}
    </div>
  );
}
