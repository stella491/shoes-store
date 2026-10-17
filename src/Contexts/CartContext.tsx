import { createContext, useContext, useState, type ReactNode } from "react";
import { toast } from "react-toastify";
import type { CartContextValue, CartItem } from "../types/cart";
import type { Product } from "../types/product";

// eslint-disable-next-line react-refresh/only-export-components
export const cartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addTocart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);

      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });

    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  return (
    <cartContext.Provider value={{ cart, addTocart, removeFromCart }}>
      {children}
    </cartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(cartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
