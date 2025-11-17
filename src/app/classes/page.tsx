"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

type Level = "High" | "Medium" | "Low";

type ClassItem = {
  time: string;
  title: string;
  instructor: string;
  duration: string; // e.g. "45 min"
  spots: number; // remaining spots
  level: Level;
};

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const schedule: Record<(typeof weekdays)[number], ClassItem[]> = {
  Monday: [
    { time: "6:00 AM", title: "Morning HIIT", instructor: "Sarah Johnson", duration: "45 min", spots: 5, level: "High" },
    { time: "9:00 AM", title: "Yoga Flow", instructor: "Emma Lee", duration: "60 min", spots: 8, level: "Low" },
    { time: "12:00 PM", title: "Strength Training", instructor: "Mike Chen", duration: "60 min", spots: 3, level: "Medium" },
    { time: "5:00 PM", title: "CrossFit", instructor: "Jake Williams", duration: "50 min", spots: 2, level: "High" },
    { time: "7:00 PM", title: "Cardio Blast", instructor: "Lisa Park", duration: "45 min", spots: 10, level: "Medium" },
  ],
  Tuesday: [
    { time: "6:30 AM", title: "Spin Class", instructor: "Olivia Brown", duration: "45 min", spots: 6, level: "Medium" },
    { time: "10:00 AM", title: "Pilates", instructor: "Nina Patel", duration: "60 min", spots: 9, level: "Low" },
    { time: "6:00 PM", title: "Powerlifting", instructor: "Diego Alvarez", duration: "75 min", spots: 4, level: "High" },
  ],
  Wednesday: [
    { time: "7:00 AM", title: "Bootcamp", instructor: "Chris Evans", duration: "50 min", spots: 7, level: "High" },
    { time: "11:00 AM", title: "Mobility & Stretch", instructor: "Anya Kim", duration: "45 min", spots: 12, level: "Low" },
    { time: "6:30 PM", title: "Hypertrophy", instructor: "Mike Chen", duration: "60 min", spots: 5, level: "Medium" },
  ],
  Thursday: [
    { time: "6:00 AM", title: "Morning HIIT", instructor: "Sarah Johnson", duration: "45 min", spots: 6, level: "High" },
    { time: "9:00 AM", title: "Yoga Flow", instructor: "Emma Lee", duration: "60 min", spots: 10, level: "Low" },
    { time: "5:30 PM", title: "Boxing Basics", instructor: "Tom Reyes", duration: "55 min", spots: 6, level: "Medium" },
  ],
  Friday: [
    { time: "7:00 AM", title: "Strength Circuits", instructor: "Mike Chen", duration: "50 min", spots: 3, level: "Medium" },
    { time: "6:00 PM", title: "CrossFit", instructor: "Jake Williams", duration: "50 min", spots: 1, level: "High" },
  ],
  Saturday: [
    { time: "9:00 AM", title: "Weekend WOD", instructor: "Jake Williams", duration: "60 min", spots: 8, level: "High" },
    { time: "11:00 AM", title: "Family Yoga", instructor: "Emma Lee", duration: "45 min", spots: 15, level: "Low" },
  ],
  Sunday: [
    { time: "10:00 AM", title: "Functional Training", instructor: "Chris Evans", duration: "60 min", spots: 9, level: "Medium" },
    { time: "5:00 PM", title: "Deep Stretch", instructor: "Anya Kim", duration: "50 min", spots: 11, level: "Low" },
  ],
};

function LevelBadge({ level }: { level: Level }) {
  const styles: Record<Level, string> = {
    High: "bg-red-600/80 text-white",
    Medium: "bg-gray-700 text-white",
    Low: "bg-gray-800 text-gray-100",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${styles[level]}`}>
      {/* flame icon */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
        <path d="M13.5 0S16 4 12 7 9 12 9 12s2-2 4-2 4 1.5 4 4-1.79 6-7 6S4 16.97 4 14c0-3.5 2.5-6 2.5-6S7 11 9.5 9 13.5 0 13.5 0Z" />
      </svg>
      {level}
    </span>
  );
}

function ScheduleCard({ item, onBook }: { item: ClassItem; onBook: (it: ClassItem) => void }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-6 shadow-[0_0_40px_-20px_rgba(59,130,246,0.6)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-blue-500 text-3xl font-extrabold tabular-nums">{item.time}</div>
          <LevelBadge level={item.level} />
        </div>
        <div className="flex items-center gap-6 text-gray-300 text-sm">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-90"><path d="M12 8h1v5h5v1h-6V8Zm0-5a10 10 0 1 0 10 10A10 10 0 0 0 12 3Z"/></svg>
            {item.duration}
          </div>
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-90"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3ZM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z"/></svg>
            {item.spots} spots left
          </div>
        </div>
      </div>

      <h3 className="mt-4 text-3xl font-semibold">{item.title}</h3>
      <p className="mt-2 text-gray-300">with {item.instructor}</p>

      <button
        onClick={() => onBook(item)}
        className="mt-6 block w-full rounded-md bg-blue-600 py-3 text-center text-white font-semibold hover:bg-blue-500"
      >
        Book Now
      </button>
    </div>
  );
}

export default function ClassesPage() {
  const [day, setDay] = useState<(typeof weekdays)[number]>("Monday");
  const [open, setOpen] = useState<ClassItem | null>(null);
  const [date, setDate] = useState<string>("");
  const [confirm, setConfirm] = useState<{ title: string; time: string; date: string } | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  const submit = async () => {
    if (!open || !date) return;
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, classTitle: open.title, classTime: open.time }),
    });
    if (res.status === 401) {
      router.push("/login");
      return;
    }
    if (res.ok) {
      setConfirm({ title: open.title, time: open.time, date });
      setOpen(null);
      setDate("");
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-center">Class Schedule</h1>
      <p className="mt-3 text-center text-gray-300 text-lg">Find the perfect class for your fitness journey</p>

      {/* Day selector */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {weekdays.map((d) => {
          const active = d === day;
          return (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={`px-6 py-3 rounded-xl text-base font-semibold transition-colors border ${
                active
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-transparent text-white border-blue-500/70 hover:bg-blue-600/10"
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>

      {/* Schedule list */}
      <div className="mt-10 space-y-6">
        {schedule[day].map((item) => (
          <ScheduleCard key={`${day}-${item.time}-${item.title}`} item={item} onBook={(it) => setOpen(it)} />
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm fb-fade-in">
          <div className="mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_50px_-20px_rgba(37,99,235,0.6)]">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-extrabold">Book Class</h3>
              <p className="text-gray-300 text-sm">{open.title} — {open.time}</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300">Select Date</label>
                <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="mt-2 w-full rounded-md bg-black/40 px-3 py-2 text-sm outline-none border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>
              {!user && (
                <p className="text-xs text-amber-300">You must log in to confirm booking. You’ll be redirected.</p>
              )}
              <div className="flex gap-3">
                <button onClick={() => setOpen(null)} className="flex-1 rounded-md border border-white/20 px-4 py-2 text-sm hover:bg-white/10">Cancel</button>
                <button onClick={submit} className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm fb-fade-in">
          <div className="mx-4 w-full max-w-md rounded-2xl border border-blue-500/40 bg-black/40 p-6 shadow-[0_0_60px_-20px_rgba(37,99,235,0.65)] ring-1 ring-white/5 text-center">
            <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-blue-600/20 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41Z"/></svg>
            </div>
            <h3 className="text-2xl font-extrabold">Booking Confirmed</h3>
            <p className="mt-2 text-gray-300">{confirm.title} on <span className="text-blue-400">{confirm.date}</span> at {confirm.time}</p>
            <div className="mt-6">
              <button onClick={() => setConfirm(null)} className="inline-flex rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-500">Done</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
