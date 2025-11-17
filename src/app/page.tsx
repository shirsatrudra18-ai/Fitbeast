import Link from "next/link";
import Image from "next/image";
import JoinFreeTrialButton from "../components/JoinFreeTrialButton";

const HERO_BG =
  "https://beastmode-hub.lovable.app/assets/hero-workout-Ds6cf5_U.jpg";
const CLASS_IMG =
  "https://beastmode-hub.lovable.app/assets/personal-training-B1iOO4XJ.jpg";

function StarRow() {
  return (
    <div className="flex gap-1 text-blue-500" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="m12 17.27 6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section
        className="relative min-h-[78vh] flex items-center"
        style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl mr-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
              Transform Your Body.
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-500 mt-3">
              Unleash Your Inner Beast.
            </h2>
            <p className="mt-6 text-lg text-gray-300">
              Premium fitness center with expert trainers, state-of-the-art equipment, and dynamic classes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/programs" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-blue-500">
                START FREE TRIAL
              </Link>
              <Link
                href="/classes"
                className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
              >
                View Classes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose FitBeast */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-extrabold text-center">Why Choose FitBeast?</h3>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "State-of-the-Art Equipment",
                desc: "Latest machines and free weights",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" className="text-blue-500" fill="currentColor"><path d="M3 10h2v4H3v-4Zm16 0h2v4h-2v-4ZM7 7h2v10H7V7Zm8 0h2v10h-2V7Zm-5 3h4v4h-4v-4Z"/></svg>
                ),
              },
              {
                title: "Expert Trainers",
                desc: "Certified professionals to guide you",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" className="text-blue-500" fill="currentColor"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.33 0-6 1.34-6 3v3h12v-3c0-1.66-2.67-3-6-3Z"/></svg>
                ),
              },
              {
                title: "Nutrition Coaching",
                desc: "Personalized meal plans",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" className="text-blue-500" fill="currentColor"><path d="M12 21C7 21 3 17 3 12S7 3 12 3s9 4 9 9-4 9-9 9Zm1-14h-2v6h2V7Zm0 8h-2v2h2Z"/></svg>
                ),
              },
              {
                title: "Results Guaranteed",
                desc: "Proven transformation programs",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" className="text-blue-500" fill="currentColor"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41Z"/></svg>
                ),
              },
              {
                title: "Flexible Hours",
                desc: "Open 18+ hours daily",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" className="text-blue-500" fill="currentColor"><path d="M12 8h1v5h5v1h-6V8Zm0-5a10 10 0 1 0 10 10A10 10 0 0 0 12 3Z"/></svg>
                ),
              },
              {
                title: "Premium Facilities",
                desc: "Clean, modern amenities",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" className="text-blue-500" fill="currentColor"><path d="M4 21V8l8-5 8 5v13H4Zm8-13L6 10.74V19h12v-8.26L12 8Z"/></svg>
                ),
              },
            ].map(({ title, desc, icon }) => (
              <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="mb-4">{icon}</div>
                <h4 className="text-2xl font-semibold">{title}</h4>
                <p className="mt-2 text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Classes */}
      <section className="py-16 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-extrabold text-center">Popular Classes</h3>
          <p className="text-center text-gray-400 mt-2">Find your perfect workout</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "HIIT", level: "High", duration: "45 min" },
              { name: "Strength Training", level: "Medium", duration: "60 min" },
              { name: "Yoga", level: "Low", duration: "60 min" },
              { name: "CrossFit", level: "High", duration: "50 min" },
            ].map((c) => (
              <div key={c.name} className="overflow-hidden rounded-2xl bg-white/5 border border-white/10 shadow">
                <div className="relative h-48">
                  <Image src={CLASS_IMG} alt={c.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h4 className="text-2xl font-semibold">{c.name}</h4>
                    <p className="text-sm text-gray-300">
                      <span className="text-blue-500">{c.level}</span> • {c.duration}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/classes" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-blue-500">
              View All Classes
            </Link>
          </div>
        </div>
      </section>

      {/* Member Success Stories */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-extrabold text-center">Member Success Stories</h3>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                since: "Member since 2023",
                quote:
                  "FitBeast completely transformed my life! Lost 30 pounds and gained incredible strength.",
              },
              {
                name: "Mike Chen",
                since: "Member since 2022",
                quote:
                  "The trainers are amazing and the facility is top-notch. Best gym I've ever joined!",
              },
              {
                name: "Emma Rodriguez",
                since: "Member since 2024",
                quote:
                  "Group classes are so motivating! I actually look forward to my workouts now.",
              },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <StarRow />
                <h4 className="mt-4 text-xl font-semibold">{t.name}</h4>
                <p className="text-sm text-gray-400">{t.since}</p>
                <p className="mt-6 text-gray-200">“{t.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0b3058] to-black text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-4xl sm:text-5xl font-extrabold">Ready to Start Your Transformation?</h3>
          <p className="mt-3 text-lg text-gray-200">Join FitBeast today and get 7 days free!</p>
          <div className="mt-8">
            {/* Client button opens success popup and records trial */}
            <JoinFreeTrialButton />
          </div>
        </div>
      </section>
    </main>
  );
}
