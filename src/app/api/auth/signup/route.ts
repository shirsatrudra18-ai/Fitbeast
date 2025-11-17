import { NextRequest, NextResponse } from "next/server";
import { getDb, persist } from "@/lib/sql";
import bcrypt from "bcryptjs";
import { setAuthCookie } from "@/lib/auth";

type UserIdRow = {
  id?: number;
};

type NewUserRow = {
  id: number;
  name: string | null;
  email: string;
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password } = body || {};
  if (!email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const db = await getDb();
  // check exists
  const stmt = db.prepare("SELECT id FROM users WHERE email = ?");
  const row = stmt.getAsObject([email]) as UserIdRow;
  stmt.free();
  if (row.id) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

  const hash = await bcrypt.hash(password, 10);
  const ins = db.prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)");
  ins.run([name || null, email, hash]);
  ins.free();

  const idRow = db.prepare("SELECT id, name, email FROM users WHERE email = ?").getAsObject([email]) as NewUserRow;
  await setAuthCookie({ id: Number(idRow.id), email: String(idRow.email), name: idRow.name ?? undefined });
  persist(db);
  return NextResponse.json({ ok: true, user: idRow });
}
