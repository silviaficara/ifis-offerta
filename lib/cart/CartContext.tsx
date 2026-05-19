"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "./types";

type AddItemInput = Omit<CartItem, "id" | "quantity">;

type CartContextValue = {
  items: CartItem[];
  count: number;
  totalMonthly: number;
  addItem: (item: AddItemInput) => void;
  removeItem: (id: string) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  clear: () => void;
  notification: string | null;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function sameConfig(
  a: CartItem["config"] | undefined,
  b: CartItem["config"] | undefined,
): boolean {
  return (a?.memory ?? "") === (b?.memory ?? "") &&
    (a?.color ?? "") === (b?.color ?? "");
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addItem = useCallback((item: AddItemInput) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.productId === item.productId &&
          i.months === item.months &&
          sameConfig(i.config, item.config),
      );
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      return [...prev, { ...item, id, quantity: 1 }];
    });
    setNotification("Aggiunto al preventivo");
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setNotification(null), 2500);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const incrementItem = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    );
  }, []);

  const decrementItem = useCallback((id: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      if (item.quantity <= 1) {
        return prev.filter((i) => i.id !== id);
      }
      return prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
      );
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  useEffect(() => {
    if (items.length === 0) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [items.length]);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      totalMonthly: items.reduce(
        (sum, i) => sum + Math.ceil(i.monthly * i.quantity),
        0,
      ),
      addItem,
      removeItem,
      incrementItem,
      decrementItem,
      clear,
      notification,
      isOpen,
      open,
      close,
      toggle,
    }),
    [
      items,
      addItem,
      removeItem,
      incrementItem,
      decrementItem,
      clear,
      notification,
      isOpen,
      open,
      close,
      toggle,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
