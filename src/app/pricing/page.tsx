"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const choose = (plan: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) router.push("/login");
    else router.push(`/payment?plan=${plan}`);
  };
  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="pt-14 pb-8 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold">Online Training Plans</h1>
          <p className="mt-3 text-lg text-gray-300">
            Get live instructions, feedback, and support from expert trainers
          </p>
        </div>
      </section>

      {/* Free Trial Card */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-[linear-gradient(135deg,_rgba(13,31,54,0.9),_rgba(2,8,23,0.9))] p-8 sm:p-10 shadow-[0_0_60px_-20px_rgba(37,99,235,0.5)]">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎉</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold">Free 60-Day Trial</h2>
              </div>
              <p className="text-gray-300 max-w-2xl">
                Try FitBeast risk-free! Full access to all programs and live classes.
              </p>
              <Link
                href="/programs"
                id="start-free-trial"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                START FREE TRIAL
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-3">
          {/* Basic */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_30px_80px_-30px_rgba(37,99,235,0.55)] hover:border-blue-500/50 hover:bg-white/7">
            <h3 className="text-2xl font-semibold">Basic</h3>
            <div className="mt-3 flex items-end gap-1">
              <span className="text-5xl font-extrabold text-blue-500">$29</span>
              <span className="text-gray-300 mb-2">/month</span>
            </div>
            <p className="mt-2 text-gray-400">Perfect for getting started</p>
            <ul className="mt-6 space-y-3 text-gray-200">
              {[
                "Access to all workout programs",
                "Pre-recorded video library",
                "Progress tracking",
                "Mobile app access",
                "Community support forum",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500 mt-0.5"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41Z"/></svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a href="/payment?plan=basic" onClick={choose("basic")} className="mt-6 block w-full rounded-md bg-blue-600 py-3 text-center text-white font-semibold hover:bg-blue-500">
              Choose Basic
            </a>
          </div>

          {/* Pro - Most Popular */}
          <div className="relative rounded-2xl border border-blue-500/60 bg-white/5 p-6 shadow-[0_0_60px_-20px_rgba(37,99,235,0.7)] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_50px_120px_-30px_rgba(37,99,235,0.9)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-block rounded-full bg-blue-600 px-4 py-1 text-xs font-bold">MOST POPULAR</span>
            </div>
            <h3 className="mt-2 text-2xl font-semibold">Pro</h3>
            <div className="mt-3 flex items-end gap-1">
              <span className="text-5xl font-extrabold text-blue-500">$79</span>
              <span className="text-gray-300 mb-2">/month</span>
            </div>
            <p className="mt-2 text-gray-400">Best value for committed members</p>
            <ul className="mt-6 space-y-3 text-gray-200">
              {[
                "Everything in Basic",
                "Live virtual classes (unlimited)",
                "2 personal training sessions/month",
                "Nutrition consultation",
                "Real-time form feedback",
                "Priority support",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500 mt-0.5"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41Z"/></svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a href="/payment?plan=pro" onClick={choose("pro")} className="mt-6 block w-full rounded-md bg-blue-600 py-3 text-center text-white font-semibold hover:bg-blue-500">
              Choose Pro
            </a>
          </div>

          {/* Elite */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_30px_80px_-30px_rgba(37,99,235,0.55)] hover:border-blue-500/50 hover:bg-white/7">
            <h3 className="text-2xl font-semibold">Elite</h3>
            <div className="mt-3 flex items-end gap-1">
              <span className="text-5xl font-extrabold text-blue-500">$149</span>
              <span className="text-gray-300 mb-2">/month</span>
            </div>
            <p className="mt-2 text-gray-400">Maximum results with dedicated coaching</p>
            <ul className="mt-6 space-y-3 text-gray-200">
              {[
                "Everything in Pro",
                "Weekly 1-on-1 training sessions",
                "Custom meal plans",
                "Monthly progress reviews",
                "24/7 trainer chat support",
                "Exclusive challenges & rewards",
                "Merchandise discount (20%)",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500 mt-0.5"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41Z"/></svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a href="/payment?plan=elite" onClick={choose("elite")} className="mt-6 block w-full rounded-md bg-blue-600 py-3 text-center text-white font-semibold hover:bg-blue-500">
              Choose Elite
            </a>
          </div>
        </div>
      </section>

      {/* What’s Included */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-center text-3xl sm:text-4xl font-extrabold">What’s Included</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">All Plans Include</h3>
              <ul className="mt-4 space-y-3 text-gray-200">
                {[
                  "Certified online trainers",
                  "HD video workouts",
                  "Progress tracking tools",
                  "Mobile & desktop access",
                  "No hidden fees",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500 mt-0.5"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41Z"/></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">Payment Options</h3>
              <ul className="mt-4 space-y-3 text-gray-200">
                {[
                  "Credit/Debit cards accepted",
                  "Automatic renewal available",
                  "Cancel anytime (monthly plan)",
                  "Secure payment processing",
                  "Digital receipts",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500 mt-0.5"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41Z"/></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}