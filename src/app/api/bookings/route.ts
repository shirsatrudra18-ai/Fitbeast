import { NextResponse } from "next/server";
import { getDb, persist } from "@/lib/sql";
import { getAuthUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { date, classTitle, classTime } = body || {};
  if (!date || !classTitle || !classTime) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const db = await getDb();
  const ins = db.prepare(
    "INSERT INTO bookings (user_id, class_title, class_time, date) VALUES (?, ?, ?, ?)"
  );
  ins.run([user.id, classTitle, classTime, date]);
  ins.free();
  persist(db);
  return NextResponse.json({ ok: true });
}
