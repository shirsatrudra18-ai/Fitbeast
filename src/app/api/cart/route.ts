import { NextResponse } from "next/server";
import { getDb, persist } from "@/lib/sql";
import { getAuthUser } from "@/lib/auth";

type CartRow = {
  id?: number;
};

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ items: [] });
  const db = await getDb();
  const cartRow = db.prepare("SELECT id FROM carts WHERE user_id = ?").getAsObject([user.id]) as CartRow;
  if (!cartRow.id) return NextResponse.json({ items: [] });
  const rows = db.exec(
    `SELECT product_id, name, price, image, category, qty FROM cart_items WHERE cart_id = ${Number(
      cartRow.id
    )}`
  );
  const items = rows.length
    ? rows[0].values.map((r) => ({
        product: { id: String(r[0]), name: String(r[1]), price: Number(r[2]), image: String(r[3] || ""), category: String(r[4] || "Accessories") },
        qty: Number(r[5]),
      }))
    : [];
  return NextResponse.json({ items });
}

export async function PUT(req: Request) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { items } = await req.json();
  const db = await getDb();
  // ensure cart
  let cartId: number;
  const row = db.prepare("SELECT id FROM carts WHERE user_id = ?").getAsObject([user.id]) as CartRow;
  if (row.id) {
    cartId = Number(row.id);
  } else {
    const ins = db.prepare("INSERT INTO carts (user_id) VALUES (?)");
    ins.run([user.id]);
    ins.free();
    const c2 = db.prepare("SELECT id FROM carts WHERE user_id = ?").getAsObject([user.id]) as CartRow;
    cartId = Number(c2.id);
  }
  // replace items
  db.exec(`DELETE FROM cart_items WHERE cart_id = ${cartId}`);
  const insItem = db.prepare(
    "INSERT INTO cart_items (cart_id, product_id, name, price, image, category, qty) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );
  for (const it of items || []) {
    insItem.run([
      cartId,
      it.product.id,
      it.product.name,
      it.product.price,
      it.product.image || null,
      it.product.category || null,
      it.qty,
    ]);
  }
  insItem.free();
  persist(db);
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ ok: true });
  const db = await getDb();
  const row = db.prepare("SELECT id FROM carts WHERE user_id = ?").getAsObject([user.id]) as CartRow;
  if (row.id) db.exec(`DELETE FROM cart_items WHERE cart_id = ${Number(row.id)}`);
  persist(db);
  return NextResponse.json({ ok: true });
}
