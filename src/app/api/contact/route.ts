import { NextResponse } from "next/server";
import { getDb, persist } from "@/lib/sql";
import { getAuthUser } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, subject, message } = body || {};
  const user = await getAuthUser();
  const db = await getDb();
  const ins = db.prepare(
    "INSERT INTO contacts (user_id, name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?, ?)"
  );
  ins.run([user ? user.id : null, name || null, email || null, phone || null, subject || null, message || null]);
  ins.free();
  persist(db);
  return NextResponse.json({ ok: true });
}
