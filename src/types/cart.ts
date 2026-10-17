import type { Product } from "./product";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextValue {
  cart: CartItem[];
  addTocart: (product: Product, quantity: number) => void;
  removeFromCart: (id: string) => void;
}
