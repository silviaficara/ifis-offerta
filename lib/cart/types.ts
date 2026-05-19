export type CartItemConfig = {
  memory?: string;
  color?: string;
  /** Selected label per option group, keyed by group id. */
  optionGroups?: Record<string, string>;
  addons?: string[];
};

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  monthly: number;
  months: number;
  config?: CartItemConfig;
  source: "package" | "product" | "service";
  quantity: number;
};
