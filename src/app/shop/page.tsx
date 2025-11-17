"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { type Category, type Product, useCart } from "../../context/CartContext";

const products: Product[] = [
  {
    id: "tee",
    name: "FitBeast Training T-Shirt",
    price: 1000,
    image: "https://i.pinimg.com/736x/2b/e2/1e/2be21ec8fe98bc5c4eddcfc0d0b4717c.jpg",
    category: "Apparel",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "whey",
    name: "WHEY PROTEIN",
    price: 1500,
    image: "https://i.pinimg.com/736x/08/4d/39/084d3944220b53cbb1c4382011f2e7ed.jpg",
    category: "Supplements",
    rating: 4.9,
    reviews: 256,
  },
  {
    id: "leggings",
    name: "Performance Leggings",
    price: 800,
    image: "https://i.pinimg.com/1200x/89/17/75/891775000c10ca13b645ebea4eb7894a.jpg",
    category: "Apparel",
    rating: 4.7,
    reviews: 89,
  },
  {
    id: "bag",
    name: "Gym Duffle Bag",
    price: 700,
    image: "https://i.pinimg.com/1200x/d0/f1/77/d0f1779a753888eb80ef18c44997c1de.jpg",
    category: "Accessories",
    rating: 4.6,
    reviews: 166,
  },
  {
    id: "preworkout",
    name: "Pre-Workout Energizer",
    price: 1000,
    image: "https://i.pinimg.com/1200x/54/26/ec/5426ecae923f3269f2ee83fab0923bb5.jpg",
    category: "Supplements",
    rating: 4.8,
    reviews: 203,
  },
  {
    id: "gloves",
    name: "Training Gloves",
    price: 500,
    image: "https://i.pinimg.com/736x/83/25/04/83250455dfa6ca11402cc1a3d3160139.jpg",
    category: "Accessories",
    rating: 4.5,
    reviews: 112,
  },
  {
    id: "hoodie",
    name: "FitBeast Hoodie",
    price: 800,
    image: "https://i.pinimg.com/1200x/dc/ea/6e/dcea6ee46a69553e8a5c2c413f69ea55.jpg",
    category: "Apparel",
    rating: 4.7,
    reviews: 178,
  },
  {
    id: "bands",
    name: "Resistance Bands Set",
    price: 500,
    image: "https://i.pinimg.com/1200x/1c/5d/5e/1c5d5e1a586f8ad028f462ae142173c6.jpg",
    category: "Accessories",
    rating: 4.7,
    reviews: 147,
  },
  {
    id: "bcaa",
    name: "BCAA Recovery",
    price: 700,
    image: "https://i.pinimg.com/1200x/2d/2c/e7/2d2ce78c4d0c1282884fdc96f11f5829.jpg",
    category: "Supplements",
    rating: 4.6,
    reviews: 99,
  },
];

const categories: ("All" | Category)[] = ["All", "Apparel", "Supplements", "Accessories"];

function CategoryTabs({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="mx-auto mt-6 inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
      {categories.map((c) => {
        const active = value === c;
        return (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={`relative min-w-32 px-5 py-2.5 text-sm font-semibold transition-all duration-150 ${
              active ? "text-white" : "text-gray-300 hover:text-white"
            }`}
          >
            {active && (
              <span className="absolute inset-0 -z-10 rounded-lg bg-neutral-800 ring-1 ring-blue-500/60 shadow-[0_0_30px_-10px_rgba(37,99,235,0.8)]" />
            )}
            {c}
          </button>
        );
      })}
    </div>
  );
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="m12 17.27 6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z" />
    </svg>
  );
}

function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <div className="overflow-hidden rounded-2xl bg-white/5 border border-white/10 shadow">
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
        <Image src={p.image} alt={p.name} fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <div className="p-5 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Star className="text-blue-500" />
          <span className="font-semibold">{p.rating?.toFixed(1)}</span>
          <span className="text-gray-400">({p.reviews} reviews)</span>
        </div>
        <h3 className="text-xl font-extrabold">{p.name}</h3>
        <p className="text-sm text-gray-400">{p.category}</p>
        <div className="mt-2 text-2xl font-bold text-blue-500">₹{p.price.toLocaleString("en-IN")}</div>
        <button
          onClick={() => add(p, 1)}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2ZM7.2 6l.94 2h8.65c.86 0 1.62.55 1.88 1.36l1.93 5.8c.14.43-.09.9-.52 1.04-.08.03-.17.05-.26.05H8.54c-.8 0-1.5-.5-1.76-1.25L4.1 3H2V1h3.09c.8 0 1.5.5 1.76 1.25L7.2 6Z"/></svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [tab, setTab] = useState<string>("All");
  const filtered = useMemo(() => (tab === "All" ? products : products.filter((p) => p.category === tab)), [tab]);

  return (
    <main className="min-h-screen pb-16">
      <section className="pt-14 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold">FitBeast Shop</h1>
          <p className="mt-3 text-lg text-gray-300">Premium gear and supplements to power your workouts</p>
          <CategoryTabs value={tab} onChange={setTab} />
        </div>
      </section>

      <section className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
