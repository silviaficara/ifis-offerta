export type CartItemConfig = {
  memory?: string;
  color?: string;
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
