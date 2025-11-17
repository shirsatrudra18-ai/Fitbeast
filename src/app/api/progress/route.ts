import { NextResponse } from "next/server";
import { getDb, persist } from "@/lib/sql";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const level = String(searchParams.get("level") || "Beginner");
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ days: [] });
  const db = await getDb();
  const rows = db.exec(
    `SELECT day, completed FROM program_progress WHERE user_id = ${user.id} AND level = '${level.replace("'","''")}' ORDER BY day`
  );
  const days = Array(60).fill(false);
  if (rows.length) {
    for (const r of rows[0].values) days[Number(r[0]) - 1] = Number(r[1]) === 1;
  }
  return NextResponse.json({ days });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { level, day, completed } = body || {};
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = await getDb();
  const up = db.prepare(
    "INSERT INTO program_progress (user_id, level, day, completed) VALUES (?, ?, ?, ?) ON CONFLICT(user_id, level, day) DO UPDATE SET completed = excluded.completed"
  );
  up.run([user.id, level, day, completed ? 1 : 0]);
  up.free();
  persist(db);
  return NextResponse.json({ ok: true });
}
