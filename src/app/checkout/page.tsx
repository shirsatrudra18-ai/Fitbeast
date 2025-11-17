"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { subtotal, items, clear } = useCart();
  const tax = Number((subtotal * 0.1).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  const pay = (e: React.FormEvent) => {
    e.preventDefault();
    clear();
    router.push("/shop");
  };

  return (
    <main className="min-h-screen pb-16">
      <section className="pt-14 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold">Checkout</h1>
        <p className="mt-2 text-gray-300">Secure dummy payment — no charges will be made</p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid gap-6 lg:grid-cols-2">
        <form onSubmit={pay} className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h3 className="text-xl font-extrabold">Payment Details</h3>
          <div className="grid gap-4">
            <input required placeholder="Full Name" className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500" />
            <input required placeholder="Email" type="email" className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500" />
            <input required placeholder="Card Number" inputMode="numeric" className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500" />
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="MM/YY" className="rounded-md bg-black/40 border border-white/10 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500" />
              <input required placeholder="CVC" className="rounded-md bg-black/40 border border-white/10 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <input placeholder="ZIP / Postal Code" className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">Pay ₹{total.toLocaleString("en-IN")}</button>
          <Link href="/cart" className="block text-center text-sm text-gray-300 hover:underline">Back to Cart</Link>
        </form>

        <aside className="rounded-2xl border border-white/10 bg-white/5 p-6 h-max">
          <h3 className="text-xl font-extrabold">Order Summary</h3>
          <div className="mt-3 text-sm text-gray-300">{items.length} item(s)</div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>₹{tax.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-blue-500">₹{total.toLocaleString("en-IN")}</span></div>
          </div>
          <p className="mt-4 text-xs text-gray-400">This is a demo checkout. Replace with real payment later.</p>
        </aside>
      </section>
    </main>
  );
}
