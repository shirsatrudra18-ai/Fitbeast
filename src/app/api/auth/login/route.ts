import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/sql";
import bcrypt from "bcryptjs";
import { setAuthCookie, clearAuthCookie, getAuthUser } from "@/lib/auth";

type UserRow = {
  id?: number;
  name?: string | null;
  email?: string;
  password_hash?: string;
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body || {};
  if (!email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const db = await getDb();
  const row = db
    .prepare("SELECT id, name, email, password_hash FROM users WHERE email = ?")
    .getAsObject([email]) as UserRow;
  if (!row.id) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const ok = await bcrypt.compare(password, String(row.password_hash));
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  await setAuthCookie({ id: Number(row.id), email: String(row.email), name: row.name ?? undefined });
  return NextResponse.json({ ok: true, user: { id: row.id, name: row.name, email: row.email } });
}

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ user: null }, { status: 200 });
  return NextResponse.json({ user });
}

export async function DELETE() {
  await clearAuthCookie();
  return NextResponse.json({ ok: true });
}
