"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

const PLANS: Record<string, { name: string; price: number; features: string[] }> = {
  basic: { name: "Basic", price: 29, features: ["All programs", "Video library", "Progress tracking"] },
  pro: { name: "Pro", price: 79, features: ["Everything in Basic", "Unlimited live classes", "2 PT sessions/month"] },
  elite: { name: "Elite", price: 149, features: ["Everything in Pro", "Weekly 1-on-1", "Custom plans"] },
};

export default function PaymentPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const key = (sp.get("plan") || "basic").toLowerCase();
  const plan = PLANS[key] || PLANS.basic;

  const pay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      await fetch("/api/subscription", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan: key }) });
    }
    alert(`Payment successful for ${plan.name}!`);
    router.push("/programs");
  };

  return (
    <main className="min-h-screen pb-16">
      <section className="pt-14 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold">Checkout — {plan.name}</h1>
        <p className="mt-2 text-gray-300">Plan price: ${plan.price}/month</p>
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
          </div>
          <button type="submit" className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">Pay ${plan.price}/mo</button>
        </form>

        <aside className="rounded-2xl border border-white/10 bg-white/5 p-6 h-max">
          <h3 className="text-xl font-extrabold">Plan Details</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2"><span>✅</span><span>{f}</span></li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  );
}
