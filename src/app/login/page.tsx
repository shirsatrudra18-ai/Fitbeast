"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    if (res.ok) router.push("/programs");
  };

  return (
    <main className="relative min-h-screen overflow-hidden pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-15%] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      <section className="pt-14 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold">Welcome Back</h1>
        <p className="mt-2 text-gray-300">Log in to continue your training</p>
      </section>

      <section className="mt-8 px-4">
        <form onSubmit={onSubmit} className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 space-y-5 shadow-[0_0_50px_-20px_rgba(37,99,235,0.6)]">
          <div>
            <label className="block text-xs font-semibold text-gray-300">Email</label>
            <input name="email" type="email" required className="mt-2 w-full rounded-md bg-black/40 px-3 py-2 text-sm outline-none border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-300">Password</label>
            <input name="password" type="password" required className="mt-2 w-full rounded-md bg-black/40 px-3 py-2 text-sm outline-none border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="••••••••" />
          </div>
          <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">Log In</button>
          <p className="text-center text-sm text-gray-300">No account? <Link href="/signup" className="text-blue-400 hover:underline">Create one</Link></p>
        </form>
      </section>
    </main>
  );
}
