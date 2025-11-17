import { NextResponse } from "next/server";
import { getDb, persist } from "@/lib/sql";
import { getAuthUser } from "@/lib/auth";

export async function POST(req: Request) {
  const { plan } = await req.json();
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = await getDb();
  const ins = db.prepare("INSERT INTO subscriptions (user_id, plan) VALUES (?, ?)");
  ins.run([user.id, String(plan || "basic")]);
  ins.free();
  persist(db);
  return NextResponse.json({ ok: true });
}
