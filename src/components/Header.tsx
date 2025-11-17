"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { count } = useCart();
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-blue-500">
            <path d="M7 7h3v3H7V7Zm7 7h3v3h-3v-3Zm-9 3h3v3H5v-3Zm12-12h3v3h-3V5Z" fill="currentColor"/>
            <path d="M3 11h18v2H3v-2Z" fill="currentColor"/>
          </svg>
          <span className="text-lg">FitBeast</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/classes" className="hover:text-white">Classes</Link>
          <Link href="/pricing" className="hover:text-white">Pricing</Link>
          <Link href="/trainers" className="hover:text-white">Trainers</Link>
          <Link href="/programs" className="hover:text-white">Programs</Link>
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/shop" className="hover:text-white">Shop</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-white/10">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2ZM7.2 6l.94 2h8.65c.86 0 1.62.55 1.88 1.36l1.93 5.8c.14.43-.09.9-.52 1.04-.08.03-.17.05-.26.05H8.54c-.8 0-1.5-.5-1.76-1.25L4.1 3H2V1h3.09c.8 0 1.5.5 1.76 1.25L7.2 6Z"/>
            </svg>
            {count > 0 && (
              <span className="badge bg-blue-600 text-white border border-white/20">{count}</span>
            )}
          </Link>
          {user ? (
            <>
              <Link href="/programs" className="hidden sm:inline-flex h-9 items-center justify-center rounded-md border border-white/20 px-3 text-sm text-white hover:bg-white/10">
                Hi, {user.name || user.email}
              </Link>
              <button onClick={logout} className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white shadow hover:bg-blue-500">
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white shadow hover:bg-blue-500"
            >
              JOIN NOW
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
