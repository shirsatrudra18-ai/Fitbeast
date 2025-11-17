"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function JoinFreeTrialButton() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const onClick = async () => {
    if (user) {
      try {
        await fetch("/api/subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan: "trial" }),
        });
        setSaved(true);
      } catch {
        setSaved(false);
      }
    }
    setOpen(true);
  };

  const displayName = user?.name || user?.email || "Guest";

  return (
    <>
      <button onClick={onClick} className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-500">
        Join Now
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm fb-fade-in">
          <div className="mx-4 w-full max-w-md rounded-2xl border border-blue-500/40 bg-black/40 p-6 shadow-[0_0_60px_-20px_rgba(37,99,235,0.65)] ring-1 ring-white/5 text-center">
            {user ? (
              <>
                <h3 className="text-2xl font-extrabold">Welcome, {displayName}!</h3>
                <p className="mt-2 text-gray-300">You have successfully joined the FitBeast Gym.</p>
                {saved && <p className="mt-1 text-xs text-blue-300">Your free trial has been recorded.</p>}
                <div className="mt-6 flex justify-center gap-3">
                  <Link href="/programs" className="inline-flex rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500">Go to Programs</Link>
                  <button onClick={() => setOpen(false)} className="inline-flex rounded-md border border-white/20 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10">Close</button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-extrabold">Join FitBeast</h3>
                <p className="mt-2 text-gray-300">Create an account to personalize your experience and start the free trial.</p>
                <div className="mt-6 flex justify-center gap-3">
                  <Link href="/signup" className="inline-flex rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500">Sign Up</Link>
                  <Link href="/login" className="inline-flex rounded-md border border-white/20 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10">Log In</Link>
                </div>
                <button onClick={() => setOpen(false)} className="mt-4 inline-flex rounded-md border border-white/20 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10">Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
