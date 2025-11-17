"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sending, setSending] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setSending(false);
    (e.target as HTMLFormElement).reset();
    alert("Thanks! We'll get back to you within 24 hours.");
  };

  return (
    <main className="relative min-h-screen pb-20 overflow-hidden">
      {/* Blue glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <section className="pt-14 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold">Get In Touch</h1>
        <p className="mt-3 text-gray-300">We'd love to hear from you. Reach out anytime!</p>
      </section>

      <section className="mt-10 px-4">
        <div className="mx-auto max-w-2xl rounded-2xl border border-blue-500/40 bg-black/40 p-6 sm:p-8 shadow-[0_0_60px_-20px_rgba(37,99,235,0.65)] ring-1 ring-white/5">
          <h2 className="text-2xl font-extrabold">Send Us a Message</h2>
          <p className="mt-1 text-sm text-gray-300">Fill out the form below and we'll get back to you within 24 hours</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-300">Full Name</label>
              <input name="name" required placeholder="John Doe" className="mt-2 w-full rounded-md bg-black/40 px-3 py-2 text-sm outline-none border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300">Email</label>
              <input name="email" type="email" required placeholder="john@example.com" className="mt-2 w-full rounded-md bg-black/40 px-3 py-2 text-sm outline-none border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300">Phone (Optional)</label>
              <input name="phone" placeholder="(555) 123-4567" className="mt-2 w-full rounded-md bg-black/40 px-3 py-2 text-sm outline-none border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300">Subject</label>
              <input name="subject" required placeholder="What can we help you with?" className="mt-2 w-full rounded-md bg-black/40 px-3 py-2 text-sm outline-none border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300">Message</label>
              <textarea name="message" required placeholder="Tell us more about your inquiry..." rows={5} className="mt-2 w-full resize-y rounded-md bg-black/40 px-3 py-2 text-sm outline-none border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <button disabled={sending} className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-60">
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
