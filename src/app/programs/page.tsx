"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

// Types
type Level = "Beginner" | "Intermediate" | "Advanced";

type DayInfo = {
  dayNumber: number;
  title: string; // e.g. "Day 1"
  muscle: string; // e.g. "Chest & Triceps"
};

const TOTAL_DAYS = 60;

// 7-day base split used to compose 60 days
const BASE_SPLITS: Record<Level, string[]> = {
  Beginner: [
    "Chest & Triceps",
    "Back & Biceps",
    "Legs & Glutes",
    "Shoulders & Abs",
    "Full Body",
    "Cardio & Core",
    "Rest Day",
  ],
  Intermediate: [
    "Upper Push",
    "Upper Pull",
    "Quads & Calves",
    "Hamstrings & Glutes",
    "PPL Combo",
    "HIIT & Core",
    "Rest Day",
  ],
  Advanced: [
    "Heavy Push",
    "Heavy Pull",
    "Heavy Legs",
    "Olympic/Power",
    "Hypertrophy Mix",
    "Metcon + Core",
    "Active Recovery",
  ],
};

function buildProgram(level: Level): DayInfo[] {
  const split = BASE_SPLITS[level];
  return Array.from({ length: TOTAL_DAYS }, (_, i) => {
    const dayNumber = i + 1;
    const muscle = split[i % split.length];
    return {
      dayNumber,
      title: `Day ${dayNumber}`,
      muscle,
    };
  });
}

function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(initial);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setState(JSON.parse(raw));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState] as const;
}

function percent(n: number, d: number) {
  if (d === 0) return 0;
  return Math.round((n / d) * 100);
}

function SegmentedTabs({
  value,
  onChange,
}: {
  value: Level;
  onChange: (v: Level) => void;
}) {
  const options: Level[] = ["Beginner", "Intermediate", "Advanced"];
  return (
    <div className="mx-auto mt-6 inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`relative min-w-40 px-6 py-3 text-sm font-semibold transition-all duration-200 will-change-transform ${
              active
                ? "text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {active && (
              <span className="absolute inset-0 -z-10 rounded-lg bg-neutral-800 ring-1 ring-blue-500/60 shadow-[0_0_30px_-10px_rgba(37,99,235,0.8)] scale-100" />
            )}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function ProgressBar({ completed, total, onReset }: { completed: number; total: number; onReset: () => void }) {
  const pct = percent(completed, total);
  return (
    <div className="mt-8 rounded-2xl border border-blue-500/30 bg-white/5 p-6 shadow-[0_0_60px_-20px_rgba(37,99,235,0.5)]">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-extrabold">Your Progress</h3>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-md border border-blue-500/60 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600/10"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-90"><path d="M12 6V3L8 7l4 4V8c2.76 0 5 2.24 5 5a5 5 0 0 1-8.66 3.54l-1.42 1.42A7 7 0 0 0 19 13c0-3.87-3.13-7-7-7Z"/></svg>
          Reset Program
        </button>
      </div>
      <p className="mt-2 text-gray-300">{completed} of {total} days completed ({pct}%)</p>
      <div className="mt-4 h-3 w-full rounded-full bg-neutral-800 ring-1 ring-white/10">
        <div
          className="h-3 rounded-full bg-blue-600 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function DayCard({ info, completed, onOpen }: { info: DayInfo; completed: boolean; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className={`group rounded-lg border px-4 py-3 text-left transition-colors ${
        completed
          ? "bg-blue-600/90 border-blue-500/80"
          : "bg-black/20 border-blue-500/60 hover:bg-white/5"
      }`}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold">{info.title}</h4>
        {completed && (
          <span className="rounded-full border border-white/40 p-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41Z"/></svg>
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-gray-300">{info.muscle}</p>
    </button>
  );
}

function slugifyMuscle(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function DayDetail({
  info,
  isCompleted,
  onBack,
  onToggleComplete,
}: {
  info: DayInfo;
  isCompleted: boolean;
  onBack: () => void;
  onToggleComplete: () => void;
}) {
  const [localVideos, setLocalVideos] = useState<string[] | null>(null);
  const muscleSlug = slugifyMuscle(info.muscle);
  const isRest = /rest|recovery/i.test(info.muscle);

  useEffect(() => {
    let ignore = false;
    fetch(`/api/workouts/${muscleSlug}`)
      .then((r) => r.json())
      .then((d) => {
        if (!ignore) setLocalVideos(Array.isArray(d.videos) ? d.videos.slice(0, 6) : []);
      })
      .catch(() => setLocalVideos([]));
    return () => {
      ignore = true;
    };
  }, [muscleSlug]);

  // Web accessible placeholders (fallback)
  const placeholders = [
    "/WorkoutVideos/back/back 2.mp4",
    "/WorkoutVideos/chest/chest 3.mp4",
    "/WorkoutVideos/arms/bicep1.mp4",
    "/WorkoutVideos/legs/legs 1.mp4",
    "/WorkoutVideos/sholder/shoulder1.mp4",
    "/WorkoutVideos/abs/abs.mp4",
  ];

  const videos = (localVideos && localVideos.length > 0 ? localVideos : []) as string[];

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          <span>←</span> Back to Calendar
        </button>
        <button
          onClick={onToggleComplete}
          className={`rounded-md px-4 py-2 text-sm font-semibold ${
            isCompleted ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-500"
          }`}
        >
          {isCompleted ? "Completed" : "Mark as Complete"}
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-3xl font-extrabold">{info.title}</h3>
            <p className="mt-1 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-sm text-gray-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-90"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-3.33 0-6 1.34-6 3v3h12v-3c0-1.66-2.67-3-6-3Z"/></svg>
              {info.muscle}
            </p>
          </div>
          <div>
            <button
              onClick={onToggleComplete}
              className={`rounded-md px-4 py-2 text-sm font-semibold ${
                isCompleted ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-500"
              }`}
            >
              {isCompleted ? "Completed" : "Mark as Complete"}
            </button>
          </div>
        </div>
      </div>

      {isRest ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-gray-300">
          Recovery day — focus on mobility, hydration, and sleep.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {(videos.length > 0 ? videos : placeholders).slice(0, 6).map((src, idx) => (
            <div key={idx} className="rounded-xl border border-white/10 bg-black/40 p-3">
              <div className="text-sm font-semibold mb-2">{idx + 1}. Exercise</div>
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <video className="absolute inset-0 h-full w-full" controls preload="metadata">
                  {src && src.trim() !== "" && <source src={src} />}
                  {/* Fallback remote */}
                  {placeholders[idx % placeholders.length] && placeholders[idx % placeholders.length].trim() !== "" && (
                    <source src={placeholders[idx % placeholders.length]} />
                  )}
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProgramsPage() {
  const [level, setLevel] = useLocalStorage<Level>("fb_program_level", "Beginner");
  const { user } = useAuth();

  // Completed days per level: boolean[60]
  const [completedMap, setCompletedMap] = useLocalStorage<Record<Level, boolean[]>>(
    "fb_program_progress",
    { Beginner: Array(TOTAL_DAYS).fill(false), Intermediate: Array(TOTAL_DAYS).fill(false), Advanced: Array(TOTAL_DAYS).fill(false) }
  );

  useEffect(() => {
    const load = async () => {
      if (!user) return; // keep local for guests
      try {
        const res = await fetch(`/api/progress?level=${level}`);
        const data = await res.json();
        if (Array.isArray(data.days) && data.days.length === TOTAL_DAYS) {
          setCompletedMap((prev) => ({ ...prev, [level]: data.days }));
        }
      } catch {}
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, level]);

  const plan = useMemo(() => buildProgram(level), [level]);
  const completed = completedMap[level] || Array(TOTAL_DAYS).fill(false);
  const completedCount = completed.filter(Boolean).length;

  const [openDay, setOpenDay] = useState<number | null>(null);

  const toggleDay = (n: number) => {
    setCompletedMap((prev) => {
      const next = { ...prev };
      const arr = [...(next[level] || [])];
      arr[n - 1] = !arr[n - 1];
      next[level] = arr;
      return next;
    });
    // sync if logged in
    if (user) {
      fetch("/api/progress", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ level, day: n, completed: !completed[n - 1] }) });
    }
  };

  const reset = () => {
    setCompletedMap((prev) => ({ ...prev, [level]: Array(TOTAL_DAYS).fill(false) }));
    setOpenDay(null);
  };

  // chunk by weeks (7,7,7,7,7,7,7,7,4)
  const weeks: DayInfo[][] = useMemo(() => {
    const chunks: DayInfo[][] = [];
    let idx = 0;
    for (let w = 0; w < 8; w++) {
      chunks.push(plan.slice(idx, idx + 7));
      idx += 7;
    }
    chunks.push(plan.slice(idx)); // last 4
    return chunks;
  }, [plan]);

  return (
    <main className="min-h-screen pb-16">
      {/* Header */}
      <section className="pt-14 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold">Free 60-Day Programs</h1>
          <p className="mt-3 text-lg text-gray-300">
            Transform your body with our structured workout programs. Choose your level and commit to 60 days of progress.
          </p>
          <SegmentedTabs value={level} onChange={(v) => setLevel(v)} />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <ProgressBar completed={completedCount} total={TOTAL_DAYS} onReset={reset} />

        {openDay ? (
          <DayDetail
            info={plan[openDay - 1]}
            isCompleted={!!completed[openDay - 1]}
            onBack={() => setOpenDay(null)}
            onToggleComplete={() => toggleDay(openDay)}
          />
        ) : (
          <div className="mt-8 space-y-6">
            {weeks.map((week, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-2xl font-extrabold">Week {idx + 1}</h3>
<div className="mt-4 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
                  {week.map((info) => (
                    <DayCard
                      key={info.dayNumber}
                      info={info}
                      completed={!!completed[info.dayNumber - 1]}
                      onOpen={() => setOpenDay(info.dayNumber)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer CTA for classes */}
        {!openDay && (
          <div className="mt-10 text-center">
            <Link href="/classes" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-500">
              Browse Live Classes
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
