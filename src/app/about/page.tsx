"use client";

import Image from "next/image";
import Link from "next/link";

const HERO_IMG = "https://i.pinimg.com/736x/de/87/98/de879823cdded25720a788ccc70ab3bc.jpg";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden pb-20">
      {/* Blue glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[36rem] w-[36rem] rounded-full bg-blue-600/20 blur-[130px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      {/* Hero */}
      <section className="pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">Stronger Every Day</h1>
            <p className="mt-4 text-lg text-gray-300">
              FitBeast is a next‑gen fitness community focused on performance, longevity, and confidence. We blend elite coaching with an energizing atmosphere and modern tech.
            </p>
            <div className="mt-8 flex gap-4">
              <Link href="/programs" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500">Explore Programs</Link>
              <Link href="/trainers" className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">Meet Trainers</Link>
            </div>
          </div>
          <div className="relative h-80 lg:h-[28rem] overflow-hidden rounded-2xl border border-white/10">
            <Image src={HERO_IMG} alt="Gym" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-12">
        <div className="max-w-6xl mx-auto px-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Members", v: "25,000+" },
            { k: "Certified Trainers", v: "40+" },
            { k: "Avg. Rating", v: "4.9/5" },
            { k: "Workouts Streamed", v: "1.2M" },
          ].map((s) => (
            <div key={s.k} className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
              <div className="text-3xl font-extrabold text-blue-500">{s.v}</div>
              <div className="mt-1 text-sm text-gray-300">{s.k}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mt-12">
        <div className="max-w-6xl mx-auto px-4 grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Coaching That Cares",
              d: "Our trainers design smart programs for your goals — not trends. Form, safety, and fun first.",
            },
            {
              t: "Community Energy",
              d: "You’ll feel it the moment you walk in. Inclusive vibes, accountability, and daily wins.",
            },
            {
              t: "Tech + Tracking",
              d: "Progress tools, session history, and integrated programs keep you moving forward.",
            },
          ].map((v) => (
            <div key={v.t} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-extrabold">{v.t}</h3>
              <p className="mt-2 text-gray-300 text-sm">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Facility preview */}
      <section className="mt-12">
        <div className="max-w-7xl mx-auto px-4 grid gap-6 lg:grid-cols-3">
          {[
            "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=1200&auto=format&fit=crop",
          ].map((src, i) => (
            <div key={i} className="relative h-56 sm:h-72 overflow-hidden rounded-2xl border border-white/10">
              <Image src={src} alt="Facility" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-14 text-center">
        <h3 className="text-3xl sm:text-4xl font-extrabold">Ready to join the FitBeast family?</h3>
        <p className="mt-2 text-gray-300">Start your 60-day free training journey today.</p>
        <div className="mt-6">
          <Link href="/programs" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500">Start Free Program</Link>
        </div>
      </section>
    </main>
  );
}
