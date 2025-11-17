"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./../context/AuthContext";

export type Category = "Apparel" | "Supplements" | "Accessories";

export type Product = {
  id: string;
  name: string;
  price: number; // in USD
  image: string;
  category: Category;
  rating?: number;
  reviews?: number;
};

export type CartItem = {
  product: Product;
  qty: number;
};

type CartState = {
  items: CartItem[];
};

type CartContextValue = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartCtx = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ items: [] });
  const { user } = useAuth();

  // Load cart: if logged in -> from server, else from localStorage guest key
  useEffect(() => {
    const load = async () => {
      if (user) {
        try {
          const res = await fetch("/api/cart", { method: "GET" });
          const data = await res.json();
          setState({ items: Array.isArray(data.items) ? data.items : [] });
        } catch {
          setState({ items: [] });
        }
      } else {
        // logged out: no cart
        setState({ items: [] });
      }
    };
    load();
  }, [user]);

  // Persist: logged in -> server PUT, guest -> localStorage guest key
  useEffect(() => {
    const persist = async () => {
      if (user) {
        try {
          await fetch("/api/cart", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(state) });
        } catch {}
      } else {
        // do not persist when logged out
      }
    };
    persist();
  }, [state, user]);

  const api: CartContextValue = useMemo(() => {
    const add = (p: Product, qty = 1) => {
      setState((prev) => {
        const items = [...prev.items];
        const i = items.findIndex((it) => it.product.id === p.id);
        if (i >= 0) items[i] = { ...items[i], qty: items[i].qty + qty };
        else items.push({ product: p, qty });
        return { items };
      });
    };
    const remove = (id: string) => setState((prev) => ({ items: prev.items.filter((i) => i.product.id !== id) }));
    const inc = (id: string) => setState((prev) => ({ items: prev.items.map((i) => (i.product.id === id ? { ...i, qty: i.qty + 1 } : i)) }));
    const dec = (id: string) =>
      setState((prev) => ({
        items: prev.items
          .map((i) => (i.product.id === id ? { ...i, qty: Math.max(0, i.qty - 1) } : i))
          .filter((i) => i.qty > 0),
      }));
    const clear = () => setState({ items: [] });

    const count = state.items.reduce((n, i) => n + i.qty, 0);
    const subtotal = Number(state.items.reduce((s, i) => s + i.qty * i.product.price, 0).toFixed(2));

    return { items: state.items, add, remove, inc, dec, clear, count, subtotal };
  }, [state]);

  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
