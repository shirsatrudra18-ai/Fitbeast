"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

const TAX_RATE = 0.1;

export default function CartPage() {
  const { items, inc, dec, remove, subtotal } = useCart();
  const tax = Number((subtotal * TAX_RATE).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));
  const { user } = useAuth();
  const router = useRouter();
  const gotoCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) router.push("/login");
    else router.push("/checkout");
  };

  return (
    <main className="min-h-screen pb-16">
      <section className="pt-14 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold">Shopping Cart</h1>
        <p className="mt-2 text-gray-300">{items.length} item{items.length !== 1 ? "s" : ""} in your cart</p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
              <p className="text-gray-300">Your cart is empty.</p>
              <div className="mt-4">
                <Link href="/shop" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">Continue Shopping</Link>
              </div>
            </div>
          )}

          {items.map(({ product: p, qty }) => (
            <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
                <Image src={p.image} alt={p.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-extrabold">{p.name}</h3>
                <p className="text-sm text-gray-400">{p.category}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-blue-500">₹{(p.price * qty).toLocaleString("en-IN")}</div>
                <div className="text-xs text-gray-400">₹{p.price.toLocaleString("en-IN")} each</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => dec(p.id)} className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/20 hover:bg-white/10">−</button>
                <div className="min-w-8 text-center">{qty}</div>
                <button onClick={() => inc(p.id)} className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/20 hover:bg-white/10">+</button>
                <button onClick={() => remove(p.id)} className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-red-600/90 hover:bg-red-600">🗑</button>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-max rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-extrabold">Order Summary</h3>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
            <div className="flex justify-between"><span>Tax</span><span>₹{tax.toLocaleString("en-IN")}</span></div>
          </div>
          <div className="mt-4 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-blue-500">₹{total.toLocaleString("en-IN")}</span>
          </div>

          <div className="mt-6 space-y-3">
            <a href="/checkout" onClick={gotoCheckout} className="block w-full text-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">PROCEED TO CHECKOUT</a>
            <Link href="/shop" className="block w-full text-center rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">Continue Shopping</Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
